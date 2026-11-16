# Kindo Rules

These rules are the spec for the rewritten engine. They come from the original README plus the actual behavior of the 2019–2020 code (`src/components/game/game.component.jsx` and `src/utils/functions.utils.js` on `master`). Where the code and the README disagree, or where the behavior is uncertain, the point is listed under **Open questions** instead of being decided silently.

Credits: game design by [Paul Vauvrey](http://www.pvauvrey.com/). Website by Daniel Scalettar.

## Board

- 5×5 grid. Rows are numbered 0–4 from top to bottom and columns 0–4 from left to right.
- **Kings:** Player 1's King is at bottom-left (row 4, col 0). Player 2's King is at top-right (row 0, col 4). Each player starts owning only their King.
- **Unwallable tiles:** both Kings, and the five diagonal tiles from top-left to bottom-right: (0,0), (1,1), (2,2), (3,3), (4,4). The diagonal tiles show a bracket icon.
  - The corners (0,0) and (4,4) were added in Nov 2019 to stop a "border walling" strategy. The Kings were added in Mar 2020.
- Every other tile starts neutral.

## Turns

- Player 1 goes first. **P1's first turn has 1 move.** After that, every turn starts with 2 moves plus any bonus moves earned, up to a maximum of 4.
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

Capture the opponent's King. The game ends immediately, even if the winner has moves left.

## Open questions

The *current behavior* below is what the old code does. Unless decided otherwise, the new engine keeps it.

1. **P1's first turn has 1 move.** The README says "2 moves by default" without mentioning this. The concept video shows P1 claiming **2** tiles on the first turn. In the code, the 1-move start dates to 2019-10-27 (`e664730`). Like the corner rule, it's probably a balance change made after the concept. *Current: 1 move. Recommendation: keep it and state it on the rules page.*
2. **A player with no legal moves gets stuck.** Example: P1 is down to only their King, and P2 owns both tiles next to it with walls facing the King. The King can't be walled, so P1 has no legal move. The turn can never end, and the game freezes. *Current: game hangs. Needs a rule. Options: that player loses, or their turn is skipped.*
3. **There's no resign or end-turn-early option.** A player must spend every move. Changing a wall's direction works as a de facto pass. Online play needs **resign** at least. *Should ending the turn early be allowed?*
4. **The board flips at the end of the game.** When a King is captured, the mass-capture logic sees every loser tile as cut off, so the whole losing territory flips to the winner on the final board (and a meaningless +1 bonus is recorded). *Keep the dramatic flip, or freeze the board as it was?*
5. **Long games.** Nothing stops a game from going on forever, for example with wall shuffling. It's probably harmless for hot-seat play, but online and AI games may want a move limit or a draw rule. *Defer until Phase 2/3.*

## Interface behavior worth keeping (not rules)

- Wall picker: None / N / E / S / W. Keyboard: arrow keys or WASD choose a direction, and any other key clears it.
- If a wall direction is selected and the player taps a neutral or opponent tile, it's a normal claim or capture, and the wall selection clears.
- Move pips per player: bright = moves left this turn, dark = moves banked for next turn, empty = unused, out of a maximum of 4.
