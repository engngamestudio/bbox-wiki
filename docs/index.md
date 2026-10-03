---
layout: home

hero:
  name: "BBox: Kingpin"
  text: "Official Wiki & Modding Reference"
  tagline: Run a criminal empire where your crew think for themselves. This is the live reference for every system, formula, and mod hook.
  actions:
    - theme: brand
      text: Game Systems
      link: /systems/
    - theme: alt
      text: Start Modding
      link: /modding/quickstart
    - theme: alt
      text: Downloads
      link: /downloads/

features:
  - title: Decision Making
    details: How GOAP picks goals, how 542 traits are calculated and cross-wired, and how the Historian seeds every pawn's past.
    link: /systems/goap
  - title: Pressure & Pacing
    details: The Director threat score, the full event catalog, and the per-section heat formula that drives police response.
    link: /systems/director
  - title: The Business
    details: The clean/dirty/wallet money model, laundering split, drug margins, betrayal, and territory.
    link: /systems/economy
  - title: Modding API
    details: Flat JSON entities, goals, and actions with hot reload. Ship a mod in 15 minutes, no code required.
    link: /modding/
---

## About this wiki

This is the **living source of truth** for BBox: Kingpin. It is reference-first: expect tables, formulas,
and config keys rather than long prose. When a system changes in the game, this wiki changes with it.

Two audiences are served here:

| You are a... | Start here |
| --- | --- |
| **Player** who wants to understand why the simulation behaves the way it does | [Game Systems](/systems/) |
| **Modder** who wants to add content or change the rules | [Modding Quickstart](/modding/quickstart) |

> [!NOTE]
> Numbers shown on this wiki (weights, thresholds, prices) are **defaults** read from the game's JSON config.
> Any mod, including the base game's own balance passes, can change them. Treat formulas as authoritative and
> specific numbers as the current baseline.
