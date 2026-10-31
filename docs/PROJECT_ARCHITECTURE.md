# Project architecture

Last updated: 2026-10-31. Stage 1 sets up the repo only; the parts below are the plan for Stage 2+.

## Overview

```
Visitor ──> Site (static pages + tool UI, served by a Cloudflare Worker)
              │
              ├── Free tools: run in the browser, no login
              │
              └── "Subscribe" ──> Stripe Checkout (subscription mode)
                                      │
                                      │ webhook (signed)
                                      ▼
                         Worker API ──> D1 database (subscribers, subscriptions, journal data)
                              │
                              └── Login ──> subscriber-only tools (tracker, journal)

Cancel / update card ──> Stripe Customer Portal
GitHub Actions: tests on every pull request; deploy from main only (added in a later stage)
```

## Technology stack (all free tiers)

| Piece | Choice | Why |
|---|---|---|
| Hosting + API | Cloudflare Workers | Free tier; owner already uses Cloudflare; no cold-start pauses |
| Database | Cloudflare D1 (SQLite) | Free tier; doesn't pause when idle |
| Payments | Stripe Checkout + Customer Portal + webhooks | No monthly fee; Stripe hosts the card form, so we never touch card numbers |
| Front end | Plain HTML/CSS/JS, no framework at first | Fewer dependencies, easy for both AIs to review |
| Tests | Node 22 built-in test runner (`node --test`) | No extra packages |
| Code + CI | GitHub (public repo) + GitHub Actions | Free; branch protection works on public repos |

Open decision: **how subscribers log in.** Options are an email magic link (needs a free email-sending tier) or Stripe-managed identity via the customer portal plus a signed session. To be decided in Stage 2 and recorded in the decision log.

## Billing rules

- Access is granted only while the Stripe subscription status is `active` or `trialing`.
- Events handled: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`, `charge.refunded`.
- Every webhook is verified with the Stripe signing secret before anything is read from it.
- Every event is stored by its Stripe event ID; a repeated event is ignored (idempotent).
- Stripe is the source of truth for billing. Our database is a copy used for access checks.

## Data model (draft)

- `customers`: id, stripe_customer_id, email_hash, created_at
- `subscriptions`: id, customer_id, stripe_subscription_id, status, current_period_end, updated_at
- `stripe_events`: event_id (unique), type, received_at
- `trades` / `challenges`: subscriber journal and prop-firm tracker data (Stage 3)

Store the least customer data possible. Full card details never reach our systems.

## Tool formulas

All money in integer cents internally.

**Position size (futures):**
contracts = floor( risk_amount / (stop_distance_in_ticks × tick_value) ), never below 0.

**Contract specs** (verify against CME before release; tracked as task T-005):

| Symbol | Tick size | Tick value (USD) |
|---|---|---|
| NQ | 0.25 | 5.00 |
| MNQ | 0.25 | 0.50 |
| ES | 0.25 | 12.50 |
| MES | 0.25 | 1.25 |
| GC | 0.10 | 10.00 |
| MGC | 0.10 | 1.00 |

**Prop-firm tracker:** firms' rules differ (trailing vs end-of-day vs static drawdown, daily loss limits, consistency rules). The tracker never assumes a firm's rules; the user enters them, and the tool shows distance to each limit.
