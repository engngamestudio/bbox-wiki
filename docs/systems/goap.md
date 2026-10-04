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

| Type | Reads | Effect |
| --- | --- | --- |
| `target_available` | Whether a matching target entity exists (with optional filter) | Hard gate to `0` when there is nothing to act on (no addict seeking a dealer, no debtor to collect). |
| `inventory_check` | A resource amount vs a threshold | Gate or scale by stock (`belowMultiplier` / `aboveMultiplier`). Buy when low, sell when high. |
| `property_multiplier` | A numeric property over an input range | Map a value (Heat, Cash) to an output multiplier range along a curve. |
| `proximity_threat` | Nearby tagged entities within a radius | Reduce priority per nearby threat (for example, back off deals with police close). |
| `time_of_day` | Day or night | Separate `dayMultiplier` and `nightMultiplier`. Most crime leans toward night. |
| `trait_check` | One or more trait conditions (op, value) | Binary gate: all conditions must pass or the goal stays at `0`. Used for [drama](/systems/drama). |
| `trait_multiplier` | A trait value over an input range | Scale smoothly by a trait (fear raising the urge to hunker down). |
| `string_nonempty` | Whether a string property is set | Active only when a target id is present (a Green Light order, a named rat). |

Calculators stack by multiplication, so a goal can be gated by one (`target_available`), scaled by another
(`property_multiplier` on heat), and shaped by time of day all at once.

### Player-adjustable priorities

Priorities the player can tune live on the **weight calculator**, flagged as player-adjustable. The player's
goal-priority panel slides these multipliers. Player adjustment never edits the goal's desired state, only its
weight, so a goal can be dialed down to near zero without ever becoming unreachable.

> [!NOTE]
> Player goals set to `0` on the priority panel are switched off. Internal drama goals are hidden from the panel
> so the player cannot accidentally disable them. See [Drama](/systems/drama).

## Gang member goal reference

The full goal set for a gang member: **38 goals**. This is the complete, current list with base priority, goal
type, and every weight calculator that shapes it. For a per-entity overview of all other pawns, see
[Entities](/systems/entities).

**Goal type legend:**

| Type | Meaning |
| --- | --- |
| Player | You rank it on the crew priority panel (see [Player controls](#player-controls)). A gang member has 16 of these. |
| Player order | Fired by a specific order you issue (a Green Light kill order), not the priority panel. |
| Mission | Carries out an assigned mission. Assigned by the [Director](/systems/director) or by a player-driven service. |
| System | Always active and outranks player goals. Driven by sensors (combat, arrest, fleeing). |
| Internal | Hidden from the player panel. Background behavior and [drama](/systems/drama). |

Most Player business goals start at base `0` on purpose: they stay dormant until there is something to act on, then
scale with heat, cash, stock, and time of day.

### Player controls

You influence a gang member two ways, both soft [nudges](/systems/economy#crew-commands-are-nudges):

| Control | Range | What it does |
| --- | --- | --- |
| Priority rank (crew panel) | 0 to 16 | Ranks each of the 16 Player goals. `0` switches a goal off; `1` to `16` is a relative ranking (the max equals the number of assignable goals). This sets the goal's base priority. |
| Cocaine Stockpile Cap (Buy Cocaine) | 0 to 5000 | Members stop buying once they hold this much. |
| Cocaine Reserve (Sell Wholesale) | 0 to 5000 | Members sell wholesale only above this amount. |

Only Buy Cocaine and Sell Wholesale have the extra amount sliders. Every other Player goal is controlled by its
priority rank alone.

### Business and economy

All are **Player** goals (ranked 0 to 16 on the crew panel). Buy Cocaine and Sell Wholesale also have amount
sliders, noted below.

| Goal | Base | Weight calculators |
| --- | --- | --- |
| Sell Drugs | 0 | `target_available` (addict seeking a dealer); `inventory_check` (hard gate, needs 50g+); `property_multiplier` (SectionHeat: fades above 70, near 0 at 100); `time_of_day` (night 1.5x) |
| Sell Wholesale | 0 | `target_available` (Distributor); `inventory_check` (sell above the Cocaine Reserve slider); `proximity_threat` (police 200); `time_of_day` (night 1.2x) |
| Buy Cocaine | 0 | `target_available` (Trafficker); `inventory_check` (buy below the Cocaine Stockpile Cap slider); `proximity_threat` (police 200); `time_of_day` (night 1.3x) |
| Pick Up Product | 0 | `target_available` (Lab with product) |
| Stash Product | 0 | `target_available` (Stash); `inventory_check` (only with 100g+ surplus); `time_of_day` (night 1.2x) |
| Pick Up From Stash | 0 | `target_available` (Stash with product); `inventory_check` (only if carrying under 50) |
| Deposit Cash | 0 | `target_available` (cash-deposit Stash); `property_multiplier` (needs ~$500+ on hand); `property_multiplier` (urgency rises to $20k); `time_of_day` (day 1.3x) |
| Collect Cash From Stash | 0 | `target_available` (Stash holding cash) |
| Collect Debt | 0 | `target_available` (collectible Debtor); `time_of_day` (night 1.3x) |
| Launder Money | 0 | `target_available` (Front); `property_multiplier` (Cash $2k-10k); `time_of_day` (day 1.4x, night 0.3x) |
| Collect Protection | 0 | `target_available` (Racket target); `proximity_threat` (police 250); `property_multiplier` (SectionHeat dampens, floor 0.25x); `time_of_day` (day 1.2x) |
| Extort Shop | 0 | `target_available` (Civilian shop); `proximity_threat` (police 200); `time_of_day` (day 1.3x) |

### Territory and risk management

| Goal | Base | Type | Weight calculators | Notes |
| --- | --- | --- | --- | --- |
| Guard Corner | 0 | Player | `property_multiplier` (SectionHeat 10-80 to 0-2x); `time_of_day` (night 1.4x) | More motivated as the block heats up. |
| Lay Low | 0 | Player | `property_multiplier` (HeatLevel 4-10 to 0-3x) | Only activates at heat 5 and up. |
| Hunker Down | 4 | Internal / System | `trait_multiplier` (Fear 25-80 to 0-2.5x); `trait_multiplier` (Confidence resists, high nerve ignores it) | A scared member wants off the street. |
| Threaten Witness | 0 | Player | (fires via plan/handshake when a witness exists) | Silences a civilian who reported. |
| Bribe Officer | 0 | Player | `target_available` (un-bribed corrupt officer); `property_multiplier` (HeatLevel 3-10 to 0-3x); `property_multiplier` (Cash $1k-10k); `time_of_day` (night 1.3x) | Needs ~$1,000 to be convincing. |

### Combat, arrest, and orders

These are mostly system goals that outrank anything the player assigns.

| Goal | Base | Type | Weight calculators | Notes |
| --- | --- | --- | --- | --- |
| Fight | 12 | System | (driven by combat engagement scores) | See [Combat](/systems/combat). |
| Surrender | 14 | System | - | Only with a cop actively arresting. |
| Evade Arrest | 16 | System | `trait_check` (Fear > 60) | Only a fearful member runs. |
| Resist Arrest | 18 | System | `trait_check` (Aggression > 70) | Only a hothead opens fire on police. |
| Execute Mission | 0 | Mission | `string_nonempty` style activation when a mission is assigned | Assigned by the [Director](/systems/director) or a player-driven service. |
| Green Light | 1 | Player order | `string_nonempty` (GreenLightTarget, 8x) | Fires when you issue a kill order on a target. |
| Hunt the Rat | 1 | Internal / System | `string_nonempty` (RatHuntTarget, 9x) | Active once a suspect is fingered. |
| Hunt the Badge | 1 | Internal / System | `string_nonempty` (VendettaCopTarget, 8x); `time_of_day` (night 1.4x) | A [Historian](/systems/historian)-seeded blood feud with a cop. |
| Cold Kill | 3 | Internal | `time_of_day` (night 1.6x) | Quiet work under cover of darkness. |

### Drama and breakdown

All [trait-gated](/systems/traits#trait-gated-goals) and [internal](/systems/drama). Base `0` unless noted; the
`trait_check` must pass before the goal competes at all.

| Goal | Base | Unlocks when (`trait_check`) | Also needs |
| --- | --- | --- | --- |
| Defect | 10 | Loyalty < 20 | - |
| Steal from Crew | 0 | Greed > 80 and Loyalty < 40 | A stash to steal from |
| Rat to Police | 0 | Loyalty < 15 and Fear > 70 | A cop to rat to |
| Refuse Orders | 0 | Resentment > 60 and Loyalty < 30 | - |
| Mental Break, Rage | 0 | Aggression > 70 and Stress > 80 | - |
| Intimidate Random | 0 | Aggression > 60 and Stress > 50 | Someone to intimidate |
| Kill Contact | 0 | Aggression > 85 and MoralFlexibility > 80 | - |
| Substance Binge | 0 | Cocaine craving > 75 and Stress > 60 | - |
| Catatonic Breakdown | 0 | Depression > 80 and Stress > 70 | - |
| End It All | 0 | Depression > 95 and Hopelessness > 90 and Stress > 85 | - |
| Inspire Crew | 0 | Confidence > 80 and Natural leadership > 60 | - |

### Idle

| Goal | Base | Type | Notes |
| --- | --- | --- | --- |
| Chillin' on Turf (Wander) | 0 | Internal | The floor behavior when nothing else is reachable. |

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
