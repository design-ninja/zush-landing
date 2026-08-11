import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const origin = 'https://zushapp.com';
const locales = ['de', 'fr', 'es', 'pt-br', 'it', 'nl', 'tr', 'ja', 'ko', 'zh-cn', 'ar'];
const professions = [
  'for-accountants',
  'for-medical',
  'for-photographers',
  'for-legal',
  'for-hr',
  'for-real-estate',
];
const targets = JSON.parse(
  readFileSync(join(root, 'scripts/localization/top-blog-targets.json'), 'utf8'),
).articles;
const destination = join(root, 'scripts/localization/live-urls.md');

function frontmatterValue(source, key) {
  return source.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'))?.[1]?.trim();
}

function translationsFor(locale) {
  const directory = join(root, 'src/content/blog', locale);
  if (!existsSync(directory)) return new Map();

  return new Map(
    readdirSync(directory)
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const source = readFileSync(join(directory, name), 'utf8');
        return [frontmatterValue(source, 'translationOf'), frontmatterValue(source, 'slug')];
      })
      .filter(([translationOf, slug]) => translationOf && slug),
  );
}

const lines = [
  '# Localization live URLs',
  '',
  'Generated from the locale modules and localized MDX frontmatter.',
  '',
  '## Homepages',
  '',
  `- [English homepage](${origin}/)`,
  ...locales.map((locale) => `- [${locale} homepage](${origin}/${locale})`),
  '',
  '## Localized profession pages',
  '',
  ...locales.flatMap((locale) =>
    professions.map((route) => `- [${locale} /${route}](${origin}/${locale}/${route})`),
  ),
  '',
  '## English top-10 blog sources',
  '',
  ...targets.map(({ slug }) => `- [${slug}](${origin}/blog/${slug})`),
  '',
  '## Localized top-10 blog pages',
  '',
];

for (const locale of locales) {
  const translations = translationsFor(locale);
  for (const { slug: englishSlug } of targets) {
    const localizedSlug = translations.get(englishSlug);
    if (!localizedSlug) {
      throw new Error(`Missing ${locale} translation for ${englishSlug}`);
    }
    lines.push(`- [${locale}: ${localizedSlug}](${origin}/${locale}/blog/${localizedSlug})`);
  }
}

writeFileSync(destination, `${lines.join('\n')}\n`);
console.log(`Wrote ${destination} with ${lines.filter((line) => line.startsWith('- [')).length} URLs.`);
