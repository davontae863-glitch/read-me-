## Task
<!-- Task ID from docs/TASK_QUEUE.md, e.g. T-005 -->

## What changed and why

## How it was tested
- [ ] `npm test` passes locally
- [ ] New behaviour has tests

## Reviewer checklist (Codex — see "Code Review Rules" in AGENTS.md)
- [ ] No secrets, keys or customer data in code, logs or URLs
- [ ] Billing: access only while subscription is active/trialing; webhooks verified and idempotent
- [ ] Money in integer cents; formulas match docs/PROJECT_ARCHITECTURE.md
- [ ] No profit promises, signals or advice wording; disclaimer present on user pages
- [ ] No new paid dependency or service
- [ ] Docs updated (TASK_QUEUE, DECISION_LOG if a decision was made)

Findings: label each **must fix** or **suggestion**, with file, line and fix.
