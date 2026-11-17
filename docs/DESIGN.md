# Kindo Visual & Motion Design

The target look and feel, taken from the concept video (`kindo-concept.mov`, a ~25s hot-seat game in the default *kindo* theme). The current site uses the same art (the PNGs in `src/assets/`) but has none of the motion. The rewrite should reproduce this concept, then polish it.

## Layout

**Touch principle:** on touch screens, anything used often goes at the bottom of the screen, within thumb reach. Things that are used rarely or would be costly to hit by accident (close, menu) go at the top.

- **Wide screens (desktop, tablet, phone held sideways):** P1's panel left of the board, P2's panel right. Each player sits on their own King's side (P1 bottom-left, P2 top-right), and neither seat gets top billing.
- **Portrait phone:** both panels side by side above the board (P1 left, P2 right, the same order as wide). The board fills the lower part of the screen, so taps and wall swipes stay within thumb reach.
- **Chrome during a game:** close (✕) top-left, then help (?) and menu (☰) top-right, out of the way of play. Replay controls go under the board.

### In-game help *(Phase 1, accepted)*

A circled **?** button on the game screen opens a quick reference without leaving the game.

- **Opens as a sheet:** a bottom sheet on phones (like game over) and a side panel or dialog on wide screens. The game stays underneath, unchanged. The **?** key opens it too, which is a common convention and doesn't clash with the Shift+ESDF wall keys.
- **Controls:** take a tile; place a wall by swipe, drag or keyboard. It shows the controls for the current input first, with the others below.
- **Rules at a glance:** a short summary (moves per turn, walls, mass capture, bonus moves, how to win), with a link to the full rules page.
- **Following the rules link mustn't lose the game.** In Phase 1 the game lives in memory, which survives moving between pages but not a page reload. Either open the full rules inside the sheet, or keep the current game in browser storage from Phase 1. Decide during the build.

The concept video stacks both panels on the left of the board. The rewrite follows the later reference screens instead.

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

## Themes

Each theme is a complete curated palette (see ROADMAP *Visual system*). Hex values for the old themes come from `src/themes/themes.styles.jsx` on `master`. Values for the three new themes were sampled from reference screenshots (`~/Downloads/kindo/kindo-color-theme-*`), so they're starting points to tune, not exact.

### Polished (Phase 1 lineup)

| Name | Old id | Kind | Background | Neutral tile | P1 | P2 | Markers (P1 / P2) |
|---|---|---|---|---|---|---|---|
| **Classic** | kindo | light | `#f7f1eb` | `#f0e7df` | green `#5abf84` | orange `#ffb473` | darker shade of each |
| **Bubblegum** | kindoLight | light | `#fafafa` | `#dbdbdb` | blue `#5596f2` | pink `#ff6699` | darker shade of each |
| **Versus** | kindoDark | dark | `#444444` | `#4d4d4d` | coral red `#ff6766` | sky blue `#4db4ff` | darker shade of each |
| **Aurora** | new (theme-0) | dark | slate `#566264` | `#636f74` | sky blue `#90d6e2` | lime `#b2d47f` | `#69a5b5` / `#93b169` |
| **Dusk** | new (theme-1) | dark | aubergine `#34303f` | `#4b435a` | amber `#ffbb5a` | coral `#ff7372` | `#cd9548` / — |
| **Vintage** | new (theme-2) | light | cream `#f5f0ec` | `#e6e1dd` | burgundy `#955152` | sky blue `#73bada` | `#764040` / — |

### Experimental (need refinement before shipping)

These are kept as design-values data but hidden from Settings. A hidden "experimental themes" switch, available on preview deploys only, lets you try them on real devices. Each one ships only when it's refined and passes the contrast test.

| Name | Kind | Palette | Notes |
|---|---|---|---|
| **Andromeda** | dark | navy `#23262e`, neutral `#333844`, aqua `#00e8c6` / magenta `#ff007a` | Tribute to EliverLara's Andromeda VS Code theme. |
| **Cali** | light | white, tan `#bd8a5e` / brown `#584528`, crimson `#b71234` / green `#008542` | Meant to use California flag colors. Never finished. |
| **Cyber** | — | was black, cyan `#00f0ff` / yellow `#fcee09` | Redesign as a Cyberpunk 2077 promo-art tribute: yellow background, blue for one seat, black or pink for the other. Needs experimenting. |
| **Super** | light | white, neutral `#ededed`, near-black `#101010` / red-orange `#ff3c00` | Its last-played marker is invisible on the near-black seat. Markers become per-seat design values, checked by the contrast test. |

### Future themes (Phase 4)

There could be many more themes in the same aesthetic, **unlocked randomly as players progress**. Inspiration: the theme list on monkeytype.com (`~/Downloads/kindo/kindo-theme-inspiration-*`). Those themes mostly come from popular code-editor themes and mechanical-keyboard keycap sets (GMK, SA, …), and each is a 4-color palette: background plus 3 accents.

- **This affects the design values now:** a theme should be defined by a few **source colors** (background, neutral, P1, P2), with everything else (markers, bracket shades, empty-tile outline, text) **derived by formula**, for example darkening in a perceptual color space. Any derived value can be overridden per theme. Adding a theme is then a 4-color entry, and the contrast test guards the result.
- **Attribution and naming:** tribute themes should be credited on the credits page (for example Andromeda → EliverLara). Many editor themes (Dracula, Nord, Catppuccin, …) are openly licensed, but keycap-set names like "GMK …" are product names. Check licenses and avoid trademarked names before shipping tribute themes.

## Reference screens

Screenshots of earlier Kindo work (in German; the rewrite is English first, with future localization possible), kept in `~/Downloads/kindo/`. They show what features *could* look like, not a spec.

- **Wide layout** (`kindo-color-theme-1/2`): P1's panel left of the board, P2's panel right. Close (✕) top-left, menu (☰) top-right.
- **Avatars:** a photo, initials ("JK", "F") or a smiley for the AI, inside a ring in the seat's color. The name is below it in letter-spaced caps ("ME", "STROMSTOCK", "AI (HARD)").
- **Portrait phone layout** (`kindo-reference-2`, `kindo-tutorial`): both player panels side by side above the board.
- **Replay controls** (`kindo-color-theme-1`): play/pause, a scrubber whose tick marks are **one per action, colored by the seat that took it**, and a restart button.
- **Games list** (`kindo-games-list`): a "KINDO" wordmark with the crown as the O, a menu, and a theme-picker icon (colored dots). Sections: "Waiting for opponent" and "Game finished". Each card shows a **mini-board thumbnail**, a one-line status ("Playing with frankj", "Player 1 wins", "Lost against AI (medium)") and both avatars, with the winner's ringed. A "+ NEW GAME" button sits at the bottom.
- **Game-over dialog** (`kindo-reference-after`): "PLAYER 1 WINS", the winner's avatar and name, and actions **Play again**, **Watch replay**, **Remove game**.
- **Tutorial** (`kindo-tutorial`): a scripted position with a tooltip pointing at a tile. Its key words are colored by seat ("Cut off **pieces** from **their King** to **capture** them"). A back button and a skip (⏩) button.

## Motion inventory

| Event | Animation in the concept |
|---|---|
| Turn change | The ring draws in around the new player's avatar and fades from the old one. The new player's pips fill. |
| Claim / capture | The tile fades to the new color and the last-played marker appears. |
| Wall placed / turned | The notched band fades in on the chosen edge. When turning, the old edge fades out. |
| Mass capture | The cut-off tiles flip in a staggered **cascade**, not all at once. |
| Bonus move earned | A small "+1" chip appears at the tile that triggered it and **flies to the earning player's pip tray**, landing in a bonus slot. It goes to the capturer for a mass capture, and to the victim when their last-played tile was captured. |
| Turn start | The new active player's last-played markers fade out. |
| Win by King capture | The loser's remaining tiles flip in a cascade spreading out from the captured King, until the board is the winner's color. |
| Win by Trapped King | *(Not in the concept.)* Nothing flips. The two walls trapping the King pulse once, then the loser's King dims. |
| Win by Resignation | *(Not in the concept.)* Nothing flips. The resigning player's tiles dim slightly. |
| Game over | *(Not in the concept.)* The game-over sheet slides up after the ending animation (immediately with reduced motion). No confetti. |

## Implementation notes (proposed)

- **The engine reports events, not just a new state.** Each move returns what happened: tile claimed, tile captured, cut-off tiles (so the UI can stagger the cascade by distance), bonuses awarded (to whom, and from which tile), wall changed, turn passed. The UI animates the events. Replays, tutorial narration and stats can use the same events.
- **The board always shows the true state, and animations are layered on top.** An animation never delays or hides a move, and fast input skips ahead. An animation bug can only cause a visual glitch, never a wrong board.
- **Simple animations** (tile and wall fades, pips, markers) are plain CSS transitions written in vanilla-extract, with timings from the design values. *(accepted)*
- **Orchestrated animations** (cascade stagger, flying "+1" chip, ring draw-in, swipe gesture with wall preview, interruption) use **Motion** (motion.dev). *(accepted)*
- Respect `prefers-reduced-motion`. Animations should never block input or hide the real state, and a fast player shouldn't have to wait for one to finish.
- Redraw the PNG art (crown, walls, brackets) as SVG so it scales and the brackets can pick up theme colors.

## Placing walls

- **Touch:** swipe on your own tile in the direction the wall should face. Swiping toward the top of the screen puts the wall on the North edge.
- **Mouse** *(accepted)*: the same gesture as a click-and-drag. Pointer events handle touch and mouse with one code path. **There is no on-screen wall picker.** The old one only existed because the site explained nothing. The rules page and the in-game help (see *In-game help*) teach the gestures instead, and the tutorial does too from Phase 2.
- **Keyboard** *(Phase 1, accepted)*:
  - The board is a single Tab stop. Inside it, **arrow keys or ESDF** move focus between tiles (E up, S left, D down, F right), so the left hand can play from the home row.
  - **Enter or Space** takes the focused tile (claim or capture).
  - **Shift+arrow or Shift+ESDF** places a wall on the focused tile, on the edge in that direction. It mirrors the swipe, and an illegal wall gives the same "no" shake.
  - Resigning stays in the menu, behind a confirmation. No key can end a game by accident.
  - A screen-reader live region announces each move in one line built from the engine's events (for example "Claimed row 2, column 3. 1 move left.").
  - **Keys match by physical position** (`KeyboardEvent.code`), so ESDF keeps its shape on AZERTY or Dvorak keyboards. Key names shown in help text may not match the printed keycap on non-QWERTY layouts. Flag this when writing the help text.
  - **The keymap is data** (action → keys) from day one. A remapping screen (capture a key, detect conflicts, reset to defaults, save per device) is a small settings feature but not free, so it's deferred until someone asks for it. Adding it later only touches Settings.
  - To verify in Phase 1: Shift+arrow and letter keys don't clash with VoiceOver once the board is marked up as a grid.
- **Proposed feedback:**
  - A short swipe still counts as a tap.
  - Swiping on an unwallable tile, or toward the direction the wall already faces, gives a small "no" shake and costs no move.
  - While dragging, preview the wall on the edge it would land on.

## Decided

- There are **no original design files** (Figma, After Effects, etc.). The concept video and the existing PNG art are the only sources, so exact colors come from the existing themes and timing will be tuned by eye.
- **Font is unknown.** In Phase 1, compare light, rounded geometric fonts against the concept, for example Quicksand, Nunito, Varela Round or Comfortaa. Host the font files with the site instead of loading them from Google Fonts.

## Game over *(accepted)*

- **A bottom sheet, not a full-screen dialog.** The actions sit at the bottom (touch principle), and the final board stays visible above. The sheet can be collapsed to study the final position.
- **Contents:** "PLAYER 1 WINS" in the winner's color, the winner's ringed avatar, and a one-line reason: "King captured", "King trapped" or "Player 2 resigned".
- **Actions by phase:**
  - Phase 1: **Play again** and **Home**.
  - Phase 2 adds **Watch replay**, and **Remove game** once the games list exists.
- **Play again keeps the same seats** in Phase 1. Whether players alternate going first is decided with AI (Phase 2) and online play (Phase 3).

## Open questions

None for Phase 1.
