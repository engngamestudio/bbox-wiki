# Emergent Design: Atomic Goals

The simulation does not run on scripted story arcs. It runs on many small, independent **atomic goals** that each
read and write shared world state. Stories emerge from how those atoms interact, not from a pre-authored sequence.
This page explains that design principle. It is the architectural idea behind why the game surprises you.

## Atoms over pipelines

A scripted pipeline bakes a whole sequence into one chain: find, negotiate, escrow, sell. It works, but it is
fragile and every new wrinkle means rewriting the chain. The atomic approach is the opposite:

| Approach | Adding a behavior | Cross-pawn reactions | Emergent surprise |
| --- | --- | --- | --- |
| Scripted arc | Rewrite a long sequence | Hand-authored interaction blocks | Low, pre-written |
| Atomic goals | Add one small goal | Automatic through shared state | High, from combinations |

## The core loop of an atom

Every atom follows the same shape, and that shape is what creates emergence:

> **Action fires, writes world state. The [trait system](/systems/traits) reads the change. A trait shifts. New
> goals become reachable. New behavior unlocks.**

Each atom knows nothing about the others. A member bribing a cop does not know about laundering. The cop's own state
and traits simply make accepting the bribe possible. The story assembles itself from independent parts reacting to
the same shared state.

## The three binding rules

| Rule | Meaning |
| --- | --- |
| One goal, one condition | A goal satisfies a single desired state. If it needs three conditions joined together, it is really multiple goals. |
| Actions only read and write state | No action reaches into another entity's plan. All cross-pawn communication goes through shared world-state keys. |
| Traits are accumulated state | Every change (cash gained, heat added, a debt collected) is a signal the trait system reads. Traits drift over time; they are not one-shot switches. |

## Atom anatomy

| Part | What it is |
| --- | --- |
| Goal | One desired state condition |
| Actions | One to three steps, each reading preconditions and writing postconditions |
| State | Flat key and value pairs: booleans, integers, floats |
| Traits | Slowly drifting scores driven by accumulated state changes |

Keeping actions to roughly three steps (approach, do, complete) is what keeps goals composable and independently
testable. See [GOAP authoring](/modding/goap) for the data format.

## From state to trait to behavior

State changes do more than complete a goal. Over time they feed back into who a pawn is, which unlocks new goals:

| Repeated behavior | Trait it moves | What crossing a threshold does |
| --- | --- | --- |
| Selling drugs | Greed up, Empathy down | High Greed with low Loyalty unlocks stealing from the crew and defection |
| Taking bribes (an officer) | Corruption and bribe willingness up | Past the line, the officer starts soliciting bribes on their own |
| Fighting | Aggression and Stress up | High aggression with high stress can trigger a rage breakdown |
| Collecting debts, extorting | Ruthlessness up | Extreme ruthlessness unlocks the most violent actions |
| Taking losses and pressure | Stress up | At peak stress, a breaking point fires |

These chains are the real wired ones; see the [threshold table](/systems/traits#threshold-events) and
[trait-gated goals](/systems/traits#trait-gated-goals) for the exact cutoffs.

Because traits change slowly, the world feels like it is living rather than flipping switches. A corrupt cop you
cultivated over many in-game days is worth more than any single scripted event.

## Emergence in practice

A sequence nobody scripted, assembled from atoms reacting to shared state:

| Step | What happens |
| --- | --- |
| 1 | A member deals on a corner. Each sale raises the section's [heat](/systems/heat) and nudges their Greed. |
| 2 | A civilian nearby becomes a witness to the deal. |
| 3 | The witness can feed a police [investigation](/systems/investigations) on that ground. |
| 4 | Two goals become reachable at once: the member's Threaten Witness (silence them) and the police case. |
| 5 | Whoever acts first writes new state (witness silenced, or evidence climbing toward a warrant), which shifts the situation further. |

Nobody scripted that. The deal raised heat and created a witness; the witness opened both a conflict goal and a
police case. See the real trigger details in [Heat](/systems/heat) and [Investigations](/systems/investigations),
and more trait-driven turns in [Drama](/systems/drama).

## The player's role

With many atoms running at once, you are not scripting events. You are steering a system:

| You do | Not |
| --- | --- |
| Read pawn traits and state on the map | Puppet individual pawns |
| Notice which goals are currently reachable for whom | Force a fixed sequence |
| Reassign priorities toward what the accumulated state makes valuable | Expect the same run twice |
| Exploit slow trait drift you cultivated | Rely on scripted payoffs |

You are a **state gardener**, not a story director. See how your nudges enter the system in [GOAP](/systems/goap).

## For modders

This is why adding behavior is cheap: a new behavior is usually **one goal and a couple of actions** that read and
write existing state keys, plus at least one other atom that reacts to what it writes. A good new atom writes at
least one trait-relevant key and has something in the world that responds to it. See
[GOAP: Goals & Actions](/modding/goap).
