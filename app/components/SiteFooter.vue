<template>
    <footer class="site-footer">
        <div class="container footer-inner">
            <p class="footer-text">
                <span class="footer-prompt">$</span> echo "Built with Nuxt &amp; deployed on Cloudflare Pages"
            </p>
            <div class="footer-links">
                <a :href="`https://github.com/${cvData.contact.github}`" target="_blank" rel="noopener"
                    aria-label="GitHub">
                    GitHub
                </a>
                <a :href="`https://linkedin.com/in/${cvData.contact.linkedin}`" target="_blank" rel="noopener"
                    aria-label="LinkedIn">
                    LinkedIn
                </a>
                <a :href="`mailto:${cvData.contact.email}`" aria-label="Email">
                    Email
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { cvData } from '~/utils/cv'
</script>

<style scoped>
.site-footer {
    border-top: 1px solid var(--border-primary);
    padding: var(--space-lg) 0;
}

.footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    flex-wrap: wrap;
}

.footer-text {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
}

.footer-prompt {
    color: var(--accent);
}

.footer-links {
    display: flex;
    gap: var(--space-md);
}

.footer-links a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
    transition: color var(--transition-fast);
}

.footer-links a:hover {
    color: var(--accent);
    text-decoration: none;
}

@media (max-width: 640px) {
    .footer-inner {
        flex-direction: column;
        text-align: center;
    }
}
</style>
