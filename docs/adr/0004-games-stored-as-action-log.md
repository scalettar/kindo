---
status: accepted
date: 2026-11-16
---

# Games are stored as an action log

A game is stored as its seats plus an ordered log of the actions players chose. The board is never stored as the source of truth: it's rebuilt by replaying the log through the engine. This gives exact replays, shareable links (the log is small enough to encode in a URL), multiplayer sync (send one action at a time), stats derived from history, and records that can't be internally inconsistent.

## Record shape

- `id`, `createdAt`, `rulesVersion`, `formatVersion`
- `seats`: who occupies P1 and P2 (local human, AI level, later a user)
- `actions[]`, in order, each with its seat and a timestamp:
  - `take(row, col)`: a claim or capture. The engine decides which from the board.
  - `wall(row, col, dir)`
  - `resign`
- `result?`: winner and end reason. A stored copy for listing and filtering that can always be re-checked by replaying.

## Consequences

- Only player intent is stored. Mass captures, bonuses, flips and turn changes are always recomputed, so the engine must replay deterministically, and old records must replay under their own `rulesVersion`.
- A cached board (for example a games-list thumbnail) is allowed, but it's always disposable.
- Timestamps are stored from day one, because they can't be added to games already saved without them.
