<template>
    <div class="site-shell">
        <SiteHeader />
        <main class="site-main">
            <div class="container">
                <NuxtPage />
            </div>
        </main>
        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.site-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.site-main {
    flex: 1;
    padding-top: calc(var(--header-height) + var(--space-xl));
    padding-bottom: var(--space-3xl);
}
</style>
