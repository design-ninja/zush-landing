import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

const locales = process.argv.slice(2);
if (locales.length === 0) throw new Error('Pass one or more locales to repair.');

const canonical = {
  accountants: ['invoice-file-naming-convention', 'automatically-rename-invoices-ai', 'how-to-organize-invoices-and-receipts', 'rename-invoices-for-quickbooks-xero'],
  medical: ['how-to-organize-scanned-medical-records-small-practice', 'rename-scanned-documents-automatically', 'cloud-vs-local-ai-file-renaming'],
  photographers: ['ai-photo-renamer-guide', 'best-ways-to-organize-photos-on-mac', 'rename-video-files-with-ai', 'digital-photo-organization-mistakes-to-avoid'],
  legal: ['legal-file-naming-conventions', 'rename-scanned-documents-automatically', 'cloud-vs-local-ai-file-renaming'],
  hr: ['hr-employee-file-naming-convention', 'organize-employee-onboarding-documents', 'organize-candidate-files-recruiting'],
  'real-estate': ['real-estate-document-naming-convention', 'how-to-organize-real-estate-transaction-files', 'rename-docusign-files-by-property-address'],
};

function propertyName(node) {
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) return node.name.text;
  return undefined;
}

function objectProperty(object, name) {
  const property = object.properties.find((item) =>
    ts.isPropertyAssignment(item) && propertyName(item) === name,
  );
  if (!property || !ts.isPropertyAssignment(property)) throw new Error(`Missing object property ${name}`);
  return property.initializer;
}

for (const locale of locales) {
  const file = join('src', 'i18n', 'localizedContent', `${locale}.ts`);
  let source = readFileSync(file, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations])
    .find((item) => ts.isIdentifier(item.name) && item.name.text === 'professions');
  if (!declaration?.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) {
    throw new Error(`${locale}: professions object not found`);
  }

  const replacements = [];
  for (const [profession, expected] of Object.entries(canonical)) {
    const professionObject = objectProperty(declaration.initializer, profession);
    if (!ts.isObjectLiteralExpression(professionObject)) throw new Error(`${locale}/${profession}: not an object`);
    const guidesObject = objectProperty(professionObject, 'guides');
    if (!ts.isObjectLiteralExpression(guidesObject)) throw new Error(`${locale}/${profession}: guides not an object`);
    const slugs = objectProperty(guidesObject, 'slugs');
    if (!ts.isArrayLiteralExpression(slugs) || slugs.elements.length !== expected.length) {
      throw new Error(`${locale}/${profession}: guide slug count mismatch`);
    }
    slugs.elements.forEach((element, index) => {
      replacements.push({
        start: element.getStart(ast),
        end: element.getEnd(),
        value: JSON.stringify(expected[index]),
      });
    });
  }

  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    source = `${source.slice(0, replacement.start)}${replacement.value}${source.slice(replacement.end)}`;
  }
  writeFileSync(file, source);
  console.log(`${locale}: restored ${replacements.length} canonical profession guide slugs`);
}
