# Benchmark run 2026-10-04-run-37176001713: Online-Mind2Web

Produced by [workflow run #37176001713](https://github.com/webdriverio/benchmark/actions/runs/37176001713) on 2026-10-04 from commit [`020f5cf`](https://github.com/webdriverio/benchmark/commit/020f5cf708fb2cb94869eea23eef43aec9e456d4). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37176001713) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `claude-sonnet-5`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 1 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Suite | Online-Mind2Web: A fixed random sample of Online-Mind2Web, an independent benchmark of 300 tasks on live websites, judged by its own WebJudge. |
| Tasks | 10 tasks sampled from Online-Mind2Web (ids in [`tasks/online-mind2web.json`](https://github.com/webdriverio/benchmark/blob/main/tasks/online-mind2web.json)); live websites, so runs are not exactly repeatable |
| Success decided by | WebJudge (`o4-mini`, score threshold 3, [Online-Mind2Web@f0d805e](https://github.com/OSU-NLP-Group/Online-Mind2Web/tree/f0d805ee0e9e0b3ea70911e45e5264b72968f3dc); patched: reasoning models: max_completion_tokens=8192 instead of max_tokens=512, no temperature). Its reasoning per run: `judgments-*.jsonl` |
| Screenshots | after every tool call, taken by the harness over CDP (no agent tokens) |
| Duration | 32 min |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0-dev.58`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0-dev.58) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.166`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.166) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 346k | $0.173 | 30% (3/10) | 62 s | 18 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 285k | $0.152 | 40% (4/10) | 43 s | 13 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 723k | $0.299 | 60% (6/10) | 82 s | 24 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.58 | 316k | $0.132 | 30% (3/10) | 65 s | 28.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.166 | 462k | $0.182 | 40% (4/10) | 107 s | 29.5 |
| `agent-browser`<br>agent-browser@0.38.2 | 556k | $0.219 | 40% (4/10) | 98 s | 31.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser |
|---|--:|--:|--:|--:|--:|--:|
| om2w-6ebde509 | 1/1 · 933k · 70s | 1/1 · 732k · 57s | 1/1 · 723k · 80s | 1/1 · 141k · 53s | 1/1 · 498k · 93s | 1/1 · 1386k · 98s |
| om2w-9d46ccb9 | 0/1 · 219k · 83s | 0/1 · 97k · 29s | 1/1 · 1877k · 125s | 0/1 · 645k · 106s | 0/1 · 478k · 183s | 0/1 · 3231k · 178s |
| om2w-64b76158 | 0/1 · 380k · 55s | 0/1 · 302k · 46s | 0/1 · 339k · 83s | 0/1 · 126k · 41s | 0/1 · 349k · 79s | 0/1 · 519k · 69s |
| om2w-ba2a469a | 1/1 · 313k · 32s | 1/1 · 268k · 36s | 0/1 · 394k · 43s | 1/1 · 491k · 67s | 1/1 · 356k · 88s | 0/1 · 118k · 26s |
| om2w-56f8890a | 0/1 · 101k · 46s | 0/1 · 114k · 40s | 1/1 · 722k · 70s | 0/1 · 277k · 64s | 1/1 · 446k · 135s | 1/1 · 536k · 98s |
| om2w-27fa3ac2 | 0/1 · 1727k · 103s | 0/1 · 1806k · 88s | 0/1 · 1819k · 68s | 0/1 · 354k · 52s | 0/1 · 1386k · 122s | 0/1 · 2406k · 128s |
| om2w-29b7372d | 1/1 · 226k · 26s | 1/1 · 184k · 24s | 0/1 · 333k · 87s | 1/1 · 116k · 25s | 0/1 · 138k · 33s | 0/1 · 208k · 23s |
| om2w-9ed38272 | 0/1 · 2635k · 108s | 1/1 · 1357k · 108s | 1/1 · 6438k · 247s | 0/1 · 2986k · 302s | 1/1 · 2065k · 277s | 1/1 · 2038k · 124s |
| om2w-180ed2ec | 0/1 · 638k · 300s | 0/1 · 494k · 231s | 1/1 · 293k · 44s | 0/1 · 2619k · 169s | 0/1 · 2300k · 524s | 0/1 · 576k · 335s |
| om2w-3dca7cbe | 0/1 · 80k · 24s | 0/1 · 98k · 38s | 1/1 · 1272k · 103s | 0/1 · 0k · 600s | 0/1 · 132k · 77s | 1/1 · 399k · 64s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-180ed2ec #1: WebJudge: failure. The agent repeatedly navigated the main UMich site, attempted Google searches, clicked various elements (e9, e18, e36, etc.) but never reached a page that clearly provides instructi
- **agent-browser** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to Stanford’s ExploreCourses, filtered for Winter 2022–2023 and CHEM, and viewed course listings with days and times. However, it never applied or c
- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent navigated to Google Finance and searched for “Microsoft,” but never selected the MSFT listing or displayed the news feed. No snapshot shows the “first top news” for Micros
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The user requested a comparison of two specific pescatarian diets focused on eating healthier. The agent only navigated to general Healthline articles, read outlines and takeaways, 
- **agent-browser** · om2w-9d46ccb9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-ba2a469a #1: WebJudge: failure. The agent only performed a keyword search (“computer science beginner python”) without applying or confirming a “Beginner” level filter. The selected course is focused on data scien
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent never progressed past the Cloudflare verification page and did not locate any UM-Dearborn giving or gift/donation instructions. It never clicked “Verify you are human,” no
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to Stanford’s ExploreCourses, searched for “CHEM,” set the academic year to 2022–2023, applied filters for Graduate career, Winter term, and Monday day
- **playwright-mcp** · om2w-3dca7cbe #1: WebJudge: failure. The agent navigated to a “woman → rug” page rather than the specified “zara home → rug” category, and no color filter for beige was applied. Neither key point is met.
- **playwright-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent never navigated to the “Prometheus” title page on IMDb, nor did it access the “Crazy Credits” section. No filters or specific content were displayed; the required “Crazy C
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to Healthline articles on the pescatarian diet and a comparison article, extracted headings and sections like “Foods to eat” and “Drawbacks,” but never identifie
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent never entered any shipping details (weight, dimensions, origin, destination) nor submitted the form to retrieve a time-and-cost quote. No fastest shipping option was selec
- **playwright-mcp** · om2w-9ed38272 #1: WebJudge: failure. The agent navigated to the IRA calculator and correctly set the age range (30–65), starting balance ($30,000), annual return (3%), current tax rate (13%), and retirement tax rate (2
- **playwright-mcp-tuned** · om2w-180ed2ec #1: WebJudge: failure. The agent only loaded the University of Michigan homepage repeatedly and never navigated to any UM-Dearborn giving or gift page, so it did not determine a method for giving a gift t
- **playwright-mcp-tuned** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly filtered for Winter 2022–2023, the Chemistry department, graduate‐level courses, and Monday offerings, and it did click through to individual course schedules (C
- **playwright-mcp-tuned** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara homepage and did not select the “Zara Home” category, did not navigate to “Rug,” and did not apply a filter for the color beige. None of the key
- **playwright-mcp-tuned** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to IMDb and reached the Prometheus main page but never accessed or displayed the “Crazy Credits” section (no click on crazy credits link or navigation to that su
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated and retrieved content from two pescatarian-related articles but did not synthesize or provide a comparison of two distinct pescatarian diets or actionable a
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated to the UPS site and ran code to fetch page content; it never entered origin, destination, weight, or dimensions, did not apply a “fastest shipping” filter, 
- **stagehand** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to the Winter 2022–2023 chemistry courses, applied filters for term (Winter), career (Graduate), and day (Monday), and viewed the schedules for CHEM 22
- **stagehand** · om2w-29b7372d #1: WebJudge: failure. The agent correctly navigated to Google Finance and the Microsoft stock page. It attempted to click the first news item (id=6521) but no navigation or new page loading occurred, and
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to several Healthline articles about pescatarian eating and even scraped text, but it never identified two distinct pescatarian diet plans nor provided any side-
- **stagehand** · om2w-ba2a469a #1: WebJudge: failure. The agent never applied a proper “Level = Beginner” filter (only included “beginner” in the query) nor used the “Computer Science” subject filter explicitly. The final course select
- **wdio-mcp** · om2w-180ed2ec #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly filtered for Winter 2022–2023, graduate‐level CHEM courses, and Monday, and listed CHEM 223, 273, 299, and 300. However, it never applied or confirmed a “time of
- **wdio-mcp** · om2w-3dca7cbe #1: timeout after 10 min
- **wdio-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to the Prometheus crazy-credits URL on IMDb but never bypassed the human-verification step, so no actual “crazy credits” content was displayed. The snapshots onl
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to Healthline, searched “pescatarian diet,” and extracted article text, but never actually compared two pescatarian diet types or focused on eating healthier in 
- **wdio-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent filled in origin and destination, entered the package dimensions (4×4×4″) and weight (5 lbs), and navigated to the rate results page where “Next Day Air Early” (the fastes
- **wdio-mcp** · om2w-9ed38272 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-180ed2ec #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to Stanford’s ExploreCourses, selected chemistry courses, and applied the Winter 2023 term filter, but it never applied a graduate‐level (career) fi
- **wdio-session** · om2w-29b7372d #1: WebJudge: failure. The agent successfully accessed Google Finance (step 1) and searched for “Microsoft” (step 2), even selecting the MSFT ticker. However, there is no evidence that the agent actually 
- **wdio-session** · om2w-3dca7cbe #1: WebJudge: failure. The agent never navigated through the “zara home” → “rug” category path nor applied the color “beige” filter. It only opened and closed the Zara homepage without selecting the requi
- **wdio-session** · om2w-64b76158 #1: WebJudge: failure. The agent searched for “pescatarian diet” and opened related Healthline articles, including a general pescatarian overview and a “Vegetarian vs Pescatarian” comparison. However, it 
- **wdio-session** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated to various pages (UPS, Google, FedEx) and issued waits, but never entered the origin, destination, weight, or dimensions, nor applied a “fastest shipping” f

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
