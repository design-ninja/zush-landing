#!/usr/bin/env node
/**
 * Deepen the git checkout so the sitemap can read each page's true last-commit
 * date.
 *
 * Vercel (and some CI providers) clone with `--depth=10`. Our sitemap derives
 * <lastmod> from `git log -1 -- <file>`; for any file whose last change is
 * older than the shallow window, that command returns nothing and the sitemap
 * falls back to the filesystem mtime — a meaningless date that drifts every
 * deploy and makes lastmod untrustworthy to crawlers. Unshallowing before the
 * build fixes this.
 *
 * On Vercel the origin remote left after the initial clone is not always
 * fetchable, so we re-point it at the public GitHub URL (derived from the
 * VERCEL_GIT_* env vars) before fetching. The repo is public, so no
 * credentials are required.
 *
 * Safe on full clones (skips) and safe when the fetch fails (build proceeds
 * with whatever history is available — no worse than before).
 */
import { execSync } from 'node:child_process';

function run(command) {
  return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
}

function tryRun(command) {
  try {
    execSync(command, { stdio: ['ignore', 'pipe', 'pipe'] });
    return true;
  } catch {
    return false;
  }
}

let isShallow = false;
try {
  isShallow = run('git rev-parse --is-shallow-repository') === 'true';
} catch {
  // Not a git repository (or git unavailable): nothing to deepen.
  process.exit(0);
}

if (!isShallow) {
  console.log('[git-history] Repository already has full history; nothing to deepen.');
  process.exit(0);
}

// On Vercel the clone's origin may not be fetchable; re-point it at the public
// GitHub URL derived from the deployment env so the unshallow fetch can run.
const { VERCEL_GIT_PROVIDER, VERCEL_GIT_REPO_OWNER, VERCEL_GIT_REPO_SLUG } = process.env;
if (VERCEL_GIT_PROVIDER === 'github' && VERCEL_GIT_REPO_OWNER && VERCEL_GIT_REPO_SLUG) {
  const publicUrl = `https://github.com/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}.git`;
  if (tryRun(`git remote set-url origin ${publicUrl}`) || tryRun(`git remote add origin ${publicUrl}`)) {
    console.log(`[git-history] origin re-pointed at ${publicUrl}`);
  }
}

console.log('[git-history] Shallow clone detected; fetching full history for accurate sitemap lastmod...');
if (tryRun('git fetch --unshallow --quiet') || tryRun('git fetch --deepen=2000 --quiet')) {
  const stillShallow = (() => {
    try {
      return run('git rev-parse --is-shallow-repository') === 'true';
    } catch {
      return true;
    }
  })();
  console.log(stillShallow
    ? '[git-history] Fetch ran but repository is still shallow.'
    : '[git-history] History deepened.');
} else {
  console.warn('[git-history] Could not deepen history; sitemap lastmod may fall back to file mtimes.');
}
