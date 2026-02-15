<template>
    <div class="experience-page">
        <ShellBreadcrumb />

        <div class="page-header">
            <div class="section-header">
                <span class="prompt">$</span>
                <span class="command">cat experience.log</span>
            </div>
        </div>

        <div class="timeline">
            <article v-for="(job, i) in cvData.experience" :key="i" class="job card">
                <div class="job-top">
                    <div>
                        <h2 class="company">{{ job.company }}</h2>
                        <p class="position">{{ job.role }}</p>
                    </div>
                    <span class="dates">{{ job.dates }}</span>
                </div>

                <ul class="bullets">
                    <li v-for="(b, j) in job.bullets" :key="j">{{ b }}</li>
                </ul>

                <!-- Filesystem-style separator -->
                <div v-if="i < cvData.experience.length - 1" class="separator">
                    <span class="sep-line" />
                    <span class="sep-label">{{ '. .' }}</span>
                    <span class="sep-line" />
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'

useHead({
    title: `Experience — ${cvData.name}`
})
</script>

<style scoped>
.experience-page {
    display: flex;
    flex-direction: column;
}

.page-header {
    margin-bottom: var(--space-xl);
}

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

/* Timeline */
.timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
}

.job {
    position: relative;
}

.job-top {
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

/* Separator */
.separator {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-top: var(--space-lg);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
}

.sep-line {
    flex: 1;
    height: 1px;
    background: var(--border-primary);
}

.sep-label {
    letter-spacing: 0.15em;
}

@media (max-width: 640px) {
    .job-top {
        flex-direction: column;
        gap: var(--space-xs);
    }
}
</style>
