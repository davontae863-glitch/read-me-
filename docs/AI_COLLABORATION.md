# How Claude Code and Codex work together

The two AIs are not connected directly. They work through **GitHub**: branches, pull requests and pull request comments. Both read the same rules in `AGENTS.md`. Nothing is passed by copy-pasting chat messages.

## The loop

| Step | Who | What happens | Where |
|---|---|---|---|
| 1 | Owner or Claude | A task is added with acceptance criteria | `docs/TASK_QUEUE.md` |
| 2 | Claude Code | Reads the project, builds the task on `claude/<id>-<name>` | Branch |
| 3 | Claude Code | Runs `npm test`, opens a pull request with the template | Pull request |
| 4 | CI | Runs checks and tests | GitHub Actions |
| 5 | Codex | Reviews automatically (or on `@codex review`), comments with **must fix** / **suggestion** findings | Pull request comments |
| 6 | Claude Code | Reads the review, fixes every **must fix**, replies to each finding, pushes | Same branch |
| 7 | Codex | Re-reviews if asked (`@codex review`) | Pull request |
| 8 | Owner | Merges once CI passes and no **must fix** findings are open | `main` |
| 9 | Claude Code | Task queue and decision log are updated in the same pull request | Docs |

## When tests fail

CI marks the pull request red and shows the failing test output. Claude reads the failed run (`gh run view --log-failed`), fixes it on the same branch, and pushes again. A red pull request is never merged.

## Avoiding conflicts

- One task per branch. One AI per branch at a time.
- A task marked `in progress` in the queue belongs to its owner until it's merged or handed back.
- Codex only pushes to a Claude branch when someone comments `@codex fix it`; Claude pulls before continuing.

## What needs a human

- Merging into `main`.
- Turning on Codex code review for the repo (friend's Codex account) — see `docs/OWNER_SETUP.md`.
- Anything involving money, live payments, production deploys, or deleting data.

## Honesty rule

If a step was done manually (for example, a review pasted in by a person), say so in the pull request. Never present manual steps as automation.
