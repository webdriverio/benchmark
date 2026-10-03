# Benchmark run 2026-10-03-run-37160827715

Produced by [workflow run #37160827715](https://github.com/webdriverio/benchmark/actions/runs/37160827715) on 2026-10-03 from commit [`a3f6c1c`](https://github.com/webdriverio/benchmark/commit/a3f6c1c96c2438d8a345d6b5afd4ba1f3376393c). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37160827715) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `claude-sonnet-5`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 3 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Tasks | `saucedemo-checkout` (public), `books-cheapest` (public), `wikipedia-hops` (public), `nodejs-docs-fact` (public), `iframe-form` (local), `closed-shadow` (local), `icon-no-role` (local), `long-form` (local) |
| Duration | unfinished |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 90k | $0.052 | 100% (13/13) | 25 s | 8 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 41k | $0.032 | 100% (4/4) | 19 s | 7 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | stagehand |
|---|--:|--:|
| nodejs-docs-fact | 2/2 · 24k · 9s | 1/1 · 13k · 11s |
| icon-no-role | 1/1 · 54k · 16s | 1/1 · 66k · 26s |
| closed-shadow | 2/2 · 90k · 31s | 1/1 · 17k · 12s |
| wikipedia-hops | 2/2 · 358k · 35s | 1/1 · 226k · 88s |
| long-form | 1/1 · 582k · 52s | – |
| books-cheapest | 2/2 · 64k · 14s | – |
| saucedemo-checkout | 2/2 · 193k · 25s | – |
| iframe-form | 1/1 · 53k · 9s | – |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

_Every run passed._

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
