# Intelligence: Buying Information

You cannot read a crew member's mind or flip their loyalty. The only edge you get is **information**, and
information costs money. This is the system behind the game's core promise: *you can't control your people, you can
only pay to know them.*

![A crew member's dossier: the files you can buy and what they reveal.](/images/intelligence-dossier.png)

*A subject's dossier. You hire a source, then buy files on a specific person to reveal their record, profile, and
secrets before they cost you.*

Intelligence has **two layers**. Understanding the seam is the whole thing:

| Layer | What it is | You pay | Analogy |
| --- | --- | --- | --- |
| **Sources** | Contacts you hire (a detective, an FBI mole) | A one-time hire cost plus a weekly retainer | The channel |
| **Files** | Dossiers you buy on a specific person | A per-pawn fee, only if you hold a source that unlocks it | The product |

So reading a member's full federal dossier is: hire the **FBI Mole** once ($100,000 + $25,000/week), then pay
**$2,000** to pull the file on *that* person. The source is the pipe; the file is what flows through it.

## Layer 1: Sources (who you pay)

Sources are contacts you hire and keep on a weekly retainer. Each grants **capabilities**: the files it can pull and
the countermeasures it enables. Higher-access sources cost far more but reach deeper (local records to federal
databases). Each has a **reliability** (chance the intel is accurate) and an **unlock reputation** (how established
you must be before they will deal with you).

| Source | Hire | Retainer / wk | Reliability | Unlocks | Also does |
| --- | --- | --- | --- | --- | --- |
| Beat Cop | $1,000 | $500 | 80% | Witness tips, bribe witness | Retainer lowers heat across your districts weekly |
| Bookkeeper | $3,000 | $1,200 | 85% | - | Cuts paper-trail [RICO](/systems/investigations#rico-the-federal-case) buildup 50%/wk |
| Detective | $5,000 | $2,000 | 90% | Partial RAP sheet, witness tips | Retainer slows evidence on all open [cases](/systems/investigations) 25% |
| City Inspector | $10,000 | $3,500 | 90% | - | Tips you off before FBI financial audits; slows financial suspicion 50% |
| Police Captain | $15,000 | $5,000 | 85% | Witness tips, bribe | District protection: stalls investigations and delays warrants in one district |
| Prosecutor | $50,000 | $10,000 | 95% | Partial + Full RAP, lawyer | Buries the financial paper trail (RICO decays 0.5/wk); 40% less legit asset seizure |
| FBI Mole | $100,000 | $25,000 | 88% | Partial + Full RAP, Psych Profile, Full Dossier, RICO file | Early raid warning; 20% less asset seizure |
| Mayor's Aide | $200,000 | $30,000 | 98% | - | Kills weak investigations; RICO decays 1.5/wk |

> [!NOTE]
> Only the Detective, Prosecutor, and FBI Mole unlock **dossier files**. The others are
> [countermeasures](/systems/investigations#countermeasures) against cases and RICO, covered on the next page. The
> FBI Mole is the only source that reaches the full federal dossier and the RICO case file.

## Layer 2: Files (what you pay for)

Files are dossiers you buy **per person**. A file is only available if you hold a source with the required
capability. Price is per pawn, so a file on your under-boss costs the same as a file on a nobody: the value is in
*who* you read, not the fee.

| File | Price / pawn | Needs source | What it reveals |
| --- | --- | --- | --- |
| Partial RAP Sheet | $300 | Detective+ | Arrest and conviction counts, and the most recent charge only |
| Full RAP Sheet | $800 | Prosecutor+ | Adds prison time, every charge, and violent / drug / property / murder counts |
| Psychological Profile | $1,500 | FBI Mole | Risk scores, breaking points, archetype, vulnerabilities, predicted behavior, and how to exploit them |
| Full Dossier | $2,000 | FBI Mole | Everything above plus the full life-story timeline and known associates and debts |

### The ladder

The four files are a stepped upgrade path. Each tier adds to the one below:

| Step | File | Adds over the previous tier |
| --- | --- | --- |
| 1 | Partial RAP | The basic arrest record |
| 2 | Full RAP | Prison history, full charge list, crime-type counts |
| 3 | Psych Profile | The psychological read: risk, thresholds, vulnerabilities |
| 4 | Full Dossier | The life story and the web of associates |

## What a Full Dossier actually contains

The Full Dossier is the file that saves empires. Each section answers a different question:

| Section | What you learn |
| --- | --- |
| Criminal record | Arrests, convictions, prison months, and counts by crime type |
| Charge / custody history | The timeline of bookings, charges, prison, gang initiation, addiction start |
| Risk assessment | How dangerous and how volatile this person is |
| Threshold warnings | Which [trait thresholds](/systems/traits#threshold-events) they are close to crossing (defection, breakdown) |
| Archetype | The behavioral type they fit |
| Vulnerabilities | The levers that move them |
| Predicted behaviors | What the simulation expects them to do next |
| Recommendations | How to handle or exploit them |
| Life-story timeline | The [Historian](/systems/historian)-generated past: why they joined, old feuds, secret ambitions |
| Known associates and debts | Who they are tied to, and who they owe |

This is why the information is real, not flavor: the [Historian](/systems/historian) actually wrote this past at
worldgen, and a member's [traits](/systems/traits) actually sit where the profile says. Reading the file is how you
see a [betrayal](/systems/betrayal) coming before it costs you.

## Reliability

Each source has a reliability rating (80% to 98%). Higher-access, higher-cost sources are more accurate. Cheaper
contacts can be wrong, so intel from a beat cop is a lead, not gospel, while the Mayor's Aide is near-certain.

## Mole detection

The question some nights is simply: *is this man reporting to someone?* A member's secret ties (to police, the feds,
or a rival) live in their generated past and surface through the dossier's known-associates and the psychological
read. A low-loyalty, high-fear member is the [rat-to-police](/systems/betrayal) risk; the file is how you confirm it
before they talk.

## Where you use it

Intelligence is managed from the Investigations panel (your contacts, their retainers, and open cases) and the
per-pawn dossier cover, which shows what you already own, what is for sale, the source who sells it, a redacted
preview, and the price.

## Related

- The cases, warrants, and RICO your contacts protect you from: [Investigations & RICO](/systems/investigations)
- Where the life story comes from: [Historian](/systems/historian)
- What the thresholds mean: [Traits](/systems/traits)
- Why information is your only real control: [GOAP](/systems/goap)

## Modding

Sources, their capabilities and costs, and the dossier tiers are all data (`insider_types.json`,
`capabilities.json`, `dossier_tiers.json`). You can retune prices, add a source, or define a new file tier without
code. See [Economy Config](/modding/economy-config).
