/**
 * Renders data.json (built by src/site.ts from results/). No framework,
 * no build step: three views of the same groups.
 *
 *   latest      the newest version of each tool, for the selected model
 *   by version  every version of every tool, newest first, expandable
 *   runs        every workflow run with the versions it tested
 */
const $ = (sel) => document.querySelector(sel)
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c]))

const fmt = {
    tokens: (n) => n >= 1000 ? `${Math.round(n / 1000)}k` : String(Math.round(n)),
    cost: (n) => `$${n.toFixed(3)}`,
    seconds: (n) => `${n.toFixed(0)} s`,
    int: (n) => String(Math.round(n * 10) / 10),
    date: (iso) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

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

function successPill (stats) {
    const pct = Math.round(stats.successRate * 100)
    const cls = pct >= 90 ? 'good' : pct >= 60 ? 'mid' : 'bad'
    return `<span class="pill ${cls}" title="${stats.passed} of ${stats.runs} runs passed">${pct}%</span>`
}

/** value with a bar scaled to the largest value in the column; smallest is "best" */
function metric (value, all, format) {
    const max = Math.max(...all)
    const min = Math.min(...all)
    const width = max ? Math.max(4, (value / max) * 100) : 0
    return `<div class="metric"><div class="bar${value === min && all.length > 1 ? ' best' : ''}" style="width:${width}%"></div><span>${format(value)}</span></div>`
}

function toolCell (setups, group) {
    const setup = setups.find((s) => s.id === group.setup)
    return `<div class="tool"><strong>${esc(setup?.label ?? group.setup)}</strong><span class="pkg mono">${esc(group.setup)} · ${esc(group.pkg)}@${esc(group.version)}</span></div>`
}

function renderLatest (data, groups) {
    const latest = data.setups
        .map((s) => groups.filter((g) => g.setup === s.id).sort((a, b) => compareVersions(b.version, a.version))[0])
        .filter(Boolean)
        .sort((a, b) => b.successRate - a.successRate || a.tokens - b.tokens)
    const col = (key) => latest.map((g) => g[key])
    $('#latest').innerHTML = `
        <thead><tr><th>Tool</th><th class="num">Success</th><th>Tokens / task</th><th>Cost / task</th><th>Time / task</th><th class="num">Tool calls</th><th class="num">Runs</th></tr></thead>
        <tbody>${latest.map((g) => `
            <tr>
                <td>${toolCell(data.setups, g)}</td>
                <td class="num">${successPill(g)}</td>
                <td>${metric(g.tokens, col('tokens'), fmt.tokens)}</td>
                <td>${metric(g.cost, col('cost'), fmt.cost)}</td>
                <td>${metric(g.seconds, col('seconds'), fmt.seconds)}</td>
                <td class="num">${fmt.int(g.toolCalls)}</td>
                <td class="num">${g.runs}</td>
            </tr>`).join('')}
        </tbody>`
}

function runLinks (data, ids) {
    return `<ul class="run-links">${ids.map((id) => {
        const run = data.runs.find((r) => r.id === id)
        if (!run) {
            return ''
        }
        const workflow = run.workflowRun ? ` · <a href="${esc(run.workflowRun.url)}">workflow #${esc(run.workflowRun.id)}</a>` : ''
        return `<li><a href="${esc(run.report)}">${esc(id)}</a>${workflow}</li>`
    }).join('')}</ul>`
}

function renderByVersion (data, groups) {
    const blocks = data.setups.map((setup) => {
        const versions = groups.filter((g) => g.setup === setup.id).sort((a, b) => compareVersions(b.version, a.version))
        if (!versions.length) {
            return ''
        }
        const rows = versions.map((g, i) => {
            const tasks = data.tasks.filter((t) => g.perTask[t.id])
            return `
            <details class="version">
                <summary>
                    <div class="version-row">
                        <span class="mono">${esc(g.version)}${i === 0 ? '<span class="tag latest">latest</span>' : ''}</span>
                        <span>${successPill(g)}</span>
                        <span>${fmt.tokens(g.tokens)}</span>
                        <span>${fmt.cost(g.cost)}</span>
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
                            return `<tr><td class="mono">${esc(t.id)} <span class="tag">${esc(t.kind)}</span></td><td class="num">${s.passed}/${s.runs}</td><td class="num">${fmt.tokens(s.tokens)}</td><td class="num">${fmt.cost(s.cost)}</td><td class="num">${fmt.seconds(s.seconds)}</td><td class="num">${fmt.int(s.toolCalls)}</td></tr>`
                        }).join('')}</tbody>
                    </table></div>
                    <h4>Runs behind these numbers</h4>
                    ${runLinks(data, g.runIds)}
                </div>
            </details>`
        }).join('')
        return `
        <div class="setup-block">
            <div class="setup-head"><h3>${esc(setup.label)} <span class="muted mono" style="font-weight:400">${esc(setup.id)}</span></h3><a class="mono" href="${esc(setup.link)}">${esc(setup.pkg)}</a></div>
            <div class="version-row head"><span>Version</span><span>Success</span><span>Tokens</span><span>Cost</span><span class="hide-sm">Time</span><span class="hide-sm">Runs</span><span class="hide-sm">Last run</span><span></span></div>
            ${rows}
        </div>`
    }).join('')
    $('#by-version').innerHTML = blocks
}

function renderRuns (data, model) {
    const runs = data.runs.filter((r) => r.model === model)
    $('#run-list').innerHTML = `
        <thead><tr><th>Date</th><th>Run</th><th>Versions tested</th><th class="num">Runs / task</th><th>Workflow</th></tr></thead>
        <tbody>${runs.map((run) => `
            <tr>
                <td class="nowrap">${fmt.date(run.startedAt)}</td>
                <td class="nowrap"><a class="mono" href="${esc(run.report)}">${esc(run.id)}</a></td>
                <td><div class="chips">${Object.entries(run.setups).map(([setup, s]) => s.skipped
                    ? `<span class="chip skipped" title="${esc(s.skipped)}">${esc(setup)}</span>`
                    : `<span class="chip mono" title="${Math.round(s.successRate * 100)}% success, ${fmt.tokens(s.tokens)} tokens">${esc(setup)} ${esc(s.version)}</span>`).join('')}</div></td>
                <td class="num">${run.runsPerTask}</td>
                <td>${run.workflowRun ? `<a href="${esc(run.workflowRun.url)}">#${esc(run.workflowRun.id)}</a>` : '<span class="muted">local</span>'}</td>
            </tr>`).join('')}
        </tbody>`
}

function render (data, model) {
    const groups = data.groups.filter((g) => g.model === model)
    renderLatest(data, groups)
    renderByVersion(data, groups)
    renderRuns(data, model)
    const last = data.runs.find((r) => r.model === model)
    $('#freshness').textContent = last ? `Last run ${fmt.date(last.startedAt)} · ${data.runs.filter((r) => r.model === model).length} run(s)` : ''
    const url = new URL(location.href)
    url.searchParams.set('model', model)
    history.replaceState(null, '', url)
}

const data = await (await fetch('data.json', { cache: 'no-store' })).json()
$('#generated').textContent = `updated ${fmt.date(data.generatedAt)}`

if (!data.runs.length) {
    document.querySelectorAll('main > section:not(.intro), .controls').forEach((el) => { el.hidden = true })
    $('#empty').hidden = false
} else {
    // models ordered by their newest run
    const models = [...new Set(data.runs.map((r) => r.model))]
    const select = $('#model')
    select.innerHTML = models.map((m) => `<option>${esc(m)}</option>`).join('')
    const wanted = new URL(location.href).searchParams.get('model')
    select.value = models.includes(wanted) ? wanted : models[0]
    select.addEventListener('change', () => render(data, select.value))
    render(data, select.value)
}
