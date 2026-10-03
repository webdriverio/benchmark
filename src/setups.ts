/**
 * The tool setups we compare. Every setup gets the same model, the same
 * system prompt, the same task prompts and NO other way to reach the web:
 * WebFetch, WebSearch and every other built-in tool are switched off, and
 * permission mode `dontAsk` denies any tool call a setup does not allow.
 *
 * Versions are pinned to what Stagehand used where they named one
 * (Playwright MCP 0.0.82). Override the WebdriverIO source with WDIO_SOURCE:
 *   WDIO_SOURCE=npm:10.0.0          a published version
 *   WDIO_SOURCE=local:/path/to/wdio a local checkout of webdriverio/webdriverio, built
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Options } from '@anthropic-ai/claude-agent-sdk'

const run = promisify(execFile)
const ROOT = path.resolve(import.meta.dirname, '..')

export interface Setup {
    id: string
    label: string
    /** one or two sentences appended to the shared system prompt */
    note: string
    /** build the Agent SDK options for one run in `cwd` */
    options: (cwd: string, runId: string) => Promise<Partial<Options>>
    /** clean up anything the run left behind (browsers, daemons) */
    cleanup?: (cwd: string, runId: string) => Promise<void>
}

const HEADLESS = 'Use a headless browser.'

function mcpSetup (id: string, label: string, server: { command: string, args: string[], env?: Record<string, string> }, note = ''): Setup {
    return {
        id,
        label,
        note: `Use the ${label} tools to control the browser. ${HEADLESS} ${note}`.trim(),
        options: async () => ({
            tools: [],
            mcpServers: { browser: { type: 'stdio', ...server } },
            allowedTools: ['mcp__browser']
        })
    }
}

/**
 * Resolve the WebdriverIO CLI the agent runs as `wdio` / `npx wdio`.
 * Published versions install once into .tools/.
 */
async function wdioBin (): Promise<string> {
    const source = process.env.WDIO_SOURCE ?? 'npm:latest'
    if (source.startsWith('local:')) {
        const bin = path.join(source.slice('local:'.length), 'packages', 'wdio-cli', 'bin', 'wdio.js')
        await fs.access(bin)
        return bin
    }
    const version = source.slice('npm:'.length)
    const dir = path.join(ROOT, '.tools', `wdio-${version}`)
    const bin = path.join(dir, 'node_modules', '@wdio', 'cli', 'bin', 'wdio.js')
    try {
        await fs.access(bin)
    } catch {
        await fs.mkdir(dir, { recursive: true })
        await fs.writeFile(path.join(dir, 'package.json'), '{"private":true}')
        await run('npm', ['install', '--no-audit', '--no-fund', `@wdio/cli@${version}`], { cwd: dir })
    }
    return bin
}

/**
 * Give the run directory a `wdio` binary (so both `wdio session` and
 * `npx wdio session` resolve locally, never from the registry) and install
 * the wdio-session skill where Claude Code looks for project skills.
 */
async function prepareWdioSession (cwd: string) {
    const bin = await wdioBin()
    const binDir = path.join(cwd, 'node_modules', '.bin')
    await fs.mkdir(binDir, { recursive: true })
    await fs.writeFile(path.join(cwd, 'package.json'), '{"private":true}')
    const shim = path.join(binDir, 'wdio')
    await fs.writeFile(shim, `#!/bin/sh\nexec node "${bin}" "$@"\n`)
    await fs.chmod(shim, 0o755)

    await run('node', [bin, 'session', 'skill', '--install', cwd], { cwd })
    await fs.mkdir(path.join(cwd, '.claude', 'skills'), { recursive: true })
    await fs.cp(path.join(cwd, '.agents', 'skills', 'wdio-session'), path.join(cwd, '.claude', 'skills', 'wdio-session'), { recursive: true })
    return binDir
}

export const SETUPS: Setup[] = [
    mcpSetup('playwright-mcp', 'Playwright MCP', {
        command: 'npx',
        args: ['-y', '@playwright/mcp@0.0.82', '--headless', '--isolated']
    }),
    mcpSetup('playwright-mcp-tuned', 'Playwright MCP', {
        command: 'npx',
        args: ['-y', '@playwright/mcp@0.0.82', '--headless', '--isolated', '--snapshot-mode', 'none', '--codegen', 'none']
    }),
    /**
     * Stagehand's Claude Code integration is an MCP server with `run`,
     * `snapshot` and `screenshot`. `@browserbasehq/stagehand-mcp` is not on
     * npm yet (browserbase/stagehand#2971), so point STAGEHAND_MCP at a
     * build of it: STAGEHAND_MCP="node /path/to/stagehand-mcp/dist/index.js"
     */
    {
        ...mcpSetup('stagehand', 'Stagehand', { command: 'node', args: [] }),
        options: async () => {
            const [command, ...args] = (process.env.STAGEHAND_MCP ?? 'npx -y @browserbasehq/stagehand-mcp@0.1.0').split(' ')
            return {
                tools: [],
                mcpServers: { browser: { type: 'stdio', command, args, env: { ...process.env as Record<string, string>, STAGEHAND_ENV: 'LOCAL', HEADLESS: 'true' } } },
                allowedTools: ['mcp__browser']
            }
        }
    },
    mcpSetup('wdio-mcp', 'WebdriverIO MCP', {
        command: 'npx',
        args: ['-y', '@wdio/mcp@3.14.0']
    }),
    {
        id: 'wdio-session',
        label: 'WebdriverIO session',
        note: `Use the wdio-session skill: drive the browser with \`npx wdio session …\` shell commands. ${HEADLESS}`,
        options: async (cwd, runId) => {
            const binDir = await prepareWdioSession(cwd)
            return {
                tools: ['Bash', 'Skill', 'Read'],
                allowedTools: ['Bash(npx wdio session:*)', 'Bash(wdio session:*)', 'Skill', 'Read'],
                settingSources: ['project'],
                env: { ...process.env, PATH: `${binDir}:${process.env.PATH}`, WDIO_SESSION: runId }
            }
        },
        cleanup: async (cwd, runId) => {
            await run(path.join(cwd, 'node_modules', '.bin', 'wdio'), ['session', 'close', '-s', runId], { cwd }).catch(() => {})
        }
    }
]
