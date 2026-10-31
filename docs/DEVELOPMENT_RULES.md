# Development rules

## Branches and commits

- `main` is production. Nobody pushes to it directly; everything arrives by reviewed pull request.
- Branch names: `claude/<task-id>-<short-name>` or `codex/<task-id>-<short-name>`.
- Small pull requests: one task each. Commit messages say what changed and why, in plain words.

## Code

- JavaScript (ES modules), Node 22. Plain HTML/CSS on the front end unless a decision log entry says otherwise.
- No new dependency without a reason in the pull request. Prefer the standard library.
- Money: integer cents plus a currency code. Never floats.
- Validate all input at the edge (API handlers). Reject, don't guess.
- Errors returned to users never include stack traces, keys or internal IDs.
- Functions that do maths (position size, drawdown) are pure and unit-tested.

## Tests

- `npm test` runs everything; CI runs the same command.
- New behaviour needs a test. Bug fixes need a test that failed before the fix.
- Tests never call real Stripe or need real keys; use fixtures and Stripe's test-mode event shapes.

## Docs

- Update `docs/TASK_QUEUE.md` and, for any real decision, `docs/DECISION_LOG.md` in the same pull request.
- User-facing pages always show the risk disclaimer.
