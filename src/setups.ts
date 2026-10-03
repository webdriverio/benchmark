/**
 * The tool setups we compare. Every setup gets the same model, the same
 * system prompt, the same task prompts and NO other way to reach the web:
 * WebFetch, WebSearch and every other built-in tool are switched off, and
 * permission mode `dontAsk` denies any tool call a setup does not allow.
 *
 * Each setup names the npm package it runs and the environment variable
 * that picks its version (default `latest`, see tools.ts):
 *
 *   WDIO_VERSION            @wdio/cli, for `wdio session`
 *   WDIO_MCP_VERSION        @wdio/mcp
 *   PLAYWRIGHT_MCP_VERSION  @playwright/mcp
 *   STAGEHAND_MCP_VERSION   @browserbasehq/stagehand-mcp
 *
 * For development against unreleased code:
 *   WDIO_LOCAL=/path/to/webdriverio   a built checkout of webdriverio/webdriverio
 *   STAGEHAND_MCP="node /path/to/dist/index.js"   a local Stagehand MCP build
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Options } from '@anthropic-ai/claude-agent-sdk'

import type { InstalledTool, ToolSpec } from './tools.ts'

const run = promisify(execFile)

export interface Setup {
    id: string
    label: string
    /** the npm package this setup runs */
    tool: ToolSpec
    /** a local build to use instead of the npm package, if configured */
    local?: () => InstalledTool | undefined
    /** one or two sentences appended to the shared system prompt */
    note: string
    /** build the Agent SDK options for one run in `cwd` */
    options: (tool: InstalledTool, cwd: string, runId: string) => Promise<Partial<Options>>
    /** clean up anything the run left behind (browsers, daemons) */
    cleanup?: (tool: InstalledTool, cwd: string, runId: string) => Promise<void>
}

const HEADLESS = 'Use a headless browser.'

function mcpSetup (id: string, label: string, tool: ToolSpec, args: string[] = []): Setup {
    return {
        id,
        label,
        tool,
        note: `Use the ${label} tools to control the browser. ${HEADLESS}`,
        options: async ({ binPath }) => ({
            tools: [],
            mcpServers: { browser: { type: 'stdio', command: process.execPath, args: [binPath, ...args] } },
            allowedTools: ['mcp__browser']
        })
    }
}

/**
 * Give the run directory a `wdio` binary (so both `wdio session` and
 * `npx wdio session` resolve locally, never from the registry) and install
 * the wdio-session skill where Claude Code looks for project skills.
 */
async function prepareWdioSession (bin: string, cwd: string) {
    const binDir = path.join(cwd, 'node_modules', '.bin')
    await fs.mkdir(binDir, { recursive: true })
    await fs.writeFile(path.join(cwd, 'package.json'), '{"private":true}')
    const shim = path.join(binDir, 'wdio')
    await fs.writeFile(shim, `#!/bin/sh\nexec "${process.execPath}" "${bin}" "$@"\n`)
    await fs.chmod(shim, 0o755)

    await run(process.execPath, [bin, 'session', 'skill', '--install', cwd], { cwd })
    await fs.mkdir(path.join(cwd, '.claude', 'skills'), { recursive: true })
    await fs.cp(path.join(cwd, '.agents', 'skills', 'wdio-session'), path.join(cwd, '.claude', 'skills', 'wdio-session'), { recursive: true })
    return binDir
}

const PLAYWRIGHT_MCP: ToolSpec = { pkg: '@playwright/mcp', env: 'PLAYWRIGHT_MCP_VERSION' }

export const SETUPS: Setup[] = [
    mcpSetup('playwright-mcp', 'Playwright MCP', PLAYWRIGHT_MCP, ['--headless', '--isolated']),
    mcpSetup('playwright-mcp-tuned', 'Playwright MCP', PLAYWRIGHT_MCP, ['--headless', '--isolated', '--snapshot-mode', 'none', '--codegen', 'none']),
    {
        // Stagehand's Claude Code integration: an MCP server with `run`,
        // `snapshot` and `screenshot`, running a local browser
        ...mcpSetup('stagehand', 'Stagehand', { pkg: '@browserbasehq/stagehand-mcp', env: 'STAGEHAND_MCP_VERSION' }),
        local: () => process.env.STAGEHAND_MCP
            ? { pkg: '@browserbasehq/stagehand-mcp', version: 'local build', binPath: process.env.STAGEHAND_MCP }
            : undefined,
        options: async ({ binPath }) => {
            const [command, ...args] = binPath.endsWith('.js') ? [process.execPath, binPath] : binPath.split(' ')
            return {
                tools: [],
                mcpServers: { browser: { type: 'stdio', command, args, env: { ...process.env as Record<string, string>, STAGEHAND_ENV: 'LOCAL', HEADLESS: 'true' } } },
                allowedTools: ['mcp__browser']
            }
        }
    },
    mcpSetup('wdio-mcp', 'WebdriverIO MCP', { pkg: '@wdio/mcp', env: 'WDIO_MCP_VERSION', bin: 'wdio-mcp' }),
    {
        id: 'wdio-session',
        label: 'WebdriverIO session',
        tool: { pkg: '@wdio/cli', env: 'WDIO_VERSION', bin: 'wdio' },
        local: () => process.env.WDIO_LOCAL
            ? { pkg: '@wdio/cli', version: 'local build', binPath: path.join(process.env.WDIO_LOCAL, 'packages', 'wdio-cli', 'bin', 'wdio.js') }
            : undefined,
        note: `Use the wdio-session skill: drive the browser with \`npx wdio session …\` shell commands. ${HEADLESS}`,
        options: async ({ binPath }, cwd, runId) => {
            const binDir = await prepareWdioSession(binPath, cwd)
            return {
                tools: ['Bash', 'Skill', 'Read'],
                allowedTools: ['Bash(npx wdio session:*)', 'Bash(wdio session:*)', 'Skill', 'Read'],
                settingSources: ['project'],
                env: { ...process.env, PATH: `${binDir}:${process.env.PATH}`, WDIO_SESSION: runId }
            }
        },
        cleanup: async ({ binPath }, cwd, runId) => {
            await run(process.execPath, [binPath, 'session', 'close', '-s', runId], { cwd }).catch(() => {})
        }
    }
]
