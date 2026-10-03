# Mod Structure & mod.json

Every mod is a folder under the game's `Mods/` directory. The folder holds a `mod.json` manifest and content files
it points at. This page is the reference for that layout.

## Folder layout

A typical data-only mod, matching what the [create-mod scripts](/modding/create-mod-scripts) generate:

```
MyMod/
  mod.json                      manifest (required)
  Entities/
    MyMod.json                  entity type, schema, instances
  Actions/
    MyModActions.json           atomic actions
  Goals/
    MyModGoals.json             goals (desired states)
  Assets/
    Heads/                      head sprites (drop .png here)
    Weapons/Ranged/             weapon sprites
    Names/names.json            name pools
  README.md                     your notes
```

Only `mod.json` is strictly required. Everything else is referenced from it, so you include only the files you need.

## mod.json reference

A real manifest from the StreetBum example mod:

```json
{
  "modId": "community.street_bum",
  "name": "StreetBum",
  "version": "1.0.0",
  "author": "Community",
  "description": "Example community mod (a wandering NPC).",
  "isCoreContent": false,
  "dependencies": ["core.base_systems"],
  "priority": 100,
  "entities": ["Entities/StreetBum.json"],
  "actions": ["Actions/StreetBumActions.json"],
  "goals": ["Goals/StreetBumGoals.json"]
}
```

### Fields

| Field | Required | Meaning |
| --- | --- | --- |
| `modId` | Yes | Unique id. Convention: `author.mod_name` for community mods, `core.name` for base content. |
| `name` | Yes | Display name. |
| `version` | Yes | Your mod's version string. |
| `author` | Yes | Your name or handle. |
| `description` | No | One-line summary shown in the mod list. |
| `isCoreContent` | No | `false` for community mods. Leave it false. |
| `dependencies` | No | Other mod ids that must load first. Most mods depend on `core.base_systems`. |
| `priority` | No | Load order among mods. Higher loads later and can override earlier content. |
| `entities` | No | Paths to entity files. |
| `actions` | No | Paths to action files. |
| `goals` | No | Paths to goal files. |

> [!NOTE]
> Content files are **lists of paths**, relative to the mod folder. You can split content across multiple files
> (for example several entity files) and list them all.

## How loading works

| Step | What the game does |
| --- | --- |
| 1 | Discover every folder in `Mods/` that has a `mod.json`. |
| 2 | Resolve `dependencies` and sort by `priority`. |
| 3 | Load each mod's entities, actions, and goals, merging them into the world. |
| 4 | Later, higher-priority mods can override content with the same ids. |

## Overriding base content

To change a base entity or goal, declare content with the **same id** in a mod that loads after it (higher
`priority`, or a dependency on the base mod). This is how balance mods and total conversions work without editing the
original files.

## Hot reload

You do not need to restart the full build to see changes. Edit a JSON file, reload the mod in-game, and the change
applies. This is the core speed advantage of the data-driven design: iterate in seconds, not minutes.

## Next

- Give your entity behavior: [GOAP: Goals & Actions](/modding/goap)
- Define the entity itself: [Entities & Identities](/modding/entities)
- Scaffold all of this automatically: [Create-Mod Scripts](/modding/create-mod-scripts)
