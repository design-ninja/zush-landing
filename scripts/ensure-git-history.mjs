#!/usr/bin/env node
/**
 * Deepen the git checkout so the sitemap can read each page's true last-commit
 * date.
 *
 * Vercel (and some CI providers) clone with `--depth=10`. Our sitemap derives
 * <lastmod> from `git log -1 -- <file>`; for any file whose last change is
 * older than the shallow window, that command returns nothing and the sitemap
 * falls back to the filesystem mtime — a meaningless date that makes lastmod
 * untrustworthy to crawlers. Unshallowing before the build fixes this.
 *
 * Safe on full clones (skips) and safe when the network fetch fails (build
 * proceeds with whatever history is available — no worse than before).
 */
import { execSync } from 'node:child_process';

function run(command) {
  return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
}

function tryRun(command) {
  try {
    execSync(command, { stdio: ['ignore', 'ignore', 'ignore'] });
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

console.log('[git-history] Shallow clone detected; fetching full history for accurate sitemap lastmod...');
if (tryRun('git fetch --unshallow --quiet') || tryRun('git fetch --deepen=500 --quiet')) {
  console.log('[git-history] History deepened.');
} else {
  console.warn('[git-history] Could not deepen history; sitemap lastmod may fall back to file mtimes.');
}
