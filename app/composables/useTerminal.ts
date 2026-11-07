import { cvData } from '~/utils/cv'
import { projectConfig } from '~/utils/projects.config'
import { featured } from '~/utils/featured'

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'ascii'
    text: string
}

// File system simulation
const FILES = {
    'about.txt': 'whoami',
    'skills.md': 'skills',
    'experience.log': 'experience',
    'education.log': 'education',
    'contact.txt': 'contact',
    'cv.pdf': 'cv',
    'projects': 'DIR'
}

for (const f of featured) (FILES as Record<string, string>)[`${f.slug}.md`] = `study:${f.slug}`

export const CV_URL = '/cv.pdf'

function caseStudy(slug: string): string[] {
    const f = featured.find(x => x.slug === slug)
    if (!f) return []
    const lines = [`# ${f.name} — ${f.company}`, '', f.tagline, '', `role: ${f.role}`, '']
    if (f.problem?.length) {
        lines.push('## The problem')
        for (const p of f.problem) lines.push(`  ▸ ${p}`)
        lines.push('')
    }
    lines.push(`## ${f.flowTitle}`)
    f.flow.forEach((s, i) => lines.push(`  ${i + 1}. ${s.title.padEnd(14)} ${s.detail}`))
    lines.push('', '## What I built')
    for (const b of f.built) lines.push(`  ▸ ${b}`)
    lines.push('', `stack: ${f.stack.join(', ')}`, '', `// ${f.note}`)
    if (f.publicUrl) lines.push(`// ${f.publicUrl}`)
    return lines
}

function openCv() {
    if (import.meta.client) window.open(CV_URL, '_blank', 'noopener')
}

const COMMANDS: Record<string, (args?: string[]) => string[]> = {
    help: () => [
        'Available commands:',
        '',
        '  ls           — list directory contents',
        '  cat [file]   — display file contents',
        '  whoami       — display user profile',
        '  skills       — list technical skills',
        '  experience   — show work history',
        '  education    — show education',
        '  projects     — list featured projects',
        '  contact      — show contact info',
        '  cv           — open / download my CV (PDF)',
        '  clear        — clear terminal',
        '  date         — show current date/time',
        '  echo [text]  — print text',
        '  sudo         — execute a command as another user',
        '',
        'Tip: Tab autocompletes, ↑/↓ browse history, Ctrl+L clears.'
    ],

    ls: () => [
        ['about.txt', 'skills.md', 'experience.log', 'education.log', 'contact.txt', 'cv.pdf',
            ...featured.map(f => `${f.slug}.md`), 'projects/'].join('  ')
    ],

    cat: (args) => {
        const file = args?.[0]
        if (!file) return ['Usage: cat [filename]']

        // Normalize aliases
        const target = FILES[file as keyof typeof FILES]
        if (!target) return [`cat: ${file}: No such file or directory`]
        if (target === 'DIR') return [`cat: ${file}: Is a directory`]
        if (target === 'cv') return ['cat: cv.pdf: binary file — try "cv" or "open cv.pdf" instead']
        if (target.startsWith('study:')) return caseStudy(target.slice(6))

        // Execute the command mapped to the file
        const cmdHandler = COMMANDS[target]
        if (cmdHandler) return cmdHandler()
        return []
    },

    whoami: () => [
        `${cvData.name}`,
        `${cvData.role}`,
        '',
        cvData.summary,
        '',
        `📍 ${cvData.location}`
    ],

    skills: () => {
        const rows: string[] = ['Tech Stack:', '']
        const perRow = 3
        const skills = cvData.skills || []
        for (let i = 0; i < skills.length; i += perRow) {
            const chunk = skills.slice(i, i + perRow)
            rows.push('  ' + chunk.map(s => s.padEnd(20)).join(''))
        }
        return rows
    },

    experience: () => {
        const lines: string[] = []
        const exp = cvData.experience || []
        for (const job of exp) {
            lines.push(`┌─ ${job.company}`)
            lines.push(`│  ${job.role}  (${job.dates})`)
            const bullets = job.bullets || []
            for (const b of bullets.slice(0, 3)) {
                lines.push(`│  ▸ ${b}`)
            }
            lines.push('└───────────────────────────────')
            lines.push('')
        }
        return lines
    },

    education: () => {
        const lines: string[] = []
        for (const ed of cvData.education || []) {
            lines.push(`┌─ ${ed.degree}`)
            lines.push(`│  ${ed.school}  (${ed.dates})`)
            if (ed.note) lines.push(`│  ▸ ${ed.note}`)
            lines.push('└───────────────────────────────')
            lines.push('')
        }
        return lines
    },

    projects: () => {
        const lines: string[] = ['Featured Work:', '']
        for (const f of featured) {
            lines.push(`  ★ ${f.name}  (${f.company})`)
            lines.push(`     ${f.tagline}`)
            lines.push(`     → cat ${f.slug}.md  ·  shaharariel.dev/projects/${f.slug}`)
            lines.push('')
        }
        lines.push('Projects:', '')
        const projs = cvData.projects || []
        for (const p of projs) {
            lines.push(`  📌 ${p.name}`)
            lines.push(`     ${p.description}`)
            lines.push(`     [${(p.tech || []).join(', ')}]`)
            lines.push('')
        }
        const pinned = projectConfig.pinned || []
        for (const name of pinned) {
            // Special case for SignMyName (repo is Sign-My-Name/tkinter)
            const displayName = name === 'Sign-My-Name/tkinter' ? 'SignMyName' : name
            if (!projs.find(p => p.name === displayName)) {
                lines.push(`  ⭐ ${displayName}`)
                lines.push(`     → github.com/${name.includes('/') ? name : 'shaharariel95/' + name}`)
                lines.push('')
            }
        }
        return lines
    },

    contact: () => {
        const contact = cvData.contact
        return [
            'Contact Info:',
            '',
            `  ✉  Email     ${contact.email}`,
            `  ⌥  GitHub    github.com/${contact.github}`,
            `  ⊞  LinkedIn  linkedin.com/in/${contact.linkedin}`,
            `  ◎  Website   ${contact.website}`,
        ]
    },

    // Utilities & Easter Eggs
    date: () => [new Date().toString()],

    echo: (args) => [args ? args.join(' ') : ''],

    sudo: () => [
        'user is not in the sudoers file. This incident will be reported.'
    ],

    rm: () => ['Permission denied.'],

    vi: () => ['vim/vi not found. Try "nano" (just kidding, standard input only)'],
    vim: () => ['vim/vi not found. Try "nano" (just kidding, standard input only)'],
    nano: () => ['nano not installed.'],

    cd: (args) => {
        const dir = args?.[0]
        if (!dir || dir === '~' || dir === '/') return [''] // silently succeed (fake)
        if (dir === 'projects') return ['(entering projects directory...)', ''] // fake
        if (dir === '..') return ['']
        return [`cd: no such file or directory: ${dir}`]
    },

    cv: () => {
        openCv()
        return [`Opening CV… (if nothing happened, download it from ${CV_URL})`]
    },

    open: (args) => {
        const target = args?.[0]
        if (!target) return ['Usage: open [file]']
        if (target === 'cv.pdf' || target === 'cv') return COMMANDS.cv!()
        if (target in FILES) return [`open: ${target}: try "cat ${target}"`]
        return [`open: ${target}: No such file or directory`]
    },

    exit: () => ['Login session closed. (Re-open tab to reset)']
}

const MOTD = [
    `Welcome to ${cvData.name.toLowerCase().replace(' ', '_')}'s terminal.`,
    'Type "help" for available commands.',
    ''
]

export function useTerminal() {
    const history = ref<TerminalLine[]>(
        MOTD.map(text => ({ type: 'output' as const, text }))
    )
    const commandHistory = ref<string[]>([])
    const historyIndex = ref(-1)
    const input = ref('')

    function execute(raw: string) {
        const trimmed = raw.trim()
        if (!trimmed) return

        // Record input line
        history.value.push({ type: 'input', text: `$ ${trimmed}` })
        commandHistory.value.unshift(trimmed)
        historyIndex.value = -1

        const parts = trimmed.split(/\s+/)
        const cmd = parts[0]?.toLowerCase() ?? ''
        const args = parts.slice(1)

        if (cmd === 'clear') {
            history.value = []
            input.value = ''
            return
        }

        const handler = COMMANDS[cmd]
        if (handler) {
            const output = handler(args)
            for (const line of output) {
                history.value.push({ type: 'output', text: line })
            }
        } else {
            history.value.push({
                type: 'error',
                text: `command not found: ${trimmed}. Type "help" for available commands.`
            })
        }

        input.value = ''
    }

    function navigateHistory(direction: 'up' | 'down') {
        if (commandHistory.value.length === 0) return

        if (direction === 'up') {
            if (historyIndex.value < commandHistory.value.length - 1) {
                historyIndex.value++
                input.value = commandHistory.value[historyIndex.value] || ''
            }
        } else {
            if (historyIndex.value > 0) {
                historyIndex.value--
                input.value = commandHistory.value[historyIndex.value] || ''
            } else {
                historyIndex.value = -1
                input.value = ''
            }
        }
    }

    /** Tab completion for command names and file arguments */
    function complete() {
        const raw = input.value
        const parts = raw.split(/\s+/)
        const isFirst = parts.length <= 1
        const partial = parts[parts.length - 1] ?? ''
        const pool = isFirst ? Object.keys(COMMANDS).concat('clear') : Object.keys(FILES)
        const matches = pool.filter(c => c.startsWith(partial)).sort()

        if (matches.length === 1) {
            parts[parts.length - 1] = matches[0]!
            input.value = parts.join(' ') + (isFirst ? ' ' : '')
        } else if (matches.length > 1) {
            // Extend to the longest common prefix, otherwise list the options
            let prefix = matches[0]!
            for (const m of matches) {
                while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1)
            }
            if (prefix.length > partial.length) {
                parts[parts.length - 1] = prefix
                input.value = parts.join(' ')
            } else {
                history.value.push({ type: 'input', text: `$ ${raw}` })
                history.value.push({ type: 'output', text: matches.join('  ') })
            }
        }
    }

    return {
        history,
        input,
        execute,
        navigateHistory,
        complete
    }
}
