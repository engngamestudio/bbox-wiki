# Betrayal & Defection

Betrayal is the signature drama of BBox: Kingpin. A crew member you built up can turn on you, and when they do it
is because of who they became, not a script. This page covers the full lifecycle: what triggers a betrayal, the
flavors it takes, how it spreads, and how you can pull a defector back.

## What triggers it

Betrayal goals are [trait-gated](/systems/traits#trait-gated-goals). They sit dormant at priority 0 until a member's
personality crosses the line, then they compete like any other goal.

| Betrayal goal | Unlocks when |
| --- | --- |
| DEFECT | Loyalty < 20 and Greed > 70 |
| STEAL_FROM_CREW | Greed > 80 and Loyalty < 40 |
| RAT_TO_POLICE | Loyalty < 15 and Fear > 70 |

Loyalty is the master variable, and your treatment moves it directly. Underpay a member, lean on them, or let
another rat walk free, and Loyalty erodes until one of these gates opens. See
[the player relationship](/systems/traits#loyalty-and-the-player-relationship).

## The three flavors

A defection is not one-size-fits-all. The member's personality decides *how* they leave:

| Flavor | Driven by | What they do |
| --- | --- | --- |
| **Vengeful** | High aggression | Leaves and hunts you, becomes a hostile rival |
| **Done** | Low aggression, just finished | Walks away quietly and sets up on their own |
| **Greedy** | High greed | Mugs you on the way out, taking product and fronted cash |

A defector takes their [fronted dirty cash](/systems/economy#where-money-is-lost) with them and typically becomes a
rival gang member, which means the Director can later aim them back at you.

## Contagion and deterrence

Betrayal is social. How you *respond* to one rat changes the whole crew's loyalty. This is the most important
strategic lever in the system.

| Situation | Effect on remaining crew |
| --- | --- |
| A rat walks away **unpunished** | Loyalty drops across the crew (contagion) |
| A betrayal is met with **visible consequences** | Loyalty and resolve rise across the crew (deterrence) |

Contagion is **targeted by loyalty band**, so a neglected crew cascades while a cared-for crew barely reacts:

| Member's current loyalty | Contagion multiplier |
| --- | --- |
| Low band | 1.4x (hit hardest, already wavering) |
| Middle band | 1.0x |
| High band | 0.2x (loyal members shrug it off) |

The base contagion hit and the deterrence ripple are tuning values. Deterrence is the positive mirror of
contagion: punishing betrayal does not just remove one problem, it strengthens everyone who stayed.

## Recruiting a defector back

Defection is not always permanent. The recruit-back path is **symmetric** with defection: the same machinery that
let a member leave can bring them back into the fold, carrying their accumulated state with them. A former crew
member who went rival can, under the right conditions, be turned again.

> [!NOTE]
> Switching sides (defect, recruit, recruit back) preserves the pawn's live state: their cash, product, traits, and
> history ride along. They are the same person with a new allegiance, not a fresh spawn.

## Ratting and heat

A member who rats does more than leave. Informing routes through the same crime and [heat](/systems/heat) pipeline,
so a rat talking to police raises pressure on your operations. This is why pulling a hot, low-loyalty member off the
street before they flip is a real defensive play.

## How it surfaces to you

Betrayals raise an [event card](/systems/drama#event-cards) so the moment lands: the member's face, what they took,
and what they became. The warning signs were readable earlier if you paid for the intel: a life story shows the
conditions that make a person fold. See the [Historian](/systems/historian#grounding-making-motives-legible).

## Modding

All betrayal tuning (contagion base and bands, deterrence ripple, flavor thresholds) lives in a dedicated betrayal
config file loaded with the mod, not in the global game config. See
[Modding: economy and tuning](/modding/economy-config).

## Related

- The personality math behind the triggers: [Traits](/systems/traits)
- The wider emergent-event layer: [Drama](/systems/drama)
- Why you cannot just order a member to stay: [GOAP](/systems/goap)
