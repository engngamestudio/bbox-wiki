# Combat

There is no manual shooting in BBox: Kingpin. When two hostiles meet, the simulation scores the situation for each
of them and they decide for themselves whether to **fight, flee, surrender, or make an arrest**. Your job is the
setup: who you send, on whose turf it happens, and who outnumbers whom. The AI plays out the fight.

> [!NOTE]
> You do not hand-pick a pawn's weapon yet. A pawn fights with what it carries, and weapon quality is one factor in
> the scoring below. Player-controlled loadout is a planned extension, not a current feature.

## Who is hostile

Hostility is **faction-based**. Each faction declares which other factions it is hostile to. Two pawns are enemies
if their factions are marked hostile to each other, not because of a hand-listed pair of types. This makes new
factions (including modded ones) slot into combat automatically.

## The decision, not a script

Combat choices are ordinary [GOAP goals](/systems/goap) (FIGHT, FLEE, SURRENDER, ARREST_SUSPECT) gated by weight
calculators. A sensor does the measuring and writes numeric **engagement scores**; GOAP makes the call.

| Step | What happens |
| --- | --- |
| 1 | A sensor scans for nearby hostiles. |
| 2 | For each threat, it scores Fight, Flee, Surrender, and Arrest. |
| 3 | Those scores are written to the pawn as properties. |
| 4 | Each combat goal's weight calculator reads its score; the highest effective priority wins. |
| 5 | With no threat nearby, all scores are 0, so combat goals stay at priority 0 and never fire. |

| Goal | Base priority | Driven by score | Available to |
| --- | --- | --- | --- |
| FIGHT | (high) | EngageFight | Crew, rivals, police |
| FLEE | 12.0 | EngageFlee | Crew, rivals |
| SURRENDER | 13.0 | EngageSurrender | Crew |
| ARREST_SUSPECT | 13.0 | EngageArrest | Police |

> [!NOTE]
> A pawn only surrenders when it is actually being arrested. The surrender goal can score highest, but the
> give-up action requires a cop to be arresting the pawn, so a cornered pawn with no cop present fights or flees
> instead.

## What goes into the score

The engagement score weighs the pawn's capability against the threat, the distance, and the balance of numbers.
Capability is a weighted blend of [traits](/systems/traits) and equipment:

| Factor | Example weight | Effect |
| --- | --- | --- |
| Weapon quality | 0.30 | Better guns hit harder and raise Fight |
| Combat skill | 0.25 | Skilled fighters favor and win fights |
| Aggression | 0.15 | Aggressive pawns lean toward Fight over Flee |
| Strength | 0.10 | Raw physical capability |

These weights are config values per entity type, so mods can define a "glass cannon" or a "coward with a shotgun"
by changing the blend. A high-skill, aggressive, well-armed pawn can realistically take on several weak enemies;
a low-skill pawn reads the same situation as a reason to run.

## Morale

A fight is not only the opening math. Morale shifts during the exchange and can turn a fight into a rout:

| Morale factor | Effect |
| --- | --- |
| Starting morale | Where the pawn begins |
| Ally killed | A penalty each time a friend goes down nearby |
| Outnumbered | A per-tick penalty once the enemy ratio passes a threshold |
| Rout threshold | When morale falls below this, the pawn breaks and flees |

The outnumbered penalty scales with how lopsided the fight is, so three-on-one grinds morale down faster than
two-on-one. This is why bringing numbers matters more than any single strong pawn.

## Arrests

Arrest is a cooperative chain between a cop and a target, not a single action:

| Stage (police) | Meaning |
| --- | --- |
| Approach | Close on the chosen suspect |
| Apprehend | Confirm in range |
| Cuff | Wait for the suspect to give up, then complete the arrest |

To avoid flickering between "fight" and "arrest" when scores are close, a cop that has committed to an arrest
**locks** onto that target and stays on it until the target is cuffed, escapes for good, or the cop is taken out.
Likewise, once a pawn is marked as being arrested, that state sticks until the arrest resolves, so a pawn cannot
wriggle back into a fight mid-arrest. A pawn that has surrendered or been arrested is skipped by the combat sensor
entirely, so it will not suddenly re-enter combat.

Arrests are not a game over. They are a decision: let the member serve, pay to bail them out, keep a contact on
retainer to hear about it early, or use the prison itself to remove a rival quietly. These player options are
covered under the [Economy](/systems/economy) and [Betrayal](/systems/betrayal) systems.

## Trait feedback

Combat feeds back into [traits](/systems/traits). Fighting raises Aggression, Stress, and trauma over time and can
lower Empathy. Surrender is psychologically costly. Surviving raids builds (or breaks) Courage. Over many fights a
pawn's personality visibly hardens, which then changes how they read the *next* fight.

## Modding

Combat is config-driven: capability weights, base damage, morale thresholds, and the outnumbered penalty all live
in an engagement config, and hostility lives in a faction matrix. See [Modding: economy and tuning](/modding/economy-config)
and [Entities & Identities](/modding/entities).
