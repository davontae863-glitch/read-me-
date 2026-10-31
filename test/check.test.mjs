import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findSecrets, missingFiles, REQUIRED_FILES } from '../scripts/check.mjs';

test('placeholder keys are allowed', () => {
  assert.deepEqual(findSecrets('STRIPE_SECRET_KEY=sk_test_replace_me\nwhsec_replace_me'), []);
});

test('real-looking Stripe keys are caught', () => {
  const fake = 'sk_live_' + 'a1B2c3D4e5F6g7H8i9J0k1L2';
  assert.deepEqual(findSecrets(`key=${fake}`), ['Stripe secret key']);
});

test('webhook secrets and private keys are caught', () => {
  const hook = 'whsec_' + 'Z'.repeat(24);
  const pem = '-----BEGIN ' + 'RSA PRIVATE KEY-----';
  assert.deepEqual(findSecrets(`${hook}\n${pem}`), ['Stripe webhook secret', 'Private key']);
});

test('ordinary text passes', () => {
  assert.deepEqual(findSecrets('Position size = risk / (ticks * tick value)'), []);
});

test('missing required files are reported', () => {
  const missing = missingFiles((f) => f !== 'AGENTS.md');
  assert.deepEqual(missing, ['AGENTS.md']);
});

test('all required files present passes', () => {
  assert.deepEqual(missingFiles(() => true), []);
  assert.ok(REQUIRED_FILES.includes('docs/TASK_QUEUE.md'));
});
