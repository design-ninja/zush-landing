import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const astroPackageDir = dirname(require.resolve('astro/package.json'));
const { createServer } = await import(
  pathToFileURL(resolve(astroPackageDir, '../vite/dist/node/index.js')).href
);

const locales = ['de', 'fr', 'es', 'pt-br', 'it', 'nl', 'tr', 'ja', 'ko', 'zh-cn', 'ar'];
const sections = ['header', 'downloadMenu', 'footer', 'pricing'];
const strict = process.argv.includes('--strict');
const allowedExact = new Set([
  'Zush',
  'Zush PRO',
  'PRO',
  'FAQ',
  'Blog',
  'Mac',
  'Mac App Store',
  'Windows',
  'GitHub',
  'LinkedIn',
  'Facebook',
  'YouTube',
  'Google Workspace',
  'Product Hunt',
  'Homebrew',
  'BYOK',
  'Ollama',
  'Paddle',
  'Zush PRO 🌟',
]);
const editorialPatterns = {
  de: [
    /\b(?:AI-Datei|Offline AI|Cloud AI|Client-Vorlag|Personensystem|Sachverhaltsdatensatz|machine)\b/i,
    /Buchhalter,\s*Buchhalter/i,
    /(?:Privat|Lokal) Offline-KI|lokalem Offline-KI|RAW Fotos|Kunden-Vorlagen/i,
    /\bnach\s{2,}/i,
  ],
  fr: [
    /\b(?:Offline AI|Cloud AI|workflow|screenshots?)\b/i,
    /systèmes? de personnes|dossier de cas|support d'origine|DocuSign\s+,/i,
    /teneurs? de livres|équipes? RH et humaines|fichiers? HR consultables|renommage de fichiers IA/i,
    /Avec IA hors ligne|pièces? de découverte|La analyse|fichiers? de propriétés|dossiers? de propriété/i,
  ],
  es: [
    /\bTemplates?\b|archivos?\s+AI\b|visión AI|capacidad de búsqueda/i,
    /otra pasada|ingesta de ayer|no medida|camarógrafos?/i,
    /cambio de nombre de archivos con IA|carpeta de disparo|sistemas? de Personas|expedientes? de Personas/i,
    /\bpor\s{2,}/i,
  ],
  'pt-br': [
    /\bTemplates?\b|screenshots?|Cloud AI|Offline AI/i,
    /nomes? localizáveis|camada de nomes|outra rodada|Aponte para a admissão/i,
    /renomeação offline por IA|equipes? de Pessoas|sistemas? de pessoas|registros? de pessoas/i,
    /da proposta ao arquivo|leia os nomes propostos/i,
    /\bpor\s{2,}/i,
  ],
  ja: [
    /Template|別のパス|摂取量|マシン上|アカウンティング\s*ファイル/i,
    /名前を変更する\s+(?:ベンダー|MRN|プロジェクト|事項|従業員|住所)/,
    /プロパティ\s*ファイル/,
  ],
};

function leaves(value, prefix = '', output = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => leaves(item, `${prefix}[${index}]`, output));
    return output;
  }

  if (!value || typeof value !== 'object') {
    if (typeof value === 'string') output.push([prefix, value]);
    return output;
  }

  for (const [key, child] of Object.entries(value)) {
    leaves(child, prefix ? `${prefix}.${key}` : key, output);
  }
  return output;
}

function shouldReview(value) {
  if (allowedExact.has(value) || /^(?:https?:|mailto:|[#/])/.test(value)) return false;
  return value.trim().split(/\s+/).length >= 3;
}

const server = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  resolve: { alias: { '@': resolve(process.cwd(), 'src') } },
  server: { middlewareMode: true },
});

try {
  const { getCopy } = await server.ssrLoadModule('/src/i18n/copy.ts');
  const english = getCopy('en');
  const failures = [];

  for (const locale of locales) {
    const localized = getCopy(locale);
    for (const section of sections) {
      const englishByPath = new Map(leaves(english[section]));
      for (const [path, value] of leaves(localized[section])) {
        if (value === englishByPath.get(path) && shouldReview(value)) {
          failures.push(`${locale}: ${section}.${path} = ${JSON.stringify(value)}`);
        }
      }
    }

    const englishHomeSeoByPath = new Map(leaves(english.seo['/']));
    for (const [path, value] of leaves(localized.seo['/'])) {
      if (value === englishHomeSeoByPath.get(path) && shouldReview(value)) {
        failures.push(`${locale}: seo./.${path} = ${JSON.stringify(value)}`);
      }
    }

    const { home: localizedHome, professions: localizedProfessions } = await server.ssrLoadModule(
      `/src/i18n/localizedContent/${locale}.ts`,
    );
    const englishHomeByPath = new Map(leaves(english.home));
    for (const [path, value] of leaves(localizedHome)) {
      if (value === englishHomeByPath.get(path) && shouldReview(value)) {
        failures.push(`${locale}: home.${path} = ${JSON.stringify(value)}`);
      }
    }

    const qualityPatterns = editorialPatterns[locale] ?? [];
    for (const [path, value] of [
      ...leaves(localizedHome, 'home'),
      ...leaves(localizedProfessions, 'professions'),
    ]) {
      if (/^(?:https?:|mailto:|[#/])/.test(value)) continue;
      const punctuatedPageTitle =
        qualityPatterns.length > 0 &&
        path.endsWith('.pageTitle') &&
        /[.!?]$/.test(value) &&
        !/RR\.\s?HH\.$/.test(value);
      if (punctuatedPageTitle || qualityPatterns.some((pattern) => pattern.test(value))) {
        failures.push(`${locale}: editorial review required at ${path} = ${JSON.stringify(value)}`);
      }
    }
  }

  if (failures.length === 0) {
    console.log('[check-localized-copy-fallbacks] No likely English fallbacks in homepage copy.');
  } else {
    console.log(`[check-localized-copy-fallbacks] ${failures.length} likely English fallbacks need review:`);
    console.log(`- ${failures.join('\n- ')}`);
    if (strict) process.exitCode = 1;
  }
} finally {
  await server.close();
}
