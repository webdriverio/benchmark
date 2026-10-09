# Benchmark run 2026-10-09-run-37883072636: Online-Mind2Web

Produced by [workflow run #37883072636](https://github.com/webdriverio/benchmark/actions/runs/37883072636) on 2026-10-09 from commit [`0226d80`](https://github.com/webdriverio/benchmark/commit/0226d803effd093a9911e715e185741ceaf748fd). Raw data: [`runs-*.jsonl`](.) (one line per agent run, including the agent's final message) and [`meta.json`](meta.json). Full agent transcripts: the `transcripts-*` artifacts of the [workflow run](https://github.com/webdriverio/benchmark/actions/runs/37883072636) (kept 90 days).

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
| Duration | 76 min |

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

| Setup | Tokens/task | Cost/task | Success | Time/task | Tool calls/task |
|---|--:|--:|--:|--:|--:|
| `playwright-mcp`<br>@playwright/mcp@0.0.83 | 589k | $0.026 | 48% (43/90) | 106 s | 27.5 |
| `playwright-mcp-tuned`<br>@playwright/mcp@0.0.83 | 574k | $0.029 | 50% (45/90) | 93 s | 27 |
| `stagehand`<br>browserbase/stagehand@4.1.0+cd7b230 | 412k | $0.022 | 58% (52/90) | 91 s | 22 |
| `wdio-mcp`<br>@wdio/mcp@4.0.0 | 347k | $0.017 | 56% (50/90) | 113 s | 32 |
| `wdio-session`<br>@wdio/cli@10.0.2 | 167k | $0.010 | 59% (53/90) | 146 s | 26.5 |
| `agent-browser`<br>agent-browser@0.38.2 | 729k | $0.034 | 50% (45/90) | 141 s | 36 |
| `playwright-cli`<br>@playwright/cli@0.1.22 | 658k | $0.028 | 60% (54/90) | 149 s | 33 |

_Medians per run, except success. Tokens include cache reads and writes._

### Per task

| Task | playwright-mcp | playwright-mcp-tuned | stagehand | wdio-mcp | wdio-session | agent-browser | playwright-cli |
|---|--:|--:|--:|--:|--:|--:|--:|
| om2w-bf3b311c | 1/1 · 230k · 28s | 1/1 · 224k · 36s | 1/1 · 579k · 64s | 1/1 · 118k · 34s | 1/1 · 161k · 41s | 0/1 · 331k · 38s | 1/1 · 757k · 60s |
| om2w-864244b6 | 1/1 · 127k · 41s | 1/1 · 277k · 36s | 1/1 · 320k · 58s | 1/1 · 103k · 37s | 1/1 · 139k · 52s | 1/1 · 299k · 30s | 1/1 · 157k · 66s |
| om2w-330cd04c | 1/1 · 425k · 59s | 1/1 · 314k · 38s | 1/1 · 72k · 19s | 1/1 · 261k · 44s | 1/1 · 157k · 47s | 1/1 · 674k · 111s | 1/1 · 432k · 68s |
| om2w-a5c87cc1 | 0/1 · 2060k · 452s | 1/1 · 3220k · 222s | 0/1 · 831k · 130s | 1/1 · 168k · 68s | 1/1 · 187k · 78s | 0/1 · 1630k · 241s | 1/1 · 844k · 130s |
| om2w-4c572a62 | 1/1 · 136k · 16s | 1/1 · 476k · 58s | 1/1 · 221k · 90s | 1/1 · 236k · 33s | 1/1 · 197k · 63s | 1/1 · 734k · 55s | 1/1 · 540k · 51s |
| om2w-6b2cfae0 | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 2436k · 585s | 0/1 · 3115k · 486s | 0/1 · 0k · 600s |
| om2w-ba2a469a | 0/1 · 683k · 80s | 1/1 · 331k · 51s | 0/1 · 421k · 105s | 0/1 · 2724k · 255s | 1/1 · 481k · 134s | 0/1 · 376k · 92s | 1/1 · 333k · 51s |
| om2w-180ed2ec | 0/1 · 1940k · 340s | 0/1 · 828k · 234s | 1/1 · 324k · 57s | 0/1 · 1789k · 222s | 0/1 · 0k · 600s | 1/1 · 1744k · 481s | 1/1 · 593k · 295s |
| om2w-b99c0296 | 0/1 · 1038k · 104s | 0/1 · 432k · 53s | 0/1 · 415k · 129s | 1/1 · 567k · 91s | 1/1 · 1073k · 155s | 0/1 · 3091k · 248s | 1/1 · 2515k · 198s |
| om2w-3ef64f34 | 0/1 · 2618k · 245s | 1/1 · 1356k · 137s | 0/1 · 0k · 600s | 1/1 · 1068k · 114s | 1/1 · 1779k · 404s | 0/1 · 1898k · 225s | 0/1 · 2024k · 337s |
| om2w-a11ecdff | 1/1 · 209k · 30s | 1/1 · 231k · 37s | 1/1 · 95k · 50s | 1/1 · 174k · 52s | 1/1 · 88k · 54s | 1/1 · 244k · 48s | 1/1 · 191k · 34s |
| om2w-b9225088 | 1/1 · 462k · 49s | 0/1 · 690k · 83s | 1/1 · 170k · 68s | 1/1 · 418k · 70s | 1/1 · 220k · 61s | 1/1 · 467k · 54s | 1/1 · 847k · 62s |
| om2w-07ec4a12 | 0/1 · 818k · 395s | 1/1 · 318k · 79s | 1/1 · 689k · 104s | 0/1 · 0k · 601s | 1/1 · 171k · 189s | 1/1 · 364k · 40s | 1/1 · 1195k · 320s |
| om2w-a8b9edd5 | 1/1 · 676k · 182s | 0/1 · 1821k · 398s | 1/1 · 459k · 80s | 1/1 · 352k · 66s | 1/1 · 388k · 138s | 0/1 · 1231k · 198s | 1/1 · 805k · 117s |
| om2w-442a450e | 1/1 · 685k · 71s | 1/1 · 841k · 77s | 1/1 · 570k · 64s | 1/1 · 810k · 106s | 1/1 · 996k · 283s | 0/1 · 939k · 117s | 1/1 · 691k · 149s |
| om2w-3dca7cbe | 1/1 · 1035k · 475s | 1/1 · 539k · 70s | 1/1 · 336k · 63s | 1/1 · 687k · 133s | 1/1 · 575k · 160s | 1/1 · 604k · 50s | 1/1 · 674k · 110s |
| om2w-b6d10e9b | 1/1 · 40k · 23s | 1/1 · 118k · 35s | 1/1 · 20k · 18s | 1/1 · 64k · 48s | 1/1 · 46k · 75s | 1/1 · 279k · 31s | 1/1 · 102k · 34s |
| om2w-c1d6ea6f | 0/1 · 0k · 600s | 0/1 · 4425k · 343s | 0/1 · 3339k · 286s | 0/1 · 1067k · 143s | 1/1 · 618k · 452s | 0/1 · 0k · 600s | 0/1 · 0k · 605s |
| om2w-323bd85e | 0/1 · 154k · 49s | 1/1 · 845k · 82s | 1/1 · 241k · 73s | 1/1 · 112k · 126s | 1/1 · 294k · 411s | 1/1 · 462k · 62s | 1/1 · 409k · 104s |
| om2w-d1970c16 | 0/1 · 434k · 45s | 0/1 · 1045k · 156s | 0/1 · 0k · 600s | 0/1 · 2535k · 374s | 0/1 · 0k · 600s | 0/1 · 2634k · 380s | 0/1 · 126k · 38s |
| om2w-d9d8b7d8 | 0/1 · 75k · 18s | 0/1 · 91k · 19s | 0/1 · 44k · 23s | 0/1 · 78k · 58s | 1/1 · 108k · 60s | 0/1 · 212k · 42s | 0/1 · 137k · 41s |
| om2w-29b7372d | 1/1 · 191k · 20s | 1/1 · 197k · 37s | 1/1 · 144k · 20s | 1/1 · 125k · 42s | 1/1 · 95k · 54s | 1/1 · 250k · 63s | 0/1 · 145k · 33s |
| om2w-bb518416 | 1/1 · 682k · 161s | 1/1 · 446k · 292s | 1/1 · 776k · 150s | 1/1 · 508k · 175s | 1/1 · 199k · 80s | 1/1 · 1226k · 187s | 1/1 · 1155k · 285s |
| om2w-7680a920 | 1/1 · 339k · 87s | 1/1 · 364k · 57s | 1/1 · 250k · 95s | 1/1 · 237k · 65s | 1/1 · 152k · 113s | 1/1 · 312k · 54s | 1/1 · 425k · 149s |
| om2w-63d6866f | 0/1 · 5058k · 331s | 0/1 · 2413k · 375s | 0/1 · 414k · 64s | 0/1 · 3347k · 295s | 0/1 · 0k · 600s | 0/1 · 3300k · 456s | 0/1 · 2753k · 437s |
| om2w-11abb668 | 0/1 · 0k · 600s | 0/1 · 4386k · 473s | 1/1 · 545k · 54s | 1/1 · 323k · 40s | 1/1 · 516k · 169s | 0/1 · 3403k · 347s | 1/1 · 780k · 220s |
| om2w-f00e7acc | 0/1 · 148k · 36s | 0/1 · 211k · 162s | 1/1 · 311k · 89s | 1/1 · 204k · 78s | 0/1 · 104k · 46s | 1/1 · 554k · 94s | 1/1 · 266k · 51s |
| om2w-e9f4dfc6 | 0/1 · 0k · 600s | 0/1 · 4170k · 514s | 0/1 · 952k · 318s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 2005k · 157s | 0/1 · 2035k · 234s |
| om2w-f05e87c5 | 0/1 · 1442k · 116s | 0/1 · 503k · 74s | 1/1 · 417k · 104s | 0/1 · 596k · 85s | 1/1 · 627k · 100s | 1/1 · 1984k · 176s | 1/1 · 1207k · 137s |
| om2w-c94551d2 | 0/1 · 0k · 601s | 0/1 · 846k · 460s | 1/1 · 1249k · 173s | 0/1 · 0k · 600s | 0/1 · 1624k · 367s | 0/1 · 2506k · 296s | 0/1 · 0k · 600s |
| om2w-6ca20f1d | 0/1 · 137k · 19s | 0/1 · 138k · 29s | 0/1 · 55k · 25s | 1/1 · 97k · 16s | 0/1 · 108k · 46s | 0/1 · 156k · 45s | 0/1 · 117k · 22s |
| om2w-75a1b5dc | 0/1 · 67k · 21s | 1/1 · 298k · 39s | 1/1 · 201k · 45s | 1/1 · 121k · 50s | 1/1 · 71k · 50s | 1/1 · 398k · 97s | 1/1 · 207k · 79s |
| om2w-48c73f3f | 1/1 · 406k · 87s | 1/1 · 1079k · 163s | 1/1 · 698k · 72s | 1/1 · 103k · 33s | 1/1 · 89k · 79s | 1/1 · 923k · 95s | 1/1 · 962k · 526s |
| om2w-5d542a7e | 1/1 · 282k · 102s | 0/1 · 0k · 600s | 0/1 · 174k · 148s | 0/1 · 96k · 124s | 1/1 · 167k · 115s | 0/1 · 488k · 84s | 0/1 · 419k · 160s |
| om2w-c39d6c24 | 1/1 · 208k · 41s | 0/1 · 150k · 47s | 1/1 · 161k · 77s | 1/1 · 238k · 66s | 1/1 · 153k · 49s | 1/1 · 308k · 55s | 1/1 · 172k · 54s |
| om2w-461ab9b0 | 1/1 · 802k · 44s | 1/1 · 689k · 84s | 0/1 · 1237k · 279s | 0/1 · 739k · 156s | 0/1 · 0k · 600s | 1/1 · 853k · 96s | 1/1 · 655k · 113s |
| om2w-fa9adb81 | 0/1 · 215k · 31s | 0/1 · 794k · 86s | 1/1 · 232k · 62s | 0/1 · 179k · 90s | 0/1 · 190k · 75s | 1/1 · 1407k · 157s | 0/1 · 796k · 54s |
| om2w-271b36ef | 1/1 · 1572k · 334s | 1/1 · 2226k · 324s | 1/1 · 403k · 123s | 1/1 · 466k · 111s | 1/1 · 1528k · 326s | 0/1 · 0k · 600s | 1/1 · 1349k · 358s |
| om2w-fb7b4f78 | 0/1 · 44k · 41s | 1/1 · 923k · 412s | 1/1 · 39k · 26s | 1/1 · 57k · 21s | 1/1 · 115k · 75s | 1/1 · 394k · 93s | 1/1 · 324k · 148s |
| om2w-c3a33396 | 0/1 · 2558k · 353s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 1855k · 573s | 0/1 · 0k · 600s | 0/1 · 4299k · 442s | 1/1 · 2754k · 297s |
| om2w-9f1cba61 | 1/1 · 781k · 307s | 1/1 · 411k · 62s | 1/1 · 1607k · 262s | 0/1 · 1253k · 545s | 1/1 · 250k · 113s | 1/1 · 735k · 105s | 1/1 · 423k · 116s |
| om2w-783ce6a3 | 0/1 · 175k · 23s | 1/1 · 173k · 32s | 1/1 · 115k · 24s | 1/1 · 444k · 83s | 1/1 · 266k · 75s | 0/1 · 429k · 38s | 1/1 · 447k · 156s |
| om2w-a6f0434c | 0/1 · 47k · 14s | 0/1 · 81k · 42s | 0/1 · 59k · 31s | 1/1 · 169k · 101s | 0/1 · 154k · 103s | 0/1 · 210k · 25s | 0/1 · 47k · 17s |
| om2w-27fa3ac2 | 0/1 · 873k · 101s | 1/1 · 1129k · 94s | 0/1 · 602k · 91s | 0/1 · 340k · 64s | 0/1 · 1132k · 213s | 0/1 · 517k · 59s | 0/1 · 1088k · 108s |
| om2w-75146b7b | 0/1 · 2546k · 258s | 1/1 · 1883k · 216s | 1/1 · 1411k · 238s | 1/1 · 1582k · 243s | 1/1 · 468k · 136s | 1/1 · 1753k · 259s | 1/1 · 1121k · 259s |
| om2w-95cad96f | 1/1 · 68k · 29s | 1/1 · 95k · 23s | 1/1 · 80k · 46s | 0/1 · 303k · 102s | 0/1 · 0k · 600s | 1/1 · 316k · 94s | 1/1 · 361k · 103s |
| om2w-987bad7c | 0/1 · 0k · 600s | 0/1 · 0k · 609s | 0/1 · 295k · 85s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 1316k · 289s |
| om2w-c801d1c9 | 1/1 · 1651k · 226s | 1/1 · 265k · 64s | 1/1 · 154k · 63s | 1/1 · 1396k · 142s | 1/1 · 634k · 114s | 0/1 · 1553k · 222s | 1/1 · 1173k · 202s |
| om2w-4c186c6e | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 628k · 104s | 0/1 · 2003k · 416s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-0a0fa834 | 0/1 · 1382k · 107s | 0/1 · 1267k · 108s | 0/1 · 643k · 65s | 1/1 · 342k · 59s | 0/1 · 296k · 127s | 1/1 · 877k · 122s | 0/1 · 978k · 124s |
| om2w-52efbab5 | 1/1 · 33k · 20s | 1/1 · 35k · 18s | 1/1 · 47k · 10s | 1/1 · 99k · 111s | 1/1 · 47k · 29s | 1/1 · 73k · 24s | 1/1 · 85k · 98s |
| om2w-aa4b5cb7 | 1/1 · 168k · 98s | 0/1 · 799k · 157s | 0/1 · 726k · 159s | 1/1 · 248k · 186s | 0/1 · 153k · 94s | 0/1 · 438k · 124s | 0/1 · 566k · 91s |
| om2w-2fc51dd3 | 0/1 · 522k · 125s | 0/1 · 528k · 80s | 0/1 · 296k · 80s | 1/1 · 514k · 171s | 1/1 · 436k · 173s | 0/1 · 541k · 50s | 1/1 · 1303k · 183s |
| om2w-9ed38272 | 1/1 · 2053k · 134s | 0/1 · 893k · 78s | 1/1 · 869k · 175s | 0/1 · 2187k · 231s | 1/1 · 1677k · 348s | 1/1 · 1587k · 202s | 0/1 · 1670k · 193s |
| om2w-824eb7bb | 1/1 · 1201k · 143s | 1/1 · 4606k · 325s | 1/1 · 3539k · 458s | 0/1 · 2931k · 289s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 4651k · 457s |
| om2w-9829f308 | 1/1 · 4439k · 431s | 1/1 · 2073k · 144s | 0/1 · 614k · 196s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 1/1 · 3461k · 252s | 0/1 · 2978k · 335s |
| om2w-7b182a50 | 1/1 · 222k · 69s | 1/1 · 551k · 127s | 1/1 · 72k · 29s | 1/1 · 170k · 48s | 1/1 · 108k · 52s | 1/1 · 254k · 75s | 1/1 · 534k · 87s |
| om2w-547f5729 | 0/1 · 976k · 559s | 0/1 · 478k · 197s | 1/1 · 1503k · 115s | 0/1 · 2245k · 437s | 0/1 · 50k · 88s | 0/1 · 2480k · 587s | 0/1 · 0k · 600s |
| om2w-070c907d | 1/1 · 447k · 46s | 0/1 · 30k · 18s | 0/1 · 30k · 37s | 1/1 · 1489k · 490s | 0/1 · 0k · 600s | 0/1 · 1253k · 338s | 1/1 · 664k · 93s |
| om2w-60cbbbd5 | 0/1 · 745k · 99s | 1/1 · 461k · 73s | 1/1 · 142k · 94s | 1/1 · 714k · 176s | 1/1 · 269k · 101s | 1/1 · 1474k · 189s | 0/1 · 831k · 225s |
| om2w-8689af4d | 1/1 · 834k · 57s | 0/1 · 627k · 121s | 1/1 · 409k · 63s | 0/1 · 116k · 23s | 1/1 · 208k · 49s | 0/1 · 526k · 58s | 1/1 · 620k · 72s |
| om2w-47e314cc | 0/1 · 0k · 600s | 0/1 · 4010k · 360s | 0/1 · 0k · 600s | 0/1 · 0k · 624s | 0/1 · 0k · 600s | 0/1 · 3518k · 387s | 0/1 · 5831k · 416s |
| om2w-a172a5d9 | 1/1 · 68k · 32s | 1/1 · 155k · 47s | 1/1 · 118k · 23s | 0/1 · 0k · 623s | 1/1 · 81k · 187s | 1/1 · 420k · 86s | 1/1 · 662k · 268s |
| om2w-6ebde509 | 0/1 · 540k · 59s | 0/1 · 4103k · 212s | 1/1 · 723k · 115s | 1/1 · 563k · 195s | 0/1 · 0k · 624s | 0/1 · 2917k · 403s | 1/1 · 347k · 95s |
| om2w-f389398d | 0/1 · 110k · 31s | 0/1 · 198k · 24s | 0/1 · 145k · 47s | 0/1 · 121k · 55s | 0/1 · 0k · 600s | 0/1 · 723k · 118s | 0/1 · 507k · 65s |
| om2w-1b867afe | 1/1 · 903k · 58s | 1/1 · 693k · 54s | 1/1 · 2765k · 264s | 1/1 · 475k · 112s | 1/1 · 783k · 160s | 1/1 · 1324k · 141s | 1/1 · 1029k · 163s |
| om2w-690d7b4a | 1/1 · 736k · 55s | 1/1 · 597k · 52s | 1/1 · 187k · 57s | 1/1 · 175k · 54s | 1/1 · 88k · 32s | 1/1 · 722k · 65s | 1/1 · 504k · 71s |
| om2w-f2097f92 | 1/1 · 628k · 186s | 1/1 · 408k · 150s | 1/1 · 152k · 51s | 1/1 · 170k · 63s | 1/1 · 170k · 107s | 1/1 · 230k · 187s | 1/1 · 290k · 200s |
| om2w-dcd26e66 | 0/1 · 1973k · 105s | 0/1 · 2072k · 104s | 1/1 · 2623k · 178s | 0/1 · 1907k · 347s | 1/1 · 240k · 166s | 1/1 · 1174k · 146s | 1/1 · 1033k · 136s |
| om2w-515f2e58 | 0/1 · 2426k · 388s | 1/1 · 2628k · 366s | 0/1 · 434k · 95s | 1/1 · 842k · 188s | 1/1 · 589k · 213s | 1/1 · 1247k · 284s | 1/1 · 1826k · 356s |
| om2w-9d46ccb9 | 0/1 · 1813k · 207s | 0/1 · 3354k · 405s | 1/1 · 2132k · 252s | 1/1 · 339k · 70s | 1/1 · 354k · 153s | 1/1 · 2540k · 231s | 1/1 · 1172k · 334s |
| om2w-9d09bc94 | 1/1 · 889k · 154s | 0/1 · 0k · 600s | 0/1 · 871k · 70s | 1/1 · 435k · 102s | 1/1 · 172k · 130s | 1/1 · 1149k · 164s | 1/1 · 1744k · 553s |
| om2w-d71be72a | 1/1 · 78k · 18s | 0/1 · 62k · 15s | 1/1 · 102k · 24s | 0/1 · 64k · 21s | 0/1 · 129k · 53s | 0/1 · 266k · 61s | 0/1 · 127k · 29s |
| om2w-43a1ca25 | 0/1 · 3039k · 519s | 0/1 · 1203k · 174s | 0/1 · 834k · 270s | 0/1 · 2541k · 445s | 0/1 · 0k · 600s | 0/1 · 3547k · 354s | 0/1 · 3788k · 435s |
| om2w-ba01ea55 | 1/1 · 939k · 154s | 1/1 · 985k · 84s | 1/1 · 678k · 64s | 1/1 · 1213k · 118s | 0/1 · 991k · 198s | 0/1 · 1506k · 217s | 1/1 · 1102k · 171s |
| om2w-f2be37a9 | 0/1 · 2145k · 156s | 1/1 · 1345k · 92s | 1/1 · 2242k · 240s | 0/1 · 1188k · 155s | 1/1 · 949k · 156s | 0/1 · 3744k · 380s | 0/1 · 994k · 159s |
| om2w-ade4c09a | 0/1 · 116k · 36s | 0/1 · 83k · 33s | 0/1 · 52k · 59s | 0/1 · 124k · 58s | 0/1 · 94k · 43s | 0/1 · 273k · 40s | 0/1 · 147k · 32s |
| om2w-84f806c7 | 0/1 · 2203k · 219s | 1/1 · 673k · 151s | 0/1 · 621k · 189s | 1/1 · 933k · 146s | 1/1 · 368k · 104s | 0/1 · 2553k · 316s | 0/1 · 2001k · 221s |
| om2w-7072d094 | 1/1 · 541k · 88s | 1/1 · 794k · 88s | 0/1 · 603k · 80s | 1/1 · 500k · 97s | 1/1 · 242k · 99s | 1/1 · 316k · 57s | 0/1 · 628k · 63s |
| om2w-b64f938a | 0/1 · 4366k · 469s | 0/1 · 3632k · 463s | 0/1 · 1920k · 326s | 0/1 · 2141k · 406s | 0/1 · 1033k · 337s | 0/1 · 2824k · 389s | 0/1 · 0k · 600s |
| om2w-92a3d423 | 1/1 · 145k · 41s | 1/1 · 149k · 33s | 1/1 · 179k · 50s | 1/1 · 53k · 56s | 1/1 · 62k · 49s | 1/1 · 213k · 33s | 1/1 · 296k · 52s |
| om2w-64b76158 | 0/1 · 1345k · 143s | 0/1 · 3453k · 388s | 0/1 · 465k · 140s | 0/1 · 869k · 237s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-82eb3bfe | 1/1 · 786k · 183s | 1/1 · 273k · 43s | 0/1 · 1382k · 280s | 0/1 · 680k · 141s | 1/1 · 515k · 224s | 1/1 · 882k · 69s | 1/1 · 1141k · 115s |
| om2w-1c3b747a | 0/1 · 1498k · 120s | 0/1 · 762k · 209s | 0/1 · 419k · 112s | 1/1 · 451k · 114s | 0/1 · 1118k · 267s | 0/1 · 639k · 141s | 0/1 · 2193k · 483s |
| om2w-47bfe8a7 | 0/1 · 1903k · 314s | 0/1 · 4136k · 456s | 0/1 · 0k · 600s | 0/1 · 726k · 426s | 0/1 · 0k · 600s | 1/1 · 843k · 164s | 1/1 · 2545k · 426s |
| om2w-a96fca87 | 1/1 · 1663k · 176s | 1/1 · 190k · 33s | 0/1 · 610k · 122s | 0/1 · 10k · 5s | 0/1 · 132k · 75s | 1/1 · 1100k · 141s | 0/1 · 393k · 86s |
| om2w-5dec0e66 | 0/1 · 0k · 600s | 0/1 · 3036k · 415s | 0/1 · 1012k · 206s | 0/1 · 3186k · 574s | 0/1 · 0k · 600s | 0/1 · 0k · 600s | 0/1 · 0k · 600s |
| om2w-59b7b990 | 1/1 · 3932k · 414s | 0/1 · 1067k · 165s | 0/1 · 1434k · 375s | 0/1 · 1341k · 154s | 0/1 · 933k · 264s | 1/1 · 1946k · 281s | 0/1 · 2097k · 580s |
| om2w-905cb530 | 1/1 · 2796k · 229s | 0/1 · 0k · 600s | 1/1 · 2299k · 136s | 1/1 · 386k · 68s | 1/1 · 1312k · 323s | 1/1 · 1092k · 145s | 1/1 · 1843k · 199s |
| om2w-65c4030f | 1/1 · 551k · 85s | 1/1 · 718k · 65s | 1/1 · 121k · 26s | 1/1 · 156k · 53s | 0/1 · 166k · 74s | 0/1 · 331k · 62s | 1/1 · 574k · 98s |

_Each cell: passed/runs · median tokens · median time._

### Failed runs

- **agent-browser** · om2w-070c907d #1: WebJudge: failure. The agent never applied or confirmed a 5-mile radius filter for zip code 90210 and did not display filtered results or select a pediatric dentist within that distance. It only perfo
- **agent-browser** · om2w-11abb668 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-1c3b747a #1: WebJudge: failure. The agent correctly filtered to ongoing competitions and sorted by prize, identifying “ARC Prize 2026 – ARC-AGI-3” as the highest-prize active competition (steps 1–3). However, with
- **agent-browser** · om2w-271b36ef #1: timeout after 10 min
- **agent-browser** · om2w-27fa3ac2 #1: WebJudge: failure. The agent did apply term, day, time, and graduate‐level filters and clicked through individual “Schedule for CHEM XXX” links, but it never actually surfaced or summarized the meetin
- **agent-browser** · om2w-2fc51dd3 #1: WebJudge: failure. The agent searched by zip code 60538 (key point #1) but never applied or confirmed a climate-controlled filter (key point #3). It only opened a facility page and viewed a 10'x10' si
- **agent-browser** · om2w-3ef64f34 #1: WebJudge: failure. The agent correctly accessed YouTube Kids without logging in, verified parental age (1992), skipped sign-in, accepted privacy terms, selected the “Younger (5–8)” profile, turned sea
- **agent-browser** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly searched for neurosurgeons in Chicago and opened the Availability filter, even checking “Tomorrow.” However, there is no evidence that the filter was applied (no
- **agent-browser** · om2w-442a450e #1: WebJudge: failure. The agent successfully located the 401(k) calculator and adjusted the sliders toward the required inputs (ages, 3% return, $8,000 employee and employer contributions), but it never 
- **agent-browser** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-4c186c6e #1: timeout after 10 min
- **agent-browser** · om2w-547f5729 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-5d542a7e #1: WebJudge: failure. The agent did open the CVPR 2022 page and attempted to use the OpenAlex API to filter works by source.id and year=2022 sorted by citation count, but there is no snapshot or output s
- **agent-browser** · om2w-5dec0e66 #1: timeout after 10 min
- **agent-browser** · om2w-63d6866f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-64b76158 #1: timeout after 10 min
- **agent-browser** · om2w-65c4030f #1: WebJudge: failure. The agent correctly filtered by specialty (“Cardiology”) and location (“Jacksonville, FL”) and found Dr. Mays T. Ali, M.D., a cardiologist in Jacksonville. However, it never applied
- **agent-browser** · om2w-6b2cfae0 #1: WebJudge: failure. The agent navigated to Devin Booker’s NBA page and attempted various data fetches, but never extracted or displayed the playoff points‐per‐game for each postseason run, nor filtered
- **agent-browser** · om2w-6ca20f1d #1: WebJudge: failure. The agent successfully navigated to and read the child benefit overview, eligibility, and how-to-claim pages, but never presented or summarized the eligibility criteria, how it work
- **agent-browser** · om2w-6ebde509 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-783ce6a3 #1: WebJudge: failure. The agent successfully applied both the Florida campus and Internship type filters on the Mayo Clinic College of Medicine and Science site and navigated through all paginated result
- **agent-browser** · om2w-824eb7bb #1: timeout after 10 min
- **agent-browser** · om2w-84f806c7 #1: WebJudge: failure. The agent never finalized the search by explicitly sorting or confirming “Nearest” for bird‐only shelters around 10012. Although they injected a URL with postalCode=10012, radius=50
- **agent-browser** · om2w-8689af4d #1: WebJudge: failure. The agent did locate a certified refurbished iPad Air (256 GB, Blue) and successfully added it to the bag, confirming the bag total at \$669.00. However, it never applied or confirm
- **agent-browser** · om2w-987bad7c #1: timeout after 10 min
- **agent-browser** · om2w-a5c87cc1 #1: WebJudge: failure. The agent successfully navigated to the AccuWeather air‐quality page for Maine North, County Cork, Ireland and located the SO₂ concentration (0 µg/m³) with an “Excellent” rating. Ho
- **agent-browser** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Tesla’s historical data page and applied a date range filter for March 17, 2023, but never extracted or reported the actual closing stock price for 
- **agent-browser** · om2w-a8b9edd5 #1: WebJudge: failure. The agent successfully navigated to the FedEx Rate & Ship form, entered the origin (Dallas, TX 75201), destination (New York, NY 10001), and package weight (4 lb), clicked to get ra
- **agent-browser** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly applied the filters for score “10” and category “Board,” navigated to the resulting board game review on IGN, and opened the review page. However, there is no co
- **agent-browser** · om2w-ade4c09a #1: WebJudge: failure. The agent successfully navigated to FlightAware’s AeroAPI page and identified the plan names (e.g., Personal, Standard, Premium), but it never retrieved or compared any of the actua
- **agent-browser** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly selected Fall 2023, Computer Science, Graduate level, and Tuesdays, but it never applied the “Start Time” filter for courses beginning between 2:00 pm and 6:00 p
- **agent-browser** · om2w-ba01ea55 #1: WebJudge: failure. The agent correctly navigated to Google Maps, set location to Manhattan, NY, filtered for 4 guests, and sorted by rating. However, they clicked on “Pestana Park Avenue” (4.8★), the 
- **agent-browser** · om2w-ba2a469a #1: WebJudge: failure. The agent only performed a keyword search for “beginner computer science python” but never applied the Coursera “Level → Beginner” filter or confirmed an explicit “Beginner” label o
- **agent-browser** · om2w-bf3b311c #1: WebJudge: failure. The user wanted a side-by-side comparison of Apple Watch models and then detailed information on the Ultra version. The agent did open the “Compare Apple Watch Models” page, but nev
- **agent-browser** · om2w-c1d6ea6f #1: timeout after 10 min
- **agent-browser** · om2w-c3a33396 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-c801d1c9 #1: WebJudge: failure. The agent assumed “Labyrinthine” was the 2023 VR Game of the Year without capturing or confirming that it actually won the award (step 1). It did browse that game’s reviews, applied
- **agent-browser** · om2w-c94551d2 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-d1970c16 #1: WebJudge: failure. Although the agent eventually invoked an add_to_cart with quantity 5 and the cart icon shows “5,” none of the provided snapshots ever display the required filters (Dry, 2020, United
- **agent-browser** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s MacBook Air specs page, selected the Tech Specs tab, and toggled between the 13-inch and 15-inch models. However, it never scrolled or ex
- **agent-browser** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly located the SAM2 repo and applied the author filter for NielsRogge, but never navigated to the bottom of the filtered commit list or otherwise identified which c
- **agent-browser** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent successfully searched for “Pediatrician” near 90028 and applied the “4 Stars & Up” rating filter, confirming key points #1, #2, and #4. However, at no point did the agent 
- **agent-browser** · om2w-f2be37a9 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **agent-browser** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the Climate news section on The Weather Network and opened several articles, but never applied or confirmed a “newest” sort or filter on the clim
- **playwright-cli** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly set the departure port to Los Angeles and sorted by lowest price, but it never properly applied a “at least 8 days” duration filter (instead trying 14-day and 15
- **playwright-cli** · om2w-1c3b747a #1: WebJudge: failure. The agent correctly fetched a list of active competitions sorted by prize, but then navigated to the ARC Prize 2026 competition instead of the NFL Big Data Bowl 2027 (the contest wi
- **playwright-cli** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly set the Winter 2022–23 term, department code (CHEM), and active status filters, and used the timeschedule view and programmatic XML filtering to identify courses
- **playwright-cli** · om2w-29b7372d #1: WebJudge: failure. The agent successfully navigated to Google Finance and located the Microsoft stock page (steps 1–2). However, there is no evidence a “Top news” sort filter was applied (key point 3)
- **playwright-cli** · om2w-3ef64f34 #1: WebJudge: failure. The agent correctly accessed YouTube Kids, passed the parental gate (birth year 1992), skipped sign-in, left search disabled, and chose the appropriate content experience for a 6-ye
- **playwright-cli** · om2w-43a1ca25 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-cli** · om2w-547f5729 #1: timeout after 10 min
- **playwright-cli** · om2w-59b7b990 #1: WebJudge: failure. The agent successfully applied filters for New Mexico, Luna County, owner financing, homesites, and “listed in the last 30 days,” and even applied a sort by price per acre (low to h
- **playwright-cli** · om2w-5d542a7e #1: WebJudge: failure. The agent successfully listed the CVPR 2022 papers via DBLP and retrieved citation counts by querying the OpenAlex API sorted by citations. However, it never explicitly identified o
- **playwright-cli** · om2w-5dec0e66 #1: timeout after 10 min
- **playwright-cli** · om2w-60cbbbd5 #1: WebJudge: failure. The agent never correctly applied a “Phone Number Used” filter for the exact nine-digit number 555555555. Instead it mis-used a “Scam ID” filter (showing 0 results) then searched a 
- **playwright-cli** · om2w-63d6866f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-64b76158 #1: timeout after 10 min
- **playwright-cli** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-cli** · om2w-6ca20f1d #1: WebJudge: failure. The agent correctly located and navigated to the Child Benefit overview, eligibility, and how-to-claim pages, but at no point did it surface the actual eligibility criteria, the “ho
- **playwright-cli** · om2w-7072d094 #1: WebJudge: failure. The agent correctly applied the “No Foreign Transaction Fee” filter, selected the first two personal cards (Platinum and Gold), and launched the comparison interface. However, the f
- **playwright-cli** · om2w-824eb7bb #1: WebJudge: failure. The agent did navigate to the Women’s Black Swimsuits collection, applied the size “L” filter and sorted by price ascending. It identified the lowest‐price item (the Women’s Shaping
- **playwright-cli** · om2w-84f806c7 #1: WebJudge: failure. The agent successfully entered the ZIP code 10012, selected “Birds” as the species, and even set sorting to “Nearest,” but it never applied or confirmed a filter restricting results
- **playwright-cli** · om2w-9829f308 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-cli** · om2w-9ed38272 #1: WebJudge: failure. The agent correctly set the starting balance, rate of return, current tax rate, retirement tax rate, and monthly contribution, and it displayed a comparison chart with Roth IRA and 
- **playwright-cli** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Tesla’s historical data page and set the date range to include March 17, 2023. It located the “Mar 17, 2023” row but never extracted or displayed th
- **playwright-cli** · om2w-a96fca87 #1: WebJudge: failure. The agent did navigate to the Business pricing tab and exposed the “Estimated price calculator,” but none of the snapshots actually show the calculator after it’s been set to 100 us
- **playwright-cli** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly filtered by category (Board) and score (10) on the IGN reviews page but never demonstrated that the “Editors’ Choice” toggle was actually applied or that any res
- **playwright-cli** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the AeroAPI landing page and located the section IDs for pricing cards and comparison tables, but it never actually clicked “View pricing tiers” or fetched an
- **playwright-cli** · om2w-b64f938a #1: timeout after 10 min
- **playwright-cli** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-cli** · om2w-c94551d2 #1: timeout after 10 min
- **playwright-cli** · om2w-d1970c16 #1: WebJudge: failure. The agent never confirmed the user’s age or selected Texas as the shipping state via the required pop‐up, and no explicit filters for vintage, dryness, U.S. origin, or the $15–$20 p
- **playwright-cli** · om2w-d71be72a #1: WebJudge: failure. The agent successfully accessed Apple’s official site, navigated to the MacBook Air page, clicked the “Tech Specs” tab, and toggled between the 13-inch and 15-inch models. However, 
- **playwright-cli** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly identified the official facebookresearch/sam2 repository, listed commits, and applied the author filter for NielsRogge. However, it never switched the commit vie
- **playwright-cli** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly searched for “Pediatrician” near zip code 90028 and applied the ≥ 4-star rating filter, but it never used the site’s specialty filter to restrict results to Inte
- **playwright-cli** · om2w-f2be37a9 #1: WebJudge: failure. The agent correctly navigated to the event‐search page, opened the “Companion Events” section, checked “Obedience,” and set “New York” in the state filter. However, it never applied
- **playwright-cli** · om2w-f389398d #1: WebJudge: failure. The agent successfully navigated to the climate news section but never applied or confirmed a “latest” sort/filter to order articles by date. No filter control was used, and there’s
- **playwright-cli** · om2w-fa9adb81 #1: WebJudge: failure. The agent correctly navigated to and identified “finebyme_2.mp3” as the #1 track on the Top 50 Rock chart (steps 2 and 3). However, it never provided clear evidence on a user’s home
- **playwright-mcp** · om2w-07ec4a12 #1: WebJudge: failure. The agent successfully entered both “Folate Forte (multivitamin)” and “melatonin” into the interaction checker, but it never clicked the “Check Interactions” button or displayed the
- **playwright-mcp** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered departures from Los Angeles for cruises lasting at least 8 days and sorted by lowest price, then navigated to the cheapest 8-day Mexican Riviera itinera
- **playwright-mcp** · om2w-11abb668 #1: timeout after 10 min
- **playwright-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent never drilled down into a Dearborn-specific giving mechanism or form. Although it located a generic “Make a Gift” page and even navigated to a URL with a “#!um-dearborn” f
- **playwright-mcp** · om2w-1c3b747a #1: WebJudge: failure. The agent never selected the highest‐prize ongoing competition (“NFL Big Data Bowl 2027” at \$100,000) after filtering active competitions by prize. Instead, it repeatedly navigated
- **playwright-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to Stanford’s ExploreCourses, applied department=CHEM and term=Winter filters, fetched and parsed XML to programmatically identify graduate-level (3
- **playwright-mcp** · om2w-2fc51dd3 #1: WebJudge: failure. The agent correctly searched near 60538 and applied the climate-controlled filter, yielding a 10′×10′ “Medium” unit at 184 Route 30. However, it never verified or selected a unit si
- **playwright-mcp** · om2w-323bd85e #1: WebJudge: failure. The agent successfully located the Amtrak “Passenger Identification” page detailing when ID is required and listing acceptable forms (e.g., one government‐issued photo ID or two IDs
- **playwright-mcp** · om2w-3ef64f34 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly found neurosurgeons and applied the “Tomorrow” availability filter, satisfying steps 1 and 3. However, there is no indication that the agent applied or verified 
- **playwright-mcp** · om2w-47bfe8a7 #1: WebJudge: failure. The agent correctly filtered the list to Xiaomi and sorted by popularity (using the brand checkbox and “Popularity” sort), then identified the two top models (Redmi K90 Max and Redm
- **playwright-mcp** · om2w-47e314cc #1: timeout after 10 min
- **playwright-mcp** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-mcp** · om2w-515f2e58 #1: WebJudge: failure. The agent did eventually apply all required filters—price $25–$200, condition “New,” form factor M.2 2280—and scoped the search to “Samsung internal M.2 SSD.” However, the final scr
- **playwright-mcp** · om2w-547f5729 #1: WebJudge: failure. The agent never applied the required filters for 3 bedrooms, 2+ bathrooms, or the $1500–$2500 price range on the NYC listings page. It only navigated various proxies and archive sna
- **playwright-mcp** · om2w-5dec0e66 #1: timeout after 10 min
- **playwright-mcp** · om2w-60cbbbd5 #1: WebJudge: failure. The agent did navigate to BBB’s Scam Tracker and used the “Look Up a Scam” tool to search the exact number 555-555-5555 (entered as “555555555” then “555-555-5555”), and saw “Search
- **playwright-mcp** · om2w-63d6866f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent browsed various Healthline articles on general pescatarian diets, vegetarian vs vegan vs pescatarian, Mediterranean diet, and meal delivery, but never selected two distinc
- **playwright-mcp** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-mcp** · om2w-6ca20f1d #1: WebJudge: failure. The agent navigated to the Child Benefit main page, the eligibility page, and the how-to-claim page, and took snapshots of the table of contents, but never retrieved or displayed th
- **playwright-mcp** · om2w-6ebde509 #1: WebJudge: failure. The agent successfully navigated to Target’s careers page, entered “Miami, FL” as the location, and ran a search. They also typed “Human Resources” into the search box. However, the
- **playwright-mcp** · om2w-75146b7b #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-75a1b5dc #1: WebJudge: failure. The agent never selected a specific beef sirloin recipe nor opened its reviews section. The key points—targeting a recipe with beef sirloin and opening its reviews—were not met.
- **playwright-mcp** · om2w-783ce6a3 #1: WebJudge: failure. The agent correctly navigated to the Mayo Clinic College site, applied the exact filters for Location=Florida and Program Type=Internship, and confirmed there are 24 matching progra
- **playwright-mcp** · om2w-84f806c7 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-987bad7c #1: timeout after 10 min
- **playwright-mcp** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to the UPS shipping calculator, entered the origin (New York, NY 10001), destination (Truckee, CA 96162), package dimensions (4×4×4 inches), and weight
- **playwright-mcp** · om2w-a5c87cc1 #1: WebJudge: failure. The agent ultimately navigated to the correct Air Quality Index page for Maine North and executed code to extract the “Over the past hour” section and parse the SO₂ line. However, n
- **playwright-mcp** · om2w-a6f0434c #1: WebJudge: failure. The agent navigated to Tesla’s historical data page and set the date range to include March 17, 2023, but never displayed or extracted the closing price for that specific date. Key 
- **playwright-mcp** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to FlightAware, located the AeroAPI page, identified plan categories (Personal, Standard, Premium) but did not retrieve or display their details side by side to 
- **playwright-mcp** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied filters for term (Fall 2023), course level (Graduate), time ranges (2–4 pm and 4–6 pm), and subject (Computer Science). However, after navigating directl
- **playwright-mcp** · om2w-ba2a469a #1: WebJudge: failure. The agent did perform searches with “beginner computer science python” and even appended the level=Beginner parameter in the URL, but it never used the site’s filter controls to loc
- **playwright-mcp** · om2w-c1d6ea6f #1: timeout after 10 min
- **playwright-mcp** · om2w-c3a33396 #1: WebJudge: failure. The agent correctly applied filters for certified pre-owned, model line “911,” location 97007 with a 200 mi radius, and sorted by price low to high. However, the required model‐year
- **playwright-mcp** · om2w-c94551d2 #1: timeout after 10 min
- **playwright-mcp** · om2w-d1970c16 #1: WebJudge: failure. The agent only sorted by price and searched keywords but never applied a price range filter ($15–$20) or a dryness filter (“dry”). It also did not confirm that the selected 2020 Pin
- **playwright-mcp** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly navigated to the facebookresearch/sam2 repo, applied the author filter for NielsRogge, and opened a commit page. However, there is no evidence they sorted or scr
- **playwright-mcp** · om2w-dcd26e66 #1: WebJudge: failure. The agent correctly located and completed the 5-question weight management quiz, supplying answers that match all user factors (strong support system; enjoys cooking, family time, t
- **playwright-mcp** · om2w-e9f4dfc6 #1: timeout after 10 min
- **playwright-mcp** · om2w-f00e7acc #1: WebJudge: failure. The agent successfully navigated to the AccuWeather hourly forecast page for Boston, but never extracted or displayed any of the actual hourly forecast data (times, temperatures, co
- **playwright-mcp** · om2w-f05e87c5 #1: WebJudge: failure. The agent applied the batch filters (Winter/Summer 2022 & 2023) and “Is Hiring” and even tapped into the Algolia API, but never correctly applied the “Based in France” filter in the
- **playwright-mcp** · om2w-f2be37a9 #1: WebJudge: failure. The agent did select the Obedience category and set the state filter to New York, but it never applied a proper date range via the site’s date‐picker controls – only the ending date
- **playwright-mcp** · om2w-f389398d #1: WebJudge: failure. The agent navigated to the climate news section (meeting key point #1) but never applied or confirmed a “sort by latest” filter or control. It only viewed featured articles without 
- **playwright-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to and displayed the user homepage for “beevader” and showed a reposted track (“finebyme_2.mp3”), satisfying key points #1 and #2. However, there is
- **playwright-mcp** · om2w-fb7b4f78 #1: WebJudge: failure. The agent only navigated to the Discogs homepage and did not open or display the submissions overview page for releases. Key point 2 (view overview of the submission of releases) wa
- **playwright-mcp-tuned** · om2w-070c907d #1: WebJudge: failure. The agent only navigated to the general dentist search page for zip code 90210 and did not apply any specialty filter for pediatric dentistry nor a 5-mile distance filter. Key point
- **playwright-mcp-tuned** · om2w-0a0fa834 #1: WebJudge: failure. The agent correctly filtered by departure port (Los Angeles), applied the duration filter for at least 8 days, and sorted results by lowest price, then navigated to the cheapest 8-d
- **playwright-mcp-tuned** · om2w-11abb668 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-180ed2ec #1: WebJudge: failure. The agent successfully located the “Giving” sections on both the central UM site and the UM-Dearborn site and even navigated to the UM-Dearborn giving priorities page, but at no poi
- **playwright-mcp-tuned** · om2w-1c3b747a #1: WebJudge: failure. The agent correctly applied the “Active” filter and sorted by “Reward” to pick the top‐prize ongoing competition (ARC Prize 2026 – ARC-AGI-3). It then opened the Code tab and sorted
- **playwright-mcp-tuned** · om2w-2fc51dd3 #1: WebJudge: failure. The agent successfully filtered for climate-controlled units and located a facility 2.7 miles from 60538 offering a 10′×10′ climate-controlled unit. However, it never confirmed—via 
- **playwright-mcp-tuned** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly filtered the search results for “Tomorrow” availability and identified several neurosurgeon profiles, meeting key points #1 (specialty) and #3 (appointment filte
- **playwright-mcp-tuned** · om2w-47bfe8a7 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-47e314cc #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-4c186c6e #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-547f5729 #1: WebJudge: failure. The agent only navigated to the condos page and even used a 3-bedroom URL, but never applied the 2+ bathrooms filter or the $1500–$2500 price range filter, nor displayed any filtere
- **playwright-mcp-tuned** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly applied filters for location (New Mexico, Luna County), property type (homesite), owner financing, and listing date (past 30 days). However, at no point did it u
- **playwright-mcp-tuned** · om2w-5d542a7e #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-5dec0e66 #1: WebJudge: failure. The agent applied the 240 Hz filter and set the $1000–$2000 price range and used “QLED gaming monitor 240hz” as the search term, but it never applied a screen-size filter (33–49″). 
- **playwright-mcp-tuned** · om2w-63d6866f #1: WebJudge: failure. The agent correctly navigated to the Hong Kong attractions page, sorted by popularity, and identified Hong Kong Disneyland as the #1 attraction (steps 1–2). However, despite many at
- **playwright-mcp-tuned** · om2w-64b76158 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-6b2cfae0 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-6ca20f1d #1: WebJudge: failure. The agent correctly navigated to the Child Benefit landing page, the eligibility page, and the claim page, but the snapshots (and reasoning) only show page headers and tables of con
- **playwright-mcp-tuned** · om2w-6ebde509 #1: WebJudge: failure. The agent successfully entered “Human Resources” into the Target careers search and opened the Location filter, typing “Miami, FL” into the location box. However, the agent never co
- **playwright-mcp-tuned** · om2w-8689af4d #1: WebJudge: failure. The agent never applied the Storage filter to select 256 GB nor the Finish filter to restrict to blue—only the Model filter was used. Instead, it manually navigated to a presumed ch
- **playwright-mcp-tuned** · om2w-905cb530 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-987bad7c #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-9d09bc94 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-9d46ccb9 #1: WebJudge: failure. The agent correctly navigated to UPS’s rate‐quote page and filled in origin (New York, 10001), destination (Truckee, 96162), package dimensions (4×4×4 in) and weight (5 lbs), then c
- **playwright-mcp-tuned** · om2w-9ed38272 #1: WebJudge: failure. The agent navigated correctly to the Chase IRA calculator, set all inputs exactly as specified (age 30 to 65, $30 000 start, 3% return, 13% current tax, 24% retirement tax), and gen
- **playwright-mcp-tuned** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Yahoo Finance, searched for TSLA, clicked the Historical Data tab, set the date range to include March 17, 2023 (via URL parameters), and retrieved 
- **playwright-mcp-tuned** · om2w-a8b9edd5 #1: WebJudge: failure. The agent correctly navigated to the FedEx rate page, rejected cookies, entered “Texas” as origin, “New York” as destination, set weight to 4 pounds, and clicked “Show Rates.” It th
- **playwright-mcp-tuned** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly navigated to IGN, applied the Board genre, score “10” filter, and checked the Editor’s Choice box. However, it then opened the “Undaunted: Stalingrad Board Game 
- **playwright-mcp-tuned** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated to the AeroAPI pricing page and retrieved the tab labels and panel content, but it did not present or compare the actual plans. The key requirement “Compare avai
- **playwright-mcp-tuned** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-b9225088 #1: WebJudge: failure. Although the agent successfully navigated to the Computer Sciences & Technology tenured/tenure-track page and clicked the California location filter, the resulting listings still in
- **playwright-mcp-tuned** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly applied all required filters—Term = Fall 2023, Course Level = Graduate, Subject = Computer Science, Days Offered = Tuesday, and Start Time = 2:00 pm–4:00 pm plus
- **playwright-mcp-tuned** · om2w-c1d6ea6f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **playwright-mcp-tuned** · om2w-c39d6c24 #1: WebJudge: failure. The agent successfully navigated to Ahri’s champion page and located the skins carousel, but only clicked the next arrow once—revealing “After Hours Spirit Blossom Springs Ahri”—and
- **playwright-mcp-tuned** · om2w-c3a33396 #1: timeout after 10 min
- **playwright-mcp-tuned** · om2w-c94551d2 #1: WebJudge: failure. The agent navigated to the cats-for-adoption page and applied the 25-mile distance parameter, but never applied an age filter (young or adult) and sorted by “recent” (newest) rather
- **playwright-mcp-tuned** · om2w-d1970c16 #1: WebJudge: failure. The agent never applied specific filters for year (2020), wine type (dry red), origin (United States), or price range (\$15–\$20). Instead, it browsed multiple pages without confirm
- **playwright-mcp-tuned** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s official MacBook Air Tech Specs page (ensuring the latest model), but never extracted or displayed any of the actual technical specificat
- **playwright-mcp-tuned** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly located the official SAM2 repository and applied the author filter for NielsRogge, but never sorted commits by oldest/earliest date or navigated to the end of th
- **playwright-mcp-tuned** · om2w-dcd26e66 #1: WebJudge: failure. The agent successfully located and completed the full five‐question weight management quiz, selecting answers that match the user’s strong support system (#6), joy in cooking, famil
- **playwright-mcp-tuned** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent successfully browsed pediatricians, set the location to ZIP 90028, and applied the 4-star-and-up rating filter (visible in the final snapshot). However, there is no eviden
- **playwright-mcp-tuned** · om2w-f00e7acc #1: WebJudge: failure. The agent repeatedly attempted to load the AccuWeather hourly forecast page for Boston but never extracted or displayed any hourly forecast data. The final snapshot only shows a JSO
- **playwright-mcp-tuned** · om2w-f05e87c5 #1: WebJudge: failure. The agent correctly used Algolia facetFilters to restrict to exactly the 2022 and 2023 batches, to companies in France, and to those hiring. They pulled back the matching hits, enum
- **playwright-mcp-tuned** · om2w-f389398d #1: WebJudge: failure. The agent navigated to the climate news section and opened one featured article but never applied or confirmed a “latest” sort/filter on the climate news listings. There is no evide
- **playwright-mcp-tuned** · om2w-fa9adb81 #1: WebJudge: failure. The agent did browse a user homepage and found a repost, but never confirmed that the reposted track (finebyme_2.mp3) was in fact the #1 song on the Top 50 Rock chart. There is no e
- **stagehand** · om2w-070c907d #1: WebJudge: failure. The agent navigated to Healthgrades and even constructed a search URL for “pediatric dentist” with location=90210, but never applied or confirmed a 5-mile distance filter nor used t
- **stagehand** · om2w-0a0fa834 #1: WebJudge: failure. The agent successfully applied the departure port (Los Angeles) and duration (6–9 days, covering ≥8 days) filters but never demonstrated sorting by price to identify the cheapest cr
- **stagehand** · om2w-1c3b747a #1: WebJudge: failure. The agent never properly applied a “sort by prize (highest)” filter on the ongoing competitions list. Instead of selecting the NFL Big Data Bowl 2027 ($100,000) as the top‐prize ong
- **stagehand** · om2w-27fa3ac2 #1: WebJudge: failure. The agent successfully navigated to Stanford’s ExploreCourses, applied filters for Winter 2022–2023, the CHEM department, graduate‐level courses, and attempted to set “Monday” (day-
- **stagehand** · om2w-2fc51dd3 #1: WebJudge: failure. The agent successfully navigated to PublicStorage.com, searched zip code 60538, applied the “Climate Controlled” filter, and selected a 10′×10′ unit at 184 Route 30, Aurora, IL (2.7
- **stagehand** · om2w-3ef64f34 #1: timeout after 10 min
- **stagehand** · om2w-43a1ca25 #1: WebJudge: failure. The agent successfully searched for “Neurosurgeon” and applied the “Tomorrow” availability filter, verifying appointment openings tomorrow (steps 1 & 3). However, at no point did th
- **stagehand** · om2w-461ab9b0 #1: WebJudge: failure. The agent navigated to the Rule 605 Reports page and identified where the “July 2024” link appears, but never actually clicked it or retrieved the July 2024 Market Center Files. No 
- **stagehand** · om2w-47bfe8a7 #1: timeout after 10 min
- **stagehand** · om2w-47e314cc #1: timeout after 10 min
- **stagehand** · om2w-515f2e58 #1: WebJudge: failure. The agent correctly searched for “Samsung internal M.2 SSD” and applied the $25–$200 price filter (step 7) and the “New” condition filter (step 9). However, it never used the “Sort 
- **stagehand** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly applied filters for location (New Mexico, Luna County), property type (homesite), financing (owner-financing), and listing date (past 30 days). However, there is
- **stagehand** · om2w-5d542a7e #1: WebJudge: failure. The agent correctly navigated to the CVPR 2022 page and, realizing DBLP has no built-in citation sort, used the OpenAlex API to filter by source ID (CVPR 2022) and year 2022, sortin
- **stagehand** · om2w-5dec0e66 #1: WebJudge: failure. The agent did enter “QLED gaming monitor 240Hz” in the search bar and applied the 240 Hz, size (34″–39.9″ and 40″ or More), and three price brackets ($1000–$1249.99, $1250–$1499.99,
- **stagehand** · om2w-63d6866f #1: WebJudge: failure. The agent never applied a “highest popularity” filter to identify the most popular Hong Kong attraction, never extracted its PlaceID, nor performed a proper Nearby Search by type “a
- **stagehand** · om2w-64b76158 #1: WebJudge: failure. The agent only navigated to various Healthline pages and fetched status codes and titles for two URLs but never compared the diets or discussed healthier eating; it did not present 
- **stagehand** · om2w-6b2cfae0 #1: timeout after 10 min
- **stagehand** · om2w-6ca20f1d #1: WebJudge: failure. The agent successfully navigated to and retrieved the eligibility details and the how-to-claim instructions, but it never navigated to or extracted the “How it works” section (e.g.,
- **stagehand** · om2w-7072d094 #1: WebJudge: failure. The agent correctly filtered for “No Foreign Transaction Fee” personal cards, selected the first two (Platinum and Gold), and navigated to the comparison page. However, the displaye
- **stagehand** · om2w-82eb3bfe #1: WebJudge: failure. The agent successfully opened the XRP chart on CoinMarketCap and confirmed XRP was selected, satisfying steps 1 and 2. However, there is no evidence in the action history or snapsho
- **stagehand** · om2w-84f806c7 #1: WebJudge: failure. The agent did navigate to the shelter‐search page, set the location to 10012, and used scripts to change the distance to “Nationwide” and check the “Birds” box. However, there is no
- **stagehand** · om2w-9829f308 #1: WebJudge: failure. The agent navigated to the ESPN NBA scoreboard, selected the first game link (Hawks vs. Spurs) without explicitly filtering for “most recent” (no date or sort filter was applied). I
- **stagehand** · om2w-987bad7c #1: WebJudge: failure. The agent correctly applied the used/2011 BMW 135 filter and set the max price to $30,000, and it navigated to multiple vehicle detail pages, even capturing dealer names and phone n
- **stagehand** · om2w-9d09bc94 #1: WebJudge: failure. The agent correctly changed the location filter to Boston and selected “NHL” via the search suggestions, landing on the NHL category page with “Teams near Boston.” However, it never
- **stagehand** · om2w-a5c87cc1 #1: WebJudge: failure. The agent successfully navigated to the AccuWeather air quality page for Cork and expanded the “Current Pollutants” section, but never extracted or displayed the SO₂ concentration f
- **stagehand** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to the TSLA historical data page covering March 17, 2023, but never extracted or reported the closing stock price for that date. No filter or data retr
- **stagehand** · om2w-a96fca87 #1: WebJudge: failure. The agent successfully navigated to the Business plan and attempted to fill the user, storage, and transfer fields via scripting. However, none of the provided snapshots or console 
- **stagehand** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly navigated to IGN, applied score=10 and category=Board filters, and found “Undaunted: Stalingrad Board Game Review” with a 10 score. However, it never toggled or 
- **stagehand** · om2w-ade4c09a #1: WebJudge: failure. The agent navigated correctly to the FlightAware AeroAPI page and extracted links related to pricing/tiers but never clicked through or retrieved the actual plan details (names, fea
- **stagehand** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **stagehand** · om2w-b99c0296 #1: WebJudge: failure. The agent correctly navigated to the Berkeley Class Schedule, applied all required filters (term=Fall 2023, course_level=grad, subject=COMPSCI, meets_days for Tuesday and TuTh, star
- **stagehand** · om2w-ba2a469a #1: WebJudge: failure. The agent never actually applied the “Level = Beginner” or a Python skills filter through the site’s filter controls—instead it relied on keyword queries. It also never selected or 
- **stagehand** · om2w-c1d6ea6f #1: WebJudge: failure. The agent successfully navigated to Google Shopping, set the “On sale” and “Black” finish filters, entered the $25–$60 price range, and triggered the filter. The displayed results a
- **stagehand** · om2w-c3a33396 #1: timeout after 10 min
- **stagehand** · om2w-d1970c16 #1: timeout after 10 min
- **stagehand** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly located the SAM2 repo and filtered commits by author=NielsRogge, but only viewed the most recent entries and a single commit (b72a8a9). It did not navigate to th
- **stagehand** · om2w-e9f4dfc6 #1: WebJudge: failure. The agent correctly set “Pediatrics” and the location at zip 90028 (steps 1–2) and applied the “4 Stars & Up” rating filter (step 4). However, it never applied an “Internal Medicine
- **stagehand** · om2w-f389398d #1: WebJudge: failure. The agent correctly navigated to the Climate news section on The Weather Network (topic “climate,” content type “news”) but never applied or confirmed a “sort by latest” filter/sort
- **wdio-mcp** · om2w-07ec4a12 #1: timeout after 10 min
- **wdio-mcp** · om2w-180ed2ec #1: WebJudge: failure. The agent navigated to the UM-Dearborn site, clicked the “Giving” link and “Give Now” button, and even expanded the “Make a Straightforward Gift” panel. However, it never surfaced o
- **wdio-mcp** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to the ExploreCourses site and applied filters for Winter 2022–2023, graduate level, Monday (“day-2”), and afternoon (“time-3”), then viewed the schedu
- **wdio-mcp** · om2w-43a1ca25 #1: WebJudge: failure. The agent correctly searched for neurosurgeons in New York and applied the “Mañana” (tomorrow) availability filter, but at no point did it surface a doctor who both clearly showed a
- **wdio-mcp** · om2w-461ab9b0 #1: WebJudge: failure. The agent did navigate to the NYSE Rule 605 Market Center Files page, scroll to the list of monthly links, and ran scripts to identify and test “July 2024” links (including verifyin
- **wdio-mcp** · om2w-47bfe8a7 #1: WebJudge: failure. The agent correctly filtered to Xiaomi and sorted by popularity, and did produce a comparison chart between two models (Redmi K90 Max vs Redmi K60). However, those two are not the f
- **wdio-mcp** · om2w-47e314cc #1: timeout after 10 min
- **wdio-mcp** · om2w-4c186c6e #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-547f5729 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly applied the filters for owner financing, homesite land, Luna County, New Mexico, and listings from the past 30 days, but never used a sort-by-cheapest-per-acre f
- **wdio-mcp** · om2w-5d542a7e #1: WebJudge: failure. The agent navigated to the CVPR 2022 page and correctly used a filter via the OpenAlex API to sort works by citation count. However, there is no final selection or display of the to
- **wdio-mcp** · om2w-5dec0e66 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-63d6866f #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-64b76158 #1: WebJudge: failure. The agent navigated through various Healthline pages and extracted text snippets, but never produced a side-by-side comparison of two distinct pescatarian diets or summarized their 
- **wdio-mcp** · om2w-6b2cfae0 #1: timeout after 10 min
- **wdio-mcp** · om2w-824eb7bb #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-82eb3bfe #1: WebJudge: failure. The agent did locate the XRP asset and interact with the timeframe control, even executing clicks on the “1 year” option. However, there is no conclusive screenshot showing the char
- **wdio-mcp** · om2w-8689af4d #1: WebJudge: failure. Although the agent sorted by lowest price and ultimately added a certified refurbished 11-inch iPad Air (M3) Wi-Fi 256 GB in Blue to the bag at $669, it never applied the required f
- **wdio-mcp** · om2w-95cad96f #1: WebJudge: failure. The agent never explicitly selected or applied the “SORT: MOST POPULAR” filter via the UI (it only scraped the DOM and assumed the sort was in place), never closed the blocking pop-
- **wdio-mcp** · om2w-9829f308 #1: timeout after 10 min
- **wdio-mcp** · om2w-987bad7c #1: timeout after 10 min
- **wdio-mcp** · om2w-9ed38272 #1: WebJudge: failure. The agent correctly set all the input parameters (age 30–65, $30 000 starting balance, 3% return, 13% current tax, 24% retirement tax) in the combined IRA calculator, but never pres
- **wdio-mcp** · om2w-9f1cba61 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-a172a5d9 #1: timeout after 10 min
- **wdio-mcp** · om2w-a96fca87 #1: WebJudge: failure. No actions were taken to navigate to the pricing page or select the Business plan. The agent did not view or display any details for 100 users, 1 PB storage, or 50 TB transfer.
- **wdio-mcp** · om2w-ade4c09a #1: WebJudge: failure. The agent successfully navigated to the AeroAPI pricing page and executed scripts to extract headings, section text, and tables, but it did not present or summarize the actual plan 
- **wdio-mcp** · om2w-b64f938a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-ba2a469a #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-c1d6ea6f #1: WebJudge: failure. The agent correctly applied the “On sale,” “Black,” and $25–$60 price‐range filters and scrolled through the results. However, it never presented a consolidated list of the qualifyi
- **wdio-mcp** · om2w-c3a33396 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-c94551d2 #1: timeout after 10 min
- **wdio-mcp** · om2w-d1970c16 #1: Error: Claude Code returned an error result: Reached maximum number of turns (80)
- **wdio-mcp** · om2w-d71be72a #1: WebJudge: failure. The agent navigated to Apple’s official site and reached the MacBook Air Tech Specs page, satisfying source requirement. However, none of the provided snapshots or the script output
- **wdio-mcp** · om2w-d9d8b7d8 #1: WebJudge: failure. The agent correctly identified the facebookresearch/sam2 repo and applied the author filter for “NielsRogge,” showing commits by that author. However, it never sorted or scrolled to
- **wdio-mcp** · om2w-dcd26e66 #1: WebJudge: failure. The agent navigated to and progressed through multiple quiz questions—addressing support system, joy activities, exercise habits, eating out, and portion control/cravings—but never 
- **wdio-mcp** · om2w-e9f4dfc6 #1: timeout after 10 min
- **wdio-mcp** · om2w-f05e87c5 #1: WebJudge: failure. The agent did correctly apply the Winter 2022, Summer 2022, Winter 2023, and Summer 2023 batch filters and used the “Is Hiring” checkbox, but it never properly combined those with a
- **wdio-mcp** · om2w-f2be37a9 #1: WebJudge: failure. The agent did apply the correct filter parameters—event_type=OBED, event_states=NY, and set the month to Nov 2026 (i.e. “next month” relative to Oct 2026). However, it never clicked
- **wdio-mcp** · om2w-f389398d #1: WebJudge: failure. The agent navigated to the climate news section (key point 1) but never explicitly applied or confirmed a “Sort by latest” filter. There is no evidence of selecting a “latest” sort 
- **wdio-mcp** · om2w-fa9adb81 #1: WebJudge: failure. The agent correctly navigated to the Top 50 Rock chart, clicked the #1 track, viewed its “Reposted by” list, and then clicked through to a user’s homepage and opened their Reposts t
- **wdio-session** · om2w-070c907d #1: timeout after 10 min
- **wdio-session** · om2w-0a0fa834 #1: WebJudge: failure. The agent never correctly applied the duration filter to include only sailings of at least 8 days (it selected “6 – 9 Days,” which admits 6- and 7-day cruises, then “10+ Days,” so t
- **wdio-session** · om2w-180ed2ec #1: timeout after 10 min
- **wdio-session** · om2w-1c3b747a #1: WebJudge: failure. The agent did not properly filter the competitions list by “Active” and sort by highest prize on the Competitions page, nor did it show that the selected competition indeed offers t
- **wdio-session** · om2w-27fa3ac2 #1: WebJudge: failure. The agent correctly navigated to the Winter 2022-2023 schedule view for CHEM courses and scraped meeting info, but it never applied a graduate-level filter via the site’s filter UI 
- **wdio-session** · om2w-43a1ca25 #1: timeout after 10 min
- **wdio-session** · om2w-461ab9b0 #1: timeout after 10 min
- **wdio-session** · om2w-47bfe8a7 #1: timeout after 10 min
- **wdio-session** · om2w-47e314cc #1: timeout after 10 min
- **wdio-session** · om2w-4c186c6e #1: timeout after 10 min
- **wdio-session** · om2w-547f5729 #1: WebJudge: failure. The agent did navigate to the condos page with 3 bedrooms, 2 bathrooms, and under $2,500 in NYC via the URL. However, it did not set the minimum price of $1,500 (only “under $2,500”
- **wdio-session** · om2w-59b7b990 #1: WebJudge: failure. The agent correctly navigated to Luna County, New Mexico and applied the “Homesites,” “Past 30 days,” and “Owner-financing” filters (URL confirms `/homesites/listed-30-days/owner-fi
- **wdio-session** · om2w-5dec0e66 #1: timeout after 10 min
- **wdio-session** · om2w-63d6866f #1: timeout after 10 min
- **wdio-session** · om2w-64b76158 #1: timeout after 10 min
- **wdio-session** · om2w-65c4030f #1: WebJudge: failure. The agent successfully set the specialty to “Cardiology” and location to “Jacksonville, FL,” navigated the results, and identified a female MD cardiologist (Amy W. Pollak, M.D.) in 
- **wdio-session** · om2w-6b2cfae0 #1: WebJudge: failure. The agent successfully navigated to Devin Booker’s playoff per‐game stats on both NBA.com and Basketball-Reference, displayed the full table listing each postseason PPG (2020-21: 27
- **wdio-session** · om2w-6ca20f1d #1: WebJudge: failure. The agent correctly located and navigated to the GOV.UK “Child Benefit” page and clicked into the “How it works,” “Who can get Child Benefit,” and “Make a claim” sections, but the s
- **wdio-session** · om2w-6ebde509 #1: timeout after 10 min
- **wdio-session** · om2w-824eb7bb #1: timeout after 10 min
- **wdio-session** · om2w-95cad96f #1: timeout after 10 min
- **wdio-session** · om2w-9829f308 #1: timeout after 10 min
- **wdio-session** · om2w-987bad7c #1: timeout after 10 min
- **wdio-session** · om2w-a6f0434c #1: WebJudge: failure. The agent correctly navigated to Yahoo Finance, selected TSLA, opened the Historical Data tab, and set the date range to include March 17, 2023. It located the “Mar 17, 2023” row an
- **wdio-session** · om2w-a96fca87 #1: WebJudge: failure. The agent did navigate to the Business pricing page and set the number of users to 100 and the storage quota to 1 PB (1 000 TB), fulfilling key points (1)–(3). While the transfer‐qu
- **wdio-session** · om2w-aa4b5cb7 #1: WebJudge: failure. The agent correctly navigated to IGN, applied the board game category filter and the score=10 filter, and found a board game review with a 10 rating. However, the Editor’s Choice to
- **wdio-session** · om2w-ade4c09a #1: WebJudge: failure. The agent did navigate to the AeroAPI pricing page on FlightAware and identified the three tiers (Personal, Standard, Premium), but it never retrieved or displayed any quantitative 
- **wdio-session** · om2w-b64f938a #1: WebJudge: failure. The agent never applied any price filter or confirmed a $5–$10 range, nor were any product cards loaded and selected. All evidence shows the session was blocked by a captcha and no 
- **wdio-session** · om2w-ba01ea55 #1: WebJudge: failure. The agent did set the location to Manhattan and guest count to 4, and it applied the “Sort by rating” filter. It then identified transit routes and correctly picked the fastest (39 
- **wdio-session** · om2w-c3a33396 #1: timeout after 10 min
- **wdio-session** · om2w-c94551d2 #1: WebJudge: failure. The agent correctly navigated to the cats-for-adoption page, set the distance filter to 25 miles, and checked both Young and Adult age filters. However, at no point did the agent ac
- **wdio-session** · om2w-d1970c16 #1: timeout after 10 min
- **wdio-session** · om2w-d71be72a #1: WebJudge: failure. The agent successfully navigated to Apple’s site, clicked “MacBook Air,” opened the “Tech Specs” section, and selected the 15-inch model (the latest MacBook Air). However, at no poi
- **wdio-session** · om2w-e9f4dfc6 #1: timeout after 10 min
- **wdio-session** · om2w-f00e7acc #1: WebJudge: failure. The agent successfully navigated to AccuWeather’s Boston page and clicked the “Hourly” tab, confirming they reached the correct hourly forecast page. However, the snapshots only sho
- **wdio-session** · om2w-f389398d #1: timeout after 10 min
- **wdio-session** · om2w-fa9adb81 #1: WebJudge: failure. The agent successfully navigated to a user homepage (“beevader”) who reposted the #1 track (Quadeca – finebyme) from the Top 50 Rock chart, satisfying points 1, 2, and 4. However, t

## Environment

| Job | OS | CPU | Node.js | Chrome |
|---|---|---|---|---|
| `shard 01` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 02` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 03` | Linux 6.17.0-1022-azure (x64) | 4× Intel(R) Xeon(R) 6973P-C | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 04` | Linux 6.17.0-1022-azure (x64) | 4× INTEL(R) XEON(R) PLATINUM 8573C | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 05` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 06` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 07` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 08` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 9V74 80-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |
| `shard 10` | Linux 6.17.0-1022-azure (x64) | 4× AMD EPYC 7763 64-Core Processor | v24.21.0 | Google Chrome 154.0.8037.97 |

The tasks were split into 9 shards, one job and runner each. Every setup ran every task of a shard in that shard's job, interleaved in one shuffled order, so the setups on one task shared an IP address and a time window.
