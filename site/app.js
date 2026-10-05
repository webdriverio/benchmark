/**
 * Renders data.json (built by src/site.ts from results/). No framework,
 * no build step. Every view shows the groups of one suite and one model:
 *
 *   leaderboard   the newest version of each tool, sortable
 *   cost vs.      success against cost, tokens or time, with intervals
 *   per task      success by difficulty and a task × tool matrix
 *   versions      every version of every tool, expandable
 *   run log       every workflow run with the versions it tested
 */
const $ = (sel) => document.querySelector(sel)
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c]))

const fmt = {
    tokens: (n) => n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(Math.round(n)),
    cost: (n) => n < 0.1 ? `$${n.toFixed(3)}` : `$${n.toFixed(2)}`,
    seconds: (n) => `${n.toFixed(0)} s`,
    int: (n) => String(Math.round(n * 10) / 10),
    pct: (x) => `${Math.round(x * 100)}%`,
    date: (iso) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/** one color per tool, the same in every view */
const COLORS = {
    'wdio-session': '#ea5906',
    'wdio-mcp': '#f59e0b',
    'playwright-mcp': '#2563eb',
    'playwright-mcp-tuned': '#60a5fa',
    'playwright-cli': '#7c3aed',
    stagehand: '#10b981',
    'agent-browser': '#db2777'
}
const FALLBACK_COLORS = ['#0891b2', '#65a30d', '#9333ea', '#e11d48', '#ca8a04']
const colorOf = (id) => COLORS[id] ?? FALLBACK_COLORS[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % FALLBACK_COLORS.length]

const METRICS = {
    cost: { label: 'Cost / task', axis: 'Median cost per task (USD)', format: fmt.cost },
    tokens: { label: 'Tokens / task', axis: 'Median tokens per task', format: fmt.tokens },
    seconds: { label: 'Time / task', axis: 'Median time per task', format: fmt.seconds }
}
const GROUP_ORDER = ['easy', 'medium', 'hard', 'public', 'local', 'live']

/** semver-ish compare, prereleases sort below their release */
function compareVersions (a, b) {
    const parse = (v) => {
        const [core, pre = ''] = String(v).split('-')
        return { nums: core.split('.').map((n) => Number.parseInt(n, 10) || 0), pre }
    }
    const x = parse(a)
    const y = parse(b)
    for (let i = 0; i < 3; i++) {
        if ((x.nums[i] ?? 0) !== (y.nums[i] ?? 0)) {
            return (x.nums[i] ?? 0) - (y.nums[i] ?? 0)
        }
    }
    if (x.pre === y.pre) {
        return 0
    }
    if (!x.pre) {
        return 1
    }
    if (!y.pre) {
        return -1
    }
    const xp = x.pre.split('.')
    const yp = y.pre.split('.')
    for (let i = 0; i < Math.max(xp.length, yp.length); i++) {
        if (xp[i] === undefined) return -1
        if (yp[i] === undefined) return 1
        const xn = Number(xp[i])
        const yn = Number(yp[i])
        if (!Number.isNaN(xn) && !Number.isNaN(yn) && xn !== yn) return xn - yn
        if (xp[i] !== yp[i]) return xp[i] < yp[i] ? -1 : 1
    }
    return 0
}

const data = await (await fetch('data.json', { cache: 'no-store' })).json()

/**
 * Two setups can share a label (Playwright MCP with and without flags); the
 * one whose id extends the other's gets the difference in parentheses.
 */
const labels = Object.fromEntries(data.setups.map((s) => {
    const base = data.setups.find((o) => o !== s && o.label === s.label && s.id.startsWith(`${o.id}-`))
    return [s.id, base ? `${s.label} (${s.id.slice(base.id.length + 1)})` : s.label]
}))
const labelOf = (id) => labels[id] ?? id
const setupOf = (id) => data.setups.find((s) => s.id === id)
const modelLabel = (id) => data.models?.find((m) => m.id === id)?.label ?? id
const suiteLabel = (id) => data.suites.find((s) => s.id === id)?.label ?? id
const swatch = (id) => `<i class="swatch" style="background:${colorOf(id)}" aria-hidden="true"></i>`

const state = { suite: '', model: '', axis: 'cost', sort: { key: 'rank', dir: 1 } }

/** a version that ran every task of its suite, not a pilot on a few of them */
const isComplete = (g) => Object.keys(g.perTask).length >= (data.tasks[g.suite] ?? []).length

/** the newest fully tested version of each tool (or its newest, if none is), ranked by success, then cost */
function latestGroups () {
    const groups = data.groups.filter((g) => g.suite === state.suite && g.model === state.model)
    return data.setups
        .map((s) => {
            const versions = groups.filter((g) => g.setup === s.id).sort((a, b) => compareVersions(b.version, a.version))
            return versions.find(isComplete) ?? versions[0]
        })
        .filter(Boolean)
        .sort((a, b) => b.successRate - a.successRate || a.cost - b.cost)
        .map((g, i) => ({ ...g, rank: i + 1 }))
}

/* ---------- tooltip ---------- */

const tooltip = $('#tooltip')
function showTip (el, x, y) {
    tooltip.innerHTML = el.getAttribute('data-tip')
    tooltip.hidden = false
    const { width, height } = tooltip.getBoundingClientRect()
    tooltip.style.left = `${Math.min(window.innerWidth - width - 8, x + 14)}px`
    tooltip.style.top = `${y + height + 20 > window.innerHeight ? y - height - 12 : y + 16}px`
}
// pointerdown too, so a tap on a phone shows the tooltip
for (const type of ['pointermove', 'pointerdown']) {
    document.addEventListener(type, (e) => {
        const el = e.target.closest?.('[data-tip]')
        if (el) {
            showTip(el, e.clientX, e.clientY)
        } else {
            tooltip.hidden = true
        }
    })
}
document.addEventListener('focusin', (e) => {
    const el = e.target.closest?.('[data-tip]')
    if (el) {
        const r = el.getBoundingClientRect()
        showTip(el, r.left, r.bottom)
    }
})
document.addEventListener('focusout', () => { tooltip.hidden = true })

/** tooltip markup, already escaped, for a data-tip attribute */
const tip = (title, lines) => esc(`<b>${esc(title)}</b>${lines.map((l) => `<br>${esc(l)}`).join('')}`)
const ciText = (s) => `${fmt.pct(s.successCi[0])}–${fmt.pct(s.successCi[1])}`

/* ---------- hero ---------- */

function renderStats () {
    const suite = data.suites.find((s) => s.id === 'online-mind2web') ? 'online-mind2web' : state.suite
    const tested = new Set(data.groups.map((g) => g.setup))
    const runs = data.groups.reduce((sum, g) => sum + g.runs, 0)
    const items = [
        ['Tools', tested.size],
        ['Live-web tasks', (data.tasks[suite] ?? []).length],
        ['Models', new Set(data.runs.map((r) => r.model)).size],
        ['Agent runs', runs.toLocaleString('en-US')]
    ]
    $('#stats').innerHTML = items.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')
}

/* ---------- controls ---------- */

/** a radio group of buttons; arrow keys move the selection like native radios */
function segmented (el, options, value, onChange) {
    el.innerHTML = options.map((o) => `<button type="button" role="radio" data-value="${esc(o.id)}" aria-checked="${o.id === value}" tabindex="${o.id === value ? 0 : -1}">${esc(o.label)}</button>`).join('')
    el.onclick = (e) => {
        const btn = e.target.closest('button')
        if (btn) {
            onChange(btn.dataset.value)
        }
    }
    el.onkeydown = (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
        if (!step) {
            return
        }
        e.preventDefault()
        const i = options.findIndex((o) => o.id === value)
        const next = options[(i + step + options.length) % options.length]
        onChange(next.id)
        el.querySelector(`[data-value="${CSS.escape(next.id)}"]`)?.focus()
    }
}

function suitesWithRuns () {
    const ids = [...new Set(data.runs.map((r) => r.suite))]
    // the independent task set first
    return ids.sort((a, b) => (b === 'online-mind2web') - (a === 'online-mind2web')).map((id) => ({ id, label: suiteLabel(id) }))
}

function modelsFor (suite) {
    return [...new Set(data.runs.filter((r) => r.suite === suite).map((r) => r.model))].map((id) => ({ id, label: modelLabel(id) }))
}

function renderControls () {
    // a choice of one is no choice
    $('#suite-group').hidden = suitesWithRuns().length < 2
    segmented($('#suite'), suitesWithRuns(), state.suite, (v) => {
        state.suite = v
        const models = modelsFor(v)
        if (!models.some((m) => m.id === state.model)) {
            state.model = models[0]?.id
        }
        update()
    })
    segmented($('#model'), modelsFor(state.suite), state.model, (v) => {
        state.model = v
        update()
    })
    segmented($('#axis'), Object.entries(METRICS).map(([id, m]) => ({ id, label: m.label.replace(' / task', '') })), state.axis, (v) => {
        state.axis = v
        update()
    })
}

/* ---------- leaderboard ---------- */

const COLUMNS = [
    { key: 'rank', label: '#', cls: 'rank', dir: 1 },
    { key: 'tool', label: 'Tool', dir: 1 },
    { key: 'successRate', label: 'Success', dir: -1 },
    { key: 'cost', label: 'Cost / task', dir: 1 },
    { key: 'tokens', label: 'Tokens / task', cls: 'opt', dir: 1 },
    { key: 'seconds', label: 'Time / task', cls: 'opt', dir: 1 },
    { key: 'toolCalls', label: 'Tool calls', cls: 'num opt', dir: 1 }
]

function successCell (g, leader) {
    const pos = (x) => `${(x * 100).toFixed(1)}%`
    const [lo, hi] = g.successCi
    const [blo, bhi] = leader.successCi
    return `<div class="success" data-tip="${tip(labelOf(g.setup), [`${g.passed} of ${g.runs} runs passed`, `95% confidence interval ${ciText(g)}`])}">
        <span class="pct">${fmt.pct(g.successRate)}<span class="of">${g.passed}/${g.runs}</span></span>
        <div class="track" aria-hidden="true">
            <div class="rail"></div>
            <div class="band" style="left:${pos(blo)};width:${pos(bhi - blo)}"></div>
            <div class="fill" style="width:${pos(g.successRate)};background:${colorOf(g.setup)}"></div>
            <div class="ci" style="left:${pos(lo)};width:${pos(hi - lo)}"></div>
        </div>
    </div>`
}

function metricCell (value, all, format) {
    const max = Math.max(...all)
    const min = Math.min(...all)
    const best = value === min && all.length > 1
    return `<div class="metric"><div class="mbar${best ? ' best' : ''}" style="width:${max ? Math.max(4, (value / max) * 100) : 0}%"></div><span class="${best ? 'best' : ''}">${format(value)}</span></div>`
}

function renderLeaderboard (rows) {
    const leader = rows[0]
    const { key, dir } = state.sort
    const sorted = [...rows].sort((a, b) => {
        const va = key === 'tool' ? labelOf(a.setup) : a[key]
        const vb = key === 'tool' ? labelOf(b.setup) : b[key]
        return (va < vb ? -1 : va > vb ? 1 : 0) * dir || a.rank - b.rank
    })
    const col = (k) => rows.map((g) => g[k])
    const head = COLUMNS.map((c) => {
        const sort = c.key === key ? (dir === 1 ? 'ascending' : 'descending') : 'none'
        return `<th scope="col" class="${c.cls ?? ''}" aria-sort="${sort}"><button class="sort" data-key="${c.key}">${esc(c.label)}</button></th>`
    }).join('')
    $('#latest').setAttribute('aria-label', `Leaderboard for ${suiteLabel(state.suite)} with ${modelLabel(state.model)}`)
    $('#latest').innerHTML = `
        <thead><tr>${head}</tr></thead>
        <tbody>${sorted.map((g) => {
            const setup = setupOf(g.setup)
            return `<tr>
                <td class="rank${g.rank === 1 ? ' first' : ''}">${g.rank}</td>
                <td><div class="tool">${swatch(g.setup)}<span class="name"><strong>${esc(labelOf(g.setup))}</strong><span class="pkg mono"><a href="${esc(setup?.link)}">${esc(g.pkg)}</a>@${esc(g.version)}</span></span></div></td>
                <td>${successCell(g, leader)}</td>
                <td>${metricCell(g.cost, col('cost'), fmt.cost)}</td>
                <td class="opt">${metricCell(g.tokens, col('tokens'), fmt.tokens)}</td>
                <td class="opt">${metricCell(g.seconds, col('seconds'), fmt.seconds)}</td>
                <td class="num opt">${fmt.int(g.toolCalls)}</td>
            </tr>`
        }).join('')}</tbody>`
    $('#latest thead').onclick = (e) => {
        const btn = e.target.closest('button.sort')
        if (!btn) {
            return
        }
        const column = COLUMNS.find((c) => c.key === btn.dataset.key)
        state.sort = state.sort.key === column.key ? { key: column.key, dir: -state.sort.dir } : { key: column.key, dir: column.dir }
        renderLeaderboard(rows)
        $(`#latest button.sort[data-key="${column.key}"]`)?.focus()
    }
}

/* ---------- scatter ---------- */

/** round step for about `count` ticks */
function niceStep (span, count) {
    const raw = span / count
    const mag = 10 ** Math.floor(Math.log10(raw))
    const norm = raw / mag
    return (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag
}

function renderScatter (rows) {
    const metric = METRICS[state.axis]
    // drawn at the container's own width, so text keeps its size on a phone
    const W = Math.max(320, Math.min(1100, $('#scatter').clientWidth || 960))
    const H = W < 600 ? 380 : 460
    const m = { l: 52, r: W < 600 ? 12 : 28, t: 24, b: 56 }
    const iw = W - m.l - m.r
    const ih = H - m.t - m.b

    // a fitted range: the tools sit close together, and an axis from zero would squeeze them into a corner
    const xs = rows.map((g) => g[state.axis])
    const lo = Math.min(...xs)
    const hi = Math.max(...xs)
    const pad = (hi - lo || hi || 1) * 0.12
    const xStep = niceStep(hi - lo + 2 * pad, W < 600 ? 3 : 6)
    const xMin = Math.max(0, Math.floor((lo - pad) / xStep) * xStep)
    const xMax = Math.ceil((hi + pad) / xStep) * xStep
    const yLo = Math.max(0, Math.floor(Math.min(...rows.map((g) => g.successCi[0])) * 10) / 10)
    const yHi = Math.min(1, Math.ceil(Math.max(...rows.map((g) => g.successCi[1])) * 10) / 10)
    const yMin = yHi - yLo < 0.2 ? Math.max(0, yHi - 0.2) : yLo
    const x = (v) => m.l + ((v - xMin) / (xMax - xMin)) * iw
    const y = (v) => m.t + (1 - (v - yMin) / (yHi - yMin)) * ih

    const xTicks = []
    for (let v = xMin; v <= xMax + 1e-9; v += xStep) xTicks.push(v)
    const yTicks = []
    for (let v = Math.ceil(yMin * 10) / 10; v <= yHi + 1e-9; v += 0.1) yTicks.push(Math.round(v * 10) / 10)

    // the tools no other tool beats on both axes
    const frontier = [...rows].sort((a, b) => a[state.axis] - b[state.axis] || b.successRate - a.successRate)
        .reduce((acc, g) => (!acc.length || g.successRate > acc[acc.length - 1].successRate ? [...acc, g] : acc), [])

    // labels: try right, left, above, below, and take the first spot that overlaps nothing
    const placed = []
    const boxes = rows.map((g) => ({ x: x(g[state.axis]) - 8, y: y(g.successRate) - 8, w: 16, h: 16 }))
    const hits = (b) => [...placed, ...boxes].some((o) => b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y)
    // on a phone the names don't fit next to the points; the legend below names them instead
    const narrow = W < 600
    const labelsSvg = narrow ? '' : rows.map((g) => {
        const text = labelOf(g.setup)
        const w = text.length * 7.2
        const px = x(g[state.axis])
        const py = y(g.successRate)
        const spots = [
            { x: px + 12, y: py - 8, anchor: 'start', tx: px + 12, ty: py + 4 },
            { x: px - 12 - w, y: py - 8, anchor: 'end', tx: px - 12, ty: py + 4 },
            { x: px - w / 2, y: py - 30, anchor: 'middle', tx: px, ty: py - 18 },
            { x: px - w / 2, y: py + 12, anchor: 'middle', tx: px, ty: py + 26 },
            { x: px + 12, y: py + 6, anchor: 'start', tx: px + 12, ty: py + 18 },
            { x: px + 12, y: py - 22, anchor: 'start', tx: px + 12, ty: py - 10 }
        ].filter((s) => s.x >= m.l && s.x + w <= W)
        const spot = spots.find((s) => !hits({ x: s.x, y: s.y, w, h: 16 })) ?? spots[0]
        placed.push({ x: spot.x, y: spot.y, w, h: 16 })
        return `<text class="label" x="${spot.tx}" y="${spot.ty}" text-anchor="${spot.anchor}">${esc(text)}</text>`
    }).join('')

    const points = rows.map((g) => {
        const px = x(g[state.axis])
        const color = colorOf(g.setup)
        const t = tip(`${labelOf(g.setup)} ${g.version}`, [
            `Success ${fmt.pct(g.successRate)} (${g.passed}/${g.runs}), 95% CI ${ciText(g)}`,
            `Cost ${fmt.cost(g.cost)} · ${fmt.tokens(g.tokens)} tokens · ${fmt.seconds(g.seconds)}`
        ])
        return `<g class="pt" data-tip="${t}" tabindex="0" role="img" aria-label="${esc(`${labelOf(g.setup)}: ${fmt.pct(g.successRate)} success, ${metric.format(g[state.axis])}`)}">
            <line class="whisker" x1="${px}" x2="${px}" y1="${y(g.successCi[0])}" y2="${y(g.successCi[1])}" stroke="${color}"/>
            <line class="whisker" x1="${px - 5}" x2="${px + 5}" y1="${y(g.successCi[0])}" y2="${y(g.successCi[0])}" stroke="${color}"/>
            <line class="whisker" x1="${px - 5}" x2="${px + 5}" y1="${y(g.successCi[1])}" y2="${y(g.successCi[1])}" stroke="${color}"/>
            <circle class="point" cx="${px}" cy="${y(g.successRate)}" r="7.5" fill="${color}"/>
        </g>`
    }).join('')

    $('#scatter').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="group" aria-label="Success rate against ${esc(metric.axis.toLowerCase())} for each tool">
        <g class="grid">
            ${yTicks.map((v) => `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}"/>`).join('')}
            ${xTicks.map((v) => `<line x1="${x(v)}" x2="${x(v)}" y1="${m.t}" y2="${H - m.b}" opacity=".5"/>`).join('')}
        </g>
        <g class="axis">
            ${yTicks.map((v) => `<text x="${m.l - 10}" y="${y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`).join('')}
            ${xTicks.map((v) => `<text x="${x(v)}" y="${H - m.b + 20}" text-anchor="middle">${esc(metric.format(v))}</text>`).join('')}
        </g>
        <text class="axis-title" x="${m.l + iw / 2}" y="${H - 10}" text-anchor="middle">${esc(metric.axis)} →</text>
        <text class="axis-title" transform="translate(16 ${m.t + ih / 2}) rotate(-90)" text-anchor="middle">Success rate →</text>
        ${frontier.length > 1 ? `<polyline class="frontier" points="${frontier.map((g) => `${x(g[state.axis])},${y(g.successRate)}`).join(' ')}"/>` : ''}
        ${points}
        ${labelsSvg}
        ${frontier.length > 1 && !narrow ? `<text class="hint" x="${W - m.r}" y="${m.t + 4}" text-anchor="end">- - - best trade-off so far</text>` : ''}
    </svg>
    ${narrow ? `<ul class="chart-legend">${rows.map((g) => `<li>${swatch(g.setup)}${esc(labelOf(g.setup))}</li>`).join('')}</ul>` : ''}`
}

/* ---------- per task ---------- */

const groupOf = (t) => t.level ?? t.kind

function renderPerTask (rows) {
    const tasks = (data.tasks[state.suite] ?? []).filter((t) => rows.some((g) => g.perTask[t.id]))
    const levels = [...new Set(tasks.map(groupOf))].sort((a, b) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b))
    const live = tasks.some((t) => t.kind === 'live')
    $('#tasks-note').textContent = live
        ? 'Success by the difficulty the dataset assigns, then every task. Online-Mind2Web task texts are gated by their authors, so tasks are listed by id. Hover or tap a cell for details.'
        : 'Success by kind of task, then every task. Hover or tap a cell for details.'

    const rate = (g, ids) => {
        const s = ids.map((id) => g.perTask[id]).filter(Boolean)
        const runs = s.reduce((a, x) => a + x.runs, 0)
        const passed = s.reduce((a, x) => a + x.passed, 0)
        return { runs, passed, rate: runs ? passed / runs : 0 }
    }
    const idsOf = (level) => tasks.filter((t) => groupOf(t) === level).map((t) => t.id)
    $('#by-level').innerHTML = `<table class="data levels">
        <thead><tr><th scope="col">Tool</th>${levels.map((l) => `<th scope="col"><span class="lvl">${esc(l)}</span> <span class="muted">${idsOf(l).length}</span></th>`).join('')}<th scope="col">All</th></tr></thead>
        <tbody>${rows.map((g) => {
            const cells = levels.map((l) => {
                const r = rate(g, idsOf(l))
                const best = Math.max(...rows.map((o) => rate(o, idsOf(l)).rate))
                return `<td data-tip="${tip(labelOf(g.setup), [`${l}: ${r.passed} of ${r.runs} runs passed`])}"><span class="rate"${r.rate === best ? ' style="color:var(--good)"' : ''}>${fmt.pct(r.rate)}</span></td>`
            }).join('')
            return `<tr><td><div class="tool">${swatch(g.setup)}<strong>${esc(labelOf(g.setup))}</strong></div></td>${cells}<td><span class="rate">${fmt.pct(g.successRate)}</span></td></tr>`
        }).join('')}</tbody>
    </table>`

    const solved = (t) => rows.filter((g) => g.perTask[t.id]?.passed > 0).length
    const body = levels.map((level) => {
        const list = tasks.filter((t) => groupOf(t) === level).sort((a, b) => solved(b) - solved(a) || a.id.localeCompare(b.id))
        return `<tr class="level-row"><th colspan="${rows.length + 2}" scope="rowgroup">${esc(level)} · ${list.length} tasks</th></tr>${list.map((t) => `<tr>
            <th scope="row" class="task mono">${esc(t.id)}</th>
            ${rows.map((g) => {
                const s = g.perTask[t.id]
                if (!s) {
                    return `<td class="c"><i class="cell none" data-tip="${tip(labelOf(g.setup), [t.id, 'not run'])}"></i></td>`
                }
                const cls = s.passed === s.runs ? 'pass' : s.passed === 0 ? 'fail' : 'part'
                const verdict = s.runs === 1 ? (s.passed ? 'passed' : 'failed') : `${s.passed} of ${s.runs} runs passed`
                return `<td class="c"><i class="cell ${cls}" tabindex="0" aria-label="${esc(`${labelOf(g.setup)}, ${t.id}: ${verdict}`)}" data-tip="${tip(labelOf(g.setup), [t.id, verdict, `${fmt.tokens(s.tokens)} tokens · ${fmt.cost(s.cost)} · ${fmt.seconds(s.seconds)}`])}"></i></td>`
            }).join('')}
            <td class="solved">${solved(t)}/${rows.length}</td>
        </tr>`).join('')}`
    }).join('')
    $('#heatmap').innerHTML = `<table class="heat">
        <thead><tr><th class="task" scope="col">Task</th>${rows.map((g) => `<th class="col" scope="col"><span>${esc(labelOf(g.setup))}</span>${swatch(g.setup)}</th>`).join('')}<th class="solved" scope="col" style="text-align:right;padding-right:16px">Solved by</th></tr></thead>
        <tbody>${body}</tbody>
    </table>`
}

/* ---------- versions ---------- */

function runLinks (ids) {
    return `<ul class="run-links">${ids.map((id) => {
        const run = data.runs.find((r) => r.id === id)
        if (!run) {
            return ''
        }
        const workflow = run.workflowRun ? ` · <a href="${esc(run.workflowRun.url)}">workflow #${esc(run.workflowRun.id)}</a>` : ''
        return `<li><a href="${esc(run.report)}">${esc(id)}</a>${workflow}</li>`
    }).join('')}</ul>`
}

function renderByVersion () {
    const groups = data.groups.filter((g) => g.suite === state.suite && g.model === state.model)
    $('#by-version').innerHTML = latestGroups().map((shown) => {
        const id = shown.setup
        const setup = setupOf(id)
        const versions = groups.filter((g) => g.setup === id).sort((a, b) => compareVersions(b.version, a.version))
        const rows = versions.map((g) => {
            const tasks = (data.tasks[g.suite] ?? []).filter((t) => g.perTask[t.id])
            return `
            <details class="version">
                <summary>
                    <div class="version-row">
                        <span class="mono">${esc(g.version)}${g === shown ? '<span class="tag latest">on leaderboard</span>' : ''}${isComplete(g) ? '' : `<span class="tag" data-tip="${tip('Pilot', [`ran ${Object.keys(g.perTask).length} of ${(data.tasks[g.suite] ?? []).length} tasks, so it is not ranked`])}">pilot</span>`}</span>
                        <span class="rate">${fmt.pct(g.successRate)}<span class="ci hide-sm">${ciText(g)}</span></span>
                        <span>${fmt.cost(g.cost)}</span>
                        <span>${fmt.tokens(g.tokens)}</span>
                        <span class="hide-sm">${fmt.seconds(g.seconds)}</span>
                        <span class="hide-sm">${g.runs}</span>
                        <span class="hide-sm muted">${fmt.date(g.lastRun)}</span>
                        <span class="chev" aria-hidden="true">›</span>
                    </div>
                </summary>
                <div class="version-detail">
                    <h4>Per task</h4>
                    <div class="table-scroll"><table class="data">
                        <thead><tr><th>Task</th><th class="num">Passed</th><th class="num">Tokens</th><th class="num">Cost</th><th class="num">Time</th><th class="num">Tool calls</th></tr></thead>
                        <tbody>${tasks.map((t) => {
                            const s = g.perTask[t.id]
                            return `<tr><td class="mono">${esc(t.id)} <span class="tag">${esc(groupOf(t))}</span></td><td class="num">${s.passed}/${s.runs}</td><td class="num">${fmt.tokens(s.tokens)}</td><td class="num">${fmt.cost(s.cost)}</td><td class="num">${fmt.seconds(s.seconds)}</td><td class="num">${fmt.int(s.toolCalls)}</td></tr>`
                        }).join('')}</tbody>
                    </table></div>
                    <h4>Runs behind these numbers</h4>
                    ${runLinks(g.runIds)}
                </div>
            </details>`
        }).join('')
        return `
        <div class="card setup-block">
            <div class="setup-head"><h3>${swatch(id)}${esc(labelOf(id))}</h3><a class="mono" href="${esc(setup?.link)}">${esc(setup?.pkg)}</a></div>
            <div class="version-row head"><span>Version</span><span>Success</span><span>Cost</span><span>Tokens</span><span class="hide-sm">Time</span><span class="hide-sm">Runs</span><span class="hide-sm">Last run</span><span></span></div>
            ${rows}
        </div>`
    }).join('')
}

/* ---------- runs ---------- */

function renderRuns (runs) {
    $('#run-list').innerHTML = `
        <thead><tr><th>Date</th><th>Run</th><th>Results</th><th class="num">Runs / task</th><th>Workflow</th></tr></thead>
        <tbody>${runs.map((run) => `
            <tr>
                <td class="nowrap">${fmt.date(run.startedAt)}</td>
                <td class="nowrap"><a class="mono" href="${esc(run.report)}">${esc(run.id)}</a></td>
                <td><div class="chips">${Object.entries(run.setups).map(([setup, s]) => s.skipped
                    ? `<span class="chip skipped" data-tip="${tip(labelOf(setup), [`skipped: ${s.skipped}`])}">${esc(labelOf(setup))}</span>`
                    : `<span class="chip" data-tip="${tip(`${labelOf(setup)} ${s.version}`, [`${s.passed}/${s.runs} passed · ${fmt.tokens(s.tokens)} tokens · ${fmt.cost(s.cost)}`])}">${swatch(setup)}${esc(labelOf(setup))} <b>${fmt.pct(s.successRate)}</b></span>`).join('')}</div></td>
                <td class="num">${run.runsPerTask}</td>
                <td>${run.workflowRun ? `<a href="${esc(run.workflowRun.url)}">#${esc(run.workflowRun.id)}</a>` : '<span class="muted">local</span>'}</td>
            </tr>`).join('')}
        </tbody>`
}

/* ---------- embed ---------- */

/**
 * In an iframe (?embed=leaderboard): links open outside the frame, the
 * embedding page learns the height to size the frame, and it can switch
 * the theme without a reload.
 */
function embed () {
    const base = document.createElement('base')
    base.target = '_blank'
    document.head.append(base)
    const link = $('#full-results')
    const reportHeight = () => {
        // keep the model in the link, so it opens on the same view
        link.href = `./?suite=${encodeURIComponent(state.suite)}&model=${encodeURIComponent(state.model)}`
        window.parent.postMessage({ type: 'wdio-benchmark:height', height: Math.ceil(document.documentElement.getBoundingClientRect().height) }, '*')
    }
    new ResizeObserver(reportHeight).observe(document.documentElement)
    document.addEventListener('click', () => setTimeout(reportHeight))
    window.addEventListener('message', (e) => {
        if (e.source === window.parent && e.data?.type === 'wdio-benchmark:theme' && ['light', 'dark'].includes(e.data.theme)) {
            document.documentElement.dataset.theme = e.data.theme
        }
    })
}

/* ---------- page ---------- */

function update () {
    const rows = latestGroups()
    const runs = data.runs.filter((r) => r.suite === state.suite && r.model === state.model)
    renderControls()
    $('#suite-description').textContent = data.suites.find((s) => s.id === state.suite)?.description ?? ''
    $('#freshness').textContent = runs.length ? `Latest run ${fmt.date(runs[0].startedAt)} · ${runs.length} workflow run${runs.length === 1 ? '' : 's'}` : ''
    renderLeaderboard(rows)
    renderScatter(rows)
    renderPerTask(rows)
    renderByVersion()
    renderRuns(runs)
    const url = new URL(location.href)
    url.searchParams.set('suite', state.suite)
    url.searchParams.set('model', state.model)
    if (state.axis === 'cost') {
        url.searchParams.delete('x')
    } else {
        url.searchParams.set('x', state.axis)
    }
    history.replaceState(null, '', url)
}

$('#generated').textContent = `updated ${fmt.date(data.generatedAt)}`
$('#updated').textContent = `updated ${fmt.date(data.generatedAt)}`

if (!data.runs.length) {
    document.querySelectorAll('#controls, .block, #suite-description').forEach((el) => { el.hidden = true })
    $('#empty').hidden = false
} else {
    // only ids the data knows are taken from the URL
    const params = new URL(location.href).searchParams
    const suites = suitesWithRuns()
    state.suite = suites.find((s) => s.id === params.get('suite'))?.id ?? suites[0].id
    const models = modelsFor(state.suite)
    state.model = models.find((m) => m.id === params.get('model'))?.id ?? models[0].id
    state.axis = Object.hasOwn(METRICS, params.get('x') ?? '') ? params.get('x') : 'cost'
    renderStats()
    update()
    if (document.documentElement.dataset.embed) {
        embed()
    }
    let width = $('#scatter').clientWidth
    new ResizeObserver(() => {
        if ($('#scatter').clientWidth !== width) {
            width = $('#scatter').clientWidth
            renderScatter(latestGroups())
        }
    }).observe($('#scatter'))
}
