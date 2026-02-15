<template>
    <div class="contact-page">
        <ShellBreadcrumb />

        <div class="page-header">
            <div class="section-header">
                <span class="prompt">$</span>
                <span class="command">cat contact.txt</span>
            </div>
        </div>

        <div class="contact-grid">
            <a :href="`mailto:${cvData.contact.email}`" class="contact-item card">
                <span class="contact-icon">✉</span>
                <div>
                    <h3 class="contact-label">Email</h3>
                    <span class="contact-value">{{ cvData.contact.email }}</span>
                </div>
            </a>

            <a :href="`https://github.com/${cvData.contact.github}`" target="_blank" rel="noopener"
                class="contact-item card">
                <span class="contact-icon">⌥</span>
                <div>
                    <h3 class="contact-label">GitHub</h3>
                    <span class="contact-value">{{ cvData.contact.github }}</span>
                </div>
            </a>

            <a :href="`https://linkedin.com/in/${cvData.contact.linkedin}`" target="_blank" rel="noopener"
                class="contact-item card">
                <span class="contact-icon">⊞</span>
                <div>
                    <h3 class="contact-label">LinkedIn</h3>
                    <span class="contact-value">{{ cvData.contact.linkedin }}</span>
                </div>
            </a>

            <a :href="cvData.contact.website" target="_blank" rel="noopener" class="contact-item card">
                <span class="contact-icon">◎</span>
                <div>
                    <h3 class="contact-label">Website</h3>
                    <span class="contact-value">{{ websiteHostname }}</span>
                </div>
            </a>
        </div>

        <div class="location-note">
            <span class="prompt">$</span>
            <span class="note-text">echo "Based in {{ cvData.location }}"</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'

useHead({
    title: `Contact — ${cvData.name}`
})

const websiteHostname = computed(() => {
    try {
        return new URL(cvData.contact.website).hostname
    } catch {
        return cvData.contact.website
    }
})
</script>

<style scoped>
.contact-page {
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

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
}

.contact-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    text-decoration: none;
    color: inherit;
}

.contact-item:hover {
    text-decoration: none;
}

.contact-icon {
    font-size: 1.4rem;
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

.contact-label {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 2px;
}

.contact-value {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.location-note {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
    display: flex;
    gap: var(--space-sm);
}

@media (max-width: 640px) {
    .contact-grid {
        grid-template-columns: 1fr;
    }
}
</style>
