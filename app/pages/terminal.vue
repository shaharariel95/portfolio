<template>
    <div class="terminal-page">
        <ShellBreadcrumb />

        <div class="terminal-window" @click="focusInput">
            <!-- Title bar -->
            <div class="terminal-titlebar">
                <div class="titlebar-dots">
                    <span class="dot red" />
                    <span class="dot yellow" />
                    <span class="dot green" />
                </div>
                <span class="titlebar-title">shahar@portfolio:~</span>
            </div>

            <!-- Output area -->
            <div ref="outputRef" class="terminal-body" aria-live="polite" role="log">
                <div v-for="(line, i) in history" :key="i" class="term-line" :class="line.type">
                    <pre>{{ line.text }}</pre>
                </div>

                <!-- Input line -->
                <div class="input-line">
                    <span class="input-prompt">$</span>
                    <span class="input-wrap">
                        <!-- Visible mirror of the input so the block caret sits exactly at the cursor -->
                        <span class="input-mirror" aria-hidden="true">{{ beforeCaret }}<span class="caret"
                                :class="{ idle: !focused, typing }">{{ atCaret }}</span>{{ afterCaret }}</span>
                        <input ref="inputRef" v-model="input" type="text" class="input-field" autocomplete="off"
                            autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send"
                            aria-label="Terminal input" @keydown="onKeydown" @input="syncCaret" @keyup="syncCaret"
                            @click="syncCaret" @select="syncCaret" @focus="focused = true"
                            @blur="focused = false" />
                    </span>
                </div>
            </div>
        </div>

        <!-- Mobile hint -->
        <p class="mobile-hint">Tap the terminal to type. Try <code>help</code>.</p>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'

useHead({
    title: `Terminal — ${cvData.name}`
})

const { history, input, execute, navigateHistory, complete } = useTerminal()

const outputRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

// --- Caret tracking -------------------------------------------------------
const focused = ref(false)
const cursor = ref(0)
const typing = ref(false)
let typingTimer: ReturnType<typeof setTimeout> | undefined

const beforeCaret = computed(() => input.value.slice(0, cursor.value))
// The character under the block caret (non-breaking space at end of line so the block has width)
const atCaret = computed(() => input.value.charAt(cursor.value) || '\u00a0')
const afterCaret = computed(() => input.value.slice(cursor.value + 1))

function syncCaret() {
    // Read after the browser has applied the key / click
    requestAnimationFrame(() => {
        const el = inputRef.value
        cursor.value = el ? (el.selectionStart ?? input.value.length) : input.value.length
    })
    // Keep the caret solid while typing, blink when idle (like a real terminal)
    typing.value = true
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => (typing.value = false), 500)
}

// When input changes programmatically (history, completion, clear) put the cursor at the end
watch(input, (val) => {
    nextTick(() => {
        const el = inputRef.value
        if (el && document.activeElement === el && el.selectionStart !== null) {
            cursor.value = el.selectionStart
        } else {
            cursor.value = val.length
        }
    })
})

function moveCursorToEnd() {
    nextTick(() => {
        const el = inputRef.value
        if (!el) return
        const end = el.value.length
        el.setSelectionRange(end, end)
        cursor.value = end
    })
}

function focusInput() {
    // Don't steal focus when the visitor is selecting output text to copy
    if (window.getSelection()?.toString()) return
    inputRef.value?.focus({ preventScroll: true })
}

function scrollToBottom() {
    nextTick(() => {
        if (outputRef.value) {
            outputRef.value.scrollTop = outputRef.value.scrollHeight
        }
    })
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        e.preventDefault()
        execute(input.value)
        cursor.value = 0
        scrollToBottom()
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        navigateHistory(e.key === 'ArrowUp' ? 'up' : 'down')
        moveCursorToEnd()
    } else if (e.key === 'Tab') {
        e.preventDefault()
        complete()
        moveCursorToEnd()
        scrollToBottom()
    } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        execute('clear')
    } else if (e.key === 'c' && e.ctrlKey && !window.getSelection()?.toString()) {
        // Ctrl+C with nothing selected: cancel the current line, like a shell
        e.preventDefault()
        history.value.push({ type: 'input', text: `$ ${input.value}^C` })
        input.value = ''
        scrollToBottom()
    }
    syncCaret()
}

onMounted(() => {
    // preventScroll avoids the page jumping on load (especially on mobile)
    inputRef.value?.focus({ preventScroll: true })
})

onBeforeUnmount(() => clearTimeout(typingTimer))
</script>

<style scoped>
.terminal-page {
    display: flex;
    flex-direction: column;
}

.terminal-window {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: text;
}

/* Title bar */
.terminal-titlebar {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: 0.6rem var(--space-md);
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-primary);
}

.titlebar-dots {
    display: flex;
    gap: 6px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.dot.red {
    background: #ff5f56;
}

.dot.yellow {
    background: #ffbd2e;
}

.dot.green {
    background: #27c93f;
}

.titlebar-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
}

/* Body */
.terminal-body {
    padding: var(--space-md);
    max-height: 65vh;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.65;
}

.term-line pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
}

.term-line.input pre {
    color: var(--terminal-command);
}

.term-line.output pre {
    color: var(--text-secondary);
}

.term-line.error pre {
    color: var(--terminal-error);
}

/* Input line */
.input-line {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-top: var(--space-xs);
}

.input-prompt {
    color: var(--terminal-prompt);
    font-weight: 700;
    flex-shrink: 0;
}

.input-wrap {
    position: relative;
    flex: 1;
    min-width: 0;
}

.input-mirror {
    display: block;
    white-space: pre;
    overflow: hidden;
    color: var(--terminal-command);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    pointer-events: none;
}

/* The real input sits on top of the mirror, fully transparent, so it still
   receives typing, IME, paste and mobile keyboards. */
.input-field {
    position: absolute;
    inset: 0;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    color: transparent;
    caret-color: transparent;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: inherit;
}

.input-field::selection {
    background: var(--accent-glow);
    color: transparent;
}

/* Block caret: highlights the character under the cursor */
.caret {
    display: inline;
    width: auto;
    height: auto;
    margin: 0;
    background: var(--accent);
    color: var(--bg-secondary);
    vertical-align: baseline;
    animation: blink 1s step-end infinite;
}

.caret.typing {
    animation: none;
}

/* Unfocused: hollow, non-blinking block (like most terminal emulators) */
.caret.idle {
    background: transparent;
    color: inherit;
    outline: 1px solid var(--accent);
    outline-offset: -1px;
    animation: none;
}

/* Mobile hint */
.mobile-hint {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: var(--space-md);
    text-align: center;
}

.mobile-hint code {
    color: var(--accent);
}

@media (min-width: 641px) {
    .mobile-hint {
        display: none;
    }
}
</style>
