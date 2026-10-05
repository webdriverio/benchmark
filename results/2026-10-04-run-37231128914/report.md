# Benchmark run 2026-10-04-run-37231128914: Online-Mind2Web

Produced by [workflow run #37231128914](https://github.com/webdriverio/benchmark/actions/runs/37231128914) on 2026-10-04 from commit [`fec8ddb`](https://github.com/webdriverio/benchmark/commit/fec8ddb5c6e162951f6cb49fe4ceca98e1cd0f93). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37231128914) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `deepseek-flash-4-1`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 1 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Suite | Online-Mind2Web: A fixed random sample of Online-Mind2Web, an independent benchmark of 300 tasks on live websites, judged by its own WebJudge. |
| Tasks | 50 tasks sampled from Online-Mind2Web (ids in [`tasks/online-mind2web.json`](https://github.com/webdriverio/benchmark/blob/main/tasks/online-mind2web.json)); live websites, so runs are not exactly repeatable |
| Success decided by | WebJudge (`o4-mini`, score threshold 3, [Online-Mind2Web@f0d805e](https://github.com/OSU-NLP-Group/Online-Mind2Web/tree/f0d805ee0e9e0b3ea70911e45e5264b72968f3dc); patched: reasoning models: max_completion_tokens=8192 instead of max_tokens=512, no temperature). Its reasoning per run: `judgments-*.jsonl` |
| Screenshots | after every tool call, taken by the harness over CDP (no agent tokens) |
| Duration | 279 min |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0-dev.64`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0-dev.64) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.175`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.175) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |
| `playwright-cli` | Playwright CLI | [`@playwright/cli`](https://www.npmjs.com/package/@playwright/cli) | [`0.1.22`](https://www.npmjs.com/package/@playwright/cli/v/0.1.22) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 620k | $0.015 | 60% (30/50) | 116 s | 27.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 599k | $0.015 | 52% (26/50) | 95 s | 27 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 344k | $0.013 | 56% (28/50) | 96 s | 22 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.64 | 313k | $0.011 | 56% (28/50) | 127 s | 29.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.175 | 332k | $0.012 | 64% (32/50) | 132 s | 31 |
| `agent-browser`<br>agent-browser@0.38.2 | 735k | $0.018 | 40% (20/50) | 145 s | 38 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 569k | $0.014 | 54% (27/50) | 149 s | 32.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-d71be72a | 0/1 · 62k · 39s | 1/1 · 90k · 21s | 1/1 · 50k · 25s | 0/1 · 91k · 32s | 1/1 · 94k · 48s | 0/1 · 240k · 51s | 0/1 · 108k · 62s |
| om2w-fb7b4f78 | 1/1 · 670k · 278s | 1/1 · 1084k · 255s | 1/1 · 18k · 15s | 1/1 · 48k · 39s | 1/1 · 39k · 28s | 1/1 · 1203k · 289s | 1/1 · 176k · 115s |
| om2w-f389398d | 0/1 · 164k · 35s | 0/1 · 182k · 31s | 0/1 · 173k · 28s | 0/1 · 65k · 31s | 0/1 · 110k · 131s | 0/1 · 225k · 68s | 0/1 · 482k · 71s |
| om2w-9829f308 | 0/1 · 1968k · 177s | 0/1 · 3063k · 515s | 0/1 · 1191k · 386s | 0/1 · 1036k · 399s | 0/1 · 0k · 600s | 0/1 · 3864k · 574s | 1/1 · 3363k · 265s |
| om2w-824eb7bb | 1/1 · 2961k · 403s | 0/1 · 1851k · 238s | 1/1 · 1935k · 227s | 0/1 · 3251k · 368s | 0/1 · 2442k · 421s | 1/1 · 3490k · 269s | 0/1 · 0k · 600s |
| om2w-1b867afe | 1/1 · 1282k · 84s | 1/1 · 717k · 68s | 1/1 · 1128k · 306s | 1/1 · 1434k · 254s | 1/1 · 914k · 208s | 1/1 · 1233k · 131s | 1/1 · 1432k · 392s |
| om2w-c1d6ea6f | 0/1 · 3866k · 308s | 0/1 · 0k · 600s | 1/1 · 1128k · 193s | 0/1 · 1824k · 422s | 1/1 · 820k · 187s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-9d46ccb9 | 0/1 · 2171k · 182s | 0/1 · 1012k · 193s | 1/1 · 697k · 78s | 1/1 · 621k · 168s | 1/1 · 188k · 81s | 1/1 · 1803k · 201s | 0/1 · 168k · 55s |
| om2w-65c4030f | 1/1 · 623k · 85s | 0/1 · 529k · 136s | 1/1 · 278k · 38s | 1/1 · 150k · 48s | 1/1 · 124k · 76s | 0/1 · 361k · 60s | 0/1 · 275k · 91s |
| om2w-11abb668 | 0/1 · 5372k · 348s | 1/1 · 2668k · 411s | 0/1 · 559k · 172s | 1/1 · 490k · 245s | 1/1 · 852k · 154s | 1/1 · 2185k · 337s | 1/1 · 1773k · 410s |
| om2w-a6f0434c | 0/1 · 30k · 18s | 0/1 · 34k · 11s | 1/1 · 49k · 58s | 1/1 · 102k · 30s | 0/1 · 34k · 55s | 0/1 · 86k · 17s | 0/1 · 113k · 70s |
| om2w-442a450e | 1/1 · 896k · 100s | 0/1 · 509k · 60s | 0/1 · 870k · 156s | 1/1 · 1959k · 151s | 1/1 · 480k · 109s | 1/1 · 2349k · 251s | 0/1 · 567k · 55s |
| om2w-a5c87cc1 | 1/1 · 2821k · 256s | 0/1 · 662k · 79s | 0/1 · 879k · 181s | 1/1 · 188k · 50s | 1/1 · 345k · 74s | 0/1 · 2063k · 505s | 1/1 · 3006k · 381s |
| om2w-4c186c6e | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 144k · 133s | 0/1 · 1739k · 245s | 0/1 · 2453k · 356s | 1/1 · 3047k · 529s | 0/1 · 0k · 600s |
| om2w-f00e7acc | 0/1 · 105k · 48s | 1/1 · 236k · 69s | 1/1 · 457k · 94s | 1/1 · 187k · 54s | 1/1 · 171k · 79s | 0/1 · 354k · 95s | 1/1 · 303k · 128s |
| om2w-d392e154 | 1/1 · 1919k · 476s | 1/1 · 1513k · 376s | 1/1 · 272k · 88s | 1/1 · 1658k · 351s | 1/1 · 1201k · 366s | 0/1 · 0k · 600s | 1/1 · 1843k · 426s |
| om2w-29b7372d | 1/1 · 156k · 30s | 1/1 · 184k · 32s | 0/1 · 48k · 54s | 1/1 · 160k · 128s | 1/1 · 118k · 46s | 1/1 · 148k · 107s | 0/1 · 137k · 48s |
| om2w-987bad7c | 0/1 · 1456k · 574s | 0/1 · 0k · 600s | 0/1 · 447k · 202s | 0/1 · 1791k · 336s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-75a1b5dc | 1/1 · 228k · 56s | 0/1 · 264k · 91s | 1/1 · 152k · 31s | 1/1 · 299k · 102s | 0/1 · 155k · 81s | 1/1 · 652k · 112s | 1/1 · 530k · 187s |
| om2w-60cbbbd5 | 1/1 · 287k · 43s | 1/1 · 386k · 63s | 1/1 · 64k · 24s | 1/1 · 106k · 39s | 1/1 · 360k · 133s | 1/1 · 697k · 107s | 1/1 · 389k · 109s |
| om2w-64b76158 | 0/1 · 974k · 119s | 0/1 · 732k · 98s | 0/1 · 468k · 140s | 0/1 · 3178k · 407s | 0/1 · 1661k · 517s | 0/1 · 1155k · 174s | 0/1 · 1592k · 387s |
| om2w-3dca7cbe | 1/1 · 1881k · 236s | 1/1 · 843k · 110s | 1/1 · 313k · 184s | 1/1 · 565k · 123s | 1/1 · 392k · 108s | 1/1 · 916k · 130s | 1/1 · 819k · 196s |
| om2w-59b7b990 | 1/1 · 1943k · 201s | 1/1 · 2077k · 201s | 1/1 · 1157k · 347s | 0/1 · 783k · 70s | 0/1 · 1087k · 139s | 1/1 · 1117k · 209s | 0/1 · 3439k · 408s |
| om2w-515f2e58 | 0/1 · 3302k · 535s | 0/1 · 0k · 600s | 0/1 · 375k · 248s | 0/1 · 2248k · 426s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 755k · 255s |
| om2w-82eb3bfe | 1/1 · 1095k · 218s | 1/1 · 803k · 64s | 1/1 · 148k · 69s | 1/1 · 582k · 127s | 1/1 · 646k · 597s | 0/1 · 856k · 160s | 1/1 · 961k · 84s |
| om2w-c94551d2 | 0/1 · 185k · 239s | 0/1 · 2696k · 481s | 0/1 · 173k · 124s | 0/1 · 2438k · 557s | 0/1 · 1889k · 510s | 0/1 · 3323k · 446s | 0/1 · 443k · 169s |
| om2w-84f806c7 | 1/1 · 1951k · 170s | 0/1 · 1412k · 222s | 1/1 · 249k · 48s | 0/1 · 514k · 117s | 0/1 · 499k · 127s | 0/1 · 595k · 116s | 0/1 · 592k · 200s |
| om2w-690d7b4a | 1/1 · 463k · 40s | 0/1 · 691k · 78s | 1/1 · 109k · 67s | 1/1 · 187k · 47s | 1/1 · 142k · 41s | 1/1 · 769k · 71s | 1/1 · 253k · 63s |
| om2w-ba2a469a | 1/1 · 295k · 47s | 1/1 · 480k · 91s | 1/1 · 405k · 70s | 0/1 · 295k · 34s | 1/1 · 1769k · 316s | 0/1 · 701k · 67s | 1/1 · 636k · 61s |
| om2w-b99c0296 | 1/1 · 807k · 142s | 1/1 · 497k · 47s | 0/1 · 400k · 97s | 0/1 · 578k · 132s | 1/1 · 864k · 235s | 0/1 · 1623k · 177s | 0/1 · 886k · 276s |
| om2w-d1807551 | 1/1 · 618k · 142s | 0/1 · 1248k · 308s | 0/1 · 216k · 41s | 0/1 · 276k · 32s | 1/1 · 391k · 112s | 0/1 · 857k · 194s | 0/1 · 1188k · 186s |
| om2w-47186fac | 0/1 · 1107k · 120s | 0/1 · 772k · 152s | 0/1 · 724k · 167s | 0/1 · 480k · 127s | 1/1 · 1764k · 433s | 0/1 · 1285k · 270s | 0/1 · 1402k · 195s |
| om2w-c39d6c24 | 1/1 · 269k · 51s | 1/1 · 584k · 65s | 1/1 · 219k · 56s | 0/1 · 118k · 25s | 1/1 · 124k · 42s | 0/1 · 572k · 115s | 1/1 · 151k · 40s |
| om2w-56f8890a | 1/1 · 273k · 50s | 1/1 · 96k · 65s | 0/1 · 81k · 52s | 1/1 · 276k · 49s | 1/1 · 478k · 144s | 1/1 · 2462k · 240s | 1/1 · 151k · 95s |
| om2w-070c907d | 1/1 · 198k · 32s | 1/1 · 876k · 182s | 0/1 · 225k · 141s | 1/1 · 327k · 67s | 1/1 · 319k · 132s | 0/1 · 634k · 61s | 1/1 · 706k · 147s |
| om2w-fa9adb81 | 1/1 · 360k · 70s | 1/1 · 484k · 53s | 0/1 · 534k · 94s | 0/1 · 367k · 136s | 0/1 · 369k · 86s | 1/1 · 572k · 80s | 0/1 · 240k · 55s |
| om2w-7680a920 | 1/1 · 374k · 29s | 1/1 · 362k · 40s | 1/1 · 299k · 54s | 1/1 · 206k · 44s | 1/1 · 224k · 91s | 1/1 · 651k · 86s | 1/1 · 562k · 143s |
| om2w-4c572a62 | 1/1 · 296k · 40s | 1/1 · 614k · 50s | 1/1 · 211k · 61s | 1/1 · 51k · 53s | 1/1 · 108k · 60s | 0/1 · 281k · 66s | 1/1 · 438k · 79s |
| om2w-fc53ddd3 | 0/1 · 0k · 600s | 0/1 · 6714k · 521s | 0/1 · 2527k · 507s | 0/1 · 0k · 600s | 0/1 · 2907k · 515s | 0/1 · 0k · 600s | 0/1 · 2875k · 515s |
| om2w-6ebde509 | 1/1 · 393k · 75s | 1/1 · 294k · 59s | 1/1 · 450k · 208s | 0/1 · 231k · 381s | 1/1 · 240k · 96s | 1/1 · 364k · 42s | 1/1 · 590k · 67s |
| om2w-ba01ea55 | 0/1 · 2113k · 113s | 1/1 · 1826k · 221s | 1/1 · 1946k · 222s | 1/1 · 627k · 128s | 0/1 · 1243k · 371s | 1/1 · 1153k · 161s | 1/1 · 1850k · 288s |
| om2w-0a0fa834 | 0/1 · 1876k · 232s | 0/1 · 544k · 43s | 0/1 · 1390k · 289s | 0/1 · 1022k · 269s | 0/1 · 624k · 144s | 0/1 · 312k · 84s | 1/1 · 1145k · 178s |
| om2w-9ed38272 | 1/1 · 926k · 94s | 1/1 · 1317k · 143s | 1/1 · 1528k · 198s | 1/1 · 1012k · 143s | 0/1 · 0k · 600s | 0/1 · 989k · 102s | 1/1 · 944k · 86s |
| om2w-5dec0e66 | 0/1 · 88k · 128s | 0/1 · 3399k · 398s | 0/1 · 1806k · 289s | 0/1 · 195k · 249s | 0/1 · 0k · 600s | 0/1 · 2930k · 538s | 0/1 · 0k · 600s |
| om2w-b6d10e9b | 1/1 · 33k · 20s | 1/1 · 69k · 30s | 1/1 · 37k · 32s | 1/1 · 73k · 55s | 1/1 · 53k · 48s | 1/1 · 222k · 37s | 1/1 · 168k · 39s |
| om2w-7072d094 | 0/1 · 517k · 73s | 1/1 · 484k · 90s | 1/1 · 533k · 59s | 1/1 · 143k · 75s | 1/1 · 270k · 107s | 0/1 · 438k · 86s | 1/1 · 862k · 106s |
| om2w-27fa3ac2 | 1/1 · 912k · 163s | 0/1 · 660k · 105s | 0/1 · 927k · 142s | 1/1 · 254k · 61s | 1/1 · 549k · 130s | 1/1 · 1606k · 115s | 0/1 · 750k · 150s |
| om2w-323bd85e | 1/1 · 218k · 73s | 1/1 · 174k · 51s | 0/1 · 120k · 114s | 1/1 · 290k · 162s | 1/1 · 105k · 112s | 0/1 · 221k · 77s | 1/1 · 696k · 119s |
| om2w-180ed2ec | 0/1 · 2173k · 261s | 0/1 · 2690k · 397s | 1/1 · 278k · 64s | 1/1 · 1212k · 240s | 1/1 · 268k · 140s | 0/1 · 788k · 263s | 1/1 · 571k · 170s |
| om2w-864244b6 | 1/1 · 320k · 40s | 1/1 · 307k · 42s | 1/1 · 80k · 61s | 1/1 · 158k · 40s | 1/1 · 119k · 55s | 0/1 · 1274k · 187s | 1/1 · 239k · 103s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-070c907d #1: WebJudge: failure. The agent correctly searched for “Pediatric Dentist” in 90210 and even found a provider within 5 miles, but it never changed the distance filter from the default “10 miles” to the r
- **agent-browser** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly applied the “port=LAX” filter, set the duration to include 8+ days via durdays=8–31, and sorted by price (fromprice). However, although it opened the cheapest cr
- **agent-browser** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully located the UM-Dearborn giving pathways (Giving tab, “Give Now” button, “Find a Fund and Give Today,” search for “Dearborn”) confirming the way and the correc
- **agent-browser** · om2w-323bd85e #1: WebJudge: failure. The agent correctly navigated to and captured Amtrak’s “Passenger Identification” page outlining that customers 18 and older must present valid photo ID (one government‐issued photo
- **agent-browser** · om2w-47186fac #1: WebJudge: failure. The agent navigated to various pages but never clearly accessed the official “best cars” list page to identify its first car, nor did it extract a concrete ownership cost value. It 
- **agent-browser** · om2w-4c572a62 #1: WebJudge: failure. The agent never progressed beyond opening the Craigslist landing page; it did not click into “apts/housing,” nor apply or confirm filters for 2+ bedrooms, 2+ bathrooms, or a maximum
- **agent-browser** · om2w-515f2e58 #1: timeout after 10 min
- **agent-browser** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The user requested a comparison of two distinct pescatarian diets with a focus on eating healthier. The agent’s action history shows it navigated various Healthline pages (pescatari
- **agent-browser** · om2w-65c4030f #1: WebJudge: failure. The agent searched for “cardiology” in Jacksonville, FL and found a female physician (Demilade A. Adedinsewo, M.B., Ch.B.) and an M.D. cardiologist (Mays T. Ali, M.D.) in Jacksonvil
- **agent-browser** · om2w-7072d094 #1: WebJudge: failure. The agent navigated to the compare interface and selected the first two personal cards (Platinum and Gold) and displayed their annual fee and welcome offer, but it never applied or 
- **agent-browser** · om2w-82eb3bfe #1: WebJudge: failure. The agent only repeatedly opened the CoinMarketCap homepage and never navigated to XRP, never opened a chart, and never selected the yearly timeframe. Key points (open chart, asset 
- **agent-browser** · om2w-84f806c7 #1: WebJudge: failure. The agent did correctly set the location to 10012 and applied the “Birds” filter, and the results are sorted by proximity (nearest first). However, it also applied a 50-mile radius 
- **agent-browser** · om2w-864244b6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-9829f308 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-987bad7c #1: timeout after 10 min
- **agent-browser** · om2w-9ed38272 #1: WebJudge: failure. The agent only navigated to an unrelated website and did not perform any calculations or produce the requested comparison chart between Traditional and Roth IRA using the specified 
- **agent-browser** · om2w-a5c87cc1 #1: WebJudge: failure. The agent successfully navigated to the Maine North, County Cork air quality page and located the “SO₂” section labeled “Over the past hour,” but it never extracted or displayed the
- **agent-browser** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly identified the Tesla stock and opened the Yahoo Finance historical data page scoped to March 17, 2023, but never extracted or reported the closing price from tha
- **agent-browser** · om2w-b99c0296 #1: WebJudge: failure. The agent applied filters for term (Fall 2023) and graduate level, and set start_time=14 and start_time=16, but never applied a “meets_days:Tuesday” filter. Without a Tuesday filter
- **agent-browser** · om2w-ba2a469a #1: WebJudge: failure. The agent conducted searches and even applied a “Beginner” level filter on a general computer science search, but never applied a Python filter or confirmed that any chosen course e
- **agent-browser** · om2w-c1d6ea6f #1: timeout after 10 min
- **agent-browser** · om2w-c39d6c24 #1: WebJudge: failure. The agent opened the Ahri champion page multiple times but never scrolled through or selected the skin list, nor did it retrieve or display the final skin in the list. It did not pe
- **agent-browser** · om2w-c94551d2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-d1807551 #1: WebJudge: failure. The agent ultimately identified Melinda H. Eitzen—who appears on the “Top 50: 2026 Women Texas Super Lawyers” list and whose profile URL indicates she’s based in Dallas—but never ex
- **agent-browser** · om2w-d392e154 #1: timeout after 10 min
- **agent-browser** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s MacBook Air “Tech Specs” page for the current model (no explicit filter mechanism exists beyond selecting the latest model on Apple’s sit
- **agent-browser** · om2w-f00e7acc #1: WebJudge: failure. The agent opened the Boston hourly forecast page and even ran scripts to extract hourly cards (including tomorrow’s forecast), but never accepted the privacy prompt, never displayed
- **agent-browser** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section, satisfying the topic requirement, but it never applied or even displayed any “sort by latest” filter or control. No sor
- **agent-browser** · om2w-fc53ddd3 #1: timeout after 10 min
- **playwright-cli** · om2w-27fa3ac2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-29b7372d #1: WebJudge: failure. The agent correctly navigated to Google Finance, searched for “Microsoft,” selected the MSFT listing, located the News section, and clicked the first News link. However, there is no
- **playwright-cli** · om2w-442a450e #1: WebJudge: failure. The agent correctly located the 401(k) calculator, applied the exact parameters (ages 22–65, 3% return, $8,000 employee and employer contributions) per key points 2–5, but never exe
- **playwright-cli** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “Best Cars” page (implicitly applying the “best” filter by visiting /best-cars/), identified the first car card, and expanded its details. However, it nev
- **playwright-cli** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-cli** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-59b7b990 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-5dec0e66 #1: timeout after 10 min
- **playwright-cli** · om2w-64b76158 #1: WebJudge: failure. The agent navigated extensively across Healthline pages but never identified and compared two distinct pescatarian diet plans nor provided an assessment of which promotes healthier 
- **playwright-cli** · om2w-65c4030f #1: WebJudge: failure. The agent correctly searched for “Cardiologist” in Jacksonville, FL and surfaced female MD cardiologists like Mays T. Ali, M.D., but it never applied or confirmed a gender filter vi
- **playwright-cli** · om2w-824eb7bb #1: timeout after 10 min
- **playwright-cli** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly entered zip 10012, selected “Shelters and rescues,” and ran a nationwide search sorted by proximity (showing “Empty Cages Collective” at 2.4 miles, which does li
- **playwright-cli** · om2w-987bad7c #1: timeout after 10 min
- **playwright-cli** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only opened the UPS homepage and took snapshots but did not input origin, destination, weight, dimensions, nor applied or filtered for the fastest shipping option, nor ret
- **playwright-cli** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Tesla’s historical data page and set the date range to include March 17, 2023, but it never extracted or displayed the actual closing price for that
- **playwright-cli** · om2w-b99c0296 #1: WebJudge: failure. The agent did check “Graduate” level, selected the Computer Science subject, and applied the “Days Offered: Tu” filter, but only clicked a single time‐slot checkbox instead of both 
- **playwright-cli** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-cli** · om2w-c94551d2 #1: WebJudge: failure. The action history only shows page reloads and snapshots with no evidence of setting the location to zip code 94587 with a 25-mile radius, applying an age filter for Young or Adult 
- **playwright-cli** · om2w-d1807551 #1: WebJudge: failure. The agent never applied the required “Divorce” practice-area filter nor the specific “Top 50 Women Texas Super Lawyers” list filter. It only set “Super Lawyers lists only,” Texas, a
- **playwright-cli** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s site, located the MacBook Air page, clicked the “Tech Specs” tab, and toggled between the 13-inch and 15-inch models. However, no actual tec
- **playwright-cli** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section (key point 1) but never applied or activated any “latest” sort or filter control. All snapshots and actions show browsin
- **playwright-cli** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to the user’s homepage and located a reposted track tagged “#Rock,” but it never confirmed that this repost is the #1 song on the Top 50 Rock chart.
- **playwright-cli** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent set “Sail From” to Los Angeles but never applied or confirmed a “cheapest” sort/filter, so Key Point 1 is missing. The duration filter was overwritten: only 14- and 15-day
- **playwright-mcp** · om2w-11abb668 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent clicked through various “Make a Gift” and “Give Now” links but never demonstrated selecting or confirming the UM-Dearborn fund or completing a gift transaction. It did not
- **playwright-mcp** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “best cars” list, identified the first car (Renault 4 E-Tech), drilled into its running-cost page, and attempted to locate “ownership cost” but never extr
- **playwright-mcp** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-mcp** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent only performed a keyword search for “QLED gaming monitor 240hz” but did not apply or confirm any filters for screen size (33–49″), price ($1000–$2000), or explicitly selec
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated various Healthline pages on pescatarian diets and extracted content but never selected or compared two distinct pescatarian diet plans side by side focusing
- **playwright-mcp** · om2w-7072d094 #1: WebJudge: failure. The agent correctly navigated to the “No Foreign Transaction Fee” filter but never selected the first two personal credit cards or generated a side-by-side comparison view. Thus, it
- **playwright-mcp** · om2w-9829f308 #1: WebJudge: failure. The agent did navigate to ESPN’s NBA scoreboard and filtered to the most recent date (Oct 3, 2026) and located the Heat–Raptors game (an NBA game). However, it never clicked a “Reca
- **playwright-mcp** · om2w-987bad7c #1: WebJudge: failure. The agent constructed a correct query URL applying all key filters (2011 BMW 135, used, max price $30,000) but never navigated to any specific vehicle detail page or extracted selle
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent successfully navigated to UPS’s Calculate Time & Cost tool, filled in origin (New York 10001) and destination (Truckee 96162), entered the weight (5 lbs) and dimensions (4
- **playwright-mcp** · om2w-a6f0434c #1: WebJudge: failure. The agent never accessed or displayed the historical data table showing the closing price for March 17, 2023. It only showed the current summary page without clicking “Historical Da
- **playwright-mcp** · om2w-ba01ea55 #1: WebJudge: failure. The agent did set the guest count to 4 and retrieved transit details (52 min via M60-SBS bus) from “The Wallace” to LGA, satisfying key points #3 and #4. However, there is no eviden
- **playwright-mcp** · om2w-c1d6ea6f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-c94551d2 #1: WebJudge: failure. The agent never applied any distance filter (25 miles from 94587), age filter (Young or Adult), or sort order (Oldest Addition). All it did was repeatedly load the Petfinder homepag
- **playwright-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent navigated correctly to Apple’s MacBook Air “Tech Specs” page, but never applied the “latest” filter (i.e. did not select the 15-inch model) and did not actually retrieve o
- **playwright-mcp** · om2w-f00e7acc #1: WebJudge: failure. The agent successfully navigated to AccuWeather’s Boston page and confirmed the “HOURLY” tab is active for the correct location. However, no actual hourly forecast data (times, temp
- **playwright-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section and extracted an article, satisfying “Find climate news.” However, nowhere in the action history or snapshots did the ag
- **playwright-mcp** · om2w-fc53ddd3 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered by departing port (Los Angeles), applied the duration filter for at least 8 days, and sorted results by price (cheapest first). It even identified and n
- **playwright-mcp-tuned** · om2w-180ed2ec #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-27fa3ac2 #1: WebJudge: failure. The agent navigated to the Stanford ExploreCourses search for “CHEM” but never applied or confirmed filters for Winter 2023, Monday afternoons, or graduate‐level (career) courses, a
- **playwright-mcp-tuned** · om2w-442a450e #1: WebJudge: failure. The agent successfully located the 401(k) calculator and populated all required fields (age range 22–65, 3% return, $8,000 employee and employer contributions), but never submitted 
- **playwright-mcp-tuned** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “best cars” page but never applied a sort or clearly identified the first car in that list. It assumed “Renault 4-e-tech” without confirming it is the top
- **playwright-mcp-tuned** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-515f2e58 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-5dec0e66 #1: WebJudge: failure. The agent applied the 240 Hz and \$1 000–\$2 000 filters correctly, and it did select three size buckets (31.5″–33.9″, 34″–39.9″, 40″ or more) that cover up to 49″. However, by incl
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent never identified and selected two distinct pescatarian diet plans, nor did it extract and compare their nutritional or health differences. It visited a general pescatarian
- **playwright-mcp-tuned** · om2w-65c4030f #1: WebJudge: failure. The agent correctly filtered by specialty (Cardiologist) and location (Jacksonville, FL), but never applied a gender=Female or qualification=M.D. filter in the UI. Instead it manual
- **playwright-mcp-tuned** · om2w-690d7b4a #1: WebJudge: failure. The agent only applied the “search titles only” checkbox. There is no evidence that the max‐price was set to $400 (the $ max field remains blank) nor that the “good” condition filte
- **playwright-mcp-tuned** · om2w-75a1b5dc #1: WebJudge: failure. The agent successfully identified a beef sirloin recipe (“Beef Sirloin Tip Roast with Mushrooms”) at step 22, but it never actually opened or navigated to the recipe’s reviews secti
- **playwright-mcp-tuned** · om2w-824eb7bb #1: WebJudge: failure. The agent did apply the women’s black swimsuits collection, filtered for size L, and sorted by lowest price. However, it added two different products (the maternity fitness suit and
- **playwright-mcp-tuned** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly set the location to 10012 and applied the “Birds” filter but never actually switched the distance from 50 miles to Nationwide—the URL remained radius=50 and no n
- **playwright-mcp-tuned** · om2w-9829f308 #1: WebJudge: failure. The agent never applied any “most recent” sort or filter on the NBA scoreboard — it directly loaded a fixed date (Oct 3, 2026) instead of dynamically sorting games by recency. It al
- **playwright-mcp-tuned** · om2w-987bad7c #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to UPS’s quote page, filled in origin New York 10001 and destination Truckee 96162, set residential destination type, and entered weight 5 lbs and dime
- **playwright-mcp-tuned** · om2w-a5c87cc1 #1: WebJudge: failure. The agent successfully navigated to the AccuWeather air quality page for Maine North and clicked “View More” to reveal pollutant details, but it did not extract or display the SO₂ v
- **playwright-mcp-tuned** · om2w-a6f0434c #1: WebJudge: failure. The agent navigated to Yahoo Finance and opened Tesla’s historical data page for the correct date range, but never extracted or displayed the closing price for March 17, 2023. No da
- **playwright-mcp-tuned** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-c94551d2 #1: WebJudge: failure. The agent correctly navigated to the cats-for-adoption page for zip 94587, set the distance filter to 25 miles, and checked both Young and Adult age boxes. However, there is no evid
- **playwright-mcp-tuned** · om2w-d1807551 #1: WebJudge: failure. The agent never applied or confirmed the specific “Top 50 Women Texas Super Lawyers” filter or list; it only navigated to the generic Top Lists page without expanding the “Top 50: W
- **playwright-mcp-tuned** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point 1) but never applied or confirmed a “newest” sort/filter (key point 2). There is no visible filter control or
- **playwright-mcp-tuned** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-070c907d #1: WebJudge: failure. The agent correctly searched for “Pediatric Dentistry” in “90210” and even surfaced Dr. Sepehr Nassiripour whose profile shows “Pediatric Dentistry” at 414 N Camden Dr, Beverly Hill
- **stagehand** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly set the departure port filter (port=lax) and sorted by price (“sort=fromprice”), and it did navigate to the 8-Day Mexican Riviera cruise page and captured the on
- **stagehand** · om2w-11abb668 #1: WebJudge: failure. The agent successfully navigated to the Best Buy store locator and searched for zip code 30010, but never clicked “Filter by services” nor selected “Authorized Apple Service Provide
- **stagehand** · om2w-27fa3ac2 #1: WebJudge: failure. The agent only applied subject=CHEM and term=Winter filters via the UI, then resorted to post‐processing the scraped results (filtering by course number ≥200 and meeting times conta
- **stagehand** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and opened the Microsoft (MSFT) quote page, but never revealed or confirmed the “Top news” section or that the clicked item was in
- **stagehand** · om2w-323bd85e #1: WebJudge: failure. The agent only navigated through various Amtrak and search result pages but never extracted or summarized the specific ID requirements for the user. It did not present the list of a
- **stagehand** · om2w-442a450e #1: WebJudge: failure. The agent successfully navigated to the calculator and set all five required inputs (ages 22–65, 3% return, $8,000 employee and $8,000 employer contributions). However, nowhere in t
- **stagehand** · om2w-47186fac #1: WebJudge: failure. The agent successfully navigated to the “best cars” list and identified the first car (“Renault 4 E-Tech Electric”), but it never extracted or displayed that car’s ownership cost. T
- **stagehand** · om2w-4c186c6e #1: WebJudge: failure. The agent only navigated to the NBA store homepage and scraped links but never searched for a Devin Booker jersey, selected size medium, or added any item to the cart. None of the k
- **stagehand** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-56f8890a #1: WebJudge: failure. The agent correctly navigated to IMDb, searched for “Prometheus,” and reached the “Crazy credits” section URL. However, none of the provided snapshots or output actually display the
- **stagehand** · om2w-5dec0e66 #1: WebJudge: failure. The agent only used the search term “QLED gaming monitor 240Hz” plus price‐band and refresh‐rate filters. It never applied the required 33–49″ size filter or the QLED panel‐type fil
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated various Healthline pages and retrieved content snippets but never actually compared two pescatarian diets or evaluated which is healthier. No summary or com
- **stagehand** · om2w-9829f308 #1: WebJudge: failure. The agent never applied a clear “most recent game” filter on the ESPN site (it hard-coded dates and manually navigated), and it never explicitly selected or clicked a “Recap” link—i
- **stagehand** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied the filters for a used 2011 BMW 135 under $30 000 and navigated to several vehicle detail pages, extracting dealership names and contact info (seller inf
- **stagehand** · om2w-a5c87cc1 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-b99c0296 #1: WebJudge: failure. The agent attempted to apply filters via URL parameters (term: Fall 2023; subject_area: Computer Science; course_level: grad; meets_days; start_times) but the final snapshot shows “
- **stagehand** · om2w-c94551d2 #1: WebJudge: failure. The agent only loaded the Petfinder homepage repeatedly and never set the 25-mile radius, age filters (Young or Adult), or applied the “Oldest Addition” sort. No filter confirmation
- **stagehand** · om2w-d1807551 #1: WebJudge: failure. The agent correctly navigated to SuperLawyers, entered “Divorce” and “Dallas, TX,” and located the statewide “Top 50: 2026 Women Texas Super Lawyers” list showing names like Charla 
- **stagehand** · om2w-f389398d #1: WebJudge: failure. The agent navigated to the climate news section but never applied or confirmed a “latest” filter or sort. There’s no evidence of using a filter function to sort by date, so the requ
- **stagehand** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to a user’s homepage and opened the “Reposts” tab, successfully confirming steps 1 and 2. However, it never identified or verified that the reposted track matche
- **stagehand** · om2w-fc53ddd3 #1: WebJudge: failure. The agent correctly located an open-box Samsung Galaxy S25 Plus in “Excellent” condition and saw the $531.99 clearance price, then opened and navigated the trade-in dialog through b
- **wdio-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly set the departure port to Los Angeles (port=LAX) and sorted results by price (sort=fromprice) to identify the cheapest cruise. It then clicked the first (cheapes
- **wdio-mcp** · om2w-47186fac #1: WebJudge: failure. The agent never explicitly applied a “best” filter beyond navigating to the best-cars page, never clicked the first car in that list, and never clearly extracted the ownership cost 
- **wdio-mcp** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly filtered for Luna County, NM and Homesite (steps 9, 18), applied the “Past 30 days” date filter (step 20), sorted by price per acre low to high (steps 22–23), an
- **wdio-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent only repeatedly navigated to the Best Buy homepage without performing any search or applying filters for screen size (33–49″), QLED technology, gaming, 240 Hz refresh rate
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent browsed various Healthline pages and executed scripts to retrieve article text but never produced or displayed a comparison of two pescatarian diets in terms of eating hea
- **wdio-mcp** · om2w-6ebde509 #1: WebJudge: failure. The agent only navigated repeatedly to the Target homepage and took a screenshot but never accessed the careers section or performed a job search. No filters for Miami, Florida or H
- **wdio-mcp** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly set Location to 10012 and Distance to “Nationwide,” and the results appear sorted by closest (2.4 miles first). However, the “Shelters/rescues with Birds” filter
- **wdio-mcp** · om2w-9829f308 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-987bad7c #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied term=Fall 2023, subject=Computer Science, level=Graduate, and split the start‐time window into 2–4 pm and 4–6 pm. However, the day filter used “TuTh” (or
- **wdio-mcp** · om2w-ba2a469a #1: WebJudge: failure. The agent only relied on keyword search (“computer science python beginner”) without actually applying the Level filter set to “Beginner” or the Core Python filter option—which mean
- **wdio-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only navigated to Google Shopping and searched for “drip coffee maker” but never applied any filters for “on sale,” the $25–$60 price range, or “black” finish, nor did it 
- **wdio-mcp** · om2w-c39d6c24 #1: WebJudge: failure. The agent successfully navigated to Ahri’s page and scrolled through the skin carousel until the right arrow was disabled, revealing that “After Hours Spirit Blossom Springs Ahri” i
- **wdio-mcp** · om2w-c94551d2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-d1807551 #1: WebJudge: failure. The agent navigated to the Top 50 Women Texas Super Lawyers list and then selected Melinda H. Eitzen’s profile. While her profile confirms she is a Dallas-based family law attorney,
- **wdio-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent correctly reached Apple’s MacBook Air Tech Specs page and toggled between 13-inch and 15-inch models, but it never actually displayed or returned the detailed technical sp
- **wdio-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section and identified climate-related articles, satisfying key point 1. However, there is no evidence of applying or confirming
- **wdio-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent correctly browsed the Top 50 Rock chart, identified the top track, retrieved its reposters list, navigated to the reposting user’s homepage, and opened the “Reposts” tab t
- **wdio-mcp** · om2w-fc53ddd3 #1: timeout after 10 min
- **wdio-session** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly applied the “Sail From: Los Angeles, CA” filter and set the duration to 8 days, and then navigated into the first itinerary and extracted the onboard activities.
- **wdio-session** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-515f2e58 #1: timeout after 10 min
- **wdio-session** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly filtered by location (Luna County, NM), owner‐financing, listing date (past 30 days), and sorted by lowest price per acre, then opened the lowest listing to cont
- **wdio-session** · om2w-5dec0e66 #1: timeout after 10 min
- **wdio-session** · om2w-64b76158 #1: WebJudge: failure. The agent never selected and compared two distinct pescatarian diet plans nor assessed which one better supports healthier eating. It only browsed various diet pages without extract
- **wdio-session** · om2w-75a1b5dc #1: WebJudge: failure. The agent only opened the Allrecipes homepage and did not search for a beef sirloin recipe nor open its reviews. Key points—including finding a recipe with beef sirloin and opening 
- **wdio-session** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly navigated to the shelter‐finder, entered ZIP 10012, applied the “Birds” filter, and ran the search. However, the distance filter remained set to “50 miles or les
- **wdio-session** · om2w-9829f308 #1: timeout after 10 min
- **wdio-session** · om2w-987bad7c #1: timeout after 10 min
- **wdio-session** · om2w-9ed38272 #1: timeout after 10 min
- **wdio-session** · om2w-a6f0434c #1: WebJudge: failure. The agent navigated to Tesla’s historical data page and located the date “Mar 17, 2023” and the “Adj Close” header but did not extract or display the actual closing price value for 
- **wdio-session** · om2w-ba01ea55 #1: WebJudge: failure. Although the agent correctly set Manhattan, NY, applied a 4-guest filter, and eventually gathered transit options to LGA (identifying the 42 min M60-SBS route as fastest), it never 
- **wdio-session** · om2w-c94551d2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point 1) but never applied or confirmed a “latest” filter or sort (key point 2). Simply clicking featured articles 
- **wdio-session** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to the Top 50 Rock chart but never identified the top song or confirmed its title. It then browsed arbitrary user pages (“fallinginreverseofficial/joseph” and “n
- **wdio-session** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-cli` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
