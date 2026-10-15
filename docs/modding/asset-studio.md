# Asset Studio (Portraits, Weapons, Audio)

The **Asset Studio** is the in-game customization hub for swapping art and audio without touching any files by
hand. It is the no-code path to a custom look: drop in your own character heads, weapons, sound effects, voice
lines, music, and ambience, group them into a **pack**, and share that pack as a single file.

This is the easiest mod you can make. No JSON, no scripts.

## Opening it

Open the Asset Studio from the game's HUD. It is a full-screen panel with two parts:

| Area | Purpose |
| --- | --- |
| Left rail | Your list of packs, plus pack actions (new, delete, import, export). |
| Right panel | Tabbed asset categories for the active pack. |

## Packs

Everything you import belongs to a **pack**. A pack is a self-contained bundle of your assets that you can enable,
disable, export, and share as one unit.

| Action | What it does |
| --- | --- |
| New pack | Start an empty pack to fill with your assets. |
| Import pack | Load a pack from a `.zip` file (for example one a friend made). |
| Export pack | Save the active pack as a `.zip` to share or back up. |
| Delete pack | Remove a pack you no longer want. |

> [!TIP]
> Exporting to `.zip` is how packs are shared. Someone else imports your `.zip` and immediately has your assets. No
> file copying, no install steps.

## Categories

The right panel is organized into tabs, each holding related asset categories:

| Tab | Categories |
| --- | --- |
| Visuals | Pawn heads (portraits), weapons |
| Sounds | Combat sound effects, voice lines |
| Music & Ambience | Music tracks, ambient loops |

To add an asset, pick the category and import your file. The studio places it into the active pack under that
category. The category list is data-driven, so it can grow over time.

## Importing assets

| Step | Action |
| --- | --- |
| 1 | Select or create the pack you want to add to. |
| 2 | Choose the tab, then the category (for example Pawn Heads). |
| 3 | Import your file(s). |
| 4 | The asset joins the pack and is used in-game. |

## Art sizing guide

Your art is normalized by the game, but keeping source files near the intended size keeps memory use sensible.
Rough guidance for weapon sprites:

| Asset | Suggested source canvas | Notes |
| --- | --- | --- |
| Pawn head | Square, around 128x128 | Rendered small on the map. |
| Knife, handgun | 96x64 | Short weapons. |
| Bat, rifle, shotgun | 128x64 | Long weapons, the common case. |
| Oversized special weapon | Up to 160x80 | Reserve for genuinely large weapons. |

Avoid importing very large source images (for example 1500px-wide art). The game can scale them down, but the
oversized source still costs memory after loading.

## Names

Generated pawns pull from name pools. A pack-driven or mod-driven name list lets your characters have names that fit
their theme. In a folder-based mod this is a `names.json` with male and female pools; see
[Entities & Identities](/modding/entities).

## When to use the Asset Studio vs a folder mod

| Use the Asset Studio when | Use a [folder mod](/modding/mod-structure) when |
| --- | --- |
| You only want to reskin: art, audio, names | You want new entities, goals, actions, or tuning |
| You want a one-click shareable `.zip` | You want to change how the game behaves |
| You do not want to edit any files | You are comfortable editing JSON |

The two combine well: a folder mod adds a new entity type, and an asset pack gives it a custom look.

> [!NOTE]
> The exact set of categories and the import flow may expand. This wiki is the live reference; check back for new
> asset types.
