# WebdriverIO browser agent benchmark

How often does a coding agent get a browser task right, and what does it cost?

This repository runs a fixed sample of 100 tasks from [Online-Mind2Web](https://github.com/OSU-NLP-Group/Online-Mind2Web), tasks on live websites written by the benchmark's authors, against seven browser tool setups. The model, the agent harness and the prompt are the same for every setup. Results: [benchmark.webdriver.io](https://benchmark.webdriver.io).

| Setup | What the agent gets | npm package |
|---|---|---|
| `playwright-mcp` | [Playwright MCP](https://github.com/microsoft/playwright-mcp), default config | `@playwright/mcp` |
| `playwright-mcp-tuned` | Playwright MCP with `--snapshot-mode none --codegen none` | `@playwright/mcp` |
| `stagehand` | Stagehand's Claude Code MCP server (`run`, `snapshot`, `screenshot`) with its agent instructions | built from [`browserbase/stagehand`](https://github.com/browserbase/stagehand) |
| `wdio-mcp` | [WebdriverIO MCP](https://webdriver.io/docs/mcp) | `@wdio/mcp` |
| `wdio-session` | [`wdio session`](https://webdriver.io/docs/session) shell commands plus its agent skill | `@wdio/cli` |
| `agent-browser` | [agent-browser](https://github.com/vercel-labs/agent-browser) shell commands plus its agent skill, installed as `npx skills add vercel-labs/agent-browser` does | `agent-browser` |
| `playwright-cli` | [Playwright CLI](https://github.com/microsoft/playwright-cli) shell commands plus its agent skill, installed with its own `playwright-cli install --skills` | `@playwright/cli` |

`playwright-mcp`, `playwright-mcp-tuned` and `stagehand` are the setups from Stagehand's study [Why Playwright MCP Uses So Many Tokens](https://www.stagehand.dev/blog/playwright-mcp-token-usage).

## Latest results

<!-- results:start -->
**Online-Mind2Web, DeepSeek V4.1 Flash.** Latest run: [2026-10-05-run-37268739610](results/2026-10-05-run-37268739610/report.md) on 2026-10-05, `deepseek-flash-4-1`, 1 runs per task, [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37268739610).

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| playwright-mcp | 479k | $0.030 | 46% (23/50) | 155 s | 28 |
| playwright-mcp-tuned | 546k | $0.032 | 52% (26/50) | 116 s | 25 |
| stagehand | 336k | $0.023 | 64% (32/50) | 108 s | 25 |
| wdio-mcp | 292k | $0.019 | 56% (28/50) | 128 s | 27.5 |
| wdio-session | 165k | $0.013 | 50% (25/50) | 158 s | 28 |
| agent-browser | 816k | $0.036 | 42% (21/50) | 187 s | 41.5 |
| playwright-cli | 620k | $0.031 | 60% (30/50) | 173 s | 38.5 |

_Medians per run, except success. Tokens include cache reads and writes._

Versions: playwright-mcp: `@playwright/mcp@0.0.83` · playwright-mcp-tuned: `@playwright/mcp@0.0.83` · stagehand: `browserbase/stagehand@4.1.0+cd7b230` · wdio-mcp: `@wdio/mcp@4.0.0-dev.64` · wdio-session: `@wdio/cli@10.0.0-alpha.175` · agent-browser: `agent-browser@0.38.2` · playwright-cli: `@playwright/cli@0.1.22`

**Online-Mind2Web, Claude Sonnet 5.** Latest run: [2026-10-05-run-37268732268](results/2026-10-05-run-37268732268/report.md) on 2026-10-05, `claude-sonnet-5`, 1 runs per task, [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37268732268).

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| playwright-mcp | 363k | $0.177 | 32% (16/50) | 74 s | 16 |
| playwright-mcp-tuned | 284k | $0.165 | 36% (18/50) | 76 s | 14 |
| stagehand | 549k | $0.216 | 60% (30/50) | 105 s | 26 |
| wdio-mcp | 241k | $0.107 | 52% (26/50) | 73 s | 18.5 |
| wdio-session | 306k | $0.128 | 54% (27/50) | 109 s | 20 |
| agent-browser | 1116k | $0.355 | 48% (24/50) | 127 s | 32.5 |
| playwright-cli | 680k | $0.259 | 40% (20/50) | 119 s | 26.5 |

_Medians per run, except success. Tokens include cache reads and writes._

Versions: playwright-mcp: `@playwright/mcp@0.0.83` · playwright-mcp-tuned: `@playwright/mcp@0.0.83` · stagehand: `browserbase/stagehand@4.1.0+cd7b230` · wdio-mcp: `@wdio/mcp@4.0.0-dev.64` · wdio-session: `@wdio/cli@10.0.0-alpha.175` · agent-browser: `agent-browser@0.38.2` · playwright-cli: `@playwright/cli@0.1.22`

All runs: [results](results/README.md).
<!-- results:end -->

## What is measured

Per run, from the Claude Agent SDK's result message:

- **Success:** WebJudge accepts the run (see below).
- **Tokens:** input, output, cache reads and cache writes. The tables report the sum.
- **Cost** in USD.
- **Time:** wall-clock time of the whole run, including starting the browser.
- **Turns and tool calls.**

The report prints medians per setup, plus a pass matrix per task.

## The tasks: Online-Mind2Web

[Online-Mind2Web](https://github.com/OSU-NLP-Group/Online-Mind2Web) (COLM 2025) is 300 tasks on 136 live websites, written by researchers at Ohio State and judged by the benchmark's own judge. Neither we nor any tool vendor chose or tuned for these tasks.

- **The sample:** 100 tasks, split across easy, medium and hard in the dataset's own proportions, drawn with a fixed seed from a fixed dataset revision ([`src/mind2web.ts`](src/mind2web.ts)). [`tasks/online-mind2web.json`](tasks/online-mind2web.json) lists their ids; anyone with the dataset can recompute it. The dataset is gated on Hugging Face, so its task texts stay out of this repository: the runner downloads them with `HF_TOKEN` (accept the [dataset terms](https://huggingface.co/datasets/osunlp/Online-Mind2Web) first).
- **The prompt:** the task and its start page, plus one rule: don't sign in, create accounts, pay or enter personal data; stop right before that. Same for every setup.
- **Screenshots:** after every tool call the harness, not the agent, screenshots the page the agent is on, over the Chrome DevTools Protocol of the browser the run started ([`src/screenshots.ts`](src/screenshots.ts)). No agent pays tokens for them. Playwright (MCP and CLI) starts Chrome without a debugging port, so for this suite its config adds one; nothing else about any setup changes. We checked that capturing doesn't change tool behaviour (same tokens and results with and without, for Stagehand and agent-browser).
- **The judge:** [WebJudge](https://github.com/OSU-NLP-Group/Online-Mind2Web#-webjudge) with `o4-mini`, as its authors recommend (86% agreement with human reviewers), at a pinned commit ([`src/judge.ts`](src/judge.ts)). It sees the task, the agent's actions and the screenshots, not the agent's final answer, and comes from another model family than the agents, so it can't favour its own. The action history is exactly what the agent issued (the shell command or the tool call), never a tool's reply, so a tool with chattier output gains nothing. Two changes to running it, both mechanical: WebJudge sends `max_tokens=512` and `temperature=0`, which OpenAI's reasoning models reject (and 512 tokens would go to reasoning), so the one API call sends `max_completion_tokens` instead; and its worker processes need the `fork` start method, which a wrapper sets. The judge's reasoning for every run is published in `judgments-*.jsonl`, for spot checks.
- **Unjudged runs don't count:** a run the judge couldn't decide stays pending and is left out of every number, with a note in the report.
- **Uncertainty is shown:** 100 tasks can't separate close results either. The website shows a 95% confidence interval under every success rate.

Limitations to keep in mind:

- Live websites change, block bots and show CAPTCHAs. Every setup runs in the same job, from the same IP address and interleaved in time, so a site that blocks, blocks everyone alike, but runs are not exactly repeatable. Blocked runs count as failures for every tool they hit.
- WebJudge disagrees with human reviewers on about one run in seven.
- The judge sees the page after each tool call. A tool that does several steps in one call (`perform_actions`, `run` with several actions) leaves fewer screenshots of the steps in between, which can hide evidence the judge looks for, such as an applied filter.
- Our action strings don't follow Online-Mind2Web's submission grammar, which only matters for an official leaderboard submission. The trajectories are in their v1 layout and could be converted.

## Keeping it fair

- **Same model and harness for every setup:** `claude-sonnet-5` with thinking disabled, through the Claude Agent SDK. A run can pick another model (`--model`, the workflow's `model` input): Claude models go to Anthropic, others (`deepseek-flash-4-1`, DeepSeek V4.1 Flash) to [OpenRouter's Anthropic-compatible API](https://openrouter.ai/docs/guides/guides/claude-code-integration), with every model slot of Claude Code on that model so no call reaches Claude. The harness, prompts and setups stay the same. Their cost is computed from the tokens and OpenRouter's prices at the start of the run, which the run's meta keeps; the SDK would price them as Claude tokens ([`src/models.ts`](src/models.ts)).
- **Same prompts:** one system prompt for everyone. A setup only adds one sentence on how to reach the browser ([`src/setups.ts`](src/setups.ts)).
- **No side doors:** built-in tools are switched off and `WebFetch`/`WebSearch` are denied. The MCP setups get only their MCP tools. The command-line setups (`wdio-session`, `agent-browser`, `playwright-cli`) get `Skill`, `Read` and `Bash` for their own commands only ([`src/permit.ts`](src/permit.ts): every part of a command must be a call of the tool, an `echo`, `true`, a heredoc or `echo` feeding the tool, or a read-only filter on its output; command substitution only of the tool's own commands; no redirects outside the run directory). agent-browser's `install`, `upgrade`, `plugin`, `chat` (which runs a model of its own) and `dashboard` are denied, and so are playwright-cli's `install*`, `show` (a dashboard), `kill-all` (which kills browsers outside the run) and `delete-data`. Every other tool call is denied.
- **No hints in the prompt:** the prompts don't mention headless or headed browsers or any tool's flags; each tool runs with its own defaults.
- **Same browser conditions:** every setup asks for a headless local Chrome (Stagehand's facade only runs headed, so every workflow job gets the same virtual display), a fresh working directory per run, and the page state is reset before each run.
- **Debuggable:** every result row keeps the agent's final message, `steps-*.jsonl` keeps what the agent did step by step (the action it issued, its note before it, the page URL after it, failed and denied calls; [`src/steps.ts`](src/steps.ts)), and the workflow keeps every full transcript with its screenshots as an artifact for 90 days. On the website, a click on a result opens the run.
- **Same machine, same address:** every setup runs in one job on one GitHub-hosted runner, because websites block by IP address and every runner has its own: in separate jobs one tool could get a clean address and another a blocked one (our first pilot showed exactly that). The runs are shuffled with a fixed seed (`--seed`), so a run can be reproduced.
- **Exact versions:** every tool is installed before the first run, so install time never counts, and dist-tags like `latest` are resolved and recorded in the report.
- **Everything is published:** code, prompts, checks and the raw JSONL of every run.

If you work on one of these tools and think we set it up wrong, please open an issue or a PR. We'd rather fix the setup than win on a technicality.

## Running the benchmark

### In GitHub Actions

Start the [Benchmark workflow](../../actions/workflows/benchmark.yml) with **Run workflow**. Every input has a default:

| Input | Default | What it does |
|---|---|---|
| `webdriverio` | `10.0.0-alpha.175` | `@wdio/cli` version for `wdio-session` (v10 and up; `latest` is still v9, which has no `wdio session`) |
| `wdio-mcp` | `4.0.0-dev.64` | `@wdio/mcp` version |
| `playwright-mcp` | `0.0.83` | `@playwright/mcp` version, for both Playwright setups |
| `agent-browser` | `0.38.2` | `agent-browser` version |
| `playwright-cli` | `0.1.22` | `@playwright/cli` version |
| `stagehand` | `cd7b230…` | git ref of `browserbase/stagehand` to build (branch, tag or sha); `latest` is the newest `@browserbasehq/stagehand@x.y.z` release tag |
| `model` | `claude-sonnet-5` | model for every agent: `claude-sonnet-5`, or `deepseek-flash-4-1` through OpenRouter (needs the `OPENROUTER_API_KEY` repository secret) |
| `runs` | `1` | runs per task and setup |
| `setups`, `tasks` | `all` | comma-separated ids to run a subset |
| `seed` | `1` | seed for the run order |
| `concurrency` | `4` | runs at the same time |
| `publish` | on | commit the results to this repository |

Every default is pinned to the version of the published results, so a new run adds to their rows instead of starting new ones. npm versions accept an exact version, a dist-tag (`latest`, `next`) or a range. A setup whose tool can't be installed is skipped, and the report says why.

The workflow runs every setup in one job, has WebJudge judge every run, then publishes:

1. writes `results/<date>-run-<id>/` with the raw `runs-*.jsonl`, the step logs `steps-*.jsonl`, the merged `meta.json` and a `report.md` (tool versions, configuration, results, every failed run, environment, and a link to the workflow run),
2. updates the [index of all runs](results/README.md) and the **Latest results** section above,
3. commits and pushes that as `results: <id>`,
4. waits until Vercel has deployed that commit and [benchmark.webdriver.io](https://benchmark.webdriver.io) serves the new run, and fails otherwise.

The report also appears on the workflow run's summary page. The workflow needs the `ANTHROPIC_API_KEY`, `HF_TOKEN` (dataset terms accepted) and `OPENAI_API_KEY` (for the judge) repository secrets.

### Locally

Requires Node.js 24, Chrome and `python3` (for the judge). The Agent SDK picks up your Anthropic credentials (`ANTHROPIC_API_KEY` or an `ant auth login` profile). The tasks need `HF_TOKEN` with the [dataset terms](https://huggingface.co/datasets/osunlp/Online-Mind2Web) accepted, the judge needs `OPENAI_API_KEY`.

```sh
npm install
npm run bench -- --dry-run                         # print the shuffled plan
npm run bench -- --setups wdio-session,playwright-mcp --tasks om2w-180ed2ec
npm run bench                                      # everything: 7 setups × 100 tasks
node src/judge.ts results/<id>                     # WebJudge decides every run, writes judgments-*.jsonl
node src/publish.ts results/<id>                   # report.md, results index, README section
```

`node src/mind2web.ts sample` picks the 100 tasks again (same seed, same sample; a larger `--size` keeps every task of a smaller one) and writes `tasks/online-mind2web.json`.

Pick versions with `WDIO_VERSION`, `WDIO_MCP_VERSION`, `PLAYWRIGHT_MCP_VERSION`, `PLAYWRIGHT_CLI_VERSION`, `AGENT_BROWSER_VERSION` and `STAGEHAND_REF` (default `latest`, except `WDIO_VERSION` and `WDIO_MCP_VERSION`: `wdio session` ships with v10, and `@wdio/mcp` 4 is still a dev build; see the workflow inputs above for the current defaults). To test an unreleased WebdriverIO:

```sh
export WDIO_LOCAL=/path/to/webdriverio   # a built checkout of webdriverio/webdriverio
```

Runner options: `--setups`, `--tasks`, `--runs` (default 1), `--model` (default `claude-sonnet-5`), `--seed`, `--out-dir`, `--max-turns` (default 80), `--timeout-min` (default 10), `--concurrency` (default 1; parallel browsers compete for CPU, which shows in the time per task), `--screenshots` (always on: WebJudge decides from them).

A full run is 700 agent runs. 350 take four to five hours at concurrency 4, and a GitHub job stops after six, so in the workflow a full run is two runs with 50 task ids each (`tasks`). Runs of the same tool versions and model count toward one row on the website.

### Stagehand

Stagehand's Claude Code integration (the `run` / `snapshot` / `screenshot` facade from their study) is not published to npm yet ([browserbase/stagehand#2971](https://github.com/browserbase/stagehand/pull/2971)). The benchmark builds it from source exactly as [their README](https://github.com/browserbase/stagehand/tree/main/packages/integrations/claude-code) does (`pnpm install`, then `turbo run build --filter @browserbasehq/stagehand-integrations`), once per commit, before any run starts. Reports label it with the Stagehand SDK version and the commit, e.g. `4.1.0+cd7b230`.

It is wired up like their own Claude Agent SDK example (`packages/integrations/claude-code/src/agent.ts`):

- the agent gets their `FACADE_AGENT_INSTRUCTIONS` on top of the shared system prompt, the same way `wdio-session` gets its skill;
- only `STAGEHAND_*` and `BROWSERBASE_*` variables reach the server (plus `PATH`, `HOME`, `DISPLAY` for a local Chrome), and `STAGEHAND_BROWSER=local`, so it runs the same local browser as everyone else instead of Browserbase's cloud;
- no `STAGEHAND_MODEL_NAME` and no provider key reaches it, so the facade runs no model of its own and every token it costs shows up in the agent's usage.

The facade always launches a headed browser. In the workflow every job runs under `xvfb-run`, so all setups get the same virtual display.

## Website

[benchmark.webdriver.io](https://benchmark.webdriver.io) renders every published run. `npm run site` builds it into `dist/`: a static page plus `data.json`, which [`src/site.ts`](src/site.ts) aggregates from `results/`.

Runs are grouped by **setup + package version + model**. Every run of, say, `@wdio/cli@10.0.0` with `claude-sonnet-5` counts toward one row, across workflow runs; a new version starts a new row. The page shows a leaderboard of the newest version of each tool that ran every task (pilots on a few tasks are listed but not ranked), success against cost, tokens or time with 95% confidence intervals, success per difficulty and per task, every version with the runs behind it, and a log of all runs. A click on a task result opens the run: what the judge checked and decided, the agent's answer, its tokens, cost and time, and every step it took. Those details are in `runs/<task>.json`, loaded on demand; `robots.txt`, a `noindex` header and a canary string keep them out of search indexes and training data, since they describe tasks of a gated dataset.

Results published before the runner wrote step logs get them from the [Backfill step logs](../../actions/workflows/backfill-steps.yml) workflow, which reads the run's transcripts artifact while it lasts (90 days).

It is hosted on Vercel (project `webdriverio-benchmark`), which is connected to this repository and builds every push to `main` with the settings in [`vercel.json`](vercel.json), including the result commits of the Benchmark workflow. To preview locally:

```sh
npm run site && npx serve dist
```

## Layout

```
.github/workflows/benchmark.yml   the benchmark workflow
.github/workflows/backfill-steps.yml  step logs for results published before them
vercel.json                       Vercel build settings for benchmark.webdriver.io
src/run.ts        runner: installs tools, runs the plan, writes runs-*.jsonl and meta-*.json
src/setups.ts     the seven tool setups
src/tools.ts      installs and pins the npm package behind each setup
src/tasks.ts      the tasks as agents get them
src/mind2web.ts   samples Online-Mind2Web and loads its tasks
src/judge.ts      runs WebJudge on a result directory
src/steps.ts      the step log of a run, from its transcript
src/models.ts     Claude and OpenRouter models, and their prices
src/report.ts     Markdown tables from run results
src/publish.ts    report.md, results index and README section for a result directory
src/site.ts       builds the website into dist/
site/             the website: index.html, app.js, style.css, robots.txt
tasks/            the ids of the sampled tasks
results/          one directory per benchmark run
```
