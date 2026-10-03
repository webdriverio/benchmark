/**
 * node src/run.ts [--setups a,b] [--tasks x,y] [--runs 3] [--model claude-sonnet-5] [--seed 1] [--dry-run]
 *
 * Runs every setup × task × repetition once, in one shuffled order (fixed
 * seed, so a run can be repeated), and appends one JSON line per run to
 * results/<timestamp>.jsonl. `node src/report.ts` turns that into tables.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { query, type SDKMessage } from '@anthropic-ai/claude-agent-sdk'

import { startSites, resetSite } from './sites.ts'
import { TASKS, parseAnswer } from './tasks.ts'
import { SETUPS } from './setups.ts'

const ROOT = path.resolve(import.meta.dirname, '..')

/**
 * Identical for every setup. The setup only appends how to reach the
 * browser (see setups.ts).
 */
const SYSTEM_PROMPT = `You are a browser automation agent. Complete the task in a real web browser using only the browser tools you were given. Read every answer from the page; never guess. Keep going until the task is done, then give the final ANSWER line.`

const { values: args } = parseArgs({
    options: {
        setups: { type: 'string', default: SETUPS.map((s) => s.id).join(',') },
        tasks: { type: 'string', default: TASKS.map((t) => t.id).join(',') },
        runs: { type: 'string', default: '3' },
        model: { type: 'string', default: 'claude-sonnet-5' },
        seed: { type: 'string', default: '1' },
        'max-turns': { type: 'string', default: '80' },
        'timeout-min': { type: 'string', default: '10' },
        'dry-run': { type: 'boolean', default: false }
    }
})

function pick<T extends { id: string }> (all: T[], ids: string): T[] {
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

const setups = pick(SETUPS, args.setups)
const tasks = pick(TASKS, args.tasks)
const plan = shuffle(
    setups.flatMap((setup) => tasks.flatMap((task) => Array.from({ length: Number(args.runs) }, (_, rep) => ({ setup, task, rep: rep + 1 })))),
    Number(args.seed)
)

console.log(`${plan.length} runs: ${setups.length} setups × ${tasks.length} tasks × ${args.runs}, model ${args.model}, seed ${args.seed}`)
if (args['dry-run']) {
    plan.forEach((p, i) => console.log(`${String(i + 1).padStart(3)}  ${p.setup.id.padEnd(22)} ${p.task.id} #${p.rep}`))
    process.exit(0)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const outFile = path.join(ROOT, 'results', `${stamp}.jsonl`)
const sites = await startSites()

for (const [i, { setup, task, rep }] of plan.entries()) {
    const runId = `${stamp}-${String(i + 1).padStart(3, '0')}`
    const cwd = path.join(ROOT, '.runs', runId)
    await fs.mkdir(cwd, { recursive: true })
    resetSite(task.id)

    const abortController = new AbortController()
    const timer = setTimeout(() => abortController.abort(), Number(args['timeout-min']) * 60_000)
    const started = Date.now()
    const row: Record<string, unknown> = {
        runId, setup: setup.id, task: task.id, kind: task.kind, rep, model: args.model, wdioSource: process.env.WDIO_SOURCE ?? 'npm:latest'
    }
    let toolCalls = 0
    let result: Extract<SDKMessage, { type: 'result' }> | undefined

    try {
        const setupOptions = await setup.options(cwd, runId)
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
    await fs.appendFile(outFile, JSON.stringify(row) + '\n')
    await setup.cleanup?.(cwd, runId)

    console.log(`[${i + 1}/${plan.length}] ${check.pass ? '✓' : '✗'} ${setup.id.padEnd(22)} ${task.id.padEnd(20)} ${String(Math.round(((row.tokens as { total: number }).total) / 1000)).padStart(4)}k tok  ${(((row.wallMs as number) / 1000).toFixed(1)).padStart(6)}s  $${(row.costUsd as number ?? 0).toFixed(3)}  ${check.pass ? '' : check.detail}`)
}

await sites.close()
console.log(`\nResults: ${path.relative(ROOT, outFile)}\nReport:  node src/report.ts ${path.relative(ROOT, outFile)}`)
