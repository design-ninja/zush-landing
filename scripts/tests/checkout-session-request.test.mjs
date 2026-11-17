import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(
  new URL('../../src/utils/checkoutSessionRequest.ts', import.meta.url),
  'utf8',
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const module = { exports: {} };
vm.runInNewContext(outputText, { module, exports: module.exports });
const { checkoutSessionUrl, isPinnedRegionUnavailable } = module.exports;

const SUPABASE = 'https://sjzrgmvinyxjzvshfvjy.supabase.co';
const FUNCTION_URL = `${SUPABASE}/functions/v1/create-paddle-checkout-session`;

test('the first attempt runs the function in the database region', () => {
  assert.equal(
    checkoutSessionUrl(SUPABASE, true),
    `${FUNCTION_URL}?forceFunctionRegion=ap-south-1`,
  );
});

test('the retry lets Supabase pick the nearest region', () => {
  assert.equal(checkoutSessionUrl(SUPABASE, false), FUNCTION_URL);
});

test('only gateway errors send the pinned attempt to the unpinned retry', () => {
  for (const status of [502, 503, 504]) {
    assert.equal(isPinnedRegionUnavailable(status), true, String(status));
  }
  for (const status of [200, 400, 403, 404, 409, 429, 500]) {
    assert.equal(isPinnedRegionUnavailable(status), false, String(status));
  }
});
