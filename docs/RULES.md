# Kindo Rules

These rules are the spec for the rewritten engine. They come from the original README plus the actual behavior of the 2019–2020 code (`src/components/game/game.component.jsx` and `src/utils/functions.utils.js` on `master`). Where the code and the README disagree, or where the behavior is uncertain, the point is listed under **Open questions** instead of being decided silently.

Credits: game design by [Paul Vauvrey](http://www.pvauvrey.com/). Website by Daniel Scalettar.

## Board

- 5×5 grid. Rows are numbered 0–4 from top to bottom and columns 0–4 from left to right.
- **Kings:** Player 1's King is at bottom-left (row 4, col 0). Player 2's King is at top-right (row 0, col 4). Each player starts owning only their King.
- **Unwallable tiles:** both Kings, and the five diagonal tiles from top-left to bottom-right: (0,0), (1,1), (2,2), (3,3), (4,4). The diagonal tiles show a bracket icon.
  - These are all Paul's rules. The corners (0,0) and (4,4) were added to the site in Nov 2019 (to stop a "border walling" strategy) and the Kings in Mar 2020, both following Paul's revisions to the design.
- Every other tile starts neutral.

## Turns

- Player 1 goes first. **P1's first turn has 1 move.** This was added in Oct 2019 to offset the advantage of moving first. The rules page presents it as an ordinary Kindo rule with no separate credit. After that, every turn starts with 2 moves plus any bonus moves earned, up to a maximum of 4.
- A player must use all of their moves. The turn passes when the moves run out.
- Each move is one of:
  1. **Claim** a neutral tile next to (orthogonally) a tile you own.
  2. **Capture** an opponent's tile next to (orthogonally) a tile you own, unless that tile has a wall on the side facing your tile.
  3. **Place a wall** on a tile you own (not an unwallable one).

## Walls

- A tile has at most one wall, facing North, East, South or West.
- A wall protects only the tile it sits on. It blocks captures of that tile from the neighbor on the walled side. It doesn't stop the wall's owner from attacking out of that tile in any direction.
- Placing a wall on a tile that already has one changes its direction and costs a move. Choosing the direction it already faces does nothing and costs no move.
- Walls may face the edge of the board. That's allowed but pointless.
- A tile loses its wall when it's captured, directly or through a mass capture.

## Mass capture

After you capture an opponent's tile, any of their tiles no longer connected to their King (by a path of orthogonally adjacent tiles they own) become yours. Their walls are removed.

## Last-played markers

- A tile you claim or capture gets a **last-played** marker. It stays visible through your opponent's turn and clears at the start of your next turn.
- Placing a wall does **not** add a marker. Tiles gained through mass capture are **not** marked.

## Bonus moves

Bonus moves always apply to the **next** turn of the player who earned them. That player's next-turn total is capped at 4.

- **Mass capture:** the capturing player gets +1 next turn. It's +1 per capturing move, no matter how many tiles were cut off.
- **Last-played capture:** if a player captures a tile that carries the opponent's last-played marker, the **opponent** (the victim) gets +1 next turn.
- One move can trigger both bonuses, one for each player.

## Winning

- Capture the opponent's King. The game ends immediately, even if the winner has moves left. Following the mass-capture rule, every remaining tile of the loser is now cut off from their King and flips to the winner. The interface shows this as the win cascade, spreading out from the captured King. No bonus is awarded, because the game is over.
- **Resignation:** either player may resign at any time, including during the opponent's turn. Resigning is not a Move: it doesn't use a move or change the board. It's recorded in the game record.
- **Trapped King:** a player who starts their turn with no legal move loses right away. This can only happen when they own nothing but their King and both of its neighbors are opponent tiles walled toward it, and in that position the King would be captured next turn anyway.

## Open questions

The *current behavior* below is what the old code does. Unless decided otherwise, the new engine keeps it.

1. ~~P1's first-turn move count~~ **Resolved 2026-11-16:** keep 1 move. It's a house balance rule (see *Turns*).
2. ~~A player with no legal moves gets stuck~~ **Resolved 2026-11-16:** that player loses right away (see *Trapped King* under *Winning*). The old code froze.
3. **Ending the turn early / resigning.** *Ending the turn early was decided 2026-11-16: not allowed.* A player must spend every move. Turning a wall works as a pass that still costs a move, and it's part of the game's tempo. *Resigning was decided 2026-11-16:* allowed at any time (see *Winning*). Every game's **result** records the winner and the end reason: King captured, Trapped King or Resignation. In Phase 1, "New game" mid-game asks for confirmation and discards the game. From Phase 2, unfinished games stay in the active games list until they're finished, resigned or deleted. Deleting erases a game and records no result.
4. ~~The board flips at the end of the game~~ **Resolved 2026-11-16:** keep the flip, shown as a cascade, and award no bonus (see *Winning*). Replays let players step back to the position before the final capture.
5. **Long games.** *Deferred 2026-11-16* to the AI (Phase 2) and online (Phase 3) work. Nothing stops a game from going on forever today. If stalling forever turns out to be practical, that calls for a rules change (a repetition draw, a move cap or turn timers). Results must be able to gain a "draw" later without breaking stored games, which the versioned game records allow.

## Interface behavior worth keeping (not rules)

- Wall picker: None / N / E / S / W. Keyboard: arrow keys or WASD choose a direction, and any other key clears it.
- If a wall direction is selected and the player taps a neutral or opponent tile, it's a normal claim or capture, and the wall selection clears.
- Move pips per player: bright = moves left this turn, dark = moves banked for next turn, empty = unused, out of a maximum of 4.
