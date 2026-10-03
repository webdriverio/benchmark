/**
 * The tool setups we compare. Every setup gets the same model, the same
 * system prompt, the same task prompts and NO other way to reach the web:
 * WebFetch, WebSearch and every other built-in tool are switched off, and
 * permission mode `dontAsk` denies any tool call a setup does not allow.
 *
 * Each setup names the package it runs and the environment variable that
 * picks its version (default `latest`, see tools.ts):
 *
 *   WDIO_VERSION            @wdio/cli, for `wdio session`
 *   WDIO_MCP_VERSION        @wdio/mcp
 *   PLAYWRIGHT_MCP_VERSION  @playwright/mcp
 *   STAGEHAND_REF           git ref of browserbase/stagehand; its Claude Code
 *                           MCP server is not on npm, so it is built from source
 *
 * For development against unreleased code:
 *   WDIO_LOCAL=/path/to/webdriverio   a built checkout of webdriverio/webdriverio
 *   WDIO_MCP_LOCAL=/path/to/mcp       a built checkout of webdriverio/mcp
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Options } from '@anthropic-ai/claude-agent-sdk'

import type { GitToolSpec, InstalledTool, ToolSpec } from './tools.ts'
import { isWdioSessionCommand } from './permit.ts'

const run = promisify(execFile)

export interface Setup {
    id: string
    label: string
    /** the npm package (or repository) this setup runs */
    tool: ToolSpec | GitToolSpec
    /** a local build to use instead of the npm package, if configured */
    local?: () => InstalledTool | undefined
    /** one or two sentences appended to the shared system prompt */
    note: string
    /** instructions the tool's own integration gives its agent, appended after the note */
    instructions?: (tool: InstalledTool) => Promise<string>
    /** build the Agent SDK options for one run in `cwd` */
    options: (tool: InstalledTool, cwd: string, runId: string) => Promise<Partial<Options>>
    /**
     * Tool calls this setup may make beyond its auto-approved `allowedTools`.
     * Everything else is denied (see run.ts).
     */
    permit?: (toolName: string, input: Record<string, unknown>) => boolean
    /** clean up anything the run left behind (browsers, daemons) */
    cleanup?: (tool: InstalledTool, cwd: string, runId: string) => Promise<void>
}

// The prompts do not mention headless or headed: each tool picks its own
// default (Playwright MCP is started with --headless, Stagehand's facade only
// runs headed), and the workflow gives every job the same virtual display.

function mcpSetup (id: string, label: string, tool: ToolSpec, args: string[] = []): Setup {
    return {
        id,
        label,
        tool,
        note: `Use the ${label} tools to control the browser.`,
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
        // Stagehand's Claude Code integration: the facade MCP server with
        // `run`, `snapshot` and `screenshot`, wired up the way
        // packages/integrations/claude-code/src/agent.ts does it
        id: 'stagehand',
        label: 'Stagehand',
        tool: {
            repo: 'browserbase/stagehand',
            env: 'STAGEHAND_REF',
            tagPrefix: '@browserbasehq/stagehand@',
            versionFile: 'packages/sdk-ts/package.json',
            build: [
                ['npx', '--yes', 'pnpm@11', '--dir', '{dir}', 'install', '--frozen-lockfile'],
                ['npx', '--yes', 'pnpm@11', '--dir', '{dir}', 'exec', 'turbo', 'run', 'build', '--filter', '@browserbasehq/stagehand-integrations']
            ],
            entry: 'packages/integrations/core/dist/facade/stdio-server.mjs'
        },
        note: 'Use the Stagehand tools to control the browser.',
        // their agent runs with FACADE_AGENT_INSTRUCTIONS as its system prompt
        instructions: async ({ root }) => {
            const facade = await import(path.join(root!, 'packages', 'integrations', 'core', 'dist', 'facade', 'index.mjs'))
            return facade.FACADE_AGENT_INSTRUCTIONS as string
        },
        options: async ({ binPath }) => {
            // like their buildAllowlistedEnv(): only STAGEHAND_* and BROWSERBASE_*
            // reach the server, plus what a local Chrome needs. No
            // STAGEHAND_MODEL_NAME and no provider keys, so the facade runs
            // no model of its own and every token goes through the agent.
            const env: Record<string, string> = { STAGEHAND_BROWSER: 'local' }
            for (const [key, value] of Object.entries(process.env)) {
                if (value && (/^(STAGEHAND_|BROWSERBASE_)/.test(key) || ['PATH', 'HOME', 'DISPLAY', 'TMPDIR'].includes(key))) {
                    env[key] = value
                }
            }
            delete env.STAGEHAND_MODEL_NAME
            delete env.STAGEHAND_MODEL_API_KEY
            return {
                tools: [],
                mcpServers: { browser: { type: 'stdio', command: process.execPath, args: [binPath], env } },
                allowedTools: ['mcp__browser']
            }
        }
    },
    {
        ...mcpSetup('wdio-mcp', 'WebdriverIO MCP', { pkg: '@wdio/mcp', env: 'WDIO_MCP_VERSION', bin: 'wdio-mcp' }),
        local: () => process.env.WDIO_MCP_LOCAL
            ? { pkg: '@wdio/mcp', version: 'local build', binPath: path.join(process.env.WDIO_MCP_LOCAL, 'lib', 'server.js') }
            : undefined
    },
    {
        id: 'wdio-session',
        label: 'WebdriverIO session',
        tool: { pkg: '@wdio/cli', env: 'WDIO_VERSION', bin: 'wdio' },
        local: () => process.env.WDIO_LOCAL
            ? { pkg: '@wdio/cli', version: 'local build', binPath: path.join(process.env.WDIO_LOCAL, 'packages', 'wdio-cli', 'bin', 'wdio.js') }
            : undefined,
        note: 'Use the wdio-session skill: drive the browser with `npx wdio session …` shell commands.',
        options: async ({ binPath }, cwd, runId) => {
            const binDir = await prepareWdioSession(binPath, cwd)
            return {
                tools: ['Bash', 'Skill', 'Read'],
                allowedTools: ['Skill', 'Read'],
                settingSources: ['project'],
                // only its own skill: Claude Code's bundled skills (code-review,
                // deep-research, …) would otherwise be listed on every turn
                skills: ['wdio-session'],
                env: { ...process.env, PATH: `${binDir}:${process.env.PATH}`, WDIO_SESSION: runId }
            }
        },
        permit: (toolName, input) => toolName === 'Bash' && typeof input.command === 'string' && isWdioSessionCommand(input.command),
        cleanup: async ({ binPath }, cwd, runId) => {
            await run(process.execPath, [binPath, 'session', 'close', '-s', runId], { cwd }).catch(() => {})
        }
    }
]
