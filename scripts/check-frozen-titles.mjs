import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Guards the <title>/H1 of pages that already rank and convert. Two title
// rewrites in ten days on a ranking comparison cost it half its clicks in
// October 2026, so a title change on one of these pages must be deliberate:
// edit the page, then run with --write to accept the new title.
const root = process.cwd();
const manifestPath = join(root, 'scripts/seo/frozen-titles.json');
const write = process.argv.includes('--write');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const require = createRequire(import.meta.url);
const astroPackageDir = dirname(require.resolve('astro/package.json'));
const { createServer } = await import(
  pathToFileURL(resolve(astroPackageDir, '../vite/dist/node/index.js')).href
);

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return null;
  const raw = match[1].trim();
  return raw.replace(/^["'](.*)["']$/, '$1');
}

const server = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  resolve: { alias: { '@': resolve(root, 'src') } },
  server: { middlewareMode: true },
});

const current = { routes: {}, blog: {} };
try {
  const { getSeoForPath } = await server.ssrLoadModule('/src/seo/config.ts');
  for (const route of Object.keys(manifest.routes)) {
    current.routes[route] = getSeoForPath(route).title;
  }
} finally {
  await server.close();
}
for (const slug of Object.keys(manifest.blog)) {
  const source = readFileSync(join(root, 'src/content/blog', `${slug}.mdx`), 'utf8');
  current.blog[slug] = frontmatterValue(source, 'title');
}

if (write) {
  writeFileSync(manifestPath, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`[check-frozen-titles] Updated ${manifestPath}.`);
  process.exit(0);
}

const drift = [];
for (const [group, entries] of Object.entries(manifest)) {
  for (const [key, expected] of Object.entries(entries)) {
    const actual = current[group][key];
    if (actual !== expected) drift.push({ group, key, expected, actual });
  }
}
if (drift.length) {
  for (const d of drift) {
    console.error(`[check-frozen-titles] ${d.group} ${d.key}\n  frozen:  ${d.expected}\n  current: ${d.actual}`);
  }
  console.error(
    `[check-frozen-titles] ${drift.length} frozen title(s) changed. Ranking pages keep their titles; ` +
    'if the change is deliberate (and measured), run `node scripts/check-frozen-titles.mjs --write`.',
  );
  process.exit(1);
}
console.log(`[check-frozen-titles] ${Object.keys(manifest.routes).length} routes and ${Object.keys(manifest.blog).length} posts unchanged.`);
