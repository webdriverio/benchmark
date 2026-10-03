/**
 * node src/site.ts [--out dist]
 *
 * Builds the static site for benchmark.webdriver.io: copies site/ and writes
 * data.json, which aggregates every published run in results/.
 *
 * Runs are grouped by setup + package version + model: every run of
 * `@wdio/cli@10.0.0` with `claude-sonnet-5` counts toward one row, no matter
 * which workflow run produced it. A new tool version starts a new row.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'

import { readRows, median, type Row } from './report.ts'
import { SETUPS } from './setups.ts'
import { TASKS } from './tasks.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const RESULTS = path.join(ROOT, 'results')
const REPO = 'https://github.com/webdriverio/benchmark'

const { values: args } = parseArgs({ options: { out: { type: 'string', default: 'dist' } } })
const OUT = path.resolve(ROOT, args.out)

interface SetupMeta { pkg: string, version?: string, skipped?: string }
interface Meta {
    startedAt: string
    finishedAt?: string
    model: string
    runsPerTask: number
    seed: number
    tasks: string[]
    setups: Record<string, SetupMeta>
    workflowRun?: { url: string, id: string }
    commit: string
}

function stats (rows: Row[]) {
    const passed = rows.filter((r) => r.pass).length
    return {
        runs: rows.length,
        passed,
        successRate: rows.length ? passed / rows.length : 0,
        tokens: median(rows.map((r) => r.tokens.total)),
        cost: median(rows.map((r) => r.costUsd ?? 0)),
        seconds: median(rows.map((r) => r.wallMs)) / 1000,
        toolCalls: median(rows.map((r) => r.toolCalls)),
        turns: median(rows.map((r) => r.turns ?? 0))
    }
}

const runs: { id: string, meta: Meta, rows: Row[] }[] = []
for (const id of (await fs.readdir(RESULTS).catch(() => [])).sort()) {
    try {
        const meta = JSON.parse(await fs.readFile(path.join(RESULTS, id, 'meta.json'), 'utf8')) as Meta
        runs.push({ id, meta, rows: await readRows(path.join(RESULTS, id)) })
    } catch {
        // not a published result directory
    }
}

// setup + version + model → every row, from every run
const groups = new Map<string, { setup: string, pkg: string, version: string, model: string, runIds: Set<string>, rows: Row[], firstRun: string, lastRun: string }>()
for (const { id, meta, rows } of runs) {
    for (const [setup, s] of Object.entries(meta.setups)) {
        if (s.skipped || !s.version) {
            continue
        }
        const key = `${setup}|${s.version}|${meta.model}`
        const group = groups.get(key) ?? { setup, pkg: s.pkg, version: s.version, model: meta.model, runIds: new Set(), rows: [], firstRun: meta.startedAt, lastRun: meta.startedAt }
        group.runIds.add(id)
        group.rows.push(...rows.filter((r) => r.setup === setup))
        group.firstRun = group.firstRun < meta.startedAt ? group.firstRun : meta.startedAt
        group.lastRun = group.lastRun > meta.startedAt ? group.lastRun : meta.startedAt
        groups.set(key, group)
    }
}

const data = {
    generatedAt: new Date().toISOString(),
    repo: REPO,
    setups: SETUPS.map((s) => ({ id: s.id, label: s.label, pkg: s.tool.pkg })),
    tasks: TASKS.map((t) => ({ id: t.id, kind: t.kind })),
    groups: [...groups.values()].filter((g) => g.rows.length).map((g) => ({
        setup: g.setup,
        pkg: g.pkg,
        version: g.version,
        model: g.model,
        firstRun: g.firstRun,
        lastRun: g.lastRun,
        runIds: [...g.runIds].sort().reverse(),
        ...stats(g.rows),
        perTask: Object.fromEntries(TASKS.map((t) => [t.id, stats(g.rows.filter((r) => r.task === t.id))]).filter(([, s]) => (s as { runs: number }).runs))
    })),
    runs: runs.reverse().map(({ id, meta, rows }) => ({
        id,
        startedAt: meta.startedAt,
        finishedAt: meta.finishedAt,
        model: meta.model,
        runsPerTask: meta.runsPerTask,
        workflowRun: meta.workflowRun,
        commit: meta.commit,
        report: `${REPO}/blob/main/results/${id}/report.md`,
        setups: Object.fromEntries(Object.entries(meta.setups).map(([setup, s]) => [setup, s.skipped
            ? { pkg: s.pkg, skipped: s.skipped }
            : { pkg: s.pkg, version: s.version, ...stats(rows.filter((r) => r.setup === setup)) }]))
    }))
}

await fs.rm(OUT, { recursive: true, force: true })
await fs.cp(path.join(ROOT, 'site'), OUT, { recursive: true })
await fs.writeFile(path.join(OUT, 'data.json'), JSON.stringify(data))
console.log(`Built ${path.relative(ROOT, OUT)}/ from ${runs.length} run(s), ${data.groups.length} version group(s)`)
