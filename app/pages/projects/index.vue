<template>
    <div class="projects-page">
        <ShellBreadcrumb />

        <header class="page-header">
            <h1 class="page-title">Projects</h1>
            <p class="page-lead">Things I've built and shipped. Each one opens a short case study.</p>
        </header>

        <section class="featured-grid" aria-label="Featured work">
            <FeaturedCard v-for="f in featured" :key="f.slug" :study="f" />
        </section>

        <a :href="`https://github.com/${cvData.contact.github}`" target="_blank" rel="noopener" class="more-link card">
            <span class="more-icon" aria-hidden="true">⌥</span>
            <div>
                <h2 class="more-title">More on GitHub</h2>
                <p class="more-sub">github.com/{{ cvData.contact.github }} — coursework, experiments and side projects</p>
            </div>
            <span class="more-arrow" aria-hidden="true">↗</span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'
import { featured } from '~/utils/featured'

useHead({
    title: `Projects — ${cvData.name}`
})
</script>

<style scoped>
.projects-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-md);
}

.more-link {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    text-decoration: none;
    color: inherit;
}

.more-link:hover {
    text-decoration: none;
}

.more-icon {
    font-size: 1.3rem;
    color: var(--accent);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-glow);
    border-radius: var(--radius-md);
    flex-shrink: 0;
}

.more-title {
    font-size: 0.95rem;
}

.more-sub {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-secondary);
}

.more-arrow {
    margin-left: auto;
    color: var(--text-muted);
}

@media (max-width: 640px) {
    .featured-grid {
        grid-template-columns: 1fr;
    }
}
</style>
