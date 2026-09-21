import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveCutoff, selectChangedEntries } from '../indexnow-ping.mjs';

const NOW = Date.parse('2026-09-21T00:00:00Z');
const entries = [
  { loc: 'https://zushapp.com/', lastmod: '2026-09-20T10:00:00Z' },
  { loc: 'https://zushapp.com/mac', lastmod: '2026-09-18T09:00:00Z' },
  { loc: 'https://zushapp.com/windows', lastmod: '2026-07-01T09:00:00Z' },
  { loc: 'https://zushapp.com/blog', lastmod: undefined },
  { loc: 'https://zushapp.com/pricing', lastmod: 'not-a-date' },
];

const locsAfter = (since) => selectChangedEntries(entries, resolveCutoff(since, NOW).cutoff)
  .map((entry) => entry.loc);

test('the deploy timestamp selects only URLs changed after it', () => {
  assert.deepEqual(locsAfter('2026-09-19T00:00:00Z'), [
    'https://zushapp.com/',
    'https://zushapp.com/blog',
    'https://zushapp.com/pricing',
  ]);
});

test('a page last modified by the previous deploy is not resubmitted', () => {
  // The batch-mode bug: consecutive deploys re-sent the same window of URLs.
  const previousDeploy = '2026-09-20T10:00:00Z';
  assert.ok(!locsAfter(previousDeploy).includes('https://zushapp.com/'));
});

test('missing or unparsable lastmod is always submitted', () => {
  const locs = locsAfter('2026-09-20T23:00:00Z');
  assert.deepEqual(locs, ['https://zushapp.com/blog', 'https://zushapp.com/pricing']);
});

test('without a deploy timestamp the cutoff falls back to the recent window', () => {
  const { cutoff, description } = resolveCutoff(undefined, NOW);
  assert.equal(cutoff, NOW - 48 * 60 * 60 * 1000);
  assert.match(description, /48h/);
});

test('an unparsable deploy timestamp falls back instead of submitting everything', () => {
  const { cutoff } = resolveCutoff('deployment-42', NOW);
  assert.equal(cutoff, NOW - 48 * 60 * 60 * 1000);
  assert.deepEqual(locsAfter('deployment-42'), [
    'https://zushapp.com/',
    'https://zushapp.com/blog',
    'https://zushapp.com/pricing',
  ]);
});
