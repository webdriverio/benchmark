/**
 * Screenshots after every agent action, taken by the harness, not the agent.
 *
 * Judging a live-web task needs to see what the agent saw. Asking the agent
 * to take screenshots would cost it tokens and treat tools differently, so
 * the harness takes them itself over the Chrome DevTools Protocol, from the
 * browsers the run started (see devToolsPorts). Tools that launch Chrome
 * over a pipe instead get a port added to their launch arguments in
 * setups.ts, so all of them are reached the same way.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const TIMEOUT_MS = 5000

const exec = promisify(execFile)

/** the environment of a process; undefined when the OS doesn't let us read it */
async function environmentOf (pid: number): Promise<Map<string, string> | undefined> {
    try {
        if (process.platform === 'linux') {
            const raw = await fs.readFile(`/proc/${pid}/environ`, 'utf8')
            return new Map(raw.split('\0').filter(Boolean).map((kv) => [kv.slice(0, kv.indexOf('=')), kv.slice(kv.indexOf('=') + 1)]))
        }
        // macOS prints the environment after the command; values with spaces are cut, which TMPDIR never has
        const { stdout } = await exec('ps', ['eww', '-o', 'command=', '-p', String(pid)])
        return new Map([...stdout.matchAll(/(?:^|\s)([A-Z_][A-Z0-9_]*)=(\S*)/g)].map(([, key, value]) => [key, value]))
    } catch {
        return undefined
    }
}

/**
 * Debugging ports of the browsers this run started, newest first.
 *
 * A browser belongs to the run when it, or one of its ancestors (the driver,
 * a tool's daemon), has the run's TMPDIR in its environment. Its port is on
 * the command line, or, for `--remote-debugging-port=0`, in the
 * `DevToolsActivePort` file Chrome writes into its profile. The profile
 * itself is not always in TMPDIR: chromedriver on macOS ignores it.
 */
export async function devToolsPorts (tmp: string): Promise<number[]> {
    const { stdout } = await exec('ps', ['-axo', 'pid=,ppid=,command=']).catch(() => ({ stdout: '' }))
    const procs = new Map<number, { ppid: number, command: string }>()
    for (const line of stdout.split('\n')) {
        const match = line.match(/^\s*(\d+)\s+(\d+)\s+(.*)$/)
        if (match) {
            procs.set(Number(match[1]), { ppid: Number(match[2]), command: match[3] })
        }
    }
    const belongs = new Map<number, boolean>()
    async function ownedByRun (pid: number, depth = 0): Promise<boolean> {
        if (pid <= 1 || depth > 8 || !procs.has(pid)) {
            return false
        }
        if (!belongs.has(pid)) {
            const env = await environmentOf(pid)
            belongs.set(pid, env?.get('TMPDIR') === tmp || await ownedByRun(procs.get(pid)!.ppid, depth + 1))
        }
        return belongs.get(pid)!
    }

    const found: { port: number, pid: number }[] = []
    for (const [pid, { command }] of procs) {
        const flag = command.match(/--remote-debugging-port=(\d+)/)
        if (!flag || command.includes('--type=') || !await ownedByRun(pid)) {
            continue
        }
        let port = Number(flag[1])
        if (!port) {
            const profile = command.match(/--user-data-dir=(.+?)(?=\s--|$)/)?.[1]
            port = profile ? Number((await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8').catch(() => '')).split('\n')[0]) : 0
        }
        if (port > 0) {
            found.push({ port, pid })
        }
    }
    // the newest browser is the one the agent is using
    return found.sort((a, b) => b.pid - a.pid).map((f) => f.port)
}

interface Target { id: string, type: string, url: string, webSocketDebuggerUrl?: string }

async function withTimeout<T> (promise: Promise<T>, ms = TIMEOUT_MS): Promise<T> {
    let timer: NodeJS.Timeout | undefined
    try {
        return await Promise.race([promise, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), ms) })])
    } finally {
        clearTimeout(timer)
    }
}

/** the page the agent is looking at: Chrome lists the most recently active page first */
async function activePage (port: number): Promise<Target | undefined> {
    const res = await withTimeout(fetch(`http://127.0.0.1:${port}/json/list`))
    const targets = await res.json() as Target[]
    return targets.find((t) => t.type === 'page' && t.webSocketDebuggerUrl && !/^(devtools|chrome-extension|chrome-untrusted):/.test(t.url))
}

function send (ws: WebSocket, method: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const id = Math.floor(Math.random() * 1e9)
    return withTimeout(new Promise((resolve, reject) => {
        const onMessage = (event: MessageEvent) => {
            const msg = JSON.parse(String(event.data))
            if (msg.id !== id) {
                return
            }
            ws.removeEventListener('message', onMessage)
            if (msg.error) {
                reject(new Error(msg.error.message))
            } else {
                resolve(msg.result)
            }
        }
        ws.addEventListener('message', onMessage)
        ws.send(JSON.stringify({ id, method, params }))
    }))
}

/**
 * Screenshot of the active page of the run's browser, as JPEG at `file`.
 * Returns the page URL, or undefined when no browser is open yet (or it
 * did not answer in time); a missing screenshot never fails a run.
 */
export async function captureScreenshot (tmp: string, file: string): Promise<{ url: string } | undefined> {
    for (const port of await devToolsPorts(tmp)) {
        let ws: WebSocket | undefined
        try {
            const page = await activePage(port)
            if (!page) {
                continue
            }
            ws = new WebSocket(page.webSocketDebuggerUrl!)
            await withTimeout(new Promise((resolve, reject) => {
                ws!.addEventListener('open', resolve, { once: true })
                ws!.addEventListener('error', () => reject(new Error('connection failed')), { once: true })
            }))
            const { data } = await send(ws, 'Page.captureScreenshot', { format: 'jpeg', quality: 80 }) as { data: string }
            await fs.mkdir(path.dirname(file), { recursive: true })
            await fs.writeFile(file, Buffer.from(data, 'base64'))
            return { url: page.url }
        } catch {
            // a browser that is closing or busy: try the next one, or skip this step
        } finally {
            ws?.close()
        }
    }
    return undefined
}
