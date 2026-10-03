/**
 * Decides which shell commands the `wdio-session` agent may run.
 *
 * Claude Code's `Bash(prefix:*)` allow rules reject commands they can't
 * parse with certainty, e.g. an unquoted `Selenium_(software)` in a URL, and
 * in a headless run a rejected command can't be approved, so the agent gives
 * up. This is a deliberate, small parser instead. A command is allowed when
 *
 * - every part of it (split on `&&`, `||`, `;`, `|` and newlines) is a
 *   `wdio session …` call, an `echo`/`printf` piped into one, or a read-only
 *   filter (`head`, `grep`, …) reading a pipe,
 * - it has no command substitution, backticks or process substitution,
 * - redirects only write into the run directory.
 *
 * Quoted strings and quoted heredoc bodies are data and are not inspected
 * for structure, but double quotes and unquoted heredocs are still checked
 * for substitutions, because the shell expands those.
 */
const WDIO_SESSION = /^(npx\s+(?:(?:--yes|-y)\s+)?)?wdio\s+session(?:\s|$)/
const FEED = /^(echo|printf)(?:\s|$)/
const FILTER = /^(head|tail|grep|wc|sort|jq)(?:\s|$)/
const SUBSTITUTION = /`|\$\(|<\(|>\(/

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

export function isWdioSessionCommand (command: string): boolean {
    let unsafe = false
    let shell = command.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n([\s\S]*?)\n[ \t]*\2[ \t]*(?=\n|$)/g, (match, quote: string, _tag: string, body: string) => {
        unsafe ||= !quote && SUBSTITUTION.test(body)
        return match.split('\n')[0]
    })
    shell = shell.replace(/'[^']*'/g, '\'\'')
    if (unsafe || SUBSTITUTION.test(shell)) {
        return false
    }
    shell = shell.replace(/"(?:\\.|[^"\\])*"/g, '""')

    for (const [, target] of shell.matchAll(/\d*>>?\s*(&?[^\s;&|]*)/g)) {
        if (!safeRedirectTarget(target)) {
            return false
        }
    }

    // keep the separators: filters must read a pipe, feeds must write one
    const tokens = shell.split(/(&&|\|\||;|\||\n)/)
    let sawWdio = false
    for (let i = 0; i < tokens.length; i += 2) {
        const part = tokens[i].trim()
        if (!part) {
            continue
        }
        const before = tokens[i - 1]
        const after = tokens[i + 1]
        if (WDIO_SESSION.test(part)) {
            sawWdio = true
        } else if (!(FEED.test(part) && after === '|') && !(FILTER.test(part) && before === '|' && readsOnlyThePipe(part))) {
            return false
        }
    }
    return sawWdio
}
