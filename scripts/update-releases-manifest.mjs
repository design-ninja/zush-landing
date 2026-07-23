#!/usr/bin/env node
// Adds the current release's files to the manifest behind the
// zushapp.com/releases/* redirect route (src/pages/releases/[...file].ts).
// Called by zush-app/scripts/release.sh after the GitHub release is published.
// Usage: node scripts/update-releases-manifest.mjs <version> <build>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [version, build] = process.argv.slice(2);
if (!version || !build) {
  console.error('Usage: update-releases-manifest.mjs <version> <build>');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = join(root, 'src', 'data', 'releasesManifest.json');
const releasesDir = join(root, 'public', 'releases');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const tag = `v${version}`;
const dmg = `Zush-${version}.dmg`;

manifest[dmg] = { asset: dmg, tag };
manifest['Zush.dmg'] = { asset: dmg, tag };
for (const name of readdirSync(releasesDir)) {
  if (name.startsWith(`Zush${build}-`) && name.endsWith('.delta')) {
    manifest[name] = { asset: name, tag };
  }
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`releasesManifest.json updated for ${tag} (${dmg} + build ${build} deltas)`);
