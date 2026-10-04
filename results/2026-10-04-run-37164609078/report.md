# Benchmark run 2026-10-04-run-37164609078: Token study

Produced by [workflow run #37164609078](https://github.com/webdriverio/benchmark/actions/runs/37164609078) on 2026-10-04 from commit [`88e8bd5`](https://github.com/webdriverio/benchmark/commit/88e8bd5d6ce10ceabcb0bd9df5fb4e699a51858a). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37164609078) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `claude-sonnet-5`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 3 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Suite | Token study: The eight tasks from Stagehand's Playwright MCP token study: four public sites and four local pages, checked by code. |
| Tasks | `saucedemo-checkout` (public), `books-cheapest` (public), `wikipedia-hops` (public), `nodejs-docs-fact` (public), `iframe-form` (local), `closed-shadow` (local), `icon-no-role` (local), `long-form` (local) |
| Success decided by | code checks of the answer and the page state ([src/tasks.ts](https://github.com/webdriverio/benchmark/blob/main/src/tasks.ts)) |
| Screenshots | none |
| Duration | 15 min |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0-dev.56`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0-dev.56) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.155`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.155) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 88k | $0.047 | 100% (24/24) | 21 s | 8 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 88k | $0.052 | 100% (24/24) | 22 s | 7.5 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 45k | $0.033 | 96% (23/24) | 14 s | 6 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.56 | 67k | $0.033 | 100% (24/24) | 15 s | 6 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.155 | 77k | $0.039 | 100% (24/24) | 18 s | 6.5 |
| `agent-browser`<br>agent-browser@0.38.2 | 176k | $0.076 | 100% (24/24) | 24 s | 11.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser |
|---|--:|--:|--:|--:|--:|--:|
| nodejs-docs-fact | 3/3 · 24k · 6s | 3/3 · 24k · 6s | 3/3 · 13k · 9s | 3/3 · 26k · 9s | 3/3 · 34k · 8s | 3/3 · 95k · 16s |
| icon-no-role | 3/3 · 60k · 17s | 3/3 · 61k · 18s | 3/3 · 45k · 15s | 3/3 · 66k · 15s | 3/3 · 49k · 11s | 3/3 · 78k · 13s |
| closed-shadow | 3/3 · 91k · 30s | 3/3 · 90k · 34s | 3/3 · 17k · 7s | 3/3 · 36k · 16s | 3/3 · 34k · 16s | 3/3 · 64k · 11s |
| wikipedia-hops | 3/3 · 314k · 42s | 3/3 · 286k · 33s | 3/3 · 331k · 85s | 3/3 · 129k · 34s | 3/3 · 205k · 47s | 3/3 · 1663k · 118s |
| long-form | 3/3 · 582k · 53s | 3/3 · 527k · 54s | 3/3 · 202k · 32s | 3/3 · 158k · 27s | 3/3 · 169k · 40s | 3/3 · 478k · 37s |
| books-cheapest | 3/3 · 75k · 16s | 3/3 · 73k · 17s | 2/3 · 48k · 14s | 3/3 · 67k · 14s | 3/3 · 103k · 21s | 3/3 · 167k · 23s |
| saucedemo-checkout | 3/3 · 210k · 26s | 3/3 · 176k · 26s | 3/3 · 71k · 18s | 3/3 · 69k · 16s | 3/3 · 83k · 20s | 3/3 · 340k · 24s |
| iframe-form | 3/3 · 53k · 9s | 3/3 · 51k · 10s | 3/3 · 18k · 7s | 3/3 · 37k · 13s | 3/3 · 54k · 15s | 3/3 · 257k · 48s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **stagehand** · books-cheapest #1: #1: expected Tastes Like Fear (DI Marnie Rome #3) £10.69, got The Girl You Lost £12.29

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
