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
**Token study.** Latest run: [2026-10-04-run-37164609078](results/2026-10-04-run-37164609078/report.md) on 2026-10-04, `claude-sonnet-5`, 3 runs per task, [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37164609078).

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| playwright-mcp | 88k | $0.047 | 100% (24/24) | 21 s | 8 |
| playwright-mcp-tuned | 88k | $0.052 | 100% (24/24) | 22 s | 7.5 |
| stagehand | 45k | $0.033 | 96% (23/24) | 14 s | 6 |
| wdio-mcp | 67k | $0.033 | 100% (24/24) | 15 s | 6 |
| wdio-session | 77k | $0.039 | 100% (24/24) | 18 s | 6.5 |
| agent-browser | 176k | $0.076 | 100% (24/24) | 24 s | 11.5 |

_Medians per run, except success. Tokens include cache reads and writes._

Versions: playwright-mcp: `@playwright/mcp@0.0.83` · playwright-mcp-tuned: `@playwright/mcp@0.0.83` · stagehand: `browserbase/stagehand@4.1.0+cd7b230` · wdio-mcp: `@wdio/mcp@4.0.0-dev.56` · wdio-session: `@wdio/cli@10.0.0-alpha.155` · agent-browser: `agent-browser@0.38.2`

**Online-Mind2Web.** Latest run: [2026-10-04-run-37176001713](results/2026-10-04-run-37176001713/report.md) on 2026-10-04, `claude-sonnet-5`, 1 runs per task, [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37176001713).

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| playwright-mcp | 346k | $0.173 | 30% (3/10) | 62 s | 18 |
| playwright-mcp-tuned | 285k | $0.152 | 40% (4/10) | 43 s | 13 |
| stagehand | 723k | $0.299 | 60% (6/10) | 82 s | 24 |
| wdio-mcp | 316k | $0.132 | 30% (3/10) | 65 s | 28.5 |
| wdio-session | 462k | $0.182 | 40% (4/10) | 107 s | 29.5 |
| agent-browser | 556k | $0.219 | 40% (4/10) | 98 s | 31.5 |

_Medians per run, except success. Tokens include cache reads and writes._

Versions: playwright-mcp: `@playwright/mcp@0.0.83` · playwright-mcp-tuned: `@playwright/mcp@0.0.83` · stagehand: `browserbase/stagehand@4.1.0+cd7b230` · wdio-mcp: `@wdio/mcp@4.0.0-dev.58` · wdio-session: `@wdio/cli@10.0.0-alpha.166` · agent-browser: `agent-browser@0.38.2`

All runs: [results](results/README.md).
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

## Online-Mind2Web: tasks we didn't write

The eight tasks above are few, everyone passes them, and we wrote the local pages and the checks ourselves. The second task set, `online-mind2web`, fixes that: a sample of [Online-Mind2Web](https://github.com/OSU-NLP-Group/Online-Mind2Web) (COLM 2025), 300 tasks on 136 live websites written by researchers at Ohio State, judged by the benchmark's own judge. Neither we nor any tool vendor chose or tuned for these tasks. Results are reported separately from the token study (pick **Tasks** on the website).

- **The sample:** 50 tasks, split across easy, medium and hard in the dataset's own proportions, drawn with a fixed seed from a fixed dataset revision ([`src/mind2web.ts`](src/mind2web.ts)). [`tasks/online-mind2web.json`](tasks/online-mind2web.json) lists their ids; anyone with the dataset can recompute it. The dataset is gated on Hugging Face, so its task texts stay out of this repository: the runner downloads them with `HF_TOKEN` (accept the [dataset terms](https://huggingface.co/datasets/osunlp/Online-Mind2Web) first).
- **The prompt:** the task and its start page, plus one rule: don't sign in, create accounts, pay or enter personal data; stop right before that. Same for every setup.
- **Screenshots:** after every tool call the harness, not the agent, screenshots the page the agent is on, over the Chrome DevTools Protocol of the browser the run started ([`src/screenshots.ts`](src/screenshots.ts)). No agent pays tokens for them. Playwright starts Chrome without a debugging port, so for this suite its config adds one; nothing else about any setup changes. We checked that capturing doesn't change tool behaviour (same tokens and results with and without, for Stagehand and agent-browser).
- **The judge:** [WebJudge](https://github.com/OSU-NLP-Group/Online-Mind2Web#-webjudge) with `o4-mini`, as its authors recommend (86% agreement with human reviewers), at a pinned commit ([`src/judge.ts`](src/judge.ts)). It sees the task, the agent's actions and the screenshots, not the agent's final answer, and comes from another model family than the agents, so it can't favour its own. The action history is exactly what the agent issued (the shell command or the tool call), never a tool's reply, so a tool with chattier output gains nothing. Two changes to running it, both mechanical: WebJudge sends `max_tokens=512` and `temperature=0`, which OpenAI's reasoning models reject (and 512 tokens would go to reasoning), so the one API call sends `max_completion_tokens` instead; and its worker processes need the `fork` start method, which a wrapper sets. The judge's reasoning for every run is published in `judgments-*.jsonl`, for spot checks.
- **Unjudged runs don't count:** a run the judge couldn't decide stays pending and is left out of every number, with a note in the report.
- **Uncertainty is shown:** 50 tasks can't separate close results. The website shows a 95% confidence interval under every success rate.

Limitations to keep in mind:

- Live websites change, block bots and show CAPTCHAs. Every setup runs in the same job, from the same IP address and interleaved in time, so a site that blocks, blocks everyone alike, but runs are not exactly repeatable. Blocked runs count as failures for every tool they hit.
- WebJudge disagrees with human reviewers on about one run in seven.
- The judge sees the page after each tool call. A tool that does several steps in one call (`perform_actions`, `run` with several actions) leaves fewer screenshots of the steps in between, which can hide evidence the judge looks for, such as an applied filter.
- Our action strings don't follow Online-Mind2Web's submission grammar, which only matters for an official leaderboard submission. The trajectories are in their v1 layout and could be converted.

## Keeping it fair

- **Same model and harness for every setup:** `claude-sonnet-5` with thinking disabled, through the Claude Agent SDK, as in Stagehand's study.
- **Same prompts:** one system prompt for everyone. A setup only adds one sentence on how to reach the browser ([`src/setups.ts`](src/setups.ts)).
- **No side doors:** built-in tools are switched off and `WebFetch`/`WebSearch` are denied. The MCP setups get only their MCP tools. The command-line setups (`wdio-session`, `agent-browser`) get `Skill`, `Read` and `Bash` for their own commands only ([`src/permit.ts`](src/permit.ts): every part of a command must be a call of the tool, an `echo`, `true`, a heredoc or `echo` feeding the tool, or a read-only filter on its output; command substitution only of the tool's own commands; no redirects outside the run directory). agent-browser's `install`, `upgrade`, `plugin`, `chat` (which runs a model of its own) and `dashboard` are denied. Every other tool call is denied.
- **No hints in the prompt:** the prompts don't mention headless or headed browsers or any tool's flags; each tool runs with its own defaults.
- **Same browser conditions:** every setup asks for a headless local Chrome (Stagehand's facade only runs headed, so every workflow job gets the same virtual display), a fresh working directory per run, and the page state is reset before each run.
- **Debuggable:** every result row keeps the agent's final message, and the workflow keeps every full transcript as an artifact for 90 days.
- **Same machine type, no queueing:** for the token study every setup runs in its own job on a fresh GitHub-hosted runner, all in parallel. Live-web suites run every setup in one job instead, because websites block by IP address and every runner has its own: in separate jobs one tool could get a clean address and another a blocked one (our first Online-Mind2Web pilot showed exactly that). Within a job the runs are shuffled with a fixed seed (`--seed`), so a run can be reproduced.
- **Exact versions:** every tool is installed before the first run, so install time never counts, and dist-tags like `latest` are resolved and recorded in the report.
- **Everything is published:** code, prompts, checks and the raw JSONL of every run.

If you work on one of these tools and think we set it up wrong, please open an issue or a PR. We'd rather fix the setup than win on a technicality.

## Running the benchmark

### In GitHub Actions

Start the [Benchmark workflow](../../actions/workflows/benchmark.yml) with **Run workflow**. Every input has a default:

| Input | Default | What it does |
|---|---|---|
| `suite` | `token-study` | task set: `token-study` or `online-mind2web` (needs the `HF_TOKEN` and `OPENAI_API_KEY` repository secrets; use `runs` 1 and `concurrency` 4) |
| `webdriverio` | `10.0.0-alpha.166` | `@wdio/cli` version for `wdio-session` (v10 and up; `latest` is still v9, which has no `wdio session`) |
| `wdio-mcp` | `4.0.0-dev.58` | `@wdio/mcp` version |
| `playwright-mcp` | `latest` | `@playwright/mcp` version, for both Playwright setups |
| `agent-browser` | `latest` | `agent-browser` version |
| `stagehand` | `latest` | git ref of `browserbase/stagehand` to build (branch, tag or sha); `latest` is the newest `@browserbasehq/stagehand@x.y.z` release tag |
| `model` | `claude-sonnet-5` | model for every agent |
| `runs` | `3` | runs per task and setup |
| `setups`, `tasks` | `all` | comma-separated ids to run a subset |
| `seed` | `1` | seed for the run order |
| `concurrency` | `1` | runs at the same time per job; use 4 for `online-mind2web`, which runs every setup in one job |
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

Pick versions with `WDIO_VERSION`, `WDIO_MCP_VERSION`, `PLAYWRIGHT_MCP_VERSION`, `AGENT_BROWSER_VERSION` and `STAGEHAND_REF` (default `latest`, except `WDIO_VERSION`: `10.0.0-alpha.166`, since `wdio session` ships with v10, and `WDIO_MCP_VERSION`: `4.0.0-dev.58`, a dev build of the MCP server with the `@wdio/session` page model). To test an unreleased WebdriverIO:

```sh
export WDIO_LOCAL=/path/to/webdriverio   # a built checkout of webdriverio/webdriverio
```

Online-Mind2Web needs `HF_TOKEN` (dataset terms accepted) for the tasks, and `OPENAI_API_KEY` plus `python3` for the judge:

```sh
node src/mind2web.ts sample                        # once: pick the 50 tasks, then commit tasks/online-mind2web.json
npm run bench -- --suite online-mind2web --runs 1 --concurrency 2
node src/judge.ts results/<id>                     # WebJudge decides every run, writes judgments-*.jsonl
node src/publish.ts results/<id>
```

Runner options: `--suite` (`token-study` or `online-mind2web`, default `token-study`), `--screenshots` (on for `online-mind2web`), `--setups`, `--tasks`, `--runs` (default 3), `--model` (default `claude-sonnet-5`), `--seed`, `--out-dir`, `--max-turns` (default 80), `--timeout-min` (default 10), `--concurrency` (default 1; every run gets its own copy of the local pages under `/r/<run>/`, but parallel browsers compete for CPU, so keep 1 for published numbers).

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
