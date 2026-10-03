# Services & C# API

Tier 1 gets you far with JSON alone. When you need custom logic, a mod can add C#: a **service** that runs your
rules and **behaviors** that execute your actions. This page covers the public modding surface. You build against
these hooks; you do not need the engine internals.

> [!NOTE]
> Most mods never need this page. Reach for C# only when a behavior you need does not exist and cannot be composed
> from built-in ones.

## Services

A service is a class that initializes with your mod and reacts to the world. The shape:

```csharp
public class BountyService : IEntityService
{
    public string EntityType => "BountyHunter";
    public string ServiceName => "Default";

    public void Initialize()
    {
        // Register behaviors, subscribe to events, set up state.
    }
}
```

| Member | Purpose |
| --- | --- |
| `EntityType` | The entity type this service is responsible for. |
| `ServiceName` | A name for the service (usually `Default`). |
| `Initialize()` | Called once at startup. Wire everything here. |

## Reading and writing state

Use the mod API to read entities and set properties. This is the supported way to touch world state from a mod:

```csharp
var entity = ModAPI.GetEntity(entityId);
double greed = Convert.ToDouble(entity.Properties.GetValueOrDefault("Greed") ?? 0.0);

ModAPI.SetProperty(entityId, "MarkedForBounty", true);
```

| Call | Does |
| --- | --- |
| `ModAPI.GetEntity(id)` | Get a read snapshot of an entity. |
| `ModAPI.SetProperty(id, key, value)` | Set a property. This is also how you signal another entity in a handshake. |

> [!IMPORTANT]
> Any property you write must be declared in the entity's [`propertySchemas`](/modding/entities#property-schemas).
> Undeclared keys are flagged by validation.

## Behaviors

A behavior is the code an action runs. It executes each tick while the action is active and returns a status:

```csharp
public ExecutionStatus Execute(Entity entity, ...)
{
    // Do work. Return one of:
    //   InProgress - keep going next tick
    //   Success    - done; declared postconditions are applied automatically
    //   Failed     - abort; planner replans
    return ExecutionStatus.Success;
}
```

Register your behavior under the `behaviorName` your action JSON references, so the planner can find it. See
[GOAP authoring](/modding/goap#actions).

| Return | Meaning |
| --- | --- |
| `InProgress` | Not finished; run again next tick. |
| `Success` | Finished; the action's `postconditions` are applied for you. |
| `Failed` | Could not complete; the pawn replans. |

> [!IMPORTANT]
> Do not re-apply an action's declared `postconditions` by hand inside the behavior. They are applied automatically
> on `Success`. Writing them again double-applies the effect. Direct `SetProperty` writes are only for effects the
> action cannot declare, such as signaling a different entity.

## Reacting to the world

Services can subscribe to world events to run logic at the right time:

| Event | Fires when | Typical use |
| --- | --- | --- |
| Game tick | Every tick | Timed logic, decay, cyclical needs. |
| Action completed | A pawn finishes an action | React to what just happened. |
| Goal completed | A pawn finishes a goal | Award, record, or chain consequences. |
| Entity spawned | A new entity enters the world | Register it with your service. |

A common pattern is a cyclical need: on a timer, flip an entity from satisfied to seeking, which makes its GOAP goal
activate. Always clear any cross-entity signal flags when a new cycle starts, so a stale flag does not complete the
next run instantly.

## Threading

You do not need to write thread-safe code for normal content work. Planning may run off the main thread, but your
behaviors and services apply **state changes on the main thread**, in order. Read, decide, and call
`ModAPI.SetProperty`; the framework handles the rest. See the [architecture note](/systems/architecture#threading-model-light).

## Don't hardcode tuning

Keep balance values in your mod's config files and read them at init, rather than baking constants into C#. This
lets players and other modders retune without recompiling, and matches how the base game is built. See
[Economy Config](/modding/economy-config).

## What stays internal

This API is the stable surface for mods. The engine internals behind it (how state is stored, how planning is
scheduled, the full service pipeline) are intentionally not part of the modding contract and are not documented
here. You can build deep, original systems on the surface above without them.
