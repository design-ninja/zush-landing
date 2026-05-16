import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';

const ROOT = process.cwd();
const DEFAULT_CONFIG_PATH = join(ROOT, 'scripts/youtube-videos.json');
const TOKEN_PATH = join(ROOT, 'scripts/.youtube-oauth-token.json');
const RESULTS_PATH = join(ROOT, 'scripts/.youtube-upload-results.json');
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const YOUTUBE_UPLOAD_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';
const VALID_PRIVACY_STATUSES = new Set(['private', 'unlisted', 'public']);
const SHELL_ENV_KEYS = new Set(Object.keys(process.env));

function usage() {
  console.log(`Usage:
  pnpm youtube:auth
  pnpm youtube:dry-run
  pnpm youtube:upload -- --privacy private

Commands:
  auth       Authorize the Zush YouTube channel and store a local refresh token.
  dry-run    Validate and print the upload plan without calling YouTube.
  upload     Upload enabled videos from scripts/youtube-videos.json.

Options:
  --only id[,id]          Upload or dry-run only selected video ids.
  --privacy status       Override privacy: private, unlisted, or public.
  --include-disabled     Include videos marked "enabled": false.
  --skip-thumbnails      Do not upload thumbnails.
  --force                Re-upload videos already present in local results.
  --notify-subscribers   Ask YouTube to notify subscribers for new uploads.
  --config path          Upload manifest path. Default: scripts/youtube-videos.json.
  --port number          OAuth localhost callback port. Default: 8787.

Environment:
  GOOGLE_CLIENT_ID       OAuth 2.0 client id from Google Cloud.
  GOOGLE_CLIENT_SECRET   OAuth 2.0 client secret from Google Cloud.
  YOUTUBE_REDIRECT_PORT  Optional default OAuth callback port.
`);
}

function fail(message) {
  console.error(`\n[youtube-upload] ${message}`);
  process.exit(1);
}

function readJson(path, fallback = undefined) {
  if (!existsSync(path)) {
    if (fallback !== undefined) return fallback;
    fail(`Missing file: ${path}`);
  }

  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const source = readFileSync(path, 'utf8');
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (SHELL_ENV_KEYS.has(key)) continue;

    const value = rawValue
      .trim()
      .replace(/^['"]|['"]$/g, '');
    process.env[key] = value;
  }
}

function loadLocalEnv() {
  loadEnvFile(join(ROOT, '.env'));
}

function parseArgs(argv) {
  const [command = 'help', ...rest] = argv;
  const options = {
    command,
    only: undefined,
    privacy: undefined,
    includeDisabled: false,
    skipThumbnails: false,
    force: false,
    notifySubscribers: false,
    configPath: DEFAULT_CONFIG_PATH,
    port: Number(process.env.YOUTUBE_REDIRECT_PORT || 8787),
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    switch (arg) {
      case '--':
        break;
      case '--only':
        options.only = new Set((rest[++index] || '').split(',').map((item) => item.trim()).filter(Boolean));
        break;
      case '--privacy':
        options.privacy = rest[++index];
        break;
      case '--include-disabled':
        options.includeDisabled = true;
        break;
      case '--skip-thumbnails':
        options.skipThumbnails = true;
        break;
      case '--force':
        options.force = true;
        break;
      case '--notify-subscribers':
        options.notifySubscribers = true;
        break;
      case '--config':
        options.configPath = resolve(ROOT, rest[++index] || '');
        break;
      case '--port':
        options.port = Number(rest[++index]);
        break;
      case '--help':
      case '-h':
        options.command = 'help';
        break;
      default:
        fail(`Unknown option: ${arg}`);
    }
  }

  if (options.privacy && !VALID_PRIVACY_STATUSES.has(options.privacy)) {
    fail(`Invalid --privacy value: ${options.privacy}`);
  }

  if (!Number.isInteger(options.port) || options.port < 1024 || options.port > 65535) {
    fail(`Invalid OAuth callback port: ${options.port}`);
  }

  return options;
}

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    fail('Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET in .env or your shell.');
  }

  return { clientId, clientSecret };
}

function getRedirectUri(port) {
  return `http://127.0.0.1:${port}/oauth2callback`;
}

async function authorize(options) {
  const { clientId, clientSecret } = getOAuthClient();
  const redirectUri = getRedirectUri(options.port);
  const state = randomBytes(24).toString('hex');
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: YOUTUBE_UPLOAD_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });
  const authUrl = `${AUTH_URL}?${params.toString()}`;

  console.log('\nOpen this URL in your browser and authorize the Google account that owns or manages the Zush YouTube channel:\n');
  console.log(authUrl);
  console.log(`\nWaiting for OAuth callback on ${redirectUri} ...`);

  const code = await waitForOAuthCode(options.port, state);
  const tokenResponse = await postForm(TOKEN_URL, {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  if (!tokenResponse.refresh_token) {
    fail('Google did not return a refresh token. Re-run auth and make sure prompt=consent is shown.');
  }

  saveToken(tokenResponse);
  console.log(`\nAuthorization complete. Token saved to ${TOKEN_PATH}`);
}

function waitForOAuthCode(port, expectedState) {
  return new Promise((resolveCode, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);

      if (url.pathname !== '/oauth2callback') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const state = url.searchParams.get('state');
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`OAuth failed: ${error}`);
        server.close();
        reject(new Error(`OAuth failed: ${error}`));
        return;
      }

      if (!code || state !== expectedState) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Invalid OAuth callback. Return to the terminal and keep the auth command running.');
        console.warn(`Ignored invalid OAuth callback: ${describeOAuthCallback(url, expectedState)}`);
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Zush YouTube uploader is authorized. You can close this tab.');
      server.close();
      resolveCode(code);
    });

    server.on('error', (error) => {
      reject(error);
    });

    server.listen(port, '127.0.0.1');
  });
}

function describeOAuthCallback(url, expectedState) {
  const state = url.searchParams.get('state');
  const hasCode = url.searchParams.has('code');
  const error = url.searchParams.get('error');

  return JSON.stringify({
    path: url.pathname,
    hasCode,
    stateMatches: state === expectedState,
    receivedState: state ? `${state.slice(0, 8)}...` : null,
    expectedState: `${expectedState.slice(0, 8)}...`,
    error,
  });
}

async function postForm(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    fail(`OAuth token request failed (${response.status}): ${JSON.stringify(data)}`);
  }

  return data;
}

function saveToken(tokenResponse) {
  const existing = readJson(TOKEN_PATH, {});
  const token = {
    ...existing,
    ...tokenResponse,
    expiry_date: Date.now() + Number(tokenResponse.expires_in || 0) * 1000,
  };
  writeJson(TOKEN_PATH, token);
}

async function getAccessToken() {
  const { clientId, clientSecret } = getOAuthClient();
  const token = readJson(TOKEN_PATH);

  if (token.access_token && token.expiry_date && token.expiry_date > Date.now() + 60_000) {
    return token.access_token;
  }

  if (!token.refresh_token) {
    fail('Missing refresh token. Run pnpm youtube:auth first.');
  }

  const refreshed = await postForm(TOKEN_URL, {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: token.refresh_token,
    grant_type: 'refresh_token',
  });

  saveToken({
    ...refreshed,
    refresh_token: token.refresh_token,
  });

  return refreshed.access_token;
}

function readConfig(options) {
  return readJson(options.configPath);
}

function normalizeVideo(defaults, video, options) {
  const filePath = resolve(ROOT, video.file);
  const thumbnailPath = video.thumbnail ? resolve(ROOT, video.thumbnail) : undefined;
  const tags = [...new Set([...(defaults.tags || []), ...(video.tags || [])])];

  return {
    ...video,
    filePath,
    thumbnailPath,
    categoryId: video.categoryId || defaults.categoryId,
    privacyStatus: options.privacy || video.privacyStatus || defaults.privacyStatus || 'private',
    defaultLanguage: video.defaultLanguage || defaults.defaultLanguage,
    notifySubscribers: options.notifySubscribers || video.notifySubscribers || defaults.notifySubscribers || false,
    selfDeclaredMadeForKids: video.selfDeclaredMadeForKids ?? defaults.selfDeclaredMadeForKids ?? false,
    containsSyntheticMedia: video.containsSyntheticMedia ?? defaults.containsSyntheticMedia ?? false,
    tags,
  };
}

function selectVideos(config, options) {
  const defaults = config.defaults || {};
  let videos = (config.videos || []).map((video) => normalizeVideo(defaults, video, options));

  if (!options.includeDisabled) {
    videos = videos.filter((video) => video.enabled !== false);
  }

  if (options.only) {
    videos = videos.filter((video) => options.only.has(video.id));
  }

  return videos;
}

function validateVideos(videos) {
  const seenIds = new Set();
  for (const video of videos) {
    if (!video.id) fail('Every video needs an id.');
    if (seenIds.has(video.id)) fail(`Duplicate video id: ${video.id}`);
    seenIds.add(video.id);

    if (!existsSync(video.filePath)) fail(`Video file does not exist for ${video.id}: ${video.file}`);
    if (video.thumbnailPath && !existsSync(video.thumbnailPath)) {
      fail(`Thumbnail file does not exist for ${video.id}: ${video.thumbnail}`);
    }
    if (!video.title || video.title.length > 100) {
      fail(`Invalid title for ${video.id}. YouTube titles are required and limited to 100 characters.`);
    }
    if (!video.description || Buffer.byteLength(video.description, 'utf8') > 5000) {
      fail(`Invalid description for ${video.id}. YouTube descriptions are required and limited to 5000 bytes.`);
    }
    if (!video.categoryId) fail(`Missing categoryId for ${video.id}.`);
    if (!VALID_PRIVACY_STATUSES.has(video.privacyStatus)) {
      fail(`Invalid privacyStatus for ${video.id}: ${video.privacyStatus}`);
    }

    const tagCharacters = video.tags.join(',').length;
    if (tagCharacters > 500) {
      fail(`Too many tags for ${video.id}. YouTube counts tags and separators toward a 500-character limit.`);
    }
  }
}

function printPlan(videos, options) {
  const results = readJson(RESULTS_PATH, { uploads: {} });
  console.log(`\nUpload plan: ${videos.length} video(s)`);
  for (const video of videos) {
    const previous = results.uploads?.[video.id];
    const status = previous && !options.force ? `already uploaded as ${previous.videoId}` : video.privacyStatus;
    console.log(`- ${video.id}: ${video.title}`);
    console.log(`  file: ${video.file}`);
    console.log(`  status: ${status}`);
    console.log(`  thumbnail: ${video.thumbnail || 'none'}`);
  }
}

async function uploadVideos(options) {
  const config = readConfig(options);
  const videos = selectVideos(config, options);
  validateVideos(videos);
  printPlan(videos, options);

  if (videos.length === 0) {
    console.log('\nNo videos selected.');
    return;
  }

  const accessToken = await getAccessToken();
  const results = readJson(RESULTS_PATH, { uploads: {} });

  for (const video of videos) {
    const previous = results.uploads?.[video.id];
    if (previous && !options.force) {
      console.log(`\nSkipping ${video.id}; already uploaded: https://youtu.be/${previous.videoId}`);
      continue;
    }

    console.log(`\nUploading ${video.id}: ${video.title}`);
    const uploaded = await uploadVideo(accessToken, video);
    console.log(`Uploaded ${video.id}: https://youtu.be/${uploaded.id}`);

    if (!options.skipThumbnails && video.thumbnailPath) {
      try {
        await uploadThumbnail(accessToken, uploaded.id, video);
        console.log(`Thumbnail set for ${video.id}.`);
      } catch (error) {
        console.warn(`Thumbnail skipped for ${video.id}: ${error.message}`);
      }
    }

    results.uploads[video.id] = {
      videoId: uploaded.id,
      url: `https://youtu.be/${uploaded.id}`,
      title: video.title,
      privacyStatus: video.privacyStatus,
      uploadedAt: new Date().toISOString(),
    };
    writeJson(RESULTS_PATH, results);
  }

  console.log(`\nDone. Upload results saved to ${RESULTS_PATH}`);
}

async function uploadVideo(accessToken, video) {
  const uploadUrl = new URL('https://www.googleapis.com/upload/youtube/v3/videos');
  uploadUrl.searchParams.set('part', 'snippet,status');
  uploadUrl.searchParams.set('uploadType', 'resumable');
  uploadUrl.searchParams.set('notifySubscribers', String(Boolean(video.notifySubscribers)));

  const fileSize = statSync(video.filePath).size;
  const body = {
    snippet: {
      title: video.title,
      description: video.description,
      tags: video.tags,
      categoryId: video.categoryId,
      defaultLanguage: video.defaultLanguage,
    },
    status: {
      privacyStatus: video.privacyStatus,
      selfDeclaredMadeForKids: Boolean(video.selfDeclaredMadeForKids),
      containsSyntheticMedia: Boolean(video.containsSyntheticMedia),
    },
  };

  const initResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Length': String(fileSize),
      'X-Upload-Content-Type': mimeForFile(video.filePath, 'video/mp4'),
    },
    body: JSON.stringify(body),
  });

  if (!initResponse.ok) {
    throw new Error(await describeResponse(initResponse));
  }

  const location = initResponse.headers.get('location');
  if (!location) {
    throw new Error('YouTube did not return a resumable upload URL.');
  }

  const uploadResponse = await fetch(location, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Length': String(fileSize),
      'Content-Type': mimeForFile(video.filePath, 'video/mp4'),
    },
    body: createReadStream(video.filePath),
    duplex: 'half',
  });

  if (!uploadResponse.ok) {
    throw new Error(await describeResponse(uploadResponse));
  }

  return uploadResponse.json();
}

async function uploadThumbnail(accessToken, videoId, video) {
  const prepared = await prepareThumbnail(video);
  if (!prepared) {
    throw new Error(`unsupported thumbnail format: ${video.thumbnail}`);
  }

  const uploadUrl = new URL('https://www.googleapis.com/upload/youtube/v3/thumbnails/set');
  uploadUrl.searchParams.set('videoId', videoId);

  const fileSize = statSync(prepared.path).size;
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Length': String(fileSize),
      'Content-Type': prepared.mime,
    },
    body: createReadStream(prepared.path),
    duplex: 'half',
  });

  if (!response.ok) {
    throw new Error(await describeResponse(response));
  }
}

async function prepareThumbnail(video) {
  const ext = extname(video.thumbnailPath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    return { path: video.thumbnailPath, mime: 'image/jpeg' };
  }
  if (ext === '.png') {
    return { path: video.thumbnailPath, mime: 'image/png' };
  }

  if (ext !== '.webp') {
    return undefined;
  }

  const sharp = await import('sharp').catch(() => undefined);
  if (!sharp?.default) {
    return undefined;
  }

  const outputDir = join(tmpdir(), 'zush-youtube-thumbnails');
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, `${video.id}.png`);
  await sharp.default(video.thumbnailPath).png().toFile(outputPath);
  return { path: outputPath, mime: 'image/png' };
}

async function describeResponse(response) {
  const text = await response.text();
  return `HTTP ${response.status} ${response.statusText}: ${text}`;
}

function mimeForFile(path, fallback) {
  const ext = extname(path).toLowerCase();
  if (ext === '.mp4' || ext === '.m4v') return 'video/mp4';
  if (ext === '.mov') return 'video/quicktime';
  if (ext === '.webm') return 'video/webm';
  return fallback;
}

async function main() {
  loadLocalEnv();
  const options = parseArgs(process.argv.slice(2));

  switch (options.command) {
    case 'auth':
      await authorize(options);
      break;
    case 'dry-run': {
      const config = readConfig(options);
      const videos = selectVideos(config, options);
      validateVideos(videos);
      printPlan(videos, options);
      break;
    }
    case 'upload':
      await uploadVideos(options);
      break;
    case 'help':
      usage();
      break;
    default:
      usage();
      fail(`Unknown command: ${options.command}`);
  }
}

main().catch((error) => {
  fail(error.stack || error.message);
});
