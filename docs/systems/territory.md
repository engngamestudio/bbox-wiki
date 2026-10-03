# Territory

The map is divided into **sections**: named city blocks and zones. Each section has an owner, a type, and a risk
level. Territory is the board your crew and your rivals fight over, and it ties directly into
[heat](/systems/heat) and the [Director](/systems/director).

## Sections

A section is the atomic unit of the map. Every pawn is in exactly one at any time, and heat is tracked per section.

| Field | Meaning |
| --- | --- |
| Name | Human-readable block name |
| Owner | The controlling faction, or neutral |
| Section type | Residential, commercial, industrial, drug trade, warehouse, etc. |
| Risk level | Static baseline (0 to 100), seeds starting [heat](/systems/heat#initial-seeding) |

Section type drives several systems at once: it sets the [heat decay rate](/systems/heat#decay) and the baseline
character of the block.

## Factions and ownership

Territory is owned by **factions**, not individual types. Each faction starts controlling a set of sections. The
player is a faction too, as is each rival crew, the cartel, and the police precinct.

| Concept | Rule |
| --- | --- |
| Starting control | Each faction begins owning its home sections |
| Neutral ground | Sections no faction owns are contested space |
| One parameterized rival type | Rivals share one entity type, distinguished by faction, so new factions are pure data |

Hostility between factions is resolved through the [faction matrix](/systems/combat#who-is-hostile), so who fights
whom over turf follows the same rules as all combat.

## Rival corners

Each rival faction seeds a visible corner on the map at the start: a marker of their presence and a place their
dealing concentrates. These give rivals a foothold to defend and give you targets to push against.

## Taking and losing turf

Territory changes hands through **presence over time**, not a single action:

| Direction | How it happens |
| --- | --- |
| You take a section | Your crew establish and hold the only gang presence there, or a turf-assault order completes on it |
| A rival takes a section | A rival faction dwells in a neutral or bordering section long enough with no response from you |

The core capture rule: a section flips to a faction when that faction's pawns have been the sole gang presence there
for a sustained period. Contested sections (both sides present) do not flip; they become flashpoints.

> [!NOTE]
> Territory is an evolving system. The capture loop above is the baseline model. Expect the display and the depth
> of control effects to grow, which is one reason this wiki is the live source of truth.

## Why territory matters

| Holding turf gives you | Because |
| --- | --- |
| Safer places to work | You can route dealing to blocks you control and keep [heat](/systems/heat) manageable |
| Income footing | Rackets, corners, and fronts all sit on sections |
| A buffer | Owned sections between you and a rival slow their push |

And it costs you: held turf keeps your name on the street and draws the [Director's](/systems/director) territorial
events toward your borders.

## The Director and territory

The Director reads the map to make pressure feel territorial. It can pick a rival faction based on how aggressive
they are and whether they border you, then aim an attack at a crew member in or near that faction's turf, rather
than a random target. Rival pressure on a bordering section, left unanswered, becomes a capture.

## Modding

Sections and factions are defined in data: section templates (type, risk, owner) and a factions file (home sections,
aggression, player-controlled flag). Adding a rival faction is a data entry, not new code. See
[Entities & Identities](/modding/entities).
