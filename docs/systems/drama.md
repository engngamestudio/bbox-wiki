# Drama & Emergent Events

Drama is the layer that turns trait numbers into character moments: a loyal soldier walks out, a stressed one
goes catatonic mid-job, a neglected crew starts to crack one by one. None of this is scripted. It all falls out
of [traits](/systems/traits) crossing thresholds and the systems reacting.

## What counts as drama

Every beat is gated on traits crossing exact thresholds (all conditions in a row must hold at once). Higher
priority wins when a member qualifies for more than one. Numbers are first-pass and still being tuned.

| Drama beat | Fires when (all must hold) | Also needs | Priority |
| --- | --- | --- | --- |
| **Ratting to police** | Loyalty &lt; 15, Fear &gt; 70 | a corrupt-cop contact | 11 |
| **Mental break (rage)** | Aggression &gt; 70, Stress &gt; 80 | — | 11 |
| **Suicide** | Suicidal Ideation &gt; 85, Hopelessness &gt; 70 | — | 11 |
| **Defection / betrayal** | Loyalty &lt; 20 | — | 10 |
| **Catatonic breakdown** | Depression &gt; 80, Stress &gt; 70 | — | 9 |
| **Robbing the boss** | Greed &gt; 80, Moral Flexibility &gt; 60, Loyalty &lt; 30, Resentment &gt; 50 | a stash with cash | 8 |
| **Substance binge** | Cocaine Craving &gt; 75, Stress &gt; 60 | — | 8 |
| **Intimidating a local** | Aggression &gt; 60, Stress &gt; 50 | someone nearby | 8 |
| **Refusing orders** | Resentment &gt; 60, Loyalty &lt; 30 | — | 7 |
| **Inspiring the crew** | Confidence &gt; 80, natural Leadership &gt; 60 | — | 7 |

A few have a self-limit so they do not spam: **robbing the boss** cools the thief's greed below its own gate
after a score (one cut, then he backs off), and **defection / ratting** have their own lifecycle in
[Betrayal](/systems/betrayal). The exact cutoffs also live in the
[trait-gated goal table](/systems/traits#trait-gated-goals).

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

## When several could fire at once

A member who is stressed, disloyal and depressed all at once can qualify for more than one of these in the same
moment. Today the more severe beat wins by a fixed order of priority. For example, a member who could either
break down or walk out will walk out, because defection is the bigger turning point. That is deterministic and
easy to reason about, which is what you want while these systems are young.

As the trait and drama systems grow, a fixed ranking stops scaling and starts to feel mechanical, so the
groundwork is in for a **Drama Arbiter**. When several drama beats are genuinely close, it resolves them with a
weighted roll instead of a fixed order, so the same pressures do not always produce the same result. The roll is
seeded, so any single moment stays reproducible, but across a whole run the city surprises you. It stays bounded
on purpose: breakdowns have cooldowns, the gravest outcomes stay rare, and every result is still announced to
you. Unpredictable, not random. It is switched off while the deterministic version is being proven, and turns on
as the drama systems expand.

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
