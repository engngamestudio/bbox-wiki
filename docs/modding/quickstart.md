# Quickstart (15 minutes)

This walks you through a minimal JSON-only mod: a new entity that exists in the world and can act. No code, no
compiler.

> [!TIP]
> The fastest path is to copy a [starter kit](/downloads/) and edit it. This page shows what the pieces are so the
> starter kit makes sense.

## 1. Make the folder

A mod is just a folder. Give it a clear name:

```
MyFirstMod/
  mod.json
  Entities/
    MyEntities.json
```

## 2. Write the manifest

`mod.json` tells the game what your mod is. The minimum:

```json
{
  "modId": "yourname.my_first_mod",
  "name": "My First Mod",
  "version": "0.1.0",
  "author": "yourname"
}
```

See every field in [Mod Structure & mod.json](/modding/mod-structure).

## 3. Add an entity

Entities are data. Here is a simple merchant who holds cash and stands in the world:

```json
{
  "entities": [
    {
      "AgentId": 5000,
      "Name": "Black Market Merchant",
      "Type": "Merchant",
      "Cash": 100000,
      "Properties": {
        "SellsIllegalGoods": true
      }
    }
  ]
}
```

At this point the merchant exists, holds state, and is saved with the world. It does not *do* anything yet, because
it has no goals.

## 4. Give it something to do

To make an entity act, give its type goals and actions, and reuse a built-in behavior so you do not write code.
This is the heart of Tier 1 modding:

```json
{
  "actions": [
    {
      "name": "SELL_ILLEGAL_GOODS",
      "behaviorName": "GENERIC_TRANSACTION",
      "preconditions": { "HasBuyer": true },
      "postconditions": { "MadeSale": true }
    }
  ]
}
```

`behaviorName` points at a behavior that already exists in the game, so the action works immediately. Full detail in
[GOAP: Goals & Actions](/modding/goap).

## 5. Reload and test

Thanks to hot reload, you do not restart the build loop:

| Step | Action |
| --- | --- |
| 1 | Save your JSON files |
| 2 | Reload the mod in-game |
| 3 | Watch your entity appear and act |
| 4 | Edit, reload, repeat (seconds per cycle) |

## What you just learned

| Piece | Role |
| --- | --- |
| `mod.json` | Declares the mod |
| An entity | A thing in the world with state |
| An action | An atomic step, backed by a behavior |
| A goal | A desired state that chains actions (next page) |
| A behavior | The code that runs an action, usually one you reuse |

## Next steps

- [Mod Structure & mod.json](/modding/mod-structure): the full folder layout and manifest.
- [GOAP: Goals & Actions](/modding/goap): make entities plan and chain behavior.
- [Entities & Identities](/modding/entities): new types, factions, and backstories.
