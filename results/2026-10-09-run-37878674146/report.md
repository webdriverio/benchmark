# Benchmark run 2026-10-09-run-37878674146: Online-Mind2Web

Produced by [workflow run #37878674146](https://github.com/webdriverio/benchmark/actions/runs/37878674146) on 2026-10-09 from commit [`40269cf`](https://github.com/webdriverio/benchmark/commit/40269cf6a7081cf52d4b11a0ec8a1db514a84ce0). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37878674146) (kept 90 days).

## Configuration

| | |
|---|---|
| Model | `deepseek-flash-4-1`, thinking disabled |
| Agent harness | Claude Agent SDK 0.3.288 |
| Runs | 1 per task and setup, shuffled with seed 1 |
| Limits | 80 turns, 10 min per run |
| Suite | Online-Mind2Web: A fixed random sample of Online-Mind2Web, an independent benchmark of 300 tasks on live websites, judged by its own WebJudge. |
| Tasks | 90 tasks sampled from Online-Mind2Web (ids in [`tasks/online-mind2web.json`](https://github.com/webdriverio/benchmark/blob/main/tasks/online-mind2web.json)); live websites, so runs are not exactly repeatable |
| Success decided by | WebJudge (`o4-mini`, score threshold 3, [Online-Mind2Web@f0d805e](https://github.com/OSU-NLP-Group/Online-Mind2Web/tree/f0d805ee0e9e0b3ea70911e45e5264b72968f3dc); patched: reasoning models: max_completion_tokens=8192 instead of max_tokens=512, no temperature). Its reasoning per run: `judgments-*.jsonl` |
| Screenshots | after every tool call, taken by the harness over CDP (no agent tokens) |
| Duration | unfinished |

How the tasks, setups and checks work, and what we do to keep the comparison fair: [README](https://github.com/webdriverio/benchmark#keeping-it-fair).

## Tools under test

| Setup | Tool | Package | Version | Status |
|---|---|---|---|---|
| `playwright-mcp` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `playwright-mcp-tuned` | Playwright MCP | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | [`0.0.83`](https://www.npmjs.com/package/@playwright/mcp/v/0.0.83) | ran |
| `stagehand` | Stagehand | [`browserbase/stagehand`](https://github.com/browserbase/stagehand) | [`4.1.0+cd7b230`](https://github.com/browserbase/stagehand/tree/cd7b230778cf92269e4cb90e80d97f5113781c51) | ran |
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.2`](https://www.npmjs.com/package/@wdio/cli/v/10.0.2) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |
| `playwright-cli` | Playwright CLI | [`@playwright/cli`](https://www.npmjs.com/package/@playwright/cli) | [`0.1.22`](https://www.npmjs.com/package/@playwright/cli/v/0.1.22) | ran |

## Results

⚠️ 40 run(s) were not judged and are left out of every number below.

⚠️ 179 of 630 planned run(s) did not run: their job reached its time limit first, or failed.

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 515k | $0.028 | 57% (32/56) | 87 s | 26 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 507k | $0.027 | 56% (36/64) | 116 s | 27.5 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 405k | $0.027 | 67% (35/52) | 103 s | 24.5 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0 | 259k | $0.016 | 67% (44/66) | 100 s | 29 |
| `wdio-session`<br>@wdio/cli@10.0.2 | 229k | $0.014 | 69% (45/65) | 171 s | 26 |
| `agent-browser`<br>agent-browser@0.38.2 | 730k | $0.038 | 57% (37/65) | 132 s | 31 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 742k | $0.034 | 51% (22/43) | 202 s | 39 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-864244b6 | 1/1 · 317k · 31s | 1/1 · 258k · 37s | 1/1 · 98k · 45s | – | – | 1/1 · 484k · 37s | – |
| om2w-bf3b311c | 1/1 · 131k · 30s | 1/1 · 251k · 42s | 1/1 · 382k · 62s | 1/1 · 249k · 58s | 1/1 · 101k · 42s | 1/1 · 778k · 59s | 0/1 · 388k · 42s |
| om2w-330cd04c | 1/1 · 772k · 48s | 1/1 · 502k · 72s | – | 1/1 · 216k · 74s | 1/1 · 275k · 115s | 1/1 · 238k · 71s | 1/1 · 438k · 78s |
| om2w-a5c87cc1 | 1/1 · 1722k · 87s | – | 1/1 · 1030k · 249s | 0/1 · 128k · 43s | 1/1 · 106k · 63s | 1/1 · 859k · 140s | 0/1 · 348k · 89s |
| om2w-180ed2ec | – | 0/1 · 0k · 600s | 1/1 · 381k · 59s | 1/1 · 538k · 171s | 1/1 · 384k · 188s | 1/1 · 1600k · 366s | – |
| om2w-4c572a62 | 1/1 · 828k · 72s | 1/1 · 227k · 42s | 1/1 · 125k · 59s | 1/1 · 112k · 25s | 1/1 · 200k · 64s | 1/1 · 576k · 71s | 1/1 · 236k · 66s |
| om2w-ba2a469a | 0/1 · 162k · 26s | 1/1 · 202k · 62s | 1/1 · 396k · 87s | 1/1 · 664k · 135s | – | 1/1 · 774k · 107s | – |
| om2w-6b2cfae0 | 0/1 · 0k · 600s | 1/1 · 439k · 190s | – | 0/1 · 455k · 258s | 0/1 · 0k · 600s | – | 0/1 · 0k · 600s |
| om2w-b99c0296 | 0/1 · 1341k · 81s | 0/1 · 982k · 85s | 0/1 · 384k · 172s | 1/1 · 451k · 93s | 1/1 · 470k · 115s | 0/1 · 802k · 142s | 0/1 · 1168k · 141s |
| om2w-3ef64f34 | 1/1 · 1056k · 159s | 0/1 · 3078k · 369s | 0/1 · 1742k · 438s | – | 0/1 · 0k · 600s | 0/1 · 2787k · 409s | 0/1 · 1040k · 228s |
| om2w-a11ecdff | 1/1 · 97k · 29s | 1/1 · 161k · 54s | 1/1 · 187k · 68s | 1/1 · 182k · 85s | 1/1 · 292k · 155s | 1/1 · 747k · 85s | 1/1 · 281k · 77s |
| om2w-a8b9edd5 | 1/1 · 586k · 109s | 0/1 · 801k · 166s | 1/1 · 317k · 79s | 1/1 · 218k · 71s | 1/1 · 229k · 172s | 1/1 · 1021k · 163s | 0/1 · 723k · 137s |
| om2w-b9225088 | 1/1 · 447k · 59s | 1/1 · 457k · 57s | 1/1 · 122k · 27s | 1/1 · 515k · 191s | 1/1 · 290k · 88s | 0/1 · 661k · 35s | 1/1 · 362k · 59s |
| om2w-07ec4a12 | 1/1 · 267k · 65s | 1/1 · 417k · 288s | 1/1 · 427k · 53s | – | – | 1/1 · 418k · 122s | – |
| om2w-442a450e | 1/1 · 494k · 61s | – | 1/1 · 778k · 103s | 0/1 · 1090k · 121s | 1/1 · 1145k · 274s | 0/1 · 2442k · 151s | 0/1 · 407k · 57s |
| om2w-b6d10e9b | 1/1 · 54k · 28s | 1/1 · 42k · 38s | 1/1 · 80k · 29s | 0/1 · 77k · 47s | 1/1 · 80k · 235s | 1/1 · 250k · 37s | 1/1 · 122k · 36s |
| om2w-3dca7cbe | – | 1/1 · 1039k · 165s | 1/1 · 557k · 229s | 1/1 · 726k · 195s | 1/1 · 903k · 266s | 1/1 · 802k · 112s | – |
| om2w-c1d6ea6f | 0/1 · 1728k · 442s | 0/1 · 0k · 600s | 1/1 · 942k · 140s | 1/1 · 2927k · 325s | – | 0/1 · 0k · 600s | – |
| om2w-323bd85e | 1/1 · 358k · 87s | 1/1 · 153k · 61s | 0/1 · 222k · 99s | 1/1 · 164k · 332s | 1/1 · 148k · 287s | 0/1 · 540k · 129s | 1/1 · 513k · 81s |
| om2w-d1970c16 | 0/1 · 164k · 40s | 0/1 · 3075k · 362s | 0/1 · 1956k · 305s | – | 0/1 · 2202k · 409s | 1/1 · 3696k · 297s | 1/1 · 2020k · 215s |
| om2w-d9d8b7d8 | 0/1 · 104k · 29s | 1/1 · 103k · 20s | – | 1/1 · 101k · 40s | 0/1 · 55k · 39s | 0/1 · 135k · 25s | – |
| om2w-29b7372d | – | 1/1 · 423k · 79s | – | 1/1 · 175k · 137s | 1/1 · 239k · 74s | 0/1 · 613k · 81s | – |
| om2w-e9f4dfc6 | 0/1 · 46k · 17s | 0/1 · 1270k · 127s | – | 0/1 · 0k · 600s | 0/1 · 755k · 270s | – | – |
| om2w-7680a920 | – | – | – | 1/1 · 286k · 63s | 1/1 · 174k · 98s | 1/1 · 621k · 137s | 1/1 · 742k · 75s |
| om2w-63d6866f | 0/1 · 4577k · 474s | 0/1 · 0k · 600s | 0/1 · 1229k · 372s | – | – | 0/1 · 0k · 600s | – |
| om2w-bb518416 | – | 1/1 · 834k · 116s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 445k · 145s | 1/1 · 1189k · 126s | 1/1 · 646k · 101s |
| om2w-11abb668 | – | – | – | 1/1 · 451k · 129s | – | 0/1 · 2254k · 304s | – |
| om2w-f00e7acc | 0/1 · 88k · 63s | 1/1 · 573k · 158s | 0/1 · 299k · 37s | 1/1 · 114k · 30s | 1/1 · 109k · 36s | – | – |
| om2w-f05e87c5 | – | 0/1 · 740k · 170s | 0/1 · 960k · 204s | – | 0/1 · 503k · 299s | – | 1/1 · 1091k · 179s |
| om2w-c94551d2 | 0/1 · 0k · 600s | – | 1/1 · 570k · 246s | 1/1 · 1194k · 209s | 1/1 · 2624k · 449s | – | 1/1 · 2926k · 469s |
| om2w-5d542a7e | 0/1 · 156k · 113s | 1/1 · 788k · 278s | – | 0/1 · 21k · 18s | 1/1 · 126k · 132s | 1/1 · 374k · 91s | 0/1 · 443k · 442s |
| om2w-6ca20f1d | 0/1 · 91k · 15s | 1/1 · 128k · 32s | 0/1 · 70k · 19s | – | – | 0/1 · 235k · 62s | – |
| om2w-75a1b5dc | – | 0/1 · 120k · 77s | 1/1 · 196k · 42s | 1/1 · 127k · 56s | 1/1 · 208k · 109s | 1/1 · 1108k · 122s | – |
| om2w-48c73f3f | 1/1 · 771k · 198s | 0/1 · 675k · 142s | – | 1/1 · 203k · 63s | 1/1 · 297k · 171s | 0/1 · 730k · 132s | 1/1 · 566k · 113s |
| om2w-c39d6c24 | 1/1 · 300k · 67s | – | 1/1 · 414k · 75s | 1/1 · 121k · 40s | 1/1 · 442k · 189s | 1/1 · 468k · 129s | 1/1 · 193k · 96s |
| om2w-461ab9b0 | 0/1 · 877k · 194s | 1/1 · 568k · 48s | 0/1 · 388k · 68s | 1/1 · 752k · 325s | 1/1 · 1290k · 288s | 1/1 · 918k · 86s | 1/1 · 1102k · 269s |
| om2w-fa9adb81 | 0/1 · 271k · 36s | 0/1 · 513k · 46s | 0/1 · 531k · 70s | 0/1 · 423k · 87s | – | 0/1 · 463k · 65s | – |
| om2w-271b36ef | 1/1 · 1119k · 197s | 1/1 · 1387k · 239s | 1/1 · 107k · 53s | 1/1 · 1208k · 229s | 1/1 · 443k · 193s | 0/1 · 2898k · 475s | – |
| om2w-fb7b4f78 | 1/1 · 481k · 178s | 1/1 · 1099k · 262s | 1/1 · 30k · 21s | 1/1 · 163k · 52s | 1/1 · 42k · 30s | 1/1 · 664k · 159s | 1/1 · 1207k · 332s |
| om2w-c3a33396 | 1/1 · 1572k · 201s | 1/1 · 1580k · 219s | 1/1 · 2208k · 536s | – | 0/1 · 0k · 600s | 0/1 · 2588k · 326s | 0/1 · 0k · 600s |
| om2w-783ce6a3 | 0/1 · 190k · 30s | 0/1 · 181k · 41s | 0/1 · 172k · 48s | 0/1 · 123k · 55s | 1/1 · 96k · 58s | 0/1 · 367k · 48s | – |
| om2w-27fa3ac2 | 0/1 · 761k · 138s | 0/1 · 553k · 76s | – | 0/1 · 1000k · 181s | 1/1 · 415k · 156s | – | 0/1 · 950k · 125s |
| om2w-9f1cba61 | 1/1 · 1727k · 247s | 1/1 · 1160k · 166s | 1/1 · 545k · 170s | – | – | 1/1 · 597k · 136s | – |
| om2w-75146b7b | 1/1 · 975k · 204s | 0/1 · 3115k · 585s | – | 1/1 · 747k · 237s | 0/1 · 0k · 600s | 1/1 · 1364k · 201s | – |
| om2w-987bad7c | – | – | – | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 1821k · 369s | 0/1 · 1016k · 237s |
| om2w-a6f0434c | – | 1/1 · 119k · 42s | – | 1/1 · 29k · 101s | 1/1 · 171k · 418s | 0/1 · 309k · 82s | – |
| om2w-95cad96f | 1/1 · 233k · 36s | 0/1 · 56k · 25s | 1/1 · 200k · 109s | 1/1 · 340k · 338s | 0/1 · 0k · 600s | – | – |
| om2w-4c186c6e | – | – | – | 0/1 · 2434k · 290s | – | 0/1 · 3048k · 255s | – |
| om2w-c801d1c9 | – | 0/1 · 1471k · 216s | 0/1 · 370k · 93s | – | 1/1 · 544k · 163s | – | 1/1 · 472k · 100s |
| om2w-0a0fa834 | 0/1 · 739k · 87s | – | 0/1 · 745k · 116s | 0/1 · 0k · 600s | 1/1 · 414k · 252s | 1/1 · 617k · 129s | 0/1 · 1423k · 151s |
| om2w-8689af4d | 0/1 · 121k · 60s | 1/1 · 512k · 67s | 1/1 · 1496k · 171s | – | – | 0/1 · 353k · 47s | – |
| om2w-f389398d | – | 0/1 · 148k · 33s | – | 0/1 · 85k · 49s | 0/1 · 74k · 152s | 0/1 · 226k · 36s | – |
| om2w-6ebde509 | 0/1 · 2825k · 262s | 1/1 · 280k · 37s | – | 1/1 · 302k · 92s | 1/1 · 440k · 395s | – | – |
| om2w-47e314cc | 0/1 · 5768k · 476s | 0/1 · 4683k · 491s | – | 0/1 · 0k · 602s | 0/1 · 3382k · 438s | 0/1 · 4343k · 472s | – |
| om2w-a172a5d9 | 1/1 · 167k · 23s | 1/1 · 119k · 22s | 1/1 · 451k · 104s | 0/1 · 0k · 602s | 1/1 · 78k · 290s | 1/1 · 491k · 149s | 1/1 · 728k · 285s |
| om2w-1b867afe | – | – | – | 1/1 · 861k · 165s | 1/1 · 145k · 54s | 1/1 · 1817k · 416s | 1/1 · 1668k · 430s |
| om2w-f2097f92 | 1/1 · 707k · 178s | 1/1 · 194k · 112s | 1/1 · 130k · 55s | 1/1 · 212k · 86s | 1/1 · 99k · 117s | – | – |
| om2w-690d7b4a | – | – | – | 1/1 · 150k · 60s | – | 1/1 · 561k · 57s | – |
| om2w-dcd26e66 | – | 1/1 · 2640k · 120s | 1/1 · 1547k · 121s | – | 1/1 · 263k · 198s | – | 0/1 · 1952k · 355s |
| om2w-515f2e58 | 1/1 · 907k · 222s | – | 1/1 · 763k · 136s | 0/1 · 558k · 199s | 1/1 · 290k · 129s | 1/1 · 2169k · 323s | 0/1 · 2036k · 525s |
| om2w-9d46ccb9 | 1/1 · 485k · 104s | 0/1 · 656k · 167s | 1/1 · 433k · 105s | 1/1 · 594k · 99s | 1/1 · 309k · 107s | 1/1 · 1579k · 151s | 0/1 · 0k · 600s |
| om2w-9d09bc94 | 1/1 · 874k · 185s | 0/1 · 1205k · 465s | – | 1/1 · 392k · 107s | 1/1 · 248k · 110s | 1/1 · 1480k · 220s | – |
| om2w-43a1ca25 | 1/1 · 2985k · 437s | 0/1 · 1705k · 137s | 0/1 · 2444k · 384s | – | – | 0/1 · 3026k · 295s | – |
| om2w-d71be72a | – | 1/1 · 107k · 22s | 0/1 · 70k · 17s | 0/1 · 81k · 23s | 1/1 · 125k · 41s | 0/1 · 295k · 43s | – |
| om2w-ba01ea55 | 0/1 · 0k · 600s | 1/1 · 976k · 159s | – | 1/1 · 830k · 126s | 0/1 · 965k · 214s | – | 0/1 · 1812k · 377s |
| om2w-f2be37a9 | – | – | – | 1/1 · 595k · 93s | 0/1 · 0k · 600s | 0/1 · 4454k · 393s | 1/1 · 2999k · 227s |
| om2w-ade4c09a | 0/1 · 65k · 15s | 0/1 · 53k · 18s | 1/1 · 191k · 127s | 1/1 · 129k · 86s | 1/1 · 103k · 95s | 1/1 · 201k · 29s | – |
| om2w-84f806c7 | – | – | – | 1/1 · 329k · 81s | – | 1/1 · 2612k · 154s | – |
| om2w-7072d094 | 1/1 · 825k · 86s | 1/1 · 447k · 55s | 1/1 · 528k · 81s | 1/1 · 269k · 64s | 1/1 · 98k · 39s | 1/1 · 312k · 40s | 1/1 · 722k · 75s |
| om2w-b64f938a | – | 0/1 · 0k · 600s | 1/1 · 2570k · 591s | – | 0/1 · 361k · 126s | 0/1 · 0k · 600s | 0/1 · 2280k · 315s |
| om2w-8103786e | – | – | – | 0/1 · 77k · 50s | – | – | – |
| om2w-56f8890a | – | – | – | 1/1 · 83k · 62s | – | – | – |
| om2w-da8f3823 | 0/1 · 692k · 119s | 0/1 · 792k · 117s | – | – | – | – | – |
| om2w-47186fac | – | – | – | – | 0/1 · 933k · 178s | – | – |
| om2w-a0a18ca6 | – | – | – | – | – | – | 1/1 · 1373k · 370s |
| om2w-92a3d423 | 1/1 · 224k · 50s | 1/1 · 207k · 38s | – | 1/1 · 72k · 72s | 1/1 · 38k · 37s | 1/1 · 309k · 45s | – |
| om2w-47bfe8a7 | 1/1 · 1696k · 389s | 1/1 · 615k · 168s | 1/1 · 750k · 183s | – | – | 1/1 · 2050k · 172s | – |
| om2w-5dec0e66 | 0/1 · 3161k · 479s | 0/1 · 2866k · 499s | – | 0/1 · 1974k · 330s | 1/1 · 658k · 285s | – | 0/1 · 2457k · 397s |
| om2w-64b76158 | – | 0/1 · 4033k · 430s | 0/1 · 0k · 600s | 0/1 · 2478k · 410s | 0/1 · 0k · 600s | 0/1 · 1352k · 233s | 0/1 · 2021k · 495s |
| om2w-1c3b747a | – | – | – | 1/1 · 479k · 81s | 1/1 · 1205k · 414s | 1/1 · 1327k · 187s | 0/1 · 1677k · 202s |
| om2w-82eb3bfe | – | 1/1 · 323k · 45s | – | 1/1 · 418k · 169s | 0/1 · 0k · 600s | 1/1 · 549k · 64s | – |
| om2w-a96fca87 | 1/1 · 776k · 88s | 1/1 · 1573k · 198s | 1/1 · 966k · 193s | 1/1 · 844k · 138s | 0/1 · 108k · 55s | – | – |
| om2w-59b7b990 | – | – | – | 0/1 · 2431k · 469s | – | 0/1 · 1270k · 133s | – |
| om2w-905cb530 | – | 0/1 · 74k · 23s | 1/1 · 900k · 137s | – | 0/1 · 31k · 25s | – | 1/1 · 1577k · 277s |
| om2w-65c4030f | 1/1 · 537k · 80s | – | 1/1 · 147k · 32s | 1/1 · 136k · 50s | 1/1 · 337k · 137s | 1/1 · 332k · 93s | 0/1 · 266k · 38s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-11abb668 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-271b36ef #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance, searched for “Microsoft,” and located the News stories section. However, it never clicked on or displayed the first top news arti
- **agent-browser** · om2w-323bd85e #1: WebJudge: failure. The agent navigated to and captured the Amtrak “Passenger Identification” and related pages, which contain details on required photo ID and acceptable forms of ID. However, it never
- **agent-browser** · om2w-3ef64f34 #1: WebJudge: failure. The agent correctly navigated to YouTube Kids without logging in, verified the parent’s age (1992), selected the “Younger” age group, and turned search off as required. It then brow
- **agent-browser** · om2w-43a1ca25 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-442a450e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-48c73f3f #1: WebJudge: failure. The agent successfully accessed new.mta.info, searched for and located the “Jamaica Bus Depot Expansion Environmental Impact Statement,” and opened the embedded PDF viewer showing V
- **agent-browser** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly applied filters for owner-financing homesites in Luna County, New Mexico, and limited listings to the past 30 days via the specialized URL. However, it never use
- **agent-browser** · om2w-63d6866f #1: timeout after 10 min
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The agent browsed multiple healthline pages on pescatarian diets, meal plans, and comparisons with other diets, but never selected and compared two distinct pescatarian diets side-b
- **agent-browser** · om2w-6ca20f1d #1: WebJudge: failure. The agent navigated to the gov.uk site, searched for “child benefit,” clicked through to the main page and the “Make a claim” page, but there is no evidence it extracted or confirme
- **agent-browser** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College of Medicine and Science site and applied the “Florida” location and “Internship” type filters, confirming 24 results. Howeve
- **agent-browser** · om2w-8689af4d #1: WebJudge: failure. Although the agent located and added a certified refurbished 11-inch iPad Air (M3) Wi-Fi 256GB in blue priced at $669 to the bag, it never used the site’s filter interface to restri
- **agent-browser** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied filters for a used 2011 BMW 135 with a max price of $30,000 and located a listing showing the seller’s name (Sawnee Mountain Motors), location (Cumming, 
- **agent-browser** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Tesla’s historical data page, set the date range to March 17–18, 2023 (via the URL parameters), and retrieved text from the table. However, it never
- **agent-browser** · om2w-b64f938a #1: timeout after 10 min
- **agent-browser** · om2w-b9225088 #1: WebJudge: failure. The agent never visibly applied or confirmed the “California” location filter via the UI—they simply opened a URL containing “/california/” but the filter panel never shows Californ
- **agent-browser** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied all five filters (Fall 2023 term, graduate level, Computer Science subject, Tuesdays, start times 2 pm–4 pm & 4 pm–6 pm) via the filter interface and nar
- **agent-browser** · om2w-c1d6ea6f #1: timeout after 10 min
- **agent-browser** · om2w-c3a33396 #1: WebJudge: failure. The agent correctly applied all required filters—Condition: Certified Pre-Owned, Model Line: 911, Min. Year: 2019, Location: 97007 (+200 mi)—and set sorting to “Price – Low to High.
- **agent-browser** · om2w-d71be72a #1: WebJudge: failure. The agent correctly accessed Apple’s site, navigated to the MacBook Air page, opened the Tech Specs section, and toggled between the 13-inch and 15-inch models. However, it never su
- **agent-browser** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly identified the facebookresearch/sam2 repository and applied the author=NielsRogge and time=All time filters. However, it never sorted the commits in ascending (o
- **agent-browser** · om2w-f2be37a9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-f389398d #1: WebJudge: failure. The agent navigated to the climate news section and opened a specific article but never applied or confirmed a “sort by latest” filter or sorting function. There is no evidence that
- **agent-browser** · om2w-fa9adb81 #1: WebJudge: failure. The agent did browse a user homepage and confirmed there was a repost, but never showed that the reposted track was the #1 song from the Top 50 Rock chart. There is no indication on
- **playwright-cli** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered by departure port (Los Angeles) and applied a duration filter set to exactly 8 days, then sorted results “low to high,” and navigated to the cheapest 8-
- **playwright-cli** · om2w-1c3b747a #1: WebJudge: failure. The agent sorted all competitions by prize but never applied or verified an “Ongoing” status filter. They then jumped to the ARC Prize 2026 page without confirming it was the highes
- **playwright-cli** · om2w-27fa3ac2 #1: WebJudge: failure. The agent never showed a final schedule page where “Winter 2023,” “CHEM,” “day = Monday,” “time = afternoon,” and “career = Graduate” were all actively applied via the filter interf
- **playwright-cli** · om2w-3ef64f34 #1: WebJudge: failure. The agent never successfully accessed any animal learning content on YouTube Kids. After repeated attempts (including entering a birth year), the snapshots only show a browser-updat
- **playwright-cli** · om2w-442a450e #1: WebJudge: failure. The agent navigated to and filled in the 401(k) calculator with age 22–65, 3% return, $8,000 employee and employer contributions. However, there is no action to submit or calculate 
- **playwright-cli** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-5d542a7e #1: WebJudge: failure. The agent retrieved citation data from multiple APIs and pages but never applied a clear filter or displayed the single top‐cited 2022 CVPR main‐conference paper. There is no final 
- **playwright-cli** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-64b76158 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-65c4030f #1: WebJudge: failure. The agent searched for “Cardiology” in Jacksonville, FL but never applied filters for degree (MD) or gender (female). The results snapshot shows only a provider with an M.B., Ch.B. 
- **playwright-cli** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-cli** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied the “Used,” “BMW,” “2011 BMW 135,” and max‐price $30,000 filters as evidenced by the URL and result snapshots, and it successfully retrieved the seller’s
- **playwright-cli** · om2w-9d46ccb9 #1: timeout after 10 min
- **playwright-cli** · om2w-a5c87cc1 #1: WebJudge: failure. The agent successfully navigated to AccuWeather’s air quality panel and retrieved the SO₂ reading (“0 µg/m³, Excellent”), but the data shown is for “Cork, County Cork” rather than t
- **playwright-cli** · om2w-a8b9edd5 #1: WebJudge: failure. The agent correctly navigated to the FedEx rate calculator, entered the origin (Dallas, Texas), destination (New York, New York), and weight (4 lb), and clicked “Get a Price.” Howev
- **playwright-cli** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied all required filters (Fall 2023 term, graduate level, Computer Science subject, Tuesdays, start-time 2–6 PM) via the URL parameters, and even verified “S
- **playwright-cli** · om2w-ba01ea55 #1: WebJudge: failure. The agent successfully searched for hotels in Manhattan and applied a “sort by rating,” then selected “Pestana Park Avenue” (a 4.8★ property) and navigated to its detail page. It al
- **playwright-cli** · om2w-bf3b311c #1: WebJudge: failure. The agent successfully navigated to the Apple Watch comparison page and to the Ultra version’s product page and extracted Ultra details. However, it never actually accessed or extra
- **playwright-cli** · om2w-c3a33396 #1: timeout after 10 min
- **playwright-cli** · om2w-dcd26e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent did navigate to Carnival’s site and set “Sail From” to Los Angeles, CA (key point #1). However, for duration it clicked both “6–9 Days” and “10+ Days,” which either over-i
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent filtered only by subject (CHEM) and term (Winter 2022–2023) but never applied the “career” filter to restrict to graduate‐level courses nor used the “days” filter for Mond
- **playwright-mcp** · om2w-461ab9b0 #1: WebJudge: failure. The agent successfully navigated to the NYSE Rule 605 Reports page and identified a “July 2024” entry among the monthly files. It even tested the likely ZIP URL (N_MC202407.zip) via
- **playwright-mcp** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-5d542a7e #1: WebJudge: failure. The agent did enumerate CVPR 2022 papers on DBLP (step 1) and correctly fetched citation counts via the OpenAlex API sorted by cited_by_count in descending order (steps 12–13). Howe
- **playwright-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the 240 Hz refresh-rate filter, set the price range to \$1,000–\$2,000, and used “QLED” in the search term, but never applied or confirmed the 33″–49″ sc
- **playwright-mcp** · om2w-63d6866f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-mcp** · om2w-6ca20f1d #1: WebJudge: failure. The agent correctly navigated to the Child Benefit overview, the eligibility page, and the how-to-claim page. However, it only captured snapshots of page headings and table of conte
- **playwright-mcp** · om2w-6ebde509 #1: WebJudge: failure. The agent did navigate to Target’s careers page, entered “Human Resources” (and later “Human Resources Expert”) into the search field, set the location to Miami, FL, and executed se
- **playwright-mcp** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College of Medicine and Science site, applied the “Florida” location filter and the “Internship” program type filter, and confirmed 
- **playwright-mcp** · om2w-8689af4d #1: WebJudge: failure. The agent successfully navigated to the refurbished iPad Air page, selected the certified-refurbished 11-inch iPad Air 256 GB in Blue, and added it to the bag, satisfying product, c
- **playwright-mcp** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the AeroAPI page on FlightAware and captured snapshots, but did not extract or display any plan details or compare the available plans as required. Therefore 
- **playwright-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent applied all required filters – Fall 2023 term, Computer Science subject, graduate‐level, Tuesdays, and both 2:00–4:00 pm and 4:00–6:00 pm start times – but never captured 
- **playwright-mcp** · om2w-ba01ea55 #1: timeout after 10 min
- **playwright-mcp** · om2w-ba2a469a #1: WebJudge: failure. The agent never applied any explicit filters (e.g., Level = Beginner, Topic = Computer Science, Skill = Python) and simply relied on a keyword search. The final course it selected (
- **playwright-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The agent never applied the required filters for “on sale,” the $25–$60 price range, or the black finish, nor did it display a list of matching drip coffee makers. It only navigated
- **playwright-mcp** · om2w-c94551d2 #1: timeout after 10 min
- **playwright-mcp** · om2w-d1970c16 #1: WebJudge: failure. The agent confirmed age and location, then used a search query but never applied a price filter for $15–$20 (nor verified the selected wine’s price falls within that range). Because
- **playwright-mcp** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly navigated to the SAM2 repo, applied the author filter for NielsRogge, and viewed a commit from Aug 3, 2024. However, it never scrolled to or confirmed the chrono
- **playwright-mcp** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a filter to isolate the very earliest year; it only filtered to 2020 and then opened a press release from March 2020. It did not identify or open the actual 
- **playwright-mcp** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent only navigated to Healthgrades and searched for pediatricians in zip code 90028 but never applied the specialty filter for Internal Medicine nor the rating filter of at le
- **playwright-mcp** · om2w-f00e7acc #1: WebJudge: failure. The agent navigated to the Boston hourly forecast URL but never captured or displayed the hourly forecast data. The final snapshot is the homepage, not the hourly forecast for Bosto
- **playwright-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to the Top 50 Rock chart but never identified which track was #1. It then directly went to “finebyme_2-mp3” without confirming that this is the top song on the R
- **playwright-mcp-tuned** · om2w-180ed2ec #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-27fa3ac2 #1: WebJudge: failure. The agent never confirmed that the “Monday” and “afternoon” filters were correctly applied—no snapshot shows those checkboxes selected or their text labels. Although it appended fil
- **playwright-mcp-tuned** · om2w-3ef64f34 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-43a1ca25 #1: WebJudge: failure. The agent successfully filtered for neurosurgeons and applied the “Tomorrow” availability filter, but never applied or confirmed an age filter (no age control on the site) nor extra
- **playwright-mcp-tuned** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-48c73f3f #1: WebJudge: failure. The agent conducted multiple searches and navigations but never actually opened or displayed the Final Environmental Impact Statement PDF on new.mta.info. It ended up fetching HTTP 
- **playwright-mcp-tuned** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the 240 Hz refresh-rate filter and set the precise price ranges ($1 000–1 249.99, $1 250–1 499.99, $1 500–1 999.99). However, although it attempted to cl
- **playwright-mcp-tuned** · om2w-63d6866f #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-64b76158 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-75146b7b #1: WebJudge: failure. The user required breed=Boxer, gender=Male, age=Senior, and location=90028. Although the agent navigated to a URL including those parameters, the visible search page still shows Bre
- **playwright-mcp-tuned** · om2w-75a1b5dc #1: WebJudge: failure. The agent correctly selected a beef sirloin recipe by navigating to the recipe page, but it never opened the reviews section for that recipe before returning to the homepage.
- **playwright-mcp-tuned** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly applied the Location=Florida and Program Type=Internship filters on the Mayo Clinic College of Medicine and Science site and confirmed there are 24 results acros
- **playwright-mcp-tuned** · om2w-905cb530 #1: WebJudge: failure. The agent never set the location to zip code 10019 or applied a 10-mile radius filter, nor did it apply the “Blue Medicare Advantage” insurance filter. It only navigated to a genera
- **playwright-mcp-tuned** · om2w-95cad96f #1: WebJudge: failure. The agent correctly navigated to Rotten Tomatoes, accessed the TV section, and applied the “Sort: Most Popular” filter. However, due to an obstructing app promotion popup and privac
- **playwright-mcp-tuned** · om2w-9d09bc94 #1: WebJudge: failure. The agent never applied a visible “Boston” filter in the StubHub UI nor displayed a final list of NHL events in Boston. All location filtering was done via back‐end JSON parsing on 
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to the UPS quote page, entered origin, destination, dimensions, and weight, and reached a results page displaying available services. However, it never
- **playwright-mcp-tuned** · om2w-a8b9edd5 #1: WebJudge: failure. The agent successfully navigated to FedEx’s rate tool, entered the origin (Dallas, TX), destination (New York, NY), and package weight (4 lb), and clicked “Show Rates.” However, non
- **playwright-mcp-tuned** · om2w-ade4c09a #1: WebJudge: failure. The agent successfully navigated to the FlightAware AeroAPI pricing page and extracted raw pricing card and table data, but it did not actually present a comparison of the available
- **playwright-mcp-tuned** · om2w-b64f938a #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-b99c0296 #1: WebJudge: failure. The agent did apply Fall 2023, Graduate level, and Tuesday filters, but it erroneously replaced the “Computer Science” subject filter with the broader “Electrical Engineering and Co
- **playwright-mcp-tuned** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-c801d1c9 #1: WebJudge: failure. The agent correctly identified “Labyrinthine” as the 2023 VR Game of the Year, used the Steam reviews API with review_type=negative and filter=recent, filtered for playtime_at_revie
- **playwright-mcp-tuned** · om2w-d1970c16 #1: WebJudge: failure. The agent did confirm age and location, found a 2020 U.S. Pinot Noir at $15.99, and added five bottles to the cart. However, it never applied the required “dry red” filter or the $1
- **playwright-mcp-tuned** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a filter or navigation to the actual earliest available year (only navigated to year=2020 and opened a March 5, 2020 release). It never located or selected t
- **playwright-mcp-tuned** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly set the location to 90028 and applied the “4 Stars & Up” filter, but never applied a filter to limit results to pediatricians who specialize in Internal Medicine
- **playwright-mcp-tuned** · om2w-f05e87c5 #1: WebJudge: failure. The agent applied batch filters (W22/S22/W23/S23) and used the API to identify companies in France, but never actually applied or confirmed the “Is Hiring” filter (they only tagged 
- **playwright-mcp-tuned** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point 1) but did not apply or confirm any “sort by newest” filter or sort function. There is no evidence of sorting
- **playwright-mcp-tuned** · om2w-fa9adb81 #1: WebJudge: failure. The agent only navigated to a playlist URL (the “Rock” set) rather than the user’s main profile/homepage and never showed an explicit repost badge or confirmation that the top Rock 
- **stagehand** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly selected “Sail From: Los Angeles, CA” and sorted results low-to-high, but the duration filter was applied too broadly (including 6- and 7-day sailings rather tha
- **stagehand** · om2w-323bd85e #1: WebJudge: failure. The agent successfully located and navigated to Amtrak’s “Passenger Identification” and “Tickets, ID, Safety & Security” pages and captured the relevant content detailing when valid
- **stagehand** · om2w-3ef64f34 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly filtered for “Neurosurgeon” and applied the “Tomorrow” availability filter, but never applied or confirmed an age‐over‐50 filter nor identified a specific doctor
- **stagehand** · om2w-461ab9b0 #1: WebJudge: failure. The agent navigated to the Rule 605 page and programmatically fetched several ZIP URLs, but it never displayed or confirmed the actual July 2024 Market Center File link or its conte
- **stagehand** · om2w-63d6866f #1: WebJudge: failure. The agent never applied a “sort by popularity” filter to the list of Hong Kong attractions to identify the top attraction; it simply navigated directly to the Disneyland page. Altho
- **stagehand** · om2w-64b76158 #1: timeout after 10 min
- **stagehand** · om2w-6ca20f1d #1: WebJudge: failure. The agent correctly navigated to the eligibility page and to the how-to-claim page and extracted their main content, covering key points 1 and 3. However, it did not visit or extrac
- **stagehand** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly applied the “Florida” location and “Internship” type filters on the Mayo Clinic College of Medicine and Science site, yielding 24 results across three pages. How
- **stagehand** · om2w-b99c0296 #1: WebJudge: failure. The agent successfully applied filters for Fall 2023, graduate level, Tuesdays, and the 2–6 PM start‐time ranges, but in the final step it used the wrong subject code (EECS 5475 ins
- **stagehand** · om2w-bb518416 #1: timeout after 10 min
- **stagehand** · om2w-c801d1c9 #1: WebJudge: failure. The agent correctly identified “Labyrinthine” as the 2023 VR Game of the Year, navigated to its reviews, applied the negative-review filter and sorted by most recent via the API cal
- **stagehand** · om2w-d1970c16 #1: WebJudge: failure. Although the agent correctly cleared the age/location gate and programmatically identified a 2020 dry-red U.S. wine in the $15–$20 range via the JSON API, it never applied the vinta
- **stagehand** · om2w-d71be72a #1: WebJudge: failure. The agent navigated correctly to Apple’s MacBook Air Tech Specs page and selected the 15-inch model. However, it never surfaced or confirmed the actual technical specifications (pro
- **stagehand** · om2w-f00e7acc #1: WebJudge: failure. The agent navigated to AccuWeather, set the location to Boston, and clicked the “Hourly” tab, but it never displayed any actual hourly forecast data (times or temperatures). The sna
- **stagehand** · om2w-f05e87c5 #1: WebJudge: failure. The agent never combined the “France” filter with the 2022/2023 batch filters in the site’s UI or query parameters—instead it filtered by “Europe” then post-filtered in code. By cri
- **stagehand** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to the Top Rock chart but never explicitly identified or confirmed the #1 track. While it reached the repost list and hovered over a user (DEAN), it did not clic
- **wdio-mcp** · om2w-0a0fa834 #1: timeout after 10 min
- **wdio-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to the chemistry course search and applied filters for Winter 2023 and Monday, and may have attempted time-of-day filters, but never applied or conf
- **wdio-mcp** · om2w-442a450e #1: WebJudge: failure. The agent correctly located and set the slider inputs for age (22–65), rate (3%), and both contributions ($8,000), but never activated the calculator (e.g. clicked “Calculate” or “R
- **wdio-mcp** · om2w-47e314cc #1: timeout after 10 min
- **wdio-mcp** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-515f2e58 #1: WebJudge: failure. The agent only entered “internal M.2 Samsung SSD” in the search bar (implicitly covering internal, M.2, and Samsung) and correctly set the $25–$200 price range and “New” condition f
- **wdio-mcp** · om2w-59b7b990 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-5d542a7e #1: WebJudge: failure. The agent only opened the DBLP site and took a screenshot without identifying any 2022 CVPR publications, retrieving citation counts, sorting them, or selecting the top-cited work. 
- **wdio-mcp** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent never identified or summarized two distinct pescatarian diets nor compared them in terms of eating healthier. It only navigated through various pages and extracted raw tex
- **wdio-mcp** · om2w-6b2cfae0 #1: WebJudge: failure. The agent successfully located Devin Booker’s playoff per-game stats but never applied a “highest” sort/filter on the PPG column nor identified which season had the maximum value. I
- **wdio-mcp** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College of Medicine “Find a program” page, applied the Location = Florida and Program Type = Internship filters, and confirmed there
- **wdio-mcp** · om2w-8103786e #1: WebJudge: failure. The agent only searched for “chest pain” and extracted the general “Causes” list from the Mayo Clinic page. It never applied or filtered for the specific modifiers “sharp” chest pai
- **wdio-mcp** · om2w-987bad7c #1: timeout after 10 min
- **wdio-mcp** · om2w-a172a5d9 #1: timeout after 10 min
- **wdio-mcp** · om2w-a5c87cc1 #1: WebJudge: failure. The agent never selected the specific “Maine North” location in County Cork and instead used the generic Cork, County Cork page. The SO₂ value shown (0 µg/m³) is only a current read
- **wdio-mcp** · om2w-b6d10e9b #1: WebJudge: failure. The agent successfully navigated to Fox Sports, selected the MLS “STANDINGS” tab, and even captured the standings table via script and screenshot. However, it never displayed or sub
- **wdio-mcp** · om2w-bb518416 #1: timeout after 10 min
- **wdio-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent navigated correctly to Apple’s official MacBook Air Tech Specs page and extracted page content via scripts, confirming the source, product, and technical specs section. Ho
- **wdio-mcp** · om2w-e9f4dfc6 #1: timeout after 10 min
- **wdio-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section but never applied or confirmed a “latest” sort filter. There’s no evidence of a filter toggle or selection for “latest,”
- **wdio-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to the user’s homepage and located a reposted track, satisfying steps 1 and 2. However, there is no evidence that the reposted track was confirmed a
- **wdio-session** · om2w-3ef64f34 #1: timeout after 10 min
- **wdio-session** · om2w-47186fac #1: WebJudge: failure. The agent successfully located the “best cars” list (navigating to /best-cars/top-buys/) and implicitly used the site’s pre-sorted “best” order, thus selecting the first car. Howeve
- **wdio-session** · om2w-47e314cc #1: WebJudge: failure. The agent did apply the “Sort By: Price (ascending)” filter (steps 13–16), but there is no evidence it extracted or reported which permit—and therefore which park—was cheapest. Alth
- **wdio-session** · om2w-64b76158 #1: timeout after 10 min
- **wdio-session** · om2w-6b2cfae0 #1: timeout after 10 min
- **wdio-session** · om2w-75146b7b #1: timeout after 10 min
- **wdio-session** · om2w-82eb3bfe #1: timeout after 10 min
- **wdio-session** · om2w-905cb530 #1: WebJudge: failure. The agent opened the Healthgrades site and navigated around but never entered the zip code 10019, set a 10-mile radius, or applied the “Blue Medicare Advantage” insurance filter. No
- **wdio-session** · om2w-95cad96f #1: timeout after 10 min
- **wdio-session** · om2w-987bad7c #1: timeout after 10 min
- **wdio-session** · om2w-a96fca87 #1: WebJudge: failure. The agent successfully navigated to the Business plan page and set the number of users to 100 and storage quota to 1 PB, as shown by the sliders. However, although it typed “50 TB” 
- **wdio-session** · om2w-b64f938a #1: WebJudge: failure. The agent correctly searched for “frozen vegetarian cheese pizza,” applied the Vegetarian and Cheese Pizzas filters, and added a $9.99 Yough! Mozzarella Cheese Frozen Pizza to the c
- **wdio-session** · om2w-ba01ea55 #1: WebJudge: failure. The agent did open Google Maps, set the guest filter to 4 and sorted by rating, but it never confirmed the true top-rated (non-sponsored) hotel among the 4-guest results. Instead it
- **wdio-session** · om2w-c3a33396 #1: timeout after 10 min
- **wdio-session** · om2w-d1970c16 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly identified the official facebookresearch/sam2 repo and applied the author filter for NielsRogge. However, it never navigated through the full commit history (e.g
- **wdio-session** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly entered “Pediatrician” and “90028,” applied a 4-star-and-up rating filter, and browsed results near the 90028 area. However, nowhere in the snapshots or the fina
- **wdio-session** · om2w-f05e87c5 #1: WebJudge: failure. The agent applied the “Is Hiring” and batch filters via URL parameters and scraped company cards, then used a regex to pick out France-based firms instead of using the built-in loca
- **wdio-session** · om2w-f2be37a9 #1: timeout after 10 min
- **wdio-session** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the News section and clicked the “Climate” sub-tab to locate climate news (Key Point 1). However, at no point did it apply or confirm a “latest” 

## Environment

| Job | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `shard 01` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 02` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 03` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V45 96-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 04` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 05` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 07` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 08` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 09` | Linux 6.17.0-1022-azure (x64) | 4× INTEL(R) XEON(R) PLATINUM 8573C | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 10` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |

The tasks were split into 9 shards, one job and runner each. Every setup ran every task of a shard in that shard's job, interleaved in one shuffled order, so the setups on one task shared an IP address and a time window.
