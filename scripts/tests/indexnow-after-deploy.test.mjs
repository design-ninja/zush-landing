import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveDeploymentPair } from '../indexnow-after-deploy.mjs';

const deployment = (id, sha, environment = 'Production') => ({ id, sha, environment });
test('ignores failed builds and previews, and compares to the previous successful production', async () => {
  const deployments = [deployment(4, 'preview', 'Preview'), deployment(3, 'head'), deployment(2, 'failed'), deployment(1, 'base')];
  const statuses = {3: [{state: 'success'}], 2: [{state: 'failure'}], 1: [{state: 'inactive'}, {state: 'success'}]};
  const pair = await resolveDeploymentPair(deployments, id => statuses[id], 'head');
  assert.equal(pair.current.id, 3);
  assert.equal(pair.previous.sha, 'base');
});
test('refuses a local commit that is not deployed yet', async () => {
  await assert.rejects(resolveDeploymentPair([deployment(2, 'new'), deployment(1, 'old')],
    id => [{state: id === 2 ? 'in_progress' : 'success'}], 'new'), /Local HEAD/);
});
test('skips redeployments of the same commit when finding the baseline', async () => {
  const pair = await resolveDeploymentPair([deployment(3, 'head'), deployment(2, 'head'), deployment(1, 'base')],
    () => [{state: 'success'}], 'head');
  assert.equal(pair.previous.sha, 'base');
});
test('refuses to submit without a successful baseline', async () => {
  await assert.rejects(resolveDeploymentPair([deployment(1, 'head')], () => [{state: 'success'}], 'head'), /previous successful/);
});
