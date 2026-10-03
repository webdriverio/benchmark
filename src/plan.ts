/**
 * node src/plan.ts <setups>
 *
 * Prints the workflow matrix: the setup ids as a JSON array. `all` means
 * every setup; unknown ids fail the workflow before any job starts.
 */
import { SETUPS } from './setups.ts'

const wanted = (process.argv[2] ?? 'all').trim()
const ids = wanted === 'all' ? SETUPS.map((s) => s.id) : wanted.split(',').map((s) => s.trim()).filter(Boolean)
const unknown = ids.filter((id) => !SETUPS.some((s) => s.id === id))
if (unknown.length || !ids.length) {
    console.error(`unknown setups: ${unknown.join(', ') || '(none given)'}; expected: ${SETUPS.map((s) => s.id).join(', ')}`)
    process.exit(1)
}
console.log(JSON.stringify(ids))
