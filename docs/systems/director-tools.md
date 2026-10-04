# Director Tools: Tuning, Presets & Debug

The [Director](/systems/director) is built to be tuned, saved, and stress-tested. This page is the playtester and
tuner workflow: how to snapshot and share difficulty settings, and how to force events on demand in a debug build.

## Difficulty presets (export and import)

A **preset** is a complete snapshot of the Director's tuning: threat weights, thresholds, cooldowns, adaptation, and
phase settings, saved as a single file. Presets let a tuning session move fast and let you share a feel with someone
else.

| Action | What it does |
| --- | --- |
| Save preset | Writes the current Director config to a named preset file |
| Load preset | Applies a saved preset to the live Director immediately |
| Switch | Jump between presets to compare how a run feels |
| Delete | Remove a preset you no longer want |

Under the hood a preset is just the Director config **exported to JSON** and later **imported** back. That means a
preset is portable: hand the file to another playtester and they load the exact same difficulty.

| Term | Meaning |
| --- | --- |
| Export | Serialize the current Director settings to a JSON file you can keep or send |
| Import | Load a settings JSON back into the Director, replacing the current tuning |
| Preset store | Named presets are kept together so you can list and switch between them during a session |

> [!TIP]
> Presets are the right way to run an A/B on difficulty. Save "calm" and "relentless" variants, switch between them
> across runs, and keep the one that feels right. One value at a time still applies: change little, label clearly.

### What is in a preset

| Group | Includes |
| --- | --- |
| Pressure | Threat weights, event threshold, cash normalize |
| Pacing | Global cooldown, per-type cooldowns, tick interval |
| Adaptation | Enabled, gain on survival, decay on loss, health range |
| Events | Event weights and time-of-day multipliers |

The [phase schedule](/systems/director#campaign-progression-honeymoon-to-kingpin) and
[feature flags](/systems/director#feature-flags) are separate data files; a preset captures the Director's scoring and
pacing, which is what most tuning touches.

## Debug: forcing Director events

In a debug build you can **fire any Director event on command** instead of waiting for pressure to build. This is how
you test a specific event (a raid, a rival hit, a sweep) in seconds.

| You pick | The Director does |
| --- | --- |
| An event type (for example a SWAT raid or a rival attack) | Forms the squad, assigns roles, and fires the mission immediately |
| Optionally, a target or squad | Uses them; otherwise it auto-picks a valid target of the right type |

Forcing an event **bypasses the threat score and cooldowns**, so you can reproduce a scenario on demand. Any event in
the [event catalog](/systems/director#the-event-catalog) can be forced by its id. If no valid target exists for that
event type, the force is safely aborted rather than crashing.

> [!NOTE]
> Debug event firing is a testing control. In a normal build the Director fires events only through its
> [threat score](/systems/director#the-threat-score) and phase schedule.

## TimeTravel (internal tool)

**TimeTravel** is an internal development tool for jumping straight to a complex game state without playing hours to
get there. It seeds a scenario (owned safe houses, high heat, a deal in progress, a raid building, pawns with
specific cash and traits) and then hands control to the normal game: real UI, real GOAP, real Director, real heat and
raids, from a pre-authored starting point.

| Property | Value |
| --- | --- |
| Purpose | Reach a specific gameplay moment instantly for interactive testing |
| Scenarios | Data files, not code branches |
| Availability | **Dev-only.** It is hidden and not part of normal player or playtester builds. |

It is called out here so the term is not a mystery, but it is a developer tool. Scenario authoring is internal and is
not part of this public wiki. Playtesters use the [presets](#difficulty-presets-export-and-import) and
[debug event firing](#debug-forcing-director-events) above, not TimeTravel.

## Related

- The system these tools shape: [The Director](/systems/director)
- The full config key list: [Economy Config](/modding/economy-config#the-director)
- The pressure these events add to: [Heat](/systems/heat), [Investigations](/systems/investigations)
