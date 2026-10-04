# Benchmark run 2026-10-04-run-37187821690: Online-Mind2Web

Produced by [workflow run #37187821690](https://github.com/webdriverio/benchmark/actions/runs/37187821690) on 2026-10-04 from commit [`5f0e278`](https://github.com/webdriverio/benchmark/commit/5f0e27860e8c5191e2bae7675c78f016153a211b). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37187821690) (kept 90 days).

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
| Duration | 299 min |

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
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 494k | $0.014 | 48% (24/50) | 118 s | 27.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 620k | $0.014 | 50% (25/50) | 107 s | 30 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 380k | $0.015 | 60% (30/50) | 110 s | 24.5 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.61 | 320k | $0.013 | 58% (29/50) | 121 s | 29.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.163 | 222k | $0.011 | 52% (26/50) | 136 s | 30 |
| `agent-browser`<br>agent-browser@0.38.2 | 638k | $0.018 | 50% (25/50) | 142 s | 35.5 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 418k | $0.013 | 50% (25/50) | 107 s | 29 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-d71be72a | 0/1 · 231k · 46s | 0/1 · 60k · 15s | 0/1 · 11k · 22s | 0/1 · 58k · 32s | 0/1 · 39k · 44s | 0/1 · 276k · 89s | 0/1 · 83k · 31s |
| om2w-f389398d | 0/1 · 149k · 37s | 0/1 · 113k · 33s | 0/1 · 193k · 28s | 0/1 · 74k · 31s | 0/1 · 87k · 92s | 0/1 · 477k · 91s | 0/1 · 229k · 61s |
| om2w-1b867afe | 1/1 · 1033k · 118s | 1/1 · 980k · 111s | 1/1 · 782k · 114s | 1/1 · 1473k · 144s | 1/1 · 776k · 186s | 1/1 · 2978k · 576s | 1/1 · 575k · 97s |
| om2w-fb7b4f78 | 1/1 · 1924k · 365s | 1/1 · 1633k · 315s | 1/1 · 37k · 20s | 1/1 · 141k · 123s | 0/1 · 71k · 54s | 1/1 · 1026k · 223s | 1/1 · 440k · 232s |
| om2w-9829f308 | 0/1 · 782k · 122s | 0/1 · 1059k · 85s | 0/1 · 1368k · 307s | 0/1 · 302k · 56s | 0/1 · 1963k · 296s | 0/1 · 0k · 600s | 0/1 · 1287k · 280s |
| om2w-824eb7bb | 0/1 · 0k · 600s | 1/1 · 3096k · 415s | 0/1 · 1664k · 336s | 0/1 · 1848k · 318s | 0/1 · 0k · 600s | 0/1 · 3963k · 300s | 0/1 · 0k · 600s |
| om2w-11abb668 | 1/1 · 2971k · 281s | 0/1 · 0k · 600s | 0/1 · 700k · 80s | 0/1 · 2077k · 345s | 1/1 · 356k · 88s | 1/1 · 1335k · 344s | 1/1 · 2169k · 395s |
| om2w-9d46ccb9 | 0/1 · 1142k · 216s | 0/1 · 1391k · 289s | 1/1 · 318k · 135s | 1/1 · 871k · 198s | 1/1 · 149k · 91s | 1/1 · 738k · 128s | 1/1 · 1087k · 212s |
| om2w-c1d6ea6f | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 3074k · 487s | 1/1 · 943k · 247s | 0/1 · 2289k · 426s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-65c4030f | 0/1 · 438k · 48s | 0/1 · 341k · 51s | 1/1 · 170k · 60s | 1/1 · 278k · 61s | 0/1 · 169k · 87s | 0/1 · 370k · 110s | 0/1 · 331k · 99s |
| om2w-442a450e | 0/1 · 293k · 41s | 0/1 · 1197k · 142s | 0/1 · 1781k · 184s | 1/1 · 1541k · 143s | 1/1 · 437k · 151s | 1/1 · 1996k · 127s | 0/1 · 267k · 52s |
| om2w-a6f0434c | 0/1 · 55k · 38s | 0/1 · 59k · 25s | 1/1 · 138k · 102s | 1/1 · 98k · 46s | 0/1 · 33k · 96s | 0/1 · 199k · 55s | 0/1 · 66k · 31s |
| om2w-a5c87cc1 | 0/1 · 873k · 223s | 0/1 · 1406k · 207s | 1/1 · 359k · 36s | 1/1 · 298k · 76s | 1/1 · 345k · 85s | 0/1 · 1840k · 155s | 1/1 · 332k · 89s |
| om2w-f00e7acc | 1/1 · 111k · 120s | 1/1 · 63k · 27s | 1/1 · 82k · 23s | 1/1 · 185k · 37s | 1/1 · 83k · 26s | 0/1 · 131k · 33s | 1/1 · 101k · 20s |
| om2w-987bad7c | 0/1 · 0k · 600s | 0/1 · 1167k · 599s | 1/1 · 889k · 116s | 0/1 · 1592k · 496s | 0/1 · 0k · 600s | 0/1 · 1178k · 129s | 0/1 · 1718k · 319s |
| om2w-29b7372d | 1/1 · 177k · 34s | 1/1 · 162k · 22s | 1/1 · 155k · 36s | 1/1 · 290k · 61s | 0/1 · 95k · 85s | 0/1 · 165k · 42s | 0/1 · 87k · 27s |
| om2w-75a1b5dc | 0/1 · 69k · 27s | 1/1 · 231k · 58s | 1/1 · 388k · 117s | 0/1 · 202k · 74s | 1/1 · 143k · 105s | 1/1 · 441k · 96s | 1/1 · 292k · 59s |
| om2w-4c186c6e | 0/1 · 3478k · 581s | 0/1 · 3828k · 522s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 1238k · 426s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-d392e154 | 1/1 · 1201k · 386s | 1/1 · 1960k · 358s | 1/1 · 830k · 181s | 0/1 · 1294k · 538s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 3798k · 548s |
| om2w-60cbbbd5 | 1/1 · 366k · 42s | 1/1 · 830k · 121s | 1/1 · 93k · 47s | 1/1 · 351k · 86s | 1/1 · 224k · 128s | 1/1 · 428k · 180s | 1/1 · 245k · 79s |
| om2w-64b76158 | 0/1 · 454k · 161s | 0/1 · 855k · 129s | 0/1 · 872k · 151s | 0/1 · 1124k · 277s | 0/1 · 0k · 600s | 0/1 · 1329k · 288s | 0/1 · 1478k · 259s |
| om2w-3dca7cbe | 1/1 · 1625k · 295s | 1/1 · 1310k · 252s | 1/1 · 494k · 193s | 1/1 · 619k · 109s | 1/1 · 335k · 159s | 1/1 · 911k · 74s | 1/1 · 2134k · 354s |
| om2w-59b7b990 | 0/1 · 1338k · 216s | 0/1 · 2101k · 192s | 0/1 · 2182k · 399s | 0/1 · 1695k · 320s | 1/1 · 685k · 342s | 1/1 · 1947k · 168s | 0/1 · 3910k · 474s |
| om2w-515f2e58 | 0/1 · 3917k · 543s | 0/1 · 3227k · 590s | 0/1 · 1658k · 283s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-84f806c7 | 0/1 · 546k · 134s | 1/1 · 1988k · 141s | 1/1 · 219k · 90s | 1/1 · 817k · 103s | 1/1 · 385k · 110s | 1/1 · 1148k · 133s | 0/1 · 330k · 85s |
| om2w-82eb3bfe | 1/1 · 2348k · 257s | 1/1 · 384k · 51s | 1/1 · 136k · 47s | 1/1 · 438k · 78s | 1/1 · 940k · 243s | 1/1 · 741k · 151s | 1/1 · 257k · 56s |
| om2w-b99c0296 | 1/1 · 842k · 113s | 1/1 · 444k · 79s | 0/1 · 586k · 161s | 0/1 · 513k · 225s | 0/1 · 612k · 115s | 1/1 · 937k · 181s | 0/1 · 1021k · 223s |
| om2w-d1807551 | 0/1 · 581k · 173s | 0/1 · 976k · 208s | 1/1 · 666k · 143s | 0/1 · 237k · 53s | 0/1 · 83k · 39s | 1/1 · 1828k · 208s | 0/1 · 1124k · 156s |
| om2w-ba2a469a | 1/1 · 146k · 28s | 1/1 · 342k · 59s | 0/1 · 222k · 59s | 1/1 · 595k · 87s | 1/1 · 407k · 112s | 1/1 · 473k · 105s | 1/1 · 684k · 72s |
| om2w-690d7b4a | 1/1 · 446k · 47s | 1/1 · 643k · 32s | 1/1 · 121k · 52s | 1/1 · 592k · 206s | 1/1 · 868k · 181s | 1/1 · 568k · 102s | 1/1 · 746k · 78s |
| om2w-c39d6c24 | 1/1 · 161k · 63s | 1/1 · 271k · 70s | 0/1 · 104k · 45s | 1/1 · 330k · 52s | 0/1 · 221k · 64s | 1/1 · 419k · 93s | 1/1 · 191k · 51s |
| om2w-c94551d2 | 0/1 · 0k · 600s | 1/1 · 2990k · 222s | 1/1 · 836k · 434s | 1/1 · 1536k · 548s | 0/1 · 2471k · 395s | 0/1 · 2873k · 500s | 0/1 · 647k · 522s |
| om2w-47186fac | 0/1 · 3561k · 504s | 0/1 · 1100k · 177s | 0/1 · 1169k · 231s | 0/1 · 2693k · 284s | 0/1 · 0k · 600s | 0/1 · 346k · 123s | 0/1 · 1364k · 109s |
| om2w-56f8890a | 1/1 · 104k · 48s | 1/1 · 85k · 56s | 1/1 · 81k · 43s | 1/1 · 527k · 84s | 0/1 · 65k · 44s | 0/1 · 434k · 103s | 1/1 · 117k · 69s |
| om2w-fa9adb81 | 0/1 · 689k · 138s | 0/1 · 667k · 97s | 0/1 · 373k · 78s | 0/1 · 310k · 118s | 0/1 · 429k · 134s | 0/1 · 689k · 62s | 0/1 · 210k · 66s |
| om2w-070c907d | 0/1 · 731k · 100s | 0/1 · 597k · 81s | 0/1 · 168k · 32s | 0/1 · 0k · 600s | 0/1 · 671k · 425s | 1/1 · 907k · 235s | 1/1 · 1567k · 132s |
| om2w-7680a920 | 1/1 · 413k · 65s | 0/1 · 283k · 110s | 1/1 · 254k · 55s | 1/1 · 123k · 64s | 1/1 · 310k · 138s | 1/1 · 612k · 172s | 1/1 · 557k · 62s |
| om2w-4c572a62 | 1/1 · 447k · 66s | 1/1 · 254k · 21s | 1/1 · 147k · 115s | 1/1 · 87k · 21s | 1/1 · 87k · 57s | 1/1 · 929k · 77s | 1/1 · 455k · 84s |
| om2w-fc53ddd3 | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 3502k · 574s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-ba01ea55 | 1/1 · 1134k · 102s | 1/1 · 1343k · 109s | 0/1 · 793k · 120s | 1/1 · 1161k · 151s | 1/1 · 1039k · 197s | 1/1 · 1352k · 220s | 0/1 · 4953k · 252s |
| om2w-0a0fa834 | 0/1 · 452k · 45s | 0/1 · 1120k · 68s | 1/1 · 1107k · 95s | 0/1 · 0k · 600s | 1/1 · 613k · 289s | 0/1 · 664k · 96s | 0/1 · 1602k · 176s |
| om2w-6ebde509 | 1/1 · 535k · 117s | 1/1 · 144k · 20s | 1/1 · 669k · 133s | 1/1 · 114k · 39s | 1/1 · 373k · 125s | 1/1 · 403k · 53s | 1/1 · 535k · 124s |
| om2w-9ed38272 | 1/1 · 579k · 83s | 0/1 · 1521k · 74s | 1/1 · 2329k · 307s | 1/1 · 1979k · 367s | 1/1 · 243k · 106s | 0/1 · 1838k · 151s | 1/1 · 1263k · 171s |
| om2w-5dec0e66 | 0/1 · 2157k · 453s | 0/1 · 1726k · 301s | 0/1 · 1043k · 273s | 0/1 · 601k · 303s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 1474k · 357s |
| om2w-b6d10e9b | 1/1 · 65k · 33s | 1/1 · 79k · 24s | 1/1 · 24k · 45s | 1/1 · 78k · 56s | 1/1 · 63k · 55s | 1/1 · 148k · 37s | 1/1 · 113k · 43s |
| om2w-7072d094 | 0/1 · 540k · 43s | 1/1 · 456k · 86s | 1/1 · 704k · 106s | 1/1 · 117k · 62s | 1/1 · 177k · 72s | 0/1 · 399k · 76s | 1/1 · 858k · 104s |
| om2w-323bd85e | 1/1 · 295k · 71s | 0/1 · 403k · 80s | 1/1 · 286k · 134s | 1/1 · 71k · 192s | 1/1 · 214k · 238s | 1/1 · 936k · 219s | 1/1 · 179k · 64s |
| om2w-27fa3ac2 | 1/1 · 715k · 55s | 1/1 · 422k · 105s | 1/1 · 480k · 78s | 1/1 · 358k · 57s | 0/1 · 492k · 243s | 0/1 · 993k · 54s | 0/1 · 395k · 77s |
| om2w-864244b6 | 1/1 · 241k · 44s | 1/1 · 244k · 21s | 1/1 · 215k · 62s | 1/1 · 128k · 38s | 1/1 · 189k · 46s | 1/1 · 281k · 35s | 1/1 · 146k · 26s |
| om2w-180ed2ec | 1/1 · 865k · 545s | 1/1 · 542k · 330s | 1/1 · 278k · 60s | 0/1 · 0k · 600s | 1/1 · 251k · 190s | 1/1 · 1583k · 396s | 0/1 · 0k · 600s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly applied the “Sail From: Los Angeles” and “Duration ≥ 8 days” filters via URL parameters, sorted results “Low to High,” and opened the itinerary page for the chea
- **agent-browser** · om2w-27fa3ac2 #1: WebJudge: failure. The agent never properly applied and confirmed all required filters (the “Graduate” career filter isn’t shown in the UI and the “Afternoon” time filter was dropped in a later URL), 
- **agent-browser** · om2w-29b7372d #1: WebJudge: failure. The agent successfully accessed Google Finance and opened the Microsoft (MSFT:NASDAQ) page, fulfilling steps 1 and 2. However, it never located or clicked on the “Top news” section 
- **agent-browser** · om2w-47186fac #1: WebJudge: failure. The task required applying a “highest” filter, selecting the first car in the filtered list, and then retrieving its ownership cost. The agent never applied or confirmed any filter 
- **agent-browser** · om2w-4c186c6e #1: timeout after 10 min
- **agent-browser** · om2w-515f2e58 #1: timeout after 10 min
- **agent-browser** · om2w-56f8890a #1: WebJudge: failure. The agent successfully located the “Crazy credits” section for Prometheus on IMDb (via the Wayback Machine) and identified the single crazy credit entry (“Previous Footage Property 
- **agent-browser** · om2w-5dec0e66 #1: timeout after 10 min
- **agent-browser** · om2w-64b76158 #1: WebJudge: failure. The agent browsed multiple pescatarian-related pages and XML feeds but never identified or compared two distinct pescatarian diets in terms of eating healthier. No clear comparison 
- **agent-browser** · om2w-65c4030f #1: WebJudge: failure. The agent searched for “Cardiologist” in Jacksonville, FL and clicked on two providers, but never applied a gender filter (female) or a degree filter (MD) using the site’s filtering
- **agent-browser** · om2w-7072d094 #1: WebJudge: failure. The agent correctly filtered by “No Foreign Transaction Fee,” selected the first two cards, and opened the compare view, showing Annual Fee and Welcome Offer side-by-side. However, 
- **agent-browser** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-9829f308 #1: timeout after 10 min
- **agent-browser** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied filters for used 2011 BMW 135, year 2011, and max price $30,000. It located listings and identified partial seller info (dealer names on listing banners)
- **agent-browser** · om2w-9ed38272 #1: WebJudge: failure. The agent correctly located and manipulated every input slider to exactly match the user’s parameters (age 30 → 65, \$30 000 start, 3 % return, 13 % current tax, 24 % retirement tax
- **agent-browser** · om2w-a5c87cc1 #1: WebJudge: failure. The agent successfully identified and navigated to the AccuWeather air‐quality page for Maine North, County Cork, and fetched the pollutant cards including the SO₂ card. However, th
- **agent-browser** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Yahoo Finance’s TSLA historical data page and even ran scripts to scrape the table, but it never extracted or reported the specific closing price fo
- **agent-browser** · om2w-c1d6ea6f #1: timeout after 10 min
- **agent-browser** · om2w-c94551d2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-d392e154 #1: timeout after 10 min
- **agent-browser** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to apple.com, clicked through to the MacBook Air page, selected the “Tech Specs” tab, and toggled between the 13″ and 15″ models. However, it never 
- **agent-browser** · om2w-f00e7acc #1: WebJudge: failure. The agent successfully navigated to the Boston hourly forecast page, but it never closed the privacy pop-up or scrolled/read the actual hourly forecast details (times, temperatures,
- **agent-browser** · om2w-f389398d #1: WebJudge: failure. The agent successfully located the climate news section and identified article URLs, but never applied or displayed a “latest” sort/filter in the UI. No filter by most recent date w
- **agent-browser** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully browsed the LoveMusic user homepage and navigated to the Reposts section, confirming the user reposted a rock track. However, there is no evidence that the re
- **agent-browser** · om2w-fc53ddd3 #1: timeout after 10 min
- **playwright-cli** · om2w-0a0fa834 #1: WebJudge: failure. The agent successfully applied the “Sail From Los Angeles” filter and sorted results low-to-high, then clicked into the first (cheapest) result and collected its onboard activities.
- **playwright-cli** · om2w-180ed2ec #1: timeout after 10 min
- **playwright-cli** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully opened the Stanford ExploreCourses site, filtered for Winter 2022–23 and chemistry courses, and switched to schedule view. However, it never applied a graduat
- **playwright-cli** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and opened the Microsoft (MSFT:NASDAQ) stock page (steps 1 and 2), but none of the provided snapshots or actions reveal the “News”
- **playwright-cli** · om2w-442a450e #1: WebJudge: failure. The agent navigated to the 401(k) calculator, correctly set all five input ranges to age 22, age 65, 3% return, $8,000 employee contribution, and $8,000 employer contribution. Howev
- **playwright-cli** · om2w-47186fac #1: WebJudge: failure. The agent correctly applied the “Best cars” filter, selected the first car (Renault 4 E-Tech), and navigated to the Ownership cost section, but never captured or displayed the actua
- **playwright-cli** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-cli** · om2w-515f2e58 #1: timeout after 10 min
- **playwright-cli** · om2w-59b7b990 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-64b76158 #1: WebJudge: failure. The agent only browsed various Healthline pages related to pescatarian and other diets, retrieved text snippets, but never explicitly compared two distinct pescatarian diet plans or
- **playwright-cli** · om2w-65c4030f #1: WebJudge: failure. The agent correctly searched for “cardiologist” in Jacksonville, FL and identified M.D. credentials, but never applied or confirmed a gender filter—relying instead on inferred gende
- **playwright-cli** · om2w-824eb7bb #1: timeout after 10 min
- **playwright-cli** · om2w-84f806c7 #1: WebJudge: failure. The agent correctly entered ZIP 10012, selected “Shelters and rescues,” and filtered “With: Birds,” then clicked Search. However, there is no evidence it applied a nationwide scope 
- **playwright-cli** · om2w-9829f308 #1: WebJudge: failure. The agent correctly navigated to the NBA scoreboard showing the most recent game (Sat Oct 3) and thus applied the “most recent NBA game” filter implicitly. However, despite searchin
- **playwright-cli** · om2w-987bad7c #1: WebJudge: failure. The agent correctly set all required filters (Used, BMW, Model 135, Year 2011, max price $30,000) and navigated to a matching listing, extracting the seller info (Sawnee Mountain Mo
- **playwright-cli** · om2w-a6f0434c #1: WebJudge: failure. The agent navigated to Tesla’s historical data page for the correct date range but never extracted or displayed the March 17, 2023 closing price. The only snapshot provided is the s
- **playwright-cli** · om2w-b99c0296 #1: WebJudge: failure. The agent did apply filters for Fall 2023, Computer Science, graduate level, and two start‐time ranges (2 pm–4 pm and 4 pm–6 pm). However, the resulting list still included a Monday
- **playwright-cli** · om2w-ba01ea55 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-cli** · om2w-c94551d2 #1: WebJudge: failure. The agent only navigated to the general cats-for-adoption page for zip 94587 but never applied the 25-mile radius filter, the age filter (Young or Adult), nor the “Oldest Addition” 
- **playwright-cli** · om2w-d1807551 #1: WebJudge: failure. The agent applied the first two filters (practice area “divorce” and location “Dallas, TX”) successfully but never confirmed or applied the third filter—membership in the “Top 50 Wo
- **playwright-cli** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to the Apple site, selected “MacBook Air,” clicked the “Tech Specs” tab, and reached the specs URL. However, no actual technical specifications (CPU
- **playwright-cli** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section, but never applied or confirmed a “Sort by latest” filter. Instead, it clicked the “Featured” tab and then opened an art
- **playwright-cli** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully browsed the user’s homepage and located the reposted track “Benny Boy (prod badlilcoup)”, satisfying steps 1 and 2. However, there is no evidence that this re
- **playwright-cli** · om2w-fc53ddd3 #1: timeout after 10 min
- **playwright-mcp** · om2w-070c907d #1: WebJudge: failure. The agent correctly entered “Pediatric Dentistry” and “90210” and ran the search, but never applied a 5-mile radius filter—results default to 10 miles. Its first profile (Dr. Nafisi
- **playwright-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent applied the “Duration” filter incorrectly by selecting both “6–9 Days” and “10+ Days,” which includes cruises shorter than 8 days (e.g., 6–7 days). It never applied a “che
- **playwright-mcp** · om2w-442a450e #1: WebJudge: failure. The agent successfully navigated to the 401(k) calculator and correctly entered age 22–65, 3% return, $8,000 employee and $8,000 employer contributions. However, there’s no recorded
- **playwright-mcp** · om2w-47186fac #1: WebJudge: failure. The agent did navigate to the “Best Cars” section and accessed the “Top Buys” list (steps 46, 48), and it selected the first car (Renault 4 E-Tech Electric) from that list. However,
- **playwright-mcp** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly navigated to Luna County, applied the Owner Financing, Homesite property type, and Past 30 days filters via the URL and filter clicks. However, it never applied 
- **playwright-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the 240 Hz refresh-rate filter and set the price range to $1,000–$2,000, but never applied a screen-size filter limiting results to 33″–49″ nor a display
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent never identified and compared two distinct pescatarian diet plans focused on eating healthier. Instead it visited a general pescatarian diet article and then navigated to 
- **playwright-mcp** · om2w-65c4030f #1: WebJudge: failure. The agent only searched by specialty (“Cardiologist”) and location (“Jacksonville, FL”) but never applied a gender filter or confirmed the doctor’s gender via the site’s filter inte
- **playwright-mcp** · om2w-7072d094 #1: WebJudge: failure. The agent correctly applied the “No Foreign Transaction Fee” filter and added the first two cards (American Express Gold Card and Delta SkyMiles® Gold Card) to the comparison tray. 
- **playwright-mcp** · om2w-75a1b5dc #1: WebJudge: failure. The agent never selected a specific recipe containing beef sirloin nor opened its reviews. It only navigated to the main and beef category pages without fulfilling either key point.
- **playwright-mcp** · om2w-824eb7bb #1: timeout after 10 min
- **playwright-mcp** · om2w-84f806c7 #1: WebJudge: failure. The agent did set the location to 10012 and filter for bird shelters, but never applied or confirmed a nationwide scope (it used a 50-mile radius) nor explicitly sorted or identifie
- **playwright-mcp** · om2w-9829f308 #1: WebJudge: failure. The agent correctly filtered to NBA content and selected the most recent game, but never located or played a “Recap” video—only highlights were clicked. It failed to fulfill the key
- **playwright-mcp** · om2w-987bad7c #1: timeout after 10 min
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to the UPS “Calculate Time and Cost” tool, entered origin (New York 10001), destination (Truckee 96162), package dimensions (4×4×4 in), and weight (5 l
- **playwright-mcp** · om2w-a5c87cc1 #1: WebJudge: failure. The agent never retrieved SO₂ data specifically for Maine North (key 258347) and instead ended up on the general Cork, County Cork page (key 207697). There is no clear indication th
- **playwright-mcp** · om2w-a6f0434c #1: WebJudge: failure. The agent successfully navigated to TSLA’s historical data page and applied the correct date range filter, and even ran a script to locate the “Mar 17, 2023” row. However, it never 
- **playwright-mcp** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-mcp** · om2w-c94551d2 #1: timeout after 10 min
- **playwright-mcp** · om2w-d1807551 #1: WebJudge: failure. The agent navigated to Dallas divorce lawyers and separately to the Top 50 Women Texas Super Lawyers list, but never intersected the two lists or confirmed a lawyer appearing in bot
- **playwright-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s official site, located and opened the “Tech Specs” page for the MacBook Air, and even toggled between the 13-inch and 15-inch models. Howeve
- **playwright-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section (“News → Climate”) confirming the climate filter was used (key point 1). However, it never applied or confirmed a “lates
- **playwright-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to the user’s homepage and located the reposted track. However, there is no evidence on the homepage that the reposted song is the #1 entry on the T
- **playwright-mcp** · om2w-fc53ddd3 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-070c907d #1: WebJudge: failure. The agent successfully searched for “Pediatric Dentist” in 90210 and even identified Dr. Lynn Lempert, DDS—a pediatric dentist in Beverly Hills (90211) which is within 5 miles. Howe
- **playwright-mcp-tuned** · om2w-0a0fa834 #1: WebJudge: failure. The agent did filter “Sail From” Los Angeles and sorted by price to get the cheapest, and it selected an 8-day cruise, but it did not ensure “at least 8 days” (only exactly 8 days w
- **playwright-mcp-tuned** · om2w-11abb668 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-323bd85e #1: WebJudge: failure. The agent located the Passenger Identification page and identified that Amtrak customers 18 and older must present government-issued photo ID under various scenarios, but it never r
- **playwright-mcp-tuned** · om2w-442a450e #1: WebJudge: failure. The agent successfully navigated to the 401(k) calculator and applied all required inputs (ages 22–65, 3% return, $8,000 employee and employer contributions). However, it never retr
- **playwright-mcp-tuned** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “best cars” list and identified the first car (“Renault 4 E-Tech”), but it never extracted or returned the specific “Ownership cost” value for that car. N
- **playwright-mcp-tuned** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-515f2e58 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly applied all required filters (New Mexico, Luna County, owner financing, homesite land, listed in the last 30 days) and sorted by lowest price per acre. It then n
- **playwright-mcp-tuned** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly set the 240 Hz refresh-rate filter and the \$1,000–\$2,000 price range, but it never applied a screen-size filter within 33–49″ nor explicitly selected a QLED di
- **playwright-mcp-tuned** · om2w-64b76158 #1: WebJudge: failure. The agent browsed multiple Healthline pages and collected links but never identified or compared two distinct pescatarian diets, nor did it assess which is healthier. It failed to s
- **playwright-mcp-tuned** · om2w-65c4030f #1: WebJudge: failure. The agent correctly applied the Jacksonville, FL location filter and searched for “Cardiology,” then selected an M.D. cardiologist. However, it never applied or confirmed a female‐g
- **playwright-mcp-tuned** · om2w-7680a920 #1: WebJudge: failure. The agent correctly navigated to the BabyCenter height predictor, selected girl/7 years, entered 4 ft, 55 lb, mom 5 ft 2 in, dad 5 ft 8 in, and clicked Calculate, satisfying all key
- **playwright-mcp-tuned** · om2w-9829f308 #1: WebJudge: failure. The agent navigated to a specific game’s video page and repeatedly clicked a play button tied to a Giannis highlights clip (data-video-id="50095775") rather than locating and playin
- **playwright-mcp-tuned** · om2w-987bad7c #1: WebJudge: failure. The agent applied a max price filter and model filter but never restricted results to the 2011 model year and never selected any specific listing to retrieve seller information or s
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to UPS’s shipping calculator, entered origin (New York, 10001), destination (Truckee, 96162), dimensions (4×4×4 in), and weight (5 lbs). However, it ne
- **playwright-mcp-tuned** · om2w-9ed38272 #1: WebJudge: failure. The agent only navigated to and used the Traditional IRA calculator, set all required parameters, and captured a chart for the Traditional IRA. It never selected or displayed a Roth
- **playwright-mcp-tuned** · om2w-a5c87cc1 #1: WebJudge: failure. The agent reached the AccuWeather air-quality page for Maine North but never extracted or displayed the specific SO₂ value for the past hour. Although it ran scripts to locate “SO 2
- **playwright-mcp-tuned** · om2w-a6f0434c #1: WebJudge: failure. The agent navigated to Yahoo Finance, accessed the Tesla page, and opened the historical data URL, but the provided snapshot only shows the summary page and “Historical Data” link w
- **playwright-mcp-tuned** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-d1807551 #1: WebJudge: failure. The agent successfully navigated to the Top 50 Women Texas Super Lawyers list and viewed individual profiles, but it never confirmed or displayed a specific Dallas‐based divorce law
- **playwright-mcp-tuned** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s MacBook Air “Tech Specs” page, which inherently displays the latest model, satisfying the “filter by latest” requirement without an explicit
- **playwright-mcp-tuned** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section, satisfying key point 1. However, there is no evidence of any “latest” sorting or filter being applied (key point 2). Th
- **playwright-mcp-tuned** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to a user homepage (soundcloud.com/octane-thebeast), opened the Reposts tab, and detected the repost link for “Magnitude” by Zatru. However, it neve
- **playwright-mcp-tuned** · om2w-fc53ddd3 #1: timeout after 10 min
- **stagehand** · om2w-070c907d #1: WebJudge: failure. The agent correctly entered “Pediatric Dentistry” and “90210” and retrieved search results showing pediatric dentists near that location, satisfying specialty and zip code criteria.
- **stagehand** · om2w-11abb668 #1: WebJudge: failure. The agent correctly entered ZIP code 30010 (step 1) and applied the “Apple Authorized Service Provider” filter (step 2). It also attempted to filter for “apple imacs” (step 3) by se
- **stagehand** · om2w-442a450e #1: WebJudge: failure. The agent successfully located and opened the 401(k) calculator, used the sliders to set the age span to 22–65, the rate of return to 3%, and both employee and employer contribution
- **stagehand** · om2w-47186fac #1: WebJudge: failure. The agent navigated to the “best cars” page and drilled into the “Top buys” list, assumed “Renault 4 E-Tech Electric” as the first car without verifying the list order, then navigat
- **stagehand** · om2w-4c186c6e #1: timeout after 10 min
- **stagehand** · om2w-515f2e58 #1: WebJudge: failure. The agent never managed to show a new Samsung internal M.2 SSD with a price filter of $25–$200. Although it applied “Internal,” “M.2 2280,” and “New,” it either did not apply the pr
- **stagehand** · om2w-59b7b990 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-5dec0e66 #1: WebJudge: failure. The agent did enter the query “QLED gaming monitor 240Hz” and set the price slider to $1000–$2000, but it never successfully applied or confirmed the critical Screen Size filter (33
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated through various Healthline and search result pages, fetched raw content and tables, but never synthesized or presented a comparison of two pescatarian diets
- **stagehand** · om2w-824eb7bb #1: WebJudge: failure. The agent correctly navigated to the women’s black swimsuits collection, implicitly set the color, and ultimately selected a large‐size variant and added it to the cart. However, at
- **stagehand** · om2w-9829f308 #1: WebJudge: failure. The agent did navigate to the NBA section and opened a recent game’s video page, but it never applied a “most recent” filter or sorted the full NBA schedule to ensure the absolutely
- **stagehand** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied the Fall 2023, Graduate level, Tuesday, and 2 pm–4 pm/4 pm–6 pm filters, and even selected the Computer Science subject (snapshot 8 shows “Search found 3
- **stagehand** · om2w-ba01ea55 #1: WebJudge: failure. The agent correctly navigated to Google Maps, searched for “hotels in Manhattan New York,” and applied the “Sort by → Rating” filter to surface the highest‐rated properties. However
- **stagehand** · om2w-ba2a469a #1: WebJudge: failure. The agent correctly searched for “beginner computer science python,” used the Beginner difficulty filter and the Computer Science topic filter, but never applied a specific filter t
- **stagehand** · om2w-c1d6ea6f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-c39d6c24 #1: WebJudge: failure. The agent navigated to Ahri’s skins carousel and attempted to click through to the last skin, but the final screenshot still shows the initial five skins (Snow Moon Ahri through Aft
- **stagehand** · om2w-d71be72a #1: WebJudge: failure. The agent navigated directly to the MacBook Air Tech Specs page on Apple’s site, which is indeed the specs for the current (latest) model, but never displayed or extracted any actua
- **stagehand** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the News section and clicked the “Climate” tab, satisfying the requirement to find climate news. However, at no point did it locate or apply a “S
- **stagehand** · om2w-fa9adb81 #1: WebJudge: failure. The agent navigated to the Top 50 Rock chart and then to various track and repost pages, ultimately landing on the LoveMusic user profile which shows a reposted rock track. However,
- **stagehand** · om2w-fc53ddd3 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-070c907d #1: timeout after 10 min
- **wdio-mcp** · om2w-0a0fa834 #1: timeout after 10 min
- **wdio-mcp** · om2w-11abb668 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-180ed2ec #1: timeout after 10 min
- **wdio-mcp** · om2w-47186fac #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-4c186c6e #1: timeout after 10 min
- **wdio-mcp** · om2w-515f2e58 #1: timeout after 10 min
- **wdio-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly applied the owner-financing, Luna County, homesite, and “last 30 days” filters and sorted by price per acre low-to-high. However, when selecting a property to co
- **wdio-mcp** · om2w-5dec0e66 #1: WebJudge: failure. The agent correctly applied the 240 Hz and $1 000–$2 000 filters and used the search query for “33 to 49 inch QLED gaming monitor 240Hz,” but it never used explicit facet filters fo
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent browsed various Healthline pages about the pescatarian diet and related diets but never identified two distinct pescatarian diet plans or extracted their features for side
- **wdio-mcp** · om2w-75a1b5dc #1: WebJudge: failure. The agent correctly located a beef sirloin recipe and identified the “523 REVIEWS” link, but never actually clicked that link to reveal the review content. Instead it merely scrolle
- **wdio-mcp** · om2w-824eb7bb #1: WebJudge: failure. The agent correctly navigated to the Women’s Black Swimsuits category, applied the “Size: L” and “In stock” filters, and sorted by “Price – Low to High.” However, instead of selecti
- **wdio-mcp** · om2w-9829f308 #1: WebJudge: failure. The agent played a highlight from an October 3, 2026, preseason game without selecting or filtering for the most recent NBA game. The “most recent” date tab (e.g. Oct 6) was never c
- **wdio-mcp** · om2w-987bad7c #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied all required filters—Fall 2023 term, Computer Science department, graduate level, Tuesday (“Tu”) days, and two time ranges covering 2 pm–4 pm and 4 pm–6 
- **wdio-mcp** · om2w-d1807551 #1: WebJudge: failure. The agent only navigated to the Top 50 Women Texas Super Lawyers list and viewed “Family Law” but never applied or confirmed a Dallas location filter or explicitly identified a divo
- **wdio-mcp** · om2w-d392e154 #1: WebJudge: failure. The agent successfully selected a Best Buy gift card, chose the $100 denomination, and added it to the cart. However, there is no evidence that the occasion was explicitly set to “B
- **wdio-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent successfully accessed the Apple website and navigated to the MacBook Air Tech Specs page, but never applied a “sort by newest” filter (or demonstrated selecting the latest
- **wdio-mcp** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section (“Featured Climate News”), addressing the “find” action and “topic” requirements. However, there is no evidence that a “
- **wdio-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent never navigated to a user homepage showing that someone reposted the #1 track from the Top 50 Rock chart. It only viewed the chart playlist and the track page itself, clic
- **wdio-mcp** · om2w-fc53ddd3 #1: timeout after 10 min
- **wdio-session** · om2w-070c907d #1: WebJudge: failure. The agent correctly entered “Pediatric Dentist” and “90210,” performed the search, and even opened a provider profile whose address is within 5 miles of 90210. However, it never use
- **wdio-session** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to Stanford’s ExploreCourses, filtered for chemistry courses in Winter 2022–2023, and programmatically clicked through schedules for graduate-level (20
- **wdio-session** · om2w-29b7372d #1: WebJudge: failure. The agent opened Google Finance, searched for “Microsoft,” and clicked the News tab, but never clicked or viewed the first top news article for Microsoft stock. It only captured sna
- **wdio-session** · om2w-47186fac #1: timeout after 10 min
- **wdio-session** · om2w-515f2e58 #1: timeout after 10 min
- **wdio-session** · om2w-56f8890a #1: WebJudge: failure. The agent navigated to the Prometheus title page and even to the mobile version, but there’s no clear evidence it clicked the “Crazy credits” link or displayed that content. The sna
- **wdio-session** · om2w-5dec0e66 #1: timeout after 10 min
- **wdio-session** · om2w-64b76158 #1: timeout after 10 min
- **wdio-session** · om2w-65c4030f #1: WebJudge: failure. The agent applied filters for specialty (“Cardiologist”) and location (“Jacksonville, FL”) and displayed 39 results, but never applied or confirmed a gender filter for female. Visit
- **wdio-session** · om2w-824eb7bb #1: timeout after 10 min
- **wdio-session** · om2w-9829f308 #1: WebJudge: failure. The agent navigated through ESPN’s NBA pages and even clicked on video thumbnails, but it only located and played a highlight clip (“Giannis Antetokounmpo highlights vs. Raptors”) r
- **wdio-session** · om2w-987bad7c #1: timeout after 10 min
- **wdio-session** · om2w-a6f0434c #1: WebJudge: failure. The agent never navigated to the “Historical Data” tab nor applied any date filter for March 17, 2023, and no closing price for that date was retrieved or displayed. It only remaine
- **wdio-session** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly set the term (Fall 2023), subject (Computer Science), and course level (Graduate), and even applied the two time-block filters (2:00–4:00 pm and 4:00–6:00 pm). H
- **wdio-session** · om2w-c1d6ea6f #1: WebJudge: failure. The agent never applied explicit filters to restrict results to sale items within the $25–60 range or selected the price‐range and “on sale” checkboxes. It only performed keyword se
- **wdio-session** · om2w-c39d6c24 #1: WebJudge: failure. The agent correctly navigated to Ahri’s champion page and located the skins carousel, but it only displayed the first five skins and mistakenly treated “After Hours Spirit Blossom S
- **wdio-session** · om2w-c94551d2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-d1807551 #1: WebJudge: failure. The agent successfully located a Dallas-based family/divorce lawyer (Jennifer Stanton Hargrave), satisfying location and specialization. However, it did not apply any filter or prov
- **wdio-session** · om2w-d392e154 #1: timeout after 10 min
- **wdio-session** · om2w-d71be72a #1: WebJudge: failure. The agent correctly navigated to Apple’s official MacBook Air Tech Specs page and opened the correct model selection, but none of the actual technical specifications (processor deta
- **wdio-session** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section (key point 1) and opened an article, but never applied or confirmed a “sort by latest” filter on the list of climate art
- **wdio-session** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to and displayed the user’s homepage and confirmed that the user (“Terrified”) had reposted the track “Benny Boy (prod badlilcoup).” However, there 
- **wdio-session** · om2w-fb7b4f78 #1: WebJudge: failure. The agent navigated to various pages but never clearly landed on a Discogs-hosted “overview of the submission of releases” page. It briefly visited https://www.discogs.com/docs/rele
- **wdio-session** · om2w-fc53ddd3 #1: timeout after 10 min

## Environment

| Setup | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `playwright-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-mcp-tuned` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `stagehand` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-mcp` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `wdio-session` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `agent-browser` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |
| `playwright-cli` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.57 |

Each setup ran in its own job on a fresh runner, in parallel with the others.
