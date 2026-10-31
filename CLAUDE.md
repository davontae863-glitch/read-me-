# CLAUDE.md

Read `AGENTS.md` first. It holds the shared rules, roles and review rules for this project, and they apply to Claude Code in full.

## Claude Code specifics

- You are the lead developer. Work only on `claude/*` branches and open pull requests into `main`. Never merge.
- Before starting a task, read `docs/TASK_QUEUE.md`, `docs/PROJECT_ARCHITECTURE.md` and the last entries of `docs/DECISION_LOG.md`.
- After Codex reviews a pull request, read every comment (`gh pr view <n> --comments` and the review threads), fix each **must fix**, and reply to each comment saying what changed or why not.
- Run `npm test` before every push. Do not push with failing tests.
- Record every major decision in `docs/DECISION_LOG.md` (date, decision, reason, who).
- Keep `docs/TASK_QUEUE.md` current in the same pull request as the work.
- Ask the owner before anything that costs money, touches live payments, deploys to production, or deletes data.
