# AGENTS.md — shared rules for every AI on this project

This file is read by OpenAI Codex (and any other agent). Claude Code reads the same rules through `CLAUDE.md`.
The repository is the single source of truth. Do not rely on chat history.

## The project

**OpenRange Labs** — a subscription website of trading tools for futures day traders (NQ, ES, GC first).
Owner: Davontae Williams (GitHub `davontae863-glitch`). Budget to start: **$0 CAD**.
Business details: `docs/BUSINESS_PLAN.md`. System design: `docs/PROJECT_ARCHITECTURE.md`.

## Roles

| Who | Role | May | May not |
|---|---|---|---|
| Claude Code | Lead developer | Write code on `claude/*` branches, open pull requests, fix review findings | Merge to `main`, deploy to production, change live payment settings |
| Codex | Independent reviewer and architect | Review pull requests, open issues, push fixes only when asked with `@codex fix it` | Merge to `main`, push to `main`, approve its own changes |
| Owner (human) | Final decision-maker | Merge to `main`, approve anything that costs money, go live | — |

Nobody merges a pull request that has not been reviewed and has failing checks.

## Workflow

1. Tasks live in `docs/TASK_QUEUE.md`. Each has an ID, owner, acceptance criteria, tests, status.
2. The builder works on a branch named `claude/<task-id>-<short-name>` (or `codex/...`).
3. The builder opens a pull request into `main` using the template, links the task ID.
4. Codex reviews (automatically, or on `@codex review`). Findings go in pull request comments.
5. The builder fixes every **must fix** finding and replies to each one.
6. CI must pass. The owner merges.
7. The builder updates `docs/TASK_QUEUE.md` and `docs/DECISION_LOG.md` in the same pull request.

Full detail: `docs/AI_COLLABORATION.md`.

## Hard rules (both AIs)

- Never commit secrets: API keys, Stripe keys, webhook secrets, passwords, tokens. Use environment variables and `.dev.vars` (ignored by git). See `docs/SECURITY_RULES.md`.
- Stripe stays in **test mode** until the owner approves going live in writing.
- Never spend money, start a paid plan, or enable a paid feature. Propose it to the owner instead.
- Money is stored as integer cents with a currency code. Never use floating point for money.
- No trading signals, no performance promises, no "guaranteed" or "win rate" marketing. These are tools, not advice. Every page carries the risk disclaimer.
- Do not copy code, text, names or designs from competitors (for example FibAlgo). Original work only.
- Do not delete files, rewrite history or force-push without the owner's approval.
- Do not automate TradingView access through unofficial APIs, and never ask anyone to turn off two-factor login.

## Code Review Rules

Reviewers: give specific findings with file, line, what is wrong, and how to fix it. Label each one **must fix** or **suggestion**. Do not approve because another AI wrote it.

Always check:
- **Security:** secrets in code or logs; Stripe webhook signature verified before trusting any event; auth checks on every subscriber-only route; input validation; no customer data in URLs or logs.
- **Billing logic:** a subscription grants access only while Stripe says it is `active` or `trialing`; access is removed on cancellation, failed payment past the grace period, or refund; webhooks are idempotent (the same event twice changes nothing).
- **Money and maths:** integer cents only; position-size and drawdown calculations match the formulas in `docs/PROJECT_ARCHITECTURE.md`; contract specs (tick size, tick value) are correct for each symbol.
- **Tests:** new behaviour has tests; edge cases (zero, negative, missing input) are covered.
- **Claims:** no wording that promises profit or implies financial advice.
- **Complexity:** flag anything that could be simpler or that adds a paid dependency.

Leave formatting and lint issues to CI.
