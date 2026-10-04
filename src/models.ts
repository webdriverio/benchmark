/**
 * The models an agent can run on. Claude models go to Anthropic's API.
 * Other models are served by OpenRouter through its Anthropic-compatible
 * endpoint, which is how OpenRouter documents running Claude Code on them:
 * the agent, its harness and every setup stay exactly the same, only the
 * model behind the API changes.
 *
 * https://openrouter.ai/docs/guides/guides/claude-code-integration
 */

export interface Model {
    /** the name results and the workflow use */
    id: string
    provider: 'anthropic' | 'openrouter'
    /** the model id the provider's API takes */
    apiModel: string
}

/** price in USD per token, from OpenRouter's model list at the start of a run */
export interface Pricing {
    input: number
    output: number
    cacheRead: number
    cacheWrite: number
}

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api'

const OPENROUTER_MODELS: Record<string, string> = {
    'deepseek-flash-4-1': 'deepseek/deepseek-v4.1-flash'
}

export function resolveModel (id: string): Model {
    if (OPENROUTER_MODELS[id]) {
        return { id, provider: 'openrouter', apiModel: OPENROUTER_MODELS[id] }
    }
    if (id.startsWith('claude-')) {
        return { id, provider: 'anthropic', apiModel: id }
    }
    throw new Error(`Unknown model "${id}". Use a Claude model or one of: ${Object.keys(OPENROUTER_MODELS).join(', ')}`)
}

/**
 * What the agent's Claude Code process needs to reach the model. For
 * OpenRouter, every model slot Claude Code knows (the background "fast"
 * model, subagents) points at the same model, so no call reaches a Claude
 * model and every token is the chosen model's.
 */
export function modelEnv (model: Model): Record<string, string> {
    if (model.provider === 'anthropic') {
        return {}
    }
    const key = process.env.OPENROUTER_API_KEY
    if (!key) {
        throw new Error(`${model.id} runs on OpenRouter and needs the OPENROUTER_API_KEY environment variable.`)
    }
    return {
        ANTHROPIC_BASE_URL: OPENROUTER_BASE_URL,
        ANTHROPIC_AUTH_TOKEN: key,
        ANTHROPIC_API_KEY: '',
        ANTHROPIC_MODEL: model.apiModel,
        ANTHROPIC_DEFAULT_OPUS_MODEL: model.apiModel,
        ANTHROPIC_DEFAULT_SONNET_MODEL: model.apiModel,
        ANTHROPIC_DEFAULT_HAIKU_MODEL: model.apiModel,
        ANTHROPIC_SMALL_FAST_MODEL: model.apiModel,
        CLAUDE_CODE_SUBAGENT_MODEL: model.apiModel
    }
}

/**
 * The Agent SDK prices tokens at Claude's rates. For an OpenRouter model the
 * price comes from OpenRouter's public model list instead, read once per run
 * and kept in the run's meta.
 */
export async function openRouterPricing (model: Model): Promise<Pricing> {
    const res = await fetch('https://openrouter.ai/api/v1/models')
    if (!res.ok) {
        throw new Error(`Could not read OpenRouter's model list: ${res.status}`)
    }
    const { data } = await res.json() as { data: { id: string, pricing?: Record<string, string> }[] }
    const pricing = data.find((m) => m.id === model.apiModel)?.pricing
    if (!pricing) {
        throw new Error(`OpenRouter doesn't list ${model.apiModel}.`)
    }
    const price = (key: string, fallback = 0) => pricing[key] !== undefined ? Number(pricing[key]) : fallback
    return {
        input: price('prompt'),
        output: price('completion'),
        cacheRead: price('input_cache_read', price('prompt')),
        cacheWrite: price('input_cache_write', price('prompt'))
    }
}

export function costOf (tokens: { input: number, output: number, cacheRead: number, cacheCreation: number }, pricing: Pricing) {
    return tokens.input * pricing.input + tokens.output * pricing.output + tokens.cacheRead * pricing.cacheRead + tokens.cacheCreation * pricing.cacheWrite
}
