<template>
    <div class="home">
        <!-- Hero -->
        <section class="hero" aria-label="Introduction">
            <p class="hero-prompt"><span class="prompt">$</span> whoami</p>
            <h1 class="name">{{ cvData.name }}</h1>
            <p class="role">{{ cvData.role }} at {{ cvData.employer }}</p>
            <p class="meta">{{ cvData.years }} <span class="sep">·</span> {{ cvData.degree }} <span class="sep">·</span> {{ cvData.location }}</p>
            <p class="tagline">{{ cvData.tagline }}</p>

            <p class="pattern">{{ cvData.pattern }}</p>

            <div class="hero-actions">
                <a href="/cv.pdf" target="_blank" rel="noopener" class="btn btn-primary">Download CV</a>
                <NuxtLink to="/contact" class="btn">Get in touch</NuxtLink>
            </div>
        </section>

        <!-- Featured work -->
        <section class="section" aria-labelledby="work-h">
            <div class="section-head">
                <h2 id="work-h" class="section-title"><span class="hash">#</span>Featured work</h2>
                <NuxtLink to="/projects" class="section-more">all projects →</NuxtLink>
            </div>
            <div class="featured-grid">
                <FeaturedCard v-for="f in featured" :key="f.slug" :study="f" />
            </div>
        </section>

        <!-- Skills, grouped like the CV -->
        <section class="section" aria-labelledby="skills-h">
            <h2 id="skills-h" class="section-title"><span class="hash">#</span>Skills</h2>
            <dl class="skills">
                <template v-for="g in cvData.skillGroups" :key="g.label">
                    <dt>{{ g.label }}</dt>
                    <dd>{{ g.items.join(' · ') }}</dd>
                </template>
            </dl>
        </section>

        <!-- Next -->
        <nav class="cta-row" aria-label="More">
            <NuxtLink to="/experience" class="cta-link"><span class="prompt">$</span> cd /experience</NuxtLink>
            <NuxtLink to="/terminal" class="cta-link"><span class="prompt">$</span> ./terminal <span class="caret" /></NuxtLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'
import { featured } from '~/utils/featured'

useHead({
    title: `${cvData.name} — ${cvData.role}`
})
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
}

.prompt {
    color: var(--terminal-prompt);
    font-weight: 700;
}

/* Hero */
.hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.hero-prompt {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--terminal-command);
}

.name {
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-top: var(--space-xs);
}

.role {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--accent);
}

.meta {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    color: var(--text-secondary);
}

.meta .sep {
    color: var(--text-muted);
}

.tagline {
    font-size: 1.15rem;
    color: var(--text-heading);
    line-height: 1.5;
    max-width: 620px;
    margin-top: var(--space-md);
}

.pattern {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 620px;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-lg);
}

.btn {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    padding: 0.55rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
    text-decoration: none;
    transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}

.btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    text-decoration: none;
}

.btn-primary {
    background: var(--accent-dim);
    border-color: var(--accent-dim);
    color: #fff;
}

.btn-primary:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg-primary);
}

/* Sections */
.section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.section-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-md);
}

.section-more {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.section-more:hover {
    color: var(--accent);
    text-decoration: none;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
}

/* Skills */
.skills {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: var(--space-sm) var(--space-lg);
    font-size: 0.9rem;
}

.skills dt {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    padding-top: 0.1rem;
}

.skills dd {
    color: var(--text-secondary);
    line-height: 1.55;
}

/* CTA */
.cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm) var(--space-xl);
}

.cta-link {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-decoration: none;
}

.cta-link:hover {
    color: var(--accent);
    text-decoration: none;
}

@media (max-width: 640px) {
    .home {
        gap: var(--space-2xl);
    }

    .name {
        font-size: 2rem;
    }

    .tagline {
        font-size: 1.05rem;
    }

    .featured-grid {
        grid-template-columns: 1fr;
    }

    .skills {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .skills dd {
        margin-bottom: var(--space-sm);
    }
}
</style>
