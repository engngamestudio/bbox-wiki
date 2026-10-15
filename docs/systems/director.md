# The Director

The Director is the game's pacing engine. It sits above the individual pawns and decides **when something should
happen to you**: a patrol, a raid, a rival hit. It is the storyteller that improvises the pressure of your run,
and it is fully data-driven and moddable.

## The threat score

Every `tickInterval` ticks, the Director computes a single **threat score** from your current situation:

```
threatScore =
    (gangMemberCash / cashNormalize)  x  cashWeight
  + (recent sales activity)           x  activityWeight
  + (ticks since last event)          x  pressureBuildup
  + random(0, jitterRange)            x  jitterFactor
```

When `threatScore > eventThreshold`, the Director picks an event from a weighted table, forms a squad, assigns
roles, and sends them on a mission.

### The four inputs

| Component | Measures | Default weight | Raise it to... |
| --- | --- | --- | --- |
| Cash | Total gang cash, normalized | `cashWeight: 0.4` | Punish wealth. Empire builders get heat faster. |
| Activity | Recent drug sales | `activityWeight: 0.3` | Punish active dealing. |
| Pressure | Time since the last event | `pressureBuildup: 0.3` | Make events inevitable even if you go quiet. |
| Jitter | Random noise | `jitterFactor: 0.1` | More unpredictability. |

### The key knobs

| Knob | Default (playtest) | Effect |
| --- | --- | --- |
| `eventThreshold` | 0.25 | Score needed to fire. Lower = more frequent. |
| `cashNormalize` | 3000 | Cash divisor. Lower = small money matters more. |
| `globalCooldownTicks` | 300 | Minimum ticks between any two events. |
| `tickInterval` | 100 | How often the Director evaluates. |
| `spawnOffsetRadius` | 800 | How far from the target a squad spawns. |

> [!NOTE]
> The playtest baseline lowers `eventThreshold` to 0.25 and `cashNormalize` to 3000 so the world feels alive
> early, before the drug economy is running. See the tuning scenarios below.

### Time of day

Every event's effective weight is `baseWeight x timeOfDayMultiplier`. Time of day matters as much as base weight.

| Period | Favors |
| --- | --- |
| Night | Rival attacks, ambushes, building damage |
| Day | Police sweeps, patrols, suspicious-activity sweeps, raids |

The game starts at night by default, so the opening hours lean toward rival pressure, not police.

## The event catalog

The Director has three kinds of spawn behavior:

| Spawn kind | Lifecycle | Player notified |
| --- | --- | --- |
| **Mission event** | Squad is created, does its job, despawns after a linger delay | Depends on event |
| **Ambient spawn** | Entity is permanent, no mission or timer (refills population) | Yes, with a HUD message |
| **Population seed** | Set at game start, refilled quietly if it drops | No |

### Threat events

| Event | Squad -> Target | Base weight | Per-type cooldown |
| --- | --- | --- | --- |
| rival_gang_attack | Rivals -> crew | 0.4 | 900 |
| rival_ambush | Rivals -> crew (spawn ahead of path) | 0.2 | - |
| rival_chase | Rivals -> crew | 0.15 | - |
| fbi_raid | Raid agents -> your building | 0.3 | 1800 |
| swat_raid | Raid agents -> your building | 0.25 | 1800 |
| police_sweep | Police -> crew | 0.3 | 600 |
| deploy_corrupt_officers | Corrupt cops -> crew | 0.3 | - |
| deploy_distributors | Distributor -> crew | 0.3 | - |
| deploy_debtors | Debtor -> crew | 0.25 | - |
| building_damage | Rivals -> your building | 0.15 | - |

### Ambient population events

| Event | Spawns | Cooldown | Why |
| --- | --- | --- | --- |
| spawn_trafficker | 1-2 traffickers at a random spot | 1200 | Refills drug supply. Traffickers feel like a resource. |
| spawn_addict | 1-3 addicts at a random spot | 800 | Refills demand. Recovers faster than supply. |

### Ambient police presence

| Event | Behavior | Cooldown |
| --- | --- | --- |
| street_patrol | 1-2 officers approach a member, no weapons, observe | 400 |
| suspicious_activity_sweep | 2-3 officers target the highest-Notoriety member | 700 |

### Player-triggered events

Events the player initiates (turf assault, hit a rival boss, etc.) have weight `0` (never fire on their own) and
cooldown `0` (fire immediately on command).

## Feature flags

Whole classes of events can be switched off in config:

| Flag | Disables |
| --- | --- |
| `ambient_population` | spawn_trafficker, spawn_addict (world stops refilling) |
| `ambient_police_presence` | street_patrol, suspicious_activity_sweep |
| `rival_gang_attacks` | all rival events |
| `police_raids` | fbi_raid, swat_raid, police_sweep |
| `police_arrests` | arrest and police-fight events |
| `corrupt_officers` | deploy_corrupt_officers |
| `distributors` | deploy_distributors |
| `debtors` | deploy_debtors |

## Campaign progression: honeymoon to kingpin

The Director does not hit a new player at full force. It follows a **phase schedule** keyed to the in-game day. Early
on you are invisible; over time the city, then the police, then the feds all come online. This is the ramp from
small-time to kingpin.

| Phase | Days | What is active | The feel |
| --- | --- | --- | --- |
| **Honeymoon** | 1 to 5 | Nothing. No rivals, no police, no feds. | A true grace period to get started and learn. |
| **Rising Heat** | 6 to 15 | Rivals start testing you; local police and SWAT come online. No FBI yet. | The city notices you. |
| **Open Market** | 16 to 30 | Rivals and local forces at full cadence; heavy events still cooled down to avoid a spike. FBI still held back. | Training wheels off. |
| **End-Game Warfare** | 31+ | Everything. Federal task force deploys alongside full rivals and police. All cooldowns at base. | Gloves off. The Director has full autonomy. |

Each phase sets [feature flags](#feature-flags) (which event classes are allowed) and can tighten
[per-type cooldowns](#the-knobs) for that window, then restore them on transition. Phases are evaluated in order, and
the schedule is a single data file; removing it disables phase gating entirely and lets the Director run unphased
from day one.

## Adaptive difficulty

On top of the fixed phase ramp, the Director can **adapt to how you are doing**. An adaptation level rises while your
crew survives and falls when you take losses. The tougher you look, the tougher the crews it sends.

| Knob | Default | Effect |
| --- | --- | --- |
| `enabled` | off | Whether adaptation runs at all |
| `gainOnSurvival` | 0.05 | How fast the level rises while you are healthy |
| `decayOnLoss` | 0.15 | How fast it falls when you take losses (falls faster than it rises) |
| `healthMin` / `healthMax` | 60 / 100 | The health range freshly spawned rivals are scaled into as the level climbs |

With adaptation on, a player who steamrolls early fights steadily tougher rivals; a player who is bleeding gets a
lighter touch. It is a rubber band, not a fixed slope.

## Tuning the difficulty

The whole pressure curve is data, so you (or a modder, or a playtester in a tuning session) can reshape it:

| Lever | Where | What it changes |
| --- | --- | --- |
| Threat weights and threshold | Director config block | How fast pressure builds and how high it must go to fire |
| Phase schedule | Phase schedule file | When each phase starts and what it unlocks |
| Adaptation | Director config block | Whether and how hard the Director rubber-bands to your performance |
| Feature flags | Config features block | Switch whole event classes on or off |
| Presets | Saved preset files | Snapshot a whole tuned config and share it (see [Director Tools](/systems/director-tools)) |

Full key list is in [Economy Config](/modding/economy-config#the-director). The playtester workflow for saving,
sharing, and debug-firing is on the [Director Tools](/systems/director-tools) page.

## Squad formation

When an event fires:

1. Query entities of the event's type.
2. Keep only those available (not paused, not already on a mission, healthy enough).
3. Pick the squad, nearest to the target, up to the event's squad size.
4. Assign roles from the event's role template.

Events with `spawnAtDestination` spawn the squad where the target is *walking to*, creating ambushes. This is a
general mechanism; any event can use it with no new code.

## Tuning recipes

| Problem | Fix |
| --- | --- |
| Too quiet, nothing happens | Lower `eventThreshold` to 0.15-0.20, lower `globalCooldownTicks` to 150, raise `pressureBuildup`. |
| Relentless and overwhelming | Raise `eventThreshold` to 0.4-0.6, raise `globalCooldownTicks` to 500-600, raise per-type cooldowns. |
| Rivals attack but no police | Confirm `police_raids` and `ambient_police_presence` are on; raise `police_sweep` weight; start at daytime. |
| Events fire but feel toothless | Raise squad `maxCount`, shorten mission TTL, reduce linger. |

## Relationship to the rest of the game

The Director does not touch traits directly. It creates missions, which cause actions, which move
[traits](/systems/traits) and raise [heat](/systems/heat). It is the pressure that makes the
[core loop](/guide/core-loop) turn.

## Modding

Director events are defined in a data file and tuned in config. See [Modding: economy and tuning](/modding/economy-config)
for where the knobs live and how to add an event.
