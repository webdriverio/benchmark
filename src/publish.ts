/**
 * node src/publish.ts results/<id>
 *
 * Turns one result directory into documentation:
 *   results/<id>/meta.json    merged from every meta-*.json the jobs wrote
 *   results/<id>/report.md    versions, results, failures, environment, links
 *   results/README.md         index of every published run, newest first
 *   README.md                 the "Latest results" section
 */
import fs from 'node:fs/promises'
import path from 'node:path'

import { readRows, summaryTable, taskTable, failureList, summarize } from './report.ts'
import { SETUPS } from './setups.ts'
import { modelLabel } from './models.ts'
import { SUITES, type SuiteId } from './tasks.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const RESULTS = path.join(ROOT, 'results')
const REPO_URL = 'https://github.com/webdriverio/benchmark'
const ORDER = SETUPS.map((s) => s.id)

interface SetupMeta { pkg: string, version?: string, url?: string, skipped?: string }
interface Meta {
    suite: SuiteId
    screenshots?: boolean
    startedAt: string
    finishedAt?: string
    model: string
    runsPerTask: number
    seed: number
    maxTurns: number
    timeoutMin: number
    tasks: string[]
    setups: Record<string, SetupMeta>
    workflowRun?: { url: string, id: string, attempt?: string }
    commit: string
    environment: Record<string, string>
    /** per setup, after merging: every job ran on its own runner */
    environments?: Record<string, Record<string, string>>
}

async function mergeMeta (dir: string): Promise<Meta> {
    const files = (await fs.readdir(dir)).filter((f) => f.startsWith('meta-') && f.endsWith('.json'))
    if (!files.length) {
        throw new Error(`no meta-*.json in ${dir}`)
    }
    const metas: Meta[] = await Promise.all(files.map(async (f) => JSON.parse(await fs.readFile(path.join(dir, f), 'utf8'))))
    const [first] = metas
    for (const m of metas) {
        if (m.model !== first.model || m.runsPerTask !== first.runsPerTask || m.seed !== first.seed || m.suite !== first.suite) {
            throw new Error('result files disagree on suite, model, runs or seed; they come from different benchmark runs')
        }
    }
    return {
        ...first,
        startedAt: metas.map((m) => m.startedAt).sort()[0],
        finishedAt: metas.map((m) => m.finishedAt ?? '').sort().at(-1) || undefined,
        tasks: [...new Set(metas.flatMap((m) => m.tasks))],
        setups: Object.fromEntries(ORDER.flatMap((id) => {
            const found = metas.find((m) => m.setups[id])?.setups[id]
            return found ? [[id, found]] : []
        })),
        environments: Object.fromEntries(ORDER.flatMap((id) => {
            const found = metas.find((m) => m.setups[id])
            return found ? [[id, found.environment]] : []
        }))
    }
}

const version = (s?: SetupMeta) => s?.skipped ? 'skipped' : s?.version ?? 'n/a'
const minutes = (meta: Meta) => meta.finishedAt ? `${Math.round((Date.parse(meta.finishedAt) - Date.parse(meta.startedAt)) / 60_000)} min` : 'unfinished'

function renderReport (id: string, meta: Meta, rows: Awaited<ReturnType<typeof readRows>>, pending = 0) {
    const run = meta.workflowRun
    const runLink = run ? `[workflow run #${run.id}](${run.url})` : 'a local run'
    const setupLabel = (setup: string) => {
        const s = meta.setups[setup]
        return `\`${setup}\`<br>${s.pkg}@${version(s)}`
    }
    const tools = Object.entries(meta.setups).map(([setup, s]) => {
        const label = SETUPS.find((x) => x.id === setup)?.label ?? setup
        const home = s.pkg.startsWith('@') || !s.pkg.includes('/') ? `https://www.npmjs.com/package/${s.pkg}` : `https://github.com/${s.pkg}`
        const version = s.skipped ? '–' : s.url ? `[\`${s.version}\`](${s.url})` : `\`${s.version}\``
        return `| \`${setup}\` | ${label} | [\`${s.pkg}\`](${home}) | ${version} | ${s.skipped ? `⚠️ skipped: ${s.skipped}` : 'ran'} |`
    })
    const suite = meta.suite
    const taskList = `${meta.tasks.length} tasks sampled from Online-Mind2Web (ids in [\`tasks/online-mind2web.json\`](${REPO_URL}/blob/main/tasks/online-mind2web.json)); live websites, so runs are not exactly repeatable`
    const judge = rows.find((r) => (r as { judge?: Record<string, unknown> }).judge) as { judge?: { name: string, model: string, threshold: number, commit: string, patch: string } } | undefined
    const pendingNote = pending ? `\n\n⚠️ ${pending} run(s) were not judged and are left out of every number below.` : ''

    return `# Benchmark run ${id}: ${SUITES[suite].label}

Produced by ${runLink} on ${meta.startedAt.slice(0, 10)} from commit [\`${meta.commit.slice(0, 7)}\`](${REPO_URL}/commit/${meta.commit}). Raw data: [\`runs-*.jsonl\`](.) (one line per agent run, including the agent's final message) and [\`meta.json\`](meta.json).${run ? ` Full agent transcripts: the \`transcripts-*\` artifacts of the [workflow run](${run.url}) (kept 90 days).` : ''}

## Configuration

| | |
|---|---|
| Model | \`${meta.model}\`, thinking disabled |
| Agent harness | Claude Agent SDK ${meta.environment.agentSdk} |
| Runs | ${meta.runsPerTask} per task and setup, shuffled with seed ${meta.seed} |
| Limits | ${meta.maxTurns} turns, ${meta.timeoutMin} min per run |
| Suite | ${SUITES[suite].label}: ${SUITES[suite].description} |
| Tasks | ${taskList} |
| Success decided by | ${judge?.judge ? `${judge.judge.name} (\`${judge.judge.model}\`, score threshold ${judge.judge.threshold}, [Online-Mind2Web@${judge.judge.commit.slice(0, 7)}](https://github.com/OSU-NLP-Group/Online-Mind2Web/tree/${judge.judge.commit}); patched: ${judge.judge.patch}). Its reasoning per run: \`judgments-*.jsonl\`` : 'not judged yet'} |
| Screenshots | ${meta.screenshots ? 'after every tool call, taken by the harness over CDP (no agent tokens)' : 'none'} |
| Duration | ${minutes(meta)} |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](${REPO_URL}#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
${tools.join('\n')}

## Results${pendingNote}

${rows.length ? summaryTable(rows, ORDER, setupLabel) : '_No runs completed._'}

### Per task

${rows.length ? taskTable(rows, ORDER) : '_No runs completed._'}

### Failed runs

${failureList(rows)}

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
${Object.entries(meta.environments ?? { all: meta.environment }).map(([setup, e]) => `| \`${setup}\` | ${e.os} | ${e.cpus} | ${e.node} | ${e.chrome} |`).join('\n')}

Every setup ran in the same job, interleaved in one shuffled order.
`
}

async function publishedRuns () {
    const out: { id: string, meta: Meta, rows: Awaited<ReturnType<typeof readRows>> }[] = []
    for (const id of (await fs.readdir(RESULTS)).sort().reverse()) {
        try {
            const meta = JSON.parse(await fs.readFile(path.join(RESULTS, id, 'meta.json'), 'utf8'))
            out.push({ id, meta, rows: await readRows(path.join(RESULTS, id)) })
        } catch {}
    }
    return out
}

async function renderIndex () {
    const runs = await publishedRuns()
    const lines = [
        '# Results',
        '',
        'Every published benchmark run, newest first. Each report lists the exact tool versions, the configuration, every failure and a link to the workflow run that produced it.',
        '',
        `| Date | Report | Tasks | Model | Runs | ${ORDER.map((s) => `\`${s}\``).join(' | ')} | Workflow |`,
        `|---|---|---|---|--:|${ORDER.map(() => '---').join('|')}|---|`
    ]
    for (const { id, meta, rows } of runs) {
        const bySetup = new Map(summarize(rows).map((s) => [s.setup, s]))
        const cells = ORDER.map((setup) => {
            const s = meta.setups[setup]
            const sum = bySetup.get(setup)
            if (!s) {
                return '–'
            }
            if (s.skipped || !sum) {
                return 'skipped'
            }
            return `${s.version}<br>${Math.round(sum.passed / sum.total * 100)}% · ${Math.round(sum.tokens / 1000)}k`
        })
        const workflow = meta.workflowRun ? `[#${meta.workflowRun.id}](${meta.workflowRun.url})` : 'local'
        lines.push(`| ${meta.startedAt.slice(0, 10)} | [${id}](${id}/report.md) | ${SUITES[meta.suite].label} | \`${meta.model}\` | ${rows.length} | ${cells.join(' | ')} | ${workflow} |`)
    }
    lines.push('', '_Each setup cell: tool version, success rate, median tokens per task._', '')
    await fs.writeFile(path.join(RESULTS, 'README.md'), lines.join('\n'))
    // the newest run of every suite and model
    const seen = new Set<string>()
    return runs.filter((r) => !seen.has(`${r.meta.suite}|${r.meta.model}`) && seen.add(`${r.meta.suite}|${r.meta.model}`))
}

async function updateReadme (latest: Awaited<ReturnType<typeof publishedRuns>>) {
    const file = path.join(ROOT, 'README.md')
    const readme = await fs.readFile(file, 'utf8')
    const start = '<!-- results:start -->'
    const end = '<!-- results:end -->'
    if (!readme.includes(start) || !readme.includes(end)) {
        throw new Error(`README.md needs ${start} and ${end} markers`)
    }
    const sections = latest.map(({ id, meta, rows }) => {
        const versions = Object.entries(meta.setups).map(([setup, s]) => s.skipped ? `${setup}: skipped` : `${setup}: \`${s.pkg}@${s.version}\``).join(' · ')
        const suite = SUITES[meta.suite]
        return `**${suite.label}, ${modelLabel(meta.model)}.** Latest run: [${id}](results/${id}/report.md) on ${meta.startedAt.slice(0, 10)}, \`${meta.model}\`, ${meta.runsPerTask} runs per task${meta.workflowRun ? `, [workflow run](${meta.workflowRun.url})` : ''}.

${summaryTable(rows, ORDER)}

Versions: ${versions}`
    })
    const block = `${start}
${sections.join('\n\n')}

All runs: [results](results/README.md).
${end}`
    await fs.writeFile(file, readme.slice(0, readme.indexOf(start)) + block + readme.slice(readme.indexOf(end) + end.length))
}

const dir = process.argv[2]
if (!dir) {
    console.error('usage: node src/publish.ts results/<id>')
    process.exit(1)
}
const resultDir = path.resolve(dir)
const id = path.basename(resultDir)
const meta = await mergeMeta(resultDir)
const rows = await readRows(resultDir)
const pending = (await readRows(resultDir, { includePending: true })).length - rows.length
await fs.writeFile(path.join(resultDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n')
await fs.writeFile(path.join(resultDir, 'report.md'), renderReport(id, meta, rows, pending))
const latest = await renderIndex()
if (latest.length) {
    await updateReadme(latest)
}
console.log(`Published ${path.relative(ROOT, resultDir)}/report.md (${rows.length} runs)`)
