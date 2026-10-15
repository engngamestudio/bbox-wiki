# BBox: Kingpin Wiki

Public documentation, game-systems reference, and modding guide for **BBox: Kingpin**, built with
[VitePress](https://vitepress.dev). This is the live source of truth: when a system changes in the game, it
changes here.

Live site: https://engngamestudio.github.io/bbox-wiki/

## Local development

```bash
npm install            # first time
npm run docs:dev       # live preview at http://localhost:5173
npm run docs:build     # production build into docs/.vitepress/dist
npm run docs:preview   # serve the built site locally
```

## Structure

```
docs/
  index.md             home
  guide/               overview, core loop, glossary
  systems/             game-systems reference
  modding/             mod API, quickstart, authoring guides, entities, config, asset studio
  downloads/           starter kits and templates
  .vitepress/          config + theme
starter-kits/          bundled modder downloads
.github/workflows/     GitHub Pages deploy
```

## Deployment

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
