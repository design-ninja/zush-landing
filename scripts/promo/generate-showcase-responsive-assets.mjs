#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const outputDir = path.resolve(
  process.argv.find((arg) => arg.startsWith('--output-dir='))?.split('=')[1] ??
    path.join(repoRoot, 'public/images/showcase/macos'),
);
const widths = [640, 960, 1280, 1600, 1920, 2560];
const rootImagePattern = /^(.*)-(light|dark)\.webp$/;

if (!fs.existsSync(outputDir)) {
  throw new Error(`Showcase directory does not exist: ${outputDir}`);
}

const sources = fs
  .readdirSync(outputDir)
  .map((fileName) => ({ fileName, match: fileName.match(rootImagePattern) }))
  .filter(({ match }) => match && !/-\d+\.webp$/.test(match[1]))
  .sort(({ fileName: left }, { fileName: right }) => left.localeCompare(right));

if (sources.length === 0) {
  throw new Error(`No root showcase images found in ${outputDir}`);
}

let totalBytes = 0;
for (const { fileName, match } of sources) {
  const sourcePath = path.join(outputDir, fileName);
  const source = sharp(sourcePath, { limitInputPixels: false });
  const metadata = await source.metadata();
  if (metadata.width !== 2560 || metadata.height !== 1440) {
    throw new Error(`${fileName} must be 2560x1440; received ${metadata.width}x${metadata.height}.`);
  }

  const [, id, theme] = match;
  for (const width of widths) {
    const outputPath = path.join(outputDir, `${id}-${theme}-${width}.webp`);
    if (width === metadata.width) {
      fs.copyFileSync(sourcePath, outputPath);
    } else {
      await sharp(sourcePath, { limitInputPixels: false })
        .resize({ width, height: Math.round((width * metadata.height) / metadata.width) })
        .webp({ quality: 84, effort: 6, smartSubsample: false })
        .toFile(outputPath);
    }
    totalBytes += fs.statSync(outputPath).size;
  }
}

console.log(
  `Generated ${sources.length * widths.length} responsive showcase assets from ${sources.length} source images ` +
    `(${(totalBytes / 1024 / 1024).toFixed(2)} MiB).`,
);
