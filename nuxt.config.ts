// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Static site generation for Cloudflare Pages
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/experience', '/projects', '/contact', '/terminal']
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Shahar Ariel — Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Full Stack & Mobile Developer — production systems, JavaScript ecosystems, cloud platforms.' },
        { name: 'theme-color', content: '#0d1117' }
      ],
      link: [
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
