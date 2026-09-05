import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const locales = ['de', 'fr', 'es', 'pt-br', 'it', 'nl', 'tr', 'ja', 'ko', 'zh-cn', 'ar'];
const professions = ['accountants', 'medical', 'photographers', 'legal', 'hr', 'real-estate'];
const guideSlugCounts = {
  'invoice-file-naming-convention': 1,
  'automatically-rename-invoices-ai': 1,
  'how-to-organize-invoices-and-receipts': 1,
  'rename-invoices-for-quickbooks-xero': 1,
  'how-to-organize-scanned-medical-records-small-practice': 1,
  'rename-scanned-documents-automatically': 2,
  'cloud-vs-local-ai-file-renaming': 2,
  'how-to-rename-images-with-ai-on-macos': 1,
  'best-ways-to-organize-photos-on-mac': 1,
  'rename-video-files-with-ai': 1,
  'digital-photo-organization-mistakes-to-avoid': 1,
  'legal-file-naming-conventions': 1,
  'hr-employee-file-naming-convention': 1,
  'organize-employee-onboarding-documents': 1,
  'organize-candidate-files-recruiting': 1,
  'real-estate-document-naming-convention': 1,
  'how-to-organize-real-estate-transaction-files': 1,
  'rename-docusign-files-by-property-address': 1,
};
const root = process.cwd();
const failures = [];
const propertyKey = (key) => `(?:["']${key}["']|${key})`;

for (const locale of locales) {
  const file = join(root, 'src/i18n/localizedContent', `${locale}.ts`);
  if (!existsSync(file)) {
    failures.push(`${locale}: locale-owned landing module is missing`);
    continue;
  }

  const source = readFileSync(file, 'utf8');
  if (!/export const home(?:: HomeCopy)?\s*[=:]/.test(source)) {
    failures.push(`${locale}: full HomeCopy export is missing`);
  }
  if (!/export const professions(?:\s*:\s*ProfessionLocaleCopy)?\s*=/.test(source)) {
    failures.push(`${locale}: ProfessionLocaleCopy export is missing`);
  }
  if (/ZXQ|QXZ/i.test(source)) {
    failures.push(`${locale}: unreplaced translation placeholder`);
  }

  for (const profession of professions) {
    const route = `/for-${profession}`;
    const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`${propertyKey('path')}\\s*:\\s*["']${escapedRoute}["']`).test(source)) {
      failures.push(`${locale}: missing profession route ${route}`);
    }
  }

  const guideSections = (source.match(/(?:["']guides["']|guides)\s*:\s*\{/g) ?? []).length;
  const workflowLinks = (source.match(/(?:["']links["']|links)\s*:\s*\[/g) ?? []).length;
  const testimonialSections = (source.match(/(?:["']testimonials["']|testimonials)\s*:\s*\[/g) ?? []).length;

  if (guideSections !== professions.length) {
    failures.push(`${locale}: expected ${professions.length} guide sections, found ${guideSections}`);
  }
  if (workflowLinks !== professions.length) {
    failures.push(`${locale}: expected ${professions.length} workflow link groups, found ${workflowLinks}`);
  }
  if (testimonialSections !== 2) {
    failures.push(`${locale}: expected 2 testimonial sections, found ${testimonialSections}`);
  }

  for (const [slug, expected] of Object.entries(guideSlugCounts)) {
    const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const actual = (source.match(new RegExp(`["']${escaped}["']`, 'g')) ?? []).length;
    if (actual !== expected) {
      failures.push(`${locale}: guide slug ${slug} occurs ${actual} times, expected ${expected}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Invalid localized landing coverage:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`[check-localized-landing-coverage] ${locales.length} complete homepage modules and ${locales.length * professions.length} profession pages.`);
}
