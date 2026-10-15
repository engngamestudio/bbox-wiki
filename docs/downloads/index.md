# Downloads & Starter Kits

Templates and tools to start modding fast. Everything here is data-driven and needs no engine build.

> [!NOTE]
> The wiki and these kits go public with the playtest. Direct download links below activate when the repository is
> public. The files themselves live in the wiki repository under `starter-kits/`.

## Starter kits

| Kit | What it is | Best for |
| --- | --- | --- |
| **StreetBum example mod** | A complete, runnable folder mod: a wandering NPC that flees and fights. | Learning the [folder layout](/modding/mod-structure) by reading a working mod. |
| **Create-mod template script** | Scaffolds a fresh mod folder in one command. | Starting a new mod from a working baseline. See [Create-Mod Scripts](/modding/create-mod-scripts). |

### StreetBum example

A full mod you can read and run. It demonstrates:

- `mod.json` with dependencies and content file lists
- An entity with `propertySchemas` and sample `instances`
- Goals (`WANDER`, `FLEE`, `FIGHT`) and the actions that satisfy them
- The `Assets/` folders for heads, weapons, and names

Drop the folder into the game's `Mods/` directory and launch. Then edit it into your own mod.

### Create-mod template script

A standalone, path-agnostic script that generates a ready-to-run mod:

```bash
./create_mod_template.sh MyMod --author "YourName"
```

See full options and the generated layout on the [Create-Mod Scripts](/modding/create-mod-scripts) page.

## Asset packs

Art and audio reskins are made in-game with the [Asset Studio](/modding/asset-studio) and shared as `.zip` packs.
A gallery of community asset packs will live here once the playtest is running.

| Pack | Author | Contents |
| --- | --- | --- |
| _Coming with the playtest_ | - | - |

## How to install a mod

| Mod type | Install |
| --- | --- |
| Folder mod | Place the folder in the game's `Mods/` directory, then launch or reload. |
| Asset pack (`.zip`) | Open the [Asset Studio](/modding/asset-studio) and use Import Pack. |

## Share your mod

Once the playtest is live, this page will collect community templates and packs. If you build something, the
intended channels for sharing (repository templates, pack `.zip` files) will be listed here.

## Next

- [Modding Overview](/modding/) for the full picture
- [Quickstart](/modding/quickstart) to build your first mod in 15 minutes
