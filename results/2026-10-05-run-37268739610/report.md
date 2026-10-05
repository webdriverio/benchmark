# Benchmark run 2026-10-05-run-37268739610: Online-Mind2Web

Produced by [workflow run #37268739610](https://github.com/webdriverio/benchmark/actions/runs/37268739610) on 2026-10-05 from commit [`69c22cf`](https://github.com/webdriverio/benchmark/commit/69c22cf0bc492d996a6bd031cfbd17906467264a). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37268739610) (kept 90 days).

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
| Duration | 326 min |

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
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 479k | $0.030 | 46% (23/50) | 155 s | 28 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 546k | $0.032 | 52% (26/50) | 116 s | 25 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 336k | $0.023 | 64% (32/50) | 108 s | 25 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.64 | 292k | $0.019 | 56% (28/50) | 128 s | 27.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.175 | 165k | $0.013 | 50% (25/50) | 158 s | 28 |
| `agent-browser`<br>agent-browser@0.38.2 | 816k | $0.036 | 42% (21/50) | 187 s | 41.5 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 620k | $0.031 | 60% (30/50) | 173 s | 38.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-bf3b311c | 1/1 · 213k · 34s | 1/1 · 128k · 27s | 1/1 · 396k · 54s | 1/1 · 296k · 114s | 1/1 · 415k · 120s | 1/1 · 662k · 99s | 1/1 · 166k · 54s |
| om2w-905cb530 | 1/1 · 2681k · 259s | 1/1 · 1098k · 100s | 1/1 · 383k · 153s | 0/1 · 0k · 600s | 1/1 · 574k · 179s | 1/1 · 1023k · 166s | 1/1 · 2161k · 371s |
| om2w-bb314cb8 | 0/1 · 808k · 281s | 1/1 · 913k · 315s | 0/1 · 265k · 31s | 1/1 · 366k · 136s | 0/1 · 254k · 132s | 0/1 · 0k · 600s | 0/1 · 408k · 182s |
| om2w-3443e9c3 | 0/1 · 322k · 58s | 1/1 · 209k · 46s | 1/1 · 229k · 35s | 1/1 · 184k · 50s | 1/1 · 189k · 73s | 1/1 · 473k · 106s | 1/1 · 252k · 52s |
| om2w-a96fca87 | 1/1 · 2632k · 244s | 0/1 · 776k · 57s | 1/1 · 1037k · 321s | 1/1 · 1125k · 238s | 1/1 · 151k · 53s | 1/1 · 877k · 123s | 0/1 · 292k · 97s |
| om2w-aa4b5cb7 | 1/1 · 198k · 129s | 0/1 · 731k · 65s | 0/1 · 289k · 44s | 1/1 · 275k · 77s | 1/1 · 240k · 119s | 0/1 · 648k · 123s | 1/1 · 190k · 63s |
| om2w-47e314cc | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 3482k · 522s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-a172a5d9 | 1/1 · 191k · 51s | 1/1 · 154k · 45s | 0/1 · 97k · 27s | 1/1 · 472k · 60s | 1/1 · 130k · 165s | 0/1 · 0k · 600s | 1/1 · 1317k · 371s |
| om2w-c801d1c9 | 1/1 · 774k · 162s | 1/1 · 1548k · 124s | 1/1 · 1723k · 220s | 1/1 · 1120k · 206s | 1/1 · 1090k · 489s | 0/1 · 715k · 176s | 1/1 · 2094k · 311s |
| om2w-9f1cba61 | 1/1 · 295k · 49s | 1/1 · 547k · 135s | 1/1 · 2027k · 248s | 0/1 · 499k · 242s | 0/1 · 0k · 600s | 1/1 · 826k · 187s | 1/1 · 900k · 140s |
| om2w-ade4c09a | 0/1 · 74k · 29s | 1/1 · 51k · 14s | 0/1 · 201k · 34s | 0/1 · 105k · 22s | 0/1 · 325k · 150s | 0/1 · 140k · 29s | 0/1 · 135k · 43s |
| om2w-43a1ca25 | 0/1 · 4498k · 270s | 0/1 · 3399k · 234s | 1/1 · 1140k · 278s | 0/1 · 313k · 105s | 0/1 · 0k · 600s | 0/1 · 4345k · 414s | 0/1 · 2181k · 391s |
| om2w-a8b9edd5 | 1/1 · 806k · 131s | 1/1 · 521k · 123s | 1/1 · 587k · 86s | 1/1 · 413k · 78s | 1/1 · 340k · 69s | 1/1 · 1041k · 88s | 1/1 · 592k · 187s |
| om2w-52efbab5 | 1/1 · 63k · 55s | 1/1 · 38k · 20s | 1/1 · 62k · 15s | 1/1 · 135k · 39s | 1/1 · 65k · 47s | 1/1 · 141k · 29s | 1/1 · 81k · 30s |
| om2w-b64f938a | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 3276k · 326s | 0/1 · 1957k · 365s | 0/1 · 1607k · 459s | 0/1 · 2588k · 346s | 0/1 · 2614k · 425s |
| om2w-e9f4dfc6 | 0/1 · 0k · 600s | 0/1 · 2313k · 378s | 0/1 · 2710k · 465s | 0/1 · 0k · 600s | 0/1 · 43k · 15s | 1/1 · 2357k · 390s | 0/1 · 2247k · 474s |
| om2w-7b182a50 | 1/1 · 759k · 107s | 0/1 · 0k · 600s | 1/1 · 47k · 74s | 1/1 · 229k · 38s | 1/1 · 157k · 70s | 1/1 · 273k · 91s | 1/1 · 603k · 80s |
| om2w-f2097f92 | 1/1 · 488k · 157s | 1/1 · 545k · 146s | 1/1 · 201k · 51s | 1/1 · 143k · 133s | 1/1 · 157k · 58s | 1/1 · 432k · 292s | 1/1 · 970k · 368s |
| om2w-c3a33396 | 0/1 · 0k · 600s | 1/1 · 1384k · 231s | 0/1 · 2559k · 523s | 0/1 · 2023k · 375s | 0/1 · 0k · 600s | 1/1 · 2950k · 413s | 1/1 · 1118k · 207s |
| om2w-63d6866f | 0/1 · 2513k · 298s | 0/1 · 1261k · 159s | 1/1 · 767k · 121s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 2941k · 254s | 0/1 · 0k · 600s |
| om2w-95cad96f | 0/1 · 41k · 15s | 0/1 · 65k · 16s | 1/1 · 175k · 76s | 0/1 · 48k · 47s | 1/1 · 50k · 47s | 0/1 · 280k · 52s | 1/1 · 551k · 167s |
| om2w-92a3d423 | 1/1 · 169k · 33s | 1/1 · 231k · 382s | 1/1 · 216k · 141s | 1/1 · 75k · 35s | 1/1 · 70k · 43s | 1/1 · 245k · 58s | 1/1 · 114k · 35s |
| om2w-d9d8b7d8 | 1/1 · 96k · 26s | 0/1 · 168k · 36s | 1/1 · 102k · 59s | 1/1 · 128k · 42s | 0/1 · 44k · 29s | 0/1 · 325k · 109s | 1/1 · 226k · 89s |
| om2w-8103786e | 0/1 · 3405k · 447s | 1/1 · 194k · 72s | 0/1 · 1089k · 95s | 1/1 · 165k · 76s | 1/1 · 337k · 228s | 0/1 · 1504k · 474s | 1/1 · 410k · 95s |
| om2w-2fc51dd3 | 0/1 · 327k · 107s | 0/1 · 744k · 108s | 0/1 · 249k · 78s | 1/1 · 269k · 94s | 1/1 · 245k · 118s | 0/1 · 514k · 90s | 1/1 · 637k · 221s |
| om2w-330cd04c | 1/1 · 469k · 69s | 1/1 · 415k · 27s | 1/1 · 391k · 63s | 1/1 · 263k · 59s | 0/1 · 510k · 269s | 1/1 · 840k · 106s | 1/1 · 1281k · 380s |
| om2w-b9225088 | 1/1 · 492k · 102s | 1/1 · 522k · 83s | 1/1 · 180k · 49s | 0/1 · 377k · 43s | 0/1 · 880k · 260s | 0/1 · 463k · 65s | 1/1 · 764k · 72s |
| om2w-6ca20f1d | 0/1 · 218k · 40s | 0/1 · 90k · 13s | 1/1 · 74k · 26s | 0/1 · 129k · 16s | 1/1 · 45k · 29s | 0/1 · 310k · 40s | 0/1 · 92k · 34s |
| om2w-5d542a7e | 1/1 · 207k · 113s | 0/1 · 465k · 277s | 1/1 · 104k · 72s | 1/1 · 300k · 122s | 0/1 · 128k · 78s | 0/1 · 753k · 189s | 0/1 · 356k · 268s |
| om2w-bb518416 | 1/1 · 586k · 159s | 1/1 · 1537k · 166s | 1/1 · 945k · 274s | 1/1 · 410k · 158s | 0/1 · 0k · 600s | 1/1 · 861k · 65s | 1/1 · 806k · 227s |
| om2w-a11ecdff | 1/1 · 148k · 43s | 1/1 · 105k · 26s | 1/1 · 100k · 56s | 1/1 · 116k · 37s | 1/1 · 167k · 65s | 1/1 · 1657k · 177s | 1/1 · 887k · 96s |
| om2w-dcd26e66 | 0/1 · 2370k · 154s | 0/1 · 2266k · 167s | 1/1 · 1186k · 140s | 0/1 · 782k · 189s | 0/1 · 947k · 299s | 0/1 · 1334k · 220s | 0/1 · 1344k · 180s |
| om2w-47bfe8a7 | 0/1 · 0k · 600s | 0/1 · 3637k · 457s | 0/1 · 0k · 600s | 0/1 · 2253k · 537s | 0/1 · 0k · 601s | 0/1 · 3220k · 576s | 0/1 · 0k · 600s |
| om2w-07ec4a12 | 0/1 · 638k · 164s | 1/1 · 335k · 100s | 1/1 · 393k · 39s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 433k · 112s | 1/1 · 793k · 442s |
| om2w-da8f3823 | 0/1 · 510k · 107s | 0/1 · 305k · 91s | 0/1 · 209k · 87s | 0/1 · 261k · 34s | 0/1 · 151k · 68s | 0/1 · 805k · 182s | 0/1 · 195k · 82s |
| om2w-8689af4d | 1/1 · 634k · 65s | 1/1 · 1031k · 92s | 1/1 · 276k · 55s | 1/1 · 288k · 62s | 1/1 · 364k · 59s | 0/1 · 494k · 75s | 1/1 · 313k · 38s |
| om2w-547f5729 | 0/1 · 254k · 120s | 0/1 · 739k · 340s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 360k · 193s | 0/1 · 0k · 600s | 0/1 · 2889k · 333s |
| om2w-461ab9b0 | 1/1 · 1119k · 222s | 1/1 · 610k · 171s | 1/1 · 684k · 135s | 1/1 · 1076k · 282s | 1/1 · 1397k · 150s | 1/1 · 1851k · 240s | 1/1 · 1144k · 258s |
| om2w-d1970c16 | 0/1 · 198k · 33s | 0/1 · 376k · 73s | 1/1 · 2785k · 297s | 0/1 · 3013k · 419s | 0/1 · 0k · 600s | 0/1 · 2081k · 242s | 0/1 · 535k · 106s |
| om2w-9d09bc94 | 0/1 · 744k · 567s | 1/1 · 69k · 30s | 1/1 · 1281k · 207s | 0/1 · 543k · 143s | 1/1 · 633k · 234s | 0/1 · 0k · 600s | 0/1 · 3019k · 433s |
| om2w-3ef64f34 | 1/1 · 1944k · 283s | 1/1 · 1146k · 123s | 0/1 · 0k · 600s | 0/1 · 2106k · 270s | 0/1 · 0k · 600s | 1/1 · 1640k · 203s | 1/1 · 801k · 125s |
| om2w-1c3b747a | 0/1 · 972k · 156s | 0/1 · 1325k · 240s | 1/1 · 741k · 95s | 1/1 · 750k · 119s | 1/1 · 1028k · 320s | 0/1 · 2041k · 216s | 0/1 · 986k · 86s |
| om2w-f05e87c5 | 0/1 · 928k · 85s | 0/1 · 1002k · 81s | 0/1 · 802k · 211s | 1/1 · 615k · 109s | 0/1 · 421k · 146s | 0/1 · 1938k · 186s | 1/1 · 645k · 162s |
| om2w-a0a18ca6 | 0/1 · 3951k · 486s | 0/1 · 2523k · 442s | 1/1 · 2870k · 491s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 3487k · 389s | 0/1 · 3805k · 259s |
| om2w-783ce6a3 | 0/1 · 175k · 72s | 0/1 · 178k · 80s | 1/1 · 174k · 34s | 1/1 · 146k · 52s | 0/1 · 164k · 32s | 1/1 · 1199k · 232s | 1/1 · 282k · 89s |
| om2w-f2be37a9 | 0/1 · 890k · 182s | 1/1 · 769k · 70s | 0/1 · 1100k · 306s | 1/1 · 1657k · 241s | 1/1 · 680k · 173s | 0/1 · 3521k · 301s | 0/1 · 1837k · 447s |
| om2w-75146b7b | 1/1 · 2553k · 437s | 1/1 · 714k · 97s | 1/1 · 631k · 232s | 1/1 · 1137k · 191s | 1/1 · 409k · 149s | 1/1 · 999k · 125s | 1/1 · 771k · 138s |
| om2w-6b2cfae0 | 0/1 · 245k · 156s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-271b36ef | 1/1 · 1593k · 361s | 1/1 · 1667k · 348s | 0/1 · 541k · 427s | 1/1 · 299k · 170s | 1/1 · 1262k · 288s | 1/1 · 1509k · 423s | 1/1 · 483k · 165s |
| om2w-48c73f3f | 0/1 · 0k · 600s | 0/1 · 2681k · 343s | 1/1 · 243k · 63s | 1/1 · 187k · 82s | 1/1 · 238k · 125s | 0/1 · 504k · 91s | 1/1 · 460k · 105s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-1c3b747a #1: WebJudge: failure. The agent never applied the UI filters for “ongoing” or sorted competitions by prize, instead manually inspected the list and picked the ARC Prize 2026 as highest. More critically, 
- **agent-browser** · om2w-2fc51dd3 #1: WebJudge: failure. The agent correctly entered the zip code, applied and verified the climate-controlled filter, and located a nearby facility (“184 Route 30” / “1311.html”). However, it never filtere
- **agent-browser** · om2w-43a1ca25 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-47bfe8a7 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-47e314cc #1: timeout after 10 min
- **agent-browser** · om2w-48c73f3f #1: WebJudge: failure. The agent was blocked at step 1 with an “Access Denied” error when attempting to reach new.mta.info and thus never located the Final Environmental Impact Statement, identified the r
- **agent-browser** · om2w-547f5729 #1: timeout after 10 min
- **agent-browser** · om2w-5d542a7e #1: WebJudge: failure. The agent correctly identified the CVPR 2022 main conference source and used API filters with sort=cited_by_count:desc to fetch works, but never extracted or displayed the top resul
- **agent-browser** · om2w-63d6866f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-6b2cfae0 #1: timeout after 10 min
- **agent-browser** · om2w-6ca20f1d #1: WebJudge: failure. The agent successfully located and read the eligibility (“Who can get Child Benefit”) and claim instructions (“Make a claim”), but never accessed or explained “how Child Benefit wor
- **agent-browser** · om2w-8103786e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-8689af4d #1: WebJudge: failure. The agent did land on the certified refurbished iPad page sorted “Price: Low to High” and ultimately opened the 256 GB Blue iPad Air and added it to the bag. However, it never used 
- **agent-browser** · om2w-95cad96f #1: WebJudge: failure. The agent correctly accessed Rotten Tomatoes and applied the “Sort: Most Popular” filter for TV series, fulfilling key points 1 and 2. However, the crucial list of “Most Popular TV”
- **agent-browser** · om2w-9d09bc94 #1: timeout after 10 min
- **agent-browser** · om2w-a0a18ca6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-a172a5d9 #1: timeout after 10 min
- **agent-browser** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent navigated to an IGN boardgame review page but never demonstrated that the review is marked Editor’s Choice nor that it has a score of 10. The snapshots don’t show the nume
- **agent-browser** · om2w-ade4c09a #1: WebJudge: failure. The agent only navigated to FlightAware and captured a text snippet around “Find the right tier” but did not extract or list any AeroAPI plans, their pricing, or compare their featu
- **agent-browser** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-b9225088 #1: WebJudge: failure. The agent successfully applied the discipline (“Computer Sciences & Technology”) and faculty type (“Tenured/Tenure Track”) filters, but never applied or confirmed a Location filter 
- **agent-browser** · om2w-bb314cb8 #1: timeout after 10 min
- **agent-browser** · om2w-c801d1c9 #1: WebJudge: failure. The agent successfully filtered for negative reviews from players with over 100 hours and sorted by latest using the Steam API JSON, but it never clearly confirmed that “Labyrinthin
- **agent-browser** · om2w-d1970c16 #1: WebJudge: failure. The agent never applied filters for “dry red” or the $15–$20 price range—only vintage=2020 and country=United States were set. No evidence shows the sort or filter was set to restri
- **agent-browser** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly opened the SAM2 repository and applied the author filter for NielsRogge, but never sorted or paginated to locate the earliest (first) commit by that author. They
- **agent-browser** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a true “earliest” sort. Instead, it filtered press releases to the year 2020 and arbitrarily jumped to page 17, opening a March 05, 2020 release. It never so
- **agent-browser** · om2w-dcd26e66 #1: WebJudge: failure. The agent did initiate and click through the quiz questions (support system, joy activities, exercise, eating habits, portion struggles), but it never submitted the final quiz to ge
- **agent-browser** · om2w-f05e87c5 #1: WebJudge: failure. The agent did eventually apply the exact Algolia filter combining isHiring:true, regions:France, and the four YC batches (Winter 2022, Summer 2022, Winter 2023, Summer 2023) and eve
- **agent-browser** · om2w-f2be37a9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-1c3b747a #1: WebJudge: failure. The agent never applied a proper “highest prize” filter on the competitions list (they used the default sortOption and then manually sorted in code rather than using the sortOption:
- **playwright-cli** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly set specialty (“Neurosurgeon”) and applied the “Tomorrow” availability filter. However, no age filter for “over 50” was applied (and none exists on the site), an
- **playwright-cli** · om2w-47bfe8a7 #1: timeout after 10 min
- **playwright-cli** · om2w-47e314cc #1: timeout after 10 min
- **playwright-cli** · om2w-547f5729 #1: WebJudge: failure. The agent never demonstrated all filters correctly applied. While it did use “3-bedrooms” and an upper price bound under $2,500 (and even a “2-bathrooms” URL), it never set the $1,5
- **playwright-cli** · om2w-5d542a7e #1: WebJudge: failure. The agent correctly filtered for 2022 CVPR main-conference papers via the OpenAlex API (source ID filter and publication_year) and sorted by citation count descending, thereby obtai
- **playwright-cli** · om2w-63d6866f #1: timeout after 10 min
- **playwright-cli** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-cli** · om2w-6ca20f1d #1: WebJudge: failure. The agent successfully navigated to the child benefit main page, the eligibility page, and the how-to-claim page. It retrieved eligibility criteria and claim instructions. However, 
- **playwright-cli** · om2w-9d09bc94 #1: WebJudge: failure. The agent never used the site’s official “Event Type: NHL” filter or the location filter but instead relied on search queries (“q=nhl”, “q=Boston Bruins”) and even used incorrect co
- **playwright-cli** · om2w-a0a18ca6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-a96fca87 #1: WebJudge: failure. The agent did navigate to the Business plan and opened the “Estimated price calculator,” and it correctly filled in “100” users and attempted to fill “1024 TB” storage and “50 TB” t
- **playwright-cli** · om2w-ade4c09a #1: WebJudge: failure. The agent successfully navigated to FlightAware’s AeroAPI commercial page, located the pricing section, and captured snapshots of the pricing cards, pricing table, and volume‐discou
- **playwright-cli** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-bb314cb8 #1: WebJudge: failure. The agent did open the ICLR site and navigate to the ICLR 2016 videolectures page (key points 1 & 2), but never located or opened a “Best Paper Award” video section (key point 3). I
- **playwright-cli** · om2w-d1970c16 #1: WebJudge: failure. The agent never applied explicit filters for vintage (2020), sweetness (dry), origin (United States), or the precise $15–$20 price range. Instead, it only issued search queries and 
- **playwright-cli** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied the “Year” dropdown or a sort function to explicitly sort press releases by earliest date. Instead, it manually navigated to page=17 and then opened a 2020 r
- **playwright-cli** · om2w-dcd26e66 #1: WebJudge: failure. The agent navigated to and progressed through the quiz, selecting answers for support system (#6), activities (cooking, family time, travel for #7–9), exercise (none for #3), eating
- **playwright-cli** · om2w-e9f4dfc6 #1: WebJudge: failure. Although the agent correctly set “Pediatrician” and location 90028 (points 1–2) and applied a ≥4-star rating filter (point 4), it never applied or confirmed a UI filter for “Interna
- **playwright-cli** · om2w-f2be37a9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-07ec4a12 #1: WebJudge: failure. The agent correctly navigated to the interaction checker, entered “melatonin” and “Folate Forte,” and clicked “Check Interactions,” but there is no snapshot or evaluation of the act
- **playwright-mcp** · om2w-1c3b747a #1: WebJudge: failure. The agent never actually confirmed which active competition has the highest prize. Although they made API calls with sortOption “SORT_OPTION_PRIZE,” they did not parse or snapshot t
- **playwright-mcp** · om2w-2fc51dd3 #1: WebJudge: failure. The agent did navigate to Public Storage, enter ZIP 60538, and attempt to click the climate-control checkbox, but there’s no confirmation that the filter was applied. It never used 
- **playwright-mcp** · om2w-3443e9c3 #1: WebJudge: failure. The agent successfully located and opened the WebMD ovulation calculator (step 1), navigated the calendar to the previous month, and selected the first day of that month (step 2). I
- **playwright-mcp** · om2w-43a1ca25 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-47bfe8a7 #1: timeout after 10 min
- **playwright-mcp** · om2w-47e314cc #1: timeout after 10 min
- **playwright-mcp** · om2w-48c73f3f #1: timeout after 10 min
- **playwright-mcp** · om2w-547f5729 #1: WebJudge: failure. The agent navigated to NYC and set the 3-bedroom filter, but never applied a 2+ bathroom filter or the exact $1,500–$2,500 price range. None of the snapshots show those filters sele
- **playwright-mcp** · om2w-63d6866f #1: WebJudge: failure. The agent successfully navigated to Trip.com, searched Hong Kong attractions, sorted by “Most booked,” and identified Hong Kong Disneyland as the top attraction. However, it never a
- **playwright-mcp** · om2w-6b2cfae0 #1: WebJudge: failure. The agent navigated to Basketball-Reference and extracted the playoffs per-game table, but never calculated or identified which playoff run had the highest points per game, nor appl
- **playwright-mcp** · om2w-6ca20f1d #1: WebJudge: failure. The agent navigated to the relevant “Who can get Child Benefit” and “Make a claim” sections and captured snapshots of the page structure, but never extracted or presented the actual
- **playwright-mcp** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly applied the “Location: Florida” and “Degree/Program Type: Internship” filters and confirmed there are 24 Florida internship results split across three pages. How
- **playwright-mcp** · om2w-8103786e #1: WebJudge: failure. The agent correctly navigated to the symptom checker, selected the “Sharp” and “Anxiety” checkboxes, and clicked “Find causes,” but it never displayed or captured the actual “possib
- **playwright-mcp** · om2w-95cad96f #1: WebJudge: failure. The agent successfully navigated to Rotten Tomatoes (step 1) and clicked the TV Shows link (steps 3–4), satisfying key points #1 and #2. However, there is no evidence that the “SORT
- **playwright-mcp** · om2w-9d09bc94 #1: WebJudge: failure. The agent never applied a city filter for “Boston” via the site’s filter UI (no confirmation of Boston filter or visible filtered results). While it reached the Boston Bruins page, 
- **playwright-mcp** · om2w-a0a18ca6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-ade4c09a #1: WebJudge: failure. The agent successfully navigated to the AeroAPI pricing page on FlightAware and extracted the pricing tables, but it never presented or compared the available plans to the user. The
- **playwright-mcp** · om2w-b64f938a #1: timeout after 10 min
- **playwright-mcp** · om2w-bb314cb8 #1: WebJudge: failure. The agent only navigated to the ICLR site and selected the year 2016 but never applied any “Best Paper Award” filter, “video recording of talks” filter, or sort-by-first step. It si
- **playwright-mcp** · om2w-c3a33396 #1: timeout after 10 min
- **playwright-mcp** · om2w-d1970c16 #1: WebJudge: failure. The agent correctly set the state to Texas and confirmed age, then searched “2020 dry red wine United States” and added 5 bottles of a “2020-pioneer-town-pinot-noir” variant to the 
- **playwright-mcp** · om2w-da8f3823 #1: WebJudge: failure. The agent never gathered a full list of press releases, only filtered for 2020 and arbitrarily navigated pages without confirming the earliest date. They clicked into two 2020 relea
- **playwright-mcp** · om2w-dcd26e66 #1: WebJudge: failure. The agent correctly navigated to and completed all five quiz questions, selecting answers that match the user profile (strong support system; cooking, family time, travel; no exerci
- **playwright-mcp** · om2w-e9f4dfc6 #1: timeout after 10 min
- **playwright-mcp** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly used the API to apply filters for France, hiring, and the 2022/2023 batches, and even visited individual company pages (Twenty, Osium AI, Rimward, HyLight, Escap
- **playwright-mcp** · om2w-f2be37a9 #1: WebJudge: failure. The agent correctly applied the “Obedience Trials” filter and limited results to New York, but it never properly set the date range to “next month”—it left the default Oct 2026 mont
- **playwright-mcp-tuned** · om2w-1c3b747a #1: WebJudge: failure. The agent navigated to the competitions page with a prize‐descending URL parameter, used network requests and client‐side sorting to identify the top‐prize competition, then navigat
- **playwright-mcp-tuned** · om2w-2fc51dd3 #1: WebJudge: failure. The agent correctly navigated to the Public Storage site, entered zip code 60538, and applied the climate-controlled filter. However, it never applied or confirmed a size filter or 
- **playwright-mcp-tuned** · om2w-43a1ca25 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-47bfe8a7 #1: WebJudge: failure. The agent correctly applied the Xiaomi brand filter and sorted by popularity, but it never identified or selected the actual first and second most popular Xiaomi smartphones (which 
- **playwright-mcp-tuned** · om2w-47e314cc #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-48c73f3f #1: WebJudge: failure. The agent never selected or retrieved “Volume 2: FEIS Report” (the actual report) from the Final Environmental Impact Statement section; it only opened Volume 1 (Executive Summary) 
- **playwright-mcp-tuned** · om2w-547f5729 #1: WebJudge: failure. The final snapshot shows only three active filters (“New York, NY,” “< $2.5 k,” “3 Beds / 2+ Baths”) with no minimum price set and no “Condos” filter applied. The agent never set th
- **playwright-mcp-tuned** · om2w-5d542a7e #1: WebJudge: failure. The agent never displayed or confirmed the top‐cited CVPR 2022 main conference paper to the user. Although it used OpenAlex API filters for year and source ID and sorted by citation
- **playwright-mcp-tuned** · om2w-63d6866f #1: WebJudge: failure. The agent never applied a “sort by highest popularity” filter on the Hong Kong attractions list (no sorting action was taken or confirmed). Instead, it simply clicked Hong Kong Disn
- **playwright-mcp-tuned** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-6ca20f1d #1: WebJudge: failure. The agent navigated to the Child Benefit main page and then to the eligibility and how-to-claim pages, but never accessed or captured the “How it works” section. Furthermore, none o
- **playwright-mcp-tuned** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College site, applied the “Florida” location and “Internship” program type filters, and confirmed there are 24 results across three 
- **playwright-mcp-tuned** · om2w-7b182a50 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-95cad96f #1: WebJudge: failure. The agent successfully navigated to Rotten Tomatoes, directly accessed the TV category sorted by “Most Popular,” and confirmed the SORT: MOST POPULAR filter is applied. However, the
- **playwright-mcp-tuned** · om2w-a0a18ca6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-a96fca87 #1: WebJudge: failure. The agent navigated to the Business pricing page and correctly selected 100 users, entered 1 PB (1024 TB) for storage, and set the transfer quota to 50 TB. However, none of the fina
- **playwright-mcp-tuned** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent selected the Score Range (10–10), Genre (board), and checked the Editor’s Choice box, but never submitted or confirmed that the filtered results were applied. There’s no e
- **playwright-mcp-tuned** · om2w-b64f938a #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-d1970c16 #1: WebJudge: failure. The agent confirmed age (25+) and location (Texas) and added 5 bottles to the cart, but never applied explicit filters for “dry” red wine, vintage year = 2020, origin = United State
- **playwright-mcp-tuned** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly navigated to the official facebookresearch/sam2 repo, applied the author=NielsRogge filter via the GitHub API, parsed the commits list to identify the oldest ent
- **playwright-mcp-tuned** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied an “earliest” sort or filter; it only set the year to 2020 (and attempted 2019) and then opened a March 5, 2020 press release. It did not locate or open the 
- **playwright-mcp-tuned** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully navigated to and completed all five quiz questions, selecting answers that match the user’s profile: strong support system, joys (cooking, family time, travel
- **playwright-mcp-tuned** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly initiated a search for “Pediatrician” near 90028 and applied a “4 Stars & Up” rating filter, but it never applied or confirmed a filter for the “Internal Medicin
- **playwright-mcp-tuned** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied the three required filters (batch = Winter/Summer 2022 & 2023, region = France, isHiring = true) via the Algolia query (step 11) and confirmed there are 
- **stagehand** · om2w-271b36ef #1: WebJudge: failure. The agent did perform a search for “Samsung 8K TV” and even applied the “Open-Box” filter (URL param `condition_facet=Condition~Open-Box`) and saw the “Open-Box” pill, but that sear
- **stagehand** · om2w-2fc51dd3 #1: WebJudge: failure. The agent searched the correct zip code and viewed listings, but never applied a filter or otherwise confirmed climate control, nor selected a unit size sufficient for two small bed
- **stagehand** · om2w-3ef64f34 #1: timeout after 10 min
- **stagehand** · om2w-47bfe8a7 #1: timeout after 10 min
- **stagehand** · om2w-47e314cc #1: timeout after 10 min
- **stagehand** · om2w-547f5729 #1: timeout after 10 min
- **stagehand** · om2w-6b2cfae0 #1: timeout after 10 min
- **stagehand** · om2w-8103786e #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic symptom checker, applied the two required filters (“sharp” pain and “accompanied by anxiety”), and reached the “View possible causes
- **stagehand** · om2w-a172a5d9 #1: WebJudge: failure. The agent successfully navigated to the “Natural Product Information (Consumer)” page, which is the entry point for browsing the natural products database, but it did not perform an
- **stagehand** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent navigated to the IGN reviews page, then to the Editors’ Choice page, and used page.selectOption to filter by genre “board” and score “10”. However, it never explicitly eng
- **stagehand** · om2w-ade4c09a #1: WebJudge: failure. The agent successfully navigated to FlightAware’s AeroAPI pages and extracted raw text and tab/panel content but never identified or displayed the specific available plans or compar
- **stagehand** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-bb314cb8 #1: WebJudge: failure. The agent did navigate to the ICLR site, switch to 2016, and reach the VideoLectures.net event page, then scraped out the “Best Paper Awards” section. However, there is no snapshot 
- **stagehand** · om2w-c3a33396 #1: WebJudge: failure. The agent successfully applied filters for certified pre-owned, Porsche 911, 200-mile radius, ZIP 97007, and sorted by lowest price (Autotrader & CarGurus). However, it never applie
- **stagehand** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a proper “earliest” sort or filter across all press releases—only filtered by year “2020” and fetched two 2020 releases. It did not identify which press rele
- **stagehand** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly applied the location (90028) and star‐rating (4+ stars) filters on the general “Pediatrician” search, but never visibly applied or confirmed an “Internal Medicin
- **stagehand** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied the exact filters (Summer & Winter 2022 and 2023 batches, HQ Region: France, Is Hiring) by constructing the multi-batch URL and verifying “Showing 17 of 
- **stagehand** · om2w-f2be37a9 #1: WebJudge: failure. The agent successfully selected the Obedience trial type and restricted the location to New York, and it did click “Retrieve Events” and display results. However, the date filter fo
- **wdio-mcp** · om2w-07ec4a12 #1: timeout after 10 min
- **wdio-mcp** · om2w-3ef64f34 #1: WebJudge: failure. The agent did complete the parental‐gate (entered 1992 and solved 4×6=24) without logging in, but never demonstrated disabling search via the “Search off” setting or selecting the k
- **wdio-mcp** · om2w-43a1ca25 #1: WebJudge: failure. The agent only navigated to the Healthgrades homepage and search pages but never applied any filters for “over 50 years old” or “appointment available tomorrow,” nor did it submit o
- **wdio-mcp** · om2w-47bfe8a7 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-547f5729 #1: timeout after 10 min
- **wdio-mcp** · om2w-63d6866f #1: timeout after 10 min
- **wdio-mcp** · om2w-6b2cfae0 #1: timeout after 10 min
- **wdio-mcp** · om2w-6ca20f1d #1: WebJudge: failure. The agent only reached the Child Benefit page’s table of contents and did not navigate into or extract the actual eligibility criteria (“Who can get Child Benefit”), operational det
- **wdio-mcp** · om2w-905cb530 #1: timeout after 10 min
- **wdio-mcp** · om2w-95cad96f #1: WebJudge: failure. The agent successfully navigated to Rotten Tomatoes, selected the TV category, and sorted by “Most Popular,” satisfying key points #2–#4. However, the actual list of shows is obscur
- **wdio-mcp** · om2w-9d09bc94 #1: WebJudge: failure. The agent did locate events labeled under “Boston Bruins Tickets” and implicitly filtered by Boston, but it never applied an explicit NHL or Hockey filter. As a result its listing i
- **wdio-mcp** · om2w-9f1cba61 #1: WebJudge: failure. The agent correctly searched for “St Augustine, FL” (key point 1) and applied the “Experience (High to Low)” sort (key point 2), surfacing Thomas Dorazil as the top result. However,
- **wdio-mcp** · om2w-a0a18ca6 #1: timeout after 10 min
- **wdio-mcp** · om2w-ade4c09a #1: WebJudge: failure. The agent correctly navigated to the AeroAPI pricing page and identified the three available plans (Personal, Standard, Premium) using script executions, but it never actually prese
- **wdio-mcp** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-b9225088 #1: WebJudge: failure. The agent correctly navigated to the Computer Sciences & Technology category and applied the “Tenured/Tenured Track” filter, and even browsed individual job details. However, at no 
- **wdio-mcp** · om2w-c3a33396 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-d1970c16 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a sort-by-earliest control or selected the earliest available year in the dropdown. Instead, it filtered by the year 2020 and opened a press release from tha
- **wdio-mcp** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully located and completed all five quiz questions, selecting answers matching the user’s profile (support system, non-exercising, eating out, portions/cravings, a
- **wdio-mcp** · om2w-e9f4dfc6 #1: timeout after 10 min
- **wdio-session** · om2w-07ec4a12 #1: timeout after 10 min
- **wdio-session** · om2w-330cd04c #1: WebJudge: failure. The agent correctly navigated to couches for sale and enabled “search titles only,” but it never actually applied the “cheapest first” sort—the sort control remains on “relevance” a
- **wdio-session** · om2w-3ef64f34 #1: timeout after 10 min
- **wdio-session** · om2w-43a1ca25 #1: timeout after 10 min
- **wdio-session** · om2w-47bfe8a7 #1: timeout after 10 min
- **wdio-session** · om2w-47e314cc #1: timeout after 10 min
- **wdio-session** · om2w-547f5729 #1: WebJudge: failure. The agent never used the site’s filter UI to explicitly set “3 bedrooms,” “≥2 bathrooms,” and a $1500–$2500 range. Instead it repeatedly fetched pages and navigated by URL, and even
- **wdio-session** · om2w-5d542a7e #1: WebJudge: failure. The agent correctly limited results to the 2022 CVPR conference by applying the filter “primary_location.source.id:S4363607701,publication_year:2022” and sorted by citation count de
- **wdio-session** · om2w-63d6866f #1: timeout after 10 min
- **wdio-session** · om2w-6b2cfae0 #1: timeout after 10 min
- **wdio-session** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly applied the “internship” keyword and the Florida campus filter, navigated through all result pages, and identified multiple Florida-based internship programs on 
- **wdio-session** · om2w-9f1cba61 #1: timeout after 10 min
- **wdio-session** · om2w-a0a18ca6 #1: timeout after 10 min
- **wdio-session** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the AeroAPI pricing page and extracted per-endpoint fees under each category tab, but it never clicked the “Compare tiers” button or retrieved the actual list
- **wdio-session** · om2w-b64f938a #1: WebJudge: failure. The agent never applied or even accessed a price filter for \$5–\$10, nor did it reach any product listing showing frozen vegetarian cheese pizzas at that price. Instead it repeated
- **wdio-session** · om2w-b9225088 #1: WebJudge: failure. The agent correctly set the location (California within 100 miles) and the employment‐level filter (Tenured/Tenure-Track via EmploymentLevel=177) and browsed relevant Assistant Prof
- **wdio-session** · om2w-bb314cb8 #1: WebJudge: failure. The agent did navigate to the ICLR site and to the Videolectures.net ICLR 2016 event page (key points 1 and 3), and it eventually opened a specific talk (“Neural Programmer-Interpre
- **wdio-session** · om2w-bb518416 #1: timeout after 10 min
- **wdio-session** · om2w-c3a33396 #1: timeout after 10 min
- **wdio-session** · om2w-d1970c16 #1: timeout after 10 min
- **wdio-session** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly navigated to the facebookresearch/sam2 commits page and applied the author filter for NielsRogge (key point 1 and 2). However, it only viewed recent commits (Aug
- **wdio-session** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a filter or navigation action to locate the earliest (oldest) press‐release year; instead it set the year filter to “2020” (the most recent), then clicked in
- **wdio-session** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully located and completed the five-question weight management quiz, selecting answers that match the user’s profile (strong support system; activities—cooking, tr
- **wdio-session** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent only navigated to the pediatricians list for zip code 90028 but never applied a filter for specialty "Internal Medicine" nor a filter for rating ≥4 stars. Thus key points 
- **wdio-session** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied the “Is Hiring” and batch filters for Winter/Summer 2022 & 2023, yielding 316 companies, but it never applied the site’s “HQ Region: France” filter using

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-cli` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.57 |

Every setup ran in the same job, interleaved in one shuffled order.
