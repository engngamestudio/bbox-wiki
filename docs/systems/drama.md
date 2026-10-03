# Drama & Emergent Events

Drama is the layer that turns trait numbers into character moments: a loyal soldier walks out, a stressed one
goes catatonic mid-job, a neglected crew starts to crack one by one. None of this is scripted. It all falls out
of [traits](/systems/traits) crossing thresholds and the systems reacting.

## What counts as drama

| Drama type | Triggered by | Deep dive |
| --- | --- | --- |
| **Defection / betrayal** | Loyalty collapses while Greed or Fear is high | [Betrayal](/systems/betrayal) |
| **Theft from the crew** | High Greed with low Loyalty | [Betrayal](/systems/betrayal) |
| **Ratting to police** | Very low Loyalty with high Fear | [Betrayal](/systems/betrayal) |
| **Mental break (rage)** | High Aggression with high Stress | this page |
| **Catatonic breakdown** | High Depression with high Stress | this page |
| **Substance binge** | High Craving with high Stress | this page |
| **Refusing orders** | High Resentment with low Loyalty | this page |

The exact cutoffs are in the [trait-gated goal table](/systems/traits#trait-gated-goals).

## How a drama event fires

Drama goals are ordinary GOAP goals with two special properties:

| Property | Effect |
| --- | --- |
| `trait_check` gate | The goal sits at priority `0` until the pawn's traits cross its threshold. |
| Hidden from the player panel | These goals are **internal**: they do not show on the goal-priority panel, so the player cannot accidentally switch them off. |

```
traits drift from behavior
      |
      v
threshold crossed  ->  trait_check gate flips the drama goal from 0 to active
      |
      v
drama goal now competes in GOAP  ->  wins when its priority is high enough
      |
      v
action executes  ->  EVENT CARD surfaces it to the player
```

> [!IMPORTANT]
> A drama goal has to actually win the GOAP contest to fire. A member one point over the betrayal threshold will
> not necessarily defect this minute; the goal becomes *possible*, then competes. This is why neglect builds for
> a while and then breaks all at once.

## Breakdowns

Stress is the master variable for breakdowns. It rises from dangerous and high-pressure actions and
[decays toward 30](/systems/traits#decay-rules) when the pawn is safe.

| Breakdown | Condition | What the player sees |
| --- | --- | --- |
| Rage | Aggression > 70 and Stress > 80 | The member lashes out, possibly at the wrong target. |
| Catatonic | Depression > 80 and Stress > 70 | The member freezes, unavailable when you need them. |
| Binge | Craving > 75 and Stress > 60 | The member disappears into using instead of working. |

The lesson for the player: **Stress is a resource you spend.** Overwork a crew and you convert them into
liabilities.

## Contagion

Drama spreads. A rat who walks away **unpunished** drops loyalty across the rest of the crew, weighted so that an
already-neglected crew cascades while a well-treated one shrugs it off. The mirror image also exists: visible
consequences for betrayal *raise* the surrounding crew's resolve. See
[Betrayal: contagion and deterrence](/systems/betrayal#contagion-and-deterrence).

## Event cards

Critical drama is surfaced through a reusable **event card**: a pop-up that names what happened and who, without
pausing the game. Betrayals, breakdowns, and other turning points raise one so the moment is not lost in the
simulation noise.

## Design intent

> Drama is a consequence, not a feature you toggle. Everything here is downstream of how you treat people and how
> hard you push them. The systems just make the bill arrive.

## Related

- The numbers behind the thresholds: [Traits](/systems/traits)
- The full betrayal lifecycle: [Betrayal](/systems/betrayal)
- Where the seeds are planted: [Historian](/systems/historian)
