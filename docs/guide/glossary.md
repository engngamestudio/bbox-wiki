# Glossary

Quick definitions for terms used across the wiki. Alphabetical.

| Term | Meaning |
| --- | --- |
| **Action** | A single atomic step a pawn can execute (walk, hand off drugs, fire a shot). Defined in JSON, backed by a behavior. See [GOAP authoring](/modding/goap). |
| **Agent** | The runtime object that plans and acts for one entity. |
| **Ambient spawn** | A Director spawn that is permanent and has no mission or despawn timer, used to refill population (traffickers, addicts). |
| **Behavior** | The code that runs while an action executes and decides when it returns Success. |
| **Clean cash** | Laundered money the player can spend freely. Opposite of dirty cash. See [Economy](/systems/economy). |
| **Dirty cash** | Proceeds of crime held by the player or fronted to crew. Must be laundered to become clean. |
| **Director** | The pacing engine that scores pressure and fires events. See [Director](/systems/director). |
| **Drama** | Emergent character events (betrayal, defection, breakdown) driven by traits, not scripts. See [Drama](/systems/drama). |
| **Entity** | Any simulated thing with state: a crew member, cop, addict, building. |
| **GOAP** | Goal-Oriented Action Planning. The planner each pawn uses to choose and sequence actions. See [GOAP](/systems/goap). |
| **Goal** | A desired world state a pawn tries to reach. Has a priority. See [GOAP](/systems/goap). |
| **Heat** | Per-section crime pressure, 0 to 100. Drives police response. See [Heat](/systems/heat). |
| **Historian** | The worldgen system that writes each pawn's backstory and seeds traits. See [Historian](/systems/historian). |
| **Legend** | A reusable Historian backstory pattern that can plant feuds, debts, or secrets on a pawn. |
| **Mission** | A Director-created, tracked task given to a squad. Ends on completion or timeout. |
| **Mod** | A folder of JSON (and optional C#) that adds or changes content. See [Modding](/modding/). |
| **Priority** | The weight the planner uses to choose between eligible goals. Can be player-adjusted and multiplied by situation. |
| **Section** | A city block or neighborhood zone. Heat and risk are tracked per section. |
| **Threat score** | The Director's single pressure number. When it exceeds the threshold, an event fires. See [Director](/systems/director). |
| **Threshold event** | A behavior change that fires when a trait crosses a cutoff (for example Loyalty below 20 unlocks betrayal goals). See [Traits](/systems/traits). |
| **Trait** | A named personality or history value on a pawn. There are 542 across 17 categories. See [Traits](/systems/traits). |
| **Wallet** | A crew member's personal money. The player never touches it. Distinct from fronted dirty cash. See [Economy](/systems/economy). |
| **Weight calculator** | A rule that turns a base priority into an effective priority using entity state. See [GOAP](/systems/goap#priority-math). |
