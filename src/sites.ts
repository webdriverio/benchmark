/**
 * Serves the four local test pages and records what the agent did on them.
 *
 * Two origins on purpose: pages load from http://localhost:4100 and the
 * iframe form loads from http://127.0.0.1:4101 (BENCH_PORT + 1), a different *site*, so
 * Chrome renders it as an out-of-process iframe.
 *
 *   POST /api/<task>/event   the page reports an action, returns { code }
 *   GET  /api/<task>/state   what happened so far, read by the task checks
 *   POST /api/<task>/reset   cleared before every run
 *
 * Everything is also served under /r/<scope>/…, with its own state, so runs
 * of the same task can happen at the same time (`--concurrency`). The pages
 * call the API with relative URLs, so they stay inside their scope.
 */
import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

/** BENCH_PORT moves both origins, so several benchmark processes can run at once */
const PORT = Number(process.env.BENCH_PORT ?? 4100)
export const MAIN_ORIGIN = `http://localhost:${PORT}`
export const FRAME_ORIGIN = `http://127.0.0.1:${PORT + 1}`

const PAGES = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'sites', 'pages')
const TYPES: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml'
}

export interface SiteEvent {
    type: string
    data: Record<string, unknown>
    code: string
    at: number
}

const state = new Map<string, SiteEvent[]>()
const key = (task: string, scope = '') => `${scope}/${task}`

export function siteState (task: string, scope?: string): SiteEvent[] {
    return state.get(key(task, scope)) ?? []
}

export function resetSite (task: string, scope?: string) {
    state.delete(key(task, scope))
}

/** where a run finds the local pages: MAIN_ORIGIN, or its own /r/<scope> */
export function siteBase (scope?: string) {
    return scope ? `${MAIN_ORIGIN}/r/${scope}` : MAIN_ORIGIN
}

async function readBody (req: http.IncomingMessage) {
    let body = ''
    for await (const chunk of req) {
        body += chunk
    }
    return body ? JSON.parse(body) : {}
}

function send (res: http.ServerResponse, status: number, body: unknown, type = 'application/json') {
    res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' })
    res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body))
}

async function handle (req: http.IncomingMessage, res: http.ServerResponse) {
    const url = new URL(req.url ?? '/', 'http://x')
    const scoped = url.pathname.match(/^\/r\/([\w-]+)(\/.*)$/)
    const scope = scoped?.[1]
    const pathname = scoped?.[2] ?? url.pathname
    const api = pathname.match(/^\/api\/([\w-]+)\/(event|state|reset)$/)
    if (api) {
        const [, task, action] = api
        if (action === 'state') {
            return send(res, 200, siteState(task, scope))
        }
        if (req.method !== 'POST') {
            return send(res, 405, { error: 'POST only' })
        }
        if (action === 'reset') {
            resetSite(task, scope)
            return send(res, 200, { ok: true })
        }
        const { type = 'event', data = {} } = await readBody(req)
        const event: SiteEvent = { type, data, code: crypto.randomBytes(3).toString('hex').toUpperCase(), at: Date.now() }
        state.set(key(task, scope), [...siteState(task, scope), event])
        return send(res, 200, { code: event.code })
    }

    let file = path.join(PAGES, path.normalize(pathname))
    if (!file.startsWith(PAGES)) {
        return send(res, 403, 'forbidden', 'text/plain')
    }
    if (pathname.endsWith('/')) {
        file = path.join(file, 'index.html')
    }
    try {
        return send(res, 200, await fs.readFile(file), TYPES[path.extname(file)] ?? 'application/octet-stream')
    } catch {
        return send(res, 404, 'not found', 'text/plain')
    }
}

function listen (port: number) {
    return new Promise<http.Server>((resolve, reject) => {
        const server = http.createServer((req, res) => {
            handle(req, res).catch((err) => send(res, 500, { error: String(err) }))
        })
        server.once('error', reject)
        server.listen(port, () => resolve(server))
    })
}

export async function startSites () {
    const servers = await Promise.all([listen(PORT), listen(PORT + 1)])
    return {
        close: () => Promise.all(servers.map((s) => new Promise((resolve) => s.close(resolve))))
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await startSites()
    console.log(`Test pages on ${MAIN_ORIGIN}/ (iframe origin ${FRAME_ORIGIN})`)
}
