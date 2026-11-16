# Kindo Visual & Motion Design

The target look and feel, taken from the concept video (`kindo-concept.mov`, a ~25s hot-seat game in the default *kindo* theme). The current site uses the same art (the PNGs in `src/assets/`) but has none of the motion. The rewrite should reproduce this concept, then polish it.

## Layout

- **Desktop:** a player panel on the left (P1 on top, P2 below) and the 5×5 board on the right.
- **Phone (proposed):** stack everything vertically, with P2's panel above the board and P1's below. That matches where each King sits (P2 top-right, P1 bottom-left).

## Board

- **Tiles:** rounded squares with an even gap between them, sitting on a cream background.
- **Neutral tiles:** a light tint of the background.
- **Owned tiles:** filled with the owner's color, flat with no gradients or shadows.
- **King:** a white crown inside a thin white circle. Redraw it as SVG to match the concept, which looks better than the current `crown.png`.
- **Unwallable tiles:** four corner brackets.
  - On a neutral tile they're drawn in the neutral shade.
  - On an owned tile they're a darker shade of the owner's color.
- **Walls:** a white band with castle-style notches along one inside edge of the tile (N/E/S/W).
- **Last-played marker:** a small square in a darker shade of the owner's color, centered on the tile.

Note: the concept shows no brackets on the (0,0) and (4,4) corners, so it predates the Nov 2019 rule that made them unwallable. The current rules ([RULES.md](./RULES.md)) win.

## Player panel

- **Avatar:** a filled circle in the player's color. The concept shows "P1"/"P2" here; the rewrite uses an **avatar** instead (a simple smiley for now, with room for real avatars once accounts exist).
- **Name label:** a letter-spaced uppercase **username** in the player's color, below the avatar. Local games show default names ("Player 1" / "Player 2"; vs AI, something like "You" / "AI · Easy").
- **Active player:** a thin ring in the player's color around the avatar, with a small gap at the bottom. It is **not** a timer.
  - Future: in live timed games the ring could drain as a turn clock. It would need to stay readable, for example by pairing it with a numeric clock and a clear low-time state.
- **Move pips:** 4 small squares.
  - Slots 1–2 are the base moves and slots 3–4 are bonus moves. Unearned bonus slots are drawn as outlines only.
  - **Active player:** filled squares are moves left this turn, and grey squares are moves already used.
  - **Waiting player:** grey squares show how many moves they'll have next turn.

## Motion inventory

| Event | Animation in the concept |
|---|---|
| Turn change | The ring draws in around the new player's avatar and fades from the old one. The new player's pips fill. |
| Claim / capture | The tile fades to the new color and the last-played marker appears. |
| Wall placed / turned | The notched band fades in on the chosen edge. When turning, the old edge fades out. |
| Mass capture | The cut-off tiles flip in a staggered **cascade**, not all at once. |
| Bonus move earned | A small "+1" chip appears at the tile that triggered it and **flies to the earning player's pip tray**, landing in a bonus slot. It goes to the capturer for a mass capture, and to the victim when their last-played tile was captured. |
| Turn start | The new active player's last-played markers fade out. |
| Win | Not shown in the concept, so it still needs designing. |

## Implementation notes (proposed)

- **The engine reports events, not just a new state.** Each move returns what happened: tile claimed, tile captured, cut-off tiles (so the UI can stagger the cascade by distance), bonuses awarded (to whom, and from which tile), wall changed, turn passed. The UI animates the events. Replays, tutorial narration and stats can use the same events.
- Plain CSS transitions handle color fades, rings and pips. Motion (motion.dev) or the browser's Web Animations API handles the flying chip and the cascade.
- Respect `prefers-reduced-motion`. Animations should never block input or hide the real state, and a fast player shouldn't have to wait for one to finish.
- Redraw the PNG art (crown, walls, brackets) as SVG so it scales and the brackets can pick up theme colors.

## Placing walls

- **Touch:** swipe on your own tile in the direction the wall should face. Swiping toward the top of the screen puts the wall on the North edge.
- **Proposed for mouse:** the same gesture as a click-and-drag. Pointer events handle touch and mouse with one code path, so the on-screen wall picker can go.
- **Proposed for keyboard:** still needed for accessibility. One option: arrow keys move focus between tiles, Enter claims or captures, and Shift+arrow places a wall on the focused tile.
- **Proposed feedback:**
  - A short swipe still counts as a tap.
  - Swiping on an unwallable tile, or toward the direction the wall already faces, gives a small "no" shake and costs no move.
  - While dragging, preview the wall on the edge it would land on.

## Decided

- There are **no original design files** (Figma, After Effects, etc.). The concept video and the existing PNG art are the only sources, so exact colors come from the existing themes and timing will be tuned by eye.
- **Font is unknown.** In Phase 1, compare light, rounded geometric fonts against the concept, for example Quicksand, Nunito, Varela Round or Comfortaa. Host the font files with the site instead of loading them from Google Fonts.

## Open questions

1. Keyboard controls for walls (see the proposal above).
2. Win animation and end-of-game screen.
