# Entities & Identities

An entity type defines a kind of pawn or object: its properties, how it looks, what traits it gets, and where its
instances start. This page is the authoring reference for entity files.

## Anatomy of an entity file

The top of an entity file declares the type and its presentation:

```json
{
  "entityType": "StreetBum",
  "displayName": "Street Bum",
  "icon": "🧍",
  "color": [0.6, 0.6, 0.6],
  "traitProfessions": ["Universal"],
  "pawnLayers": {
    "headsRoot": "Assets/Heads",
    "weaponSpritesRoot": "Assets/Weapons/Ranged"
  },
  "namesRoot": "Assets/Names/names.json"
}
```

| Field | Meaning |
| --- | --- |
| `entityType` | Unique type id, referenced by goals, actions, and spawns. |
| `displayName` | Shown in UI. |
| `icon`, `color` | Map and panel presentation. |
| `traitProfessions` | Which [trait](/systems/traits) pools this type draws from (for example Universal, Criminal, Law Enforcement). |
| `pawnLayers` | Where the entity's art lives. See [Asset Studio](/modding/asset-studio). |
| `namesRoot` | Name pool file for generated names. |

## Property schemas

`propertySchemas` declares every property an instance can carry, its type, and how it is edited. This drives both
the save system and the in-game editor.

```json
"propertySchemas": {
  "Cash": {
    "editable": "game",
    "type": "float",
    "min": 0,
    "displayName": "Cash ($)",
    "category": "Resources"
  },
  "Health": {
    "editable": "game",
    "type": "int",
    "min": 0, "max": 100,
    "displayName": "Health",
    "category": "Status"
  }
}
```

| Schema field | Meaning |
| --- | --- |
| `type` | `bool`, `int`, `float`, `string`, `enum`, `array`, `object`. |
| `editable` | `game` (editable in the editor), `never` (internal). |
| `min` / `max` | Numeric bounds. |
| `values` | Allowed values for an `enum`. |
| `displayName` / `category` | How it groups in the editor. |

> [!TIP]
> Any property a goal or action reads must exist in `propertySchemas`, or validation will flag it. If you add a new
> state key for a behavior, declare it here first.

## Trait startup caps

Limit how extreme generated traits start for this type:

```json
"traitStartupCaps": {
  "CorePersonality": 50,
  "MoralEthical": 50
}
```

This caps the starting values in those categories, so a freshly generated pawn of this type is not born at an
extreme. The [Historian](/systems/historian) then fills in a story-consistent spread under those caps.

## Instances

`instances` are the concrete pawns placed at game start, with their position and starting properties:

```json
"instances": [
  {
    "name": "Sample StreetBum A",
    "type": "StreetBum",
    "x": 3000.0,
    "y": 2000.0,
    "properties": {
      "Health": 100,
      "Cash": 5,
      "IsAlive": true,
      "GoalPriorities": { "WANDER": 1 }
    }
  }
]
```

> [!IMPORTANT]
> If a type spawns from a fixed `instances` list, **every instance** needs the full set of properties the type's
> goals and actions read. A new goal key added to the type must be added to every instance, or validation fails on
> the missing key. Types that spawn from a template do not have this constraint.

## GoalPriorities

An instance's `GoalPriorities` sets its starting goal weights. This is the same data the player's priority panel
edits at runtime. A value of `0` switches a (non-system) goal off for that pawn.

## Giving a type its own backstory

Entity identity is assembled from the type definition, the trait pools it draws from, and the
[Historian's](/systems/historian) Legends. To give a type a distinctive past, point it at the appropriate trait
professions and backstory pools. A deeper recipe for per-instance identities (an entity that is secretly something
else, a variant brain) is an advanced topic; the building blocks are trait pools, goal-set variants, and Legends.

## Factions

Rival crews, the cartel, and the police precinct are **factions**, defined in a factions file, not separate entity
types. One parameterized rival type covers all rival crews; the faction id carries their identity, home
[territory](/systems/territory), and hostility. Adding a faction is a data entry.

| Faction field | Meaning |
| --- | --- |
| Id | Unique faction id. |
| Starting sections | Home [territory](/systems/territory) this faction begins owning. |
| Aggression | How readily the Director sends them at you. |
| Player-controlled | Whether this faction is a player (supports more than one). |

## Next

- Make the entity act: [GOAP: Goals & Actions](/modding/goap)
- Give it art, names, and audio: [Asset Studio](/modding/asset-studio)
- Tune its economy: [Economy Config](/modding/economy-config)
