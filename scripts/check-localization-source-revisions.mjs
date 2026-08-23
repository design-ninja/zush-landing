import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const manifestPath = join(root, 'scripts/localization/source-revisions.json');
const write = process.argv.includes('--write');
const require = createRequire(import.meta.url);
const astroPackageDir = dirname(require.resolve('astro/package.json'));
const { createServer } = await import(
  pathToFileURL(resolve(astroPackageDir, '../vite/dist/node/index.js')).href
);

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function filesUnder(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path)
    .flatMap((name) => filesUnder(join(path, name)))
    .filter((file) => /\.(?:astro|ts|tsx)$/.test(file));
}

function hashFiles(paths) {
  return hash(
    paths
      .flatMap((path) => filesUnder(join(root, path)))
      .sort()
      .map((file) => `${relative(root, file)}\0${readFileSync(file, 'utf8')}`)
      .join('\0'),
  );
}

const server = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  resolve: { alias: { '@': resolve(root, 'src') } },
  server: { middlewareMode: true },
});

let home;
try {
  const { getCopy } = await server.ssrLoadModule('/src/i18n/copy.ts');
  const { getSeoForPath } = await server.ssrLoadModule('/src/seo/config.ts');
  home = hash(JSON.stringify({
    copy: getCopy('en').home,
    seo: getSeoForPath('/'),
    professionsComponent: readFileSync(
      join(root, 'src/components/HomeProfessions/HomeProfessions.astro'),
      'utf8',
    ),
  }));
} finally {
  await server.close();
}

const professionSourcePaths = [
  'src/data/accountantsLanding.ts',
  'src/data/medicalLanding.ts',
  'src/data/photographersLanding.ts',
  'src/data/legalLanding.ts',
  'src/data/hrLanding.ts',
  'src/components/AccountantsLandingPage',
  'src/components/MedicalLandingPage',
  'src/components/PhotographersLandingPage',
  'src/components/LegalLandingPage',
  'src/components/HrLandingPage',
  'src/components/RealEstateLandingPage',
  'src/pages/for-accountants.astro',
  'src/pages/for-medical.astro',
  'src/pages/for-photographers.astro',
  'src/pages/for-legal.astro',
  'src/pages/for-hr.astro',
  'src/pages/for-real-estate.astro',
];

const targets = JSON.parse(
  readFileSync(join(root, 'scripts/localization/top-blog-targets.json'), 'utf8'),
).articles;
const blog = Object.fromEntries(
  targets.map(({ slug }) => [
    slug,
    hash(readFileSync(join(root, 'src/content/blog', `${slug}.mdx`), 'utf8')),
  ]),
);

const revisions = {
  home,
  professions: hashFiles(professionSourcePaths),
  blog,
};

if (write) {
  writeFileSync(manifestPath, `${JSON.stringify(revisions, null, 2)}\n`);
  console.log(`[check-localization-source-revisions] Updated ${manifestPath}.`);
} else {
  if (!existsSync(manifestPath)) {
    throw new Error('Localization source revision manifest is missing. Run this script with --write after all translations are current.');
  }
  const expected = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (JSON.stringify(revisions) !== JSON.stringify(expected)) {
    for (const key of ['home', 'professions']) {
      if (revisions[key] !== expected[key]) {
        console.error(`[check-localization-source-revisions] ${key}: expected ${expected[key]}, received ${revisions[key]}`);
      }
    }
    for (const [slug, revision] of Object.entries(revisions.blog)) {
      if (revision !== expected.blog?.[slug]) {
        console.error(`[check-localization-source-revisions] blog/${slug}: expected ${expected.blog?.[slug] ?? '(missing)'}, received ${revision}`);
      }
    }
    console.error('English localization sources changed. Refresh every affected locale, then run:');
    console.error('node scripts/check-localization-source-revisions.mjs --write');
    process.exitCode = 1;
  } else {
    console.log('[check-localization-source-revisions] English source revisions match the audited locale set.');
  }
}
