# The Historian

The Historian is the worldgen system that gives every pawn a **past**. Before the game starts, it writes each
crew member, cop, and rival a backstory. That backstory seeds their [traits](/systems/traits) and can plant the
relationships, feuds, debts, and secrets that make later drama feel earned rather than random.

The world has history before you ever touch it. Nothing in it starts as a blank slate.

## Where it fits

```
WORLDGEN (once, at game start)
   |
   v
HISTORIAN writes a backstory per pawn
   |  seeds trait values
   |  plants relationships / feuds / debts / secrets
   v
TRAITS start at story-consistent values  ---->  GOAP and DRAMA play out from there
```

The Historian runs **once**, at the start. After that, the living systems take over:
[traits](/systems/traits) shift from behavior, the [Director](/systems/director) applies pressure, and
[drama](/systems/drama) fires from thresholds. The Historian is the initial condition, not an ongoing engine.

## Legends

Backstories are built from **Legends**: reusable, data-defined life-story patterns. A Legend is a template like
"grew up in the trade," "ex-police," "burned by a former partner," or "owes a dangerous debt." Each Legend knows
how to stamp its consequences onto a pawn.

| A Legend can | Example result |
| --- | --- |
| Seed traits | A violent upbringing starts Aggression and Ruthlessness high. |
| Plant a relationship | Two pawns share a history, so one betrayal has a target. |
| Plant a grudge or debt | A pawn starts already owing someone, or already hating a rival. |
| Plant a secret | A pawn starts secretly connected to the police or a rival. |
| Force placement | Guarantee a specific backstory exists in the world for a scenario. |

Legends are built from a small set of **reusable effect patterns**, so new backstories are mostly data, not new
code. This keeps the library growing without growing the engine.

## Grounding: making motives legible

When the Historian plants something consequential (a feud, a betrayal motive), it also writes a matching entry on
the pawn's **visible timeline**. This is called *grounding*.

The point: when a crew member later turns on you, you can open their life story and see the reason was there all
along, not a dice roll. A planted motive without a visible cause would read as random. Grounding makes the drama
legible after the fact, which is the whole appeal of a generated history.

> [!TIP]
> This is also the gameplay hook behind buying intelligence. The information is really there in a pawn's
> generated past. Paying to read it is how you see a betrayal coming.

## The deeper fact system (optional)

There is a deeper layer that can bind facts across pawns into larger connected histories. It is **off by default**
because it is powerful enough to make worlds dense and interconnected in ways that need careful tuning. The base
game ships with the readable Legend layer on and the heavier fact binding reserved for scenarios and future work.

## For modders

The Historian is content-driven: new Legends and backstory patterns are added as data. A full authoring guide
lives in the modding section. See [Entities & Identities](/modding/entities) for how a pawn's identity is
assembled, and how to give an entity type its own backstory pool.

## Related

- What a backstory seeds: [Traits](/systems/traits)
- What those seeds turn into: [Drama](/systems/drama), [Betrayal](/systems/betrayal)
- Assembling pawn identities in a mod: [Entities & Identities](/modding/entities)
