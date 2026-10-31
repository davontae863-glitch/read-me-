# Decision log

Newest first.

| Date | Decision | Reason | By |
|---|---|---|---|
| 2026-10-31 | Pull requests go straight to `main`; no `develop` branch | `main` + required review + required CI gives the same safety with fewer merges | Claude, owner to confirm |
| 2026-10-31 | Stack: Cloudflare Workers + D1, plain HTML/JS, Node test runner | All free tiers; owner already has Cloudflare; minimal dependencies | Claude |
| 2026-10-31 | Phase 1 sells web tools (prop-firm tracker, journal, risk calculator), not paid TradingView indicators | Invite-only indicators need TradingView Premium or Ultimate; owner's plan is Essential/Plus and the budget is $0 | Owner + Claude |
| 2026-10-31 | No unofficial TradingView access automation | No official API exists; the workaround needs 2FA turned off and risks the account | Claude |
| 2026-10-31 | Payments: Stripe Checkout subscriptions on our own site | Owner chose control and margins over TradingView's Creator Program | Owner |
| 2026-10-31 | Pricing: Free tier + one monthly paid plan | Owner choice | Owner |
| 2026-10-31 | Brand: OpenRange Labs | Owner choice; no trading business found with the name in a web search | Owner |
| 2026-10-31 | Roles: Claude Code builds, Codex reviews, owner merges | Builder needs the larger plan budget; Codex has built-in PR review | Owner |
