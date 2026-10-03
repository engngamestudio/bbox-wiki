# Modding Overview

BBox: Kingpin is built to be modded. Most content is **flat JSON** with automatic data binding and hot reload, so a
basic mod takes minutes and needs no code. Deeper systems open up in C# when you want them.

This is the one section of the wiki where you will see code, because this is where code is the point.

## The three tiers

| Tier | Who | Effort | What you can make |
| --- | --- | --- | --- |
| **1. JSON only** | Most modders | Minutes to an hour | New entities, factions, items, traders, scenarios, tuning |
| **2. Simple C#** | Comfortable with C# | An hour or two | Custom services and mechanics reusing built-in behaviors |
| **3. Advanced C#** | Systems programmers | Days | Whole new subsystems (warfare, diplomacy, markets) |

You can go a very long way in Tier 1 alone, because entities, goals, and actions are all data.

## What you get for free

Every mod inherits the framework's infrastructure without writing any of it:

| Built-in | What it does |
| --- | --- |
| GOAP planner | Your entities plan and act automatically from the goals you give them |
| Sensors | Distance, detection, and resource awareness |
| Movement | Pathfinding and target locking |
| Events | Hooks on goal and action completion |
| State and save | Your entity state is stored and saved with the world |
| Hot reload | Edit JSON, reload, see the change, no compile |

## How a mod is loaded

A mod is a folder with a `mod.json` manifest and content files. At launch the game discovers mods, reads their
manifests, and merges their entities, goals, actions, and config into the world. See
[Mod Structure & mod.json](/modding/mod-structure).

## Where to start

| Goal | Page |
| --- | --- |
| Make something in 15 minutes | [Quickstart](/modding/quickstart) |
| Understand the folder layout | [Mod Structure & mod.json](/modding/mod-structure) |
| Give an entity goals and actions | [GOAP: Goals & Actions](/modding/goap) |
| Add a new entity type or faction | [Entities & Identities](/modding/entities) |
| Rebalance prices, heat, the Director | [Economy Config](/modding/economy-config) |
| Write custom C# logic | [Services & C# API](/modding/services-api) |
| Add portraits, weapons, audio | [Asset Studio](/modding/asset-studio) |
| Scaffold a mod from a template | [Create-Mod Scripts](/modding/create-mod-scripts) |

> [!TIP]
> Grab a ready-made template from [Downloads & Starter Kits](/downloads/) and edit it, rather than starting from an
> empty folder.

## A note on scope

This section documents the **modding surface**: the data formats and public hooks you build against. It is designed
to let you make deep, original content. It is not a teardown of the engine internals, and you do not need those
internals to build great mods.
