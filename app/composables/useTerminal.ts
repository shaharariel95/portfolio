import { cvData } from '~/utils/cv'
import { projectConfig } from '~/utils/projects.config'

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'ascii'
    text: string
}

// File system simulation
const FILES = {
    'about.txt': 'whoami',
    'skills.md': 'skills',
    'experience.log': 'experience',
    'contact.txt': 'contact',
    'projects': 'DIR'
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
        '  projects     — list featured projects',
        '  contact      — show contact info',
        '  clear        — clear terminal',
        '  date         — show current date/time',
        '  echo [text]  — print text',
        '  sudo         — execute a command as another user',
        '',
        'Type a command and press Enter.'
    ],

    ls: () => [
        'about.txt  skills.md  experience.log  contact.txt  projects/'
    ],

    cat: (args) => {
        const file = args?.[0]
        if (!file) return ['Usage: cat [filename]']

        // Normalize aliases
        const target = FILES[file as keyof typeof FILES]
        if (!target) return [`cat: ${file}: No such file or directory`]
        if (target === 'DIR') return [`cat: ${file}: Is a directory`]

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

    projects: () => {
        const lines: string[] = ['Featured Projects:', '']
        const projs = cvData.projects || []
        for (const p of projs) {
            lines.push(`  📌 ${p.name}`)
            lines.push(`     ${p.description}`)
            lines.push(`     [${(p.tech || []).join(', ')}]`)
            lines.push('')
        }
        const pinned = projectConfig.pinned || []
        for (const name of pinned) {
            if (!projs.find(p => p.name === name)) {
                // Special case for SignMyName if renamed in UI logic
                let displayName = name
                if (name === 'Sign-My-Name/tkinter') displayName = 'SignMyName'

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

        const parts = trimmed.split(' ')
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

    return {
        history,
        input,
        execute,
        navigateHistory
    }
}
