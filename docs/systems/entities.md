# Entities

Every pawn in the world is an **entity type** with its own purpose and its own goal set. This page is the roster:
what each type is for, which [faction](/systems/territory#factions-and-ownership) side it sits on, and the goals it
can pursue with their base priorities.

Goal types are the same as everywhere: **Player** (assignable, usually base `0` until a calculator switches it on),
**System** (always active, outranks player goals), **Internal** (hidden background and [drama](/systems/drama)).
For how a goal's effective priority is computed, see [GOAP](/systems/goap).

## Your crew

### Gang Member

Your soldiers. The only pawns you give orders to, and even then only as [nudges](/systems/goap). They run the
whole business: dealing, laundering, extortion, debt, protection, and they break down or betray you based on
[traits](/systems/traits).

- **Goals:** 38 in total. See the complete [gang member goal reference](/systems/goap#gang-member-goal-reference).
- **Purpose:** execute your economy, hold territory, and generate emergent [drama](/systems/drama).

## The drug economy

### Drug Trafficker

Your **supply source**. Traffickers hold cocaine and sell it to your crew when a member runs a Buy Cocaine goal.
The [Director](/systems/director) refills them over time so killing them all does not permanently cut supply.

| Goal | Base | Type |
| --- | --- | --- |
| Sell Drugs | 75 | Player |
| Flee Scene | 70 | Internal (trait-gated) |
| Wander | 0.01 | Internal |

### Drug Addict

Street **demand**. Addicts seek a dealer and buy retail crack, which is your fattest margin. They are attracted by
Drug Corners and refilled by the Director. Also the target of a stressed member's Intimidate Random.

| Goal | Base | Type |
| --- | --- | --- |
| Get Drugs | 8 | Player (scaled by craving and time of day) |
| Flee | 8 | System |
| Wander | 0.01 | Internal |

### Distributor

The **wholesale buyer**. Distributors buy bulk cocaine from your crew (Sell Wholesale): thinner margin, far less
heat than retail.

| Goal | Base | Type |
| --- | --- | --- |
| Buy Wholesale | 8 | Player |
| Wander | 0.01 | Internal |

### Debtor

Someone who **owes you money**. The target of Collect Debt. Will try to avoid your collector.

| Goal | Base | Type |
| --- | --- | --- |
| Pay Debt | 6 | Player |
| Flee | 8 | System |
| Wander | 0.01 | Internal |

### Drug Corner

A placed **structure**, not a pawn. It marks turf and pulls addicts toward your territory so retail sales have
customers. See [Territory](/systems/territory).

## Law enforcement

### Police Officer

The law. Patrol weight and arrest aggression scale with [heat](/systems/heat#how-heat-changes-police-behavior).
Officers have their own [trait](/systems/traits)-gated dark turns (burnout, excessive force, planting evidence).

| Goal | Base | Type |
| --- | --- | --- |
| Mental Break, Rage | 90 | Internal (trait-gated) |
| Use Excessive Force | 80 | Internal (trait-gated) |
| Solve Cases | 75 | Player |
| Burnout | 70 | Internal (trait-gated) |
| Plant Evidence | 65 | Internal (trait-gated) |
| Maintain Order | 60 | Player |
| Patrol Beat | 50 | Player (scaled by heat and time of day) |
| Arrest Suspect | 13 | System |
| Fight | 12 | System |
| Execute Mission | 10 | Player |
| Wander | 0.01 | Internal |

### Corrupt Officer

A cop you can **buy**. Once bribed, becomes a recurring contact. The passive side of your crew's Bribe Officer and
Rat to Police goals.

| Goal | Base | Type |
| --- | --- | --- |
| Accept Bribe Payment | 12 | Internal |
| Wander | 0.01 | Internal |

## Rivals and threats

### Rival Gang Member

Enemy [faction](/systems/territory) crews who compete for turf and attack on [Director](/systems/director) events.
A greedy defector who leaves you can become one.

| Goal | Base | Type |
| --- | --- | --- |
| Fight | 12 | System |
| Execute Mission | 10 | Player |
| Sell Drugs | 2 | Player |
| Wander | 0.01 | Internal |

### Hitman

A contract killer. Mission-driven: appears to carry out a hit, then leaves.

| Goal | Base | Type |
| --- | --- | --- |
| Fight | 12 | System |
| Execute Mission | 10 | Player |
| Wander | 0.01 | Internal |

### Raid Agent

The squad behind an FBI or SWAT raid. Spawned by the [Director](/systems/director), targets your buildings.

| Goal | Base | Type |
| --- | --- | --- |
| Fight | 12 | System |
| Execute Mission | 10 | Player |
| Wander | 0.01 | Internal |

### Prisoner

An incarcerated pawn. Used for the prison plays described under [Combat](/systems/combat#arrests) and
[Betrayal](/systems/betrayal) (remove a rival or a talking informant quietly).

| Goal | Base | Type |
| --- | --- | --- |
| Fight | 12 | System |
| Execute Mission | 10 | Player |

## Civilians and recruits

### Civilian

Ambient city life. Mostly they make the streets feel alive, but they are also **witnesses** who report crime, and
**targets** for robbery and extortion.

| Goal | Base | Type |
| --- | --- | --- |
| Submit to Intimidation | 10 | System |
| Being Robbed | 9 | System |
| Flee | 8 | System |
| Wander | 0.01 | Internal |

### Street Criminal

A freelance criminal who can be **recruited into your crew**. This is also what a defector becomes when they walk,
which is how the re-recruitment loop in [Betrayal](/systems/betrayal#recruiting-a-defector-back) works.

| Goal | Base | Type |
| --- | --- | --- |
| Respond to Recruitment | 20 | Internal |
| Leave Town | 20 | System |
| Deal Solo | 18 | System |
| Rob Civilian | 15 | System |
| Wander | 1 | Internal |

## At a glance

| Entity | Side | One-line purpose |
| --- | --- | --- |
| Gang Member | You | Your crew; runs the business, makes the drama |
| Drug Trafficker | Economy | Supplies cocaine to your crew |
| Drug Addict | Economy | Retail demand for crack |
| Distributor | Economy | Wholesale buyer for bulk cocaine |
| Debtor | Economy | Owes you money |
| Police Officer | Law | Patrols, investigates, arrests |
| Corrupt Officer | Law | A cop you can buy |
| Rival Gang Member | Enemy | Competes for turf, attacks you |
| Hitman | Threat | Contract killer |
| Raid Agent | Threat | FBI or SWAT raid squad |
| Prisoner | Neutral | Incarcerated; prison plays |
| Civilian | Neutral | Ambient life, witnesses, targets |
| Street Criminal | Recruit | Freelancer you can recruit; what defectors become |

## Modding

Every entity above is defined in data: its properties, trait pools, and goals. To add a new type or change an
existing one, see [Entities & Identities](/modding/entities) and [GOAP: Goals & Actions](/modding/goap).
