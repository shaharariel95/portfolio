<template>
    <div class="projects-page">
        <ShellBreadcrumb />

        <div class="page-header">
            <div class="section-header">
                <span class="prompt">$</span>
                <span class="command">ls ~/projects</span>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
            <div class="loading-dots">
                <span /><span /><span />
            </div>
            <p class="loading-text">Fetching repositories…</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error-state card">
            <p class="error-text">
                <span class="error-marker">ERR!</span> {{ error }}
            </p>
            <button class="retry-btn" @click="fetchRepos">
                <span class="prompt">$</span> retry
            </button>
        </div>

        <!-- Repos grid -->
        <div v-else class="repos-grid">
            <a v-for="repo in repos" :key="repo.id" :href="repo.html_url" target="_blank" rel="noopener"
                class="repo-card card">
                <div class="repo-top">
                    <div class="repo-name-row">
                        <span v-if="isPinned(repo.name)" class="pin-badge" title="Pinned">📌</span>
                        <h3 class="repo-name">{{ repo.name }}</h3>
                    </div>
                    <span class="repo-arrow">↗</span>
                </div>

                <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>

                <div class="repo-meta">
                    <span v-if="repo.language" class="repo-lang">
                        <span class="lang-dot" :style="{ background: langColor(repo.language) }" />
                        {{ repo.language }}
                    </span>
                    <span v-if="repo.stargazers_count" class="repo-stat">★ {{ repo.stargazers_count }}</span>
                    <span v-if="repo.forks_count" class="repo-stat">⑂ {{ repo.forks_count }}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'

useHead({
    title: `Projects — ${cvData.name}`
})

const { repos, loading, error, fetchRepos, isPinned } = useGitHub()

onMounted(() => {
    fetchRepos()
})

const langColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Vue: '#41b883',
    Python: '#3572A5',
    C: '#555555',
    'Jupyter Notebook': '#DA5B0B',
    CSS: '#563d7c',
    Yacc: '#4B6C4B',
    Java: '#b07219',
    HTML: '#e34c26'
}

function langColor(lang: string): string {
    return langColors[lang] || '#8b949e'
}
</script>

<style scoped>
.projects-page {
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

/* Grid */
.repos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-md);
}

.repo-card {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    cursor: pointer;
}

.repo-card:hover {
    text-decoration: none;
}

.repo-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.repo-name-row {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
}

.pin-badge {
    font-size: 0.75rem;
}

.repo-name {
    font-size: 1rem;
    color: var(--accent-secondary);
    font-weight: 600;
}

.repo-arrow {
    color: var(--text-muted);
    font-size: 0.85rem;
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.repo-card:hover .repo-arrow {
    opacity: 1;
}

.repo-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
    flex: 1;
}

.repo-meta {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: auto;
}

.repo-lang {
    display: flex;
    align-items: center;
    gap: 0.35em;
}

.lang-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.repo-stat {
    display: flex;
    align-items: center;
    gap: 0.2em;
}

/* Loading */
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-3xl);
}

.loading-dots {
    display: flex;
    gap: 6px;
}

.loading-dots span {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite;
}

.loading-dots span:nth-child(2) {
    animation-delay: 0.15s;
}

.loading-dots span:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes pulse {

    0%,
    80%,
    100% {
        opacity: 0.3;
        transform: scale(0.8);
    }

    40% {
        opacity: 1;
        transform: scale(1);
    }
}

.loading-text {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
}

/* Error */
.error-state {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    align-items: flex-start;
}

.error-text {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.error-marker {
    color: var(--terminal-error);
    font-weight: 700;
}

.retry-btn {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    background: none;
    border: 1px solid var(--border-primary);
    color: var(--text-secondary);
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: border-color var(--transition-fast), color var(--transition-fast);
}

.retry-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
}

@media (max-width: 640px) {
    .repos-grid {
        grid-template-columns: 1fr;
    }
}
</style>
