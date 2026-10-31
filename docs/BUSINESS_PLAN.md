# Business plan

Last updated: 2026-10-31. Items marked **(owner to decide)** need Davontae's approval before they are built or published.

## Business model

A monthly subscription to web-based trading tools, sold on our own site with Stripe.
Subscribers log in and use the tools in the browser. Access starts and stops automatically with the Stripe subscription, so no human step is needed per customer.

| Tier | Price | What's included |
|---|---|---|
| Free | $0 | Position-size and risk calculator; free protected TradingView indicators |
| Pro (monthly) | **(owner to decide)** | Prop-firm challenge tracker, trading journal with stats, every future tool |

Phase 2 (only after subscription revenue covers it, and only with owner approval): upgrade TradingView to Premium and add invite-only indicators to Pro. Until then, TradingView indicators are free protected scripts used to build an audience.

## Target customers

- Futures day traders on NQ, ES, GC and their micros (MNQ, MES, MGC).
- Traders working through prop-firm evaluations (funded-account challenges) who need to track drawdown, profit targets and rules.
- Traders who trade the 8:30 AM New York economic-data window and want a pre-session plan.

## Why they'd pay

- Prop-firm rules (trailing drawdown, daily loss limits, consistency rules) are easy to break by accident; a tracker that warns you first saves real money.
- Existing options are mostly static spreadsheets sold once (Etsy, CA$2–60, crowded) or large journal SaaS products. A focused, low-cost futures toolkit sits between them.

## Product research criteria

Before building any new tool, record in `docs/DECISION_LOG.md`:
1. The exact buyer and the job the tool does for them.
2. Evidence people want it (competitor listings, prices, forum questions), with links and the date checked.
3. Whether it can be built and run on free infrastructure.
4. That it gives no trading signals and makes no performance claims.

## Financial restrictions

- Starting budget: **$0 CAD**. No paid plans, ads, domains or tools without the owner's written approval.
- Costs only out of revenue: Stripe's per-transaction fees.
- Stripe stays in test mode until the owner approves launch.
- Sales tax: the owner confirms obligations (GST/HST and any foreign tax) with CRA or an accountant before going live. Stripe Tax is a paid add-on and is off unless approved.

## Brand

Name: **OpenRange Labs**. A web search on 2026-10-31 found no trading business using it; "opening range" is a common trading term used in many indicator names. A formal trademark search (CIPO in Canada, USPTO in the US) has not been done **(owner to decide)**.

## Compliance

- Tools, education and tracking only. No signals, no trade calls, no "win rate" or profit promises.
- Risk disclaimer on every page and in every TradingView script description.
- TradingView scripts follow TradingView's House Rules and vendor requirements (no prices in script descriptions, no unsubstantiated claims).
