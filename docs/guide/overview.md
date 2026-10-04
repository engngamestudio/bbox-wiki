# Overview

BBox: Kingpin is a crime-empire management simulation. You run a gang on a real-city map. You give orders, but
your crew are autonomous people, not units. Whether they follow an order depends on who they are.

This page is the shortest complete description of the game. Each row links to the full reference.

## The one-sentence model

> You set priorities. Your crew decide how to carry them out. The city reacts. You pay to know what is coming.

## The pillars

| Pillar | What it means | Reference |
| --- | --- | --- |
| **Autonomous crew** | Every pawn runs its own GOAP planner over its own goals and traits. You nudge priorities; you do not puppet pawns. | [GOAP](/systems/goap) |
| **Deep personality** | Each person carries hundreds of traits that shift with what they do and gate new behaviors at thresholds. | [Traits](/systems/traits) |
| **Generated past** | The Historian writes each pawn a backstory that seeds traits and can plant feuds, debts, and secrets. | [Historian](/systems/historian) |
| **A living threat** | The Director watches your empire and fires events (patrols, raids, rival attacks) when pressure builds. | [Director](/systems/director) |
| **Consequence economy** | Every order leaves a trace. Heat rises per city block and pulls police toward you. | [Heat](/systems/heat) |
| **Information is the edge** | You cannot control your crew, so you pay to know them. Hire sources, buy dossiers, and stay ahead of the law's case on you. | [Intelligence](/systems/intelligence), [Investigations & RICO](/systems/investigations) |
| **Emergent drama** | Betrayal, defection, breakdowns, and contagion are simulated, not scripted. | [Drama](/systems/drama), [Betrayal](/systems/betrayal) |
| **Real ground** | Real US cities from real street and building data, with real-estate prices anchored to real home values. | [Map](/systems/map), [Real Estate](/systems/real-estate) |

## What you actually do

1. Pick a city and a starting neighborhood.
2. Set goal priorities for your crew (deal, launder, extort, collect, guard).
3. Watch the simulation play out and manage the fallout: heat, arrests, rivals, money.
4. Buy intelligence to learn who your people really are before it costs you.
5. Expand block by block as the organization grows.

## How this wiki is organized

| Section | Contents |
| --- | --- |
| [Getting Started](/guide/overview) | This overview, the [core loop](/guide/core-loop), and a [glossary](/guide/glossary). |
| [Game Systems](/systems/) | The math. How each system computes its numbers. |
| [Modding](/modding/) | How to change or extend any of it with JSON and (optionally) C#. |
| [Downloads](/downloads/) | Starter mod kits, templates, and tools. |

> [!TIP]
> New here? Read the [Core Loop](/guide/core-loop) next. It ties every system together in one diagram.
