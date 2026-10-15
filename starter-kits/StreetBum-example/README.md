# StreetBum

StreetBum - example community mod (wandering NPC). This is a fully data-driven
mod: no C#, no engine source edits, no rebuild required.

## How to install

Drop this entire `StreetBum/` folder into the game's `Mods/` directory (next
to the game executable, or at the project root when running from source) and
launch the game. That's it - the mod is discovered and loaded automatically.

## Folder structure

```
StreetBum/
├── mod.json                          - modId, dependencies, file lists
├── Entities/StreetBum.json           - entityType, pawnLayers, propertySchemas, instances
├── Actions/StreetBumActions.json     - GOAP actions (DO_WANDER, FLEE_FROM_THREAT, ENGAGE_THREAT)
├── Goals/StreetBumGoals.json         - GOAP goals (WANDER, FLEE, FIGHT)
├── Assets/Heads/                     - head sprites (.png + .png.import), any size/count
├── Assets/Weapons/Ranged/            - ranged weapon sprites shown when armed
└── Assets/Names/names.json           - male/female name pools for spawned pawns
```

Asset paths in `Entities/StreetBum.json` (`pawnLayers.headsRoot`,
`pawnLayers.weaponSpritesRoot`, `namesRoot`) are relative to this mod's own
folder, so the mod works no matter where `Mods/` lives on disk.

## How this mod loads

The game scans its built-in mods directory plus a `Mods/` folder next to the
executable for any directory containing a `mod.json`. Dropping this folder
into `Mods/` is enough for the entity, actions, and goals to be picked up
automatically at startup - no code changes, no rebuild.

## WANDER behavior - no C# needed

Any action whose `behaviorName` ends in `_DO_WANDER` (here,
`street_bum_DO_WANDER`) is automatically wired up to a generic wander
implementation by the engine. `FLEE_FROM_THREAT` and `ENGAGE_THREAT` are
shared, globally-registered behaviors available to every mod. Together these
cover wander/idle, flee, and basic combat with zero custom code.

## Adding content

- **Heads / weapons**: drop `.png` files into `Assets/Heads` and
  `Assets/Weapons/Ranged`.
- **Names**: edit `Assets/Names/names.json`.
- **More instances**: add entries to `Entities/StreetBum.json`'s
  `"instances"` array.
- **More goals/actions**: any goal/action that only needs `DO_WANDER`,
  `FLEE_FROM_THREAT`, or `ENGAGE_THREAT` behaviors works with no extra code.
  Custom behaviors beyond these require engine-side support and aren't
  available to data-only mods.
