# Crew, Traits & Loyalty

Every person in the game carries a large set of **traits**: numeric values describing personality, history, and
current state. Traits are what make one crew member loyal muscle and another a future rat. This page explains
how traits are stored, how they change, and how they change behavior.

## Not a spreadsheet

The trait system is not a stat block. It is the foundation for simulating people, and that is the long game of this
project.

- **Every one of the 552 traits is a dimension, not a decoration.** A trait is not there only to flavor a backstory.
  It is a hook that behavior can be hung on. Any trait can be deepened: given new effects, new thresholds, new
  interactions, new drama.
- **Depth compounds.** The game gets deeper not by adding more pawns but by wiring more of these dimensions into
  [GOAP](/systems/goap), [drama](/systems/drama), [combat](/systems/combat), and the [economy](/systems/economy). A
  trait that today only colors a dossier can tomorrow gate a goal, shift a fight, or trigger a breakdown.
- **This is endless by design.** The target is not a fixed feature list. It is a long march toward people who feel
  real: who carry a past, change from what they live through, and surprise you. Every trait wired deeper is a step
  toward that, and there is always another step.

> [!IMPORTANT]
> We are not building a spreadsheet of numbers. We are building people. The traits are the raw material; the depth
> comes from [traits plus drama plus the rest of the systems](/guide/core-loop) compounding into behavior nobody
> scripted.

## Inventory

There are **552 traits across 17 categories**. See the complete list with descriptions in the
[Full Trait Catalog](/systems/trait-catalog). Today a focused subset is wired to live gameplay (see
[what drives behavior](#what-actually-drives-behavior)); the rest are dimensions waiting to be deepened.

| # | Category | Count | Applies to |
| --- | --- | --- | --- |
| 01 | CorePersonality | 17 | All |
| 02 | SubstanceUse | 33 | All |
| 03 | TraumaMentalHealth | 49 | All |
| 04 | CriminalHistory | 56 | Criminal |
| 05 | FamilyBackground | 49 | All |
| 06 | SocialRelationships | 50 | All |
| 07 | CognitiveSkills | 52 | All |
| 08 | MoralEthical | 51 | All |
| 09 | PhysicalBiological | 49 | All |
| 10 | SituationalDynamic | 50 | All |
| 11-16 | Law Enforcement (6 categories) | 90 | Police |
| - | CivilianLife | 6 | Civilians |

**The CorePersonality traits** are the ones you will watch most: Greed, Caution, Aggression, Impulsivity,
Narcissism, Empathy, Ambition, Patience, Loyalty, Paranoia, Confidence, Dominance, Courage, Discipline,
Manipulative, Charisma, Curiosity.

## How traits change

Traits are **computed from observable behavior**, not set by hand. Three things move them:

| Source | When | Example |
| --- | --- | --- |
| **Action impact** | A pawn finishes an action | Selling drugs raises Greed and Stress, lowers Empathy. |
| **Goal impact** | A pawn completes a goal | Completing a bribe gives a large confidence and corruption swing. |
| **Decay** | Over time, toward a baseline | Stress drifts back down when the pawn is safe. |

All of these are defined in data (a trait-impact ruleset), so mods can retune them. See
[Modding: economy and tuning](/modding/economy-config).

### Example: a single drug sale

| Trait | Change |
| --- | --- |
| Greed | +2 |
| Stress | +1.5 |
| Empathy | -0.5 |
| DrugDealing count | +1 |

Small amounts accumulate. Hundreds of deals move a personality a long way. This is how a cautious earner slowly
becomes a greedy one.

### Decay rules

| Trait | Decays toward | Rate | Condition |
| --- | --- | --- | --- |
| CurrentStress | 30 | 0.05 / tick | Not in combat |
| Paranoia | 20 | 0.03 / tick | Heat below 30 |
| Caution | 40 | 0.02 / tick | Not in danger |

## Contextual modifiers

Situation amplifies trait changes. These multipliers stack on top of the base impact:

| Situation | Effect |
| --- | --- |
| Night operations | 1.5x Paranoia and Stress changes |
| Police district | 2x Stress and Caution changes |
| High heat (above 70) | 1.8x Paranoia and Caution changes |
| Bribing under pressure (heat above 50) | 2x Confidence, Dominance, MoralFlexibility, Stress |
| Repeated corruption | 1.5x Narcissism, Conscience, Guilt, Dominance |

## Trait interactions

Some traits push on each other continuously:

| When | Effect |
| --- | --- |
| Stress above 70 | Suppresses rational thinking (0.5x) |
| Paranoia above 60 | Boosts Caution (0.3x) |
| Confidence above 70 | Boosts Leadership (0.4x) |
| Empathy and Ruthlessness | Always inverse (0.6x) |
| Dominance above 80 | Suppresses Conscience (0.4x) |

## Threshold events

This is where traits become behavior. When a trait crosses a cutoff, the pawn gains or loses goals and
properties. These are the moments that create stories.

| Trait | Threshold | Becomes | Effect |
| --- | --- | --- | --- |
| Ambition | >= 90 (and low Loyalty) | Starts own gang | Unlocks recruit and territory goals, becomes a boss |
| Ambition | >= 70 | Seeks promotion | Unlocks impress-boss goals |
| Ruthlessness | >= 85 | Psychopath | Unlocks extreme-violence actions |
| CurrentStress | >= 80 | Breaking point | Fires a breakdown event |
| Loyalty | <= 20 | Disloyal | Unlocks betray and leak goals |
| Dominance | >= 85 (after bribes) | Feels untouchable | Unlocks demand-protection goal |
| MoralFlexibility | >= 90 | Moral event horizon | Unlocks blackmail and frame goals |
| Corruption level (police) | >= 50 | Turns corrupt | Unlocks accept-bribe, ignore-crime |

## Trait-gated goals

Some goals stay dormant (priority `0`) until traits unlock them with a `trait_check` gate. See
[GOAP priority math](/systems/goap#priority-math).

| Goal | Unlocks when |
| --- | --- |
| DEFECT | Loyalty < 20 **and** Greed > 70 |
| STEAL_FROM_CREW | Greed > 80 **and** Loyalty < 40 |
| RAT_TO_POLICE | Loyalty < 15 **and** Fear > 70 |
| MENTAL_BREAK_RAGE | Aggression > 70 **and** Stress > 80 |
| CATATONIC_BREAKDOWN | Depression > 80 **and** Stress > 70 |
| SUBSTANCE_BINGE | Craving > 75 **and** Stress > 60 |
| REFUSE_ORDERS | Resentment > 60 **and** Loyalty < 30 |
| INSPIRE_CREW | Confidence > 80 **and** Leadership > 60 |

See how these play out in [Drama](/systems/drama) and [Betrayal](/systems/betrayal).

## Loyalty and the player relationship

A set of traits tracks how a crew member feels about **you** specifically. The player's treatment moves them
directly:

| Player action | Effect on the member |
| --- | --- |
| Raise their payout | Loyalty up |
| Cut their payout | Loyalty down, Resentment up, Trust down |
| Lean on them repeatedly (threats) | Stress up, Loyalty erodes |
| Leave a rat unpunished | Loyalty drops across the whole crew (contagion). See [Betrayal](/systems/betrayal). |

## What actually drives behavior

Of the 552 traits, a focused subset is wired to live gameplay today: the ones referenced by goal gates, threshold
events, combat scoring, and inference. The rest are not idle flavor; they are **dimensions not yet wired**. Each one
is a place the simulation can grow deeper.

| State of a trait | What it means | Where it goes next |
| --- | --- | --- |
| Wired | Already gates goals, shifts outcomes, or triggers [drama](/systems/drama) | Tuned and balanced |
| Seeded, readable | Set at worldgen, visible in a [dossier](/systems/intelligence), shapes character | A candidate to wire into behavior |
| Dormant | Defined and carried, waiting for its hook | The backlog of depth |

This is the engine of the game's long-term depth: every pass wires more of the [catalog](/systems/trait-catalog)
into [GOAP](/systems/goap), [drama](/systems/drama), [combat](/systems/combat), and the
[economy](/systems/economy), so more of who a person *is* ripples into what they *do*. See
[Not a spreadsheet](#not-a-spreadsheet).

## Related

- How traits gate goals: [GOAP](/systems/goap)
- Where traits come from at birth: [Historian](/systems/historian)
- When thresholds turn into events: [Drama](/systems/drama)
