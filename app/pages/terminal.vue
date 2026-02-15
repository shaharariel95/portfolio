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
                    <input ref="inputRef" v-model="input" type="text" class="input-field" autocomplete="off"
                        spellcheck="false" aria-label="Terminal input" @keydown.enter="handleEnter"
                        @keydown.up.prevent="navigateHistory('up')" @keydown.down.prevent="navigateHistory('down')" />
                    <span class="caret" />
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

const { history, input, execute, navigateHistory } = useTerminal()

const outputRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

function focusInput() {
    inputRef.value?.focus()
}

function handleEnter() {
    execute(input.value)
    nextTick(() => {
        if (outputRef.value) {
            outputRef.value.scrollTop = outputRef.value.scrollHeight
        }
    })
}

onMounted(() => {
    focusInput()
})
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

.input-field {
    flex: shrink;
    background: none;
    border: none;
    outline: none;
    color: var(--terminal-command);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    caret-color: transparent;
    /* Hide native caret, we have custom */
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
