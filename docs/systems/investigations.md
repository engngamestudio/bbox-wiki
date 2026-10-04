# Investigations, Cases & RICO

Information runs both ways. While you buy [intel](/systems/intelligence) on your crew, the law is building a case on
you. This page covers the pipeline that can end a run: **local investigations** on your buildings, and the
**federal RICO** case against your whole operation.

There are three distinct pressure tracks. Do not confuse them:

| Track | Scope | Measured as | Ends in |
| --- | --- | --- | --- |
| [Heat](/systems/heat) | A city section | 0 to 100 per section | Police attention, patrols |
| Investigation (case) | One of your buildings | Evidence 0 to 100 | A warrant, then a raid |
| RICO | Your entire organization | Exposure 0 to 100 | Federal prosecution and asset seizure |

## Open cases (local investigations)

An investigation targets a specific building of yours and accumulates **evidence** from 0 to 100.

| Evidence level | State | What it means |
| --- | --- | --- |
| Below 60 | Building | Early. Still killable and bribable. |
| 60 and up | Hot | The case is serious; cheap countermeasures lock out. |
| 90 and up | Warrant filed | A raid fires the **following week** unless you act. |

The time to a warrant is roughly `(90 - evidence) / weekly accumulation`, so a fast-earning hot building can go from
quiet to raided in a short span. Stored cash sitting in a building raises its evidence in tiers, which is why
cash left on-site is dangerous (and why a raid seizes stored cash). Time is measured in weeks (100 ticks each).

### Countermeasures

Each countermeasure needs a [source](/systems/intelligence#layer-1-sources-who-you-pay) that grants it, and most
only work in a specific evidence window:

| Countermeasure | Source | Effect | Works when |
| --- | --- | --- | --- |
| Bribe Witness | Beat Cop, Captain, Prosecutor | Pauses evidence collection for 3 weeks | Evidence below 60 |
| Hire Lawyer | Prosecutor | Files motions that remove up to 20 points of evidence | Evidence 20 to 70 |
| Kill Case | Mayor's Aide | Buries the investigation entirely | Evidence below 60 |
| District Protection | Police Captain | Stalls all investigations and blocks warrant execution in one district | While active (about 4 weeks) |

> [!WARNING]
> The cheap options lock out once a case is hot (60+). If you wait until a warrant is close, your only remaining
> plays are a lawyer (narrow window) or captain-level district protection. Act early.

### Passive protection from retainers

Keeping a source on retainer works your cases automatically every week, no clicks:

| Source on retainer | Passive effect on cases |
| --- | --- |
| Detective | Slows evidence accumulation 25% on all open cases |
| Prosecutor | Auto-delays a warrant by 2 weeks when it would fire |
| Mayor's Aide | Auto-kills one weak investigation per month (evidence below 50) |
| FBI Mole | Early raid warning so you have time to act |

## RICO (the federal case)

RICO is the slow, organization-wide case. Unlike a building investigation, it tracks your **whole operation** and
does not reset when you cool one block. Exposure climbs from 0 to 100; at **100 it triggers federal prosecution**.

### What raises RICO exposure

| Source of exposure | Weight |
| --- | --- |
| Each drug sale | +0.2 |
| Each raid on you | +5.0 |
| Paper trail: owning legit businesses while running illegal ops | Scales with the income mismatch |

The paper trail is the subtle one: the more clean businesses you own while your real income is dirty, the wider the
gap the feds can see. Laundering is necessary, but every front you run is also federal exposure building quietly in
the background.

### Federal prosecution and asset seizure

When RICO hits 100, prosecution fires and the feds **seize assets**. Two source retainers soften the blow by burying
the financial trail ahead of time:

| Source | Legit asset seizure reduced by |
| --- | --- |
| Prosecutor | 40% |
| FBI Mole | 20% |

### Keeping RICO down

RICO only falls if you are actively suppressing it. The relevant retainers:

| Source on retainer | Effect on RICO |
| --- | --- |
| Prosecutor | Exposure decays 0.5 per week |
| Mayor's Aide | Exposure decays 1.5 per week |
| Bookkeeper | Cuts paper-trail buildup 50% per week |

### Reading the RICO file

Only an [FBI Mole](/systems/intelligence#layer-1-sources-who-you-pay) can pull the accumulated RICO case file from
the federal database, so you can see how close prosecution is. Without that source, you are flying blind on your
own federal exposure.

## FBI financial crimes audits

Separate from RICO, the FBI's Financial Crimes unit audits your **laundering businesses**, accumulating financial
suspicion on each front. The **City Inspector** on retainer tips you off before an audit lands and slows that
suspicion by 50%, roughly doubling how long a front can run before it draws attention.

## How it all connects

| You do | It raises | Countered by |
| --- | --- | --- |
| Deal on a block | [Heat](/systems/heat) in that section, and RICO | Spread work, bribe, lay low |
| Keep cash and product in a building | Evidence on that building | Stash less on-site, bribe, lawyer |
| Run many legit fronts | RICO paper trail, financial suspicion | Bookkeeper, City Inspector |
| Get raided | RICO | Prosecutor / Mayor's Aide decay |

Heat pulls police toward you now; investigations put a specific building at risk soon; RICO is the long game that
ends the whole operation. A complete defense buys the right [sources](/systems/intelligence) for all three.

## Related

- Hiring the contacts that protect you: [Intelligence](/systems/intelligence)
- The section-level pressure that feeds it: [Heat](/systems/heat)
- Where seized cash comes from: [Economy](/systems/economy#where-money-is-lost)

## Modding

Investigation thresholds, RICO weights, and decay rates are config values. Source retainer effects live in the
source definitions. See [Economy Config](/modding/economy-config).
