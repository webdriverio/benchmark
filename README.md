# WebdriverIO browser agent benchmark

How much does it cost a coding agent to get a browser task done, and does it get it right?

This repository runs the eight tasks from Stagehand's study [Why Playwright MCP Uses So Many Tokens](https://www.stagehand.dev/blog/playwright-mcp-token-usage) (Sep 29, 2026) against six browser tool setups, with the same model, the same agent harness and the same prompts:

| Setup | What the agent gets | npm package |
|---|---|---|
| `playwright-mcp` | [Playwright MCP](https://github.com/microsoft/playwright-mcp), default config | `@playwright/mcp` |
| `playwright-mcp-tuned` | Playwright MCP with `--snapshot-mode none --codegen none` | `@playwright/mcp` |
| `stagehand` | Stagehand's Claude Code MCP server (`run`, `snapshot`, `screenshot`) with its agent instructions | built from [`browserbase/stagehand`](https://github.com/browserbase/stagehand) |
| `wdio-mcp` | [WebdriverIO MCP](https://webdriver.io/docs/mcp) | `@wdio/mcp` |
| `wdio-session` | [`wdio session`](https://webdriver.io/docs/session) shell commands plus its agent skill | `@wdio/cli` |
| `agent-browser` | [agent-browser](https://github.com/vercel-labs/agent-browser) shell commands plus its agent skill, installed as `npx skills add vercel-labs/agent-browser` does | `agent-browser` |

The first three are the setups from Stagehand's post. We run them ourselves instead of copying their numbers, because results depend on the machine, the network and the versions.

## Latest results

<!-- results:start -->
Latest run: [2026-10-03-run-37159064984](results/2026-10-03-run-37159064984/report.md) on 2026-10-03, `claude-sonnet-5`, 3 runs per task, [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37159064984). All runs: [results](results/README.md).

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| playwright-mcp | 92k | $0.052 | 100% (24/24) | 25 s | 8.5 |
| playwright-mcp-tuned | 100k | $0.055 | 100% (24/24) | 22 s | 8.5 |
| stagehand | 34k | $0.029 | 92% (22/24) | 15 s | 6 |
| wdio-mcp | 67k | $0.033 | 100% (24/24) | 15 s | 6 |
| wdio-session | 71k | $0.038 | 100% (24/24) | 21 s | 6 |
| agent-browser | 117k | $0.059 | 100% (24/24) | 21 s | 9 |

_Medians per run, except success. Tokens include cache reads and writes._

Versions: playwright-mcp: `@playwright/mcp@0.0.83` · playwright-mcp-tuned: `@playwright/mcp@0.0.83` · stagehand: `browserbase/stagehand@4.1.0+cd7b230` · wdio-mcp: `@wdio/mcp@4.0.0-dev.56` · wdio-session: `@wdio/cli@10.0.0-alpha.155` · agent-browser: `agent-browser@0.38.2`
<!-- results:end -->

## What is measured

Per run, from the Claude Agent SDK's result message:

- **Tokens:** input, output, cache reads and cache writes. The tables report the sum.
- **Cost** in USD (`total_cost_usd`).
- **Success:** the task's check passes (see below).
- **Time:** wall-clock time of the whole run, including starting the browser.
- **Turns and tool calls.**

The report prints medians per setup in the same shape as Stagehand's table, plus a pass matrix per task.

## The tasks

Stagehand's post describes each task in one sentence and does not publish its code. The exact instructions and checks are in [`src/tasks.ts`](src/tasks.ts). Where their description left a choice open, we made it explicit:

| Task | Stagehand's description | Our version |
|---|---|---|
| `saucedemo-checkout` | log in, add two items, read the checkout total | Backpack + Bike Light, total must be $43.18 |
| `books-cheapest` | three cheapest books in a category that spans two pages | "Mystery" (32 books, 2 pages); ground truth fetched live |
| `wikipedia-hops` | four-hop navigation, following links only | Selenium (software) → Web application → World Wide Web → Tim Berners-Lee → CERN, then read the year CERN was established |
| `nodejs-docs-fact` | one fact buried in a 670 KB docs page | default of `connectionsCheckingInterval` on [nodejs.org/api/http.html](https://nodejs.org/api/http.html) (648 KB) |
| `iframe-form` | form inside a cross-origin iframe | billing form on a different *site* (127.0.0.1 vs localhost), so Chrome runs it out of process |
| `closed-shadow` | button inside a closed shadow DOM | coupon field and button inside `attachShadow({ mode: 'closed' })` |
| `icon-no-role` | clickable icon without role or accessible name | delete invoice #1002 with an SVG trash icon wired up with `addEventListener` |
| `long-form` | 12-page form flow | 12-step account setup with help text on every step |

The four local pages live in [`sites/pages`](sites/pages) and report every action to the local server. A local task only passes when the agent's answer is right **and** the page recorded the action, so an agent can't pass by guessing.

Every agent ends with a line `ANSWER: <json>`. `npm run selftest` checks the checks: each one must accept a correct answer and reject a wrong one.

## Keeping it fair

- **Same model and harness for every setup:** `claude-sonnet-5` with thinking disabled, through the Claude Agent SDK, as in Stagehand's study.
- **Same prompts:** one system prompt for everyone. A setup only adds one sentence on how to reach the browser ([`src/setups.ts`](src/setups.ts)).
- **No side doors:** built-in tools are switched off and `WebFetch`/`WebSearch` are denied. The MCP setups get only their MCP tools. `wdio-session` gets `Skill`, `Read` and `Bash` for `wdio session …` commands only ([`src/permit.ts`](src/permit.ts): every part of a command must be a `wdio session` call, an `echo` piped into one or a read-only filter on its output; no substitutions, no redirects outside the run directory). Every other tool call is denied.
- **No hints in the prompt:** the prompts don't mention headless or headed browsers or any tool's flags; each tool runs with its own defaults.
- **Same browser conditions:** every setup asks for a headless local Chrome (Stagehand's facade only runs headed, so every workflow job gets the same virtual display), a fresh working directory per run, and the page state is reset before each run.
- **Debuggable:** every result row keeps the agent's final message, and the workflow keeps every full transcript as an artifact for 90 days.
- **Same machine type, no queueing:** in the workflow every setup runs in its own job on a fresh GitHub-hosted runner, all in parallel. Within a job the runs are shuffled with a fixed seed (`--seed`), so a run can be reproduced.
- **Exact versions:** every tool is installed before the first run, so install time never counts, and dist-tags like `latest` are resolved and recorded in the report.
- **Everything is published:** code, prompts, checks and the raw JSONL of every run.

If you work on one of these tools and think we set it up wrong, please open an issue or a PR. We'd rather fix the setup than win on a technicality.

## Running the benchmark

### In GitHub Actions

Start the [Benchmark workflow](../../actions/workflows/benchmark.yml) with **Run workflow**. Every input has a default:

| Input | Default | What it does |
|---|---|---|
| `webdriverio` | `10.0.0-alpha.155` | `@wdio/cli` version for `wdio-session` (v10 and up; `latest` is still v9, which has no `wdio session`) |
| `wdio-mcp` | `4.0.0-dev.56` | `@wdio/mcp` version |
| `playwright-mcp` | `latest` | `@playwright/mcp` version, for both Playwright setups |
| `agent-browser` | `latest` | `agent-browser` version |
| `stagehand` | `latest` | git ref of `browserbase/stagehand` to build (branch, tag or sha); `latest` is the newest `@browserbasehq/stagehand@x.y.z` release tag |
| `model` | `claude-sonnet-5` | model for every agent |
| `runs` | `3` | runs per task and setup |
| `setups`, `tasks` | `all` | comma-separated ids to run a subset |
| `seed` | `1` | seed for the run order |
| `publish` | on | commit the results to this repository |

npm versions accept an exact version, a dist-tag (`latest`, `next`) or a range. A setup whose tool can't be installed is skipped, and the report says why.

The workflow runs one job per setup in parallel, then a publish job:

1. writes `results/<date>-run-<id>/` with the raw `runs-*.jsonl`, the merged `meta.json` and a `report.md` (tool versions, configuration, results, every failed run, environment, and a link to the workflow run),
2. updates the [index of all runs](results/README.md) and the **Latest results** section above,
3. commits and pushes that as `results: <id>`,
4. waits until Vercel has deployed that commit and [benchmark.webdriver.io](https://benchmark.webdriver.io) serves the new run, and fails otherwise.

The report also appears on the workflow run's summary page. The workflow needs an `ANTHROPIC_API_KEY` repository secret.

### Locally

Requires Node.js 24 and Chrome. The Agent SDK picks up your Anthropic credentials (`ANTHROPIC_API_KEY` or an `ant auth login` profile).

```sh
npm install
npm run selftest                                   # checks the checks, no model calls

npm run bench -- --dry-run                         # print the shuffled plan
npm run bench -- --setups wdio-session,playwright-mcp --tasks saucedemo-checkout --runs 1
npm run bench                                      # everything: 5 setups × 8 tasks × 3 runs
node src/publish.ts results/<id>                   # report.md, results index, README section
```

Pick versions with `WDIO_VERSION`, `WDIO_MCP_VERSION`, `PLAYWRIGHT_MCP_VERSION`, `AGENT_BROWSER_VERSION` and `STAGEHAND_REF` (default `latest`, except `WDIO_VERSION`: `10.0.0-alpha.155`, since `wdio session` ships with v10, and `WDIO_MCP_VERSION`: `4.0.0-dev.56`, a dev build of the MCP server with the `@wdio/session` page model). To test an unreleased WebdriverIO:

```sh
export WDIO_LOCAL=/path/to/webdriverio   # a built checkout of webdriverio/webdriverio
```

Runner options: `--setups`, `--tasks`, `--runs` (default 3), `--model` (default `claude-sonnet-5`), `--seed`, `--out-dir`, `--max-turns` (default 80), `--timeout-min` (default 10), `--concurrency` (default 1; every run gets its own copy of the local pages under `/r/<run>/`, but parallel browsers compete for CPU, so keep 1 for published numbers).

A full run is 120 agent runs. At Stagehand's reported $0.026–$0.051 per task, expect roughly $5–10 in model costs.

### Stagehand

Stagehand's Claude Code integration (the `run` / `snapshot` / `screenshot` facade from their study) is not published to npm yet ([browserbase/stagehand#2971](https://github.com/browserbase/stagehand/pull/2971)). The benchmark builds it from source exactly as [their README](https://github.com/browserbase/stagehand/tree/main/packages/integrations/claude-code) does (`pnpm install`, then `turbo run build --filter @browserbasehq/stagehand-integrations`), once per commit, before any run starts. Reports label it with the Stagehand SDK version and the commit, e.g. `4.1.0+cd7b230`.

It is wired up like their own Claude Agent SDK example (`packages/integrations/claude-code/src/agent.ts`):

- the agent gets their `FACADE_AGENT_INSTRUCTIONS` on top of the shared system prompt, the same way `wdio-session` gets its skill;
- only `STAGEHAND_*` and `BROWSERBASE_*` variables reach the server (plus `PATH`, `HOME`, `DISPLAY` for a local Chrome), and `STAGEHAND_BROWSER=local`, so it runs the same local browser as everyone else instead of Browserbase's cloud;
- no `STAGEHAND_MODEL_NAME` and no provider key reaches it, so the facade runs no model of its own and every token it costs shows up in the agent's usage.

The facade always launches a headed browser. In the workflow every job runs under `xvfb-run`, so all setups get the same virtual display.

## Website

[benchmark.webdriver.io](https://benchmark.webdriver.io) renders every published run. `npm run site` builds it into `dist/`: a static page plus `data.json`, which [`src/site.ts`](src/site.ts) aggregates from `results/`.

Runs are grouped by **setup + package version + model**. Every run of, say, `@wdio/cli@10.0.0` with `claude-sonnet-5` counts toward one row, across workflow runs; a new version starts a new row. The page shows the latest version of each tool, every version with per-task results and the runs behind it, and a log of all runs.

It is hosted on Vercel (project `webdriverio-benchmark`), which is connected to this repository and builds every push to `main` with the settings in [`vercel.json`](vercel.json), including the result commits of the Benchmark workflow. To preview locally:

```sh
npm run site && npx serve dist
```

## Known gaps

From driving the local pages by hand with `wdio session` (`WDIO_LOCAL` = the `v10` branch):

- `closed-shadow`: the snapshot walks `element.shadowRoot`, which is `null` for closed roots, so the coupon field gets no ref.
- `icon-no-role`: an element only counts as clickable with an `onclick` attribute and `cursor: pointer`, so icons wired up with `addEventListener` get no ref.
- `iframe-form` works: the snapshot points to `wdio session frame e1`, and the frame's fields get refs.

We will fix both gaps in WebdriverIO before publishing results, and say so in the write-up.

## Layout

```
.github/workflows/benchmark.yml   the benchmark workflow
vercel.json                       Vercel build settings for benchmark.webdriver.io
src/run.ts        runner: installs tools, runs the plan, writes runs-*.jsonl and meta-*.json
src/setups.ts     the six tool setups
src/tools.ts      installs and pins the npm package behind each setup
src/tasks.ts      the eight tasks and their checks
src/sites.ts      local test page server (two origins)
src/report.ts     Markdown tables from run results
src/publish.ts    report.md, results index and README section for a result directory
src/selftest.ts   checks the checks without a model
src/site.ts       builds the website into dist/
site/             the website: index.html, app.js, style.css
sites/pages/      the four local test pages
results/          one directory per benchmark run
```
