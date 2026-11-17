---
status: accepted
date: 2026-11-16
---

# vanilla-extract for styling

All styling uses vanilla-extract (`.css.ts` files) with typed theme contracts built from the design values file (constraint 10). We chose it because robustness matters most here: referencing a color, size or timing that doesn't exist, or a theme that's missing a value, fails the build instead of rendering silently wrong. It also reads the TypeScript design values directly, with no glue code.

## Considered options

- **Tailwind v4:** more established, with the largest community. Rejected because a misspelled class silently produces no style (editor and lint warnings only), its values live in CSS (`@theme`), which works against constraint 10, and Kindo's detailed visuals (notched walls, ring, cascade) would still need custom CSS, giving two styling systems.
- **CSS Modules + CSS variables:** the most portable, but a misspelled variable name fails silently, and generating the variables from the TS values needs glue code.

## Consequences

- vanilla-extract compiles to plain static CSS and has no browser runtime. If the project were abandoned, the site keeps working, and a move to CSS Modules would be a mechanical conversion. This is the hedge against it being smaller than Tailwind.
- Per-game piece colors (Phase 4 cosmetics) are set at runtime through typed CSS variables, not new stylesheets.
