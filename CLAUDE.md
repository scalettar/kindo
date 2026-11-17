# Kindo

A ground-up rewrite of [playkindo.com](https://playkindo.com), a two-player territory game designed by Paul Vauvrey.

## Read first

- [docs/ROADMAP.md](docs/ROADMAP.md): goals, accepted decisions, the 11 architecture constraints, and the phase checklists. Work from the current phase's checklist.
- [docs/RULES.md](docs/RULES.md): the game rules. This is the spec for the engine.
- [docs/DESIGN.md](docs/DESIGN.md): layout, themes, motion and input design.
- [docs/adr/](docs/adr/): hard-to-reverse decisions and why they were made. Don't reverse one silently. If something argues against an ADR, raise it.
- [CONTEXT.md](CONTEXT.md): the domain glossary. Use these terms in code, UI text and docs (for example `claim`, `capture`, `seat`, `player`), and avoid the terms listed under *Avoid*. Add new terms there when they come up.

## Branches

- Work happens on `rewrite`. `master` holds the old code behind the live site, which was deployed by hand to the `gh-pages` branch. Leave both alone until Phase 1 launches.
- The old implementation is a reference for rules and look only, never for code structure. Read it with `git show master:<path>`. Its files still sit in the `rewrite` working tree (`src/`, `public/`, `package.json`) until the Phase 0 project setup replaces them.

## Working preferences

- **Modern but established tools.** Prefer polish and stability over cutting edge: tools that are widely used, well documented and unlikely to disappear.
- **No silent failures.** Errors should be typed, named and surfaced, never swallowed. Prefer checks that fail CI (types, lint rules, tests) over conventions.
- **No needless complexity.** Build for the current phase. Shape things so the roadmap stays cheap, but don't build infrastructure before a feature needs it.
- **Detail and polish are extremely important**, especially visuals, motion and feel.
- **Flag anything you're not sure of** instead of guessing. Decisions the docs don't already settle belong to the user: ask, with a recommendation.
- **Commit only when asked.**
- **Credits:** the game design is Paul Vauvrey's. Don't attribute rule changes to anyone else.
- English only for now, but all UI text goes through i18next keys (see ROADMAP *Stack*).
