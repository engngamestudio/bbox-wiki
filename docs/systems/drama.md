# Drama & Emergent Events

Drama is the layer that turns trait numbers into character moments: a loyal soldier walks out, a stressed one
goes catatonic mid-job, a neglected crew starts to crack one by one. None of this is scripted. It all falls out
of [traits](/systems/traits) crossing thresholds and the systems reacting.

## What counts as drama

| Drama type | Triggered by | Deep dive |
| --- | --- | --- |
| **Defection / betrayal** | Loyalty collapses while Greed or Fear is high | [Betrayal](/systems/betrayal) |
| **Robbing the boss** | Greedy, morally flexible, disloyal and resentful all at once | [this page](#robbing-the-boss) |
| **Ratting to police** | Very low Loyalty with high Fear | [Betrayal](/systems/betrayal) |
| **Mental break (rage)** | High Aggression with high Stress | this page |
| **Catatonic breakdown** | High Depression with high Stress | this page |
| **Substance binge** | High Craving with high Stress | this page |
| **Refusing orders** | High Resentment with low Loyalty | this page |
| **Intimidating a random local** | High Aggression with moderate Stress | this page |
| **Inspiring the crew** | High Confidence with natural Leadership | this page |
| **Suicide** | Extreme Depression, Hopelessness and Stress together | this page |

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

## Robbing the boss

One of your own crew walking into your stash house and pocketing your cash is one of the sharpest betrayals in
the game, so it is deliberately **rare and specific**. It does not fire on a single bad trait. The member has to
be greedy, morally flexible, disloyal **and** resentful all at the same moment:

| Condition | Threshold |
| --- | --- |
| Greed | over 80 |
| Moral Flexibility | over 60 |
| Loyalty | under 30 |
| Resentment | over 50 |

All four have to hold together. Any one of them missing and he keeps working. Loyalty sits in a deliberate band:
below 20 he would just walk out (defection wins), so the 20-to-30 window is where he is disloyal enough to rob
you but not quite gone.

He also needs **something to steal**. The goal only activates when one of your stash houses actually holds cash;
an empty stash is not a target. The moment a stash is drained to zero it stops being a target on its own, so a
thief can never get stuck looting an empty room.

### He takes a cut, not everything

Pulling the job **cools his greed down**: a successful score drops his Greed back under the threshold that let
him act, so the goal switches itself off. He grabs one cut and backs off instead of emptying every property you
own, and because greed does not come roaring back on its own, it is a long time before he would consider it
again. The point is to make the theft a **moment you get to react to**, not a faucet that drains you dry while
you watch.

### What you do about it

The theft is a real loss: the money comes straight out of that stash house's balance and into his pocket, and an
event card names him so you cannot miss it. From there it is on you. Order a hit, let the rest of the crew deal
with him, cut him loose, or pay better and keep him. He made his move. Now you make yours.

> [!NOTE]
> None of this is a scripted "theft event." Every line above is a trait threshold or a world fact the planner
> reads. Change the numbers and you change who robs you and how often. See the
> [trait-gated goal table](/systems/traits#trait-gated-goals).

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
