/**
 * What an agent did in a run, step by step: the published trace.
 *
 *   node src/steps.ts results/<id> [transcripts/<id>]
 *
 * writes steps-<label>.jsonl next to every runs-<label>.jsonl from the full
 * transcripts the workflow keeps as an artifact (for runs published before
 * the runner wrote step logs itself).
 *
 * One line per run: { runId, steps: [{ tool, action, thought?, url?, error? }] }.
 * The action is what the agent issued, as WebJudge sees it (the shell command
 * or the tool call), never the tool's reply; `thought` is the agent's text
 * right before the call, `url` the page after it, `error` the start of a
 * failed or denied call's reply. Long values are cut, so a full run of 700
 * traces stays a few MB in git.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

/** one tool call as the harness saw it (screenshots.ts hook, steps.json) */
export interface Step { step: number, toolUseId?: string, tool: string, input: unknown, screenshot?: string, url?: string }

export interface TraceStep { tool: string, action: string, thought?: string, url?: string, error?: string }

/** the action as the agent issued it: the shell command or the tool call, never the tool's reply */
export function actionText ({ tool, input }: { tool: string, input: unknown }) {
    const command = (input as { command?: unknown })?.command
    if (tool === 'Bash' && typeof command === 'string') {
        return command
    }
    return `${tool.replace(/^mcp__browser__/, '')} ${JSON.stringify(input)}`
}

/** tool calls that aren't browser actions: loading the skill, reading its docs */
export const isBrowserAction = (step: { tool: string }) => !['Skill', 'Read', 'ToolSearch', 'TodoWrite'].includes(step.tool)

const cut = (text: string, max: number) => {
    const clean = text.trim()
    return clean.length > max ? `${clean.slice(0, max)}…` : clean
}

interface Block { type: string, id?: string, name?: string, input?: unknown, text?: string, tool_use_id?: string, is_error?: boolean, content?: unknown }
interface Message { type: string, message?: unknown }

const blocksOf = (message: Message): Block[] => {
    const content = (message.message as { content?: unknown } | undefined)?.content
    return Array.isArray(content) ? content as Block[] : []
}

function replyText (content: unknown): string {
    if (typeof content === 'string') {
        return content
    }
    return Array.isArray(content) ? content.map((c: Block) => c.type === 'text' ? c.text ?? '' : '').join(' ') : ''
}

/**
 * Every tool call in the transcript, in order, including the failed and
 * denied ones the screenshot hook never sees; the page URL comes from the
 * hook's step with the same tool use id.
 */
export function traceOf (transcript: Message[], hookSteps: Step[] = []): TraceStep[] {
    const urls = new Map(hookSteps.filter((s) => s.toolUseId && s.url).map((s) => [s.toolUseId!, s.url!]))
    const errors = new Map<string, string>()
    for (const message of transcript) {
        if (message.type === 'user') {
            for (const block of blocksOf(message)) {
                if (block.type === 'tool_result' && block.is_error && block.tool_use_id) {
                    errors.set(block.tool_use_id, replyText(block.content))
                }
            }
        }
    }
    const steps: TraceStep[] = []
    let thought = ''
    for (const message of transcript) {
        if (message.type !== 'assistant') {
            continue
        }
        for (const block of blocksOf(message)) {
            if (block.type === 'text' && block.text) {
                thought += (thought ? '\n' : '') + block.text
            } else if (block.type === 'tool_use' && block.name) {
                const id = block.id ?? ''
                steps.push({
                    tool: block.name.replace(/^mcp__browser__/, ''),
                    action: cut(actionText({ tool: block.name, input: block.input }), 400),
                    ...(thought.trim() && { thought: cut(thought, 400) }),
                    ...(urls.has(id) && { url: cut(urls.get(id)!, 300) }),
                    ...(errors.has(id) && { error: cut(errors.get(id)!, 200) })
                })
                thought = ''
            }
        }
    }
    return steps
}

/** steps-<label>.jsonl for every runs-<label>.jsonl in `resultDir`, from the transcripts in `transcriptDir` */
async function backfill (resultDir: string, transcriptDir: string) {
    const files = (await fs.readdir(resultDir)).filter((f) => f.startsWith('runs-') && f.endsWith('.jsonl'))
    let written = 0
    let missing = 0
    for (const file of files) {
        const lines: string[] = []
        for (const line of (await fs.readFile(path.join(resultDir, file), 'utf8')).split('\n').filter(Boolean)) {
            const { runId } = JSON.parse(line) as { runId: string }
            const raw = await fs.readFile(path.join(transcriptDir, `${runId}.jsonl`), 'utf8').catch(() => undefined)
            if (raw === undefined) {
                missing++
                continue
            }
            const transcript = raw.split('\n').filter(Boolean).map((l) => JSON.parse(l) as Message)
            const hookSteps: Step[] = JSON.parse(await fs.readFile(path.join(transcriptDir, runId, 'steps.json'), 'utf8').catch(() => '[]'))
            lines.push(JSON.stringify({ runId, steps: traceOf(transcript, hookSteps) }))
            written++
        }
        if (lines.length) {
            await fs.writeFile(path.join(resultDir, `steps-${file.slice('runs-'.length)}`), lines.join('\n') + '\n')
        }
    }
    console.log(`${path.basename(resultDir)}: step logs for ${written} run(s)${missing ? `, ${missing} without a transcript` : ''}`)
}

if (import.meta.filename === path.resolve(process.argv[1] ?? '')) {
    const [dir, transcripts] = process.argv.slice(2)
    if (!dir) {
        console.error('usage: node src/steps.ts results/<id> [transcripts/<id>]')
        process.exit(1)
    }
    const resultDir = path.resolve(dir)
    await backfill(resultDir, path.resolve(transcripts ?? path.join(import.meta.dirname, '..', 'transcripts', path.basename(resultDir))))
}
