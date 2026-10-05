# Benchmark run 2026-10-05-run-37268732268: Online-Mind2Web

Produced by [workflow run #37268732268](https://github.com/webdriverio/benchmark/actions/runs/37268732268) on 2026-10-05 from commit [`69c22cf`](https://github.com/webdriverio/benchmark/commit/69c22cf0bc492d996a6bd031cfbd17906467264a). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37268732268) (kept 90 days).

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
| `wdio-mcp` | WebdriverIO MCP | [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) | [`4.0.0-dev.64`](https://www.npmjs.com/package/@wdio/mcp/v/4.0.0-dev.64) | ran |
| `wdio-session` | WebdriverIO session | [`@wdio/cli`](https://www.npmjs.com/package/@wdio/cli) | [`10.0.0-alpha.175`](https://www.npmjs.com/package/@wdio/cli/v/10.0.0-alpha.175) | ran |
| `agent-browser` | agent-browser | [`agent-browser`](https://www.npmjs.com/package/agent-browser) | [`0.38.2`](https://www.npmjs.com/package/agent-browser/v/0.38.2) | ran |
| `playwright-cli` | Playwright CLI | [`@playwright/cli`](https://www.npmjs.com/package/@playwright/cli) | [`0.1.22`](https://www.npmjs.com/package/@playwright/cli/v/0.1.22) | ran |

## Results

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 363k | $0.177 | 32% (16/50) | 74 s | 16 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 284k | $0.165 | 36% (18/50) | 76 s | 14 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 549k | $0.216 | 60% (30/50) | 105 s | 26 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0-dev.64 | 241k | $0.107 | 52% (26/50) | 73 s | 18.5 |
| `wdio-session`<br>@wdio/cli@10.0.0-alpha.175 | 306k | $0.128 | 54% (27/50) | 109 s | 20 |
| `agent-browser`<br>agent-browser@0.38.2 | 1116k | $0.355 | 48% (24/50) | 127 s | 32.5 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 680k | $0.259 | 40% (20/50) | 119 s | 26.5 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-bf3b311c | 1/1 · 429k · 78s | 1/1 · 290k · 32s | 1/1 · 1222k · 84s | 1/1 · 280k · 74s | 0/1 · 138k · 48s | 1/1 · 784k · 67s | 1/1 · 433k · 69s |
| om2w-bb314cb8 | 0/1 · 814k · 135s | 0/1 · 492k · 89s | 1/1 · 275k · 42s | 1/1 · 138k · 39s | 1/1 · 143k · 47s | 0/1 · 1201k · 301s | 0/1 · 470k · 117s |
| om2w-a96fca87 | 1/1 · 1128k · 74s | 1/1 · 256k · 44s | 1/1 · 882k · 102s | 1/1 · 268k · 52s | 1/1 · 391k · 75s | 1/1 · 960k · 77s | 1/1 · 426k · 73s |
| om2w-3443e9c3 | 1/1 · 1049k · 63s | 1/1 · 533k · 43s | 1/1 · 458k · 93s | 1/1 · 140k · 71s | 1/1 · 201k · 68s | 1/1 · 764k · 55s | 0/1 · 482k · 82s |
| om2w-905cb530 | 0/1 · 33k · 11s | 1/1 · 3238k · 174s | 1/1 · 2114k · 172s | 0/1 · 50k · 19s | 0/1 · 79k · 26s | 0/1 · 4289k · 296s | 0/1 · 169k · 40s |
| om2w-a172a5d9 | 0/1 · 51k · 24s | 0/1 · 59k · 19s | 0/1 · 137k · 25s | 1/1 · 426k · 96s | 1/1 · 113k · 102s | 1/1 · 1877k · 414s | 1/1 · 596k · 129s |
| om2w-47e314cc | 0/1 · 2613k · 251s | 0/1 · 1322k · 101s | 0/1 · 5532k · 292s | 0/1 · 2798k · 216s | 0/1 · 3649k · 463s | 0/1 · 1595k · 120s | 0/1 · 3950k · 249s |
| om2w-aa4b5cb7 | 0/1 · 539k · 85s | 0/1 · 227k · 114s | 1/1 · 687k · 85s | 0/1 · 197k · 57s | 1/1 · 380k · 128s | 0/1 · 1320k · 116s | 0/1 · 397k · 75s |
| om2w-b64f938a | 0/1 · 299k · 72s | 0/1 · 725k · 99s | 0/1 · 1941k · 276s | 0/1 · 1499k · 292s | 0/1 · 141k · 91s | 0/1 · 2575k · 233s | 0/1 · 2137k · 224s |
| om2w-ade4c09a | 1/1 · 161k · 44s | 0/1 · 72k · 29s | 1/1 · 81k · 33s | 1/1 · 90k · 50s | 0/1 · 104k · 56s | 0/1 · 285k · 51s | 1/1 · 288k · 65s |
| om2w-43a1ca25 | 0/1 · 3045k · 160s | 0/1 · 4570k · 194s | 0/1 · 996k · 143s | 0/1 · 54k · 23s | 0/1 · 79k · 26s | 0/1 · 2115k · 178s | 0/1 · 2952k · 210s |
| om2w-e9f4dfc6 | 0/1 · 922k · 86s | 0/1 · 913k · 79s | 0/1 · 689k · 97s | 0/1 · 63k · 23s | 0/1 · 56k · 25s | 1/1 · 2109k · 176s | 1/1 · 3993k · 213s |
| om2w-9f1cba61 | 1/1 · 496k · 58s | 1/1 · 626k · 69s | 0/1 · 0k · 600s | 1/1 · 182k · 66s | 1/1 · 604k · 271s | 1/1 · 1406k · 132s | 1/1 · 265k · 52s |
| om2w-a8b9edd5 | 0/1 · 71k · 34s | 0/1 · 79k · 41s | 1/1 · 774k · 80s | 0/1 · 49k · 19s | 1/1 · 372k · 123s | 1/1 · 844k · 112s | 1/1 · 1031k · 156s |
| om2w-52efbab5 | 1/1 · 62k · 26s | 1/1 · 51k · 23s | 1/1 · 117k · 21s | 1/1 · 45k · 24s | 1/1 · 121k · 52s | 1/1 · 235k · 36s | 1/1 · 78k · 33s |
| om2w-c801d1c9 | 0/1 · 1477k · 158s | 1/1 · 1599k · 97s | 1/1 · 252k · 159s | 0/1 · 859k · 143s | 0/1 · 3455k · 379s | 0/1 · 3455k · 323s | 1/1 · 3491k · 336s |
| om2w-7b182a50 | 0/1 · 126k · 63s | 0/1 · 131k · 63s | 1/1 · 316k · 173s | 1/1 · 641k · 118s | 1/1 · 291k · 88s | 1/1 · 1739k · 167s | 1/1 · 1122k · 78s |
| om2w-f2097f92 | 1/1 · 502k · 126s | 1/1 · 1492k · 206s | 1/1 · 104k · 71s | 1/1 · 167k · 147s | 1/1 · 412k · 107s | 1/1 · 665k · 199s | 1/1 · 542k · 177s |
| om2w-8103786e | 0/1 · 153k · 88s | 0/1 · 120k · 94s | 1/1 · 321k · 45s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 419k · 49s | 1/1 · 602k · 80s |
| om2w-63d6866f | 0/1 · 2519k · 235s | 0/1 · 3479k · 264s | 0/1 · 606k · 145s | 1/1 · 682k · 213s | 0/1 · 1447k · 234s | 0/1 · 1018k · 101s | 0/1 · 2500k · 199s |
| om2w-c3a33396 | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 549k · 171s | 0/1 · 0k · 600s | 0/1 · 1272k · 390s | 0/1 · 2904k · 306s | 0/1 · 1559k · 335s |
| om2w-95cad96f | 1/1 · 89k · 29s | 1/1 · 157k · 34s | 1/1 · 221k · 133s | 1/1 · 52k · 45s | 0/1 · 99k · 89s | 1/1 · 105k · 30s | 0/1 · 116k · 27s |
| om2w-92a3d423 | 1/1 · 204k · 38s | 1/1 · 229k · 56s | 1/1 · 775k · 127s | 1/1 · 119k · 49s | 1/1 · 125k · 56s | 1/1 · 456k · 70s | 0/1 · 192k · 53s |
| om2w-d9d8b7d8 | 0/1 · 93k · 26s | 0/1 · 92k · 24s | 0/1 · 105k · 26s | 1/1 · 141k · 88s | 0/1 · 140k · 45s | 0/1 · 158k · 26s | 0/1 · 161k · 35s |
| om2w-330cd04c | 1/1 · 547k · 70s | 1/1 · 780k · 89s | 1/1 · 559k · 222s | 1/1 · 180k · 47s | 1/1 · 368k · 67s | 1/1 · 654k · 64s | 1/1 · 1217k · 118s |
| om2w-2fc51dd3 | 0/1 · 1029k · 118s | 0/1 · 772k · 111s | 1/1 · 975k · 236s | 1/1 · 265k · 102s | 1/1 · 401k · 130s | 1/1 · 1031k · 95s | 1/1 · 764k · 108s |
| om2w-47bfe8a7 | 0/1 · 125k · 60s | 0/1 · 107k · 55s | 0/1 · 51k · 57s | 0/1 · 130k · 32s | 0/1 · 185k · 69s | 0/1 · 295k · 130s | 0/1 · 638k · 120s |
| om2w-b9225088 | 1/1 · 1000k · 99s | 1/1 · 861k · 73s | 1/1 · 839k · 115s | 1/1 · 183k · 41s | 1/1 · 747k · 132s | 1/1 · 915k · 95s | 1/1 · 1067k · 83s |
| om2w-6ca20f1d | 0/1 · 135k · 24s | 0/1 · 149k · 30s | 0/1 · 171k · 39s | 0/1 · 119k · 35s | 1/1 · 161k · 53s | 0/1 · 300k · 43s | 0/1 · 256k · 43s |
| om2w-5d542a7e | 0/1 · 199k · 130s | 0/1 · 143k · 83s | 0/1 · 50k · 33s | 0/1 · 913k · 160s | 1/1 · 690k · 367s | 0/1 · 1382k · 198s | 0/1 · 606k · 196s |
| om2w-bb518416 | 1/1 · 3688k · 188s | 1/1 · 1320k · 161s | 1/1 · 980k · 185s | 1/1 · 275k · 73s | 1/1 · 364k · 154s | 0/1 · 4475k · 254s | 1/1 · 1819k · 165s |
| om2w-a11ecdff | 1/1 · 186k · 37s | 1/1 · 277k · 37s | 1/1 · 163k · 50s | 1/1 · 87k · 26s | 1/1 · 119k · 48s | 1/1 · 267k · 49s | 1/1 · 262k · 43s |
| om2w-dcd26e66 | 0/1 · 1741k · 133s | 1/1 · 4225k · 202s | 1/1 · 1365k · 104s | 0/1 · 754k · 199s | 0/1 · 959k · 261s | 0/1 · 2114k · 123s | 0/1 · 3684k · 209s |
| om2w-8689af4d | 0/1 · 585k · 62s | 0/1 · 592k · 55s | 1/1 · 206k · 27s | 1/1 · 265k · 41s | 1/1 · 241k · 66s | 0/1 · 579k · 55s | 0/1 · 476k · 79s |
| om2w-07ec4a12 | 0/1 · 70k · 38s | 0/1 · 116k · 47s | 1/1 · 969k · 130s | 0/1 · 128k · 40s | 1/1 · 308k · 288s | 1/1 · 541k · 143s | 0/1 · 694k · 186s |
| om2w-d1970c16 | 0/1 · 479k · 54s | 0/1 · 342k · 38s | 0/1 · 3218k · 166s | 0/1 · 791k · 150s | 0/1 · 722k · 185s | 0/1 · 6671k · 249s | 0/1 · 3248k · 202s |
| om2w-461ab9b0 | 1/1 · 427k · 73s | 0/1 · 776k · 89s | 1/1 · 3293k · 189s | 0/1 · 658k · 174s | 1/1 · 821k · 251s | 1/1 · 3207k · 212s | 1/1 · 1150k · 150s |
| om2w-547f5729 | 0/1 · 51k · 20s | 0/1 · 69k · 24s | 0/1 · 60k · 65s | 0/1 · 149k · 49s | 0/1 · 244k · 116s | 0/1 · 732k · 85s | 0/1 · 453k · 124s |
| om2w-da8f3823 | 0/1 · 6001k · 378s | 0/1 · 874k · 82s | 0/1 · 745k · 102s | 0/1 · 596k · 95s | 0/1 · 201k · 63s | 0/1 · 2199k · 132s | 0/1 · 2730k · 267s |
| om2w-3ef64f34 | 1/1 · 1198k · 163s | 1/1 · 1879k · 276s | 1/1 · 1164k · 156s | 1/1 · 454k · 77s | 0/1 · 946k · 233s | 1/1 · 2121k · 180s | 0/1 · 1491k · 269s |
| om2w-9d09bc94 | 0/1 · 61k · 22s | 0/1 · 90k · 52s | 0/1 · 217k · 63s | 1/1 · 424k · 95s | 1/1 · 67k · 48s | 1/1 · 636k · 70s | 0/1 · 500k · 145s |
| om2w-1c3b747a | 0/1 · 1047k · 75s | 0/1 · 1063k · 102s | 0/1 · 404k · 106s | 1/1 · 969k · 119s | 1/1 · 1165k · 163s | 1/1 · 3831k · 182s | 0/1 · 868k · 83s |
| om2w-f05e87c5 | 0/1 · 139k · 37s | 0/1 · 162k · 29s | 0/1 · 87k · 24s | 0/1 · 67k · 25s | 1/1 · 160k · 48s | 0/1 · 296k · 43s | 0/1 · 176k · 51s |
| om2w-a0a18ca6 | 0/1 · 174k · 123s | 0/1 · 105k · 102s | 0/1 · 548k · 201s | 0/1 · 2200k · 336s | 0/1 · 658k · 185s | 0/1 · 3886k · 393s | 0/1 · 5618k · 310s |
| om2w-783ce6a3 | 0/1 · 127k · 90s | 0/1 · 88k · 41s | 1/1 · 330k · 47s | 1/1 · 217k · 55s | 0/1 · 303k · 66s | 0/1 · 346k · 61s | 0/1 · 666k · 96s |
| om2w-f2be37a9 | 1/1 · 1145k · 109s | 1/1 · 1384k · 104s | 1/1 · 1039k · 149s | 1/1 · 594k · 112s | 1/1 · 685k · 149s | 1/1 · 2370k · 250s | 0/1 · 1334k · 102s |
| om2w-6b2cfae0 | 0/1 · 174k · 94s | 0/1 · 107k · 50s | 0/1 · 2380k · 455s | 0/1 · 3012k · 515s | 0/1 · 0k · 600s | 0/1 · 2649k · 402s | 0/1 · 4546k · 559s |
| om2w-75146b7b | 0/1 · 126k · 64s | 0/1 · 142k · 85s | 1/1 · 1451k · 267s | 0/1 · 2568k · 222s | 1/1 · 1018k · 199s | 1/1 · 2549k · 225s | 1/1 · 5067k · 282s |
| om2w-271b36ef | 0/1 · 2750k · 266s | 1/1 · 695k · 161s | 1/1 · 265k · 122s | 1/1 · 685k · 218s | 0/1 · 1336k · 244s | 0/1 · 3138k · 465s | 0/1 · 1381k · 257s |
| om2w-48c73f3f | 0/1 · 33k · 13s | 0/1 · 68k · 27s | 1/1 · 329k · 50s | 0/1 · 335k · 54s | 1/1 · 336k · 111s | 1/1 · 924k · 76s | 1/1 · 532k · 77s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-271b36ef #1: WebJudge: failure. The agent did correctly search for “8K Samsung TV” and located the Condition filter panel. It then applied the “Open-Box” filter (steps 28, 46). However, there is no evidence in the
- **agent-browser** · om2w-43a1ca25 #1: WebJudge: failure. The agent searched for “Neurosurgeon” and even drilled into a provider profile, but never applied an “age over 50” filter nor confirmed an “appointment available tomorrow” filter or
- **agent-browser** · om2w-47bfe8a7 #1: WebJudge: failure. The agent’s action history only shows repeated attempts to open versus.com and its smartphone section but never identifies or filters Xiaomi smartphones, never determines the first 
- **agent-browser** · om2w-47e314cc #1: WebJudge: failure. The agent correctly applied the “Permits” filter and sorted results by price, and the first item listed is “Ruby Horsethief Canyon Permits,” indicating it is the cheapest paddling p
- **agent-browser** · om2w-547f5729 #1: WebJudge: failure. The agent opened Apartments.com and even navigated to a 3-bedrooms-2-bathrooms NYC page, but never selected the “condos” category and never applied the $1500–$2500 price filter. Non
- **agent-browser** · om2w-5d542a7e #1: WebJudge: failure. The agent never applied a citation‐count sort or confirmed filtering strictly to CVPR 2022 main‐conference papers. Instead, it fetched individual paper records via Semantic Scholar 
- **agent-browser** · om2w-63d6866f #1: WebJudge: failure. The agent never applied a “highest popularity” filter or sort on Hong Kong attractions. It directly selected Hong Kong Disneyland without verifying it as the most popular. Although 
- **agent-browser** · om2w-6b2cfae0 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-6ca20f1d #1: WebJudge: failure. The agent successfully located the official “Child Benefit” page and navigated to the three required sections (“How it works,” “Who can get Child Benefit,” and “Make a claim”). Howe
- **agent-browser** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College of Medicine and Science site, applied the “Florida” campus-location and “Internship” program-type filters, and confirmed tha
- **agent-browser** · om2w-8103786e #1: WebJudge: failure. The agent did navigate to the “view possible causes” page and displayed a list of conditions (Angina, Heart attack, Panic attacks and panic disorder), but there’s no clear evidence 
- **agent-browser** · om2w-8689af4d #1: WebJudge: failure. The agent correctly navigated to the refurbished iPad Air page and applied the “Price: Low to High” sort. However, it never applied a storage filter for 256 GB, and no item was adde
- **agent-browser** · om2w-905cb530 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-a0a18ca6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent successfully navigated to IGN, set the category filter to “Board” and the score filter to “10,” and even opened a board game review with a 10 rating. However, it never ena
- **agent-browser** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the FlightAware AeroAPI tiers page and captured screenshots showing the three plan tiers and their high-level feature sets, but it never extracted or displaye
- **agent-browser** · om2w-b64f938a #1: WebJudge: failure. The agent never succeeded in bypassing the “Quick verification” interstitial to actually view any frozen vegetarian cheese pizza results. Although it programmatically invoked a pric
- **agent-browser** · om2w-bb314cb8 #1: WebJudge: failure. The agent navigated to ICLR 2016 pages and opened the general videolectures list, but never applied a “Best Paper Award” filter on the video recordings page, nor explicitly filtered
- **agent-browser** · om2w-bb518416 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-c3a33396 #1: WebJudge: failure. The agent never applied the certified pre-owned filter, did not set model year to 2019 or newer, did not input the ZIP code or 200-mile radius, nor sorted results by lowest price. N
- **agent-browser** · om2w-c801d1c9 #1: WebJudge: failure. The agent never clearly confirmed which title won the 2023 VR Game of the Year (they jumped to Resident Evil Village without verifying the VR category winner). Although they did fil
- **agent-browser** · om2w-d1970c16 #1: WebJudge: failure. The agent applied filters for color (Red), sweetness (Dry), vintage (2020), and country (United States) via URL parameters but never applied the required $15–20 price filter. No pro
- **agent-browser** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly filtered the SAM2 repo commits by author=NielsRogge and located a commit (b72a8a9 “First draft” on Aug 3, 2024). However, it never navigated to the very bottom o
- **agent-browser** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a sort or filter to list press releases from earliest to newest. Instead it filtered by a single year (2020) and opened a March 5, 2020 release, which is not
- **agent-browser** · om2w-dcd26e66 #1: WebJudge: failure. The agent did locate and begin the Healthline weight-management quiz and correctly selected answers for support system, joy activities (cooking, family time, travel), exercise level
- **agent-browser** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied filters for “Is Hiring,” the four specified batches (Winter 2022, Summer 2022, Winter 2023, Summer 2023), and “HQ Region: France,” yielding “6 of 6 compa
- **playwright-cli** · om2w-07ec4a12 #1: WebJudge: failure. The agent repeatedly navigated to the homepage and interaction checker, entered only “melatonin” but never added “Folate Forte” nor submitted an interaction check to display the res
- **playwright-cli** · om2w-1c3b747a #1: WebJudge: failure. The agent correctly applied the “Active” filter and sorted by prize to identify “ARC Prize 2026 – ARC-AGI-3” as the ongoing competition with the highest prize ($850,000). However, i
- **playwright-cli** · om2w-271b36ef #1: WebJudge: failure. Although the agent navigated to a URL containing the open-box and 8K resolution parameters, the final screenshot does not show any active “Open-Box” or “8K (4320p)” filter pills, no
- **playwright-cli** · om2w-3443e9c3 #1: WebJudge: failure. The agent successfully located the WebMD ovulation calculator (step 1), selected the previous month and the first-day date (step 2), and clicked the “Calculate” button (step 3/4). H
- **playwright-cli** · om2w-3ef64f34 #1: WebJudge: failure. The agent never demonstrated disabling search (no “Turn search off” step) nor did it navigate through preset YouTube Kids categories to locate an animal learning video. Instead it a
- **playwright-cli** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly identified the specialty (neurosurgeon) and applied the “Tomorrow” availability filter exactly as required, confirming tomorrow appointment slots. However, there
- **playwright-cli** · om2w-47bfe8a7 #1: WebJudge: failure. The agent only opened and reloaded the Versus website multiple times without searching for Xiaomi smartphones, identifying their popularity rankings, comparing the top two models, o
- **playwright-cli** · om2w-47e314cc #1: WebJudge: failure. The agent correctly navigated to the paddling permits search page, applied the “Permits” filter, and sorted by price. However, it never surfaced any numeric fees in the snapshots no
- **playwright-cli** · om2w-547f5729 #1: WebJudge: failure. The agent never applied any filters for 3 bedrooms, 2+ bathrooms, or the $1500–$2500 price range. The action history only shows opening and closing pages with snapshots, but no filt
- **playwright-cli** · om2w-5d542a7e #1: WebJudge: failure. The agent did navigate to the CVPR 2022 page (implicitly filtering by conference), but never applied a “sort by highest citations” filter or control. It only inspected a couple of i
- **playwright-cli** · om2w-63d6866f #1: WebJudge: failure. The agent correctly identified Hong Kong Disneyland as the most popular attraction (Key Point 1) and navigated to its page’s “Nearby” section, capturing a snapshot of nearby attract
- **playwright-cli** · om2w-6b2cfae0 #1: WebJudge: failure. The agent opened Devin Booker’s profile and attempted to load playoff statistics via multiple stats API calls, but never extracted points-per-game for each playoff season, did not c
- **playwright-cli** · om2w-6ca20f1d #1: WebJudge: failure. The agent successfully located and navigated to the eligibility page and the claim page and scraped their introductory text, covering key points 1 and 3. However, it never retrieved
- **playwright-cli** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the College of Medicine and Science site, selected “Florida” for location and “Internship” for program type, and the URL reflects those filter param
- **playwright-cli** · om2w-8689af4d #1: WebJudge: failure. The agent did sort the refurbished iPad Air listings by “Price: Low to High” and ultimately selected and added a certified refurbished 11-inch iPad Air, Wi-Fi, 256 GB in Blue to the
- **playwright-cli** · om2w-905cb530 #1: WebJudge: failure. The agent navigated to the dermatology directory for zip code 10019 but did not apply a 10-mile radius filter nor the Blue Medicare Advantage insurance filter. No evidence of select
- **playwright-cli** · om2w-92a3d423 #1: WebJudge: failure. The agent did locate a 2022 Tesla Model 3 on CarMax (points 1 and 4) and captured a listing, but it never explicitly used the filter panel to apply “Year = 2022,” “Make = Tesla,” an
- **playwright-cli** · om2w-95cad96f #1: WebJudge: failure. The agent successfully accessed Rotten Tomatoes, navigated to the TV section, and applied the “SORT: MOST POPULAR” filter, but the actual list of shows remains hidden behind a promo
- **playwright-cli** · om2w-9d09bc94 #1: WebJudge: failure. The agent never applied any filters for NHL or Boston, nor selected any events. It only opened and closed the site without filtering by league or location.
- **playwright-cli** · om2w-a0a18ca6 #1: WebJudge: failure. The agent did sort by best sellers (step 9), select the Halloween event filter (step 15), and eventually chose a large, short-sleeve men’s tee and added it to the cart. However, the
- **playwright-cli** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly navigated to IGN’s reviews, set the Board category filter, and filtered for a score of 10. However, it never applied or confirmed an “Editor’s Choice” filter—onl
- **playwright-cli** · om2w-b64f938a #1: WebJudge: failure. The agent opened Target, attempted a search for “frozen vegetarian cheese pizza,” then switched to “frozen cheese pizza” and applied a price filter of $5–$10. However, there’s no ev
- **playwright-cli** · om2w-bb314cb8 #1: WebJudge: failure. The agent reached the ICLR 2016 archive and attempted to open a videolectures.net page, but never located or confirmed a “Best Paper Award” section or label, nor did it identify whi
- **playwright-cli** · om2w-c3a33396 #1: WebJudge: failure. The agent never entered the ZIP code 97007 or set a 200-mile radius, never selected the Porsche 911 model or filtered for model year 2019+, and never applied a “cheapest” sort on ce
- **playwright-cli** · om2w-d1970c16 #1: WebJudge: failure. The agent only set the shipping state and age confirmation, then applied the Red color and United States origin filters. It never applied the Dry (sweetness) filter, the 2020 vintag
- **playwright-cli** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly filtered commits by author but only viewed recent commits and a single commit (Aug 3, 2024) without navigating to the end of the history to find NielsRogge’s ver
- **playwright-cli** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a “sort by earliest” control or filter on the press releases listing. Instead, it scraped URLs from the sitemap and manually visited various press‐release pa
- **playwright-cli** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully located and completed all five quiz questions, selecting answers that match the user’s profile (strong support system; non-exercising; mostly eating out; port
- **playwright-cli** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied all required filters—batches Winter/Summer/Fall 2022 & 2023, “Is Hiring,” and “HQ Region: France”—and the snapshot confirms “Showing 6 of 6 companies.” H
- **playwright-cli** · om2w-f2be37a9 #1: WebJudge: failure. The agent never used the “Find Event” button or the built-in filter controls to submit a search for obedience trials in New York for next month. Instead it manually navigated to ind
- **playwright-mcp** · om2w-07ec4a12 #1: WebJudge: failure. The agent only navigated to the drug interactions page but did not input “melatonin” and “Folate Forte” into the interaction checker or submit the form. No interaction results were 
- **playwright-mcp** · om2w-1c3b747a #1: WebJudge: failure. The agent did sort competitions by prize (“Reward” sort) and later sorted the code tab by “Most Votes” to reveal the top-voted notebook. However, it never applied a filter to restri
- **playwright-mcp** · om2w-271b36ef #1: WebJudge: failure. The agent successfully scoped results to the Open-Box category and applied the Samsung brand filter. However, it never used a resolution filter to restrict results to 8K TVs—instead
- **playwright-mcp** · om2w-2fc51dd3 #1: WebJudge: failure. The agent successfully navigated to Public Storage, entered zip code 60538, and applied the Climate Controlled filter. However, it never applied or confirmed any filter or selection
- **playwright-mcp** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly searched for “Neurosurgeon” and applied the “Tomorrow” availability filter, satisfying the specialty and appointment-availability requirements. However, it never
- **playwright-mcp** · om2w-47bfe8a7 #1: WebJudge: failure. The agent navigated to the Xiaomi page but never applied a “most popular” filter or sort, did not select the top two Xiaomi smartphones, and did not perform any comparison or displa
- **playwright-mcp** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-48c73f3f #1: WebJudge: failure. The agent only navigated to the homepage twice and did not locate or retrieve the Final Environmental Impact Statement report for the Jamaica Bus Depot expansion on new.mta.info, so
- **playwright-mcp** · om2w-547f5729 #1: WebJudge: failure. The agent only navigated to the homepage and did not set any filters for location (NYC), property type (condominium), bedrooms (3), bathrooms (2+), or price range ($1500–$2500). No 
- **playwright-mcp** · om2w-5d542a7e #1: WebJudge: failure. The agent only navigated to various DBLP pages but never applied any sort or filter by citation count on the 2022 CVPR main conference page, nor did it identify or extract the most 
- **playwright-mcp** · om2w-63d6866f #1: WebJudge: failure. The agent correctly identified “Hong Kong Disneyland” as the top attraction (step 1). It navigated to the Disneyland detail page, located the “Nearby Attractions” section, and even 
- **playwright-mcp** · om2w-6b2cfae0 #1: WebJudge: failure. The agent only navigated to general NBA and career stats pages but did not identify Devin Booker’s individual playoff runs, did not calculate average points per game for each run, n
- **playwright-mcp** · om2w-6ca20f1d #1: WebJudge: failure. The agent navigated to the correct GOV.UK pages and displayed the table of contents headings for “Who can get Child Benefit,” “How it works,” and “Make a claim,” but never retrieved
- **playwright-mcp** · om2w-75146b7b #1: WebJudge: failure. The agent never applied any filters for breed (Boxer), sex (male), age (senior), or location (near zip 90028). It only navigated to the homepage and a generic dog search page withou
- **playwright-mcp** · om2w-783ce6a3 #1: WebJudge: failure. The agent only navigated to the Mayo Clinic homepage repeatedly and did not locate or filter for internship programs in Florida offered by the Mayo Clinic College of Medicine and Sc
- **playwright-mcp** · om2w-7b182a50 #1: WebJudge: failure. The agent navigated to the AdoptAPet homepage and the shelters page but never entered or applied a location filter for zip code 90011, nor did it display or submit any shelter searc
- **playwright-mcp** · om2w-8103786e #1: WebJudge: failure. The agent only navigated to the general chest pain causes page without applying or specifying the required qualifiers (“sharp” characteristic and “accompanied by anxiety”) and never
- **playwright-mcp** · om2w-8689af4d #1: WebJudge: failure. The agent did navigate to the refurbished iPad Air section and sorted Low to High, and correctly selected and added a certified refurbished iPad Air with 256GB in blue to the bag. H
- **playwright-mcp** · om2w-905cb530 #1: WebJudge: failure. The agent only navigated to the Healthgrades homepage and did not select "Dermatologist," enter zip code 10019, set the 10-mile radius, or apply the filter for Blue Medicare Advanta
- **playwright-mcp** · om2w-9d09bc94 #1: WebJudge: failure. The agent only navigated to the StubHub homepage multiple times and did not search for “NHL” events or apply a “Boston” location filter, so it failed to meet either key point.
- **playwright-mcp** · om2w-a0a18ca6 #1: WebJudge: failure. The agent only performed wait actions and did not apply any filters (best-selling, size large, short sleeve, Halloween style) nor did it add an item to the cart. It failed to meet a
- **playwright-mcp** · om2w-a172a5d9 #1: WebJudge: failure. The agent only navigated repeatedly to the homepage and did not access the natural products database or perform any browsing actions within it, so the task is not completed.
- **playwright-mcp** · om2w-a8b9edd5 #1: WebJudge: failure. The agent only navigated between the FedEx home page and the rates page but never entered the weight (4 lbs), origin (Texas), or destination (New York) into a rate calculator or sub
- **playwright-mcp** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly navigated to IGN, selected the Board category and score range “10,” and even clicked the Editors’ Choice checkbox. However, the key snapshot shows the Editors’ C
- **playwright-mcp** · om2w-b64f938a #1: WebJudge: failure. The agent navigated to Target and applied a price filter of \$5–\$10, and searched for “frozen cheese pizza,” but never applied a vegetarian filter (nor used a frozen category filte
- **playwright-mcp** · om2w-bb314cb8 #1: WebJudge: failure. The agent never clearly located the “Best Paper Awards” list on the ICLR 2016 page and click‐selected its first entry. Instead it wandered among various URLs, snapshots, and searche
- **playwright-mcp** · om2w-c3a33396 #1: timeout after 10 min
- **playwright-mcp** · om2w-c801d1c9 #1: WebJudge: failure. The agent did identify and navigate to “Vertigo 2” and applied the “Negative Only” filter and sorted by “Most Recent,” but never confirmed that “Vertigo 2” is the 2023 VR Game of th
- **playwright-mcp** · om2w-d1970c16 #1: WebJudge: failure. The agent only completed the age (≥21) and location (Texas) gating steps and issued various text searches, but it never applied explicit filters for dry red wine, 2020 vintage, Unit
- **playwright-mcp** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly located the SAM2 repo and applied the author filter for NielsRogge, but never confirmed or displayed the chronologically earliest commit in the filtered list (th
- **playwright-mcp** · om2w-da8f3823 #1: WebJudge: failure. The agent never applied a sort or filter for “earliest” press release. Instead, it navigated through various pages and even filtered by year=2020, but did not sort the full list by 
- **playwright-mcp** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully navigated to and completed all five quiz questions for support system, joy activities (cooking, family time, travel), exercise (“None”), and eating-out habits
- **playwright-mcp** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly set the specialty to Internal Medicine, entered the location 90028, and applied the “4 Stars & Up” filter. However, it never filtered for pediatricians (e.g., vi
- **playwright-mcp** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied all required filters—“Is Hiring,” the Winter 2022, Summer 2022, Winter 2023, and Summer 2023 batches, and “HQ Region: France”—and the snapshot confirms “
- **playwright-mcp-tuned** · om2w-07ec4a12 #1: WebJudge: failure. The agent navigated to the drug interactions page but never entered “melatonin” or “Folate Forte” into the interaction checker, nor retrieved any interaction results. Key point “Che
- **playwright-mcp-tuned** · om2w-1c3b747a #1: WebJudge: failure. The agent correctly sorted competitions by prize and filtered for active contests, identifying “ARC Prize 2026 – ARC-AGI-3” as the ongoing competition with the highest prize ($850,0
- **playwright-mcp-tuned** · om2w-2fc51dd3 #1: WebJudge: failure. The agent correctly navigated to Public Storage, entered ZIP 60538, applied the climate-controlled filter, and located two climate-controlled unit options (10×10 and 10×15) at a fac
- **playwright-mcp-tuned** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly navigated to the neurosurgery search, applied the “Tomorrow” availability filter, and located neurosurgeon profiles. However, no doctor’s actual age (over 50) wa
- **playwright-mcp-tuned** · om2w-461ab9b0 #1: WebJudge: failure. The agent navigated to the Rule 605 Reports page and explored the NYSE, NYSE American, and NYSE Texas tabs but never located or clicked the “July 2024” Market Center Files link unde
- **playwright-mcp-tuned** · om2w-47bfe8a7 #1: WebJudge: failure. The agent only navigated to the homepage multiple times and took snapshots, but never applied any filter for Xiaomi or “most popular,” never selected the first and second most popul
- **playwright-mcp-tuned** · om2w-47e314cc #1: WebJudge: failure. The agent correctly navigated to a paddling permit search, applied the “Sort By: Price” sort to surface cheapest permits first, and visited multiple permit detail pages to find thei
- **playwright-mcp-tuned** · om2w-48c73f3f #1: WebJudge: failure. The agent only navigated to the homepage multiple times and did not locate or download the final environmental impact statement report for the Jamaica Bus Depot expansion on new.mta
- **playwright-mcp-tuned** · om2w-547f5729 #1: WebJudge: failure. The agent navigated to the Apartments.com homepage and the New York City page but did not apply any filters for condos, 3 bedrooms, 2+ bathrooms, or the $1500–$2500 price range. No 
- **playwright-mcp-tuned** · om2w-5d542a7e #1: WebJudge: failure. The agent navigated to the CVPR 2022 page but never applied a “most cited” sort/filter nor selected the top publication. Key point “Sort by most cited” and “Select the top publicati
- **playwright-mcp-tuned** · om2w-63d6866f #1: WebJudge: failure. The agent correctly specified Hong Kong, sorted attractions by “Recommended” (most popular) and navigated to the Hong Kong Disneyland detail page. It located the “Nearby Attractions
- **playwright-mcp-tuned** · om2w-6b2cfae0 #1: WebJudge: failure. The agent navigated to Devin Booker’s NBA profile and stats pages but did not apply any filter for playoff statistics nor sort by points per game to identify his highest-scoring pla
- **playwright-mcp-tuned** · om2w-6ca20f1d #1: WebJudge: failure. The agent only captured snapshots of page headings and contents lists without extracting any substantive details on eligibility criteria, how the benefit works, or how to claim. Non
- **playwright-mcp-tuned** · om2w-75146b7b #1: WebJudge: failure. The agent only navigated to the adopt-a-dog page and did not apply any filters for gender (male), age group (senior), breed (boxer), or location (90028). None of the key points have
- **playwright-mcp-tuned** · om2w-783ce6a3 #1: WebJudge: failure. The agent navigated only to the Mayo Clinic homepage and the College of Medicine and Science landing page, but never searched for or filtered internship programs, nor specified Flor
- **playwright-mcp-tuned** · om2w-7b182a50 #1: WebJudge: failure. The agent did navigate to the shelters search URL with the correct location parameter (90011), but never displayed or confirmed any shelter or rescue group results. There was no evi
- **playwright-mcp-tuned** · om2w-8103786e #1: WebJudge: failure. The agent only navigated to the Mayo Clinic homepage repeatedly and never selected or searched for “chest pain,” “sharp chest pain,” or “anxiety.” No symptom details or possible cau
- **playwright-mcp-tuned** · om2w-8689af4d #1: WebJudge: failure. Although the agent ultimately added a certified refurbished 11-inch iPad Air (M3) with 256 GB in blue to the bag, it never applied or confirmed a filter to show “cheapest” among 256
- **playwright-mcp-tuned** · om2w-9d09bc94 #1: WebJudge: failure. The agent did navigate to the Boston NHL hockey tickets category URL, which is the correct page for NHL events in Boston, but it did not display or confirm any event results. No sna
- **playwright-mcp-tuned** · om2w-a0a18ca6 #1: WebJudge: failure. The agent only performed wait actions without applying any filters (highest-selling, size large, short sleeve, Halloween style), selecting a men's T-shirt, or adding the item to the
- **playwright-mcp-tuned** · om2w-a172a5d9 #1: WebJudge: failure. The user wanted to browse the natural products database, but the agent only loaded the drugs.com homepage and did not navigate to or display the natural products section or database
- **playwright-mcp-tuned** · om2w-a8b9edd5 #1: WebJudge: failure. The agent navigated to the FedEx home and rating pages but never entered the 4 lb weight, origin Texas, or destination New York into the rate calculator form, nor submitted it to ob
- **playwright-mcp-tuned** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent has applied the Editor’s Choice filter and selected the Board game genre, but it never applied or confirmed a score=10 filter. Without the score filter, the task is incomp
- **playwright-mcp-tuned** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the AeroAPI page and located the “pricing” section but never retrieved or displayed the available plans or their details for comparison. No plan names, featur
- **playwright-mcp-tuned** · om2w-b64f938a #1: WebJudge: failure. The agent navigated to Target and attempted searches but never applied a price filter (5–10 USD) nor displayed any product listings matching “frozen vegetarian cheese pizza” within 
- **playwright-mcp-tuned** · om2w-bb314cb8 #1: WebJudge: failure. The agent navigated to the general ICLR 2016 video lectures page (videolectures.net/iclr2016_san_juan/) but never located or opened the specific page for the first Best Paper Award 
- **playwright-mcp-tuned** · om2w-c3a33396 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-d1970c16 #1: WebJudge: failure. The agent correctly verified age and location and navigated to red wines, but never applied a price‐range filter of $15–$20 (or a dryness filter) using the site’s filtering tools. I
- **playwright-mcp-tuned** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly located the SAM2 repo and applied the author filter for “NielsRogge,” but it never sorted by oldest or scrolled to the bottom of the filtered commits list to con
- **playwright-mcp-tuned** · om2w-da8f3823 #1: WebJudge: failure. The agent located the press releases section and applied a year filter, but it selected “2020” rather than the earliest available year. It did not sort the list in ascending date or
- **playwright-mcp-tuned** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly set the location to zip code 90028 and applied the “4 Stars & Up” rating filter on the Internal Medicine directory page. However, it never selected or filtered f
- **playwright-mcp-tuned** · om2w-f05e87c5 #1: WebJudge: failure. The agent applied filters for the correct YC batches (Winter 2022, Summer 2022, Winter 2023, Summer 2023) and “Is Hiring,” and even narrowed the region to Europe. However, the agent
- **stagehand** · om2w-1c3b747a #1: WebJudge: failure. The agent correctly filtered to show only active competitions sorted by prize (steps 1–3) and selected “ARC Prize 2026 – ARC-AGI-3,” then navigated to the Code tab and applied the “
- **stagehand** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly set the specialty to “Neurosurgeon” and applied the “Tomorrow” availability filter (as evidenced by the active “Tomorrow” tag and filtered results). However, at 
- **stagehand** · om2w-47bfe8a7 #1: WebJudge: failure. The agent only loaded the versus.com homepage repeatedly and did not navigate to the Xiaomi smartphones section, apply a popularity sort, select the top two Xiaomi phones, or genera
- **stagehand** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-547f5729 #1: WebJudge: failure. The agent correctly navigated to NYC listings and applied filters for 3 bedrooms and 2 bathrooms via the URL, but it never applied or confirmed the required price range filter of $1
- **stagehand** · om2w-5d542a7e #1: WebJudge: failure. The agent only navigated to the 2022 CVPR page on DBLP and took a screenshot; no citation-based filter or sorting was applied, nor was the most cited publication identified.
- **stagehand** · om2w-63d6866f #1: WebJudge: failure. The agent navigated to Trip.com, searched for “Hong Kong” attractions, and clicked into Hong Kong Disneyland’s page. However, it never used or confirmed a “highest popularity” filte
- **stagehand** · om2w-6b2cfae0 #1: WebJudge: failure. The agent never filtered for Devin Booker specifically nor retrieved any playoff points-per-game values for his seasons. Although they set Season Type to “Playoffs” and Per Mode to 
- **stagehand** · om2w-6ca20f1d #1: WebJudge: failure. The agent only navigated to the Child Benefit page and clicked through the table of contents links but never scrolled or extracted the actual eligibility criteria, explanation of ho
- **stagehand** · om2w-9d09bc94 #1: WebJudge: failure. The agent searched “NHL Boston” but clicked the “Boston Bruins” suggestion rather than the NHL league, landing on the Bruins team page. Although the location filter is set to Boston
- **stagehand** · om2w-9f1cba61 #1: timeout after 10 min
- **stagehand** · om2w-a0a18ca6 #1: WebJudge: failure. The agent did search for “men halloween t-shirt,” checked the Halloween event filter, and sorted by Best Sellers. They then picked a Batman DC Comics tee, selected Large on the prod
- **stagehand** · om2w-a172a5d9 #1: WebJudge: failure. The agent successfully navigated to the Drugs.com Natural Product Information page and displayed the “Search natural products” interface, but it did not perform any search or browse
- **stagehand** · om2w-b64f938a #1: WebJudge: failure. The agent only managed to navigate to Target’s site and repeatedly attempted to bypass the “Quick verification” CAPTCHA gate. It never applied any product filters nor displayed any 
- **stagehand** · om2w-c3a33396 #1: WebJudge: failure. The agent only entered the ZIP code (97007) and triggered a search URL with a 500-unit radius but never applied any filters for Porsche 911, certified pre-owned, model year ≥2019, o
- **stagehand** · om2w-d1970c16 #1: WebJudge: failure. The agent successfully confirmed the user is over 21, selected Texas shipping, applied the “Dry” sweetness filter, and clicked the United States and attempted to select the 2020 vin
- **stagehand** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly navigated to the official facebookresearch/sam2 repo and applied the author=NielsRogge filter for all time. However, it never sorted or paged to the oldest entry
- **stagehand** · om2w-da8f3823 #1: WebJudge: failure. The agent did locate the Press Releases section and used the Year dropdown, but only filtered by 2020 instead of the earliest available year. They then opened a June 16, 2020 releas
- **stagehand** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly set the location to 90028, searched for “Internal Medicine,” and applied the “4 Stars & Up” filter, so points 2–4 are satisfied. However, it never selected or fi
- **stagehand** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied filters for “Is Hiring” and the four 2022/2023 batches, but only restricted HQ Region to “Europe” rather than specifically to “France.” The snapshots sho
- **wdio-mcp** · om2w-07ec4a12 #1: WebJudge: failure. The agent navigated to the interaction checker and loaded the melatonin interaction page but never entered or submitted Folate Forte as the second drug. No interaction results for t
- **wdio-mcp** · om2w-43a1ca25 #1: WebJudge: failure. The agent only navigated to the neurosurgery specialty page but did not apply or confirm filters for age over 50 or appointment availability tomorrow, nor did it display any filtere
- **wdio-mcp** · om2w-461ab9b0 #1: WebJudge: failure. The agent successfully navigated to the NYSE Rule 605 Reports page and located and clicked the “July 2024” link. It even ran scripts to sniff out .zip resource names containing “202
- **wdio-mcp** · om2w-47bfe8a7 #1: WebJudge: failure. The agent only navigated to the homepage multiple times and never selected Xiaomi smartphones, applied any popularity filter, compared two models, or displayed a comparison chart. T
- **wdio-mcp** · om2w-47e314cc #1: WebJudge: failure. The agent correctly identified multiple parks offering paddling permits and visited their “Fees & Cancellations” pages to read individual permit costs, but it never applied a sort‐b
- **wdio-mcp** · om2w-48c73f3f #1: WebJudge: failure. The agent successfully searched new.mta.info for “Jamaica Bus Depot environmental impact statement,” located the FEIS page, and even extracted links for the FEIS volumes. However, i
- **wdio-mcp** · om2w-547f5729 #1: WebJudge: failure. The agent only navigated to the “3-bedrooms” listings for NYC, but never applied a filter for 2+ bathrooms nor set the price range to $1500–$2500. Key points 2 and 3 were not met, s
- **wdio-mcp** · om2w-5d542a7e #1: WebJudge: failure. The agent did filter for 2022 CVPR papers using OpenAlex, but the provided JSON snapshot only shows a single paper’s metadata and omits citation counts and any sorted list. There is
- **wdio-mcp** · om2w-6b2cfae0 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-6ca20f1d #1: WebJudge: failure. The agent only navigated to the Child Benefit page and showed the table of contents without revealing the actual eligibility criteria, explanation of how the benefit works, or claim
- **wdio-mcp** · om2w-75146b7b #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-8103786e #1: timeout after 10 min
- **wdio-mcp** · om2w-905cb530 #1: WebJudge: failure. The agent only navigated to the dermatology directory and never entered the zip code, set the 10-mile radius, or applied the Blue Medicare Advantage insurance filter. None of the ke
- **wdio-mcp** · om2w-a0a18ca6 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-a8b9edd5 #1: WebJudge: failure. The agent only loaded the FedEx homepage and took screenshots but did not enter the package weight, origin, or destination to calculate shipping cost. None of the key points are sat
- **wdio-mcp** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly navigated to IGN’s reviews, filtered by Board category and score of 10, but never enabled the “Editor’s Choice” filter. The only result shown (“Undaunted: Stalin
- **wdio-mcp** · om2w-b64f938a #1: WebJudge: failure. The agent never reached any product listings on Target due to the “Quick verification” interstitial and did not apply a price filter of $5–$10 or display any frozen vegetarian chees
- **wdio-mcp** · om2w-c3a33396 #1: timeout after 10 min
- **wdio-mcp** · om2w-c801d1c9 #1: WebJudge: failure. The agent correctly identified the 2023 VR Game of the Year title and applied the “Negative Only” filter and sorted reviews by “Most Recent.” However, it never applied any filter to
- **wdio-mcp** · om2w-d1970c16 #1: WebJudge: failure. The agent correctly handled the age‐gate and set the location to Texas, and at one point applied a “Red” color filter. However, the “Dry” sweetness filter was never selected, the “V
- **wdio-mcp** · om2w-da8f3823 #1: WebJudge: failure. The agent navigated to the Press Releases section and used the year dropdown to filter to 2020, then opened the March 05, 2020 release. However, the task required sorting by the ear
- **wdio-mcp** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully located and completed all five quiz questions, covering support system, activities (cooking, family time, travel), no exercise, frequent eating out, and porti
- **wdio-mcp** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent never applied any filters—no zip code, specialty, or rating filters were set—and no search results were displayed. It did not fulfill any key point beyond loading the pedi
- **wdio-mcp** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly applied the batch filters (Winter 2022, Summer 2022, Winter 2023, Summer 2023), the HQ region filter (France), and the “Is Hiring” filter, resulting in exactly 6
- **wdio-session** · om2w-271b36ef #1: WebJudge: failure. The agent successfully navigated to Best Buy, searched “8K Samsung TV,” and applied the Open-Box condition filter (steps 25–30). However, it never applied the explicit 8K (4320p) re
- **wdio-session** · om2w-3ef64f34 #1: WebJudge: failure. The agent completed the parental age‐verification gate, skipped signing in, accepted privacy, and even turned search off. However, there is no evidence the agent ever navigated to t
- **wdio-session** · om2w-43a1ca25 #1: WebJudge: failure. The action history only shows navigation to the neurosurgery directory and a screenshot; no filters for age over 50 or appointment availability tomorrow were applied or confirmed. T
- **wdio-session** · om2w-47bfe8a7 #1: WebJudge: failure. The agent never applied any filter or sort for Xiaomi smartphones, never identified the top two most popular Xiaomi models, and did not produce a comparison chart. It only navigated
- **wdio-session** · om2w-47e314cc #1: WebJudge: failure. The agent never applied a “lowest price” sort or filter in the search results, instead manually clicking through dozens of permit pages to view fees. There’s no evidence of a final 
- **wdio-session** · om2w-547f5729 #1: WebJudge: failure. The agent never demonstrated that the filters were properly applied and confirmed—there’s no snapshot showing condo listings in NYC with exactly 3 bedrooms, at least 2 bathrooms, an
- **wdio-session** · om2w-63d6866f #1: WebJudge: failure. The agent successfully sorted by popularity and identified “Hong Kong Disneyland” as the top attraction, but it never accessed or extracted the “Nearby Attractions” section on Disne
- **wdio-session** · om2w-6b2cfae0 #1: timeout after 10 min
- **wdio-session** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College of Medicine and Science “Find a program” page, applied the location filter (Florida) and the program type filter (Internship
- **wdio-session** · om2w-8103786e #1: timeout after 10 min
- **wdio-session** · om2w-905cb530 #1: WebJudge: failure. The agent navigated to the dermatology directory and applied the Blue Medicare Advantage insurance filter via the URL parameter, but did not set or confirm the 10-mile radius around
- **wdio-session** · om2w-95cad96f #1: WebJudge: failure. The agent correctly navigated to Rotten Tomatoes, selected the TV section, and applied the “Most Popular” sort (URL shows sort:popular and the “SORT: MOST POPULAR” dropdown is activ
- **wdio-session** · om2w-a0a18ca6 #1: WebJudge: failure. The agent did apply the Halloween event filter and sorted by “Best Sellers,” but it never applied a short-sleeve filter and did not use the filter panel to restrict size to Large (i
- **wdio-session** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the AeroAPI pricing page, located the “Find the right tier” section, and took a screenshot, but it did not list or compare the actual plans or their details s
- **wdio-session** · om2w-b64f938a #1: WebJudge: failure. The agent only opened the Target homepage, took snapshots, and searched for "Press & hold" without performing any search for frozen vegetarian cheese pizza or applying the 5–10 USD 
- **wdio-session** · om2w-bf3b311c #1: WebJudge: failure. The agent navigated to the Apple Watch lineup and clicked “Compare,” but never selected models or viewed any comparison data or specs—only the empty comparison interface was shown. 
- **wdio-session** · om2w-c3a33396 #1: WebJudge: failure. The agent navigated to the certified pre-owned page but never applied any of the required filters (Porsche 911 model, certified pre-owned status is implicit but not narrowed to 911,
- **wdio-session** · om2w-c801d1c9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-session** · om2w-d1970c16 #1: WebJudge: failure. The agent never applied the $15–$20 price filter and never added any bottles to the cart. While “Red” and “Dry” were set and “Vintage 2020” was eventually checked, the origin filter
- **wdio-session** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly navigated to the facebookresearch/sam2 repo and applied the author filter for NielsRogge, confirming commits by that author. However, it never applied or demonst
- **wdio-session** · om2w-da8f3823 #1: WebJudge: failure. The agent navigated to the press releases page and used the year filter, but only selected 2020 (not the earliest available year). They then paginated within 2020 and opened the Mar
- **wdio-session** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully navigated the quiz, answered questions on support system (Q1), activities (cooking, family time, travel in Q2), exercise level (none in Q3), and eating‐out fr
- **wdio-session** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent navigated to the correct search URL with zip code 90028 and specialty Internal Medicine Pediatrics, but did not apply or confirm a filter for a rating of at least 4 stars.

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

Every setup ran in the same job, interleaved in one shuffled order.
