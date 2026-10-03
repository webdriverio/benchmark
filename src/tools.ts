/**
 * Installs the npm package behind each setup ONCE, before any run starts,
 * so install time never counts against a tool. Versions come from the
 * environment (the workflow inputs) and dist-tags like `latest` or `next`
 * are resolved to the exact version, which is what the report records.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)
const ROOT = path.resolve(import.meta.dirname, '..')

export interface ToolSpec {
    /** npm package */
    pkg: string
    /** environment variable that overrides the version */
    env: string
    /** binary to run, when the package has several */
    bin?: string
}

export interface InstalledTool {
    pkg: string
    version: string
    /** absolute path of the JS entry point of the binary */
    binPath: string
}

/** semver, a dist-tag, or a range; nothing that could reach a shell */
const VERSION = /^[\w.^~<>=*|-]{1,64}$/

export function requestedVersion (spec: ToolSpec) {
    const version = process.env[spec.env]?.trim() || 'latest'
    if (!VERSION.test(version)) {
        throw new Error(`${spec.env}="${version}" is not a valid version or dist-tag`)
    }
    return version
}

async function resolveVersion (pkg: string, requested: string) {
    const { stdout } = await run('npm', ['view', `${pkg}@${requested}`, 'version', '--json'])
    const parsed = JSON.parse(stdout) as string | string[]
    const version = Array.isArray(parsed) ? parsed.at(-1) : parsed
    if (!version) {
        throw new Error(`${pkg}@${requested} matches no published version`)
    }
    return version
}

async function binPathOf (dir: string, pkg: string, bin?: string) {
    const pkgDir = path.join(dir, 'node_modules', pkg)
    const manifest = JSON.parse(await fs.readFile(path.join(pkgDir, 'package.json'), 'utf8'))
    const bins: Record<string, string> = typeof manifest.bin === 'string' ? { [pkg.split('/').pop()!]: manifest.bin } : manifest.bin ?? {}
    const entry = bin ? bins[bin] : Object.values(bins)[0]
    if (!entry) {
        throw new Error(`${pkg} has no binary${bin ? ` named "${bin}"` : ''}`)
    }
    return path.join(pkgDir, entry)
}

export async function installTool (spec: ToolSpec): Promise<InstalledTool> {
    const version = await resolveVersion(spec.pkg, requestedVersion(spec))
    const dir = path.join(ROOT, '.tools', `${spec.pkg.replace('/', '__')}@${version}`)
    try {
        await fs.access(path.join(dir, 'node_modules', spec.pkg, 'package.json'))
    } catch {
        await fs.mkdir(dir, { recursive: true })
        await fs.writeFile(path.join(dir, 'package.json'), '{"private":true}')
        await run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error', `${spec.pkg}@${version}`], { cwd: dir })
    }
    return { pkg: spec.pkg, version, binPath: await binPathOf(dir, spec.pkg, spec.bin) }
}
