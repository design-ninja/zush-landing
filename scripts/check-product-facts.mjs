import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const constants = readFileSync(join(root, 'src/constants.ts'), 'utf8');
const macChangelog = readFileSync(join(root, 'src/content/changelog.md'), 'utf8');
const windowsChangelog = readFileSync(join(root, 'src/content/changelog.windows.md'), 'utf8');

function readConstant(name) {
  const match = constants.match(new RegExp(`export const ${name} = ["']([^"']+)["']`));
  assert(match, `Missing ${name} in src/constants.ts`);
  return match[1];
}

function readLatestVersion(markdown, label) {
  const match = markdown.match(/^##\s*\[(\d+(?:\.\d+){2,})\]/m);
  assert(match, `Missing latest version heading in ${label} changelog`);
  return match[1];
}

assert.equal(
  readConstant('MAC_APP_VERSION'),
  readLatestVersion(macChangelog, 'Mac'),
  'MAC_APP_VERSION must match the latest Mac changelog release.',
);
assert.equal(
  readConstant('WINDOWS_APP_VERSION'),
  readLatestVersion(windowsChangelog, 'Windows'),
  'WINDOWS_APP_VERSION must match the latest Windows changelog release.',
);

console.log('[check-product-facts] OK: schema and machine-readable versions match both changelogs.');
