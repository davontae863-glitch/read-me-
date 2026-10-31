// Repository checks run by `npm test` and CI.
// 1. Required shared docs exist and aren't empty.
// 2. No known secret patterns are committed.
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const REQUIRED_FILES = [
  'AGENTS.md',
  'CLAUDE.md',
  'README.md',
  'docs/PROJECT_ARCHITECTURE.md',
  'docs/BUSINESS_PLAN.md',
  'docs/DEVELOPMENT_RULES.md',
  'docs/AI_COLLABORATION.md',
  'docs/DECISION_LOG.md',
  'docs/SECURITY_RULES.md',
  'docs/TASK_QUEUE.md',
];

// Real-looking keys only. Placeholders like sk_test_replace_me are allowed.
export const SECRET_PATTERNS = [
  { name: 'Stripe secret key', re: /\b[sr]k_(live|test)_[A-Za-z0-9]{20,}\b/ },
  { name: 'Stripe webhook secret', re: /\bwhsec_[A-Za-z0-9]{20,}\b/ },
  { name: 'OpenAI key', re: /\bsk-(proj-)?[A-Za-z0-9_-]{32,}\b/ },
  { name: 'Anthropic key', re: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/ },
  { name: 'GitHub token', re: /\b(ghp|gho|ghs|ghu|github_pat)_[A-Za-z0-9_]{20,}\b/ },
  { name: 'Private key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

export function findSecrets(text) {
  return SECRET_PATTERNS.filter((p) => p.re.test(text)).map((p) => p.name);
}

export function missingFiles(exists = defaultExists) {
  return REQUIRED_FILES.filter((f) => !exists(f));
}

function defaultExists(path) {
  try {
    return statSync(path).size > 0;
  } catch {
    return false;
  }
}

function trackedFiles() {
  const out = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' });
  return out.split('\0').filter(Boolean);
}

function main() {
  const problems = [];
  for (const f of missingFiles()) problems.push(`Missing or empty required file: ${f}`);
  for (const file of trackedFiles()) {
    let text;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const name of findSecrets(text)) problems.push(`${name} found in ${file}`);
  }
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
  }
  console.log('Repository checks passed.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
