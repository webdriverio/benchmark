# Benchmark run 2026-10-04-run-37187811523: Online-Mind2Web

Produced by [workflow run #37187811523](https://github.com/webdriverio/benchmark/actions/runs/37187811523) on 2026-10-04 from commit [`5f0e278`](https://github.com/webdriverio/benchmark/commit/5f0e27860e8c5191e2bae7675c78f016153a211b). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37187811523) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `claude-sonnet-5`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 1 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Suite | Online-Mind2Web: A fixed random sample of Online-Mind2Web, an independent benchmark of 300 tasks on live websites, judged by its own WebJudge. |
| Tasks | 50 tasks sampled from Online-Mind2Web (ids in [`tasks/online-mind2web.json`](https://github.com/webdriverio/benchmark/blob/main/tasks/online-mind2web.json)); live websites, so runs are not exactly repeatable |
| Success decided by | WebJudge (`o4-mini`, score threshold 3, [Online-Mind2Web@f0d805e](https://github.com/OSU-NLP-Group/Online-Mind2Web/tree/f0d805ee0e9e0b3ea70911e45e5264b72968f3dc); patched: reasoning models: max_completion_tokens=8192 instead of max_tokens=512, no temperature). Its reasoning per run: `judgments-*.jsonl` |
| Screenshots | after every tool call, taken by the harness over CDP (no agent tokens) |
| Duration | 197 min |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0-dev.61`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0-dev.61) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.163`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.163) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |
| `playwright-cli` | Playwright CLI | [`@playwright/cli`](https://www.npmjs.com/package/@playwright/cli) | [`0.1.22`](https://www.npmjs.com/package/@playwright/cli/v/0.1.22) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 382k | $0.179 | 38% (19/50) | 59 s | 17.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 358k | $0.149 | 36% (18/50) | 58 s | 17.5 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 487k | $0.233 | 48% (24/50) | 79 s | 21.5 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.61 | 314k | $0.139 | 60% (30/50) | 85 s | 24.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.163 | 354k | $0.155 | 44% (22/50) | 104 s | 21.5 |
| `agent-browser`<br>agent-browser@0.38.2 | 1085k | $0.362 | 50% (25/50) | 85 s | 29.5 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 803k | $0.316 | 50% (25/50) | 80 s | 29 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-fb7b4f78 | 0/1 · 190k · 157s | 0/1 · 186k · 123s | 1/1 · 190k · 34s | 1/1 · 56k · 25s | 1/1 · 100k · 25s | 0/1 · 990k · 410s | 1/1 · 873k · 138s |
| om2w-d71be72a | 0/1 · 108k · 23s | 0/1 · 189k · 20s | 0/1 · 93k · 22s | 1/1 · 144k · 41s | 0/1 · 126k · 31s | 1/1 · 386k · 40s | 1/1 · 150k · 30s |
| om2w-f389398d | 0/1 · 141k · 26s | 0/1 · 111k · 22s | 0/1 · 250k · 29s | 0/1 · 90k · 30s | 0/1 · 185k · 71s | 0/1 · 222k · 26s | 0/1 · 156k · 26s |
| om2w-9829f308 | 0/1 · 1079k · 82s | 0/1 · 752k · 52s | 0/1 · 1123k · 162s | 0/1 · 409k · 85s | 0/1 · 1119k · 128s | 0/1 · 1480k · 114s | 0/1 · 1292k · 87s |
| om2w-c1d6ea6f | 0/1 · 460k · 121s | 0/1 · 739k · 116s | 0/1 · 478k · 127s | 0/1 · 267k · 54s | 0/1 · 266k · 53s | 0/1 · 486k · 49s | 0/1 · 323k · 52s |
| om2w-1b867afe | 1/1 · 852k · 59s | 1/1 · 620k · 50s | 1/1 · 3468k · 250s | 1/1 · 889k · 100s | 1/1 · 626k · 88s | 1/1 · 1621k · 110s | 1/1 · 1146k · 97s |
| om2w-824eb7bb | 0/1 · 418k · 47s | 1/1 · 2368k · 123s | 0/1 · 6572k · 360s | 1/1 · 2404k · 324s | 0/1 · 2314k · 345s | 0/1 · 4288k · 245s | 1/1 · 5200k · 215s |
| om2w-987bad7c | 0/1 · 82k · 32s | 0/1 · 52k · 17s | 0/1 · 6603k · 351s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 5889k · 323s | 0/1 · 946k · 183s |
| om2w-9d46ccb9 | 0/1 · 192k · 59s | 0/1 · 180k · 55s | 0/1 · 1293k · 69s | 0/1 · 1637k · 158s | 1/1 · 353k · 69s | 1/1 · 3240k · 207s | 1/1 · 1778k · 185s |
| om2w-442a450e | 1/1 · 1377k · 89s | 1/1 · 1708k · 115s | 1/1 · 4305k · 270s | 1/1 · 1891k · 183s | 0/1 · 808k · 129s | 1/1 · 1162k · 59s | 1/1 · 2608k · 171s |
| om2w-65c4030f | 0/1 · 71k · 22s | 0/1 · 87k · 36s | 1/1 · 191k · 28s | 1/1 · 269k · 69s | 1/1 · 225k · 84s | 0/1 · 547k · 64s | 1/1 · 977k · 79s |
| om2w-11abb668 | 1/1 · 5175k · 270s | 1/1 · 4087k · 291s | 1/1 · 346k · 50s | 1/1 · 1006k · 305s | 1/1 · 198k · 48s | 1/1 · 3679k · 377s | 1/1 · 3165k · 350s |
| om2w-4c186c6e | 0/1 · 81k · 25s | 0/1 · 108k · 37s | 0/1 · 219k · 114s | 0/1 · 705k · 178s | 0/1 · 3037k · 330s | 0/1 · 1333k · 324s | 0/1 · 3178k · 396s |
| om2w-a6f0434c | 0/1 · 94k · 28s | 1/1 · 199k · 35s | 1/1 · 230k · 95s | 1/1 · 150k · 38s | 1/1 · 224k · 224s | 0/1 · 541k · 86s | 1/1 · 588k · 56s |
| om2w-a5c87cc1 | 0/1 · 102k · 36s | 0/1 · 129k · 56s | 1/1 · 570k · 40s | 1/1 · 744k · 119s | 0/1 · 361k · 80s | 0/1 · 4031k · 230s | 1/1 · 624k · 80s |
| om2w-29b7372d | 0/1 · 79k · 20s | 0/1 · 119k · 17s | 0/1 · 129k · 29s | 1/1 · 112k · 29s | 1/1 · 104k · 28s | 0/1 · 404k · 39s | 0/1 · 182k · 33s |
| om2w-f00e7acc | 0/1 · 91k · 39s | 0/1 · 68k · 26s | 1/1 · 1155k · 131s | 1/1 · 249k · 51s | 1/1 · 337k · 88s | 1/1 · 197k · 43s | 0/1 · 328k · 52s |
| om2w-75a1b5dc | 0/1 · 92k · 47s | 0/1 · 109k · 49s | 1/1 · 777k · 142s | 1/1 · 206k · 50s | 1/1 · 159k · 48s | 1/1 · 773k · 66s | 1/1 · 371k · 66s |
| om2w-d392e154 | 1/1 · 4105k · 425s | 0/1 · 7071k · 532s | 0/1 · 1171k · 149s | 0/1 · 159k · 121s | 0/1 · 3814k · 429s | 0/1 · 4094k · 485s | 0/1 · 6262k · 582s |
| om2w-60cbbbd5 | 1/1 · 296k · 44s | 1/1 · 252k · 38s | 1/1 · 86k · 28s | 1/1 · 295k · 52s | 1/1 · 354k · 81s | 1/1 · 182k · 43s | 1/1 · 1088k · 74s |
| om2w-64b76158 | 0/1 · 422k · 55s | 0/1 · 287k · 56s | 0/1 · 783k · 113s | 0/1 · 276k · 90s | 0/1 · 336k · 91s | 0/1 · 603k · 121s | 0/1 · 295k · 70s |
| om2w-3dca7cbe | 0/1 · 92k · 35s | 0/1 · 78k · 24s | 1/1 · 596k · 107s | 1/1 · 214k · 72s | 1/1 · 313k · 91s | 1/1 · 802k · 75s | 1/1 · 691k · 75s |
| om2w-59b7b990 | 0/1 · 177k · 81s | 0/1 · 110k · 59s | 0/1 · 77k · 56s | 0/1 · 399k · 92s | 0/1 · 66k · 35s | 0/1 · 5635k · 428s | 1/1 · 5048k · 229s |
| om2w-515f2e58 | 0/1 · 4526k · 349s | 0/1 · 2237k · 250s | 1/1 · 495k · 86s | 0/1 · 3865k · 414s | 0/1 · 3782k · 424s | 0/1 · 3519k · 313s | 0/1 · 4180k · 405s |
| om2w-84f806c7 | 0/1 · 104k · 38s | 0/1 · 109k · 119s | 0/1 · 503k · 264s | 1/1 · 548k · 89s | 1/1 · 783k · 136s | 1/1 · 1721k · 105s | 0/1 · 754k · 81s |
| om2w-c94551d2 | 0/1 · 191k · 133s | 0/1 · 147k · 57s | 0/1 · 117k · 151s | 0/1 · 241k · 78s | 0/1 · 258k · 67s | 0/1 · 33k · 313s | 0/1 · 324k · 80s |
| om2w-82eb3bfe | 1/1 · 487k · 59s | 1/1 · 208k · 43s | 1/1 · 75k · 29s | 1/1 · 1175k · 139s | 0/1 · 2849k · 567s | 1/1 · 417k · 53s | 1/1 · 472k · 68s |
| om2w-d1807551 | 0/1 · 458k · 142s | 0/1 · 185k · 99s | 0/1 · 415k · 32s | 1/1 · 301k · 56s | 0/1 · 749k · 108s | 0/1 · 661k · 105s | 0/1 · 790k · 381s |
| om2w-690d7b4a | 1/1 · 660k · 52s | 0/1 · 724k · 59s | 1/1 · 749k · 95s | 1/1 · 328k · 46s | 1/1 · 1141k · 139s | 1/1 · 1126k · 82s | 1/1 · 351k · 56s |
| om2w-ba2a469a | 1/1 · 312k · 35s | 1/1 · 206k · 34s | 1/1 · 289k · 87s | 1/1 · 371k · 53s | 0/1 · 123k · 42s | 1/1 · 1163k · 78s | 0/1 · 687k · 51s |
| om2w-b99c0296 | 1/1 · 1885k · 157s | 0/1 · 2364k · 137s | 0/1 · 973k · 232s | 0/1 · 698k · 109s | 0/1 · 2535k · 377s | 0/1 · 2235k · 162s | 0/1 · 1267k · 153s |
| om2w-47186fac | 0/1 · 338k · 34s | 0/1 · 361k · 57s | 0/1 · 2178k · 185s | 0/1 · 862k · 106s | 1/1 · 418k · 107s | 1/1 · 1045k · 58s | 0/1 · 541k · 38s |
| om2w-c39d6c24 | 1/1 · 116k · 27s | 1/1 · 135k · 24s | 1/1 · 101k · 30s | 1/1 · 256k · 48s | 0/1 · 185k · 66s | 1/1 · 661k · 60s | 1/1 · 222k · 38s |
| om2w-56f8890a | 0/1 · 111k · 54s | 0/1 · 187k · 85s | 1/1 · 167k · 47s | 1/1 · 1794k · 128s | 0/1 · 152k · 40s | 0/1 · 214k · 65s | 1/1 · 254k · 71s |
| om2w-fa9adb81 | 1/1 · 378k · 52s | 0/1 · 455k · 40s | 0/1 · 466k · 61s | 0/1 · 475k · 73s | 0/1 · 837k · 126s | 0/1 · 1218k · 85s | 0/1 · 629k · 74s |
| om2w-070c907d | 0/1 · 1654k · 79s | 0/1 · 1446k · 58s | 0/1 · 26k · 16s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 1375k · 290s | 0/1 · 1422k · 94s |
| om2w-7680a920 | 1/1 · 1291k · 133s | 1/1 · 870k · 71s | 1/1 · 269k · 58s | 1/1 · 176k · 44s | 1/1 · 240k · 108s | 1/1 · 822k · 66s | 1/1 · 1044k · 144s |
| om2w-4c572a62 | 1/1 · 1218k · 105s | 1/1 · 354k · 39s | 1/1 · 244k · 151s | 1/1 · 178k · 38s | 1/1 · 310k · 62s | 1/1 · 992k · 71s | 1/1 · 1065k · 75s |
| om2w-fc53ddd3 | 0/1 · 4047k · 420s | 0/1 · 5402k · 467s | 0/1 · 6598k · 494s | 0/1 · 3037k · 531s | 0/1 · 2648k · 558s | 0/1 · 4058k · 441s | 0/1 · 3260k · 507s |
| om2w-ba01ea55 | 1/1 · 842k · 63s | 0/1 · 1513k · 79s | 1/1 · 692k · 58s | 1/1 · 1068k · 108s | 1/1 · 672k · 94s | 1/1 · 1226k · 80s | 1/1 · 2999k · 151s |
| om2w-0a0fa834 | 0/1 · 1140k · 66s | 0/1 · 1376k · 64s | 1/1 · 1078k · 54s | 0/1 · 1498k · 196s | 0/1 · 1065k · 237s | 1/1 · 1502k · 90s | 0/1 · 816k · 69s |
| om2w-6ebde509 | 1/1 · 1375k · 76s | 1/1 · 901k · 70s | 0/1 · 516k · 65s | 1/1 · 97k · 29s | 1/1 · 536k · 100s | 1/1 · 699k · 63s | 1/1 · 1762k · 172s |
| om2w-9ed38272 | 0/1 · 0k · 600s | 1/1 · 1049k · 81s | 0/1 · 6341k · 258s | 0/1 · 2249k · 245s | 0/1 · 539k · 203s | 1/1 · 2239k · 116s | 1/1 · 1026k · 88s |
| om2w-5dec0e66 | 0/1 · 6097k · 423s | 0/1 · 2045k · 204s | 0/1 · 2134k · 233s | 0/1 · 1189k · 248s | 0/1 · 3565k · 371s | 0/1 · 4108k · 428s | 0/1 · 3476k · 480s |
| om2w-b6d10e9b | 1/1 · 56k · 22s | 1/1 · 74k · 24s | 1/1 · 27k · 19s | 1/1 · 65k · 27s | 1/1 · 73k · 32s | 1/1 · 187k · 37s | 1/1 · 179k · 30s |
| om2w-7072d094 | 1/1 · 853k · 69s | 0/1 · 734k · 77s | 0/1 · 1037k · 72s | 1/1 · 501k · 86s | 0/1 · 291k · 78s | 1/1 · 619k · 63s | 0/1 · 738k · 83s |
| om2w-27fa3ac2 | 0/1 · 1084k · 86s | 1/1 · 2044k · 92s | 0/1 · 6050k · 196s | 0/1 · 255k · 44s | 1/1 · 633k · 165s | 0/1 · 1216k · 86s | 0/1 · 1680k · 83s |
| om2w-323bd85e | 1/1 · 385k · 58s | 1/1 · 774k · 76s | 0/1 · 214k · 52s | 1/1 · 140k · 121s | 1/1 · 449k · 185s | 1/1 · 668k · 69s | 0/1 · 468k · 71s |
| om2w-180ed2ec | 0/1 · 1170k · 312s | 1/1 · 377k · 198s | 1/1 · 327k · 51s | 1/1 · 466k · 76s | 1/1 · 281k · 107s | 0/1 · 1146k · 586s | 0/1 · 516k · 112s |
| om2w-864244b6 | 1/1 · 271k · 32s | 1/1 · 405k · 31s | 1/1 · 299k · 68s | 1/1 · 71k · 28s | 0/1 · 767k · 115s | 1/1 · 713k · 53s | 1/1 · 635k · 64s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-070c907d #1: WebJudge: failure. The agent never entered “pediatric dentistry” into the specialty field, never set the location to zip code 90210, never applied a 5-mile distance filter, and never displayed any sea
- **agent-browser** · om2w-180ed2ec #1: WebJudge: failure. The agent repeatedly navigated UM and UM-Dearborn homepages and clicked various elements but never located or displayed any “Give” or “Donate” page or instructions for gifting to UM
- **agent-browser** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly filtered by subject (CHEM), term (Winter 2022–2023), day (Monday), and time (afternoon), then drilled into the single result (CHEM 300) and viewed its Monday aft
- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and opened the Microsoft (MSFT) stock page, fulfilling steps 1 and 2. However, it never located or displayed the “Top News” sectio
- **agent-browser** · om2w-4c186c6e #1: WebJudge: failure. The agent successfully navigated to the Devin Booker jerseys page and clicked on product elements (@e501 and @e485), but there is no evidence a medium size filter was applied or con
- **agent-browser** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-56f8890a #1: WebJudge: failure. The agent did navigate to the “Crazy Credits” URL for Prometheus (step 14) but never retrieved or displayed the content of that page. The user asked to “Show crazy credits,” which r
- **agent-browser** · om2w-59b7b990 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The agent browsed Healthline, searched for pescatarian diet, opened several articles, and read outlines, but never actually compared two distinct pescatarian diet types or provided 
- **agent-browser** · om2w-65c4030f #1: WebJudge: failure. The agent only filtered by specialty (Cardiology) and location (Jacksonville, FL) but never applied gender (female) or degree (MD) filters, nor displayed any specific results. Key p
- **agent-browser** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-9829f308 #1: WebJudge: failure. The agent never applied a “most recent” filter or navigated the date picker to the latest game. It only opened the Oct 3 preseason Heat–Raptors page and clicked a highlights video, 
- **agent-browser** · om2w-987bad7c #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-a5c87cc1 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Tesla’s historical data page and attempted to set the date range to cover March 17, 2023, but it never displayed or extracted the actual closing pri
- **agent-browser** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly filtered for Graduate level, Computer Science, Fall 2023, and Tuesday offerings, but never applied or confirmed a 2:00 pm–6:00 pm start‐time filter. As a result,
- **agent-browser** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only searched for “drip coffee maker” but never applied filters for items on sale, the $25–60 price range, or black finish. None of the required filters were selected or c
- **agent-browser** · om2w-c94551d2 #1: WebJudge: failure. The agent repeatedly opened the Petfinder homepage and other generic pages but never entered the zip code 94587, set the 25-mile radius, applied the Young/Adult age filters, or sort
- **agent-browser** · om2w-d1807551 #1: WebJudge: failure. The agent successfully filtered by practice area (“Divorce”) and location (“Dallas, TX”) and located Jennifer Hargrave as a Dallas‐based divorce lawyer. However, at no point did any
- **agent-browser** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the “News” section and clicked the “Climate” tab, thus fulfilling the requirement to find climate news. However, there is no evidence that the ag
- **agent-browser** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to a user’s SoundCloud homepage and located a repost of a rock track, satisfying points 1 and 2. However, at no point did the agent display or confi
- **agent-browser** · om2w-fb7b4f78 #1: WebJudge: failure. The agent never navigated to or displayed a page showing an overview of user submissions of releases on Discogs. All snapshots only show the Cloudflare human verification interstiti
- **agent-browser** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-070c907d #1: WebJudge: failure. The agent correctly entered “Pediatric Dentistry” and zip code 90210 and even identified Dr. Nikzad Nafisi at 2.0 miles from 90210, but the distance filter remained at the default 1
- **playwright-cli** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly applied the “Sail From: Los Angeles, CA” filter, set the duration to at least 8 days, and sorted results from low to high cost—matching key points 1–3. However, 
- **playwright-cli** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully located and clicked the “Giving” link on the UM-Dearborn site, then clicked the “Give Now” button to arrive at the general Michigan “Make a Gift” page. Howeve
- **playwright-cli** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to the Winter 2023 chemistry courses, applied the graduate-level filter, and viewed the schedule, but never applied or confirmed filters for “days: 
- **playwright-cli** · om2w-29b7372d #1: WebJudge: failure. The agent successfully opened Google Finance, searched for “Microsoft,” and navigated to the Microsoft stock page. However, although it located the “News” heading, it never clicked 
- **playwright-cli** · om2w-323bd85e #1: WebJudge: failure. The agent successfully navigated to and captured Amtrak’s “Passenger Identification” page, which lists valid photo ID requirements and acceptable forms of identification. However, i
- **playwright-cli** · om2w-47186fac #1: WebJudge: failure. The agent successfully navigated to the “best cars” list, clicked the first car, and located the Ownership section, but it never extracted or provided the actual ownership cost. No 
- **playwright-cli** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-5dec0e66 #1: WebJudge: failure. Although the agent entered “QLED gaming monitor 240hz” and applied filters for refresh rate (240 Hz) and price ($1000–$2000), the size filter is imprecise (it selects 31.5″–33.9″, 3
- **playwright-cli** · om2w-64b76158 #1: WebJudge: failure. The agent only opened general Healthline articles on the pescatarian diet and on dietary comparisons but never identified or compared two distinct pescatarian diet plans nor assesse
- **playwright-cli** · om2w-7072d094 #1: WebJudge: failure. The agent correctly filtered for “No Foreign Transaction Fee” cards and selected the first two personal cards, then opened the side-by-side comparison. However, the comparison snaps
- **playwright-cli** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly entered ZIP code 10012, selected “Shelters and rescues,” chose “Birds,” and executed a search—but never applied or confirmed any “closest” sort/filter setting. T
- **playwright-cli** · om2w-9829f308 #1: WebJudge: failure. The agent never applied a filter or sort to select the most recent NBA game and instead navigated directly to a specific preseason game page. It also did not locate or play a “Recap
- **playwright-cli** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied the filters (used, BMW 135, year 2011, max $30,000) and located the listing, extracting the seller info (“Sawnee Mountain Motors”), but it did not retrie
- **playwright-cli** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied filters for Fall 2023 (term), graduate level, and subject “COMPSCI,” but never selected the “Tu” (Tuesday) day filter or the “2:00 pm–4:00 pm” and “4:00 
- **playwright-cli** · om2w-ba2a469a #1: WebJudge: failure. The agent correctly applied the “Beginner” level filter and found courses that list Python programming skills, but it never applied a topic filter to ensure the course is categorize
- **playwright-cli** · om2w-c1d6ea6f #1: WebJudge: failure. The action history only shows searching for “drip coffee maker” on Google Shopping with snapshots, but there are no clicks or selections for “on sale,” no price range filter set to 
- **playwright-cli** · om2w-c94551d2 #1: WebJudge: failure. The agent navigated to the cats-for-adoption page with the correct location and distance parameters, satisfying availability and location filters, but never applied the age filter (
- **playwright-cli** · om2w-d1807551 #1: WebJudge: failure. The agent never performed any search or applied filters for “Dallas,” “divorce lawyer,” or “Top 50 Women Texas Super Lawyers.” No relevant results were displayed or selected, so the
- **playwright-cli** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-f00e7acc #1: WebJudge: failure. The agent correctly navigated to AccuWeather, selected Boston, and clicked the “Hourly” tab, confirming the URL and a single 6 AM forecast entry. However, the full hourly forecast i
- **playwright-cli** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section, satisfying the “find climate news” step, but never applied or confirmed a “latest” (newest) filter or sort. No visible 
- **playwright-cli** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to and browsed the user’s homepage and identified a reposted rock track. However, it did not verify that this reposted track is the #1 song from the
- **playwright-cli** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-070c907d #1: WebJudge: failure. The agent correctly entered “Pediatric Dentistry,” set the location to 90210, and applied the 5-mile radius filter. However, it never captured or confirmed any provider’s distance o
- **playwright-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly applied the “Sail From Los Angeles, CA” filter, set duration to include only cruises of at least 8 days (durdays=8–31), and sorted results from lowest to highest
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent never actually retrieved or displayed any information about how to give a gift to UM-Dearborn. Although it briefly navigated to https://umdearborn.edu/giving, it immediate
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to Stanford’s ExploreCourses, applied the Winter-2022-2023 term filter and the Graduate career filter, and clicked into individual course schedules for
- **playwright-mcp** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and opened the Microsoft stock page, and located the news section. However, it only took a snapshot and did not click on or displa
- **playwright-mcp** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara homepage multiple times and never selected the “Zara Home” category, entered “Rug” subcategory, or applied the beige color filter. No filters or
- **playwright-mcp** · om2w-47186fac #1: WebJudge: failure. The agent successfully navigated to the “best cars” list and identified the first entry as the Renault 5 E-Tech, but the snapshots provided do not reveal the actual ownership cost; 
- **playwright-mcp** · om2w-4c186c6e #1: WebJudge: failure. The agent only navigated to the NBA shop page and did not search for a Devin Booker jersey, select size Medium, or add any item to the cart. Key steps (filtering by player and size,
- **playwright-mcp** · om2w-515f2e58 #1: WebJudge: failure. The agent applied all filters early on (Samsung, Internal, M.2 2280, New, Price $25–$200) and even clicked “Set,” but then in later navigations it removed the $25–$200 price filter 
- **playwright-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to IMDb and to the Prometheus title page, but never accessed or displayed the “Crazy Credits” section (no navigation to /crazycredits or click on Crazy Credits).
- **playwright-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent only navigated to the LandWatch homepage and New Mexico land-for-sale page. It never applied filters for owner-financing, homesite land, Luna County, listings in the last 
- **playwright-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the screen-size filters (covering 33″–49″), checked the 240 Hz refresh rate, and set the $1 000–$2 000 price range exactly. However, at no point did it e
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to a general pescatarian diet article and a vegetarian vs vegan vs pescatarian comparison page but did not identify or compare two distinct pescatarian diet
- **playwright-mcp** · om2w-65c4030f #1: WebJudge: failure. The agent only navigated to the Mayo Clinic homepage repeatedly without initiating any search or applying filters for specialty (Cardiologist), gender (Female), qualification (MD), 
- **playwright-mcp** · om2w-75a1b5dc #1: WebJudge: failure. The agent only navigated to the Allrecipes homepage multiple times and did not search for a beef sirloin recipe or open any recipe reviews. It never selected a recipe nor displayed 
- **playwright-mcp** · om2w-824eb7bb #1: WebJudge: failure. The agent correctly navigated to a women’s black swimsuit collection, sorted by lowest price, selected size Large, and added the lowest‐priced item to the cart. However, it then add
- **playwright-mcp** · om2w-84f806c7 #1: WebJudge: failure. The agent only navigated to the homepage repeatedly and never applied the required filters or search (zip code 10012, type “animal shelter,” specialization “birds,” sort “closest”).
- **playwright-mcp** · om2w-9829f308 #1: WebJudge: failure. The agent successfully located and played game highlights on an ESPN game page, but never applied or confirmed any filter or selection to ensure this was the “most recent NBA game.”
- **playwright-mcp** · om2w-987bad7c #1: WebJudge: failure. The agent only navigated to the Cars.com homepage multiple times and opened a new tab; it never applied filters for year, model, or price, nor did it search for the 2011 BMW 135 or 
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent never entered the origin, destination, weight, or dimensions, nor applied the “fastest shipping” filter or obtained any quote. Key points 1–5 were not addressed, so the ta
- **playwright-mcp** · om2w-9ed38272 #1: timeout after 10 min
- **playwright-mcp** · om2w-a5c87cc1 #1: WebJudge: failure. The agent never navigated to any air quality details page, did not retrieve SO₂ data, did not specify the past hour timeframe, and did not locate “Maine North, County Cork, Ireland”
- **playwright-mcp** · om2w-a6f0434c #1: WebJudge: failure. The agent navigated to the TSLA historical data page, set the correct date range to include March 17, 2023, located the “Mar 17, 2023” entry, but never retrieved or displayed the cl
- **playwright-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only performed a basic search for "drip coffee maker" without applying any of the required filters for sale items, the $25–$60 price range, or black finish. None of the ke
- **playwright-mcp** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the search results for zip code 94587 but never applied distance, age, or sort filters. There is no evidence of setting “within 25 miles,” selecting Youn
- **playwright-mcp** · om2w-d1807551 #1: WebJudge: failure. The agent only navigated to the SuperLawyers homepage multiple times and attempted to interact with a captcha frame. It never applied any filters for Location (Dallas), Practice Are
- **playwright-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to the official Apple MacBook Air Tech Specs page (source: Apple) and selected the latest model by default (Apple only lists current models). Howeve
- **playwright-mcp** · om2w-f00e7acc #1: WebJudge: failure. The agent navigated to AccuWeather and even reached the Boston forecast page, but never selected or displayed the hourly forecast section for Boston. Key point “Hourly forecast” was
- **playwright-mcp** · om2w-f389398d #1: WebJudge: failure. The agent correctly navigated to the climate news section (key point 1) but did not apply any “latest” filter or date‐sorting control to ensure the news are ordered by recency (key 
- **playwright-mcp** · om2w-fb7b4f78 #1: WebJudge: failure. The agent never opened the specific Discogs page that provides an overview of release submissions. It only navigated to the Discogs homepage repeatedly and briefly visited a generic
- **playwright-mcp** · om2w-fc53ddd3 #1: WebJudge: failure. The agent correctly applied the “Open-Box” filter and found an open-box Samsung Galaxy S25 Plus in excellent condition, satisfying key point 1. However, there is no evidence it actu
- **playwright-mcp-tuned** · om2w-070c907d #1: WebJudge: failure. The agent correctly navigated to Healthgrades, applied the “Pediatric Dentistry” specialty filter, entered zip code 90210, and changed the distance to 5 miles—fulfilling key points 
- **playwright-mcp-tuned** · om2w-0a0fa834 #1: WebJudge: failure. The agent never successfully applied the “at least 8 days” filter (only clicked 8, 14, and 15 days, missing 9–13 days) and did not sort the results by cheapest. The search results s
- **playwright-mcp-tuned** · om2w-29b7372d #1: WebJudge: failure. The agent correctly navigated to Google Finance and the Microsoft stock page and located the “News” section, but it did not click or open the first top news item, so it did not actu
- **playwright-mcp-tuned** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara US homepage multiple times and did not select the “Zara Home” category, did not navigate to “Rug,” nor applied the beige color filter or display
- **playwright-mcp-tuned** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “best cars” list, identified the first car (Renault 4 E-Tech) and located sections for “Ownership cost,” but it never extracted or displayed the actual ow
- **playwright-mcp-tuned** · om2w-4c186c6e #1: WebJudge: failure. The agent only navigated to the NBA homepage multiple times without searching for “Devin Booker jersey,” selecting a medium size, or adding any item to the cart. None of the key poi
- **playwright-mcp-tuned** · om2w-515f2e58 #1: WebJudge: failure. The agent correctly entered the search term and applied the Samsung brand, New condition, Internal filter, and the exact $25–$200 price range. However, it never successfully applied
- **playwright-mcp-tuned** · om2w-56f8890a #1: WebJudge: failure. The agent only navigated to the Prometheus title page (tt1446714) on IMDb but never accessed or displayed the “Crazy Credits” section for the movie. No action to click or view credi
- **playwright-mcp-tuned** · om2w-59b7b990 #1: WebJudge: failure. The agent only navigated to LandWatch and Luna County’s land page but never applied filters for homesite land, owner-financing, or listings from the last 30 days, nor sorted by chea
- **playwright-mcp-tuned** · om2w-5dec0e66 #1: WebJudge: failure. The agent never ends on a page showing all four filters correctly applied. In the final navigation to the QLED gaming monitor page, only the “40″ or More” screen‐size filter is chec
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to general pescatarian diet pages and a comparison between vegetarian, vegan, and pescatarian diets but did not select or compare two distinct pescatarian d
- **playwright-mcp-tuned** · om2w-65c4030f #1: WebJudge: failure. The agent only navigated to the Mayo Clinic homepage and the "Find a Doctor" page but did not apply any filters or conduct a search for specialty (Cardiologist), degree (MD), gender
- **playwright-mcp-tuned** · om2w-690d7b4a #1: WebJudge: failure. The agent successfully entered “iPhone X,” checked “search titles only,” set max price to $400, and even clicked the “good” checkbox, but never confirmed/applied that condition filt
- **playwright-mcp-tuned** · om2w-7072d094 #1: WebJudge: failure. The agent correctly applied the “No Foreign Transaction Fee” filter and selected the first two personal cards (Platinum and Gold) before clicking “Compare.” However, the final compa
- **playwright-mcp-tuned** · om2w-75a1b5dc #1: WebJudge: failure. The agent only navigated to the homepage multiple times and took snapshots; it never searched for “beef sirloin,” never selected a recipe, and never opened its reviews.
- **playwright-mcp-tuned** · om2w-84f806c7 #1: WebJudge: failure. The agent only navigated to the shelters page and did not enter the zip code 10012, select “birds,” or apply a proximity (“nearest”) filter. No filters for species, location, or sor
- **playwright-mcp-tuned** · om2w-9829f308 #1: WebJudge: failure. The agent did navigate to the most recent game by using the scoreboard page (implicitly filtering by the latest date) and found the video section, but it clicked on a specific playe
- **playwright-mcp-tuned** · om2w-987bad7c #1: WebJudge: failure. The agent only navigated to the homepage and never applied any filters or conducted a search for a 2011 BMW 135, used, with a max price of $30,000. No seller info or notes were retr
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated through UPS pages and reached the shipping page but never entered the weight, dimensions, origin, or destination nor requested or filtered for the fastest s
- **playwright-mcp-tuned** · om2w-a5c87cc1 #1: WebJudge: failure. The agent never selected the specific location “Maine North, County Cork, Ireland,” never navigated to an air quality details page, and never applied or displayed the SO2 pollutant 
- **playwright-mcp-tuned** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly navigated to Fall 2023, selected the Computer Science subject and Graduate level, and filtered days to Tuesday. However, it only clicked the 2:00 pm–4:00 pm star
- **playwright-mcp-tuned** · om2w-ba01ea55 #1: WebJudge: failure. The agent correctly navigated to Google Maps, applied the location (Manhattan, NY) and guest‐count (4) filters, and sorted by highest rating. It then retrieved transit directions (5
- **playwright-mcp-tuned** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only searched for “drip coffee maker” and clicked on “Deals” but never applied a $25–$60 price filter or selected the black finish filter. There is no evidence that the pr
- **playwright-mcp-tuned** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the Petfinder home and search pages without applying any location, age, or sort filters. No radius, zip code, age category, or sort by Oldest Addition wa
- **playwright-mcp-tuned** · om2w-d1807551 #1: WebJudge: failure. The agent only navigated to the Super Lawyers homepage multiple times without applying any filters for location (“Dallas”), practice area (“Divorce”), or accolade (“Top 50 Women Tex
- **playwright-mcp-tuned** · om2w-d392e154 #1: WebJudge: failure. The agent successfully selected a Best Buy gift card, chose the $100 denomination, and added it to the cart, but never specified the occasion as “Birthday.” Although a birthday filt
- **playwright-mcp-tuned** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s official MacBook Air Tech Specs page and located an instance of “10-core,” but it did not extract or present the full technical specifica
- **playwright-mcp-tuned** · om2w-f00e7acc #1: WebJudge: failure. The agent navigated to Boston’s daily forecast page but never selected or displayed the hourly forecast. The user’s requirement to check the hourly forecast for Boston was not fulfi
- **playwright-mcp-tuned** · om2w-f389398d #1: WebJudge: failure. The agent successfully located the Climate news section (key point 1) by navigating to the “News / Climate” page. However, there is no evidence that the articles were sorted by date
- **playwright-mcp-tuned** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to the Top 50 Rock chart and then to the user’s homepage but never identified the top rock song nor confirmed that it was reposted on the user’s page. There is n
- **playwright-mcp-tuned** · om2w-fb7b4f78 #1: WebJudge: failure. The agent never navigated to a Discogs page that provides an overview of how to submit releases. It only visited the homepage and a “Submission Guidelines – General Rules” support a
- **playwright-mcp-tuned** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-070c907d #1: WebJudge: failure. The agent only navigated to the dentist directory but did not apply any filters for “pediatric dentistry,” did not enter the zip code “90210,” and did not set a 5-mile distance filt
- **stagehand** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly filtered for Winter 2022–2023, Graduate career, and Chemistry subject, but never applied or confirmed a “Monday afternoon” filter. Instead it manually opened ind
- **stagehand** · om2w-29b7372d #1: WebJudge: failure. The agent correctly navigated to Google Finance and then to the Microsoft stock page, but there is no evidence it actually opened or displayed the content of the first top news item
- **stagehand** · om2w-323bd85e #1: WebJudge: failure. The agent navigated to the appropriate “Passenger Identification” page on Amtrak’s site but never extracted or communicated the specific identification requirements to the user (e.g
- **stagehand** · om2w-47186fac #1: WebJudge: failure. The agent correctly identified the first car in the “Best Cars” list as the Renault 4 E-Tech Electric (step 1) and navigated to its Ownership cost section (step 2). However, no owne
- **stagehand** · om2w-4c186c6e #1: WebJudge: failure. The agent never navigated to a specific Devin Booker jersey product page, never selected size medium, and never added the item to the cart. None of the three key points (find jersey
- **stagehand** · om2w-59b7b990 #1: WebJudge: failure. The agent navigated to the Luna County New Mexico page but never applied the owner‐financing or homesite filters, did not set the “listed in last 30 days” filter, did not sort by lo
- **stagehand** · om2w-5dec0e66 #1: WebJudge: failure. The agent never explicitly applied the QLED panel filter or checked the 240 Hz box (search terms alone don’t guarantee correct filtering), only partially set the price to $1 000–$1 
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to two relevant pescatarian diet pages and extracted text, but never produced a comparison or evaluation of the two diets’ healthiness as required. No summary or
- **stagehand** · om2w-6ebde509 #1: WebJudge: failure. The agent did navigate to Target’s careers page and entered “Human Resources” and “Miami, FL” into the appropriate fields, even selecting the suggested options. However, it never ex
- **stagehand** · om2w-7072d094 #1: WebJudge: failure. The agent correctly applied the “No Foreign Transaction Fee” filter and located the first two personal cards (American Express Platinum Card® and Delta SkyMiles® Gold American Expre
- **stagehand** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly entered zip 10012, selected the “Shelters/Rescues with Birds” filter, and the results are sorted by distance (nearest first). However, the scope requirement “nat
- **stagehand** · om2w-9829f308 #1: WebJudge: failure. The agent correctly navigated to the NBA section and stayed on the most recent game date, and it located and clicked on a “Highlights” video. However, it never found or clicked a di
- **stagehand** · om2w-987bad7c #1: WebJudge: failure. The agent successfully identified the used 2011 BMW 135, applied the exact $30,000 max-price filter (list_price_max=30000) and navigated to a matching listing, thereby meeting key p
- **stagehand** · om2w-9d46ccb9 #1: WebJudge: failure. The agent navigated correctly to the UPS “Calculate Time and Cost” tool, entered origin (New York, 10001), destination (Truckee, 96162), package dimensions (4×4×4 in), and weight (5
- **stagehand** · om2w-9ed38272 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied the Fall 2023 term, Graduate-level, Tuesday, and both 2:00–4:00 pm and 4:00–6:00 pm filters. However, it never properly filtered by the Computer Science 
- **stagehand** · om2w-c1d6ea6f #1: WebJudge: failure. The agent applied “On sale” and “Black” filters but never set the precise $25–60 price range—instead using an “Under $50” filter that excludes $50–60 and includes items below $25. N
- **stagehand** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the Petfinder homepage and reloaded it multiple times without applying any filters (distance, age) or sorting by oldest addition. None of the key points 
- **stagehand** · om2w-d1807551 #1: WebJudge: failure. The agent identified Aubrey M. Connatser, a Dallas-based family law attorney, but did not confirm (1) that she practices divorce specifically nor (2) that she was ever in the “Top 5
- **stagehand** · om2w-d392e154 #1: WebJudge: failure. The agent successfully navigated to Best Buy, found a Best Buy gift card, selected the $100 denomination, and added it to the cart (confirming action, item, and value). However, at 
- **stagehand** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s MacBook Air Tech Specs page (meeting Key Point #2 and #3) but the provided snapshots only show the Tech Specs tab and model selection, no
- **stagehand** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the News section and applied the “Climate” topic filter (step 2), as shown by the “News / Climate” breadcrumb and highlighted Climate page. Howev
- **stagehand** · om2w-fa9adb81 #1: WebJudge: failure. The agent did navigate to the Top 50 Rock chart and selected a user who reposted the #1 Rock song, and then browsed that user’s homepage. However, the agent never clicked the “Repos
- **stagehand** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-070c907d #1: timeout after 10 min
- **wdio-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered for departures from Los Angeles (port=LAX), applied a duration filter for 8+ days (durdays=8–31), and sorted by price to identify the cheapest cruise. I
- **wdio-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly applied all required filters—Winter 2023 term, Graduate-level career, Monday, and afternoon (2 pm–5 pm)—and narrowed the results to CHEM 300. However, after clic
- **wdio-mcp** · om2w-47186fac #1: WebJudge: failure. The agent correctly filtered by “best cars” and selected the first car (Renault 4 E-Tech). However, it did not locate or display an explicit “ownership cost” figure in the page cont
- **wdio-mcp** · om2w-4c186c6e #1: WebJudge: failure. The agent never selected a specific Devin Booker jersey, did not choose size medium, and did not perform an “add to cart” action. None of the key steps (find jersey, select medium, 
- **wdio-mcp** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent never applied any on-site filters for owner-financing, homesite land, New Mexico, Luna County or listings from the last 30 days. No sort by price per acre was applied and 
- **wdio-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the 240 Hz refresh‐rate filter, the two size buckets (34″–39.9″ and 40″ or more) covering the 33–49″ range, and the $1,000–$2,000 price filter. However, 
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent only performed searches and extracted raw text snippets from Healthline but never synthesized or compared two pescatarian diets or provided guidance on eating healthier. N
- **wdio-mcp** · om2w-9829f308 #1: WebJudge: failure. The agent never applied a “Recap” filter or selected a video labelled Recap, nor confirmed playing the most recent game’s recap. Instead it clicked individual highlight clips withou
- **wdio-mcp** · om2w-987bad7c #1: timeout after 10 min
- **wdio-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to the UPS “Calculate Time and Cost” page, entered the origin (New York 10001) and destination (Truckee 96162), input the package dimensions (4×4×4 in)
- **wdio-mcp** · om2w-9ed38272 #1: WebJudge: failure. The agent correctly navigated to the IRA calculator and set all seven input parameters (age 30 to 65, $30 000 starting balance, 0 monthly contributions, 3% return, 13% current tax, 
- **wdio-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent never applied a filter for graduate‐level courses, nor did it filter by day of week (Tuesdays) or the required start time range (2:00–6:00 PM). Although it navigated to a 
- **wdio-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only searched for “drip coffee maker” without applying any filters for sale status, price range ($25–$60), or black finish. No filter selections or confirmations are shown
- **wdio-mcp** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the base site and the generic search URL for cats in zip 94587, but never applied a 25-mile distance filter, age filter (young or adult), or sorted resul
- **wdio-mcp** · om2w-d392e154 #1: WebJudge: failure. The agent successfully selected a Best Buy gift card, chose the $100 denomination, and added it to the cart. However, there is no evidence that the “Birthday” occasion filter or des
- **wdio-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section, satisfying key point 1. However, there is no evidence of any “latest” sort or filter being applied—no date stamps or so
- **wdio-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent did browse the user’s homepage and saw the reposted track, but it never explicitly applied or confirmed a filter to select the highest (#1) song from the Top 50 Rock chart
- **wdio-mcp** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-070c907d #1: timeout after 10 min
- **wdio-session** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered departures from Los Angeles and applied an 8-day+ duration filter, and it sorted results “Low to High” to surface the cheapest qualifying cruise (8-Day 
- **wdio-session** · om2w-442a450e #1: WebJudge: failure. The agent correctly located and used the online 401(k) calculator and set all required inputs (age range 22–65, 3% return, $8,000 employee and $8,000 employer contributions). Howeve
- **wdio-session** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-515f2e58 #1: WebJudge: failure. The agent did enter the correct search terms and applied the $25–$200 price filter and “New” condition, but it never properly enforced the M.2 form factor or the Samsung brand filte
- **wdio-session** · om2w-56f8890a #1: WebJudge: failure. The agent did find the Prometheus title but never navigated to or displayed the “Crazy Credits” section on the movie’s IMDb page. They closed the movie page prematurely and then cli
- **wdio-session** · om2w-59b7b990 #1: WebJudge: failure. The agent only opened the Luna County listings page and did not apply any filters (owner financing, homesite land, last 30 days) nor sort by lowest price per acre, and did not conta
- **wdio-session** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated general Healthline articles about pescatarian diets and related vegetarian comparisons but did not identify or compare two distinct pescatarian diet plans f
- **wdio-session** · om2w-7072d094 #1: WebJudge: failure. The agent correctly applied the “No Foreign Transaction Fee” filter, selected the first two matching cards (Platinum Card and Gold Card), and generated a side-by-side comparison. Ho
- **wdio-session** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-82eb3bfe #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-864244b6 #1: WebJudge: failure. The agent correctly filtered the season to 2023 and navigated to the newest race (Abu Dhabi), and identified the first-place finisher (Max Verstappen). However, at no point did the 
- **wdio-session** · om2w-9829f308 #1: WebJudge: failure. The agent never applied a “most recent” filter in the UI (it hard-coded a date), and it clicked on “Highlights” content (Giannis highlights) rather than finding or playing a “Recap”
- **wdio-session** · om2w-987bad7c #1: timeout after 10 min
- **wdio-session** · om2w-9ed38272 #1: WebJudge: failure. The agent only set the age range and starting balance but never adjusted the annual return, current tax rate, or retirement tax rate sliders to the user’s specified 3%, 13%, and 24%
- **wdio-session** · om2w-a5c87cc1 #1: WebJudge: failure. The agent navigated to AccuWeather, entered the correct location, and reached the Air Quality Index page, but never retrieved or displayed the SO₂ concentration for the past hour. T
- **wdio-session** · om2w-b99c0296 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-ba2a469a #1: WebJudge: failure. The agent performed a keyword search and opened a Python course page, but never applied or confirmed the “Beginner” level filter nor the “Computer Science” topic filter. The selecte
- **wdio-session** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only performed a basic search for “drip coffee maker” on Google Shopping but did not apply the required filters (on sale, price $25–$60, black finish). No filter interacti
- **wdio-session** · om2w-c39d6c24 #1: WebJudge: failure. The agent navigated to Ahri’s skin carousel and clicked the right arrow repeatedly, but the final screenshot still only shows “After Hours Spirit Blossom Springs Ahri” with an activ
- **wdio-session** · om2w-c94551d2 #1: WebJudge: failure. The agent correctly set the location to zip code 94587 with a 25-mile radius by navigating directly to the URL, but it never applied the age filter for “Young” or “Adult,” nor did i
- **wdio-session** · om2w-d1807551 #1: WebJudge: failure. The agent identified Dallas-based divorce lawyers (Erin Bogdanowicz, Melinda H. Eitzen) and viewed the Top 50 Women Texas Super Lawyers list, but never demonstrated that any Dallas-
- **wdio-session** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to apple.com, selected Mac → MacBook Air, and opened the Tech Specs page, but never applied any “latest” sort (not present on this page) nor scrolle
- **wdio-session** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point 1) but never applied or confirmed a “latest” sort/filter (key point 2). No evidence shows the results were ex
- **wdio-session** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated through the Top 50 Rock chart and chart playlist pages but never identified or browsed a user’s homepage showing that the user reposted the top song. Key point 1
- **wdio-session** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-cli` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Every setup ran in the same job, interleaved in one shuffled order.
