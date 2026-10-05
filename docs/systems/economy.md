# Economy & Money Model

Money in BBox: Kingpin is not one number. It is **dirty or clean**, and it is held by **different parties**. Getting
this model right is the difference between a growing empire and a seized one. This page is the authoritative
reference for where cash lives and how it moves.

## The three pots of money

| Pot | Whose | State | Notes |
| --- | --- | --- | --- |
| **Player dirty cash** | Player | Dirty | Spendable on the business (property, loans, operations), but it is proceeds of crime. Laundering turns it into clean cash. |
| **Player clean cash** | Player | Clean | Fully legitimate money you can use freely and safely. |
| **Member fronted cash** | A crew member, given by you | Dirty | Dirty cash you handed a member; recovered via stash / collect / launder orders. |
| **Member wallet** | A crew member, their own | Theirs | The member's personal money. The player can never touch it. |

> [!IMPORTANT]
> A crew member's **wallet** is their personal money. You never take from it. When you "collect" from a member you
> are pulling back the **dirty cash you fronted them**, not their wages. Confusing the two is the most common
> misunderstanding of the economy.

## Laundering

Laundering converts a member's dirty fronted cash into player clean cash. It is **conserved**: every dollar removed
is accounted for across four buckets, nothing vanishes into thin air.

When you launder an `amount` of dirty cash from a member:

> **member cut = amount x memberCutRate** (goes to the member's wallet)
> **player clean cash += (amount - member cut) x launderEfficiency**
> **burned fee = the remainder** (the cost of washing it)
> **street heat += a heat exposure amount** (laundering is still a crime)

| Bucket | Default | Meaning |
| --- | --- | --- |
| Member cut | 5% of amount | The member's skim, lands in their wallet |
| Launder efficiency | 80% of the rest | Share that survives as clean cash |
| Burned fee | remainder | Lost to the laundering process |
| Street heat | heat exposure | Added to the section, see [Heat](/systems/heat) |

The four knobs (cut rate, efficiency, fee, heat exposure) are config values. The "Launder" button is a
[soft nudge](#crew-commands-are-nudges), not a guaranteed instant conversion.

## Where money is lost

Different bad endings hit different pots. This is the full loss matrix:

| Event | What happens to the member's cash |
| --- | --- |
| Member killed | Fronted dirty cash is **lost** (you are notified) |
| Member arrested | Fronted dirty cash is **frozen** while they are inside |
| Member defects | They **take the fronted cash with them** |
| Member flees combat | They **keep** the cash, you keep the member |
| Building raided | Only **stored cash** in that building is seized |

The takeaway: cash sitting on a person is exposed. Cash you have laundered into clean player funds is safe. Moving
money from dirty to clean, and off people into fronts, is risk management.

## The drug trade

The core earner. Product flows from a supplier down to the street, and the margin depends on how you sell it.

> [!NOTE]
> The trade currently centers on cocaine, cut to crack for retail. **Product types are data, not hard-wired.** Adding
> a new drug is a new field plus its prices and a place to make or buy it, not a new system. See the worked example
> in [adding content](/modding/economy-config#adding-content-new-drugs-labs-weapons).

### Supply chain

| Tier | Transaction | Amount | Price |
| --- | --- | --- | --- |
| Supplier to crew | Buy cocaine | 200g | $1000 |
| Crew to addict (retail) | Sell crack | 50g | $500 |
| Crew to distributor (wholesale) | Sell cocaine | 200g | $1400 |

### The margin choice

Buy 200g for **$1000**, then choose how to move it:

| Strategy | How | Revenue | Profit | Margin | Trade-off |
| --- | --- | --- | --- | --- | --- |
| **Retail** | Sell 4 x 50g at $500 | $2000 | $1000 | 100% | Fattest margin, most [heat](/systems/heat) |
| **Wholesale** | Sell 1 x 200g at $1400 | $1400 | $400 | 40% | Thinner margin, smaller footprint |

Street dealing pays double but lights up the block. Wholesale is quiet money. Your crew's
[traits](/systems/traits) push them toward one or the other: a ruthless, greedy member wants the corner; a cautious
one prefers moving weight quietly.

### Dynamic supply

Suppliers scale their stock to your crew automatically, so adding members does not starve the supply:

> **restock amount = gang member count x purchase size**
> **max inventory = gang member count x purchase size x buffer multiplier**

Change how much each member buys (the purchase-size goal value) and suppliers adjust with no manual retuning. Full
config in [Modding: economy config](/modding/economy-config).

## Other income

| Source | Nature | Heat profile |
| --- | --- | --- |
| Protection rackets | Steady recurring income | Keeps your name on the street |
| Debt collection | Lump sums from debtors | Intimidation raises heat |
| Extortion | One-off shakedowns | High heat, fast cash |
| Legit fronts | Slow, safe, and the cover that makes laundering work | Lowest heat |

## Crew commands are nudges

Order buttons like "launder," "collect," or "send crew" are **soft priority nudges**, not hard commands. They bump
a goal's priority for one member; they do not force an instant, guaranteed, targeted action. This is deliberate: you
do not directly control your crew, you influence them. See [GOAP](/systems/goap) for why.

## Modding

Prices, restock rates, caps, the laundering knobs, and income rates are all config values. See
[Modding: economy config](/modding/economy-config).
