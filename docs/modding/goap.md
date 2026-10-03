# GOAP: Goals & Actions

This is how you make an entity *do* things. You define **goals** (states the entity wants) and **actions** (atomic
steps it can take). The planner chains actions to reach goals on its own. Read the
[GOAP system page](/systems/goap) first for how selection works; this page is the authoring format.

## Goals

A goal is a desired world state with a priority. The planner tries to make the `desiredState` true.

```json
{
  "name": "WANDER",
  "displayName": "Wandering",
  "description": "Drifts through the area when nothing else needs attention.",
  "internal": true,
  "basePriority": 0.01,
  "desiredState": {
    "IsWandering": { "label": "Wandering", "equals": true }
  },
  "metadata": {
    "CompletionDuration": 5.0,
    "CompletionDurationVariance": 3.0
  }
}
```

### Goal fields

| Field | Meaning |
| --- | --- |
| `name` | Unique goal id, used in planning and the priority panel. |
| `displayName` | Shown in UI. |
| `description` | Player-facing explanation. |
| `basePriority` | Starting weight before calculators and player adjustment. |
| `desiredState` | The condition the planner tries to satisfy. |
| `metadata` | Presentation and timing (animations, completion pause). |

### Goal visibility flags

| Flag | Effect |
| --- | --- |
| `internal: true` | Hidden from the player's goal-priority panel. Use for background goals and [drama](/systems/drama) goals so the player cannot switch them off. |
| `system: true` | A system goal that outranks player goals (FIGHT, FLEE). Fires automatically when its state is met. |

> [!IMPORTANT]
> Player-tunable priority belongs on the goal's weight calculator, not inside `desiredState`. Changing a desired
> state can make a goal unreachable. See [priority math](/systems/goap#priority-math).

### desiredState operators

| Operator | Meaning |
| --- | --- |
| `equals` | The property must equal this value. |
| `min` | The property must be at least this value. |
| `max` | The property must be at most this value. |

## Actions

An action is one atomic step. It declares what must be true to run (`preconditions`), what becomes true when it
succeeds (`postconditions`), a `cost`, and the `behaviorName` that runs it.

```json
{
  "name": "DO_WANDER",
  "preconditions": {},
  "postconditions": { "IsWandering": true },
  "cost": 1,
  "behaviorName": "street_bum_DO_WANDER",
  "metadata": {
    "ExecutionAnimation": "walk_down",
    "ExecutionDuration": 1.0,
    "CompletionAnimation": "idle_down"
  }
}
```

### Action fields

| Field | Meaning |
| --- | --- |
| `name` | Unique action id. |
| `preconditions` | State that must hold for the action to be eligible. |
| `postconditions` | State the action sets when it succeeds (its effect). |
| `cost` | Planning cost. The planner prefers cheaper chains. |
| `behaviorName` | The behavior that executes. Reuse a built-in one or register your own. |
| `metadata` | Animation and `ExecutionDuration` (timed dwell). |

### Reuse built-in behaviors

The fastest mods reuse behaviors that already exist, so you write no code:

| behaviorName | Does |
| --- | --- |
| Generic movement | Walk to a target |
| Generic transaction | Exchange resources with another entity |
| Shared combat (flee, engage) | Standard combat steps |

A mod can also register its own named behavior in C#; see [Services & C# API](/modding/services-api).

## Actions apply their own effects

When an action succeeds, its `postconditions` are applied automatically. **Do not** also write the same change by
hand inside the behavior, or the effect applies twice. Declare the effect in `postconditions` and let the framework
apply it. Direct writes are only for things an action cannot express, like a cross-entity signal.

## Movement targets

To make an action walk the pawn to another entity, add a `movementTarget` block. The framework handles pathfinding
and target locking:

```json
{
  "name": "FIND_BUYER",
  "preconditions": {},
  "postconditions": { "AtBuyer": true },
  "cost": 1,
  "behaviorName": "GENERIC_MOVEMENT",
  "movementTarget": {
    "entityType": "Addict",
    "selection": "nearest",
    "filterProperty": "WantsToBuy",
    "filterValue": true,
    "stopDistance": 55
  }
}
```

| movementTarget field | Meaning |
| --- | --- |
| `entityType` | Type to walk toward. |
| `selection` | How to pick among candidates (for example `nearest`). |
| `filterProperty` / `filterValue` | Only consider targets matching this. |
| `stopDistance` | How close to get before arriving. |

## Cross-entity handshakes

When two entities transact (a dealer hands off to a buyer), one side signals the other by setting a property on it.
The passive side watches that flag, consumes it, and completes. Always clear such flags at the start of a new cycle
so a stale signal does not complete the next run instantly.

## Putting it together

| You define | The planner does |
| --- | --- |
| A goal with a `desiredState` | Finds actions whose postconditions reach it |
| Actions with pre/postconditions | Chains them cheapest-first |
| `behaviorName` per action | Runs the behavior until it returns success |

## Next

- Define the entity that carries these: [Entities & Identities](/modding/entities)
- Write a custom behavior or service: [Services & C# API](/modding/services-api)
