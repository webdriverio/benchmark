/**
 * node src/run.ts [--setups a,b] [--tasks x,y] [--runs 3] [--model claude-sonnet-5] [--seed 1] [--out-dir results/<id>] [--dry-run]
 *
 * Installs the tool behind every selected setup, then runs every
 * setup × task × repetition once in one shuffled order (fixed seed, so a
 * run can be repeated). Writes into --out-dir:
 *
 *   runs-<label>.jsonl   one line per run
 *   meta-<label>.json    model, versions, environment, workflow run link
 *
 * `node src/publish.ts <out-dir>` merges those into meta.json and report.md.
 * The workflow runs one setup per job and publishes once all are done.
 */
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { parseArgs } from 'node:util'
import { query, type SDKMessage } from '@anthropic-ai/claude-agent-sdk'

import { startSites, resetSite } from './sites.ts'
import { TASKS, parseAnswer } from './tasks.ts'
import { SETUPS, type Setup } from './setups.ts'
import { installTool, type InstalledTool } from './tools.ts'

const exec = promisify(execFile)
const ROOT = path.resolve(import.meta.dirname, '..')

/**
 * Identical for every setup. The setup only appends how to reach the
 * browser (see setups.ts).
 */
const SYSTEM_PROMPT = `You are a browser automation agent. Complete the task in a real web browser using only the browser tools you were given. Read every answer from the page; never guess. Keep going until the task is done, then give the final ANSWER line.`

const { values: args } = parseArgs({
    options: {
        setups: { type: 'string', default: 'all' },
        tasks: { type: 'string', default: 'all' },
        runs: { type: 'string', default: '3' },
        model: { type: 'string', default: 'claude-sonnet-5' },
        seed: { type: 'string', default: '1' },
        'out-dir': { type: 'string' },
        'max-turns': { type: 'string', default: '80' },
        'timeout-min': { type: 'string', default: '10' },
        'dry-run': { type: 'boolean', default: false }
    }
})

function pick<T extends { id: string }> (all: T[], ids: string): T[] {
    if (ids.trim() === 'all' || !ids.trim()) {
        return all
    }
    return ids.split(',').map((id) => {
        const found = all.find((x) => x.id === id.trim())
        if (!found) {
            throw new Error(`unknown id "${id}", expected one of: ${all.map((x) => x.id).join(', ')}`)
        }
        return found
    })
}

/** mulberry32: small seeded PRNG so the shuffled order is reproducible */
function shuffle<T> (items: T[], seed: number): T[] {
    let a = seed >>> 0
    const rand = () => {
        a = (a + 0x6D2B79F5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    const out = [...items]
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]]
    }
    return out
}

async function chromeVersion () {
    const candidates = process.platform === 'darwin'
        ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
        : ['google-chrome', 'google-chrome-stable', 'chromium']
    for (const bin of candidates) {
        try {
            return (await exec(bin, ['--version'])).stdout.trim()
        } catch {}
    }
    return 'unknown'
}

function workflowRun () {
    const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_RUN_ATTEMPT } = process.env
    return GITHUB_RUN_ID
        ? { url: `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`, id: GITHUB_RUN_ID, attempt: GITHUB_RUN_ATTEMPT }
        : undefined
}

async function gitSha () {
    if (process.env.GITHUB_SHA) {
        return process.env.GITHUB_SHA
    }
    return (await exec('git', ['rev-parse', 'HEAD'], { cwd: ROOT }).catch(() => ({ stdout: 'unknown' }))).stdout.trim()
}

const selected = pick(SETUPS, args.setups)
const tasks = pick(TASKS, args.tasks)
const label = args.setups === 'all' ? 'all' : selected.map((s) => s.id).join('+')
const startedAt = new Date()
const outDir = path.resolve(args['out-dir'] ?? path.join(ROOT, 'results', startedAt.toISOString().slice(0, 19).replace(/:/g, '-')))

// install every tool first, so install time never counts against a tool
const tools = new Map<string, InstalledTool>()
const skipped: Record<string, string> = {}
for (const setup of selected) {
    if (args['dry-run']) {
        break
    }
    try {
        const tool = setup.local?.() ?? await installTool(setup.tool)
        tools.set(setup.id, tool)
        console.log(`${setup.id.padEnd(22)} ${tool.pkg}@${tool.version}`)
    } catch (err) {
        skipped[setup.id] = String((err as Error).message ?? err).split('\n')[0]
        console.log(`${setup.id.padEnd(22)} SKIPPED: ${skipped[setup.id]}`)
    }
}

const setups = args['dry-run'] ? selected : selected.filter((s) => tools.has(s.id))
const plan = shuffle(
    setups.flatMap((setup) => tasks.flatMap((task) => Array.from({ length: Number(args.runs) }, (_, rep) => ({ setup, task, rep: rep + 1 })))),
    Number(args.seed)
)

console.log(`\n${plan.length} runs: ${setups.length} setups × ${tasks.length} tasks × ${args.runs}, model ${args.model}, seed ${args.seed}`)
if (args['dry-run']) {
    plan.forEach((p, i) => console.log(`${String(i + 1).padStart(3)}  ${p.setup.id.padEnd(22)} ${p.task.id} #${p.rep}`))
    process.exit(0)
}

await fs.mkdir(outDir, { recursive: true })
const runsFile = path.join(outDir, `runs-${label}.jsonl`)
const metaFile = path.join(outDir, `meta-${label}.json`)
const meta = {
    startedAt: startedAt.toISOString(),
    finishedAt: undefined as string | undefined,
    model: args.model,
    runsPerTask: Number(args.runs),
    seed: Number(args.seed),
    maxTurns: Number(args['max-turns']),
    timeoutMin: Number(args['timeout-min']),
    tasks: tasks.map((t) => t.id),
    setups: Object.fromEntries(selected.map((s: Setup) => [s.id, tools.has(s.id)
        ? { pkg: tools.get(s.id)!.pkg, version: tools.get(s.id)!.version }
        : { pkg: s.tool.pkg, skipped: skipped[s.id] }])),
    workflowRun: workflowRun(),
    commit: await gitSha(),
    environment: {
        os: `${os.type()} ${os.release()} (${os.arch()})`,
        cpus: `${os.cpus().length}× ${os.cpus()[0]?.model ?? 'unknown'}`,
        node: process.version,
        chrome: await chromeVersion(),
        agentSdk: JSON.parse(await fs.readFile(path.join(ROOT, 'node_modules', '@anthropic-ai', 'claude-agent-sdk', 'package.json'), 'utf8')).version
    }
}
await fs.writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')

const sites = await startSites()
const runPrefix = `${label}-${startedAt.getTime()}`

for (const [i, { setup, task, rep }] of plan.entries()) {
    const tool = tools.get(setup.id)!
    const runId = `${runPrefix}-${String(i + 1).padStart(3, '0')}`
    const cwd = path.join(ROOT, '.runs', runId)
    await fs.mkdir(cwd, { recursive: true })
    resetSite(task.id)

    const abortController = new AbortController()
    const timer = setTimeout(() => abortController.abort(), Number(args['timeout-min']) * 60_000)
    const started = Date.now()
    const row: Record<string, unknown> = {
        runId, setup: setup.id, task: task.id, kind: task.kind, rep, model: args.model, tool: `${tool.pkg}@${tool.version}`
    }
    let toolCalls = 0
    let result: Extract<SDKMessage, { type: 'result' }> | undefined

    try {
        const setupOptions = await setup.options(tool, cwd, runId)
        for await (const message of query({
            prompt: task.prompt,
            options: {
                model: args.model,
                thinking: { type: 'disabled' },
                systemPrompt: `${SYSTEM_PROMPT}\n\n${setup.note}`,
                cwd,
                maxTurns: Number(args['max-turns']),
                permissionMode: 'dontAsk',
                disallowedTools: ['WebFetch', 'WebSearch'],
                settingSources: [],
                abortController,
                ...setupOptions
            }
        })) {
            if (message.type === 'assistant') {
                toolCalls += message.message.content.filter((block) => block.type === 'tool_use').length
            } else if (message.type === 'result') {
                result = message
            }
        }
    } catch (err) {
        row.error = abortController.signal.aborted ? `timeout after ${args['timeout-min']} min` : String(err)
    } finally {
        clearTimeout(timer)
    }

    const text = result?.subtype === 'success' ? result.result : ''
    const answer = parseAnswer(text)
    const check = row.error ? { pass: false, detail: String(row.error) } : await task.check(answer)
    const usage = result?.usage
    const tokens = {
        input: usage?.input_tokens ?? 0,
        output: usage?.output_tokens ?? 0,
        cacheRead: usage?.cache_read_input_tokens ?? 0,
        cacheCreation: usage?.cache_creation_input_tokens ?? 0
    }
    Object.assign(row, {
        pass: check.pass,
        detail: check.detail,
        answer,
        resultSubtype: result?.subtype,
        durationMs: result?.duration_ms,
        wallMs: Date.now() - started,
        turns: result?.num_turns,
        toolCalls,
        tokens: { ...tokens, total: tokens.input + tokens.output + tokens.cacheRead + tokens.cacheCreation },
        costUsd: result?.total_cost_usd
    })
    await fs.appendFile(runsFile, JSON.stringify(row) + '\n')
    await setup.cleanup?.(tool, cwd, runId)
    await fs.rm(cwd, { recursive: true, force: true })

    console.log(`[${i + 1}/${plan.length}] ${check.pass ? '✓' : '✗'} ${setup.id.padEnd(22)} ${task.id.padEnd(20)} ${String(Math.round(((row.tokens as { total: number }).total) / 1000)).padStart(4)}k tok  ${(((row.wallMs as number) / 1000).toFixed(1)).padStart(6)}s  $${(row.costUsd as number ?? 0).toFixed(3)}  ${check.pass ? '' : check.detail}`)
}

await sites.close()
meta.finishedAt = new Date().toISOString()
await fs.writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')
console.log(`\nResults in ${path.relative(ROOT, outDir)}\nPublish: node src/publish.ts ${path.relative(ROOT, outDir)}`)
