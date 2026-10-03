/**
 * node src/judge.ts results/<id> [--model o4-mini] [--threshold 3]
 *
 * Decides the runs a suite leaves to a judge (Online-Mind2Web): turns each
 * run's actions and screenshots into the benchmark's trajectory format and
 * runs the benchmark's own WebJudge on them, unchanged except for the one
 * API call noted below. Needs OPENAI_API_KEY and python3.
 *
 * WebJudge is the Online-Mind2Web authors' automatic judge; with o4-mini it
 * agrees with human reviewers on 86% of trajectories. It sees the task, the
 * agent's actions and the screenshots, not the agent's final answer, and it
 * comes from another model family than the agent under test.
 *
 * Fills in `pass` and `detail` of every pending row and writes
 * judgments-<label>.jsonl next to the runs: the judge's reasoning per run,
 * for spot checks by people.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { parseArgs } from 'node:util'

const exec = promisify(execFile)
const ROOT = path.resolve(import.meta.dirname, '..')

// WebJudge as published in github.com/OSU-NLP-Group/Online-Mind2Web
export const WEBJUDGE_COMMIT = 'f0d805ee0e9e0b3ea70911e45e5264b72968f3dc'
const WEBJUDGE_FILES = [
    'requirements.txt',
    'src/run.py',
    'src/utils.py',
    'src/methods/agenttrek_eval.py',
    'src/methods/automomous_eval.py',
    'src/methods/webjudge_general_eval.py',
    'src/methods/webjudge_online_mind2web.py',
    'src/methods/webvoyager_eval.py'
]
const MODE = 'WebJudge_Online_Mind2Web_eval'

/**
 * WebJudge sends `max_tokens=512` and `temperature=0`. OpenAI's reasoning
 * models, o4-mini included (the model its README asks for), reject both, and
 * 512 tokens would be used up by reasoning before any answer. The patch
 * sends `max_completion_tokens` with room for reasoning and leaves
 * temperature at the model's default. Nothing else changes.
 */
export const WEBJUDGE_PATCH = 'reasoning models: max_completion_tokens=8192 instead of max_tokens=512, no temperature'
const ORIGINAL_CALL = `            max_tokens=max_new_tokens,
            temperature=temperature,`
const PATCHED_CALL = `            **({"max_completion_tokens": 8192} if __import__("re").match(r"o\\d|gpt-5", str(model)) else {"max_tokens": max_new_tokens, "temperature": temperature}),`

const { values: args, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        // the model WebJudge's 86% agreement with human reviewers was measured with
        model: { type: 'string', default: 'o4-mini' },
        threshold: { type: 'string', default: '3' },
        workers: { type: 'string', default: '8' }
    }
})

interface Step { step: number, tool: string, input: unknown, screenshot?: string, url?: string }

/** the action as the agent issued it: the shell command or the tool call, never the tool's reply */
function actionText ({ tool, input }: Step) {
    const command = (input as { command?: unknown })?.command
    if (tool === 'Bash' && typeof command === 'string') {
        return command
    }
    return `${tool.replace(/^mcp__browser__/, '')} ${JSON.stringify(input)}`
}

/** tool calls that aren't browser actions: loading the skill, reading its docs */
const isBrowserAction = (step: Step) => !['Skill', 'Read', 'ToolSearch', 'TodoWrite'].includes(step.tool)

async function installWebJudge () {
    const dir = path.join(ROOT, '.tools', `webjudge@${WEBJUDGE_COMMIT.slice(0, 7)}`)
    const python = path.join(dir, '.venv', 'bin', 'python')
    try {
        await fs.access(python)
        return { dir, python }
    } catch {}
    await fs.rm(dir, { recursive: true, force: true })
    for (const file of WEBJUDGE_FILES) {
        const res = await fetch(`https://raw.githubusercontent.com/OSU-NLP-Group/Online-Mind2Web/${WEBJUDGE_COMMIT}/${file}`)
        if (!res.ok) {
            throw new Error(`downloading WebJudge ${file} failed: ${res.status}`)
        }
        let text = await res.text()
        if (file === 'src/utils.py') {
            if (!text.includes(ORIGINAL_CALL)) {
                throw new Error('WebJudge utils.py changed; review the patch in judge.ts')
            }
            text = text.replace(ORIGINAL_CALL, PATCHED_CALL)
        }
        await fs.mkdir(path.dirname(path.join(dir, file)), { recursive: true })
        await fs.writeFile(path.join(dir, file), text)
    }
    // run.py hands its OpenAI client to worker processes, which only works when
    // they are forked: the default on Linux up to Python 3.13, not on macOS
    // or newer Pythons. The wrapper picks fork and leaves run.py unchanged.
    await fs.writeFile(path.join(dir, 'run_forked.py'), [
        'import multiprocessing, os, runpy, sys',
        'multiprocessing.set_start_method("fork")',
        'script = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "run.py")',
        'sys.path.insert(0, os.path.dirname(script))',
        'sys.argv = [script] + sys.argv[1:]',
        'runpy.run_path(script, run_name="__main__")',
        ''
    ].join('\n'))
    await exec('python3', ['-m', 'venv', path.join(dir, '.venv')])
    await exec(python, ['-m', 'pip', 'install', '--quiet', '-r', path.join(dir, 'requirements.txt')], { maxBuffer: 16 * 1024 * 1024 })
    return { dir, python }
}

/**
 * One trajectory per run in WebJudge's v1 layout: result.json with the
 * task and the actions, trajectory/ with the screenshots in order.
 */
async function writeTrajectory (out: string, runId: string, task: string, steps: Step[], screens: string, answer: string) {
    const dir = path.join(out, runId)
    await fs.mkdir(path.join(dir, 'trajectory'), { recursive: true })
    const actions = steps.filter(isBrowserAction)
    let i = 0
    for (const step of actions.filter((s) => s.screenshot)) {
        await fs.copyFile(path.join(screens, step.screenshot!), path.join(dir, 'trajectory', `${String(i++).padStart(4, '0')}.jpg`))
    }
    await fs.writeFile(path.join(dir, 'result.json'), JSON.stringify({
        task_id: runId,
        task,
        final_result_response: answer,
        action_history: actions.map(actionText)
    }, null, 2))
    return i
}

const dir = positionals[0]
if (!dir) {
    console.error('usage: node src/judge.ts results/<id> [--model o4-mini] [--threshold 3]')
    process.exit(1)
}
if (!process.env.OPENAI_API_KEY) {
    throw new Error('judging needs OPENAI_API_KEY')
}
const resultDir = path.resolve(dir)
const resultId = path.basename(resultDir)
const transcripts = path.join(ROOT, 'transcripts', resultId)
const { loadDataset } = await import('./mind2web.ts')
const dataset = new Map((await loadDataset()).map((t) => [t.task_id, t]))
const { loadTasks } = await import('./tasks.ts')
const taskById = new Map((await loadTasks('online-mind2web')).map((t) => [t.id, t]))

const work = path.join(ROOT, '.judge', resultId)
await fs.rm(work, { recursive: true, force: true })
const trajectories = path.join(work, 'trajectories')

const files = (await fs.readdir(resultDir)).filter((f) => f.startsWith('runs-') && f.endsWith('.jsonl'))
const pending: { file: string, runId: string }[] = []
for (const file of files) {
    for (const line of (await fs.readFile(path.join(resultDir, file), 'utf8')).split('\n').filter(Boolean)) {
        const row = JSON.parse(line)
        if (!row.pending) {
            continue
        }
        const task = taskById.get(row.task)
        const source = task?.sourceId ? dataset.get(task.sourceId) : undefined
        if (!source) {
            throw new Error(`${row.runId}: unknown task ${row.task}`)
        }
        const screens = path.join(transcripts, row.runId)
        const steps: Step[] = JSON.parse(await fs.readFile(path.join(screens, 'steps.json'), 'utf8').catch(() => '[]'))
        const answer = typeof row.answer?.answer === 'string' ? row.answer.answer : row.finalMessage ?? ''
        const shots = await writeTrajectory(trajectories, row.runId, source.confirmed_task, steps, screens, answer)
        if (!shots) {
            console.warn(`${row.runId}: no screenshots, WebJudge sees the actions only`)
        }
        pending.push({ file, runId: row.runId })
    }
}
if (!pending.length) {
    console.log('No runs waiting for a judge.')
    process.exit(0)
}

const { dir: webjudge, python } = await installWebJudge()
const output = path.join(work, 'output')
const workers = Math.max(1, Math.min(Number(args.workers), pending.length))
console.log(`WebJudge (${args.model}, threshold ${args.threshold}) on ${pending.length} runs…`)
await exec(python, [
    path.join(webjudge, 'run_forked.py'),
    '--mode', MODE,
    '--model', args.model,
    '--trajectories_dir', trajectories,
    '--api_key', process.env.OPENAI_API_KEY,
    '--output_path', output,
    '--score_threshold', args.threshold,
    '--num_worker', String(workers)
], {
    cwd: path.join(webjudge, 'src'),
    maxBuffer: 64 * 1024 * 1024,
    // macOS refuses to fork processes that have loaded system frameworks, unless told otherwise
    env: { ...process.env, OBJC_DISABLE_INITIALIZE_FORK_SAFETY: 'YES' }
})

const verdicts = new Map<string, { label: number, response: string, keyPoints: string }>()
const outFile = path.join(output, `${MODE}_${args.model}_score_threshold_${args.threshold}_auto_eval_results.json`)
for (const line of (await fs.readFile(outFile, 'utf8').catch(() => '')).split('\n').filter(Boolean)) {
    const r = JSON.parse(line)
    verdicts.set(r.task_id, { label: r.predicted_label, response: r.evaluation_details?.response ?? '', keyPoints: r.key_points ?? '' })
}

const judge = { name: 'WebJudge', model: args.model, threshold: Number(args.threshold), commit: WEBJUDGE_COMMIT, patch: WEBJUDGE_PATCH }
let judged = 0
for (const file of files) {
    const label = file.slice('runs-'.length, -'.jsonl'.length)
    const lines = (await fs.readFile(path.join(resultDir, file), 'utf8')).split('\n').filter(Boolean)
    const judgments: string[] = []
    const updated = lines.map((line) => {
        const row = JSON.parse(line)
        const verdict = row.pending ? verdicts.get(row.runId) : undefined
        if (!verdict) {
            return line
        }
        judged++
        const thoughts = verdict.response.split(/Status:/i)[0].replace(/^Thoughts:\s*/i, '').trim()
        delete row.pending
        row.pass = verdict.label === 1
        row.detail = `WebJudge: ${row.pass ? 'success' : 'failure'}. ${thoughts.replace(/\s+/g, ' ').slice(0, 400)}`
        row.judge = judge
        judgments.push(JSON.stringify({ runId: row.runId, setup: row.setup, task: row.task, pass: row.pass, keyPoints: verdict.keyPoints.trim(), judgment: verdict.response }))
        return JSON.stringify(row)
    })
    await fs.writeFile(path.join(resultDir, file), updated.join('\n') + '\n')
    if (judgments.length) {
        await fs.appendFile(path.join(resultDir, `judgments-${label}.jsonl`), judgments.join('\n') + '\n')
    }
}
console.log(`Judged ${judged} of ${pending.length} runs${judged < pending.length ? `; ${pending.length - judged} stay pending (judge error, see ${path.relative(ROOT, output)})` : ''}.`)
