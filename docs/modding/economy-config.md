# Economy Config & Tuning

Almost all balance is data. Prices, restock rates, heat gains, the Director, laundering, and betrayal tuning are
config values you can change and hot reload. This page maps the systems to their knobs. For the gameplay meaning of
each number, follow the links to the [systems](/systems/) pages.

> [!IMPORTANT]
> Game-specific tuning lives in the **mod's own config files**, loaded with the mod. Keep your tuning in your mod,
> not in framework-level config.

## Drug economy

The primary balance knobs for the drug trade.

```json
{
  "drugAddict": {
    "cashIncrementInterval": 20,
    "cashIncrementAmount": 50.0,
    "maxCash": 500.0,
    "crackDrainAmount": 5.0
  },
  "drugTrafficker": {
    "cocaineRestockInterval": 15,
    "bufferMultiplier": 10
  },
  "pricing": {
    "traffickingCocaineSaleAmount": 200.0,
    "traffickingCocainePrice": 1000.0,
    "retailCrackSaleAmount": 50.0,
    "retailCrackPrice": 500.0,
    "wholesaleCocaineSaleAmount": 200.0,
    "wholesaleCocainePrice": 1400.0
  }
}
```

| Key | Controls | System |
| --- | --- | --- |
| `drugAddict.cashIncrement*` | How fast addicts accumulate money to spend | [Economy](/systems/economy) |
| `drugTrafficker.cocaineRestockInterval` | How often suppliers restock | [Economy](/systems/economy#dynamic-supply) |
| `drugTrafficker.bufferMultiplier` | Supplier max inventory headroom | [Economy](/systems/economy#dynamic-supply) |
| `pricing.*` | Buy, retail, and wholesale amounts and prices | [Economy](/systems/economy#the-drug-trade) |

### Purchase size and dynamic supply

How much each crew member buys per trip is the `desiredState` value on their buy goal, not a price key. Suppliers
read it and scale stock automatically:

> **restock = member count x purchase size**, **max inventory = member count x purchase size x bufferMultiplier**

Change the buy goal's target and the whole supply chain adapts. See [Economy](/systems/economy#dynamic-supply).

## Heat

```json
{
  "decayIntervalTicks": 300,
  "decayRates": {
    "residential": 0.05,
    "commercial": 0.04,
    "industrial": 0.025,
    "drug_trade": 0.02
  },
  "eventHeatGain": {
    "HAND_OFF_DRUGS": 8,
    "APPREHEND_SUSPECT": 5,
    "INTIMIDATE_WITNESS": 4,
    "CONFIRM_BRIBE": 3,
    "INVESTIGATE_SCENE": 2
  },
  "gangAvoidanceThreshold": 70
}
```

| Key | Controls | System |
| --- | --- | --- |
| `eventHeatGain.*` | Heat added per crime | [Heat](/systems/heat#what-raises-heat) |
| `decayRates.*` | How fast each section type cools | [Heat](/systems/heat#decay) |
| `gangAvoidanceThreshold` | Heat level crew start avoiding | [Heat](/systems/heat#how-heat-changes-crew-behavior) |

## The Director

```json
{
  "director": {
    "enabled": true,
    "tickInterval": 100,
    "threatWeights": {
      "cashWeight": 0.4,
      "activityWeight": 0.3,
      "pressureBuildup": 0.3,
      "jitterFactor": 0.1
    },
    "cashNormalize": 3000,
    "eventThreshold": 0.25,
    "globalCooldownTicks": 300,
    "perTypeCooldownTicks": {
      "rival_gang_attack": 900,
      "fbi_raid": 1800,
      "police_sweep": 600
    }
  }
}
```

| Key | Controls | System |
| --- | --- | --- |
| `threatWeights.*` | The four inputs to the threat score | [Director](/systems/director#the-threat-score) |
| `eventThreshold` | How high the score must go to fire | [Director](/systems/director) |
| `cashNormalize` | How much small money matters | [Director](/systems/director) |
| `globalCooldownTicks` / `perTypeCooldownTicks` | Spacing between events | [Director](/systems/director) |

Adding a new Director event is a data entry in the events file (type, squad size, roles, weight, time-of-day
multiplier, cooldown, spawn mode). Feature flags toggle whole event classes; see the
[Director feature flags](/systems/director#feature-flags).

## Traits

Trait impacts, thresholds, and decay are defined in a trait-impact ruleset so you can retune who becomes what:

| What you can change | Effect |
| --- | --- |
| Action and goal impacts | How much each action moves each trait. See [Traits](/systems/traits#how-traits-change). |
| Thresholds | The cutoffs that unlock behaviors. See [threshold events](/systems/traits#threshold-events). |
| Decay | How fast situational traits return to baseline. |
| Contextual modifiers | Situation multipliers on trait changes. |

## Betrayal

Betrayal tuning lives in its own config file loaded with the mod:

| Knob | Controls | System |
| --- | --- | --- |
| Contagion base and bands | How far an unpunished rat drops crew loyalty | [Betrayal](/systems/betrayal#contagion-and-deterrence) |
| Deterrence ripple | How much visible punishment raises loyalty | [Betrayal](/systems/betrayal#contagion-and-deterrence) |
| Flavor thresholds | Vengeful vs done vs greedy defection | [Betrayal](/systems/betrayal#the-three-flavors) |

## Laundering

| Knob | Controls | System |
| --- | --- | --- |
| Member cut rate | Share that goes to the member's wallet | [Economy](/systems/economy#laundering) |
| Launder efficiency | Share that survives as clean cash | [Economy](/systems/economy#laundering) |
| Burn fee | What is lost to washing | [Economy](/systems/economy#laundering) |
| Heat exposure | Heat added per launder | [Economy](/systems/economy#laundering) |

## Adding content (new drugs, labs, weapons)

New product types, production buildings, and weapons are **data, not new systems**. Most additions are a field plus a
few config entries, which is why the game can grow its inventory without an engine change.

### A new lab (for example, a meth lab)

The game already ships a Drug Lab and a small Crack Lab as building purposes. A meth lab is just another purpose
entry with its own batch size, cost, and risk:

```json
{
  "purposeId": "meth_lab",
  "displayName": "Meth Lab",
  "symbol": "🧪",
  "description": "Production facility. Cooks a batch of product each cycle, runs hot.",
  "allowedBuildingTags": ["industrial", "abandoned"],
  "weeklyUpkeep": 900,
  "productionBatchAmount": 120,
  "productionBatchIntervalTicks": 240,
  "heatExposure": 1.0,
  "evidencePerWeek": 18,
  "setupCost": 28000,
  "marketValueModifier": -0.006
}
```

Drop that into the purposes data and it appears as a conversion option. No code. See
[Real Estate & Assets](/systems/real-estate) for what every field means.

### A new drug

A new product type is a handful of data edits, not a rewrite:

| Step | What you add |
| --- | --- |
| 1 | A product field on the entities that carry it (the same way Cocaine is a property) |
| 2 | Pricing entries (buy, retail, wholesale amounts and prices) in the economy config |
| 3 | A way to get it: a lab purpose that produces it, or a supplier that sells it |
| 4 | Optionally, buy and sell goals so crew trade it, mirroring the cocaine goals |

The systems that move money, raise [heat](/systems/heat), and build [cases](/systems/investigations) do not care
which product it is, so a new drug rides all of them for free.

### A new weapon

Weapons are data and art. A new one is a sprite plus an entry, and it slots into the existing combat scoring through
its weapon-quality value. See [Asset Studio](/modding/asset-studio) for importing the art and
[Combat](/systems/combat#what-goes-into-the-score) for how weapon quality factors in.

## Tuning workflow

| Step | Action |
| --- | --- |
| 1 | Edit the config value in your mod |
| 2 | Reload in-game (hot reload) |
| 3 | Observe behavior |
| 4 | Repeat |

Change one value at a time so you can tell what moved the result.
