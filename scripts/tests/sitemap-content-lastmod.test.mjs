import assert from 'node:assert/strict';
import test from 'node:test';
import { isInScope, pageFingerprint, stripIgnoredElements } from '../sitemap-content-lastmod.mjs';

const page = (main, { title = 'Zush', description = 'Rename files.' } = {}) =>
  `<html><head><title>${title}</title><meta name="description" content="${description}"></head>`
  + `<body><header>Nav</header><main id="main-content">${main}</main><footer>Footer</footer></body></html>`;

test('scope leaves blog, blog lists and docs to their file dates', () => {
  assert.equal(isInScope('/'), true);
  assert.equal(isInScope('/de/ai-file-sorter'), true);
  assert.equal(isInScope('/blog'), false);
  assert.equal(isInScope('/ja/blog/some-post'), false);
  assert.equal(isInScope('/blog/tags/pdf-documents'), false);
  assert.equal(isInScope('/docs/get-started'), false);
});

test('ignored elements are removed with nested children and void tags', () => {
  const html = '<p>Keep</p><section data-lastmod-ignore><div><img src="a.png"><p>Drop</p></div><br/></section><p>Also keep</p>';
  assert.equal(stripIgnoredElements(html), '<p>Keep</p><p>Also keep</p>');
  assert.equal(
    stripIgnoredElements('<section data-lastmod-ignore="">x</section><section data-lastmod-ignored>y</section>'),
    '<section data-lastmod-ignored>y</section>',
  );
});

test('fingerprint follows page text, title and description only', () => {
  const base = pageFingerprint(page('<h1>Sort files</h1><section data-lastmod-ignore>$10/month Black Friday</section>'));
  assert.equal(base, pageFingerprint(page('<h1>Sort files</h1><section data-lastmod-ignore>$8/month</section>')));
  assert.equal(base, pageFingerprint(page('<h1 class="x">Sort   files</h1><script>var t = 1</script><section data-lastmod-ignore></section>')));
  assert.notEqual(base, pageFingerprint(page('<h1>Sort every file</h1>')));
  assert.notEqual(base, pageFingerprint(page('<h1>Sort files</h1>', { description: 'Sort files by content.' })));
});

test('app version numbers do not move the fingerprint', () => {
  assert.equal(
    pageFingerprint(page('<p>Latest: v3.26.0 for Mac, 3.19.6.0 for Windows</p>')),
    pageFingerprint(page('<p>Latest: v3.26.1 for Mac, 3.19.7.0 for Windows</p>')),
  );
});
