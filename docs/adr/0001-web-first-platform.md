---
status: accepted
date: 2026-11-16
---

# Web-first platform, with Capacitor as the path to the app stores

Kindo's UI is a React web app (React DOM), designed for phones first. The goal is a polished, low-maintenance website as a sporadic side project. An app-store app may never ship, and if it does, it comes later by wrapping the same web app with Capacitor. We chose this over Expo/React Native for everything because a plain web app ages gracefully between long breaks (no regular SDK upgrades), keeps the website (where shared replay links open) first-class, and a tap-based 2D board game gains little from native rendering.

## Considered options

- **Expo / React Native everywhere (react-native-web):** one UI and a native app from day one, but a weaker website and ongoing SDK upgrade churn. This was the strongest alternative, because most players may eventually prefer an app.
- **Fully native iOS (Swift) + Android (Kotlin) + web:** three UIs to maintain. LLMs make writing code cheaper, but testing, polish and releases still triple. Not viable for a solo side project.

## Consequences

- **Checkpoint:** at the end of Phase 1, wrap the site with Capacitor and play it on a real iPhone (free through Xcode, no App Store needed). If the feel doesn't meet the polish bar, reconsider a mobile-first UI while there are only a few screens.
- **Pivot cost if we switch later:** the engine, AI, data layer and backend are reused. Screens, styling, gestures and animations are rewritten, and the website keeps its own UI, so there would be two UIs. A switch would most likely go to Expo (one codebase for both phones), not fully native.
- To keep that pivot cheap, game logic and state live outside the React components, which stay thin views over a UI-free core.
