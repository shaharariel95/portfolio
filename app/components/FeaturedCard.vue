<template>
    <NuxtLink :to="`/projects/${study.slug}`" class="featured-card card">
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
