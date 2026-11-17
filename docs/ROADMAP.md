# Kindo Rewrite — Roadmap

A ground-up rebuild of [playkindo.com](https://playkindo.com). The 2019–2020 version on `master` is the reference for game behavior (see [RULES.md](./RULES.md)) and the visual look; everything else, including the stack and hosting, is being replaced.

Work happens on the `rewrite` branch. The live site keeps running from the old code until Phase 1 ships.

## Guiding principles

- **Build properly, in small steps.** Each phase ships something usable; don't one-shot.
- **Keep the look.** Keep the board, tile shapes, wall/crown/bracket icons and the existing color themes. Polish them, don't redesign them.
- **Design for the roadmap, build for today.** Choose the shapes that keep future goals cheap (see *Architecture constraints*), but don't build infrastructure before a feature needs it.
- **The website comes first.** Mobile reuses the web work instead of competing with it.
- **Modern but established tools.** Prefer polish and stability over cutting edge. Pick tools that LLMs know well, that are unlikely to disappear, and that fail loudly (build or type errors) rather than silently.

## Current state (as of 2026-11-16)

- Create React App + React 16 class components + styled-components 4, about 600 lines of real code.
- All rules live in `src/components/game/game.component.jsx` and `src/utils/functions.utils.js`, and they change state in place.
- Hosting: GitHub Pages (`gh-pages` branch, deployed by hand with `npm run deploy`). The last deploy was 2020-03-30 and matches `master`.
- Domain: `playkindo.com` is registered at Squarespace and will move to Cloudflare DNS separately from this project.
- Hot-seat 2-player only. There's no rules page, no credits page and no theme picker (7 themes exist in code but can't be selected).

## Goals

| Goal | Phase |
|---|---|
| Rules page, credits page | 1 |
| Swappable color themes (light/dark aware) | 1 |
| Responsive, mobile-friendly board | 1 |
| Active games list (several games at once) | 2 |
| Replays (step through any finished game) | 2 |
| Shareable replay links | 2 (link-encoded), 3 (server-stored) |
| AI opponent | 2 |
| Interactive tutorial | 2 |
| Installable web app (PWA) | 2 |
| User accounts, game history synced across devices | 3 |
| Online multiplayer (turn-based) | 3 |
| User stats | 3 |
| Public, filterable replay list (by player, rank, date) | 4 |
| Skill rating → leagues → leaderboard | 4 |
| Levels (XP) → unlockable piece colors | 4 |
| App-store apps (iOS/Android) | 4 |

## Proposed decisions

These are proposals, not final. Confirm each one (for example with `/grill-with-docs`), and record the ones that are hard to reverse as ADRs in `docs/adr/`.

### Platform: web-first, wrapped for mobile — **accepted, see [ADR 0001](./adr/0001-web-first-platform.md)**

There's one React web app, designed for phones first. It becomes an installable PWA in Phase 2. In Phase 4 it's wrapped with **Capacitor** for the App Store and Play Store.

Considered:

- **Expo / React Native for everything (react-native-web).** You get one UI, but the website is built from React Native parts instead of HTML/CSS. That means weaker styling, SEO and bundle size on the platform that matters most. It's also hard to reverse, since all the UI would be React Native.
- **Separate web app and native Expo app.** This feels the most native, but every screen (replays, leaderboards, profiles, cosmetics, tutorial) gets built twice. It's only worth it with dedicated mobile effort.

Escape hatch: the engine, data access and state logic contain no UI code. If the Capacitor app ever feels too much like a website, an Expo UI can be built on top of them later, and only the views get rewritten.

### Stack

- TypeScript (strict), Vite, React 19 *(accepted)*
- React Router v7 in framework mode, SPA mode, with fixed pages (`/`, `/rules`, `/credits`) built as HTML ahead of time. It can turn on server rendering on Cloudflare later, for example for replay link previews. *(accepted)*
- vanilla-extract for styling, with typed themes built from the design values *(accepted, see [ADR 0002](./adr/0002-vanilla-extract-styling.md))*
- Motion for orchestrated animations, plain CSS transitions for the rest *(accepted)*
- Zustand for the UI-free game store (constraint 11) *(accepted)*
- i18next + react-i18next with typed keys, English only from Phase 1. All UI text goes through translation keys from the start, and long-form content (rules, tutorial) lives in per-language content files. *(accepted)*
- Icons converted from PNG to SVG so they scale and can be recolored
- Vitest + Testing Library, with Playwright for full-game tests later
- ESLint (flat config) + Prettier, pnpm, GitHub Actions CI (typecheck, lint, test, build)

### Hosting: Cloudflare Workers, deployed from GitHub Actions — **accepted, see [ADR 0003](./adr/0003-cloudflare-workers-hosting.md)**

Cloudflare Workers static assets (Cloudflare's recommended path for new projects), or Pages.

- It's free for static sites, and static requests are unlimited.
- Every branch and PR gets a preview URL. The old manual `npm run deploy` goes away, and merging to `master` is the release.
- It lives with the DNS once the domain moves to Cloudflare.
- It has room for server code when it's needed. One early example is link previews (Open Graph images) for shared replays, which GitHub Pages can't do.

Alternatives: GitHub Pages (no previews, needs a workaround for page URLs, static only) and Vercel (the free tier is non-commercial only, which matters if cosmetics are ever sold).

### Backend (decide at the start of Phase 3, not now)

The candidates are **Supabase** (Postgres, auth, realtime) and **Convex** (TypeScript functions, reactive queries, auth). A Cloudflare-native setup (Workers + D1 + Durable Objects) is the third option. Decide with a short spike. The criteria:

1. Can the server check every move with the shared TypeScript engine?
2. Are filterable public lists, leaderboards and stats easy to query? This favors SQL.
3. Can it send "your turn" notifications and live updates?
4. Is there a free tier and a clear path to exporting your data?

## Architecture constraints (hold these from day one)

1. **Pure engine.** `src/engine/` has no React, browser APIs or outside imports, and a lint rule fails CI if it tries. It's deterministic: no clock, randomness or I/O, so timestamps come from the store. The contract is:
   - `createGame(seats) → GameState`
   - `applyAction(state, action) → { ok: true, state, events } | { ok: false, reason }`: illegal actions return a typed, named reason (`not-adjacent`, `blocked-by-wall`, `unwallable`, `wall-unchanged`, `not-your-turn`, `game-over`, …), never a thrown error
   - `legalMoves(state) → Move[]`

   The same engine serves the UI, the AI, the tutorial and server-side move checking.
2. **Games are stored as an action log** ([ADR 0004](./adr/0004-games-stored-as-action-log.md)). The current board is computed by replaying the moves. Replays, undo, sharing, multiplayer sync, stats and tutorial scripts all build on this.
3. **Versioned records.** Every stored game records its rules version and data format version, so old games still replay after rule tweaks. Rule changes raise `rulesVersion`, and the engine handles old versions through **rule options** (for example `openingTurnMoves: 1`) rather than keeping old copies of the engine. The first stored games arrive in Phase 2.
4. **Each seat holds a player of some kind.** P1 and P2 are each occupied by a Local, AI or Remote player (see `CONTEXT.md`). One board screen serves hot-seat, AI and online play. *Phase 3 note:* decide who gets P1 in online games (random, or the challenger picks).
5. **Game storage behind one interface.** It uses browser storage (IndexedDB) in Phase 2 and the server in Phase 3, and the screens don't change. The storage library (for example Dexie) is chosen in Phase 2.
6. **Seat colors are resolved, never hard-coded.** The board reads typed `--seat-1` / `--seat-2` variables set by `resolveSeatColors(theme, mode, players, viewer)`. It returns the theme's defaults in Phase 1 and accounts for cosmetics later (see below).
7. **Board coordinates use `row`/`col`,** never the old code's `x` (which was actually the row).
8. **Actions report events.** `applyAction` returns the new state *and* an ordered list of what happened: `claimed`, `captured`, `cutOff` (tiles plus distance from the capture, for the cascade), `bonusAwarded` (to whom, and from which tile), `wallPlaced` / `wallTurned`, `markersCleared`, `turnPassed`, `gameEnded`. The names may change during implementation. The UI drives animations from these (see [DESIGN.md](./DESIGN.md)), and replays, tutorial narration and stats reuse them.
9. **Engine test cases are data.** Rules tests live as files listing a starting position, the moves, and the expected state and events. Any other implementation (a React Native app, a native port, the Phase 3 server) is checked against the same files.
10. **Design values are data.** Theme colors, spacing, sizes and animation timings live in one platform-neutral TypeScript file. The web app generates its CSS variables from it, and a future native UI could read the same values. A theme is a few **source colors** (background, neutral, P1, P2). The rest is **derived by formula**, can be overridden per theme, and is checked by the contrast test. That keeps adding themes cheap (see [DESIGN.md](./DESIGN.md#future-themes-phase-4)).
11. **React components are thin views.** Game flow and state live in a UI-free layer the components subscribe to, so a different UI could reuse it. (From [ADR 0001](./adr/0001-web-first-platform.md).)

## Visual system: themes vs. unlockable colors

There are two separate layers:

- **Built-in themes** *(Phase 1, accepted)*. A complete, curated palette: background, neutral and empty tiles, UI elements, and both seats' colors. Because we control every color, backgrounds can vary freely between themes. Each theme is marked light or dark. Settings: **mode** (System / Light / Dark), plus the **light theme** and the **dark theme**. Defaults: System / Classic / Versus. The lineup and palettes are in [DESIGN.md](./DESIGN.md#themes). Saved per device in Phase 1.
- **Player colors** *(Phase 4, direction agreed)*. A separate viewing option in which seats show their players' equipped colors instead of a theme's. To prevent ugly combinations, it uses **one universal light background and one universal dark background**, and every unlockable color is curated against those two only. A player equips one color for light mode and one for dark mode.

Still open for Phase 4:

- **Color clashes:** if both players' equipped colors are too similar (by perceived color difference), the viewer's own color wins and the opponent falls back to a default.
- Whether a viewer can always force their built-in theme even when opponents have custom colors.

Applies to both: every palette's colors are checked for contrast by an automated test (seat color vs. neutral tile, last-played marker vs. seat color, and so on), so an unreadable combination fails CI. The old "super" theme shipped with an invisible last-played marker for exactly this reason.

**Level and rank are separate.** Rank measures skill: a Glicko-2 rating that maps to league tiers, possibly by season. Level measures how much you've played: XP that unlocks cosmetics. Losing never costs XP.

## Phases

### Phase 0: Foundations (on `rewrite`)
- [x] Confirm the proposed decisions above and record them as ADRs
- [x] Settle the open rule questions in [RULES.md](./RULES.md)
- [ ] Set up the project (Vite, TypeScript, lint, format, CI)
- [ ] Cloudflare project with preview deploys of `rewrite`
- [ ] Port the engine test-first from RULES.md, including tests that pin down the old code's exact behavior

### Phase 1: MVP, then launch
- [ ] Board UI matching the concept design in [DESIGN.md](./DESIGN.md), responsive down to phone width
- [ ] Animations from the DESIGN.md motion list (turn ring, tile fades, mass-capture cascade, flying "+1" chips), with reduced-motion support
- [ ] Turn indicator and move pips, wall placement (swipe, drag and keyboard), New Game, winner display
- [ ] Theme settings: mode (System/Light/Dark) plus a light and a dark theme, from the 6 polished themes (Classic, Bubblegum, Vintage / Versus, Aurora, Dusk), remembered per device. Experimental themes are hidden behind a preview-only switch.
- [ ] Rules page (from RULES.md, with diagrams) and credits page (Paul Vauvrey: game design; Daniel Scalettar: implementation)
- [ ] Accessibility basics (real buttons and labels, focus states, keyboard play)
- [ ] In-game help: a ? button (and the ? key) opening a quick reference to controls and rules without leaving the game
- [ ] **Capacitor checkpoint:** wrap the site and play it on a real iPhone. If it falls short of the polish bar, reconsider a mobile-first UI ([ADR 0001](./adr/0001-web-first-platform.md))
- [ ] **Launch:** point playkindo.com at Cloudflare and retire the `gh-pages` branch

### Phase 2: Features that need no server
- [ ] Saved games in IndexedDB, plus an active games list
- [ ] Replay viewer (step through and scrub the move log)
- [ ] Shareable replay links with the move list encoded in the URL (a full game fits in roughly 100 characters)
- [ ] AI opponent (minimax with alpha-beta search at first, run in a Web Worker so the page doesn't freeze; difficulty levels)
- [ ] Interactive tutorial (scripted positions driven by the engine)
- [ ] Installable PWA with offline play against the AI
- Risk: Safari can delete a site's stored data after weeks without a visit unless it's installed to the home screen. Phase 3 accounts fix this permanently, so say it plainly in the UI.

### Phase 3: Online
- [ ] Backend spike, then decision (ADR)
- [ ] Accounts, with existing local games moved into the account
- [ ] Turn-based online multiplayer with server-checked moves and "your turn" notifications
- [ ] Game history and server-stored replays (private, or anyone with the link)
- [ ] User stats, calculated from move logs

### Phase 4: Longer term
- [ ] Public, filterable replay list
- [ ] Ratings, leagues, leaderboard, matchmaking
- [ ] Levels and XP, unlockable piece colors and **randomly unlocked themes** (inspiration in [DESIGN.md](./DESIGN.md#future-themes-phase-4))
- [ ] Capacitor app-store builds (push notifications, links that open in the app, Sign in with Apple)
- [ ] Live play with presence (both players online at once)
