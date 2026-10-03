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

## How state becomes trait becomes behavior

State changes do more than complete a goal. Over time they feed back into who a pawn is, which unlocks new goals:

| Repeated state change | Trait it feeds | What the trait unlocks |
| --- | --- | --- |
| Gaining cash | Wealth | Access to higher-value opportunities |
| Accumulating heat | Heat exposure | Police escalate sooner |
| Taking bribes (on a cop) | Corruption | The cop starts soliciting bribes on their own |
| Collecting debts | Enforcer reputation | Debtors fold faster |
| Intimidating witnesses | Violent reputation | New, more aggressive options appear |

Because traits change slowly, the world feels like it is living rather than flipping switches. A corrupt cop you
cultivated over many in-game days is worth more than any single scripted event.

## Emergence in practice

A sequence nobody scripted, assembled from atoms reacting to shared state:

| Step | What happens |
| --- | --- |
| 1 | A member deals repeatedly; their dealer reputation climbs. |
| 2 | High reputation lowers the threshold at which nearby civilians flee. |
| 3 | A fleeing civilian reports what they saw. |
| 4 | The report makes two goals reachable at once: the member wants to silence the witness, the police want to investigate. |
| 5 | Whoever wins the race writes new state, which shifts more traits, which opens still more goals. |

The member's dealing habit made them notorious; their notoriety created a witness; the witness opened both a
conflict goal and a police goal. No arc authored that. See more examples in [Drama](/systems/drama).

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
