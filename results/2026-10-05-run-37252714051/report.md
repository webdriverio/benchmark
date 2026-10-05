# Benchmark run 2026-10-05-run-37252714051: Online-Mind2Web

Produced by [workflow run #37252714051](https://github.com/webdriverio/benchmark/actions/runs/37252714051) on 2026-10-05 from commit [`35c8d4f`](https://github.com/webdriverio/benchmark/commit/35c8d4fa35ac65e60d7bc47970b752f4bdc45156). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37252714051) (kept 90 days).

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
| Duration | 194 min |

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
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 341k | $0.135 | 42% (21/50) | 68 s | 17 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 406k | $0.186 | 42% (21/50) | 55 s | 18 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 472k | $0.221 | 62% (31/50) | 77 s | 23 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.64 | 252k | $0.112 | 56% (28/50) | 62 s | 22.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.175 | 397k | $0.159 | 62% (31/50) | 107 s | 25 |
| `agent-browser`<br>agent-browser@0.38.2 | 1199k | $0.388 | 52% (26/50) | 105 s | 33 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 853k | $0.316 | 52% (26/50) | 95 s | 30 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-fb7b4f78 | 0/1 · 140k · 85s | 0/1 · 200k · 131s | 1/1 · 89k · 18s | 1/1 · 67k · 27s | 1/1 · 145k · 35s | 1/1 · 839k · 158s | 0/1 · 795k · 245s |
| om2w-d71be72a | 0/1 · 98k · 23s | 1/1 · 157k · 22s | 0/1 · 212k · 37s | 1/1 · 75k · 28s | 0/1 · 152k · 40s | 0/1 · 300k · 39s | 0/1 · 166k · 28s |
| om2w-f389398d | 0/1 · 53k · 19s | 0/1 · 112k · 25s | 0/1 · 92k · 20s | 0/1 · 106k · 34s | 0/1 · 106k · 50s | 0/1 · 246k · 28s | 0/1 · 155k · 26s |
| om2w-824eb7bb | 0/1 · 417k · 59s | 0/1 · 735k · 62s | 1/1 · 1862k · 103s | 1/1 · 1779k · 320s | 0/1 · 3099k · 347s | 0/1 · 4163k · 183s | 1/1 · 2297k · 145s |
| om2w-9829f308 | 1/1 · 847k · 68s | 0/1 · 503k · 51s | 0/1 · 102k · 31s | 1/1 · 459k · 76s | 1/1 · 1043k · 169s | 1/1 · 1891k · 118s | 0/1 · 1119k · 124s |
| om2w-1b867afe | 1/1 · 1264k · 76s | 1/1 · 900k · 65s | 1/1 · 1555k · 146s | 1/1 · 419k · 54s | 1/1 · 512k · 72s | 1/1 · 1755k · 106s | 1/1 · 1249k · 104s |
| om2w-c1d6ea6f | 0/1 · 373k · 77s | 0/1 · 592k · 253s | 0/1 · 126k · 34s | 0/1 · 212k · 38s | 0/1 · 322k · 60s | 0/1 · 821k · 72s | 0/1 · 1038k · 245s |
| om2w-9d46ccb9 | 0/1 · 110k · 32s | 0/1 · 180k · 49s | 1/1 · 1145k · 117s | 0/1 · 955k · 108s | 1/1 · 667k · 109s | 1/1 · 2360k · 212s | 1/1 · 1234k · 144s |
| om2w-65c4030f | 0/1 · 145k · 101s | 0/1 · 98k · 38s | 1/1 · 165k · 19s | 1/1 · 178k · 57s | 1/1 · 277k · 141s | 1/1 · 412k · 41s | 0/1 · 370k · 49s |
| om2w-442a450e | 1/1 · 1558k · 113s | 1/1 · 2600k · 97s | 1/1 · 4267k · 531s | 1/1 · 1768k · 171s | 0/1 · 1254k · 160s | 1/1 · 1888k · 125s | 1/1 · 1423k · 102s |
| om2w-987bad7c | 0/1 · 72k · 32s | 0/1 · 223k · 174s | 0/1 · 417k · 93s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 4538k · 352s | 0/1 · 1739k · 290s |
| om2w-a6f0434c | 1/1 · 288k · 58s | 1/1 · 254k · 35s | 1/1 · 106k · 95s | 1/1 · 119k · 40s | 1/1 · 123k · 112s | 1/1 · 1378k · 119s | 1/1 · 524k · 59s |
| om2w-11abb668 | 1/1 · 3352k · 242s | 1/1 · 4069k · 235s | 1/1 · 442k · 59s | 0/1 · 2796k · 387s | 1/1 · 886k · 149s | 0/1 · 3089k · 341s | 1/1 · 2563k · 271s |
| om2w-a5c87cc1 | 0/1 · 91k · 44s | 0/1 · 119k · 55s | 0/1 · 1595k · 143s | 0/1 · 157k · 49s | 1/1 · 2762k · 329s | 0/1 · 2265k · 199s | 1/1 · 634k · 71s |
| om2w-f00e7acc | 0/1 · 113k · 52s | 0/1 · 107k · 52s | 1/1 · 626k · 47s | 1/1 · 209k · 51s | 1/1 · 302k · 118s | 1/1 · 792k · 103s | 1/1 · 675k · 84s |
| om2w-29b7372d | 1/1 · 378k · 33s | 1/1 · 257k · 24s | 0/1 · 251k · 23s | 0/1 · 90k · 21s | 0/1 · 129k · 35s | 0/1 · 151k · 22s | 0/1 · 160k · 27s |
| om2w-75a1b5dc | 0/1 · 93k · 51s | 0/1 · 79k · 31s | 1/1 · 233k · 48s | 1/1 · 201k · 56s | 1/1 · 225k · 61s | 0/1 · 563k · 54s | 0/1 · 336k · 54s |
| om2w-4c186c6e | 0/1 · 0k · 600s | 0/1 · 118k · 54s | 1/1 · 378k · 140s | 0/1 · 1212k · 264s | 1/1 · 2994k · 317s | 0/1 · 1884k · 354s | 0/1 · 2944k · 404s |
| om2w-60cbbbd5 | 1/1 · 238k · 43s | 1/1 · 313k · 37s | 1/1 · 70k · 25s | 1/1 · 183k · 41s | 1/1 · 339k · 66s | 1/1 · 186k · 25s | 1/1 · 712k · 63s |
| om2w-64b76158 | 0/1 · 474k · 72s | 0/1 · 539k · 56s | 0/1 · 277k · 78s | 0/1 · 180k · 60s | 0/1 · 439k · 95s | 0/1 · 346k · 51s | 0/1 · 294k · 57s |
| om2w-d392e154 | 1/1 · 3406k · 460s | 0/1 · 7830k · 550s | 1/1 · 1939k · 274s | 1/1 · 1889k · 452s | 0/1 · 3205k · 377s | 0/1 · 4160k · 578s | 0/1 · 5461k · 384s |
| om2w-3dca7cbe | 0/1 · 113k · 72s | 0/1 · 78k · 30s | 1/1 · 983k · 157s | 1/1 · 161k · 72s | 1/1 · 371k · 87s | 0/1 · 1538k · 125s | 1/1 · 2624k · 133s |
| om2w-59b7b990 | 0/1 · 194k · 186s | 0/1 · 121k · 78s | 0/1 · 86k · 51s | 0/1 · 318k · 78s | 0/1 · 56k · 41s | 0/1 · 4249k · 265s | 0/1 · 3514k · 229s |
| om2w-c94551d2 | 0/1 · 151k · 95s | 0/1 · 177k · 75s | 0/1 · 110k · 53s | 0/1 · 172k · 41s | 0/1 · 270k · 191s | 0/1 · 680k · 106s | 1/1 · 2294k · 175s |
| om2w-515f2e58 | 0/1 · 5638k · 404s | 0/1 · 7567k · 419s | 0/1 · 3702k · 312s | 0/1 · 3001k · 519s | 0/1 · 865k · 143s | 0/1 · 4071k · 538s | 0/1 · 2868k · 255s |
| om2w-84f806c7 | 0/1 · 115k · 54s | 0/1 · 99k · 35s | 1/1 · 285k · 132s | 1/1 · 687k · 93s | 1/1 · 507k · 131s | 0/1 · 2323k · 315s | 0/1 · 1166k · 88s |
| om2w-82eb3bfe | 1/1 · 295k · 50s | 1/1 · 403k · 66s | 1/1 · 662k · 137s | 1/1 · 488k · 104s | 1/1 · 2025k · 328s | 1/1 · 566k · 55s | 1/1 · 638k · 51s |
| om2w-ba2a469a | 1/1 · 401k · 42s | 1/1 · 366k · 43s | 0/1 · 661k · 102s | 0/1 · 188k · 38s | 1/1 · 358k · 68s | 1/1 · 686k · 50s | 0/1 · 276k · 41s |
| om2w-690d7b4a | 1/1 · 1985k · 112s | 1/1 · 2182k · 131s | 1/1 · 631k · 203s | 0/1 · 485k · 52s | 1/1 · 422k · 70s | 1/1 · 2142k · 128s | 0/1 · 325k · 55s |
| om2w-b99c0296 | 0/1 · 3069k · 283s | 0/1 · 668k · 70s | 0/1 · 3499k · 259s | 0/1 · 1138k · 137s | 1/1 · 843k · 126s | 1/1 · 2843k · 174s | 1/1 · 1726k · 160s |
| om2w-47186fac | 0/1 · 194k · 26s | 0/1 · 554k · 53s | 0/1 · 967k · 142s | 1/1 · 323k · 61s | 0/1 · 313k · 105s | 1/1 · 850k · 76s | 0/1 · 446k · 43s |
| om2w-d1807551 | 0/1 · 139k · 113s | 0/1 · 204k · 109s | 0/1 · 502k · 36s | 0/1 · 244k · 50s | 1/1 · 544k · 95s | 1/1 · 2194k · 348s | 0/1 · 770k · 249s |
| om2w-c39d6c24 | 1/1 · 142k · 36s | 1/1 · 79k · 22s | 1/1 · 156k · 36s | 1/1 · 347k · 57s | 1/1 · 289k · 67s | 1/1 · 829k · 81s | 0/1 · 143k · 27s |
| om2w-56f8890a | 0/1 · 80k · 39s | 0/1 · 104k · 37s | 1/1 · 590k · 69s | 1/1 · 148k · 37s | 0/1 · 200k · 85s | 0/1 · 350k · 95s | 1/1 · 640k · 68s |
| om2w-fa9adb81 | 0/1 · 600k · 70s | 0/1 · 433k · 47s | 0/1 · 296k · 41s | 1/1 · 523k · 121s | 0/1 · 571k · 128s | 0/1 · 621k · 80s | 0/1 · 610k · 69s |
| om2w-070c907d | 1/1 · 1395k · 51s | 1/1 · 1481k · 58s | 1/1 · 232k · 48s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 2224k · 146s | 1/1 · 1770k · 146s |
| om2w-7680a920 | 1/1 · 1532k · 64s | 1/1 · 512k · 45s | 1/1 · 427k · 48s | 1/1 · 260k · 103s | 1/1 · 497k · 100s | 0/1 · 273k · 70s | 1/1 · 1149k · 85s |
| om2w-4c572a62 | 1/1 · 492k · 42s | 1/1 · 409k · 42s | 1/1 · 266k · 67s | 1/1 · 176k · 41s | 1/1 · 203k · 45s | 1/1 · 1118k · 84s | 1/1 · 710k · 74s |
| om2w-fc53ddd3 | 0/1 · 7310k · 449s | 0/1 · 6636k · 422s | 0/1 · 2173k · 276s | 0/1 · 2312k · 510s | 0/1 · 1441k · 244s | 0/1 · 1613k · 294s | 0/1 · 2317k · 305s |
| om2w-0a0fa834 | 0/1 · 1463k · 135s | 0/1 · 1358k · 66s | 1/1 · 2193k · 165s | 0/1 · 0k · 600s | 1/1 · 709k · 155s | 1/1 · 1076k · 82s | 1/1 · 1149k · 81s |
| om2w-6ebde509 | 1/1 · 790k · 51s | 1/1 · 929k · 52s | 1/1 · 792k · 78s | 1/1 · 352k · 63s | 1/1 · 534k · 95s | 1/1 · 1279k · 87s | 1/1 · 667k · 111s |
| om2w-ba01ea55 | 1/1 · 1303k · 88s | 1/1 · 1869k · 83s | 1/1 · 1735k · 182s | 1/1 · 1709k · 133s | 1/1 · 1207k · 136s | 1/1 · 731k · 69s | 1/1 · 2213k · 167s |
| om2w-9ed38272 | 1/1 · 1364k · 68s | 1/1 · 1829k · 105s | 1/1 · 5507k · 209s | 0/1 · 2544k · 184s | 1/1 · 2061k · 425s | 1/1 · 4009k · 137s | 1/1 · 2008k · 160s |
| om2w-5dec0e66 | 0/1 · 3553k · 288s | 0/1 · 3832k · 275s | 0/1 · 1410k · 206s | 0/1 · 1251k · 214s | 0/1 · 2351k · 275s | 0/1 · 3509k · 306s | 0/1 · 3744k · 324s |
| om2w-b6d10e9b | 1/1 · 118k · 21s | 1/1 · 117k · 24s | 1/1 · 186k · 59s | 1/1 · 107k · 34s | 1/1 · 161k · 44s | 1/1 · 98k · 24s | 1/1 · 113k · 28s |
| om2w-7072d094 | 1/1 · 420k · 88s | 0/1 · 429k · 78s | 1/1 · 761k · 67s | 1/1 · 197k · 55s | 1/1 · 157k · 47s | 0/1 · 723k · 74s | 1/1 · 508k · 71s |
| om2w-323bd85e | 0/1 · 148k · 47s | 1/1 · 274k · 44s | 1/1 · 198k · 43s | 1/1 · 132k · 120s | 1/1 · 372k · 207s | 1/1 · 492k · 80s | 1/1 · 368k · 69s |
| om2w-27fa3ac2 | 0/1 · 1109k · 167s | 1/1 · 1571k · 80s | 0/1 · 2607k · 147s | 1/1 · 422k · 60s | 0/1 · 718k · 85s | 0/1 · 1847k · 98s | 1/1 · 1343k · 116s |
| om2w-180ed2ec | 0/1 · 309k · 220s | 0/1 · 608k · 319s | 1/1 · 529k · 77s | 0/1 · 829k · 100s | 1/1 · 229k · 55s | 1/1 · 2055k · 291s | 0/1 · 910k · 112s |
| om2w-864244b6 | 1/1 · 173k · 25s | 1/1 · 298k · 25s | 1/1 · 174k · 19s | 1/1 · 155k · 28s | 1/1 · 263k · 50s | 1/1 · 338k · 31s | 1/1 · 158k · 26s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-11abb668 #1: WebJudge: failure. The agent never persistently updated the search to ZIP 30010 in the store-locator interface, nor did they demonstrate the Apple Authorized Service Provider filter yielding iMac-serv
- **agent-browser** · om2w-27fa3ac2 #1: WebJudge: failure. The agent did successfully narrow the subject to CHEM, the term to Winter 2023, the day to Monday, and the time‐of‐day to Afternoon (2–5 pm). However, it never explicitly applied th
- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent successfully accessed Google Finance and navigated to the Microsoft stock page (key points 1 and 2). However, there is no evidence that the agent located or browsed the fi
- **agent-browser** · om2w-3dca7cbe #1: WebJudge: failure. The agent successfully navigated to Zara Home → Rugs and displayed rug products, and the page shows “FILTERS 1” with all visible rugs in beige tones. However, there is no explicit e
- **agent-browser** · om2w-4c186c6e #1: WebJudge: failure. The agent navigated through multiple NBA store and external pages but never selected a Devin Booker jersey, chose the medium size, nor clicked an “Add to Cart” button. It never conf
- **agent-browser** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to the Prometheus crazy credits URL but never passed the IMDb human-verification step or displayed any of the actual crazy credits content. It only produced scre
- **agent-browser** · om2w-59b7b990 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the QLED panel type, 240 Hz refresh rate, and set a $1,000–$2,000 price range filter, but never selected or confirmed the required 33″–49″ screen-size fi
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to pages about the pescatarian diet without extracting or directly comparing two distinct diet plans or evaluating their relative health benefits. No side-b
- **agent-browser** · om2w-7072d094 #1: WebJudge: failure. The agent correctly navigated to the personal credit card page and applied the “No Foreign Transaction Fee” filter (showing 11 cards). It then selected the first two cards (Platinum
- **agent-browser** · om2w-75a1b5dc #1: WebJudge: failure. The user requested opening the reviews of a recipe with beef sirloin. The agent navigated to allrecipes.com and ultimately opened a recipe for beef tenderloin, not beef sirloin, and
- **agent-browser** · om2w-7680a920 #1: WebJudge: failure. The agent correctly navigated to the BabyCenter Child Height Predictor, selected “Girl,” set the age to 7 years, and filled in the child’s height (4 ft 0 in), weight (55 lb), mother
- **agent-browser** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-84f806c7 #1: WebJudge: failure. The agent reached the shelter search page, entered ZIP 10012 and facility type “Shelters and rescues,” then ran the search. However, they never applied the “Birds” filter via the fi
- **agent-browser** · om2w-987bad7c #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-a5c87cc1 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only performed repeated searches for “drip coffee maker” on Google Shopping but never applied any filters for sale items, the $25–$60 price range, or the black finish. No 
- **agent-browser** · om2w-c94551d2 #1: WebJudge: failure. The agent did open the petfinder site and even constructed a URL with distance=25 and location=94587, so the location filter is covered. However, there is no evidence the agent appl
- **agent-browser** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s MacBook Air page, selected the Tech Specs tab, and chose a model size, satisfying the “latest” and “MacBook Air” filters. However, the ac
- **agent-browser** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (meeting key point 1) but never applied or demonstrated any “latest” filter or sort control on the climate articles (fai
- **agent-browser** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to the user homepage (DisturbedArtist) and saw a reposted rock track, fulfilling point 1 and partially point 2. However, there is no evidence that t
- **agent-browser** · om2w-fc53ddd3 #1: WebJudge: failure. The agent only searched for an open-box Samsung Galaxy S25 Plus but never applied or confirmed the “excellent” condition filter, nor did it navigate through a trade-in flow to speci
- **playwright-cli** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully located the “Giving” link on the UM‐Dearborn site and clicked “Give Now” to reach the general Michigan “Make a Gift” portal, but never applied any filter or s
- **playwright-cli** · om2w-29b7372d #1: WebJudge: failure. The agent successfully accessed Google Finance and searched for Microsoft stock (steps 1–2). However, neither snapshot shows the “News” or “Top news” section, nor is there evidence 
- **playwright-cli** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “best cars” section but never applied or confirmed a sort-by-best filter (key point 2). It also did not explicitly select the first car from a sorted list
- **playwright-cli** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-515f2e58 #1: WebJudge: failure. The agent correctly searched for “Samsung M2 internal SSD” and applied the $25–$200 price filter, the M.2 2280 interface filter, and a Samsung brand filter. However, it never applie
- **playwright-cli** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly navigated to Luna County, applied the owner-financing and “past 30 days” filters, and sorted by price-per-acre low-to-high (even using the explicit homesites URL
- **playwright-cli** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-64b76158 #1: WebJudge: failure. The agent only located and extracted content from a single Healthline pescatarian diet article and did not identify or compare two distinct pescatarian diet variations with respect 
- **playwright-cli** · om2w-65c4030f #1: WebJudge: failure. The agent searched for “Cardiologist” in Jacksonville, FL and viewed a physician profile, but never applied or confirmed a gender filter for “female” via the site’s filter function 
- **playwright-cli** · om2w-690d7b4a #1: WebJudge: failure. The agent only set the max price to $400 but never entered “iPhone X” as the search term, never checked “search titles only,” and never applied the “good” condition filter. It thus 
- **playwright-cli** · om2w-75a1b5dc #1: WebJudge: failure. The agent navigated to a beef roast recipe page but never clicked or opened the reviews section, nor specifically selected a recipe with beef sirloin. Key point 1 (open reviews) and
- **playwright-cli** · om2w-84f806c7 #1: WebJudge: failure. The agent entered zip code 10012, selected “Shelters and rescues,” and chose “Birds,” but never executed a search to display results or applied/specified sorting by closest. Instead
- **playwright-cli** · om2w-9829f308 #1: WebJudge: failure. The agent did navigate to ESPN’s NBA scoreboard and by default was viewing the most recent date (Oct. 4), satisfying the “filter by most recent” requirement. It located and clicked 
- **playwright-cli** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied filters for used, BMW 135, year 2011, and max price $30,000 and located a listing showing the seller name “Sawnee Mountain Motors.” However, no seller’s 
- **playwright-cli** · om2w-ba2a469a #1: WebJudge: failure. The agent searched for “introduction to computer science python” and clicked what appears to be the Beginner filter, but there’s no visible “Beginner” tag applied in the snapshots—o
- **playwright-cli** · om2w-c1d6ea6f #1: WebJudge: failure. The agent never applied any filters for “on sale,” the $25–$60 price range, or “black” finish, nor did it confirm or display filtered results. It only searched for “drip coffee make
- **playwright-cli** · om2w-c39d6c24 #1: WebJudge: failure. The user’s goal was to “browse” the final skin in Ahri’s skin list, which requires navigating into that skin’s detail page. While the agent identified the last skin (“After Hours Sp
- **playwright-cli** · om2w-d1807551 #1: WebJudge: failure. The agent navigated to the Dallas divorce directory and surfaced attorneys (e.g., Carla M. Calabrese), but never applied or confirmed a “Top 50 Women Texas Super Lawyers” filter or 
- **playwright-cli** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s website, located the MacBook Air page, and opened the Tech Specs section for the current model, but it never applied any “latest” filter (ev
- **playwright-cli** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (step 1) but never applied or confirmed a “latest” sort or filter. There is no evidence of selecting a sort-by-date cont
- **playwright-cli** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to the Rock Top 50 chart but did not apply a “highest” filter or sort to select the top (#1) track. Instead of browsing a user’s homepage that had reposted the c
- **playwright-cli** · om2w-fb7b4f78 #1: WebJudge: failure. The agent never navigated to the actual Discogs submissions overview page for release submissions. It only loaded the homepage (blocked by Cloudflare) and a support article on datab
- **playwright-cli** · om2w-fc53ddd3 #1: WebJudge: failure. The agent never applied a persistent “excellent” filter for the open-box S25 Plus (filter only shows Open-Box without condition level), repeatedly bounced between search pages, and 
- **playwright-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered by departure port (Los Angeles), applied a minimum duration of 8 days (and included longer durations), and sorted results by lowest price, then selected
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent only navigated and refreshed the main UMich homepage repeatedly without locating or navigating to any UM-Dearborn giving/donation or gift information page. It did not find
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to the winter 2022–23 graduate‐level CHEM schedule view (filters for term and career applied), but it never used the site’s “days” or “time offered” fi
- **playwright-mcp** · om2w-323bd85e #1: WebJudge: failure. The agent navigated to the correct “Passenger Identification” page but never scrolled or dismissed the cookie banner to reveal the full list of acceptable IDs under “What is a Valid
- **playwright-mcp** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara US homepage multiple times and never selected the "Zara Home" category, clicked into "Rug", or applied a "Beige" color filter. No filters have b
- **playwright-mcp** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the best-cars and top-buys pages and found the first listing, but never clicked into that car’s detail page to retrieve the ownership cost. Without selecting 
- **playwright-mcp** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-mcp** · om2w-515f2e58 #1: WebJudge: failure. The agent never explicitly applied the “Internal” filter (drive type) and although it set New, Samsung, M.2 2280, and $25–$200, no actual internal Samsung M.2 SSD listings within th
- **playwright-mcp** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to IMDb and to the Prometheus title page, but did not access or display the “Crazy Credits” section for the movie. Thus it failed to show the crazy credits as re
- **playwright-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent only navigated to the Luna County land page and never applied filters for owner-financing, homesite land, or listings from the last 30 days. They also did not sort by chea
- **playwright-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent never applied all four required filters simultaneously. Although it repeatedly clicked size ranges, refresh rate, and price inputs, it ultimately navigated only to a QLED+
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent only retrieved information from a general pescatarian diet article and a comparison of vegetarian vs vegan vs pescatarian. It never identified or compared two distinct pes
- **playwright-mcp** · om2w-65c4030f #1: WebJudge: failure. The agent only navigated to the Mayo Clinic homepage multiple times without performing any search or applying the required filters (female, MD, cardiologist, Jacksonville). No physi
- **playwright-mcp** · om2w-75a1b5dc #1: WebJudge: failure. The agent never selected a specific beef sirloin recipe nor opened its reviews. It only navigated to the homepage and search page but did not identify a recipe or access its review 
- **playwright-mcp** · om2w-824eb7bb #1: WebJudge: failure. The agent navigated to the women’s black swimsuits collection and applied “price-ascending” sorting (key point 3). It selected size L options (key point 2). However, it added two di
- **playwright-mcp** · om2w-84f806c7 #1: WebJudge: failure. The agent never set the location to zip 10012, never applied a “nearest” sort or filter for nationwide bird shelters, and did not confirm any filtered results. It simply navigated t
- **playwright-mcp** · om2w-987bad7c #1: WebJudge: failure. The agent navigated to the used BMW 135 results but never applied the maximum price filter of $30,000. No seller info or seller’s notes were retrieved or displayed. Therefore the ta
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent only navigated to the UPS cost calculator page and did not enter the origin/destination addresses, package weight or dimensions, nor apply or select the fastest shipping o
- **playwright-mcp** · om2w-a5c87cc1 #1: WebJudge: failure. The agent only navigated to the AccuWeather homepage multiple times without searching for “Maine North, County Cork, Ireland,” selecting the SO2 pollutant parameter, or specifying t
- **playwright-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly set term=Fall 2023, subject=Computer Science, and course level=Graduate. It also attempted to filter days but toggled both “Tu” and “TuTh,” never isolating Tuesd
- **playwright-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only navigated to a general search page for “drip coffee maker” and did not apply any filters for “on sale,” price range $25–$60, or “black” finish. No filter selections, 
- **playwright-mcp** · om2w-c94551d2 #1: WebJudge: failure. The agent never applied the required filters—no zip code/location radius was set, no age filter (Young or Adult) was selected, and no sort-by-Oldest Addition was applied—so the task
- **playwright-mcp** · om2w-d1807551 #1: WebJudge: failure. The agent only navigated to the Super Lawyers homepage and Texas landing page without applying any filters or searching for Dallas, divorce practice area, or Top 50 Women Texas Supe
- **playwright-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s site, selected MacBook Air, opened the Tech Specs page, and filtered to the 13-inch (latest) model. However, it never retrieved or displayed
- **playwright-mcp** · om2w-f00e7acc #1: WebJudge: failure. The agent only navigated to the AccuWeather homepage and then to Boston’s general weather-forecast page, but never selected or displayed the hourly forecast for Boston. There is no 
- **playwright-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully located the climate news page (key point 1) but did not apply any “latest” filter or sorting control to ensure the articles are sorted by date (key point 2). 
- **playwright-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent did browse user homepages (Music Charts and Cooper L) and found a repost of “Pink Boy – Benny Boy (prod badlilcoup)” on Cooper L’s page, satisfying points 1 and 2. However
- **playwright-mcp** · om2w-fb7b4f78 #1: WebJudge: failure. The agent only navigated to the Discogs homepage multiple times and took snapshots there. No navigation to any submissions overview page (e.g., “Submit Releases” or similar) occurre
- **playwright-mcp** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered departures from Los Angeles, applied a duration filter of at least 8 days, sorted results by lowest price, and selected the first (cheapest) 8-day cruis
- **playwright-mcp-tuned** · om2w-180ed2ec #1: WebJudge: failure. The agent only navigated to the University of Michigan homepage multiple times and took snapshots, but never accessed any “Giving,” “Donate,” or UM-Dearborn specific page to find in
- **playwright-mcp-tuned** · om2w-3dca7cbe #1: WebJudge: failure. The agent only navigated to the Zara US homepage multiple times and took a snapshot but never selected the “Zara Home” category or navigated to “Rug,” nor did it apply the “beige” c
- **playwright-mcp-tuned** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “top buys” page (implicitly sorted by best), identified the first car (Renault 4 E-Tech Electric), and located the “Ownership cost” section, but never ext
- **playwright-mcp-tuned** · om2w-4c186c6e #1: WebJudge: failure. The agent navigated to the NBA homepage and shop page but never searched for "Devin Booker jersey," never filtered or selected size medium, and never added any jersey to the shoppin
- **playwright-mcp-tuned** · om2w-515f2e58 #1: WebJudge: failure. The agent applied brand (Samsung) and form factor (M.2 2280) correctly and even clicked a “New” condition button at one point, but the crucial price‐range filter was never set to th
- **playwright-mcp-tuned** · om2w-56f8890a #1: WebJudge: failure. The agent never navigated to the "Prometheus" title page on IMDb nor accessed the "Crazy Credits" section (e.g., /title/ttxxxxx/crazycredits). All actions returned to the homepage w
- **playwright-mcp-tuned** · om2w-59b7b990 #1: WebJudge: failure. The agent only navigated to the Luna County listings page but never applied filters for owner-financing or homesite land, never filtered by listings in the last 30 days, never sorte
- **playwright-mcp-tuned** · om2w-5dec0e66 #1: WebJudge: failure. The agent never applied an exact 33″–49″ size filter—by checking “31.5″–33.9″,” “34″–39.9″,” and “40″ or More,” it included sizes below 33″ and above 49″. The price filter ultimatel
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent navigated Healthline and located various relevant pages but never extracted or compared two distinct pescatarian diet plans, nor provided any comparison or recommendations
- **playwright-mcp-tuned** · om2w-65c4030f #1: WebJudge: failure. The agent navigated to the Mayo Clinic homepage and the “Find a Doctor” page but did not enter “Cardiologist,” set location to Jacksonville, FL, nor apply filters for MD degree or f
- **playwright-mcp-tuned** · om2w-7072d094 #1: WebJudge: failure. The agent correctly applied the “No Foreign Transaction Fee” filter and selected the first two personal cards (Platinum Card® and American Express® Gold Card) before clicking “Compa
- **playwright-mcp-tuned** · om2w-75a1b5dc #1: WebJudge: failure. The agent only navigated to the Allrecipes homepage multiple times, without searching for “beef sirloin,” selecting a recipe, or opening its reviews. Neither key point—choosing a be
- **playwright-mcp-tuned** · om2w-824eb7bb #1: WebJudge: failure. The agent did apply the “price-ascending” sort on the women’s black swimsuits, but instead of selecting the very first (cheapest) item it added two different items, and the final ca
- **playwright-mcp-tuned** · om2w-84f806c7 #1: WebJudge: failure. The agent only navigated to a search URL with kind=1 (likely dogs) and zip=10012. It never applied filters for animal shelters or birds, nor did it sort results by nearest, so key p
- **playwright-mcp-tuned** · om2w-9829f308 #1: WebJudge: failure. The agent never applied an explicit “newest game” filter (it only relied on the default scoreboard date) and, more importantly, never clicked the play button on the recap video—it o
- **playwright-mcp-tuned** · om2w-987bad7c #1: WebJudge: failure. The agent never applied the $30,000 max price filter on the used 2011 BMW 135 search results and did not open any listing to retrieve seller info or seller’s notes. Key points 2, 3,
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent never entered the shipment details (origin, destination, weight, dimensions) nor requested a quote, and no “fastest shipping” filter or result was applied or displayed. Re
- **playwright-mcp-tuned** · om2w-a5c87cc1 #1: WebJudge: failure. The agent never retrieved any SO2 air quality data for Maine North, County Cork, Ireland. It only navigated to the AccuWeather home page repeatedly and did not perform the necessary
- **playwright-mcp-tuned** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied filters for Fall 2023, graduate level, Computer Science, and days on Tuesday (including TuTh), but never selected the start‐time filter for 2:00 pm–6:00 
- **playwright-mcp-tuned** · om2w-c1d6ea6f #1: WebJudge: failure. The agent never applied the required filters for “on sale,” the $25–$60 price range, or black finish, nor did it display any filtered list of drip coffee makers. Therefore it failed
- **playwright-mcp-tuned** · om2w-c94551d2 #1: WebJudge: failure. The agent navigated to the pet adoption site and the cats-for-adoption search page but never applied the required filters—no ZIP code or 25-mile radius was set, no age filter for yo
- **playwright-mcp-tuned** · om2w-d1807551 #1: WebJudge: failure. The agent only navigated to the Super Lawyers homepage and took snapshots without performing any search or applying filters for Dallas location, divorce practice area, or the Top 50
- **playwright-mcp-tuned** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-f00e7acc #1: WebJudge: failure. The agent navigated to AccuWeather and reached the Boston forecast page but never selected or displayed the hourly forecast for Boston, so the key requirement to check the hourly fo
- **playwright-mcp-tuned** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point #2) but never applied or confirmed a “latest” sort or filter (key point #1). The snapshot shows no date‐based
- **playwright-mcp-tuned** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated through general and rock charts but never identified the actual top rock chart song or confirmed it was reposted by a user. It visited a user’s repost page but d
- **playwright-mcp-tuned** · om2w-fb7b4f78 #1: WebJudge: failure. The agent did navigate to the Discogs support article that covers “How Do I Add A Release” (which is the overview of submission of releases), but it never captured or displayed that
- **playwright-mcp-tuned** · om2w-fc53ddd3 #1: WebJudge: failure. The agent applied the “Open-Box” filter for the Samsung Galaxy S25 Plus but the snapshot shows “No results found,” so no price was obtained. The agent never applied or verified the 
- **stagehand** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly applied the Winter term and Graduate‐level filters and navigated to “Schedule for CHEM …” links, but never applied or confirmed filters for Monday afternoons (da
- **stagehand** · om2w-29b7372d #1: WebJudge: failure. The agent successfully accessed Google Finance and located the Microsoft stock page (steps 1–2). However, there is no evidence it scrolled to or identified the “Top news” section (s
- **stagehand** · om2w-47186fac #1: WebJudge: failure. The agent successfully navigated to the Parkers site, opened the “Best Cars” menu, selected the first car (Renault 4 E-Tech), and clicked the “Ownership cost” section. However, none
- **stagehand** · om2w-515f2e58 #1: WebJudge: failure. The agent correctly performed a search for “Samsung SSD,” applied the price range filter of \$25–\$200, set the drive to “Internal,” and selected “New” condition, but it never appli
- **stagehand** · om2w-59b7b990 #1: WebJudge: failure. The agent never applied any filters for Luna County, owner-financing homesite land, or listing timeframe (last 30 days). It also did not sort by cheapest per acre or contact the sel
- **stagehand** · om2w-5dec0e66 #1: WebJudge: failure. The agent only applied the QLED filter (and attempted a 240 Hz filter that didn’t stick, as shown by a 180 Hz result) and never set the 33"–49" size range nor the $1,000–$2,000 pric
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to multiple Healthline articles and extracted text but never synthesized or explicitly compared two distinct pescatarian diets with a focus on eating healthier. 
- **stagehand** · om2w-9829f308 #1: WebJudge: failure. The agent navigated to the NBA page and clicked the preloaded highlight (“Utah Jazz vs. Denver Nuggets”) but never applied or confirmed a “most recent” filter or sorting. There’s no
- **stagehand** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied filters for a used 2011 BMW 135 under $30,000 (stock_type=used, model=BMW-135, list_price_max=30000, year_min=2011, year_max=2011). It navigated to a veh
- **stagehand** · om2w-a5c87cc1 #1: WebJudge: failure. The agent never navigated to an air‐quality section for Maine North, County Cork nor selected the SO₂ pollutant or the past‐hour timeframe. All searches landed on Cork broadly, and 
- **stagehand** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied the “Fall 2023,” “Graduate,” “COMPSCI,” and “Tu” filters, but never successfully filtered out courses outside the 2:00–6:00 pm window. The final listing 
- **stagehand** · om2w-ba2a469a #1: WebJudge: failure. The agent successfully searched for “beginner computer science python” and clicked into a Python course. However, they did not apply any explicit filters to ensure the course was ta
- **stagehand** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only performed a basic search for “drip coffee maker” but never applied or confirmed the “On sale” filter, the $25–$60 price range, or the black finish filter. No snapshot
- **stagehand** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the homepage and cats-for-adoption page but never applied any of the required filters (zip code 94587 with 25-mile radius, age filter for young or adult 
- **stagehand** · om2w-d1807551 #1: WebJudge: failure. The agent navigated to a Dallas-based family law attorney’s profile (Liz Porter), confirming she practices in Dallas and handles divorces, but did not identify or confirm any inclus
- **stagehand** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s official MacBook Air Tech Specs page for the latest model (fulfilling source, product, and “newest” requirements). However, it only captured
- **stagehand** · om2w-f389398d #1: WebJudge: failure. The agent navigated to the site and clicked on the climate section, but never applied or confirmed a “latest” filter or sorted the news by date. There is no evidence the news result
- **stagehand** · om2w-fa9adb81 #1: WebJudge: failure. The agent never navigated to a user’s personal homepage or feed (key point 1), did not confirm any repost action by a specific user (key point 2), and failed to apply the Top 50 Roc
- **stagehand** · om2w-fc53ddd3 #1: WebJudge: failure. The agent never located an open-box Samsung Galaxy S25 Plus listing—only refurbished “Excellent” models—and did not apply the required open-box and “Excellent” filters. Although the
- **wdio-mcp** · om2w-070c907d #1: timeout after 10 min
- **wdio-mcp** · om2w-0a0fa834 #1: timeout after 10 min
- **wdio-mcp** · om2w-11abb668 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully navigated from the main UM site to the UM-Dearborn “Support Dreams in Practice” hero and located the “Give Now” button, but upon clicking it was taken to the 
- **wdio-mcp** · om2w-29b7372d #1: WebJudge: failure. The agent successfully used Google Finance and navigated to the Microsoft (MSFT) quote page, satisfying key points 1 and 2. However, it did not actually open or display the first to
- **wdio-mcp** · om2w-4c186c6e #1: WebJudge: failure. The agent navigated between nba.com, the store, and fanatics but never applied a size filter for “medium” nor selected a specific Devin Booker jersey or added it to the shopping car
- **wdio-mcp** · om2w-515f2e58 #1: WebJudge: failure. The agent repeatedly entered and adjusted filters (price $25–$200, brand=Samsung, form factor=M.2 2280, condition=New, internal) but never produced a final results page showing any 
- **wdio-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent navigated to the Luna County listings but never applied the owner-financing filter, the “listed in last 30 days” filter, or sorted by cheapest per acre, nor did it contact
- **wdio-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the 240 Hz refresh-rate, QLED panel-type, and $1,000–$2,000 price filters, but never set the required 33″–49″ screen-size filter (only partial size subra
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent navigated to an article on pescatarian diets and extracted generic content (variation and drawbacks) but never identified or contrasted two distinct pescatarian diet plans
- **wdio-mcp** · om2w-690d7b4a #1: WebJudge: failure. The agent correctly entered “iPhone X,” set the max_price to 400, and enabled “search titles only,” but it never successfully applied the “good” condition filter. None of the final 
- **wdio-mcp** · om2w-987bad7c #1: timeout after 10 min
- **wdio-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent successfully navigated the UPS rate-quote flow, entered the required origin (New York, NY 10001) and destination (Truckee, CA 96162), selected specific pickup/drop-off loc
- **wdio-mcp** · om2w-9ed38272 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-a5c87cc1 #1: WebJudge: failure. The agent located the SO₂ concentration on the AccuWeather air-quality page for Maine North, County Cork, Ireland, but only retrieved the “Current Air Quality” value (“0 µg/m³”) lab
- **wdio-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent never applied the required “Fall 2023,” “Graduate-level,” “Computer Science,” “Tuesdays,” and “2 PM–6 PM” filters in a coordinated UI search. Instead, it navigated to an a
- **wdio-mcp** · om2w-ba2a469a #1: WebJudge: failure. The agent did perform the search for “computer science python for beginners” and correctly applied the Level filter to “Beginner,” surfacing Python‐focused courses. However, it neve
- **wdio-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The action history only shows a general search for “drip coffee maker” on Google Shopping/Search with no application of the required “on sale” filter, no price range filter set to $
- **wdio-mcp** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the base cats-for-adoption page with a zip code but did not set the 25-mile radius, did not apply age filters for young or adult cats, nor did it sort by
- **wdio-mcp** · om2w-d1807551 #1: WebJudge: failure. The agent navigated to the Top 50 Women Texas Super Lawyers list but never filtered or confirmed any lawyer’s location in Dallas or their specific practice in divorce law. The snaps
- **wdio-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news page (Key Point 1) but did not apply or confirm any “sort by latest” filter or sorting option (Key Point 2). There is no visible
- **wdio-mcp** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-070c907d #1: timeout after 10 min
- **wdio-session** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly filtered for subject “CHEM,” term “Winter,” and career “Graduate,” but never used the UI’s “days” or “time offered” filters to restrict to Monday afternoons. Ins
- **wdio-session** · om2w-29b7372d #1: WebJudge: failure. The agent successfully opened Google Finance, searched for “Microsoft,” and located the News section showing news stories. However, there is no evidence of applying the “Top news” f
- **wdio-session** · om2w-442a450e #1: WebJudge: failure. The agent did locate and use an online 401(k)/403(b) calculator and correctly set the key inputs (age range 22–65, 3% return, $8,000 employee and employer contributions). However, n
- **wdio-session** · om2w-47186fac #1: WebJudge: failure. The agent never located or opened a "best cars" list on the site, nor explicitly selected its first entry. Instead it directly navigated to a Renault 4-E-Tech review and read its ow
- **wdio-session** · om2w-515f2e58 #1: WebJudge: failure. The agent successfully entered “M2 Samsung SSD internal,” applied the price filter of \$25–\$200, selected the Samsung brand, and narrowed to Internal SSDs. However, it never applie
- **wdio-session** · om2w-56f8890a #1: WebJudge: failure. The agent never navigated to or displayed the “Crazy Credits” section for Prometheus. It repeatedly encountered the human-verification page without solving it and did not reach the 
- **wdio-session** · om2w-59b7b990 #1: WebJudge: failure. The agent only opened and reloaded the LandWatch homepage, without applying any filters for owner‐financing or homesite, setting location to New Mexico/Luna County, filtering by las
- **wdio-session** · om2w-5dec0e66 #1: WebJudge: failure. The agent successfully searched “QLED gaming monitor 240hz,” applied the 240 Hz refresh-rate filter, set the $1000–$2000 price range, and selected size buckets covering 31.5″–33.9″,
- **wdio-session** · om2w-64b76158 #1: WebJudge: failure. The agent only browsed pescatarian diet pages and read sections, but never identified or compared two distinct pescatarian diet plans or assessed their relative healthiness. Key poi
- **wdio-session** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-987bad7c #1: timeout after 10 min
- **wdio-session** · om2w-c1d6ea6f #1: WebJudge: failure. The agent only performed a basic search for “drip coffee maker” on Google Shopping. There is no evidence of applying an “On sale” filter, setting the price range to $25–60, or filte
- **wdio-session** · om2w-c94551d2 #1: WebJudge: failure. The agent opened the search page with filters for distance=25 and age=young,adult, which matches location and age requirements, but it used “sort=recently_added” (newest first) rath
- **wdio-session** · om2w-d392e154 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s MacBook Air “Tech Specs” page (URL and title confirmed) and selected the MacBook Air model, which by default is the latest release. However,
- **wdio-session** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point 1) by clicking through News → Climate, as shown in the snapshots. However, there is no evidence of applying a
- **wdio-session** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to and browsed the user’s homepage and located a reposted track, satisfying key point #1. However, it never verified or demonstrated that this repos
- **wdio-session** · om2w-fc53ddd3 #1: WebJudge: failure. The agent never applied the “excellent” condition filter for open-box, selected the wrong S25 Plus (512 GB unlocked instead of open-box excellent), and did not initiate or calculate

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
