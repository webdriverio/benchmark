/**
 * node src/plan.ts <setups> [suite]
 *
 * Prints the workflow matrix as a JSON array: one entry per job, each a
 * comma-separated list of setup ids. `all` means every setup; unknown ids
 * fail the workflow before any job starts.
 *
 * The token study runs one setup per job, all in parallel. Live-web suites
 * run every setup in one job instead: sites block by IP address, and every
 * job gets a runner with its own, so separate jobs would let one tool get a
 * clean address and another a blocked one. In one job all tools share the
 * address and the time window, interleaved in one shuffled order.
 */
import { SETUPS } from './setups.ts'

const wanted = (process.argv[2] ?? 'all').trim()
const suite = (process.argv[3] ?? 'token-study').trim()
const ids = wanted === 'all' ? SETUPS.map((s) => s.id) : wanted.split(',').map((s) => s.trim()).filter(Boolean)
const unknown = ids.filter((id) => !SETUPS.some((s) => s.id === id))
if (unknown.length || !ids.length) {
    console.error(`unknown setups: ${unknown.join(', ') || '(none given)'}; expected: ${SETUPS.map((s) => s.id).join(', ')}`)
    process.exit(1)
}
console.log(JSON.stringify(suite === 'token-study' ? ids : [ids.join(',')]))
