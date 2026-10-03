# Benchmark run 2026-10-03-run-37156195130

Produced by [workflow run #37156195130](https://github.com/webdriverio/benchmark/actions/runs/37156195130) on 2026-10-03 from commit [`52c9ae9`](https://github.com/webdriverio/benchmark/commit/52c9ae9a785bb2a94a0b114a04b89fe692d82c7f). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37156195130) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `claude-sonnet-5`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 3 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Tasks | `saucedemo-checkout` (public), `books-cheapest` (public), `wikipedia-hops` (public), `nodejs-docs-fact` (public), `iframe-form` (local), `closed-shadow` (local), `icon-no-role` (local), `long-form` (local) |
| Duration | 16 min |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`3.14.0`](https://www.npmjs.com/package/@wdio/mcp/v/3.14.0) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.155`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.155) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 93k | $0.043 | 100% (24/24) | 23 s | 9 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 88k | $0.044 | 100% (24/24) | 21 s | 9 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 62k | $0.038 | 100% (24/24) | 18 s | 8 |
| `wdio-mcp`<br>@wdio/mcp@3.14.0 | 199k | $0.070 | 100% (24/24) | 19 s | 13.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.155 | 77k | $0.040 | 100% (24/24) | 21 s | 6.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session |
|---|--:|--:|--:|--:|--:|
| nodejs-docs-fact | 3/3 · 24k · 6s | 3/3 · 24k · 6s | 3/3 · 18k · 20s | 3/3 · 67k · 9s | 3/3 · 34k · 10s |
| icon-no-role | 3/3 · 54k · 18s | 3/3 · 63k · 19s | 3/3 · 43k · 18s | 3/3 · 138k · 13s | 3/3 · 61k · 16s |
| closed-shadow | 3/3 · 102k · 31s | 3/3 · 88k · 31s | 3/3 · 17k · 8s | 3/3 · 891k · 118s | 3/3 · 44k · 19s |
| wikipedia-hops | 3/3 · 312k · 39s | 3/3 · 273k · 36s | 3/3 · 252k · 66s | 3/3 · 583k · 38s | 3/3 · 192k · 46s |
| long-form | 3/3 · 582k · 55s | 3/3 · 541k · 57s | 3/3 · 202k · 32s | 3/3 · 838k · 53s | 3/3 · 166k · 43s |
| books-cheapest | 3/3 · 73k · 18s | 3/3 · 63k · 16s | 3/3 · 60k · 17s | 3/3 · 134k · 13s | 3/3 · 103k · 22s |
| saucedemo-checkout | 3/3 · 210k · 28s | 3/3 · 170k · 23s | 3/3 · 70k · 21s | 3/3 · 193k · 18s | 3/3 · 93k · 25s |
| iframe-form | 3/3 · 53k · 10s | 3/3 · 51k · 11s | 3/3 · 18k · 8s | 3/3 · 223k · 19s | 3/3 · 55k · 21s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

_Every run passed._

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
