# WebdriverIO browser agent benchmark

How much does it cost a coding agent to get a browser task done, and does it get it right?

This repository runs the eight tasks from Stagehand's study [Why Playwright MCP Uses So Many Tokens](https://www.stagehand.dev/blog/playwright-mcp-token-usage) (Sep 29, 2026) against five browser tool setups, with the same model, the same agent harness and the same prompts:

| Setup | What the agent gets | npm package |
|---|---|---|
| `playwright-mcp` | [Playwright MCP](https://github.com/microsoft/playwright-mcp), default config | `@playwright/mcp` |
| `playwright-mcp-tuned` | Playwright MCP with `--snapshot-mode none --codegen none` | `@playwright/mcp` |
| `stagehand` | Stagehand's Claude Code MCP server (`run`, `snapshot`, `screenshot`) | `@browserbasehq/stagehand-mcp` |
| `wdio-mcp` | [WebdriverIO MCP](https://webdriver.io/docs/mcp) | `@wdio/mcp` |
| `wdio-session` | [`wdio session`](https://webdriver.io/docs/session) shell commands plus its agent skill | `@wdio/cli` |

The first three are the setups from Stagehand's post. We run them ourselves instead of copying their numbers, because results depend on the machine, the network and the versions.

## Latest results

<!-- results:start -->
No published run yet. Start one from the [Benchmark workflow](../../actions/workflows/benchmark.yml).
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
- **No side doors:** built-in tools are switched off and `WebFetch`/`WebSearch` are denied. The MCP setups get only their MCP tools. `wdio-session` gets `Bash` restricted to `wdio session …` plus `Skill` and `Read`. Permission mode `dontAsk` denies everything else.
- **Headless everywhere,** a fresh working directory per run, and the page state is reset before each run.
- **Same machine type, no queueing:** in the workflow every setup runs in its own job on a fresh GitHub-hosted runner, all in parallel. Within a job the runs are shuffled with a fixed seed (`--seed`), so a run can be reproduced.
- **Exact versions:** every tool is installed before the first run, so install time never counts, and dist-tags like `latest` are resolved and recorded in the report.
- **Everything is published:** code, prompts, checks and the raw JSONL of every run.

If you work on one of these tools and think we set it up wrong, please open an issue or a PR. We'd rather fix the setup than win on a technicality.

## Running the benchmark

### In GitHub Actions

Start the [Benchmark workflow](../../actions/workflows/benchmark.yml) with **Run workflow**. Every input has a default:

| Input | Default | What it does |
|---|---|---|
| `webdriverio` | `latest` | `@wdio/cli` version for `wdio-session` |
| `wdio-mcp` | `latest` | `@wdio/mcp` version |
| `playwright-mcp` | `latest` | `@playwright/mcp` version, for both Playwright setups |
| `stagehand-mcp` | `latest` | `@browserbasehq/stagehand-mcp` version |
| `model` | `claude-sonnet-5` | model for every agent |
| `runs` | `3` | runs per task and setup |
| `setups`, `tasks` | `all` | comma-separated ids to run a subset |
| `seed` | `1` | seed for the run order |
| `publish` | on | commit the results to this repository |

Versions accept an exact version, a dist-tag (`latest`, `next`) or a range. A setup whose package can't be installed is skipped, and the report says why.

The workflow runs one job per setup in parallel, then a publish job:

1. writes `results/<date>-run-<id>/` with the raw `runs-*.jsonl`, the merged `meta.json` and a `report.md` (tool versions, configuration, results, every failed run, environment, and a link to the workflow run),
2. updates the [index of all runs](results/README.md) and the **Latest results** section above,
3. commits and pushes that as `results: <id>`.

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

Pick versions with `WDIO_VERSION`, `WDIO_MCP_VERSION`, `PLAYWRIGHT_MCP_VERSION` and `STAGEHAND_MCP_VERSION` (default `latest` each). To test unreleased code:

```sh
export WDIO_LOCAL=/path/to/webdriverio                        # a built checkout of webdriverio/webdriverio
export STAGEHAND_MCP="node /path/to/stagehand-mcp/dist/index.js"  # a local Stagehand MCP build
```

Runner options: `--setups`, `--tasks`, `--runs` (default 3), `--model` (default `claude-sonnet-5`), `--seed`, `--out-dir`, `--max-turns` (default 80), `--timeout-min` (default 10).

A full run is 120 agent runs. At Stagehand's reported $0.026–$0.051 per task, expect roughly $5–10 in model costs.

### Stagehand

Stagehand's Claude Code integration runs `@browserbasehq/stagehand-mcp`, which is [not published to npm yet](https://github.com/browserbase/stagehand/pull/2971). Until it is, the workflow skips the `stagehand` setup; locally, build it from [browserbase/stagehand](https://github.com/browserbase/stagehand) and set `STAGEHAND_MCP`.

If Stagehand's tools call a model of their own, those tokens do not show up in the Agent SDK's usage. We will measure and report them separately before publishing any comparison.

## Website

[benchmark.webdriver.io](https://benchmark.webdriver.io) renders every published run. `npm run site` builds it into `dist/`: a static page plus `data.json`, which [`src/site.ts`](src/site.ts) aggregates from `results/`.

Runs are grouped by **setup + package version + model**. Every run of, say, `@wdio/cli@10.0.0` with `claude-sonnet-5` counts toward one row, across workflow runs; a new version starts a new row. The page shows the latest version of each tool, every version with per-task results and the runs behind it, and a log of all runs.

The [Site workflow](.github/workflows/site.yml) deploys it to GitHub Pages on every push to `main` and after every Benchmark run. To preview locally:

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
.github/workflows/site.yml        builds and deploys benchmark.webdriver.io
src/run.ts        runner: installs tools, runs the plan, writes runs-*.jsonl and meta-*.json
src/setups.ts     the five tool setups
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
