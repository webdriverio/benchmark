/**
 * node src/selftest.ts
 *
 * Checks the checks, without a model: every task must accept a correct
 * answer and reject a wrong one. The local pages are driven through their
 * HTTP API the same way the page scripts report actions.
 */
import { startSites, resetSite, MAIN_ORIGIN, FRAME_ORIGIN } from './sites.ts'
import { TASKS, parseAnswer } from './tasks.ts'

const sites = await startSites()

async function report (origin: string, task: string, type: string, data: Record<string, unknown>) {
    const res = await fetch(`${origin}/api/${task}/event`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type, data }) })
    return (await res.json() as { code: string }).code
}

/** sets up the page state for a correct run and returns the correct answer */
const CORRECT: Record<string, () => Promise<unknown>> = {
    'saucedemo-checkout': async () => ({ total: 'Total: $43.18' }),
    'books-cheapest': async () => {
        const html = await Promise.all(['index.html', 'page-2.html'].map(async (p) => (await fetch(`https://books.toscrape.com/catalogue/category/books/mystery_3/${p}`)).text()))
        const books = [...html.join('').matchAll(/title="([^"]+)">[\s\S]*?£([\d.]+)</g)].map((m) => ({ title: m[1], price: `£${m[2]}` }))
        return { books: books.sort((a, b) => Number(a.price.slice(1)) - Number(b.price.slice(1))).slice(0, 3) }
    },
    'wikipedia-hops': async () => ({ path: ['Selenium (software)', 'Web application', 'World Wide Web', 'Tim Berners-Lee', 'CERN'], established: 1954 }),
    'nodejs-docs-fact': async () => ({ default: '30000' }),
    'iframe-form': async () => ({ code: await report(FRAME_ORIGIN, 'iframe-form', 'submit', { name: 'Ada Lovelace', email: 'ada@example.com', plan: 'Pro', terms: true }) }),
    'closed-shadow': async () => {
        await report(MAIN_ORIGIN, 'closed-shadow', 'coupon', { code: 'SAVE20' })
        return { price: '$160.00' }
    },
    'icon-no-role': async () => {
        await report(MAIN_ORIGIN, 'icon-no-role', 'delete', { id: '1002' })
        return { remaining: ['1001', '#1003', 'Invoice #1004'] }
    },
    'long-form': async () => ({
        reference: await report(MAIN_ORIGIN, 'long-form', 'submit', {
            firstName: 'Grace', lastName: 'Hopper', email: 'grace@navy.example', phone: '+1 202 555 0143',
            street: '1 Harbor Way', city: 'Arlington', postalCode: '22201', country: 'United States',
            company: 'Navy Research Lab', jobTitle: 'Rear Admiral', teamSize: '51-200', referral: 'Conference'
        })
    })
}

let failed = 0
for (const task of TASKS) {
    resetSite(task.id)
    const wrongWithoutAction = await task.check({ total: '$1.00', books: [], path: [], default: '5000', code: 'NOPE', price: '$200.00', remaining: [], reference: 'NOPE', established: 1990 })
    const answer = await CORRECT[task.id]()
    const roundTrip = parseAnswer(`Done.\nANSWER: ${JSON.stringify(answer)}`)
    const right = await task.check(roundTrip)
    const ok = right.pass && !wrongWithoutAction.pass
    failed += ok ? 0 : 1
    console.log(`${ok ? '✓' : '✗'} ${task.id.padEnd(20)} correct: ${right.detail.padEnd(6)} wrong: ${wrongWithoutAction.detail}`)
}

await sites.close()
process.exit(failed ? 1 : 0)
