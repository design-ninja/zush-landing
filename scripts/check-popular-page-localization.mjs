import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
import { frontmatterValue } from './lib/frontmatter.mjs';

const origin = 'https://zushapp.com';
const locales = { de: 'de', fr: 'fr', es: 'es', 'pt-br': 'pt-BR', it: 'it', nl: 'nl', tr: 'tr', ja: 'ja', ko: 'ko', 'zh-cn': 'zh-CN' };
const slugs = ['batch-rename-files-windows-11', 'file-juggler-alternatives', 'best-ai-document-organizers'];
const dist = existsSync('dist/client') ? 'dist/client' : 'dist';
const baseUrl = process.env.LOCALIZATION_BASE_URL;
const sitemap = baseUrl
  ? await fetch(`${baseUrl}/sitemap.xml`).then((response) => {
      assert.ok(response.ok, 'Sitemap should respond successfully');
      return response.text();
    })
  : readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const verifiedPages = [];
const normalize = (value) => value.replace(/\s+/g, ' ').trim();

function descendants(node, output = []) {
  output.push(node);
  for (const child of node.childNodes ?? []) descendants(child, output);
  return output;
}

function text(node) {
  if (node.tagName === 'script' || node.tagName === 'style') return '';
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes ?? []).map(text).join('');
}

function schemaNodes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  if (!value || typeof value !== 'object') return [];
  return [value, ...Object.values(value).flatMap(schemaNodes)];
}

async function checkPage(path, locale, title, alternates, expectedFaqCount, requiredText = []) {
  const file = join(dist, path.slice(1), 'index.html');
  let html;
  let httpStatus = null;
  let finalUrl = null;
  if (baseUrl) {
    const response = await fetch(`${baseUrl}${path}`);
    assert.ok(response.ok, `Route should respond successfully: ${path}`);
    httpStatus = response.status;
    finalUrl = response.url;
    html = await response.text();
  } else {
    assert.ok(existsSync(file), `Missing rendered route: ${path}`);
    html = readFileSync(file, 'utf8');
  }
  const nodes = descendants(parse(html));
  const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
  assert.equal(attr(nodes.find((n) => n.tagName === 'html'), 'lang'), locales[locale], `${path}: html lang`);
  const headings = nodes.filter((n) => n.tagName === 'h1');
  assert.equal(headings.length, 1, `${path}: exactly one H1`);
  assert.equal(normalize(text(headings[0])), normalize(title), `${path}: translated H1`);
  const links = nodes.filter((n) => n.tagName === 'link');
  assert.equal(attr(links.find((n) => attr(n, 'rel') === 'canonical'), 'href'), origin + path, `${path}: canonical`);
  const actualAlternates = new Map(links.filter((n) => attr(n, 'hreflang')).map((n) => [attr(n, 'hreflang'), attr(n, 'href')]));
  for (const [lang, href] of Object.entries(alternates)) assert.equal(actualAlternates.get(lang), origin + href, `${path}: alternate ${lang}`);
  const robots = nodes.find((n) => n.tagName === 'meta' && attr(n, 'name') === 'robots');
  assert.ok(!attr(robots, 'content')?.includes('noindex'), `${path}: indexable`);
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), `${path}: sitemap`);
  const structured = nodes.filter((n) => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json')
    .flatMap((n) => schemaNodes(JSON.parse(n.childNodes.map((child) => child.value ?? '').join(''))));
  const faq = structured.find((n) => n['@type'] === 'FAQPage');
  assert.equal(faq?.mainEntity?.length, expectedFaqCount, `${path}: translated FAQ schema`);
  const visible = normalize(text(nodes[0]));
  for (const phrase of ['Frequently Asked Questions', 'Related Tools', 'No signup', 'Stop renaming files by hand', 'Turn Zush into your automatic file renamer']) {
    assert.ok(!visible.includes(phrase), `${path}: English fallback ${phrase}`);
  }
  for (const value of requiredText) assert.ok(visible.includes(normalize(value)), `${path}: translated content ${value.slice(0, 60)}`);
  verifiedPages.push({ url: origin + path, locale, httpStatus, finalUrl, canonical: attr(links.find((n) => attr(n, 'rel') === 'canonical'), 'href'), hreflangCount: actualAlternates.size, faqCount: faq.mainEntity.length, passed: true });
}

let checked = 0;
for (const locale of Object.keys(locales)) {
  const organizer = JSON.parse(readFileSync(`src/i18n/aiFileOrganizer/${locale}.json`, 'utf8'));
  const organizerAlternates = { en: '/ai-file-organizer', 'x-default': '/ai-file-organizer', ...Object.fromEntries(Object.entries(locales).map(([code, lang]) => [lang, `/${code}/ai-file-organizer`])) };
  await checkPage(`/${locale}/ai-file-organizer`, locale, organizer.h1, organizerAlternates, organizer.faqItems.length,
    [organizer.workflow.heading, organizer.workflow.limit, organizer.workflow.image.caption, ...organizer.relatedBlogPosts.map((post) => post.title)]);
  checked++;
  for (const slug of slugs) {
    const source = readFileSync(`src/content/blog/${locale}/${slug}-${locale}.mdx`, 'utf8');
    const alternates = { en: `/blog/${slug}`, 'x-default': `/blog/${slug}`, ...Object.fromEntries(Object.entries(locales).map(([code, lang]) => [lang, `/${code}/blog/${slug}-${code}`])) };
    const english = readFileSync(`src/content/blog/${slug}.mdx`, 'utf8');
    const expectedFaqCount = (english.slice(english.indexOf('## FAQ')).match(/^###\s+/gm) ?? []).length;
    await checkPage(`/${locale}/blog/${slug}-${locale}`, locale, frontmatterValue(source, 'title'), alternates, expectedFaqCount);
    checked++;
  }
}
console.log(`[check-popular-page-localization] ${checked}/40 localized pages: H1, language, canonical, hreflang, sitemap, FAQ schema, content and CTA fallbacks passed.`);

if (process.env.LOCALIZATION_REPORT_FILE) {
  writeFileSync(process.env.LOCALIZATION_REPORT_FILE, JSON.stringify({ checkedAt: new Date().toISOString(), baseUrl: baseUrl ?? 'local-build', pages: verifiedPages }, null, 2) + '\n');
}
