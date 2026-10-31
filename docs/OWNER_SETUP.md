# Owner setup — steps only a human can do

AIs can't create accounts, log in for you, or change security settings. Do these yourself. Never paste passwords or keys into a chat.

## 1. Add your friend as a collaborator (Davontae)
GitHub → this repo → **Settings → Collaborators → Add people** → their GitHub username → **Write** access. They accept the email invite.

## 2. Connect Codex code review (friend)
Paste the setup prompt (in the project chat) into ChatGPT. It walks through connecting Codex to GitHub and enabling code review for `davontae863-glitch/read-me-`, using OpenAI's current official docs. Check whether your ChatGPT plan includes Codex code review first. If the repo owner must approve the Codex GitHub app, Davontae approves it.

## 3. Protect `main` (Davontae) — after the first pull request has run CI once
GitHub → **Settings → Branches → Add branch ruleset** (or "Add rule") for `main`:
- Require a pull request before merging, with 1 approval
- Require status checks to pass → select **checks**
- Block force pushes
- Do not allow bypassing the above settings (optional; leave off if you want to be able to fix emergencies)

## 4. Stripe test account (Davontae) — before task T-006
Create a free Stripe account at stripe.com. Stay in **test mode**. Don't enter bank details until you decide to go live. When T-006 starts, Claude will tell you exactly which test keys to add and where — as secrets, never in chat.

## 5. Cloudflare (Davontae) — before task T-004 deploys
Use your existing Cloudflare account. Claude will tell you which API token permissions to create (Workers + D1 only) and where to store it (GitHub Actions secret).
