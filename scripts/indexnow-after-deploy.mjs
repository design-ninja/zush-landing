#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Pure orchestration with an injected status reader keeps deployment selection testable.
export async function resolveDeploymentPair(deployments, statusesFor, head) {
  const production = deployments.filter(d =>
    d.environment?.toLowerCase() === 'production' && !d.transient_environment
  ).sort((a, b) => b.id - a.id);
  let current;
  for (const deployment of production) {
    const statuses = await statusesFor(deployment.id);
    if (!current) {
      if (statuses[0]?.state !== 'success') continue;
      if (deployment.sha !== head) {
        throw new Error('Local HEAD is not the latest successful production deployment. Wait for Vercel READY before submitting.');
      }
      current = deployment;
      continue;
    }
    if (deployment.sha !== head && statuses.some(s => s.state === 'success')) {
      return { current, previous: deployment };
    }
  }
  throw new Error(current
    ? 'No previous successful production commit found; refusing an unbounded IndexNow submission.'
    : 'No successful production deployment found.');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--dry-run')) throw new Error('Usage: node scripts/indexnow-after-deploy.mjs [--dry-run]');
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const run = (command, commandArgs) => execFileSync(command, commandArgs, {
    cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 10 * 1024 * 1024,
  }).trim();
  const repo = run('gh', ['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner']);
  const head = run('git', ['rev-parse', 'HEAD']);
  const api = endpoint => JSON.parse(run('gh', ['api', '--paginate', '--slurp', endpoint])).flat();
  const deployments = api(`repos/${repo}/deployments?per_page=100`);
  const { current, previous } = await resolveDeploymentPair(deployments,
    id => api(`repos/${repo}/deployments/${id}/statuses?per_page=100`), head);
  if (!/^[a-f0-9]{40}$/.test(previous.sha)) throw new Error('Invalid previous deployment SHA');
  // Fail if history is unavailable; do not silently broaden to a recent-time window.
  const since = run('git', ['log', '-1', '--format=%cI', previous.sha]);
  const changed = run('git', ['diff', '--name-only', previous.sha, head]);
  console.log(`[indexnow] Production ${current.id}: ${previous.sha.slice(0, 8)}..${head.slice(0, 8)}`);
  const temporary = mkdtempSync(path.join(tmpdir(), 'zush-indexnow-'));
  const changedFile = path.join(temporary, 'changed-files.txt');
  try {
    writeFileSync(changedFile, changed, 'utf8');
    execFileSync(process.execPath, [path.join(root, 'scripts/indexnow-ping.mjs'),
      '--changed-files', changedFile, ...args], {
      cwd: root, stdio: 'inherit', windowsHide: true,
      env: { ...process.env, INDEXNOW_SINCE: since },
    });
  } finally {
    unlinkSync(changedFile);
    rmdirSync(temporary);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(`[indexnow] ${error.message}`); process.exitCode = 1; });
}
