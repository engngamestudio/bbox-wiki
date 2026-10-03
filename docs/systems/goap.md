# GOAP: How Pawns Decide

Every pawn in the game is autonomous. It does not follow a script. Each tick it runs a planner that chooses a
goal and builds a plan of actions to reach it. This is **GOAP**: Goal-Oriented Action Planning.

This page explains how a goal is chosen and how its priority is calculated.

## The per-tick decision loop

Each tick, every pawn runs this sequence:

| Step | What happens |
| --- | --- |
| 1 | If the pawn is in a post-completion pause, count it down and stop. |
| 2 | Read current world state from the [immutable store](/systems/architecture#state-one-immutable-store). |
| 3 | Run sensors (they can write facts about the world onto the pawn). |
| 4 | Recalculate the priority of every goal (see [priority math](#priority-math)). |
| 5 | If the current goal is now satisfied, mark it achieved and pause briefly. |
| 6 | If there is no current goal or the plan is empty, replan. |
| 7 | Execute the first action in the plan. |

### Replanning (step 6)

```
filter eligible goals   = not achieved, not already satisfied, priority > 0
for each eligible goal   -> run the planner to find a valid action chain
pick the winner          = highest effective priority, ties broken by lowest plan cost
```

### Executing an action (step 7)

| Action returns | Planner does |
| --- | --- |
| `InProgress` | Keep the action, retry next tick. |
| `Success` | Remove it, check if the goal is now satisfied. |
| `Failed` | Clear the plan and goal, replan next tick. |

## Priority math

A goal's **effective priority** decides which goal wins. It starts from a base priority and is adjusted by
**weight calculators** that read the pawn's current state:

```
effectivePriority = basePriority  x  product(weight calculators)  x  situationMultipliers
```

- `basePriority` is the goal's declared starting weight.
- Each **weight calculator** multiplies that based on live state.
- A calculator returning `0` effectively disables the goal until conditions change.

### Weight calculator types

| Type | Reads | Typical use |
| --- | --- | --- |
| `property_multiplier` | A numeric property (Heat, Cash) | Scale a goal up as a value climbs. |
| `inventory_check` | A resource amount (Cocaine) | Want to restock only when low. |
| `proximity_threat` | Nearby hostiles | Raise evasion or combat goals when danger is close. |
| `trait_check` | A trait value against a cutoff | Binary gate: keep a goal at `0` until a trait crosses a threshold. |

### Player-adjustable priorities

Priorities the player can tune live on the **weight calculator**, flagged as player-adjustable. The player's
goal-priority panel slides these multipliers. Player adjustment never edits the goal's desired state, only its
weight, so a goal can be dialed down to near zero without ever becoming unreachable.

> [!NOTE]
> Player goals set to `0` on the priority panel are switched off. Internal drama goals are hidden from the panel
> so the player cannot accidentally disable them. See [Drama](/systems/drama).

## The layering rule

> **Traits change outcomes and unlock goals. Traits do not directly set GOAP priorities.**

This is the most important rule in the AI. If traits silently drove priorities, a pawn could get stuck wanting
something it can never do (a lock state). Instead:

- Traits shift the **results** of actions (how much, how well, with what side effects).
- Traits **unlock** new goals by crossing thresholds (a `trait_check` gate flips from `0` to active).
- The planner and the player's priorities still decide what gets attempted.

See the full threshold table in [Traits](/systems/traits#threshold-events).

## Sticky plans and interruption

While an action is `InProgress`, the pawn is committed. Priority changes and newly valid goals are ignored until
the action finishes, fails, or its preconditions break. This "sticky plan" behavior is intentional. Interrupts
are explicit, done two ways:

| Mechanism | How it works | Trade-off |
| --- | --- | --- |
| **Precondition invalidation** | A high-urgency condition (for example `PoliceApproaching`) is added as a negated precondition on interruptible actions. When it flips true, the action fails its check and the pawn replans. | No special code, but the plan aborts mid-step. |
| **Hard abort** | A system detects the condition, clears the pawn's plan, and cancels movement so it replans immediately. | Cleanest reaction, needs a bit of logic. |

## Actions apply their own effects

An action declares its effects as postconditions in data. When it succeeds, those effects are applied
automatically. Authors should **not** also write the same effect by hand inside the behavior, or it applies
twice. See [GOAP authoring](/modding/goap) for how to declare effects correctly.

## Related

- Author your own goals and actions: [Modding: GOAP](/modding/goap)
- What gates a goal on personality: [Traits](/systems/traits)
- What makes pawns act as coordinated squads: [Director](/systems/director)
