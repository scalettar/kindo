---
status: accepted
date: 2026-11-16
---

# Host on Cloudflare Workers, deployed only from GitHub Actions

playkindo.com is served by Cloudflare Workers with static assets. GitHub Actions runs typecheck, lint, tests and build, then deploys with `wrangler`. Merging to `master` is the release, and every PR gets a preview URL. Nothing deploys unless CI passes. This replaces the manual `npm run deploy` to GitHub Pages.

## Considered options

- **Cloudflare's built-in Git builds:** simpler, but they deploy whether or not tests pass.
- **Cloudflare Pages:** still supported, but new features go to Workers.
- **GitHub Pages:** no preview URLs, no server code, and page URLs like `/rules` need a workaround.
- **Vercel / Netlify:** Vercel's free tier is non-commercial only (a problem if cosmetics are ever sold), and neither sits with the domain's planned DNS on Cloudflare.

## Consequences

- Static traffic is free and unlimited. React Router's official Cloudflare template means server rendering (for example replay link previews) is a config change later. Turning it on raises the lock-in, so revisit this ADR then.
- The domain (registered at Squarespace, moving to Cloudflare DNS separately) only needs a DNS record pointed at the Worker, so it doesn't block launch.
