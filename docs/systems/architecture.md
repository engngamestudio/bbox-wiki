# Architecture

A high-level map of how the simulation layers fit together. This page is conceptual. It explains the division
of responsibility, not the implementation.

## The three decision layers

The game separates decision making into three layers that run at different timescales. Keeping them separate is
what lets emergent stories happen without the simulation locking up.

| Layer | Timescale | Question it answers | Reference |
| --- | --- | --- | --- |
| **Director** | Slow (every `tickInterval`) | "Is it time for something to happen to the player?" | [Director](/systems/director) |
| **GOAP** | Fast (every tick, per pawn) | "What should this pawn do right now?" | [GOAP](/systems/goap) |
| **Traits** | Slow and cumulative | "Who is this pawn becoming?" | [Traits](/systems/traits) |

| From | To | Connection |
| --- | --- | --- |
| Director | GOAP | Forms missions and spawns squads for pawns to act on |
| GOAP | Traits | Executed actions shift trait values over time |
| Traits | GOAP | Thresholds unlock new goals, which feed back into planning |

## State: one immutable store

All simulation state lives in a single **immutable state store**. Every change produces a new state rather than
mutating the old one. The practical consequences:

| Property | Why it matters |
| --- | --- |
| Single source of truth | Every system reads the same consistent snapshot of the world each tick. |
| Deterministic reads | A pawn planning this tick sees a stable world, not one shifting mid-decision. |
| Clean save and load | The whole world is a serializable value. See [save and load](#save-and-load). |
| Safe observation | UI and systems react to state transitions without racing the simulation. |

## Threading model (light)

The game runs on **two main threads**:

| Thread | Rate | Owns |
| --- | --- | --- |
| Main (render) thread | Frame rate (about 60 fps) | Rendering, UI, and reacting to state changes for display |
| AI thread | Lower rate (a few times a second) | The pawn planning and behavior loop for the whole crowd |

Running the AI loop on its own thread, at a lower rate than rendering, is what lets a large crowd of agents think
without stalling the frame. The two threads share the one [immutable store](#state-one-immutable-store) as their
common source of truth, and hand work across through thread-safe channels: anything the UI must react to is marshaled
to the main thread so it never races the simulation.

For modders: your goals, actions, and behaviors run on the AI thread and read and write state through the provided
state API, so for normal content work you are not managing locks yourself. The one rule to remember is that touching
the UI must happen on the main thread. See [Services & C# API](/modding/services-api#threading).

## Data-driven by default

Almost everything that defines content is data, not code:

| Defined in data | Examples |
| --- | --- |
| Entities | crew, police, addicts, buildings |
| Goals and actions | what pawns can want and do |
| Economy knobs | prices, restock rates, caps |
| Director events | patrols, raids, rival attacks |
| Traits and their effects | personality values and threshold events |

This is why the game is deeply moddable with no compiler. See the [Modding Overview](/modding/).

## Save and load

Because the world is a single immutable value, a save is a serialized snapshot. In-flight planning handshakes
are treated as transient and stripped on save, so a mid-action save cannot reload into a broken state. Loading
re-validates and heals any missing keys. From a player or modder perspective: saving at any moment is safe.
