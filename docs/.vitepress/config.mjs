import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'BBox: Kingpin Wiki',
  description:
    'Official documentation, game systems, formulas, and modding guide for BBox: Kingpin, a crime-empire management simulation.',
  lang: 'en-US',

  // Served from https://<user>.github.io/bbox-wiki/ on GitHub Pages.
  // If you later use a custom domain at the root, change this back to '/'.
  base: '/bbox-wiki/',

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  // Emits /bbox-wiki/sitemap.xml at build time so search engines and AI crawlers
  // can discover every page.
  sitemap: {
    hostname: 'https://engngamestudio.github.io/bbox-wiki/'
  },

  head: [
    ['meta', { name: 'theme-color', content: '#7c1f2b' }],
    ['link', { rel: 'icon', href: '/bbox-wiki/favicon.ico' }],

    // Open Graph (Facebook, Discord, link unfurls)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'BBox: Kingpin Wiki' }],
    ['meta', { property: 'og:title', content: 'BBox: Kingpin Wiki' }],
    ['meta', { property: 'og:description', content: 'Game systems, formulas, and the modding API for BBox: Kingpin, a crime-empire management simulation.' }],
    ['meta', { property: 'og:url', content: 'https://engngamestudio.github.io/bbox-wiki/' }],
    // Default share image. Per-page pages can override og:image via their own frontmatter head.
    ['meta', { property: 'og:image', content: 'https://engngamestudio.github.io/bbox-wiki/og-default.png' }],

    // Twitter / X card. X reads these when a page URL is shared, so a Share-on-X
    // button that posts the page URL will render this card image automatically.
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'BBox: Kingpin Wiki' }],
    ['meta', { name: 'twitter:description', content: 'Game systems, formulas, and the modding API for BBox: Kingpin.' }],
    ['meta', { name: 'twitter:image', content: 'https://engngamestudio.github.io/bbox-wiki/og-default.png' }],

    // Crawling hints
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/guide/overview' },
      { text: 'Game Systems', link: '/systems/' },
      { text: 'Modding', link: '/modding/' },
      { text: 'Downloads', link: '/downloads/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/guide/overview' },
            { text: 'Core Loop', link: '/guide/core-loop' },
            { text: 'Glossary', link: '/guide/glossary' }
          ]
        }
      ],

      '/systems/': [
        {
          text: 'Overview',
          items: [
            { text: 'Systems Index', link: '/systems/' },
            { text: 'Architecture', link: '/systems/architecture' },
            { text: 'Entities (the roster)', link: '/systems/entities' }
          ]
        },
        {
          text: 'Decision Making',
          items: [
            { text: 'GOAP: How Pawns Decide', link: '/systems/goap' },
            { text: 'Emergent Design: Atomic Goals', link: '/systems/atomic-goals' },
            { text: 'Crew, Traits & Loyalty', link: '/systems/traits' },
            { text: 'Full Trait Catalog (552)', link: '/systems/trait-catalog' },
            { text: 'The Historian', link: '/systems/historian' },
            { text: 'Drama & Emergent Events', link: '/systems/drama' }
          ]
        },
        {
          text: 'Pressure & Pacing',
          items: [
            { text: 'The Director', link: '/systems/director' },
            { text: 'Director Tools (Tuning & Debug)', link: '/systems/director-tools' },
            { text: 'Heat & Consequences', link: '/systems/heat' },
            { text: 'Combat', link: '/systems/combat' }
          ]
        },
        {
          text: 'Intelligence & Law',
          items: [
            { text: 'Buying Information', link: '/systems/intelligence' },
            { text: 'Investigations, Cases & RICO', link: '/systems/investigations' }
          ]
        },
        {
          text: 'The World',
          items: [
            { text: 'Map, Layers & Navigation', link: '/systems/map' },
            { text: 'Territory', link: '/systems/territory' }
          ]
        },
        {
          text: 'The Business',
          items: [
            { text: 'Economy & Money Model', link: '/systems/economy' },
            { text: 'Real Estate & Assets', link: '/systems/real-estate' },
            { text: 'Betrayal & Defection', link: '/systems/betrayal' }
          ]
        }
      ],

      '/modding/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Modding Overview', link: '/modding/' },
            { text: 'Quickstart (15 min)', link: '/modding/quickstart' },
            { text: 'Mod Structure & mod.json', link: '/modding/mod-structure' }
          ]
        },
        {
          text: 'Authoring Content',
          items: [
            { text: 'GOAP: Goals & Actions', link: '/modding/goap' },
            { text: 'Entities & Identities', link: '/modding/entities' },
            { text: 'Economy Config', link: '/modding/economy-config' },
            { text: 'Services & C# API', link: '/modding/services-api' }
          ]
        },
        {
          text: 'Tools & Assets',
          items: [
            { text: 'Create-Mod Scripts', link: '/modding/create-mod-scripts' },
            { text: 'Asset Studio (Portraits, Audio)', link: '/modding/asset-studio' }
          ]
        }
      ],

      '/downloads/': [
        {
          text: 'Downloads',
          items: [
            { text: 'Downloads & Starter Kits', link: '/downloads/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/engngamestudio/bbox-wiki' }
    ],

    editLink: {
      pattern:
        'https://github.com/engngamestudio/bbox-wiki/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Community documentation for BBox: Kingpin.',
      copyright: 'Copyright © 2026 ENGN Game Studio'
    }
  }
})
