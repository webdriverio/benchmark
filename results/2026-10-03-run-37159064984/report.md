# Benchmark run 2026-10-03-run-37159064984

Produced by [workflow run #37159064984](https://github.com/webdriverio/benchmark/actions/runs/37159064984) on 2026-10-03 from commit [`31346c7`](https://github.com/webdriverio/benchmark/commit/31346c7e9b259945f820c07ea5c5c285ae404425). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37159064984) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `claude-sonnet-5`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 3 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Tasks | `saucedemo-checkout` (public), `books-cheapest` (public), `wikipedia-hops` (public), `nodejs-docs-fact` (public), `iframe-form` (local), `closed-shadow` (local), `icon-no-role` (local), `long-form` (local) |
| Duration | 20 min |

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
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 92k | $0.052 | 100% (24/24) | 25 s | 8.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 100k | $0.055 | 100% (24/24) | 22 s | 8.5 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 34k | $0.029 | 92% (22/24) | 15 s | 6 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.56 | 67k | $0.033 | 100% (24/24) | 15 s | 6 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.155 | 71k | $0.038 | 100% (24/24) | 21 s | 6 |
| `agent-browser`<br>agent-browser@0.38.2 | 117k | $0.059 | 100% (24/24) | 21 s | 9 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser |
|---|--:|--:|--:|--:|--:|--:|
| nodejs-docs-fact | 3/3 · 24k · 6s | 3/3 · 24k · 6s | 3/3 · 13k · 10s | 3/3 · 21k · 9s | 3/3 · 34k · 10s | 3/3 · 74k · 17s |
| icon-no-role | 3/3 · 78k · 21s | 3/3 · 63k · 17s | 3/3 · 32k · 13s | 3/3 · 64k · 15s | 3/3 · 52k · 12s | 3/3 · 78k · 13s |
| closed-shadow | 3/3 · 100k · 59s | 3/3 · 101k · 36s | 3/3 · 17k · 8s | 3/3 · 29k · 15s | 3/3 · 44k · 19s | 3/3 · 64k · 12s |
| wikipedia-hops | 3/3 · 307k · 49s | 3/3 · 345k · 53s | 3/3 · 221k · 92s | 3/3 · 141k · 33s | 3/3 · 216k · 52s | 3/3 · 1699k · 140s |
| long-form | 3/3 · 581k · 55s | 3/3 · 541k · 55s | 2/3 · 202k · 31s | 3/3 · 158k · 27s | 3/3 · 166k · 42s | 3/3 · 470k · 34s |
| books-cheapest | 3/3 · 74k · 18s | 3/3 · 72k · 16s | 3/3 · 49k · 14s | 3/3 · 67k · 13s | 3/3 · 103k · 24s | 3/3 · 125k · 24s |
| saucedemo-checkout | 3/3 · 173k · 26s | 3/3 · 172k · 24s | 2/3 · 399k · 52s | 3/3 · 69k · 15s | 3/3 · 93k · 26s | 3/3 · 914k · 129s |
| iframe-form | 3/3 · 53k · 14s | 3/3 · 51k · 10s | 3/3 · 22k · 10s | 3/3 · 29k · 12s | 3/3 · 55k · 18s | 3/3 · 86k · 13s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **stagehand** · long-form #1: setup was not finished
- **stagehand** · saucedemo-checkout #2: Error: Claude Code returned an error result: Reached maximum number of turns (80)

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× INTEL(R) XEON(R) PLATINUM 8573C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
