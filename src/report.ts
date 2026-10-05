/**
 * Markdown tables from run rows. Used by publish.ts; also a CLI:
 *
 *   node src/report.ts results/<id>     tables for one result directory
 */
import fs from 'node:fs/promises'
import path from 'node:path'

export interface Row {
    suite: string
    setup: string
    task: string
    kind?: string
    level?: string
    /** still waiting for a judge (see judge.ts); never counted */
    pending?: boolean
    rep: number
    pass: boolean
    detail: string
    wallMs: number
    costUsd?: number
    turns?: number
    toolCalls: number
    tokens: { total: number, input: number, output: number, cacheRead: number, cacheCreation: number }
    error?: string
}

/** every judged run in `dir`; runs still waiting for a judge are left out, not counted as failures */
export async function readRows (dir: string, { includePending = false } = {}): Promise<Row[]> {
    const rows: Row[] = []
    for (const file of (await fs.readdir(dir)).filter((f) => f.startsWith('runs-') && f.endsWith('.jsonl')).sort()) {
        for (const line of (await fs.readFile(path.join(dir, file), 'utf8')).split('\n').filter(Boolean)) {
            const row = JSON.parse(line) as Row
            if (includePending || !row.pending) {
                rows.push(row)
            }
        }
    }
    return rows
}

export const median = (xs: number[]) => {
    if (!xs.length) {
        return 0
    }
    const s = [...xs].sort((a, b) => a - b)
    const m = Math.floor(s.length / 2)
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

function group (rows: Row[], key: (r: Row) => string) {
    const out = new Map<string, Row[]>()
    for (const r of rows) {
        out.set(key(r), [...(out.get(key(r)) ?? []), r])
    }
    return out
}

const k = (n: number) => `${Math.round(n / 1000)}k`

export interface SetupSummary {
    setup: string
    passed: number
    total: number
    tokens: number
    cost: number
    seconds: number
    toolCalls: number
}

export function summarize (rows: Row[], order?: string[]): SetupSummary[] {
    const bySetup = group(rows, (r) => r.setup)
    const setups = order?.filter((s) => bySetup.has(s)) ?? [...bySetup.keys()]
    return setups.map((setup) => {
        const rs = bySetup.get(setup)!
        return {
            setup,
            passed: rs.filter((r) => r.pass).length,
            total: rs.length,
            tokens: median(rs.map((r) => r.tokens.total)),
            cost: median(rs.map((r) => r.costUsd ?? 0)),
            seconds: median(rs.map((r) => r.wallMs)) / 1000,
            toolCalls: median(rs.map((r) => r.toolCalls))
        }
    })
}

export function summaryTable (rows: Row[], order?: string[], label: (setup: string) => string = (s) => s) {
    const lines = [
        '| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |',
        '|---|--:|--:|--:|--:|--:|'
    ]
    for (const s of summarize(rows, order)) {
        lines.push(`| ${label(s.setup)} | ${k(s.tokens)} | $${s.cost.toFixed(3)} | ${Math.round(s.passed / s.total * 100)}% (${s.passed}/${s.total}) | ${s.seconds.toFixed(0)} s | ${s.toolCalls} |`)
    }
    lines.push('', '_Medians per run, except success. Tokens include cache reads and writes._')
    return lines.join('\n')
}

export function taskTable (rows: Row[], order?: string[]) {
    const setups = summarize(rows, order).map((s) => s.setup)
    const tasks = [...new Set(rows.map((r) => r.task))]
    const lines = [
        `| Task | ${setups.join(' | ')} |`,
        `|---|${setups.map(() => '--:').join('|')}|`
    ]
    for (const task of tasks) {
        const cells = setups.map((setup) => {
            const t = rows.filter((r) => r.setup === setup && r.task === task)
            return t.length ? `${t.filter((r) => r.pass).length}/${t.length} · ${k(median(t.map((r) => r.tokens.total)))} · ${(median(t.map((r) => r.wallMs)) / 1000).toFixed(0)}s` : '–'
        })
        lines.push(`| ${task} | ${cells.join(' | ')} |`)
    }
    lines.push('', '_Each cell: passed/runs · median tokens · median time._')
    return lines.join('\n')
}

export function failureList (rows: Row[]) {
    const failed = rows.filter((r) => !r.pass)
    if (!failed.length) {
        return '_Every run passed._'
    }
    return failed
        .sort((a, b) => a.setup.localeCompare(b.setup) || a.task.localeCompare(b.task) || a.rep - b.rep)
        .map((r) => `- **${r.setup}** · ${r.task} #${r.rep}: ${r.detail.replace(/\n/g, ' ').slice(0, 200)}`)
        .join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('usage: node src/report.ts results/<id>')
        process.exit(1)
    }
    const rows = await readRows(dir)
    console.log(`${summaryTable(rows)}\n\n${taskTable(rows)}\n\n${failureList(rows)}`)
}
