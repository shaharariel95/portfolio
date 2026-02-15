<template>
    <header class="site-header">
        <nav class="container header-nav" aria-label="Main navigation">
            <NuxtLink to="/" class="header-logo" aria-label="Home">
                <span class="prompt-symbol">~</span>
                <span class="header-name">shahar</span>
            </NuxtLink>

            <button class="mobile-toggle" :aria-expanded="mobileOpen" aria-controls="nav-links"
                aria-label="Toggle navigation" @click="mobileOpen = !mobileOpen">
                <span class="toggle-bar" :class="{ open: mobileOpen }" />
            </button>

            <ul id="nav-links" class="nav-links" :class="{ open: mobileOpen }" role="list">
                <li v-for="link in links" :key="link.to">
                    <NuxtLink :to="link.to" class="nav-link" @click="mobileOpen = false">
                        <span class="nav-slash">/</span>{{ link.label }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)

const links = [
    { to: '/experience', label: 'experience' },
    { to: '/projects', label: 'projects' },
    { to: '/contact', label: 'contact' },
    { to: '/terminal', label: 'terminal' }
]

// Close on route change
const route = useRoute()
watch(() => route.path, () => {
    mobileOpen.value = false
})
</script>

<style scoped>
.site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: var(--header-height);
    background: rgba(13, 17, 23, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-primary);
}

.header-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.header-logo {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-heading);
    display: flex;
    align-items: center;
    gap: 0.15em;
    text-decoration: none;
}

.header-logo:hover {
    color: var(--accent);
    text-decoration: none;
}

.prompt-symbol {
    color: var(--accent);
    font-weight: 700;
}

.nav-links {
    display: flex;
    gap: var(--space-sm);
    list-style: none;
}

.nav-link {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-secondary);
    padding: 0.35rem 0.65rem;
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast), background var(--transition-fast);
    text-decoration: none;
}

.nav-link:hover {
    color: var(--text-heading);
    background: var(--bg-hover);
    text-decoration: none;
}

.nav-link.router-link-active {
    color: var(--accent);
    background: var(--accent-glow);
}

.nav-slash {
    color: var(--text-muted);
    margin-right: 1px;
}

/* Mobile toggle */
.mobile-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    width: 36px;
    height: 36px;
    position: relative;
}

.toggle-bar,
.toggle-bar::before,
.toggle-bar::after {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--text-secondary);
    border-radius: 1px;
    transition: transform var(--transition-base), opacity var(--transition-base);
    position: absolute;
    left: 8px;
}

.toggle-bar {
    top: 50%;
    transform: translateY(-50%);
}

.toggle-bar::before {
    content: '';
    top: -6px;
}

.toggle-bar::after {
    content: '';
    top: 6px;
}

.toggle-bar.open {
    background: transparent;
}

.toggle-bar.open::before {
    top: 0;
    transform: rotate(45deg);
}

.toggle-bar.open::after {
    top: 0;
    transform: rotate(-45deg);
}

@media (max-width: 640px) {
    .mobile-toggle {
        display: block;
    }

    .nav-links {
        position: fixed;
        top: var(--header-height);
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--border-primary);
        flex-direction: column;
        padding: var(--space-md);
        gap: 0;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: transform var(--transition-slow), opacity var(--transition-slow);
    }

    .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }

    .nav-link {
        display: block;
        padding: 0.6rem 0.75rem;
        font-size: 0.95rem;
    }
}
</style>
