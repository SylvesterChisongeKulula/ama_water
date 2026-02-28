// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    'nuxt-security',
  ],

  security: {
    // Global rate limiter to prevent spam requests (150 requests per 5 minutes)
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 300000,
    },
  },

  routeRules: {
    // Strict Rate Limiting on Authentication routes (max 5 requests per minute)
    '/api/auth/**': {
      security: {
        rateLimiter: {
          tokensPerInterval: 5,
          interval: 60000,
        },
      },
    },
  },

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    // Server-only keys (not exposed to client)
    databaseUrl: process.env.DATABASE_URL || '',
    resendApiKey: process.env.RESEND_API_KEY || '',

    // Public keys (exposed to client)
    public: {
      appEnv: 'development',
    },
  },

  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },

  compatibilityDate: '2024-04-03',
})
