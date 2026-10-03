# BBox: Kingpin Wiki

Public documentation, game-systems reference, and modding guide for **BBox: Kingpin**, built with
[VitePress](https://vitepress.dev). This is the live source of truth: when a system changes in the game, it changes
here.

**Status:** private, in progress. Goes public with the playtest.

## Local development

```bash
npm install            # first time (if ~/.npm has a permission error, add: --cache /tmp/npm-cache)
npm run docs:dev       # live preview at http://localhost:5173
npm run docs:build     # production build into docs/.vitepress/dist
npm run docs:preview   # serve the built site locally
```

## Structure

```
docs/                  the wiki
  index.md             home
  guide/               overview, core loop, glossary
  systems/             the math: GOAP, traits, Historian, drama, Director, heat, combat, economy, betrayal, territory
  modding/             mod API, quickstart, GOAP authoring, entities, config, asset studio, create-mod scripts
  downloads/           starter kits and templates
  .vitepress/          config + theme
starter-kits/          bundled modder downloads (StreetBum example, create-mod template script)
.github/workflows/     GitHub Pages deploy (activate when public)
```

## Editorial policy

The wiki is **data-first: tables, not code**. Three hard rules:

0. **No references to other games.** Do not compare the game or its systems to any other title anywhere in the
   published pages.

1. **Share the playable surface.** Gameplay and tuning formulas (heat, Director threat score, trait thresholds,
   laundering split, drug margins) and the full modding surface (mod.json, goals, actions, entities, asset studio)
   are documented in full. These are things players and modders tune anyway.
2. **Do not leak the moat.** The engine internals that would let someone clone the game stay out: the internal code
   architecture, source file trees, the trait inference ruleset, and the deep service pipeline. Describe what these
   do, never reproduce how they are built.

Style conventions:
- Code blocks appear **only in the Modding section** (JSON and C# that show how to operate the game). Systems pages
  use tables, diagrams, and inline formulas, not code.
- Never write the internal tech-stack names. Say **"immutable store"**, not the framework name.
- No em dashes or en dashes in displayed text. Use plain hyphens and colons.
- Numbers are current defaults; the formula shape is the authority.

## Connecting to the private GitHub repo

The target repo is `https://github.com/engngamestudio/bbox-wiki` (owned by the `engngamestudio` account).
This local copy was built on a machine whose `git`/`gh` is authenticated as a different account, so it is not yet
pushed. Pick one path:

### Option A: push from the engngamestudio account

```bash
cd bbox-wiki
git add -A
git commit -m "Bootstrap wiki"
git remote add origin https://github.com/engngamestudio/bbox-wiki.git
git branch -M main
git push -u origin main     # authenticate as engngamestudio when prompted
```

### Option B: add the current machine's account as a collaborator

1. On GitHub, open `engngamestudio/bbox-wiki` > Settings > Collaborators.
2. Add the account this machine is logged in as.
3. Accept the invite, then run the Option A commands.

## Going public (at playtest launch)

1. Change repo visibility to **Public** (Settings > General > Danger Zone).
2. Enable Pages: Settings > **Pages** > Source = **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys.
4. The site goes live at `https://engngamestudio.github.io/bbox-wiki/`.

> The VitePress `base` is set to `/bbox-wiki/` in `docs/.vitepress/config.mjs` to match the Pages URL. If you move
> to a custom domain at the root, change `base` back to `/`.
