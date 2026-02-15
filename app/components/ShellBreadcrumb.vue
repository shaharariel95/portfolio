<template>
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
            <li>
                <NuxtLink to="/" class="breadcrumb-segment">~</NuxtLink>
            </li>
            <li v-for="segment in segments" :key="segment.path">
                <span class="breadcrumb-sep">/</span>
                <NuxtLink v-if="segment.to" :to="segment.to" class="breadcrumb-segment">
                    {{ segment.label }}
                </NuxtLink>
                <span v-else class="breadcrumb-segment current" aria-current="page">
                    {{ segment.label }}
                </span>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const segments = computed(() => {
    const parts = route.path.split('/').filter(Boolean)
    return parts.map((part, i) => ({
        label: part,
        path: '/' + parts.slice(0, i + 1).join('/'),
        to: i < parts.length - 1 ? '/' + parts.slice(0, i + 1).join('/') : null
    }))
})
</script>

<style scoped>
.breadcrumb-list {
    display: flex;
    align-items: center;
    list-style: none;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    margin-bottom: var(--space-lg);
}

.breadcrumb-segment {
    color: var(--terminal-path);
    text-decoration: none;
}

.breadcrumb-segment:hover {
    text-decoration: underline;
}

.breadcrumb-segment.current {
    color: var(--text-heading);
}

.breadcrumb-sep {
    color: var(--text-muted);
    margin: 0 0.15em;
}
</style>
