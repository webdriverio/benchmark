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
    /** version used when `env` is unset (default `latest`) */
    defaultVersion?: string
}

/**
 * A tool that is not published to npm and has to be built from its
 * repository, the way its own README does it.
 */
export interface GitToolSpec {
    /** GitHub repository, owner/name */
    repo: string
    /** environment variable with the git ref to build (branch, tag or sha) */
    env: string
    /** `latest` resolves to the highest release tag with this prefix */
    tagPrefix: string
    /** package.json whose version labels the build, e.g. 4.1.0+50f3ab8 */
    versionFile: string
    /**
     * commands to build it, in order. They run from the benchmark root, not
     * inside the checkout (so npm does not apply the checkout's devEngines to
     * npx itself); `{dir}` is replaced with the checkout directory.
     */
    build: string[][]
    /** JS entry point of the binary, relative to the checkout */
    entry: string
}

export interface InstalledTool {
    pkg: string
    version: string
    /** absolute path of the JS entry point of the binary */
    binPath: string
    /** checkout directory, for tools built from git */
    root?: string
    /** where the exact version can be looked at */
    url?: string
}

/** semver, a dist-tag, or a range; nothing that could reach a shell */
const VERSION = /^[\w.^~<>=*|-]{1,64}$/

export function requestedVersion (spec: ToolSpec) {
    const version = process.env[spec.env]?.trim() || spec.defaultVersion || 'latest'
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

const semverTag = /^(\d+)\.(\d+)\.(\d+)$/

async function latestReleaseTag (spec: GitToolSpec) {
    const { stdout } = await run('git', ['ls-remote', '--tags', '--refs', `https://github.com/${spec.repo}.git`])
    const versions = stdout.split('\n')
        .map((line) => line.split('refs/tags/')[1] ?? '')
        .filter((tag) => tag.startsWith(spec.tagPrefix) && semverTag.test(tag.slice(spec.tagPrefix.length)))
        .map((tag) => tag.slice(spec.tagPrefix.length).split('.').map(Number))
        .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2])
    const newest = versions.at(-1)
    if (!newest) {
        throw new Error(`no release tag starting with ${spec.tagPrefix} in ${spec.repo}`)
    }
    return `${spec.tagPrefix}${newest.join('.')}`
}

/** Clone `repo` at the requested ref, build it once per commit, and return its entry point. */
export async function installGitTool (spec: GitToolSpec): Promise<InstalledTool> {
    const requested = process.env[spec.env]?.trim() || 'latest'
    if (!/^[\w.@/+-]{1,128}$/.test(requested)) {
        throw new Error(`${spec.env}="${requested}" is not a valid git ref`)
    }
    const ref = requested === 'latest' ? await latestReleaseTag(spec) : requested
    const tools = path.join(ROOT, '.tools')
    const fetchDir = path.join(tools, `git-${spec.repo.replace('/', '__')}-fetch`)
    await fs.rm(fetchDir, { recursive: true, force: true })
    await fs.mkdir(fetchDir, { recursive: true })
    await run('git', ['init', '-q'], { cwd: fetchDir })
    await run('git', ['fetch', '-q', '--depth', '1', `https://github.com/${spec.repo}.git`, ref], { cwd: fetchDir })
    await run('git', ['checkout', '-q', 'FETCH_HEAD'], { cwd: fetchDir })
    const sha = (await run('git', ['rev-parse', 'HEAD'], { cwd: fetchDir })).stdout.trim()

    const dir = path.join(tools, `git-${spec.repo.replace('/', '__')}@${sha}`)
    const binPath = path.join(dir, spec.entry)
    try {
        await fs.access(binPath)
        await fs.rm(fetchDir, { recursive: true, force: true })
    } catch {
        await fs.rm(dir, { recursive: true, force: true })
        await fs.rename(fetchDir, dir)
        for (const [cmd, ...args] of spec.build) {
            await run(cmd, args.map((arg) => arg.replaceAll('{dir}', dir)), { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 })
        }
        await fs.access(binPath)
    }
    const { version } = JSON.parse(await fs.readFile(path.join(dir, spec.versionFile), 'utf8'))
    return {
        pkg: spec.repo,
        version: `${version}+${sha.slice(0, 7)}`,
        binPath,
        root: dir,
        url: `https://github.com/${spec.repo}/tree/${sha}`
    }
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
    return { pkg: spec.pkg, version, binPath: await binPathOf(dir, spec.pkg, spec.bin), url: `https://www.npmjs.com/package/${spec.pkg}/v/${version}` }
}
