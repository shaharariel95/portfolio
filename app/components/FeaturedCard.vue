<template>
    <NuxtLink :to="`/projects/${study.slug}`" class="featured-card card">
        <div class="media" aria-hidden="true">
            <img v-if="study.thumb" :src="study.thumb" alt="" loading="lazy" decoding="async" />
            <div v-else class="flow-panel">
                <span class="flow-cmd"><span class="prompt">$</span> {{ study.slug }} --flow</span>
                <span v-for="(s, i) in study.flow" :key="s.title" class="flow-line">
                    <span class="flow-n">{{ i + 1 }}</span> {{ s.title.toLowerCase() }}
                </span>
            </div>
        </div>
        <div class="featured-top">
            <span class="featured-badge">{{ study.badge }}</span>
            <span class="featured-arrow" aria-hidden="true">→</span>
        </div>
        <h3 class="featured-name">{{ study.name }}</h3>
        <p class="featured-tagline">{{ study.tagline }}</p>
        <div class="tags">
            <span v-for="t in study.stack.slice(0, 4)" :key="t" class="tag">{{ t }}</span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { CaseStudy } from '~/utils/featured'

defineProps<{ study: CaseStudy }>()
</script>

<style scoped>
.featured-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    text-decoration: none;
    color: inherit;
    overflow: hidden;
}

/* Picture area: same height on every card so the grid stays even */
.media {
    margin: calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) var(--space-xs);
    aspect-ratio: 16 / 7;
    border-bottom: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    overflow: hidden;
}

.media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform var(--transition-slow);
}

.featured-card:hover .media img {
    transform: scale(1.03);
}

.flow-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.15rem;
    padding: var(--space-md) var(--space-lg);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    color: var(--text-secondary);
    background:
        radial-gradient(120% 90% at 100% 0%, var(--accent-glow), transparent 60%),
        var(--bg-secondary);
}

.flow-cmd {
    color: var(--terminal-command);
    margin-bottom: 0.25rem;
}

.flow-cmd .prompt {
    color: var(--terminal-prompt);
    font-weight: 700;
}

.flow-n {
    color: var(--accent);
    display: inline-block;
    width: 1.2em;
}

.featured-card:hover {
    text-decoration: none;
}

.featured-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-sm);
}

.featured-badge {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent);
}

.featured-arrow {
    color: var(--text-muted);
    transition: transform var(--transition-fast), color var(--transition-fast);
}

.featured-card:hover .featured-arrow {
    color: var(--accent);
    transform: translateX(3px);
}

.featured-name {
    font-size: 1.1rem;
}

.featured-tagline {
    font-size: 0.86rem;
    color: var(--text-secondary);
    line-height: 1.55;
    flex: 1;
}
</style>
