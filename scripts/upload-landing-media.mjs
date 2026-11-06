#!/usr/bin/env node
// Syncs media/ (demo recordings, press kit) to the public `landing-media`
// bucket of the Zush Supabase project. See src/utils/mediaUrl.ts.
//
// Usage:
//   SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-landing-media.mjs [--dry-run] [--force]
//
// Files whose size already matches the bucket copy are skipped unless --force
// is passed. Replacing a file under the same name is picked up by Supabase's
// Smart CDN; browsers may keep the old copy for up to CACHE_SECONDS.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_URL = 'https://sjzrgmvinyxjzvshfvjy.supabase.co';
const BUCKET = 'landing-media';
const CACHE_SECONDS = 604800;
const CONTENT_TYPES = { '.mp4': 'video/mp4', '.zip': 'application/zip' };

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaRoot = path.join(repoRoot, 'media');
const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!key && !dryRun) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is required (or pass --dry-run).');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${key}`, apikey: key };

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? listFiles(full) : [full];
    }),
  );
  return files.flat().filter((file) => CONTENT_TYPES[path.extname(file)]);
}

async function ensureBucket() {
  const response = await fetch(`${PROJECT_URL}/storage/v1/bucket/${BUCKET}`, { headers });
  if (response.ok) {
    const bucket = await response.json();
    if (!bucket.public) throw new Error(`Bucket ${BUCKET} exists but is not public`);
    return;
  }
  const created = await fetch(`${PROJECT_URL}/storage/v1/bucket`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
  });
  if (!created.ok) throw new Error(`Creating bucket failed: ${created.status} ${await created.text()}`);
  console.log(`created bucket ${BUCKET}`);
}

async function remoteSize(objectPath) {
  const response = await fetch(`${PROJECT_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`, {
    method: 'HEAD',
  });
  return response.ok ? Number(response.headers.get('content-length')) : undefined;
}

const files = await listFiles(mediaRoot);
if (!dryRun) await ensureBucket();

let uploaded = 0;
for (const file of files) {
  const objectPath = path.relative(mediaRoot, file).split(path.sep).join('/');
  const { size } = await stat(file);
  if (!force && (await remoteSize(objectPath)) === size) {
    console.log(`skip    ${objectPath}`);
    continue;
  }
  if (dryRun) {
    console.log(`upload  ${objectPath} (dry run)`);
    continue;
  }
  const response = await fetch(`${PROJECT_URL}/storage/v1/object/${BUCKET}/${objectPath}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': CONTENT_TYPES[path.extname(file)],
      'Cache-Control': `max-age=${CACHE_SECONDS}`,
      'x-upsert': 'true',
    },
    body: await readFile(file),
  });
  if (!response.ok) throw new Error(`Upload ${objectPath} failed: ${response.status} ${await response.text()}`);
  uploaded += 1;
  console.log(`upload  ${objectPath} (${(size / 1048576).toFixed(1)} MB)`);
}

console.log(`${uploaded} uploaded, ${files.length - uploaded} unchanged`);
