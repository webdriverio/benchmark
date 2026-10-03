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

import { startSites, resetSite, siteBase } from './sites.ts'
import { TASKS, parseAnswer } from './tasks.ts'
import { SETUPS, type Setup } from './setups.ts'
import { installGitTool, installTool, type InstalledTool } from './tools.ts'

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
        // runs at the same time; every run gets its own page scope (see sites.ts).
        // Keep 1 for published numbers: parallel browsers compete for CPU.
        concurrency: { type: 'string', default: '1' },
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
        const tool = setup.local?.() ?? ('repo' in setup.tool ? await installGitTool(setup.tool) : await installTool(setup.tool))
        tools.set(setup.id, tool)
        console.log(`${setup.id.padEnd(22)} ${tool.pkg}@${tool.version}`)
    } catch (err) {
        skipped[setup.id] = String((err as Error).message ?? err).split('\n')[0]
        console.log(`${setup.id.padEnd(22)} SKIPPED: ${skipped[setup.id]}`)
    }
}

const setups = args['dry-run'] ? selected : selected.filter((s) => tools.has(s.id))
const instructions = new Map<string, string>()
for (const setup of setups) {
    if (!args['dry-run'] && setup.instructions) {
        instructions.set(setup.id, await setup.instructions(tools.get(setup.id)!))
    }
}
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
const transcriptDir = path.join(ROOT, 'transcripts', path.basename(outDir))
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
        ? { pkg: tools.get(s.id)!.pkg, version: tools.get(s.id)!.version, url: tools.get(s.id)!.url }
        : { pkg: 'repo' in s.tool ? s.tool.repo : s.tool.pkg, skipped: skipped[s.id] }])),
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

let done = 0
async function runOne (i: number, { setup, task, rep }: typeof plan[number]) {
    const tool = tools.get(setup.id)!
    const runId = `${runPrefix}-${String(i + 1).padStart(3, '0')}`
    const cwd = path.join(ROOT, '.runs', runId)
    await fs.mkdir(cwd, { recursive: true })
    const scope = `s${i + 1}`
    resetSite(task.id, scope)

    const abortController = new AbortController()
    const timer = setTimeout(() => {
        abortController.abort()
        timedOut?.()
    }, Number(args['timeout-min']) * 60_000)
    const started = Date.now()
    const row: Record<string, unknown> = {
        runId, setup: setup.id, task: task.id, kind: task.kind, rep, model: args.model, tool: `${tool.pkg}@${tool.version}`
    }
    let toolCalls = 0
    let result: Extract<SDKMessage, { type: 'result' }> | undefined
    const transcript: SDKMessage[] = []

    // the abort signal alone does not always end a hung agent (a stuck MCP
    // call can keep the stream open), so the timeout also ends the iterator
    let timedOut: (() => void) | undefined
    const timeout = new Promise<'timeout'>((resolve) => { timedOut = () => resolve('timeout') })
    try {
        const setupOptions = withTmpDir(await setup.options(tool, cwd, runId), path.join(cwd, '.tmp'))
        await fs.mkdir(path.join(cwd, '.tmp'), { recursive: true })
        const stream = query({
            prompt: task.prompt.replaceAll('{base}', siteBase(scope)),
            options: {
                model: args.model,
                thinking: { type: 'disabled' },
                systemPrompt: [SYSTEM_PROMPT, setup.note, instructions.get(setup.id)].filter(Boolean).join('\n\n'),
                cwd,
                maxTurns: Number(args['max-turns']),
                // auto-approved tools come from the setup's allowedTools; anything
                // else goes through its permit() and is denied otherwise
                permissionMode: 'default',
                canUseTool: async (toolName, input) => setup.permit?.(toolName, input)
                    ? { behavior: 'allow', updatedInput: input }
                    : { behavior: 'deny', message: `${toolName} is not available in this benchmark setup. Use the browser tools you were given.` },
                disallowedTools: ['WebFetch', 'WebSearch'],
                // Claude Code approves read-only shell commands (cat, ls, grep …)
                // on its own before canUseTool is asked; this hook runs first,
                // so a Bash call is allowed exactly when the setup permits it
                hooks: setup.permit ? {
                    PreToolUse: [{
                        matcher: 'Bash',
                        hooks: [async (input) => {
                            const toolInput = (input as { tool_input?: Record<string, unknown> }).tool_input ?? {}
                            return setup.permit!('Bash', toolInput)
                                ? {}
                                : { hookSpecificOutput: { hookEventName: 'PreToolUse' as const, permissionDecision: 'deny' as const, permissionDecisionReason: 'Only `wdio session …` commands are available in this benchmark setup.' } }
                        }]
                    }]
                } : undefined,
                settingSources: [],
                abortController,
                ...setupOptions
            }
        })
        const iterator = stream[Symbol.asyncIterator]()
        while (true) {
            const next = await Promise.race([iterator.next(), timeout])
            if (next === 'timeout') {
                abortController.abort()
                stream.close?.()
                throw new Error('timeout')
            }
            if (next.done) {
                break
            }
            const message = next.value
            transcript.push(message)
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
    const check = row.error ? { pass: false, detail: String(row.error) } : await task.check(answer, scope)
    const usage = result?.usage
    const tokens = {
        input: usage?.input_tokens ?? 0,
        output: usage?.output_tokens ?? 0,
        cacheRead: usage?.cache_read_input_tokens ?? 0,
        cacheCreation: usage?.cache_creation_input_tokens ?? 0
    }
    // full transcripts can be megabytes: the workflow keeps them as an artifact, they are not committed
    await fs.mkdir(transcriptDir, { recursive: true })
    await fs.writeFile(path.join(transcriptDir, `${runId}.jsonl`), transcript.map((m) => JSON.stringify(m)).join('\n') + '\n')
    Object.assign(row, {
        pass: check.pass,
        detail: check.detail,
        answer,
        finalMessage: text.length > 2000 ? `…${text.slice(-2000)}` : text,
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

    console.log(`[${++done}/${plan.length}] ${check.pass ? '✓' : '✗'} ${setup.id.padEnd(22)} ${task.id.padEnd(20)} ${String(Math.round(((row.tokens as { total: number }).total) / 1000)).padStart(4)}k tok  ${(((row.wallMs as number) / 1000).toFixed(1)).padStart(6)}s  $${(row.costUsd as number ?? 0).toFixed(3)}  ${check.pass ? '' : check.detail}`)
}

const queue = [...plan.entries()]
await Promise.all(Array.from({ length: Math.max(1, Number(args.concurrency)) }, async () => {
    for (let next = queue.shift(); next; next = queue.shift()) {
        await runOne(...next)
    }
}))

await sites.close()
meta.finishedAt = new Date().toISOString()
await fs.writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')
console.log(`\nResults in ${path.relative(ROOT, outDir)}\nPublish: node src/publish.ts ${path.relative(ROOT, outDir)}`)

/**
 * Browsers that are killed instead of closed leave their profile (100+ MB)
 * in TMPDIR. Pointing the agent and its MCP servers at a directory inside the
 * run directory removes them together with the run.
 */
function withTmpDir<T extends { env?: Record<string, string | undefined>, mcpServers?: Record<string, unknown> }> (options: T, tmp: string): T {
    const mcpServers = Object.fromEntries(Object.entries(options.mcpServers ?? {}).map(([name, server]) => {
        const stdio = server as { type?: string, env?: Record<string, string> }
        return [name, stdio.type === 'stdio' || stdio.type === undefined ? { ...stdio, env: { ...(stdio.env ?? {}), TMPDIR: tmp } } : server]
    }))
    return { ...options, env: { ...(options.env ?? process.env), TMPDIR: tmp }, ...(options.mcpServers && { mcpServers }) }
}
