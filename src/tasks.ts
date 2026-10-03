/**
 * The eight tasks from Stagehand's "Why Playwright MCP Uses So Many Tokens"
 * (stagehand.dev/blog/playwright-mcp-token-usage, 2026-09-29). Their post
 * describes each task in one line and does not publish code, so the exact
 * instructions and checks below are ours. Where their description left a
 * choice open (which two items, which category, which fact) we picked one
 * and wrote it down here.
 *
 * Every agent ends with one line `ANSWER: <json>`. A task passes when the
 * answer is right AND, for the local pages, the page recorded the action.
 */
import { siteState } from './sites.ts'
import { loadDataset, loadSample } from './mind2web.ts'

export interface Check {
    pass: boolean
    detail: string
    /** decided later by a judge (see judge.ts), not by this check */
    pending?: boolean
}

/**
 * Task sets, reported separately: a tool's numbers on one never mix with
 * its numbers on another.
 */
export const SUITES = {
    'token-study': {
        label: 'Token study',
        description: 'The eight tasks from Stagehand\'s Playwright MCP token study: four public sites and four local pages, checked by code.'
    },
    'online-mind2web': {
        label: 'Online-Mind2Web',
        description: 'A fixed random sample of Online-Mind2Web, an independent benchmark of 300 tasks on live websites, judged by its own WebJudge.'
    }
} as const

export type SuiteId = keyof typeof SUITES

/** results from before suites existed are all token-study runs */
export const DEFAULT_SUITE: SuiteId = 'token-study'

export interface Task {
    id: string
    /** public site, one of our local pages, or a live-web task judged from screenshots */
    kind: 'public' | 'local' | 'live'
    /** for live tasks: easy, medium or hard, as the benchmark rates it */
    level?: string
    /** `{base}` is replaced with where this run finds the local pages (see siteBase) */
    prompt: string
    /** for live tasks: the benchmark's own task id */
    sourceId?: string
    /** `scope` is the run's page scope, for tasks that read what the page recorded */
    check: (answer: unknown, scope?: string) => Promise<Check>
}

const ANSWER_FORMAT = 'When you are done, reply with a final line `ANSWER: <json>` where <json> is'

const ok = (detail = 'ok'): Check => ({ pass: true, detail })
const fail = (detail: string): Check => ({ pass: false, detail })
const norm = (s: unknown) => String(s ?? '').toLowerCase().replace(/[^a-z0-9.]+/g, ' ').trim()
const money = (s: unknown) => Number(String(s ?? '').replace(/[^0-9.]/g, ''))

function obj (answer: unknown): Record<string, unknown> {
    return answer && typeof answer === 'object' ? answer as Record<string, unknown> : {}
}

/** books.toscrape.com ground truth, read live so the check never goes stale */
async function cheapestMysteryBooks () {
    const books: { title: string, price: number }[] = []
    for (const page of ['index.html', 'page-2.html']) {
        const html = await (await fetch(`https://books.toscrape.com/catalogue/category/books/mystery_3/${page}`)).text()
        for (const m of html.matchAll(/<h3><a href="[^"]+" title="([^"]+)">[\s\S]*?<p class="price_color">£([\d.]+)<\/p>/g)) {
            books.push({ title: m[1].replace(/&#39;/g, '\'').replace(/&amp;/g, '&').replace(/&quot;/g, '"'), price: Number(m[2]) })
        }
    }
    return books.sort((a, b) => a.price - b.price).slice(0, 3)
}

export const TASKS: Task[] = [
    {
        id: 'saucedemo-checkout',
        kind: 'public',
        prompt: `Go to https://www.saucedemo.com and log in with the username "standard_user" and the password "secret_sauce" (the public demo account shown on the login page). Add "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart, start the checkout with first name "Ada", last name "Lovelace" and postal code "10115", and read the order total on the checkout overview page. Do not finish the order.
${ANSWER_FORMAT} {"total": "<the total exactly as shown, e.g. $12.34>"}.`,
        // $29.99 + $9.99 = $39.98, plus 8% tax $3.20 = $43.18
        check: async (answer) => Math.abs(money(obj(answer).total) - 43.18) < 0.001 ? ok() : fail(`total ${obj(answer).total}`)
    },
    {
        id: 'books-cheapest',
        kind: 'public',
        prompt: `Go to https://books.toscrape.com and open the "Mystery" category. It spans two pages. Find the three cheapest books across both pages.
${ANSWER_FORMAT} {"books": [{"title": "<full title>", "price": "<price as shown>"}]} ordered from cheapest to most expensive.`,
        check: async (answer) => {
            const expected = await cheapestMysteryBooks()
            const got = Array.isArray(obj(answer).books) ? obj(answer).books as Record<string, unknown>[] : []
            if (got.length !== 3) {
                return fail(`expected 3 books, got ${got.length}`)
            }
            for (const [i, book] of expected.entries()) {
                const title = norm(got[i].title).replace(/\.+$/, '')
                if (Math.abs(money(got[i].price) - book.price) > 0.001 || !norm(book.title).startsWith(title.slice(0, 20))) {
                    return fail(`#${i + 1}: expected ${book.title} £${book.price}, got ${got[i].title} ${got[i].price}`)
                }
            }
            return ok()
        }
    },
    {
        id: 'wikipedia-hops',
        kind: 'public',
        prompt: `Open https://en.wikipedia.org/wiki/Selenium_(software). From there, reach the article "CERN" by clicking links inside article text only: go to "Web application", then "World Wide Web", then "Tim Berners-Lee", then "CERN". Do not type URLs after the first page and do not use the search box. On the CERN article, read the year CERN was established from the infobox.
${ANSWER_FORMAT} {"path": ["<title of each article you visited, in order>"], "established": <year as a number>}.`,
        check: async (answer) => {
            const { path = [], established } = obj(answer) as { path?: unknown[], established?: unknown }
            const expected = ['selenium software', 'web application', 'world wide web', 'tim berners lee', 'cern']
            const got = (Array.isArray(path) ? path : []).map(norm)
            if (expected.some((title, i) => !got[i]?.startsWith(title))) {
                return fail(`path ${JSON.stringify(path)}`)
            }
            return Number(established) === 1954 ? ok() : fail(`established ${established}`)
        }
    },
    {
        id: 'nodejs-docs-fact',
        kind: 'public',
        prompt: `Open the Node.js HTTP module documentation at https://nodejs.org/api/http.html (a very large page). Find the default value of the \`connectionsCheckingInterval\` option of \`http.createServer()\`.
${ANSWER_FORMAT} {"default": "<the default value as documented>"}.`,
        check: async (answer) => /\b30000\b|\b30\s?(s|sec|seconds)\b/i.test(String(obj(answer).default)) ? ok() : fail(`default ${obj(answer).default}`)
    },
    {
        id: 'iframe-form',
        kind: 'local',
        prompt: `Open {base}/iframe-form/. Fill in the billing form with the full name "Ada Lovelace", the email "ada@example.com" and the plan "Pro", accept the terms and start the subscription. Read the confirmation code it shows.
${ANSWER_FORMAT} {"code": "<confirmation code>"}.`,
        check: async (answer, scope) => {
            const submit = siteState('iframe-form', scope).findLast((e) => e.type === 'submit')
            if (!submit) {
                return fail('form was not submitted')
            }
            const d = submit.data
            if (d.name !== 'Ada Lovelace' || d.email !== 'ada@example.com' || d.plan !== 'Pro' || d.terms !== true) {
                return fail(`submitted ${JSON.stringify(d)}`)
            }
            return String(obj(answer).code).toUpperCase() === submit.code ? ok() : fail(`code ${obj(answer).code}, page showed ${submit.code}`)
        }
    },
    {
        id: 'closed-shadow',
        kind: 'local',
        prompt: `Open {base}/closed-shadow/. Apply the coupon code "SAVE20" to the headphones and read the new price.
${ANSWER_FORMAT} {"price": "<new price as shown>"}.`,
        check: async (answer, scope) => {
            if (!siteState('closed-shadow', scope).some((e) => e.type === 'coupon')) {
                return fail('coupon was not applied')
            }
            return money(obj(answer).price) === 160 ? ok() : fail(`price ${obj(answer).price}`)
        }
    },
    {
        id: 'icon-no-role',
        kind: 'local',
        prompt: `Open {base}/icon-no-role/. Delete the invoice for "Contoso Ltd" (Invoice #1002) using its delete (trash can) icon. Do not touch any other invoice.
${ANSWER_FORMAT} {"remaining": ["<invoice numbers still listed, e.g. 1001>"]}.`,
        check: async (answer, scope) => {
            const deletes = siteState('icon-no-role', scope).filter((e) => e.type === 'delete').map((e) => e.data.id)
            if (deletes.length !== 1 || deletes[0] !== '1002') {
                return fail(`deleted ${JSON.stringify(deletes)}`)
            }
            const remaining = (obj(answer).remaining as unknown[] ?? []).map((id) => String(id).replace(/\D/g, '')).sort()
            return JSON.stringify(remaining) === JSON.stringify(['1001', '1003', '1004']) ? ok() : fail(`remaining ${JSON.stringify(remaining)}`)
        }
    },
    {
        id: 'long-form',
        kind: 'local',
        prompt: `Open {base}/long-form/ and complete the 12-step account setup with these values:
first name "Grace", last name "Hopper", work email "grace@navy.example", phone "+1 202 555 0143", street address "1 Harbor Way", city "Arlington", postal code "22201", country "United States", company name "Navy Research Lab", job title "Rear Admiral", team size "51-200", how did you hear about us "Conference".
Read the reference number shown at the end.
${ANSWER_FORMAT} {"reference": "<reference number>"}.`,
        check: async (answer, scope) => {
            const submit = siteState('long-form', scope).findLast((e) => e.type === 'submit')
            if (!submit) {
                return fail('setup was not finished')
            }
            const expected: Record<string, string> = {
                firstName: 'Grace', lastName: 'Hopper', email: 'grace@navy.example', phone: '+1 202 555 0143',
                street: '1 Harbor Way', city: 'Arlington', postalCode: '22201', country: 'United States',
                company: 'Navy Research Lab', jobTitle: 'Rear Admiral', teamSize: '51-200', referral: 'Conference'
            }
            const wrong = Object.entries(expected).filter(([k, v]) => submit.data[k] !== v).map(([k]) => k)
            if (wrong.length) {
                return fail(`wrong fields: ${wrong.join(', ')}`)
            }
            return String(obj(answer).reference).toUpperCase() === submit.code ? ok() : fail(`reference ${obj(answer).reference}, page showed ${submit.code}`)
        }
    }
]

/** The last `ANSWER: {...}` line of the agent's final message. */
export function parseAnswer (text: string): unknown {
    const line = text.split('\n').reverse().find((l) => l.trim().startsWith('ANSWER:'))
    if (!line) {
        return undefined
    }
    try {
        return JSON.parse(line.trim().slice('ANSWER:'.length).trim().replace(/^`|`$/g, ''))
    } catch {
        return undefined
    }
}

/**
 * Online-Mind2Web tasks, as an agent gets them here. The benchmark's own
 * agents receive the task and the website; the rule against signing in or
 * paying keeps runs on live sites harmless. WebJudge decides success from the
 * actions and screenshots, so the ANSWER line is only recorded.
 */
async function mind2webTasks (): Promise<Task[]> {
    const [sample, dataset] = await Promise.all([loadSample(), loadDataset()])
    const byId = new Map(dataset.map((t) => [t.task_id, t]))
    return sample.tasks.map(({ task_id: taskId }) => {
        const task = byId.get(taskId)
        if (!task) {
            throw new Error(`Online-Mind2Web task ${taskId} is not in the dataset revision ${sample.revision}`)
        }
        return {
            id: `om2w-${taskId.slice(0, 8)}`,
            kind: 'live' as const,
            level: task.level,
            sourceId: taskId,
            prompt: `${task.confirmed_task}
Start at ${task.website}.
Do not sign in, create an account, pay or enter personal data. If the task would need that, stop on the page right before it.
${ANSWER_FORMAT} {"answer": "<what you found, or what you did>"}.`,
            check: async () => ({ pass: false, detail: 'awaiting WebJudge', pending: true })
        }
    })
}

export async function loadTasks (suite: SuiteId): Promise<Task[]> {
    if (suite === 'online-mind2web') {
        return mind2webTasks()
    }
    return TASKS
}
