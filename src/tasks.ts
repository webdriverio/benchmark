/**
 * The tasks agents run: a fixed sample of Online-Mind2Web (see mind2web.ts),
 * written by the benchmark's authors and judged by its own WebJudge
 * (see judge.ts). Every agent ends with one line `ANSWER: <json>`, which is
 * recorded but doesn't decide success.
 */
import { loadDataset, loadSample } from './mind2web.ts'

export interface Check {
    pass: boolean
    detail: string
    /** decided later by a judge (see judge.ts), not by this check */
    pending?: boolean
}

/**
 * Task sets, reported separately: a tool's numbers on one never mix with
 * its numbers on another.
 */
export const SUITES = {
    'online-mind2web': {
        label: 'Online-Mind2Web',
        description: 'A fixed random sample of Online-Mind2Web, an independent benchmark of 300 tasks on live websites, judged by its own WebJudge.'
    }
} as const

export type SuiteId = keyof typeof SUITES

export interface Task {
    id: string
    /** a task on a live website, judged from screenshots */
    kind: 'live'
    /** easy, medium or hard, as the benchmark rates it */
    level?: string
    prompt: string
    /** the benchmark's own task id */
    sourceId?: string
    check: (answer: unknown) => Promise<Check>
}

const ANSWER_FORMAT = 'When you are done, reply with a final line `ANSWER: <json>` where <json> is'

/** The last `ANSWER: {...}` line of the agent's final message. */
export function parseAnswer (text: string): unknown {
    const line = text.split('\n').reverse().find((l) => l.trim().startsWith('ANSWER:'))
    if (!line) {
        return undefined
    }
    try {
        return JSON.parse(line.trim().slice('ANSWER:'.length).trim().replace(/^`|`$/g, ''))
    } catch {
        return undefined
    }
}

/**
 * Online-Mind2Web tasks, as an agent gets them here. The benchmark's own
 * agents receive the task and the website; the rule against signing in or
 * paying keeps runs on live sites harmless. WebJudge decides success from the
 * actions and screenshots, so the ANSWER line is only recorded.
 */
async function mind2webTasks (): Promise<Task[]> {
    const [sample, dataset] = await Promise.all([loadSample(), loadDataset()])
    const byId = new Map(dataset.map((t) => [t.task_id, t]))
    return sample.tasks.map(({ task_id: taskId }) => {
        const task = byId.get(taskId)
        if (!task) {
            throw new Error(`Online-Mind2Web task ${taskId} is not in the dataset revision ${sample.revision}`)
        }
        return {
            id: `om2w-${taskId.slice(0, 8)}`,
            kind: 'live' as const,
            level: task.level,
            sourceId: taskId,
            prompt: `${task.confirmed_task}
Start at ${task.website}.
Do not sign in, create an account, pay or enter personal data. If the task would need that, stop on the page right before it.
${ANSWER_FORMAT} {"answer": "<what you found, or what you did>"}.`,
            check: async () => ({ pass: false, detail: 'awaiting WebJudge', pending: true })
        }
    })
}

export async function loadTasks (suite: SuiteId): Promise<Task[]> {
    switch (suite) {
        case 'online-mind2web':
            return mind2webTasks()
    }
}
