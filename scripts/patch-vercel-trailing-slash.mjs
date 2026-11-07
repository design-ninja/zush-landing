#!/usr/bin/env node
// @astrojs/vercel turns `trailingSlash: 'never'` into a first route that 308s
// every `/path/` to `/path`. PostHog's endpoints (`/e/s/`, `/e/i/v0/e/`, …) all
// end with a slash, so every analytics request through the /e proxy paid an
// extra redirect hop — and on the Hobby plan each hop counts as a CDN request.
// Exclude the proxy prefix so `/e/*/` goes straight to the vercel.json rewrite.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(repoRoot, '.vercel/output/config.json');
const ADAPTER_SRC = '^/(.*)/$';
const PATCHED_SRC = '^/(?!e/)(.*)/$';

const config = JSON.parse(await readFile(configPath, 'utf8'));
const route = config.routes?.find(
  (entry) => entry.status === 308 && (entry.src === ADAPTER_SRC || entry.src === PATCHED_SRC),
);

if (!route) {
  console.error(`[patch-vercel-trailing-slash] No trailing-slash route ${ADAPTER_SRC} in ${configPath}`);
  process.exit(1);
}

route.src = PATCHED_SRC;
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
console.log(`[patch-vercel-trailing-slash] ${ADAPTER_SRC} -> ${PATCHED_SRC}`);
