# Create-Mod Scripts

The create-mod script scaffolds a complete, working entity mod in one command, so you start from a running example
instead of an empty folder. It is the fastest way to begin a [folder mod](/modding/mod-structure).

> [!NOTE]
> The scripts are being finalized for public release alongside the playtest. The usage below reflects the current
> template. Grab the packaged version from [Downloads & Starter Kits](/downloads/).

## What it generates

The script writes a full mod folder with everything wired up:

```
<ModName>/
  mod.json                      manifest, filled in
  Entities/<ModName>.json       entity type, schema, two sample instances
  Actions/<ModName>Actions.json DO_WANDER + shared flee/engage
  Goals/<ModName>Goals.json     WANDER (internal), FLEE + FIGHT (system)
  Assets/Heads/                 drop head sprites here
  Assets/Weapons/Ranged/        drop weapon sprites here
  Assets/Names/names.json       name pools
  README.md                     modder-facing notes
```

The generated mod **runs as-is**: a wandering NPC that flees and fights threats. You then edit it into whatever you
want.

> [!IMPORTANT]
> No C# is generated and no engine files are touched. The output is fully data-driven. Drop the folder into the
> game's `Mods/` directory and launch, no rebuild needed.

## Usage

```bash
./create_mod_template.sh <ModName> [options]
```

| Option | Default | Effect |
| --- | --- | --- |
| `--output <dir>` | `./Mods` | Parent directory to create `<ModName>/` in. |
| `--author <Name>` | `Community` | Author string written into `mod.json`. |
| `--description <Text>` | empty | Description written into `mod.json`. |
| `--core` | off | Use a `core.<name>` mod id instead of `community.<name>`. |
| `-h`, `--help` | - | Show help. |

### Example

```bash
./create_mod_template.sh StreetVendor \
  --author "YourName" \
  --description "A vendor who works the corners"
```

This creates `Mods/StreetVendor/` with a ready-to-run vendor NPC.

## After scaffolding

| Step | What to do | Reference |
| --- | --- | --- |
| 1 | Rename and retheme the entity | [Entities & Identities](/modding/entities) |
| 2 | Give it real goals and actions | [GOAP: Goals & Actions](/modding/goap) |
| 3 | Drop in art and audio | [Asset Studio](/modding/asset-studio) |
| 4 | Tune any numbers | [Economy Config](/modding/economy-config) |
| 5 | Reload in-game and iterate | hot reload |

## Two versions

| Script | Use |
| --- | --- |
| Standalone template | Path-agnostic, meant to be copied out and used next to your mods. This is the one shipped to modders. |
| In-repo version | Used by the development team inside the game's own source tree. |

For modding, use the standalone template from [Downloads & Starter Kits](/downloads/).
