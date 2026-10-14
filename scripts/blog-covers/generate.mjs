#!/usr/bin/env node
// Renders blog covers into src/assets/blog-thumbnails/<slug>.webp.
//
//   pnpm blog:covers              # every post listed in covers.mjs
//   pnpm blog:covers <slug> ...   # only these posts
//
// Covers are 1448×1086 (4:3); keep the subject centred so the 16:9 homepage
// tiles crop nothing.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { COVERS } from './covers.mjs';
import { coverPage } from './motifs.mjs';
import { openRenderer } from './render.mjs';

const ROOT = new URL('../../', import.meta.url).pathname;
const BLOG_DIR = join(ROOT, 'src/content/blog');
const OUT_DIR = join(ROOT, 'src/assets/blog-thumbnails');

// English source posts; translations (translationOf) reuse the source cover.
const sourcePosts = readdirSync(BLOG_DIR)
  .filter((file) => /\.mdx?$/.test(file))
  .filter((file) => !/^translationOf:/m.test(readFileSync(join(BLOG_DIR, file), 'utf8')))
  .map((file) => file.replace(/\.mdx?$/, ''));

const missing = sourcePosts.filter((slug) => !COVERS[slug]);
if (missing.length) {
  console.error(`No cover defined in scripts/blog-covers/covers.mjs for:\n  ${missing.join('\n  ')}`);
  process.exitCode = 1;
}

const requested = process.argv.slice(2);
const slugs = requested.length ? requested : Object.keys(COVERS);

const renderer = await openRenderer({ width: 724, height: 543 });
for (const slug of slugs) {
  const spec = COVERS[slug];
  if (!spec) throw new Error(`Unknown cover: ${slug}`);
  const png = await renderer.shoot(coverPage(spec, slug));
  await sharp(png).webp({ quality: 92, effort: 6 }).toFile(join(OUT_DIR, `${slug}.webp`));
  console.log(`✓ ${slug}`);
}
await renderer.close();
