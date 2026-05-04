import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const ROOT = process.cwd();
const layoutSource = readFileSync(join(ROOT, 'src/layouts/BaseLayout.astro'), 'utf8');
const configSource = readFileSync(join(ROOT, 'src/i18n/config.ts'), 'utf8');

function fail(message) {
  throw new Error(message);
}

function loadI18nConfig() {
  const compiled = ts.transpileModule(configSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const sandbox = { exports: {} };

  vm.runInNewContext(compiled, sandbox, { filename: 'src/i18n/config.ts' });

  return sandbox.exports;
}

function extractAutoDetectScript() {
  const match = layoutSource.match(
    /<script is:inline define:vars=\{\{ autoDetectRoute, localeRedirectConfig \}\}>\s*([\s\S]*?)\s*<\/script>/,
  );

  if (!match?.[1]) {
    fail('Locale autodetect inline script was not found in BaseLayout.astro.');
  }

  return match[1];
}

function makeStorage(initial = {}) {
  const values = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}

const autoDetectScript = extractAutoDetectScript();
const { LOCALE_META, getLocalesForRoute } = loadI18nConfig();

if (LOCALE_META.en.slug !== '') {
  fail('This regression check expects the default English locale to use an empty slug.');
}

function getLocaleRedirectConfig(route) {
  const routeLocales = getLocalesForRoute(route);

  return JSON.stringify({
    ...Object.fromEntries(
      routeLocales.map((locale) => [
        LOCALE_META[locale].lang.toLowerCase(),
        LOCALE_META[locale].slug || '',
      ]),
    ),
    pt: LOCALE_META['pt-br'].slug,
    zh: LOCALE_META['zh-cn'].slug,
  });
}

function runAutoDetect({
  route = '/',
  languages,
  language = languages[0] ?? '',
  localStorage = {},
  sessionStorage = {},
  search = '',
  hash = '',
}) {
  const redirects = [];
  const window = {
    localStorage: makeStorage(localStorage),
    sessionStorage: makeStorage(sessionStorage),
    location: {
      search,
      hash,
      replace(nextUrl) {
        redirects.push(nextUrl);
      },
    },
  };

  vm.runInNewContext(
    autoDetectScript,
    {
      autoDetectRoute: route,
      localeRedirectConfig: getLocaleRedirectConfig(route),
      navigator: { languages, language },
      window,
      URLSearchParams,
    },
    { filename: 'src/layouts/BaseLayout.astro locale autodetect' },
  );

  return redirects.at(-1) ?? null;
}

function assertRedirect(name, options, expectedRedirect) {
  const actualRedirect = runAutoDetect(options);

  if (actualRedirect !== expectedRedirect) {
    fail(`${name}: expected ${expectedRedirect ?? 'no redirect'}, got ${actualRedirect ?? 'no redirect'}.`);
  }
}

assertRedirect(
  'English preference must stop before later French preference',
  { languages: ['en-US', 'ru', 'en', 'fr'] },
  null,
);

assertRedirect(
  'French preference redirects from the homepage',
  { languages: ['fr', 'en-US'] },
  '/fr',
);

assertRedirect(
  'French preference preserves route, search, and hash',
  {
    route: '/ai-file-renamer',
    languages: ['fr', 'en-US'],
    search: '?checkout=pro',
    hash: '#pricing',
  },
  '/fr/ai-file-renamer?checkout=pro#pricing',
);

assertRedirect(
  'Portuguese base language maps to the pt-br localized route',
  { languages: ['pt-PT', 'en-US'] },
  '/pt-br',
);

assertRedirect(
  'Selected English locale suppresses browser-language redirect',
  {
    languages: ['fr', 'en-US'],
    localStorage: { 'zush-locale': 'en' },
  },
  null,
);

console.log('[check-locale-autodetect] OK: 5 locale autodetect scenarios validated.');
