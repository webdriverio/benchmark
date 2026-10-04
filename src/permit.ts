/**
 * Decides which shell commands the agent of a command-line setup
 * (`wdio session`, agent-browser, playwright-cli) may run.
 *
 * Claude Code's `Bash(prefix:*)` allow rules reject commands they can't
 * parse with certainty, e.g. an unquoted `Selenium_(software)` in a URL, and
 * in a headless run a rejected command can't be approved, so the agent gives
 * up. This is a deliberate, small parser instead. A command is allowed when
 *
 * - every part of it (split on `&&`, `||`, `;`, `|` and newlines) is a
 *   call of the setup's tool, an `echo`/`printf` (printing, or piped into
 *   one), `true`, or a read-only filter (`head`, `grep`, …) reading a pipe,
 * - it has no backticks or process substitution, and command substitution
 *   only of the tool's own commands (`SESSION="$(agent-browser session id)"`),
 * - variable assignments (`export SESSION=…`) don't touch variables that
 *   change what runs (`PATH`, `NODE_OPTIONS`, …),
 * - redirects only write into the run directory.
 *
 * Quoted strings and quoted heredoc bodies are data and are not inspected
 * for structure, but double quotes and unquoted heredocs are still checked
 * for substitutions, because the shell expands those.
 */
const WDIO_SESSION = /^(npx\s+(?:(?:--yes|-y)\s+)?)?wdio\s+session(?:\s|$)/
// not the commands that change the machine instead of the page, start a
// server, or hand the task to another model (`chat`, whose tokens we can't count)
const AGENT_BROWSER = /^(npx\s+(?:(?:--yes|-y)\s+)?)?agent-browser(?:\s|$)(?!\s*(?:install|upgrade|plugin|chat|dashboard)(?:\s|$))/
// not the commands that install things, open a dashboard window, or reach
// browsers outside the run (`kill-all` kills every browser process)
// (anywhere in the call, so a global option like `-s=name` in front doesn't hide them)
const PLAYWRIGHT_CLI = /^(npx\s+(?:(?:--yes|-y)\s+)?)?playwright-cli(?:\s|$)(?!(?:.*\s)?(?:install(?:-[\w-]+)?|show|kill-all|delete-data)(?:\s|$))/
const FEED = /^(echo|printf)(?:\s|$)/
const FILTER = /^(head|tail|grep|wc|sort|jq)(?:\s|$)/
// other tools have their own waits; a plain sleep between commands is harmless
const SLEEP = /^sleep\s+\d+(\.\d+)?$/
// `|| true` and `echo "---"` between commands only shape the output
const NOOP = /^(true|:)$/
// a heredoc fed to the tool (`cat <<'EOF' | agent-browser eval --stdin`), not a file
const HEREDOC_FEED = /^cat\s+<<-?\s*(""|\w+)$/
const SUBSTITUTION = /`|\$\(|<\(|>\(/
const ASSIGNMENT = /^(?:export\s+)?([A-Za-z_]\w*)=\S*$/
const LEADING_ASSIGNMENTS = /^(?:[A-Za-z_]\w*=\S*\s+)+/
const PROTECTED = /^(PATH|NODE_OPTIONS|NODE_PATH|BASH_ENV|ENV|IFS|HOME|SHELL|LD_\w*|DYLD_\w*)$/

/** `NAME=value` is harmless unless NAME changes which program runs or how */
function safeAssignments (part: string) {
    return [...part.matchAll(/(?:^|\s)([A-Za-z_]\w*)=/g)].every(([, name]) => !PROTECTED.test(name))
}

function safeRedirectTarget (target: string) {
    if (target === '/dev/null' || /^&\d$/.test(target)) {
        return true
    }
    return /^[\w.-][\w./-]*$/.test(target) && !target.split('/').includes('..')
}

/** a filter like `grep x` must not name files: `grep x ~/.ssh/id_rsa` ignores the pipe */
function readsOnlyThePipe (part: string) {
    return part.split(/\s+/).slice(1).every((arg) => arg.startsWith('-') || !/[/~]|\.\./.test(arg)) &&
        part.split(/\s+/).slice(1).filter((arg) => !arg.startsWith('-')).length <= (/^(grep|jq)/.test(part) ? 1 : 0) + (/^(head|tail)\s+-n/.test(part) ? 1 : 0)
}

export const isWdioSessionCommand = (command: string) => isCommandOf(WDIO_SESSION, command)
export const isAgentBrowserCommand = (command: string) => isCommandOf(AGENT_BROWSER, command)
export const isPlaywrightCliCommand = (command: string) => isCommandOf(PLAYWRIGHT_CLI, command)

/**
 * Reads the command left to right the way the shell quotes it: single-quoted
 * text is literal, double-quoted text only expands `$(…)` and backticks.
 * Returns the command with quoted text replaced by `""`, and the commands of
 * every `$(…)`, or undefined for backticks and process substitution.
 */
function scan (command: string): { shell: string, substitutions: string[] } | undefined {
    let shell = ''
    const substitutions: string[] = []
    let quote: '' | '\'' | '"' = ''
    for (let i = 0; i < command.length; i++) {
        const char = command[i]
        if (quote === '\'') {
            if (char === '\'') {
                quote = ''
                shell += '""'
            }
            continue
        }
        if (char === '\\') {
            i++
            if (!quote) {
                shell += '_'
            }
            continue
        }
        if (char === '`') {
            return undefined
        }
        if (char === '$' && command[i + 1] === '(') {
            let depth = 0
            let end = i + 1
            for (; end < command.length; end++) {
                depth += command[end] === '(' ? 1 : command[end] === ')' ? -1 : 0
                if (depth === 0) {
                    break
                }
            }
            if (depth !== 0) {
                return undefined
            }
            substitutions.push(command.slice(i + 2, end))
            if (!quote) {
                shell += '""'
            }
            i = end
            continue
        }
        if (quote === '"') {
            if (char === '"') {
                quote = ''
                shell += '""'
            }
            continue
        }
        if (char === '\'' || char === '"') {
            quote = char
            continue
        }
        if ((char === '<' || char === '>') && command[i + 1] === '(') {
            return undefined
        }
        shell += char
    }
    return quote ? undefined : { shell, substitutions }
}

function isCommandOf (tool: RegExp, command: string): boolean {
    let unsafe = false
    let shell = command.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n([\s\S]*?)\n[ \t]*\2[ \t]*(?=\n|$)/g, (match, quote: string, _tag: string, body: string) => {
        unsafe ||= !quote && SUBSTITUTION.test(body)
        return match.split('\n')[0]
    })
    const scanned = scan(shell)
    if (unsafe || !scanned) {
        return false
    }
    // `$(…)` may only hold the tool's own commands
    if (!scanned.substitutions.every((inner) => isCommandOf(tool, inner))) {
        return false
    }
    shell = scanned.shell

    for (const [, target] of shell.matchAll(/\d*>>?\s*(&?[^\s;&|]*)/g)) {
        if (!safeRedirectTarget(target)) {
            return false
        }
    }

    // keep the separators: filters must read a pipe, heredocs must feed one
    const tokens = shell.split(/(&&|\|\||;|\||\n)/)
    let sawTool = scanned.substitutions.length > 0
    for (let i = 0; i < tokens.length; i += 2) {
        const part = tokens[i].trim()
        if (!part) {
            continue
        }
        const before = tokens[i - 1]
        const after = tokens[i + 1]
        if (!safeAssignments(part)) {
            return false
        }
        if (tool.test(part.replace(LEADING_ASSIGNMENTS, ''))) {
            sawTool = true
        } else if (ASSIGNMENT.test(part)) {
            continue
        } else if (!SLEEP.test(part) && !NOOP.test(part) && !FEED.test(part) && !(HEREDOC_FEED.test(part) && after === '|') && !(FILTER.test(part) && before === '|' && readsOnlyThePipe(part))) {
            return false
        }
    }
    return sawTool
}
