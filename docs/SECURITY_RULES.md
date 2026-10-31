# Security rules

## Secrets

- Never commit API keys, Stripe keys, webhook signing secrets, tokens or passwords.
- Local secrets live in `.dev.vars` (ignored by git). An example with fake values lives in `.dev.vars.example`.
- Production secrets are set with `wrangler secret put` or GitHub Actions secrets, by the owner.
- CI runs `scripts/check.mjs`, which fails the build if a known secret pattern is committed.
- If a secret is ever committed: rotate it in the provider's dashboard first, then remove it from the code.

## Payments

- Card details are entered only on Stripe-hosted pages. Our code never sees card numbers.
- Every Stripe webhook is signature-verified before use.
- Test mode only until the owner approves going live.
- Refunds, price changes and payouts are done by the owner in the Stripe dashboard.

## Customer data

- Collect only what the tools need. Emails stored as a hash where the plain address isn't required.
- No customer data in URLs, logs or error messages.
- Subscriber journal data is visible only to that subscriber.

## Access and approvals

| Action | Who may do it |
|---|---|
| Merge to `main` | Owner only |
| Deploy to production | CI from `main` only, after tests pass |
| Spend money / enable paid features | Owner only |
| Delete data, rewrite git history, force-push | Owner approval required |
| Change Stripe live settings | Owner only |

- Least privilege: API tokens get only the permissions their job needs (for example, Cloudflare token limited to Workers + D1 for one account).
- Important actions (deploys, webhook failures, subscription changes) are logged without personal data.
- Backups: weekly database export once D1 is in use (added with the database stage).
