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

  head: [
    ['meta', { name: 'theme-color', content: '#7c1f2b' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'BBox: Kingpin Wiki' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Game systems, formulas, and the modding API for BBox: Kingpin.'
      }
    ]
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
            { text: 'Architecture', link: '/systems/architecture' }
          ]
        },
        {
          text: 'Decision Making',
          items: [
            { text: 'GOAP: How Pawns Decide', link: '/systems/goap' },
            { text: 'Emergent Design: Atomic Goals', link: '/systems/atomic-goals' },
            { text: 'Crew, Traits & Loyalty', link: '/systems/traits' },
            { text: 'The Historian', link: '/systems/historian' },
            { text: 'Drama & Emergent Events', link: '/systems/drama' }
          ]
        },
        {
          text: 'Pressure & Pacing',
          items: [
            { text: 'The Director', link: '/systems/director' },
            { text: 'Heat & Consequences', link: '/systems/heat' },
            { text: 'Combat', link: '/systems/combat' }
          ]
        },
        {
          text: 'The Business',
          items: [
            { text: 'Economy & Money Model', link: '/systems/economy' },
            { text: 'Betrayal & Defection', link: '/systems/betrayal' },
            { text: 'Territory', link: '/systems/territory' }
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
