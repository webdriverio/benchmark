# Benchmark run 2026-10-04-run-37166916465: Online-Mind2Web

Produced by [workflow run #37166916465](https://github.com/webdriverio/benchmark/actions/runs/37166916465) on 2026-10-04 from commit [`28397fb`](https://github.com/webdriverio/benchmark/commit/28397fb63ec2640a133fe50a96f1046417f07267). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37166916465) (kept 90 days).

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
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 262k | $0.139 | 30% (3/10) | 48 s | 15.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 298k | $0.125 | 30% (3/10) | 62 s | 17.5 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 471k | $0.212 | 40% (4/10) | 54 s | 19.5 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.56 | 349k | $0.146 | 20% (2/10) | 82 s | 27.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.155 | 534k | $0.213 | 40% (4/10) | 113 s | 27 |
| `agent-browser`<br>agent-browser@0.38.2 | 1280k | $0.409 | 80% (8/10) | 111 s | 32.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser |
|---|--:|--:|--:|--:|--:|--:|
| om2w-27fa3ac2 | 0/1 · 1056k · 91s | 0/1 · 1104k · 85s | 0/1 · 2044k · 73s | 0/1 · 414k · 77s | 1/1 · 620k · 110s | 1/1 · 1387k · 108s |
| om2w-9ed38272 | 0/1 · 550k · 57s | 1/1 · 1142k · 81s | 0/1 · 5906k · 244s | 0/1 · 1502k · 149s | 1/1 · 1450k · 285s | 1/1 · 2185k · 133s |
| om2w-29b7372d | 1/1 · 247k · 22s | 1/1 · 534k · 33s | 0/1 · 97k · 20s | 0/1 · 128k · 54s | 0/1 · 196k · 48s | 0/1 · 183k · 29s |
| om2w-9d46ccb9 | 0/1 · 179k · 42s | 0/1 · 190k · 54s | 1/1 · 1083k · 59s | 0/1 · 2732k · 234s | 0/1 · 1668k · 456s | 1/1 · 2219k · 151s |
| om2w-3dca7cbe | 0/1 · 91k · 36s | 0/1 · 107k · 50s | 1/1 · 619k · 104s | 0/1 · 0k · 600s | 0/1 · 142k · 53s | 1/1 · 1100k · 121s |
| om2w-64b76158 | 0/1 · 277k · 51s | 0/1 · 259k · 46s | 0/1 · 309k · 48s | 0/1 · 220k · 54s | 0/1 · 588k · 303s | 0/1 · 568k · 81s |
| om2w-6ebde509 | 1/1 · 546k · 46s | 1/1 · 1240k · 71s | 1/1 · 514k · 42s | 1/1 · 248k · 58s | 1/1 · 345k · 75s | 1/1 · 1325k · 90s |
| om2w-180ed2ec | 0/1 · 2055k · 436s | 0/1 · 336k · 162s | 0/1 · 184k · 37s | 0/1 · 2557k · 163s | 0/1 · 1912k · 441s | 1/1 · 770k · 113s |
| om2w-56f8890a | 0/1 · 135k · 60s | 0/1 · 156k · 86s | 1/1 · 146k · 33s | 0/1 · 284k · 87s | 0/1 · 408k · 116s | 1/1 · 1477k · 194s |
| om2w-ba2a469a | 1/1 · 203k · 29s | 0/1 · 198k · 30s | 0/1 · 427k · 108s | 1/1 · 521k · 76s | 1/1 · 480k · 78s | 1/1 · 1236k · 66s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and opened the Microsoft stock page, but it never clicked on or opened the first top news article. The click on element e215 did n
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to various Healthline articles on the pescatarian diet, types of pescatarian diets, and related comparisons, but never extracted, synthesized, or presented a dir
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent never located or navigated to a “Give” or “Donate” page for UM-Dearborn, nor did it identify any method to give a gift. It repeatedly returned to the umich.edu homepage an
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to ExploreCourses, filtered for CHEM and Winter 2022–2023, and retrieved all graduate‐level courses by post‐processing numbers ≥200. However, it never 
- **playwright-mcp** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara homepage and never selected the “zara home” → “rug” category path nor applied the color filter “beige.” It failed to meet both key points.
- **playwright-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent correctly navigated to the IMDb page for Prometheus’ “Crazy Credits” but never retrieved or displayed the actual credits content. The task to show the crazy credits was no
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to relevant articles and extracted text segments but did not perform the required comparison of two pescatarian diets or assess which is healthier. No summa
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated through UPS pages without entering origin (New York, NY 10001), destination (Truckee, CA 96162), package weight (5 lbs) or dimensions (4×4×4 in), nor did it
- **playwright-mcp** · om2w-9ed38272 #1: WebJudge: failure. The agent correctly navigated to the IRA calculator, entered all seven required inputs (age, retirement age, starting balance, return rate, current and retirement tax rates). Howeve
- **playwright-mcp-tuned** · om2w-180ed2ec #1: WebJudge: failure. The agent only navigated between the UMich main site and UM-Dearborn homepage without locating any “give a gift” or “donate” page or instructions. No evidence of finding the way to 
- **playwright-mcp-tuned** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to the 2022–2023 catalog, filtered for CHEM, Winter term, Graduate career, and Monday, then drilled into individual “Schedule for CHEM 223,” “CHEM 273,
- **playwright-mcp-tuned** · om2w-3dca7cbe #1: WebJudge: failure. The action history only shows repeated navigation to the Zara US homepage and does not include any navigation to the “Zara Home” → “Rug” category or applying the beige color filter.
- **playwright-mcp-tuned** · om2w-56f8890a #1: WebJudge: failure. The agent never navigated to the “Prometheus” title page or accessed any “Crazy Credits” section on IMDb. It repeatedly loaded the homepage without selecting the film or displaying 
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to general pescatarian diet articles and extracted text but did not outline or compare two distinct pescatarian diet plans focused on healthier eating. No c
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent never entered the weight, dimensions, origin, or destination, nor applied a “fastest shipping” filter or submitted the quote form. No quote results are displayed.
- **playwright-mcp-tuned** · om2w-ba2a469a #1: WebJudge: failure. The agent successfully searched for and identified a beginner-level course teaching Python skills, but never applied or confirmed a “Computer Science” topic filter. The chosen IBM D
- **stagehand** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully located the “Giving” link on the main UM site, navigated to the general giving page, and then clicked through to the UM-Dearborn “Giving” section, where the “
- **stagehand** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly filtered by subject (CHEM), term (Winter 2023), and career (Graduate), and selected Monday in the days filter. However, it never actually selected or confirmed t
- **stagehand** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and opened the Microsoft (MSFT) page, but there is no evidence it accessed the “Top News” section or retrieved the first news item
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to two Healthline articles about the pescatarian diet but did not extract or present any comparison of two distinct pescatarian diet plans for healthier eat
- **stagehand** · om2w-9ed38272 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-ba2a469a #1: WebJudge: failure. The agent only searched with keywords and clicked into a Python-focused data science course. While the course page confirmed “Beginner level” and detailed Python skills, it did not 
- **wdio-mcp** · om2w-180ed2ec #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully filtered for chemistry courses in Winter 2022–2023, selected “Monday” under days, and “Graduate” under career, and browsed the schedule links. However, it nev
- **wdio-mcp** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance, searched for and selected Microsoft stock, and reached the News section. However, there is no evidence that it clicked on or disp
- **wdio-mcp** · om2w-3dca7cbe #1: timeout after 10 min
- **wdio-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to the Prometheus crazy credits URL but never bypassed the human-verification CAPTCHA and did not display any of the actual “crazy credits” content from IMDb. Th
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The user wanted a comparison of two pescatarian diets for eating healthier. The agent only located a general Healthline page on pescatarian diets and did not identify or compare two
- **wdio-mcp** · om2w-9d46ccb9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-9ed38272 #1: WebJudge: failure. The agent only navigated to and displayed the input sliders for the IRA calculator but never set all values (age 30 to 65, $30 000 balance, 3% return, 13% current tax, 24% retiremen
- **wdio-session** · om2w-180ed2ec #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-29b7372d #1: WebJudge: failure. The agent opened Google Finance, searched for “Microsoft,” and navigated to the MSFT page, but it never applied a “Top news” filter nor clicked on the first news item. Therefore ste
- **wdio-session** · om2w-3dca7cbe #1: WebJudge: failure. The agent never navigated to the specific “rug” category under “Zara Home,” nor did it apply a beige color filter. It only opened the homepage and a generic home-decor page without 
- **wdio-session** · om2w-56f8890a #1: WebJudge: failure. The agent correctly navigated to the “Prometheus” crazy credits trivia page on IMDb but never captured or displayed the crazy credits content. No snapshot or console output of the c
- **wdio-session** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated through general Healthline pages on pescatarian diets and didn’t identify or compare two specific pescatarian diet plans or assess which is healthier. It ne
- **wdio-session** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to the UPS calculator, filled in origin (New York, NY 10001), destination (Truckee, CA 96162), dimensions (4×4×4 in) and weight (5 lbs), and submitted 

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× INTEL(R) XEON(R) PLATINUM 8573C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
