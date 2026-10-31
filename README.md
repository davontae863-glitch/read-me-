# OpenRange Labs

Trading tools for futures day traders, sold as a monthly subscription.
Built by Claude Code, reviewed by Codex, owned and merged by Davontae Williams.

**Status:** Stage 1 — foundations. No app code yet; nothing is live.

## What's here

| Path | What it is |
|---|---|
| `AGENTS.md` | Shared rules for every AI (Codex reads this) |
| `CLAUDE.md` | Claude Code's pointer to the shared rules |
| `docs/BUSINESS_PLAN.md` | Product, customers, pricing, money rules |
| `docs/PROJECT_ARCHITECTURE.md` | Tech stack, data model, billing flow, formulas |
| `docs/AI_COLLABORATION.md` | How Claude and Codex work together |
| `docs/DEVELOPMENT_RULES.md` | Coding conventions |
| `docs/SECURITY_RULES.md` | Secrets, customer data, approvals |
| `docs/TASK_QUEUE.md` | Every task, who owns it, its status |
| `docs/DECISION_LOG.md` | Why things are the way they are |
| `docs/OWNER_SETUP.md` | Steps only a human can do (accounts, logins) |

## Run the checks

```
npm test
```

Runs the repository checks (required docs present, no secrets committed) and all unit tests. Needs Node 22; no accounts.
