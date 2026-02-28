import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Site pages managed via CMS (markdown files in content/)
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
  },
})
