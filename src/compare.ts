/**
 * node src/compare.ts <dir> [<dir> …]
 *
 * Side-by-side numbers for several result directories, e.g. the iterations
 * of a change against a baseline. One row per setup per directory, then a
 * per-task table of median tokens. "All 8 tasks" sums the per-task medians:
 * what doing every task once typically costs, less skewed by which tasks
 * happen to sit in the middle than a median across tasks.
 */
import path from 'node:path'

import { readRows, median, type Row } from './report.ts'

const dirs = process.argv.slice(2)
if (!dirs.length) {
    console.error('usage: node src/compare.ts <results dir> [<results dir> …]')
    process.exit(1)
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1)
const k = (n: number) => `${Math.round(n / 1000)}k`

const sets: { name: string, setup: string, rows: Row[] }[] = []
for (const dir of dirs) {
    const rows = await readRows(dir)
    for (const setup of [...new Set(rows.map((r) => r.setup))]) {
        sets.push({ name: path.basename(dir), setup, rows: rows.filter((r) => r.setup === setup) })
    }
}

const perTaskSum = (rows: Row[], value: (r: Row) => number) => [...new Set(rows.map((r) => r.task))]
    .reduce((sum, task) => sum + median(rows.filter((r) => r.task === task).map(value)), 0)

console.log('| Run | Setup | Success | All 8 tasks: tokens | All 8 tasks: cost | All 8 tasks: time | Tokens med | Tokens mean | Calls med |')
console.log('|---|---|--:|--:|--:|--:|--:|--:|--:|')
for (const { name, setup, rows } of sets) {
    const passed = rows.filter((r) => r.pass).length
    console.log(`| ${name} | ${setup} | ${passed}/${rows.length} | ${k(perTaskSum(rows, (r) => r.tokens.total))} | $${perTaskSum(rows, (r) => r.costUsd ?? 0).toFixed(2)} | ${(perTaskSum(rows, (r) => r.wallMs) / 1000).toFixed(0)}s | ${k(median(rows.map((r) => r.tokens.total)))} | ${k(mean(rows.map((r) => r.tokens.total)))} | ${median(rows.map((r) => r.toolCalls))} |`)
}

const tasks = [...new Set(sets.flatMap((s) => s.rows.map((r) => r.task)))]
console.log(`\n| Task | ${sets.map((s) => `${s.name}/${s.setup}`).join(' | ')} |`)
console.log(`|---|${sets.map(() => '--:').join('|')}|`)
for (const task of tasks) {
    console.log(`| ${task} | ${sets.map((s) => {
        const t = s.rows.filter((r) => r.task === task)
        return t.length ? `${t.filter((r) => r.pass).length}/${t.length} ${k(median(t.map((r) => r.tokens.total)))}` : '–'
    }).join(' | ')} |`)
}
