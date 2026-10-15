# The Core Loop

Every system in the game feeds one loop: **you act, the world reacts, you adapt.** This page shows how the
pieces connect so the rest of the wiki makes sense.

## The loop, step by step

| Step | Stage | What happens | System |
| --- | --- | --- | --- |
| 1 | You act | You set goal priorities for the crew | - |
| 2 | Crew plan | Each pawn plans with GOAP, goals filtered by traits and priority | [GOAP](/systems/goap) |
| 3 | Actions run | Pawns deal, launder, extort, fight on the map | [GOAP](/systems/goap) |
| 4 | Traits shift | Actions move trait values (Greed up, Stress up) | [Traits](/systems/traits) |
| 5 | Thresholds | Traits crossing cutoffs unlock new goals (DEFECT, RAT) | [Traits](/systems/traits) |
| 6 | Heat rises | Crime raises heat per section, pulling police in | [Heat](/systems/heat) |
| 7 | Director scores | Cash, activity, time, and jitter build a threat score | [Director](/systems/director) |
| 8 | Events fire | Patrols, raids, and rival hits spawn | [Director](/systems/director) |
| 9 | Consequences | Arrests, gang war, losses land | [Combat](/systems/combat) |
| 10 | You adapt | Move work, bribe, lay low, buy intel, then back to step 1 | - |

Steps 4 and 5 feed back into step 2 (new goals change what pawns plan). Step 6 feeds step 7 (heat is part of the
pressure the Director reads). The loop never stops turning.

## Who owns what

| Layer | Owns | Tick cadence | Reference |
| --- | --- | --- | --- |
| **GOAP planner** | Per-pawn goal selection and action execution | Every tick, per agent | [GOAP](/systems/goap) |
| **Trait system** | Personality values, threshold-triggered behavior changes | Updates on action/goal completion; thresholds checked periodically | [Traits](/systems/traits) |
| **Historian** | One-time backstory and trait seeding at worldgen | Game start | [Historian](/systems/historian) |
| **Heat** | Per-section crime pressure and decay | Raised on crime events, decays on a timer | [Heat](/systems/heat) |
| **Director** | Global pressure scoring and event firing | Every `tickInterval` ticks | [Director](/systems/director) |
| **Drama** | Emergent betrayal, defection, contagion, breakdowns | Reactive to trait thresholds and events | [Drama](/systems/drama) |

## The key design rule

> **Traits affect outcomes and thresholds, not GOAP priorities directly.**

This is what keeps the simulation from locking up. A trait never silently forces a pawn to want something; it
either changes the *result* of an action or *unlocks* a new goal when it crosses a threshold. The player's
priorities and the planner stay in charge of what gets attempted. See [GOAP](/systems/goap#the-layering-rule).

## Reading the money side

The economic half of the loop runs in parallel: crew buy product, sell it, and the proceeds move through the
clean/dirty/wallet money model. See [Economy](/systems/economy) for the full cash flow and the laundering split.
