/**
 * Online-Mind2Web (OSU NLP Group, https://github.com/OSU-NLP-Group/Online-Mind2Web):
 * 300 tasks on 136 live websites, written by the benchmark's authors, not by
 * us or any tool vendor. We run a fixed random sample of them and let the
 * benchmark's own judge, WebJudge, decide success (see judge.ts).
 *
 * The dataset is gated on Hugging Face (accept its terms once, then use a
 * token). Its task texts stay out of this repository, as the gate intends:
 * we commit only the ids of the sampled tasks and download the rest at run
 * time.
 *
 *   node src/mind2web.ts sample [--size 50] [--seed 1]   pick the sample and write tasks/online-mind2web.json
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'

const ROOT = path.resolve(import.meta.dirname, '..')
const DATASET = 'osunlp/Online-Mind2Web'
// a fixed dataset revision: the authors replace outdated tasks over time
export const DATASET_REVISION = 'eacad896a84dc5b65e29b0b06e4699ab0544d701'
const CACHE = path.join(ROOT, '.cache', `online-mind2web-${DATASET_REVISION.slice(0, 7)}.json`)
export const SAMPLE_FILE = path.join(ROOT, 'tasks', 'online-mind2web.json')

export interface Mind2WebTask {
    task_id: string
    confirmed_task: string
    website: string
    reference_length: number
    level: 'easy' | 'medium' | 'hard'
}

export interface Sample {
    dataset: string
    revision: string
    seed: number
    /** sampled per level in the dataset's proportions */
    tasks: { task_id: string, level: Mind2WebTask['level'] }[]
}

/** every task of the dataset, from the local cache or Hugging Face (needs HF_TOKEN) */
export async function loadDataset (): Promise<Mind2WebTask[]> {
    try {
        return JSON.parse(await fs.readFile(CACHE, 'utf8'))
    } catch {}
    const token = process.env.HF_TOKEN
    if (!token) {
        throw new Error(`Online-Mind2Web needs HF_TOKEN: accept the terms at https://huggingface.co/datasets/${DATASET}, then create a read token`)
    }
    const res = await fetch(`https://huggingface.co/datasets/${DATASET}/resolve/${DATASET_REVISION}/Online_Mind2Web.json`, {
        headers: { authorization: `Bearer ${token}` }
    })
    if (!res.ok) {
        throw new Error(`downloading ${DATASET} failed: ${res.status} ${res.statusText}${res.status === 401 || res.status === 403 ? ' (did you accept the dataset terms with this account?)' : ''}`)
    }
    const tasks = await res.json() as Mind2WebTask[]
    for (const field of ['task_id', 'confirmed_task', 'website', 'level'] as const) {
        if (!tasks.every((t) => t[field])) {
            throw new Error(`${DATASET}: a task has no "${field}"; the dataset format changed`)
        }
    }
    await fs.mkdir(path.dirname(CACHE), { recursive: true })
    await fs.writeFile(CACHE, JSON.stringify(tasks))
    return tasks
}

export async function loadSample (): Promise<Sample> {
    return JSON.parse(await fs.readFile(SAMPLE_FILE, 'utf8'))
}

/** mulberry32, the same seeded PRNG run.ts shuffles with */
function random (seed: number) {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6D2B79F5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/**
 * `size` tasks, split across easy, medium and hard in the dataset's own
 * proportions, each level shuffled with `seed`. Anyone can recompute it.
 */
export function sample (tasks: Mind2WebTask[], size: number, seed: number): Sample['tasks'] {
    const rand = random(seed)
    const levels = ['easy', 'medium', 'hard'] as const
    const byLevel = levels.map((level) => tasks.filter((t) => t.level === level).sort((a, b) => a.task_id.localeCompare(b.task_id)))
    // largest remainder, so the parts add up to `size`
    const exact = byLevel.map((l) => l.length / tasks.length * size)
    const counts = exact.map(Math.floor)
    const order = exact.map((x, i) => [x - Math.floor(x), i] as const).sort((a, b) => b[0] - a[0])
    for (let i = 0; counts.reduce((a, b) => a + b, 0) < size; i++) {
        counts[order[i % order.length][1]]++
    }
    return byLevel.flatMap((list, i) => {
        const shuffled = [...list]
        for (let j = shuffled.length - 1; j > 0; j--) {
            const k = Math.floor(rand() * (j + 1));
            [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]]
        }
        return shuffled.slice(0, counts[i]).map((t) => ({ task_id: t.task_id, level: t.level }))
    })
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const { positionals, values } = parseArgs({
        allowPositionals: true,
        options: { size: { type: 'string', default: '50' }, seed: { type: 'string', default: '1' } }
    })
    if (positionals[0] !== 'sample') {
        console.error('usage: node src/mind2web.ts sample [--size 50] [--seed 1]')
        process.exit(1)
    }
    const tasks = await loadDataset()
    const picked = sample(tasks, Number(values.size), Number(values.seed))
    const out: Sample = { dataset: DATASET, revision: DATASET_REVISION, seed: Number(values.seed), tasks: picked }
    await fs.mkdir(path.dirname(SAMPLE_FILE), { recursive: true })
    await fs.writeFile(SAMPLE_FILE, JSON.stringify(out, null, 2) + '\n')
    const levels = Object.entries(Object.groupBy(picked, (t) => t.level)).map(([level, l]) => `${l!.length} ${level}`).join(', ')
    console.log(`Sampled ${picked.length} of ${tasks.length} tasks (${levels}) → ${path.relative(ROOT, SAMPLE_FILE)}`)
}
