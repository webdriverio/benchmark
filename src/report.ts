/**
 * node src/report.ts [results/<file>.jsonl ...]
 *
 * Prints Markdown tables: one row per setup in the same shape as Stagehand's
 * table (median tokens, median cost, success, median time), then a pass
 * matrix per task. Without arguments it reads every file in results/.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

interface Row {
    setup: string
    task: string
    pass: boolean
    wallMs: number
    costUsd?: number
    turns?: number
    toolCalls: number
    tokens: { total: number }
    error?: string
}

const files = process.argv.slice(2).length
    ? process.argv.slice(2)
    : (await fs.readdir(path.join(ROOT, 'results'))).filter((f) => f.endsWith('.jsonl')).map((f) => path.join(ROOT, 'results', f))

const rows: Row[] = []
for (const file of files) {
    for (const line of (await fs.readFile(file, 'utf8')).split('\n').filter(Boolean)) {
        rows.push(JSON.parse(line))
    }
}
if (!rows.length) {
    console.error('No results yet. Run `node src/run.ts` first.')
    process.exit(1)
}

const median = (xs: number[]) => {
    const s = [...xs].sort((a, b) => a - b)
    const m = Math.floor(s.length / 2)
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
const group = <K extends string>(xs: Row[], key: (r: Row) => K) => xs.reduce((acc, r) => {
    (acc[key(r)] ??= []).push(r)
    return acc
}, {} as Record<K, Row[]>)

const bySetup = group(rows, (r) => r.setup)
console.log(`${rows.length} runs from ${files.length} file(s)\n`)
console.log('| Setup | Tokens/task (median) | Cost/task (median) | Success | Time/task (median) | Tool calls (median) |')
console.log('|---|---|---|---|---|---|')
for (const [setup, rs] of Object.entries(bySetup)) {
    const passed = rs.filter((r) => r.pass).length
    console.log(`| ${setup} | ${Math.round(median(rs.map((r) => r.tokens.total)) / 1000)}k | $${median(rs.map((r) => r.costUsd ?? 0)).toFixed(3)} | ${Math.round(passed / rs.length * 100)}% (${passed}/${rs.length}) | ${Math.round(median(rs.map((r) => r.wallMs)) / 1000)} s | ${median(rs.map((r) => r.toolCalls))} |`)
}

const tasks = [...new Set(rows.map((r) => r.task))]
console.log(`\n| Task | ${Object.keys(bySetup).join(' | ')} |`)
console.log(`|---|${Object.keys(bySetup).map(() => '---').join('|')}|`)
for (const task of tasks) {
    const cells = Object.values(bySetup).map((rs) => {
        const t = rs.filter((r) => r.task === task)
        if (!t.length) {
            return '–'
        }
        return `${t.filter((r) => r.pass).length}/${t.length} · ${Math.round(median(t.map((r) => r.tokens.total)) / 1000)}k`
    })
    console.log(`| ${task} | ${cells.join(' | ')} |`)
}
