# Kindo Rewrite — Roadmap

A ground-up rebuild of [playkindo.com](https://playkindo.com). The 2019–2020 version on `master` is the reference for game behavior (see [RULES.md](./RULES.md)) and the visual look; everything else, including the stack and hosting, is being replaced.

Work happens on the `rewrite` branch. The live site keeps running from the old code until Phase 1 ships.

## Guiding principles

- **Build properly, in small steps.** Each phase ships something usable; don't one-shot.
- **Keep the look.** Keep the board, tile shapes, wall/crown/bracket icons and the four existing color themes. Polish them, don't redesign them.
- **Design for the roadmap, build for today.** Choose the shapes that keep future goals cheap (see *Architecture constraints*), but don't build infrastructure before a feature needs it.
- **The website comes first.** Mobile reuses the web work instead of competing with it.

## Current state (as of 2026-11-16)

- Create React App + React 16 class components + styled-components 4, about 600 lines of real code.
- All rules live in `src/components/game/game.component.jsx` and `src/utils/functions.utils.js`, and they change state in place.
- Hosting: GitHub Pages (`gh-pages` branch, deployed by hand with `npm run deploy`). The last deploy was 2020-03-30 and matches `master`.
- Domain: `playkindo.com` is registered at Squarespace and will move to Cloudflare DNS separately from this project.
- Hot-seat 2-player only. There's no rules page, no credits page and no theme picker (the 4 themes exist in code but can't be selected).

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

### Platform: web-first, wrapped for mobile

There's one React web app, designed for phones first. It becomes an installable PWA in Phase 2. In Phase 4 it's wrapped with **Capacitor** for the App Store and Play Store.

Considered:

- **Expo / React Native for everything (react-native-web).** You get one UI, but the website is built from React Native parts instead of HTML/CSS. That means weaker styling, SEO and bundle size on the platform that matters most. It's also hard to reverse, since all the UI would be React Native.
- **Separate web app and native Expo app.** This feels the most native, but every screen (replays, leaderboards, profiles, cosmetics, tutorial) gets built twice. It's only worth it with dedicated mobile effort.

Escape hatch: the engine, data access and state logic contain no UI code. If the Capacitor app ever feels too much like a website, an Expo UI can be built on top of them later, and only the views get rewritten.

### Stack

- TypeScript (strict), Vite, React 19, React Router
- CSS Modules + CSS custom properties for theming (styled-components is in maintenance mode, and runtime CSS-in-JS isn't needed)
- Icons converted from PNG to SVG so they scale and can be recolored
- Vitest + Testing Library, with Playwright for full-game tests later
- ESLint (flat config) + Prettier, pnpm, GitHub Actions CI (typecheck, lint, test, build)

### Hosting: Cloudflare

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

1. **Pure engine.** `src/engine/` has no React or browser code (a lint rule enforces this). It provides `createGame()`, `applyMove(state, move)` (returns a new state or an error) and `legalMoves(state)`. The same engine serves the UI, the AI, the tutorial and server-side move checking.
2. **Games are stored as their initial setup plus a move list.** The current board is computed by replaying the moves. Replays, undo, sharing, multiplayer sync, stats and tutorial scripts all build on this.
3. **Versioned records.** Every stored game records its rules version and data format version, so old games still replay after rule tweaks.
4. **Seats have controllers.** P1 and P2 are each controlled by a local human, the AI or a remote player. One board screen serves hot-seat, AI and online play.
5. **Game storage behind one interface.** It uses browser storage (IndexedDB) in Phase 2 and the server in Phase 3, and the screens don't change.
6. **Seat colors are resolved, never hard-coded.** The board reads `--seat-1` and `--seat-2` from one `resolveSeatColors()` function. It returns the theme's defaults today and accounts for cosmetics later (see below).
7. **Board coordinates use `row`/`col`,** never the old code's `x` (which was actually the row).

## Visual system: themes vs. unlockable colors

There are two separate layers:

- **Board theme.** The environment: background, empty and neutral tiles, shadows, UI elements. Themes are built-in, curated and polished. Each theme is marked light or dark. Settings: mode (system / light / dark), plus which theme to use in light mode and which in dark mode.
- **Piece color.** The color of the tiles a player owns. Every theme has default P1/P2 colors. In Phase 4, unlockable colors can replace *your own* piece color.

Proposed rules for unlockables (Phase 4, open for discussion):

- Each unlockable color is designed as a **light/dark pair** and checked for contrast against every built-in theme. That keeps it polished. A player equips one color for light mode and one for dark mode.
- **Color clashes:** if both players' colors are too similar (measured by perceived color difference), the viewer's own color wins and the opponent falls back to the theme's default for their seat.
- There's a viewer setting to show opponents' custom colors or always use theme defaults.
- Local games (hot-seat, vs AI) use theme defaults, or your equipped color for your own seat.

**Level and rank are separate.** Rank measures skill: a Glicko-2 rating that maps to league tiers, possibly by season. Level measures how much you've played: XP that unlocks cosmetics. Losing never costs XP.

## Phases

### Phase 0: Foundations (on `rewrite`)
- [ ] Confirm the proposed decisions above and record them as ADRs
- [ ] Settle the open rule questions in [RULES.md](./RULES.md)
- [ ] Set up the project (Vite, TypeScript, lint, format, CI)
- [ ] Cloudflare project with preview deploys of `rewrite`
- [ ] Port the engine test-first from RULES.md, including tests that pin down the old code's exact behavior

### Phase 1: MVP, then launch
- [ ] Board UI matching the current look, responsive down to phone width
- [ ] Turn indicator and move pips, wall picker (tap and keyboard), New Game, winner display
- [ ] Theme switcher: the 4 existing themes, light/dark aware, remembered between visits
- [ ] Rules page (from RULES.md, with diagrams) and credits page (Paul Vauvrey: game design; Daniel Scalettar: implementation)
- [ ] Accessibility basics (real buttons and labels, focus states, keyboard play)
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
- [ ] Levels and XP, unlockable piece colors
- [ ] Capacitor app-store builds (push notifications, links that open in the app, Sign in with Apple)
- [ ] Live play with presence (both players online at once)
