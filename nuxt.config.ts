// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Static site generation for Cloudflare Pages
  ssr: true,
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/experience', '/projects', '/contact', '/terminal', '/projects/vivago', '/projects/tsubermango', '/projects/tomax-vix', '/projects/signmyname']
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Shahar Ariel — Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Full Stack & Mobile Developer — production systems, JavaScript ecosystems, cloud platforms.' },
        { name: 'theme-color', content: '#0d1117' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Shahar Ariel' },
        { property: 'og:title', content: 'Shahar Ariel — Full Stack & Mobile Developer' },
        { property: 'og:description', content: 'Full Stack & Mobile Developer — production systems, JavaScript ecosystems, cloud platforms.' },
        { property: 'og:url', content: 'https://shaharariel.dev' },
        { property: 'og:image', content: 'https://shaharariel.dev/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Shahar Ariel — Full Stack & Mobile Developer' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://shaharariel.dev/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
