<template>
    <div class="home">
        <!-- Terminal-style prompt header -->
        <div class="terminal-block">
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command">whoami</span>
            </div>
            <div class="terminal-output">
                <h1 class="name">{{ cvData.name }}</h1>
                <p class="role">{{ cvData.role }}</p>
            </div>
        </div>

        <!-- Summary -->
        <p class="summary">{{ cvData.summary }}</p>

        <!-- Tech stack -->
        <section class="section" aria-label="Technology stack">
            <div class="section-header">
                <span class="prompt">$</span>
                <span class="command">cat skills.txt</span>
            </div>
            <div class="tags">
                <span v-for="skill in cvData.skills" :key="skill" class="tag">{{ skill }}</span>
            </div>
        </section>

        <!-- Latest role -->
        <section class="section" aria-label="Current position">
            <div class="section-header">
                <span class="prompt">$</span>
                <span class="command">head -n 1 experience.log</span>
            </div>
            <div class="latest-role card">
                <div class="role-header">
                    <div>
                        <h2 class="company">{{ latest.company }}</h2>
                        <p class="position">{{ latest.role }}</p>
                    </div>
                    <span class="dates">{{ latest.dates }}</span>
                </div>
                <ul class="bullets">
                    <li v-for="(b, i) in latest.bullets.slice(0, 3)" :key="i">{{ b }}</li>
                </ul>
            </div>
        </section>

        <!-- CTA -->
        <div class="cta-row">
            <NuxtLink to="/experience" class="cta-link">
                <span class="prompt">$</span> cd /experience <span class="caret" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'

const latest = cvData.experience[0]

useHead({
    title: `${cvData.name} — ${cvData.role}`
})
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
}

/* Terminal prompt blocks */
.terminal-block,
.section-header {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.prompt {
    color: var(--terminal-prompt);
    font-weight: 700;
}

.command {
    color: var(--terminal-command);
}

.terminal-output {
    margin-top: var(--space-sm);
}

.name {
    margin-left: var(--space-md);
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.role {
    margin-left: var(--space-md);

    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--accent);
    margin-top: var(--space-xs);
}

.summary {
    color: var(--text-secondary);
    font-size: 0.95rem;
    max-width: 600px;
    line-height: 1.7;
}

/* Section */
.section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

/* Latest role card */
.role-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
    flex-wrap: wrap;
}

.company {
    font-size: 1.1rem;
}

.position {
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    margin-top: 2px;
}

.dates {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    white-space: nowrap;
}

.bullets {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.bullets li {
    font-size: 0.88rem;
    color: var(--text-secondary);
    padding-left: 1.2rem;
    position: relative;
    line-height: 1.6;
}

.bullets li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
}

/* CTA */
.cta-row {
    margin-top: var(--space-md);
}

.cta-link {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-secondary);
    transition: color var(--transition-fast);
    text-decoration: none;
}

.cta-link:hover {
    color: var(--accent);
    text-decoration: none;
}

.cta-link .prompt {
    color: var(--accent);
}

@media (max-width: 640px) {
    .name {
        font-size: 1.6rem;
    }

    .role-header {
        flex-direction: column;
        gap: var(--space-xs);
    }
}
</style>
