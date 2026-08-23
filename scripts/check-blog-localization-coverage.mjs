import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const blogRoot = join(root, 'src/content/blog');
const targets = JSON.parse(
  readFileSync(join(root, 'scripts/localization/top-blog-targets.json'), 'utf8'),
).articles;
const locales = ['de', 'fr', 'es', 'pt-br', 'it', 'nl', 'tr', 'ja', 'ko', 'zh-cn', 'ar'];
const strict = process.argv.includes('--strict');
const protectedTerms = [
  'Zush',
  'RenameClick',
  'Renamer.ai',
  'FilesDesk',
  'NameQuick',
  'AI Renamer',
  'Riffo',
  'BYOK',
  'Ollama',
  'QuickBooks',
  'Xero',
  'DocuSign',
  'PowerRename',
  'Finder',
  'File Explorer',
];
const allowedUntranslatedLinkLabels = new Set([
  ...protectedTerms,
  'Advanced Renamer',
  'Files Magic AI',
  'rename.click',
  '`ozgrozer/ai-renamer`',
]);
const titleQualityPatterns = {
  de: [/\bAI-(?:Datei|Renamer)/i, /Dateiumbenennungsprogramme/i],
  fr: [/^Apps IA de renommage/i],
  es: [/\bAI\b/],
  'pt-br': [/\bcloud\b/i, /^Melhor organizador de arquivos com IA.*7 apps/i],
  ja: [/^AI Renamer アプリ比較/i],
};

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'));
  return match?.[1]?.trim();
}

function localeTranslations(locale) {
  const directory = join(blogRoot, locale);
  if (!existsSync(directory)) return new Map();

  return new Map(
    readdirSync(directory)
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const source = readFileSync(join(directory, name), 'utf8');
        return [frontmatterValue(source, 'translationOf'), { name, source }];
      })
      .filter(([translationOf]) => Boolean(translationOf)),
  );
}

function importLines(source) {
  return source
    .split('\n')
    .filter((line) => line.startsWith('import '))
    .sort()
    .join('\n');
}

function countExact(source, value) {
  return source.split(value).length - 1;
}

function countMatches(source, pattern) {
  return (source.match(pattern) ?? []).length;
}

function likelyVisibleEnglishLines(source) {
  const lines = [];
  let inFence = false;

  for (const rawLine of source.split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence || line.startsWith('import ') || line.startsWith('<')) continue;

    const englishWords = line.match(/\b[A-Za-z]{3,}\b/g) ?? [];
    if (line.length >= 80 && englishWords.length >= 10) lines.push(line);
  }

  return lines;
}

const missing = [];
const invalid = [];
const deferredParity = new Set();

const contentIdOwners = new Map();
for (const entry of readdirSync(blogRoot, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.mdx')) {
    const id = entry.name.slice(0, -4);
    contentIdOwners.set(id, [...(contentIdOwners.get(id) ?? []), entry.name]);
    continue;
  }

  if (!entry.isDirectory()) continue;
  for (const name of readdirSync(join(blogRoot, entry.name))) {
    if (!name.endsWith('.mdx')) continue;
    const id = name.slice(0, -4);
    contentIdOwners.set(id, [...(contentIdOwners.get(id) ?? []), `${entry.name}/${name}`]);
  }
}

for (const [id, owners] of contentIdOwners) {
  if (owners.length > 1) {
    invalid.push(`duplicate Astro content id ${JSON.stringify(id)}: ${owners.join(', ')}`);
  }
}

for (const locale of locales) {
  const translations = localeTranslations(locale);

  for (const { slug, translationSync } of targets) {
    const item = translations.get(slug);
    if (!item) {
      missing.push(`${locale}: ${slug}`);
      continue;
    }

    if (frontmatterValue(item.source, 'locale') !== locale) {
      invalid.push(`${locale}/${item.name}: locale frontmatter mismatch`);
    }

    const title = frontmatterValue(item.source, 'title') ?? '';
    if ((titleQualityPatterns[locale] ?? []).some((pattern) => pattern.test(title))) {
      invalid.push(`${locale}/${item.name}: title needs editorial review: ${JSON.stringify(title)}`);
    }

    if (/ZXQ|QXZ/i.test(item.source)) {
      invalid.push(`${locale}/${item.name}: unreplaced translation placeholder`);
    }

    if (/\]\s+\(/.test(item.source)) {
      invalid.push(`${locale}/${item.name}: broken Markdown link spacing`);
    }
    if (/\[[^\]\n]*\s+\]\(/.test(item.source)) {
      invalid.push(`${locale}/${item.name}: trailing whitespace inside Markdown link label`);
    }
    if (/\)\s+[.,;:!?]/.test(item.source)) {
      invalid.push(`${locale}/${item.name}: whitespace before punctuation after Markdown link`);
    }

    const englishSource = readFileSync(join(blogRoot, `${slug}.mdx`), 'utf8');
    if (importLines(item.source) !== importLines(englishSource)) {
      invalid.push(`${locale}/${item.name}: MDX imports differ from English source`);
    }

    if (translationSync === 'deferred') {
      deferredParity.add(slug);
    } else {
      const structuralPatterns = [
        ['headings', /^#{2,6}\s+/gm],
        ['Markdown links', /(?<!!)\[[^\]]*\]\([^)]+\)/g],
        ['images', /!\[[^\]]*\]\([^)]+\)/g],
        ['Blog components', /<Blog[A-Z][A-Za-z]+\b/g],
      ];
      for (const [label, pattern] of structuralPatterns) {
        const expected = countMatches(englishSource, pattern);
        const actual = countMatches(item.source, pattern);
        if (actual !== expected) {
          invalid.push(`${locale}/${item.name}: ${label} count ${actual}, expected ${expected}`);
        }
      }

      for (const term of protectedTerms) {
        const expected = countExact(englishSource, term);
        const actual = countExact(item.source, term);
        const localizedTitleTranslation =
          term === 'AI Renamer' &&
          actual === expected - 1 &&
          (frontmatterValue(englishSource, 'title') ?? '').includes(term) &&
          !title.includes(term);
        if (localizedTitleTranslation) continue;
        if (actual !== expected) {
          invalid.push(`${locale}/${item.name}: protected term ${JSON.stringify(term)} count ${actual}, expected ${expected}`);
        }
      }
    }

    const localizedLines = new Set(item.source.split('\n').map((line) => line.trim()));
    const unchangedProse = likelyVisibleEnglishLines(englishSource).filter((line) =>
      localizedLines.has(line),
    );
    if (unchangedProse.length > 0) {
      invalid.push(
        `${locale}/${item.name}: ${unchangedProse.length} long English prose line(s) unchanged`,
      );
    }

    if (locale === 'ar') {
      const untranslatedLinkLabels = [...item.source.matchAll(/(?<!!)\[([^\]]+)\]\([^)]+\)/g)]
        .map((match) => match[1].trim())
        .filter((label) => {
          if (allowedUntranslatedLinkLabels.has(label) || /[\u0600-\u06ff]/.test(label)) return false;
          return (label.match(/\b[A-Za-z]{3,}\b/g) ?? []).length >= 2;
        });
      if (untranslatedLinkLabels.length > 0) {
        invalid.push(
          `${locale}/${item.name}: ${untranslatedLinkLabels.length} English Markdown link label(s) unchanged`,
        );
      }
    }
  }
}

const translated = targets.length * locales.length - missing.length;
console.log(`[check-blog-localization-coverage] ${translated}/${targets.length * locales.length} target translations present.`);
if (deferredParity.size > 0) {
  console.log(`[check-blog-localization-coverage] Structural parity deferred for: ${[...deferredParity].join(', ')}.`);
}

if (invalid.length > 0) {
  console.error(`Invalid translations:\n- ${invalid.join('\n- ')}`);
}

if (missing.length > 0) {
  console.log(`Missing translations:\n- ${missing.join('\n- ')}`);
}

if (invalid.length > 0 || (strict && missing.length > 0)) {
  process.exitCode = 1;
}
