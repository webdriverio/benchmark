/**
 * node src/plan.ts <setups> <tasks> <shards>
 *
 * Prints the workflow's plan as JSON: the comma-separated setup ids and one
 * matrix entry per shard, `{ "shard": "01", "tasks": "om2w-…,om2w-…" }`.
 * `all` means every setup or every task; unknown ids fail the workflow
 * before any job starts.
 *
 * Live websites block by IP address, and every job gets a runner with its
 * own. So the jobs split the tasks, never the setups: a shard runs every
 * setup on each of its tasks, from one address and interleaved in one
 * shuffled order, and a site that blocks a shard's runner blocks every tool
 * alike. Tasks are dealt round-robin from the sample, which lists them by
 * level, so every shard gets its share of easy, medium and hard tasks.
 */
import { SETUPS } from './setups.ts'
import { loadSample } from './mind2web.ts'
import { mind2webId } from './tasks.ts'

const [setupArg = 'all', taskArg = 'all', shardArg = '1'] = process.argv.slice(2).map((a) => a.trim())

function fail (message: string): never {
    console.error(message)
    process.exit(1)
}

const setupIds = setupArg === 'all' ? SETUPS.map((s) => s.id) : setupArg.split(',').map((s) => s.trim()).filter(Boolean)
const unknownSetups = setupIds.filter((id) => !SETUPS.some((s) => s.id === id))
if (unknownSetups.length || !setupIds.length) {
    fail(`unknown setups: ${unknownSetups.join(', ') || '(none given)'}; expected: ${SETUPS.map((s) => s.id).join(', ')}`)
}

const allTasks = (await loadSample()).tasks.map((t) => mind2webId(t.task_id))
const taskIds = taskArg === 'all' ? allTasks : taskArg.split(',').map((s) => s.trim()).filter(Boolean)
const unknownTasks = taskIds.filter((id) => !allTasks.includes(id))
if (unknownTasks.length || !taskIds.length) {
    fail(`unknown tasks: ${unknownTasks.join(', ') || '(none given)'}; expected ids from tasks/online-mind2web.json, e.g. ${allTasks[0]}`)
}

const shards = Number(shardArg)
if (!Number.isInteger(shards) || shards < 1 || shards > 100) {
    fail(`shards must be a whole number from 1 to 100, got "${shardArg}"`)
}
// never more shards than tasks: an empty shard would start a runner for nothing
const count = Math.min(shards, taskIds.length)
const width = String(count).length
const matrix = Array.from({ length: count }, (_, i) => ({
    shard: String(i + 1).padStart(width, '0'),
    tasks: taskIds.filter((_, j) => j % count === i).join(',')
}))

console.log(JSON.stringify({ setups: setupIds.join(','), matrix }))
