# Heat & Consequences

Heat is the game's memory of your crimes, tracked **per city section**. It rises when crime happens on a block and
decays when the block goes quiet. Heat is what pulls police toward you and feeds the [Director's](/systems/director)
pressure. On the map, the "Crime Rate" overlay is simply heat's display name.

## The model

| Property | Value |
| --- | --- |
| Scope | Per section (city block / zone), not per pawn |
| Range | 0.0 to 100.0 |
| Raised by | Crime events completing in that section |
| Lowered by | Passive decay over time |
| Reported through | A single crime-report entry point, so every crime raises heat consistently |

Each section also has a **static risk level** (0 to 100) set at worldgen. Risk level is the block's baseline
character and never changes. Heat is the dynamic value layered on top.

## What raises heat

| Crime event | Heat gain |
| --- | --- |
| Drug deal completed | +8 |
| Bribe completed | +3 |
| Witness intimidated | +4 |
| Arrest made | +5 |
| Police investigation | +2 |

Heat is capped at 100. These gains are config values, so mods can retune them.

## Initial seeding

Sections do not start cold. At game start each section seeds its heat from its risk level:

> **initial heat = risk level x 0.3**

So a gang-turf section with risk level 50 starts at heat 15. There is already implied prior activity.

## Decay

Heat decays every decay interval. The decay is exponential and scaled by the section's type, so rough areas stay
hot longer than quiet ones:

> **heat = heat - (heat x decayRate)** applied every decay interval, floored at 0

| Section type | Decay rate | Behavior |
| --- | --- | --- |
| Residential | 0.05 | Bounces back fastest |
| Commercial | 0.04 | Fast |
| Warehouse | 0.03 | Medium |
| Industrial | 0.025 | Slow |
| Drug trade | 0.02 | Stays hot longest |

Exponential decay means high heat falls fastest in absolute terms but lingers as it approaches zero.

## How heat changes police behavior

Police read the heat of the section they are in and shift their goal priorities accordingly:

| Police goal | Low heat (0-30) | Medium (31-65) | High (66-100) |
| --- | --- | --- | --- |
| Patrol beat | x1.5 | x1.0 | x0.5 |
| Investigate dealer | x0.5 | x1.0 | x2.0 |
| Maintain order | x1.0 | x1.2 | x1.5 |

The emergent result: quiet areas get routine patrols that keep them quiet; hot areas get reactive, aggressive
policing. Police also arrest on **weaker evidence** in high-heat sections (the suspicion threshold drops), so the
same behavior gets you busted faster on a hot block.

## How heat changes crew behavior

Crew members weigh the heat of a deal location before committing. Whether they avoid a hot block depends on their
own [traits](/systems/traits):

| Trait | Effect on risk tolerance |
| --- | --- |
| High Ruthlessness | Willing to work hotter blocks |
| High CurrentStress | Avoids hot blocks, wants to cool down |

A cautious, stressed member will route around a hot corner; a ruthless one will deal on it anyway.

## Heat as a player tool

Heat is a strategic layer you manage, not just a punishment:

- Spread work across blocks so no single section stays hot.
- Pull activity off a block and let it decay before police saturate it.
- Build cover (fronts, safe houses) where it helps, accepting that cheap property is often in hot areas.
- Choose to bribe instead of fight when a block is already hot.

## Relationship to the Director

Heat is local; the [Director's](/systems/director) threat score is global. Heat decides *where* police concentrate;
the Director decides *when* bigger events (raids, rival attacks) fire. Sustained high heat across your turf makes
both worse at once.

## Modding

Heat gains, decay rates, thresholds, and the avoidance cutoff are all config values. See
[Modding: economy and tuning](/modding/economy-config).
