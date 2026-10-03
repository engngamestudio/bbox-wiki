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

The game is **mostly single-threaded by design**, with one deliberate exception: pawn AI planning can run off
the main thread so a large crowd of agents does not stall the frame. The rule is simple:

- **Planning** (deciding what to do) may happen on a worker.
- **State changes** are always applied back on the main thread, in order, against the immutable store.

This keeps the determinism and single-source-of-truth guarantees above while letting the AI scale. Modders do
not need to write thread-safe code for normal content work; the framework marshals results back for you.

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
