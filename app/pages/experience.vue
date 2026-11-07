<template>
    <div class="experience-page">
        <ShellBreadcrumb />

        <header class="page-header">
            <h1 class="page-title">Experience</h1>
            <p class="page-lead">
                {{ cvData.experienceLead }} Full detail in the <a href="/cv.pdf" target="_blank" rel="noopener">CV (PDF)</a>.
            </p>
        </header>

        <section class="timeline" aria-label="Work experience">
            <article v-for="(job, i) in jobs" :key="i" class="job card">
                <div class="job-top">
                    <div>
                        <h2 class="company">{{ job.company }}</h2>
                        <p class="position">{{ job.role }}</p>
                    </div>
                    <span class="dates">{{ job.dates }}</span>
                </div>

                <div v-for="g in job.groups" :key="g.title" class="group">
                    <h3 class="group-title">{{ g.title }}</h3>
                    <ul class="bullets">
                        <li v-for="(b, j) in g.bullets" :key="j">{{ b }}</li>
                    </ul>
                </div>

                <ul v-if="job.bullets.length" class="bullets">
                    <li v-for="(b, j) in job.bullets" :key="j">{{ b }}</li>
                </ul>
            </article>
        </section>

        <section class="section" aria-labelledby="edu-h">
            <h2 id="edu-h" class="section-title"><span class="hash">#</span>Education</h2>
            <article v-for="(ed, i) in cvData.education" :key="i" class="job card">
                <div class="job-top">
                    <div>
                        <h3 class="company">{{ ed.degree }}</h3>
                        <p class="position">{{ ed.school }}</p>
                    </div>
                    <span class="dates">{{ ed.dates }}</span>
                </div>
                <p v-if="ed.note" class="edu-note">
                    {{ ed.note }} — <NuxtLink to="/projects/signmyname">read the case study</NuxtLink>
                </p>
            </article>
        </section>

        <section class="section" aria-labelledby="earlier-h">
            <h2 id="earlier-h" class="section-title"><span class="hash">#</span>Earlier</h2>
            <ul class="earlier">
                <li v-for="(job, i) in earlier" :key="i">
                    <span class="dates">{{ job.dates }}</span>
                    <span><strong>{{ job.role }}</strong> — {{ job.company }}</span>
                </li>
            </ul>
            <p class="earlier-note">Full detail on the <a href="/cv.pdf" target="_blank" rel="noopener">CV (PDF)</a>.</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'

useHead({
    title: `Experience — ${cvData.name}`
})

const jobs = cvData.experience.filter(j => !j.earlier)
const earlier = cvData.experience.filter(j => j.earlier)
</script>

<style scoped>
.experience-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
}

.page-lead {
    line-height: 1.7;
    max-width: 680px;
}

.timeline,
.section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
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

.group + .group,
.group + .bullets {
    margin-top: var(--space-lg);
}

.group-title {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-heading);
    margin-bottom: var(--space-sm);
}

.bullets {
    list-style: none;
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

.edu-note {
    font-size: 0.88rem;
    color: var(--text-secondary);
}

.earlier {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.earlier li {
    display: grid;
    grid-template-columns: 8rem 1fr;
    gap: var(--space-md);
    font-size: 0.88rem;
    color: var(--text-secondary);
}

.earlier strong {
    color: var(--text-primary);
    font-weight: 500;
}

.earlier-note {
    font-size: 0.8rem;
    color: var(--text-muted);
}

@media (max-width: 640px) {
    .job-top {
        flex-direction: column;
        gap: var(--space-xs);
    }

    .earlier li {
        grid-template-columns: 1fr;
        gap: 0;
    }
}
</style>
