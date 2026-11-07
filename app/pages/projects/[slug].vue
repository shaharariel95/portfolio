<template>
    <div v-if="study" class="study-page">
        <ShellBreadcrumb />

        <header class="study-header">
            <p class="study-company">{{ study.badge }}</p>
            <h1 class="study-name">{{ study.name }}</h1>
            <p class="study-tagline">{{ study.tagline }}</p>
            <p class="study-role"><span class="label">role:</span> {{ study.role }}</p>
            <div v-if="study.links?.length" class="study-links">
                <a v-for="l in study.links" :key="l.url" :href="l.url" target="_blank" rel="noopener"
                    class="study-link">{{ l.label }}</a>
            </div>
        </header>

        <figure v-if="study.video" class="study-video">
            <video ref="videoRef" :src="study.video.src" :poster="study.video.poster" muted loop playsinline
                preload="metadata" controls :aria-label="study.video.caption" />
            <figcaption>{{ study.video.caption }}</figcaption>
        </figure>

        <section v-if="study.problem?.length" class="study-section" aria-labelledby="problem-h">
            <h2 id="problem-h" class="section-title"><span class="hash">#</span>{{ study.problemTitle ?? 'The problem' }}</h2>
            <ul class="bullets">
                <li v-for="(p, i) in study.problem" :key="i">{{ p }}</li>
            </ul>
        </section>

        <section class="study-section" aria-labelledby="flow-h">
            <h2 id="flow-h" class="section-title"><span class="hash">#</span>{{ study.flowTitle }}</h2>
            <ol class="flow" :class="{ pipeline: study.flowStyle === 'steps' }">
                <li v-for="(step, i) in study.flow" :key="i" class="flow-step card">
                    <span class="flow-index">{{ String(i + 1).padStart(2, '0') }}</span>
                    <h3 class="flow-title">{{ step.title }}</h3>
                    <p class="flow-detail">{{ step.detail }}</p>
                </li>
            </ol>
        </section>

        <section class="study-section" aria-labelledby="built-h">
            <h2 id="built-h" class="section-title"><span class="hash">#</span>What I built</h2>
            <ul class="bullets">
                <li v-for="(b, i) in study.built" :key="i">{{ b }}</li>
            </ul>
        </section>

        <section v-if="study.outcome?.length" class="study-section" aria-labelledby="outcome-h">
            <h2 id="outcome-h" class="section-title"><span class="hash">#</span>Outcome</h2>
            <ul class="bullets outcome">
                <li v-for="(o, i) in study.outcome" :key="i">{{ o }}</li>
            </ul>
        </section>

        <section class="study-section" aria-labelledby="stack-h">
            <h2 id="stack-h" class="section-title"><span class="hash">#</span>Stack</h2>
            <div class="tags">
                <span v-for="t in study.stack" :key="t" class="tag">{{ t }}</span>
            </div>
        </section>

        <p class="study-note">// {{ study.note }}</p>

        <nav class="study-nav" aria-label="More case studies">
            <NuxtLink to="/projects" class="back-link"><span class="prompt">$</span> cd ..</NuxtLink>
            <NuxtLink v-if="next" :to="`/projects/${next.slug}`" class="back-link">next: {{ next.name }} →</NuxtLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'
import { featured } from '~/utils/featured'

const route = useRoute()
const index = featured.findIndex(f => f.slug === route.params.slug)
const study = featured[index]
const next = featured[(index + 1) % featured.length]

if (!study) {
    throw createError({ statusCode: 404, statusMessage: 'No such file or directory', fatal: true })
}

// Autoplay the demo (muted) unless the visitor prefers reduced motion — then it waits for Play
const videoRef = ref<HTMLVideoElement | null>(null)
onMounted(() => {
    const v = videoRef.value
    if (!v) return
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        v.play().catch(() => { /* autoplay blocked: controls are there */ })
    }
})

useHead({
    title: `${study.name} — ${cvData.name}`,
    meta: [{ name: 'description', content: study.tagline }]
})
</script>

<style scoped>
.study-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
}

.prompt {
    color: var(--terminal-prompt);
    font-weight: 700;
}

.study-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.study-company {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
}

.study-name {
    font-size: 2rem;
    letter-spacing: -0.02em;
}

.study-tagline {
    color: var(--text-primary);
    font-size: 1.02rem;
    line-height: 1.7;
    max-width: 640px;
}

.study-role {
    font-size: 0.92rem;
    color: var(--text-secondary);
}

.study-role .label {
    font-family: var(--font-mono);
    color: var(--accent);
}

.study-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-lg);
}

.study-link {
    font-family: var(--font-mono);
    font-size: 0.85rem;
}

.study-video {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.study-video video {
    width: 100%;
    aspect-ratio: 1502 / 976;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
}

.study-video figcaption {
    font-size: 0.8rem;
    color: var(--text-muted);
}

.study-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.bullets {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.bullets li {
    font-size: 0.92rem;
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

/* Flow diagram */
.flow {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
}

.flow-step {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md);
}

.flow-index {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
}

.flow-title {
    font-size: 0.95rem;
}

.flow-detail {
    font-size: 0.84rem;
    color: var(--text-secondary);
    line-height: 1.55;
}

/* Pipeline variant: a single vertical chain with arrows between steps */
.flow.pipeline {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
}

.flow.pipeline .flow-step {
    display: grid;
    grid-template-columns: 2.5rem 9rem 1fr;
    align-items: baseline;
    column-gap: var(--space-md);
}

.flow.pipeline .flow-step:not(:last-child)::after {
    content: '↓';
    position: absolute;
    left: calc(var(--space-md) + 0.4rem);
    bottom: calc(-1 * var(--space-lg));
    height: var(--space-lg);
    display: flex;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
}

.outcome li {
    color: var(--text-primary);
}

.outcome li::before {
    content: '✓';
}

.study-note {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-muted);
}

.study-nav {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-md);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--border-secondary);
}

.back-link {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.back-link:hover {
    color: var(--accent);
    text-decoration: none;
}

@media (max-width: 640px) {
    .study-name {
        font-size: 1.6rem;
    }

    .flow.pipeline .flow-step {
        grid-template-columns: 2rem 1fr;
    }

    .flow.pipeline .flow-detail {
        grid-column: 2;
    }
}
</style>
