# Real Estate & Assets

Property is how a street operation becomes an empire. Buildings are your **cover**, your **capacity**, your
**production**, and your **laundromat**. This page lists every asset type, what it does, what it costs, and how to
use it.

![A property panel: buying a building and assigning it a purpose.](/images/real-estate-property-panel.png)

*The property panel. Acquire a building, then convert it to a stash, lab, safe house, or legitimate front, each with
its own costs, income, heat, and evidence.*

Owning a property is two steps:

1. **Acquire** a building (buy it, or take it). This gets you the shell.
2. **Assign a purpose** (convert it to a stash, a lab, a front). This is what makes it useful.

## Building shells

The physical buildings on the [map](/systems/map) come in types, each with **tags** that decide which purposes it
can take. Some civilian buildings also generate legitimate NPC income before you ever touch them.

| Building | Tags | Where it is | Note |
| --- | --- | --- | --- |
| Small House | residential, small | Residential areas | - |
| Apartment Complex | residential, large | Residential areas | - |
| Corner Store | commercial, small | Commercial districts | NPC income ~$500/wk |
| Shopping Center | commercial, large | Commercial districts | NPC income ~$2,000/wk |
| Warehouse | industrial, large | Industrial / warehouse zones | - |
| Gang Hideout | gang | Gang turf | - |
| Cartel Facility | cartel | Cartel territory | - |
| Abandoned Building | abandoned, high risk | High-risk areas | Cheap, flexible for criminal use |

> [!TIP]
> Tags are what gate conversion. A drug lab needs an industrial or abandoned shell; a front business needs a
> commercial one; a crack lab squeezes into a residential building. Buy the right shell for the job.

## Purposes: what you convert a building into

There are two families of purpose: **criminal infrastructure** (capacity and production, high heat) and
**legitimate fronts** (clean income and laundering, low heat).

### Criminal infrastructure

| Purpose | What it does | Shells | Setup | Upkeep/wk | Heat | Evidence/wk |
| --- | --- | --- | --- | --- | --- | --- |
| Stash House | Stores cash off-books. Adds ~$50,000 cash storage. No income. | residential, abandoned | $5,000 | $200 | 0.3 | 3 |
| Drug Stash | Secure product storage. Adds ~200 product capacity, cuts carry risk on dealers. | industrial, abandoned, gang | $8,000 | $300 | 0.6 | 7 |
| Safe House | Crew hideout. Raises max gang headcount by 3. | residential, abandoned | $10,000 | $500 | 0.4 | 4 |
| Drug Lab | Production. Makes a ~100 batch of product each cycle. | industrial, abandoned | $25,000 | $800 | 0.9 | 15 |
| Crack Lab (Small) | Makeshift residential production, ~20 per cycle. Neighbors notice. | residential | $10,000 | $600 | 1.4 | 20 |
| Kingpin House | Your home base. Stores cash, drugs, and weapons. Cannot be sold. | residential, abandoned, gang | $0 | $0 | 0.1 | 1 |

> [!NOTE]
> Lab types are **data, not hard-wired systems**. The game already ships two (a cocaine Drug Lab and a small Crack
> Lab); another one, say a **meth lab**, is just a new purpose entry with its own batch size, setup cost, and heat.
> See the worked example in [adding content](/modding/economy-config#adding-content-new-drugs-labs-weapons).

### Legitimate fronts

Fronts earn **clean income**, **launder** dirty cash, appreciate in value, and run cold. Their catch is the federal
[paper trail](/systems/investigations#rico-the-federal-case): every clean business you run while dealing widens the
income gap the feds can see.

| Purpose | Clean income/wk | Launders/wk | Setup | Upkeep/wk | Heat | Evidence/wk |
| --- | --- | --- | --- | --- | --- | --- |
| Rental Property | $1,200 | $1,000 | $3,000 | $150 | 0.02 | 0 |
| Airbnb Rental | $1,800 | $2,000 | $8,000 | $300 | 0.08 | 1 |
| Car Wash | $2,000 | $8,000 | $12,000 | $400 | 0.15 | 1 |
| Restaurant | $3,000 | $6,000 | $18,000 | $500 | 0.10 | 1 |
| Hotel | $4,500 | $3,000 | $35,000 | $600 | 0.05 | 0 |

**Reading the fronts:**

- **Car Wash** launders the most ($8,000/wk) for the least outlay: the workhorse front.
- **Hotel** earns the most clean income and runs coldest, but costs the most to set up.
- **Rental Property** is the cheapest, safest, slowest money, with the lowest heat of anything.
- Each front has a **plausible weekly ceiling**. Pushing clean income above what the business could believably earn
  hurts its value and draws attention, so a small front can only wash so much before it looks wrong.

## How you pay: acquisition methods

How you acquire a property is a strategic choice between upfront cash and ongoing debt.

| Method | Price | Upfront | Weekly | Term | Catch |
| --- | --- | --- | --- | --- | --- |
| Cash Purchase | full | 100% | none | - | Highest cash barrier, but no debt drag and full ownership now |
| Distressed Deed | 45% of market | 100% | none | - | Below-market steal, but only derelict/fair buildings in gang or cartel turf |
| Front Man Mortgage | full | 20% | 3% / wk | 52 wks | Low entry, but needs clean cash and a $40k+ property in neutral or police areas; must pay off to sell |
| Hard Money Loan | 108% of market | 8% | 8% / wk | 26 wks | Cheapest entry, brutal weekly street tax, capped at $250k properties |

## Heat, evidence, and property value

Every purpose carries a **heat exposure** and an **evidence rate**, which feed the two pressure systems:

| Feeds | How |
| --- | --- |
| [Heat](/systems/heat) | A property's heat exposure adds to its section's heat over time. Labs run hot; rentals barely register. |
| [Investigations](/systems/investigations) | Evidence per week accrues toward a case on that building. A crack lab (20/wk) draws a warrant far faster than a hotel (0/wk). |

Market value then drifts weekly: it rises with legitimate income and neighborhood appreciation, and falls with
[heat](/systems/heat) and criminal use. Fronts appreciate; labs and stashes quietly lose value. Running a front
cleanly for a long stretch builds a value bonus. Stored cash and product in a building are also what a
[raid seizes](/systems/economy#where-money-is-lost), so a fat stash is both capacity and risk.

## How to use assets: strategy

| Goal | Build this | Why |
| --- | --- | --- |
| Protect your cash | Stash House | Cash on a person is exposed; stashed cash is secured capacity (but a raided stash loses what is stored). |
| Keep product off your dealers | Drug Stash | Cuts the carry risk your [crew](/systems/entities#gang-member) takes on the street. |
| Grow your crew | Safe House | Raises your headcount ceiling. |
| Make your own supply | Drug Lab | Produce product instead of buying from [traffickers](/systems/entities#drug-trafficker), at high heat. |
| Turn dirty money clean | Fronts (Car Wash, Restaurant, Hotel) | The only way to convert dirty cash to spendable clean cash. See [laundering](/systems/economy#laundering). |
| Stay invisible | Rental Property, Airbnb | Lowest heat and evidence; slow, safe income and cover. |

The whole portfolio is a balance: criminal assets give you capacity and product at the cost of heat and evidence;
legitimate fronts give you clean money and cover but build federal [RICO](/systems/investigations#rico-the-federal-case)
exposure. A durable empire runs both and watches both bills.

## Related

- Where properties live and how prices are set: [Map](/systems/map#real-estate-prices)
- Turning dirty cash clean: [Economy](/systems/economy#laundering)
- The cases your buildings attract: [Investigations & RICO](/systems/investigations)

## Modding

Building types, purposes (with all their costs, income, capacity, heat, and evidence), and acquisition methods are
data files. You can retune any number, add a new purpose, or define a new acquisition method without code. See
[Economy Config](/modding/economy-config).
