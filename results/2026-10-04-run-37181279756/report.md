# Benchmark run 2026-10-04-run-37181279756: Online-Mind2Web

Produced by [workflow run #37181279756](https://github.com/webdriverio/benchmark/actions/runs/37181279756) on 2026-10-04 from commit [`1e6cb2c`](https://github.com/webdriverio/benchmark/commit/1e6cb2cc95cf8fe26ad85205633ad02031d95fd0). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37181279756) (kept 90 days).

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
| Duration | 39 min |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0-dev.60`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0-dev.60) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.172`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.172) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 364k | $0.176 | 30% (3/10) | 81 s | 17.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 262k | $0.106 | 10% (1/10) | 63 s | 18 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 602k | $0.271 | 60% (6/10) | 72 s | 22.5 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.60 | 411k | $0.159 | 20% (2/10) | 98 s | 21 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.172 | 471k | $0.191 | 30% (3/10) | 152 s | 28.5 |
| `agent-browser`<br>agent-browser@0.38.2 | 1092k | $0.351 | 60% (6/10) | 105 s | 38.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser |
|---|--:|--:|--:|--:|--:|--:|
| om2w-ba2a469a | 1/1 · 357k · 44s | 0/1 · 441k · 52s | 1/1 · 705k · 71s | 1/1 · 720k · 110s | 0/1 · 109k · 60s | 0/1 · 486k · 57s |
| om2w-64b76158 | 0/1 · 371k · 71s | 0/1 · 612k · 66s | 0/1 · 708k · 119s | 0/1 · 213k · 85s | 0/1 · 348k · 96s | 0/1 · 499k · 58s |
| om2w-9d46ccb9 | 0/1 · 156k · 52s | 0/1 · 159k · 45s | 1/1 · 593k · 62s | 0/1 · 828k · 151s | 1/1 · 1440k · 280s | 1/1 · 2088k · 156s |
| om2w-3dca7cbe | 0/1 · 103k · 40s | 0/1 · 98k · 47s | 0/1 · 878k · 171s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 727k · 92s |
| om2w-6ebde509 | 1/1 · 1052k · 92s | 1/1 · 654k · 69s | 1/1 · 611k · 72s | 1/1 · 172k · 47s | 0/1 · 437k · 165s | 1/1 · 969k · 81s |
| om2w-56f8890a | 0/1 · 213k · 113s | 0/1 · 145k · 59s | 1/1 · 235k · 42s | 0/1 · 625k · 123s | 1/1 · 610k · 139s | 1/1 · 1700k · 219s |
| om2w-29b7372d | 0/1 · 155k · 24s | 0/1 · 230k · 28s | 1/1 · 114k · 23s | 0/1 · 90k · 28s | 0/1 · 157k · 45s | 0/1 · 183k · 27s |
| om2w-9ed38272 | 1/1 · 1905k · 113s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 2700k · 357s | 0/1 · 747k · 203s | 1/1 · 1889k · 121s |
| om2w-180ed2ec | 0/1 · 576k · 334s | 0/1 · 293k · 187s | 0/1 · 426k · 65s | 0/1 · 174k · 47s | 1/1 · 505k · 144s | 0/1 · 1215k · 424s |
| om2w-27fa3ac2 | 0/1 · 933k · 92s | 0/1 · 991k · 109s | 1/1 · 1135k · 116s | 0/1 · 610k · 85s | 0/1 · 778k · 161s | 1/1 · 1395k · 118s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-180ed2ec #1: WebJudge: failure. The agent navigated both umich.edu and umdearborn.edu but never located or opened an explicit “give a gift” or donation page for UM–Dearborn, nor provided any instructions or comple
- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent successfully accessed Google Finance (step 1) and navigated to the Microsoft stock page (step 2), as shown by the MSFT search results and stock overview. However, none of 
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to Healthline and accessed relevant articles but did not extract or present a comparison of two pescatarian diets for healthier eating. The key point of comparin
- **agent-browser** · om2w-ba2a469a #1: WebJudge: failure. The agent successfully searched “beginner computer science python” and located Python‐focused courses, then selected the University of Michigan’s Python 3 Programming Specialization
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent only navigated to the UMich homepage repeatedly and never located or accessed any “give a gift” or donation information specific to UM-Dearborn. None of the key points (“f
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent did navigate to the Chemistry timeschedule for Winter 2022–23 and even attempted to apply graduate‐level, Monday, and afternoon filters (step 14), but never confirmed or d
- **playwright-mcp** · om2w-29b7372d #1: WebJudge: failure. The agent navigated correctly to Google Finance and directly to the Microsoft stock page, and located the News section text, but did not actually access or retrieve the first top ne
- **playwright-mcp** · om2w-3dca7cbe #1: WebJudge: failure. The agent never navigated into the “Zara Home” section or selected “Rug,” nor did it apply a color filter for beige. No filtered product listing was displayed.
- **playwright-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent correctly navigated to the Prometheus movie page and then to the “crazy credits” URL, but never captured or displayed the crazy credits content. There’s no evidence the cr
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to and extracted content from Healthline articles on the pescatarian diet and related comparisons but never actually compared two distinct pescatarian diet 
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated around UPS webpages and did not enter the shipment details (weight, dimensions, origin, destination) nor request any shipping quote or select the fastest se
- **playwright-mcp-tuned** · om2w-180ed2ec #1: WebJudge: failure. The agent only loaded the main UMich homepage multiple times and took snapshots without locating any “Give a Gift” or donation page specific to UM-Dearborn, nor did it navigate to a
- **playwright-mcp-tuned** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to the Stanford ExploreCourses site, filtered by subject (CHEM), term (Winter), and academic year (2022–2023), and retrieved course listings. Howeve
- **playwright-mcp-tuned** · om2w-29b7372d #1: WebJudge: failure. The agent navigated to Google Finance, located the Microsoft stock page, identified the "News stories" section, and took a screenshot, but did not open or browse the first news item
- **playwright-mcp-tuned** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara homepage repeatedly and opened a new tab but never selected the “Zara Home” → “Rug” category nor applied the color “beige” filter. Key points 1 
- **playwright-mcp-tuned** · om2w-56f8890a #1: WebJudge: failure. The agent never navigated to the “Prometheus” title page or accessed its Crazy Credits section. No credits were displayed or shown. The task is incomplete.
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent retrieved two relevant articles on Healthline but did not perform any comparison between two pescatarian diet approaches or draw conclusions about which is healthier. The 
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated and fetched page HTML but never entered origin, destination, weight, dimensions, nor submitted the form to obtain a quote. No fastest shipping filter or quo
- **playwright-mcp-tuned** · om2w-9ed38272 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-ba2a469a #1: WebJudge: failure. The agent successfully searched, selected, and navigated to a beginner-level computer science course (“Python Basics”) that clearly covers Python programming skills. However, it nev
- **stagehand** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully navigated from the UM main site to the UM-Dearborn site and located the “Giving” menu and “Give Now” call to action, then reached the UM-Dearborn “Ways to Giv
- **stagehand** · om2w-3dca7cbe #1: WebJudge: failure. The snapshots show the Zara Home → Rugs category page and the color filter panel, but there is no clear evidence that the “Beige” filter has been applied (no checkmark on “Beige,” n
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to Healthline, ran searches for “pescatarian diet,” clicked two distinct articles, and retrieved portions of their text. However, it never synthesized or compare
- **stagehand** · om2w-9ed38272 #1: timeout after 10 min
- **wdio-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully navigated from the main UM site to the UM-Dearborn “Ways to Give” page and expanded the “Make a Straightforward Gift Online or by Mail” section, which outline
- **wdio-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to the Stanford ExploreCourses site, set subject to CHEM, and appears to have applied Winter and Graduate filters, but never actually applied the “days
- **wdio-mcp** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and located Microsoft stock, and even took snapshots of the News section. However, it never clicked or displayed the first top new
- **wdio-mcp** · om2w-3dca7cbe #1: timeout after 10 min
- **wdio-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent successfully navigated to the IMDb “Crazy credits” page for Prometheus but only extracted and displayed the first crazy-credits entry rather than the full list of credits.
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent retrieved general information about pescatarian eating but never identified or compared two distinct pescatarian diet plans or highlighted their relative health benefits. 
- **wdio-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly entered origin (New York NY 10001), destination (Truckee CA 96162), package weight (5 lbs) and dimensions (4 × 4 × 4 in) and displayed a rate table including the
- **wdio-mcp** · om2w-9ed38272 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly set the subject (CHEM), term (Winter 2022–2023), and career (Graduate) filters, but never applied or confirmed filters for “days” (Monday) or “time offered” (aft
- **wdio-session** · om2w-29b7372d #1: WebJudge: failure. The agent navigated to Google Finance, searched for Microsoft, and located the News section, but never explicitly selected or confirmed the “Top news” sort option nor clicked to ope
- **wdio-session** · om2w-3dca7cbe #1: timeout after 10 min
- **wdio-session** · om2w-64b76158 #1: WebJudge: failure. The user requested a direct comparison of two pescatarian diets focused on eating healthier, but the agent only navigated to general Healthline articles and did not identify or comp
- **wdio-session** · om2w-6ebde509 #1: WebJudge: failure. The agent never completed the human verification prompt nor entered any search criteria. There is no evidence of setting the location to Miami, Florida or filtering by the Human Res
- **wdio-session** · om2w-9ed38272 #1: WebJudge: failure. The agent correctly entered all inputs (age 30, retire 65, $30 000 start, 3% return, 13% current tax, 24% retirement tax) and generated results, but the final chart includes four ac
- **wdio-session** · om2w-ba2a469a #1: WebJudge: failure. The agent searched for “computer science python” and clicked on a Python‐themed result, but it never applied or confirmed the “Beginner” level filter nor ensured the course was cate

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
