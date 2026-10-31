# Task queue

Statuses: `todo` · `in progress` · `in review` · `done` · `blocked`. Review: `not started` · `requested` · `changes needed` · `approved`.

| ID | Task | Type | Owner | Status | Review |
|---|---|---|---|---|---|
| T-001 | Repo foundations: shared AI docs, PR template, CI checks | Setup | Claude | in review | requested |
| T-002 | Owner setup: branch protection, collaborator, Codex review, Stripe test account | Setup | Owner + friend | todo | — |
| T-003 | Decide subscriber login method and record it | Research | Claude | todo | — |
| T-004 | Worker skeleton: static site, health route, deploy workflow | Development | Claude | todo | — |
| T-005 | Free position-size calculator (NQ, MNQ, ES, MES, GC, MGC) | Development | Claude | todo | — |
| T-006 | Stripe subscription: Checkout, webhooks, Customer Portal (test mode) | Development | Claude | blocked (T-002) | — |
| T-007 | Prop-firm challenge tracker (subscriber-only) | Development | Claude | todo | — |
| T-008 | Trading journal with stats (subscriber-only) | Development | Claude | todo | — |
| T-009 | Site pages: home, pricing, tools, disclaimer, terms, privacy | Development | Claude | todo | — |

## Details

### T-001 Repo foundations
- **Acceptance:** all files in `README.md` exist; `npm test` passes; CI runs on pull requests; Codex can read `AGENTS.md`.
- **Tests:** `test/check.test.mjs` (required docs, secret scan).

### T-002 Owner setup
- **Acceptance:** steps in `docs/OWNER_SETUP.md` done; Codex has left at least one review on a pull request.
- **Tests:** manual — trial review on the T-001 pull request.

### T-003 Login method
- **Acceptance:** decision log entry comparing at least two options, with free-tier limits checked on the provider's own pricing page and the date.

### T-004 Worker skeleton
- **Acceptance:** `/` serves a placeholder page; `/health` returns 200; deploy only from `main` after tests pass.
- **Tests:** route tests with Node test runner.

### T-005 Position-size calculator
- **Acceptance:** results match the formula and contract specs in `PROJECT_ARCHITECTURE.md`; specs checked against CME's contract pages with links in the decision log; zero, negative and missing inputs rejected; disclaimer shown.
- **Tests:** unit tests per symbol plus edge cases.

### T-006 Stripe subscription
- **Acceptance:** test-mode checkout creates an active subscriber; cancel removes access; duplicate webhooks change nothing; unsigned webhooks rejected.
- **Tests:** webhook handler tests with fixture events.

### T-007 / T-008
- Acceptance criteria to be written before work starts.
