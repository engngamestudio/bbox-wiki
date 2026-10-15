# Game Systems

This section is the math. Each page explains how a system computes its numbers, with the formulas and the
tuning knobs that drive them. It is reference-first: tables and formulas over prose.

## Map of the systems

| System | What it decides | Core formula lives in |
| --- | --- | --- |
| [Architecture](/systems/architecture) | How the layers fit together | high-level overview |
| [Entities](/systems/entities) | Every pawn type, its purpose and goals | the roster |
| [GOAP](/systems/goap) | Which goal a pawn pursues this tick | priority math |
| [Atomic Goals](/systems/atomic-goals) | Why stories emerge instead of being scripted | design principle |
| [Traits](/systems/traits) | Who a pawn is and what they unlock | threshold tables |
| [Trait Catalog](/systems/trait-catalog) | All 552 traits with descriptions | full reference |
| [Historian](/systems/historian) | A pawn's starting past and seeded traits | worldgen |
| [Drama](/systems/drama) | Betrayal, defection, breakdowns | trait thresholds + events |
| [Director](/systems/director) | When pressure fires an event, honeymoon to kingpin | threat score + phases |
| [Director Tools](/systems/director-tools) | Presets, export/import, debug firing | tuning workflow |
| [Heat](/systems/heat) | Crime pressure per block, police pull | heat gain and decay |
| [Combat](/systems/combat) | Fight, flee, arrest, or surrender | outcome scoring |
| [Intelligence](/systems/intelligence) | Buying info: sources and dossiers | prices and reveals |
| [Investigations & RICO](/systems/investigations) | Cases, warrants, federal prosecution | evidence and exposure |
| [Map](/systems/map) | Real cities, layers, navigation, prices | OSM + real price data |
| [Real Estate](/systems/real-estate) | Stashes, labs, fronts, acquisition | costs, income, heat |
| [Economy](/systems/economy) | Money flow and drug margins | money model + laundering split |
| [Betrayal](/systems/betrayal) | Defection, contagion, recruit-back | loyalty-band tuning |
| [Territory](/systems/territory) | Turf control and pressure | section ownership |

## How to read a formula on this wiki

- **Named weights and thresholds** (for example `cashWeight`, `eventThreshold`) are config keys. You can change
  them. The [Modding](/modding/) section shows where.
- **Default values** shown are the current baseline. The base game rebalances over time, so trust the formula
  shape over any single number.
- Where a value is derived (not a raw config key), the derivation is written out.

> [!IMPORTANT]
> This wiki documents the **observable rules and tunable knobs**, not the engine internals. It is enough to
> play well, mod deeply, and reason about why the simulation behaves as it does. It is not an engine teardown.
