# Kindo

A ground-up rewrite of [playkindo.com](https://playkindo.com), a two-player territory game designed by Paul Vauvrey.

## Read first

- [docs/ROADMAP.md](docs/ROADMAP.md): goals, accepted decisions, the 11 architecture constraints, and the phase checklists. Work from the current phase's checklist.
- [docs/RULES.md](docs/RULES.md): the game rules. This is the spec for the engine.
- [docs/DESIGN.md](docs/DESIGN.md): layout, themes, motion and input design.
- [docs/adr/](docs/adr/): hard-to-reverse decisions and why they were made. Don't reverse one silently. If something argues against an ADR, raise it.
- [GLOSSARY.md](GLOSSARY.md): the domain glossary. Use these terms in code, UI text and docs (for example `claim`, `capture`, `seat`, `player`), and avoid the terms listed under *Avoid*. Add new terms there when they come up.

## Branches

- Work happens on `rewrite`. `master` holds the old code behind the live site, which was deployed by hand to the `gh-pages` branch. Leave both alone until Phase 1 launches.
- The old implementation is a reference for rules and look only, never for code structure. Read it with `git show master:<path>`. Its files still sit in the `rewrite` working tree (`src/`, `public/`, `package.json`) until the Phase 0 project setup replaces them.

## Tooling notes

- `gh` runs outside the sandbox only when the whole command is a single `gh` call matching `excludedCommands` in `.claude/settings.local.json`. Chained or piped (`gh … | jq`, `gh …; echo`), it runs sandboxed and fails on config or network. Run `gh` on its own and process the output in a separate command.
- Heredocs, redirects and `$(…)` also force the sandbox. For multi-line issue or PR bodies, write the body to a file in `$TMPDIR` first, then run `gh … --body-file <absolute path>` as its own command.
- Never print, `cat` or echo credentials or settings files that may hold them.

## Working preferences

- **Modern but established tools.** Prefer polish and stability over cutting edge: tools that are widely used, well documented and unlikely to disappear.
- **No silent failures.** Errors should be typed, named and surfaced, never swallowed. Prefer checks that fail CI (types, lint rules, tests) over conventions.
- **No needless complexity.** Build for the current phase. Shape things so the roadmap stays cheap, but don't build infrastructure before a feature needs it.
- **Detail and polish are extremely important**, especially visuals, motion and feel.
- **Flag anything you're not sure of** instead of guessing. Decisions the docs don't already settle belong to the user: ask, with a recommendation.
- **Commit only when asked, or as part of `/implement`.** `/implement` always works on a feature branch, never on `master` or `rewrite`. Feature branches merge through PRs, and the PR (with its preview URL) is where the user reviews. Commits the user asks for directly (for example docs) may go on `rewrite`. Never commit to `master`.
- **Credits:** the game design is Paul Vauvrey's. Don't attribute rule changes to anyone else.
- English only for now, but all UI text goes through i18next keys (see ROADMAP *Stack*).

## Agent skills

### Issue tracker

GitHub Issues on `scalettar/kindo`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default labels: categories `bug` and `enhancement`; states `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
