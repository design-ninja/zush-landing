#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const args = new Set(process.argv.slice(2));

const featureOrder = [
  {
    id: 'batch-rename',
    fixture: 'batch-rename',
    title: 'Batch Rename',
    storeName: '01-batch-rename',
  },
  {
    id: 'monitor',
    fixture: 'monitor',
    title: 'Folder Monitoring',
    storeName: '02-monitor',
  },
  {
    id: 'activity',
    fixture: 'activity',
    title: 'Activity History',
    storeName: '03-activity',
  },
  {
    id: 'statistics',
    fixture: 'statistics',
    title: 'Statistics',
    storeName: '04-statistics',
  },
  {
    id: 'templates',
    fixture: 'templates',
    title: 'Templates',
    storeName: '05-templates',
  },
  {
    id: 'naming-blocks',
    fixture: 'naming-blocks',
    title: 'Naming Blocks',
    storeName: '06-naming-blocks',
  },
  {
    id: 'custom-prompts',
    fixture: 'custom-prompts',
    title: 'Custom Prompts',
    storeName: '08-custom-prompts',
  },
  {
    id: 'byok',
    fixture: 'byok',
    title: 'BYOK',
    storeName: '09-byok',
  },
  {
    id: 'offline-ai',
    fixture: 'offline-ai',
    title: 'Offline AI mode',
    storeName: '10-offline-ai',
  },
];

const defaultAppRepo = path.resolve(repoRoot, '../zush-windows');
const appRepo = path.resolve(process.env.ZUSH_WINDOWS_APP_REPO ?? defaultAppRepo);
const appProject =
  process.env.ZUSH_WINDOWS_APP_PROJECT ??
  path.join(appRepo, 'src/Zush.Windows.App/Zush.Windows.App.csproj');
const fallbackSourceAssetRoots = [
  path.resolve(repoRoot, '../zush-assets/#test files/Files'),
  path.join(appRepo, 'test-assets/Files'),
  path.join(appRepo, 'test-assets/images'),
];
const sourceAssetRoot = path.resolve(
  process.env.ZUSH_PROMO_SOURCE_FILES ??
    firstExistingPath(fallbackSourceAssetRoots) ??
    fallbackSourceAssetRoots[0],
);
loadEnvFiles([
  path.join(appRepo, '.env'),
  path.join(appRepo, 'env'),
  path.join(appRepo, '.env.local'),
  path.join(repoRoot, '.env'),
  path.join(repoRoot, 'env'),
  path.join(repoRoot, '.env.sandbox'),
]);
const defaultLandingOutputDir = path.join(repoRoot, 'public/images/showcase/windows');
const defaultStoreOutputDir = path.resolve(repoRoot, '../zush-assets/Microsoft Store/Windows');
const tempRoot = path.join(os.tmpdir(), `zush-windows-feature-screenshots-${Date.now()}`);
const windir = process.env.WINDIR ?? 'C:\\Windows';
const promoSupabaseUrl = normalizeUrl(
  process.env.ZUSH_WINDOWS_PROMO_SUPABASE_URL ?? 'http://127.0.0.1:9',
);
const promoSupabasePublishableKey =
  process.env.ZUSH_WINDOWS_PROMO_SUPABASE_PUBLISHABLE_KEY ??
  'sb_publishable_promo_screenshots_offline';

const targetConfigs = {
  landing: {
    canvas: { width: 2560, height: 1440 },
    extension: 'webp',
    windowWidth: 1660,
    yBias: 0,
    captureCropPx: 2,
  },
  'microsoft-store': {
    // Microsoft Learn: desktop screenshots must be PNG, 1366x768 or larger, <= 50 MB.
    // 3840x2160 keeps the Store asset crisp while staying well below the size limit.
    canvas: { width: 3840, height: 2160 },
    extension: 'png',
    windowWidth: 2520,
    yBias: 0,
    captureCropPx: 2,
  },
};

const promoAssetSeeds = [
  {
    name: '$_7 copy.jpg',
    candidates: [
      path.join(appRepo, 'test-assets/Files/$_7 copy.jpg'),
      path.join(appRepo, 'test-assets/images/$_7 copy.jpg'),
      path.join(repoRoot, 'public/images/examples/office.jpg'),
    ],
  },
  {
    name: '6.pptx',
    candidates: [
      path.join(appRepo, 'test-assets/Files/6.pptx'),
      path.join(appRepo, 'test-assets/documents/6.pptx'),
    ],
  },
  {
    name: 'Deep_Work_-_Cal_Newport.pdf',
    candidates: [
      path.join(appRepo, 'test-assets/Files/Deep_Work_-_Cal_Newport.pdf'),
      path.join(appRepo, 'test-assets/images/Deep_Work_-_Cal_Newport.pdf'),
    ],
  },
  {
    name: 'Employee Performance.docx',
    candidates: [
      path.join(appRepo, 'test-assets/Files/Employee Performance.docx'),
      path.join(appRepo, 'test-assets/documents/3.docx'),
    ],
  },
  {
    name: 'Untitled.xlsx',
    candidates: [
      path.join(appRepo, 'test-assets/Files/Untitled.xlsx'),
      path.join(appRepo, 'test-assets/documents/10.xlsx'),
    ],
  },
  {
    name: 'apasaric-1388030.jpg',
    candidates: [
      path.join(appRepo, 'test-assets/Files/apasaric-1388030.jpg'),
      path.join(appRepo, 'test-assets/images/pexels-apasaric-1388030.jpg'),
      path.join(repoRoot, 'public/images/examples/building.jpg'),
    ],
  },
  {
    name: 'animated.mp4',
    candidates: [
      path.join(repoRoot, 'public/videos/windows/zush-batch-rename.mp4'),
      path.join(repoRoot, 'public/videos/zush-batch-rename.mp4'),
    ],
  },
  {
    name: 'plus.svg',
    candidates: [
      path.join(appRepo, 'test-assets/Files/plus.svg'),
      path.join(appRepo, 'test-assets/images/plus.svg'),
      path.join(appRepo, 'test-assets/test-vector/plus.svg'),
    ],
  },
  {
    name: 'video-metadata.csv',
    candidates: [
      path.join(appRepo, 'test-assets/Files/video-metadata.csv'),
      path.join(appRepo, 'test-assets/documents/9.csv'),
    ],
  },
  {
    name: 'wedding.jpg',
    candidates: [
      path.join(appRepo, 'test-assets/Files/wedding.jpg'),
      path.join(appRepo, 'test-assets/images/wedding.jpg'),
    ],
  },
  {
    name: 'Chat conversation screenshot.png',
    candidates: [
      path.join(appRepo, 'test-assets/test-png/Chat conversation screenshot.png'),
    ],
  },
];

if (args.has('--help') || args.has('-h')) {
  printHelp();
  process.exit(0);
}

const only = argValue('--only');
const themeArg = argValue('--theme');
const outputDirArg = argValue('--output-dir');
const landingOutputDirArg = argValue('--landing-output-dir');
const storeOutputDirArg = argValue('--store-output-dir') ?? argValue('--microsoft-store-output-dir');
const targetArg = argValue('--targets') ?? argValue('--target');
const appExeArg = argValue('--app-exe');
const buildConfig = argValue('--configuration') ?? 'Debug';
const runtimeIdentifier = argValue('--runtime') ?? 'win-x64';
const settleMs = Number(argValue('--settle-ms') ?? 900);
const selectedTargets = parseTargets(
  targetArg ?? (args.has('--store') || args.has('--microsoft-store') ? 'microsoft-store' : 'landing,microsoft-store'),
);
const explicitThemes = themeArg ? parseThemes(themeArg) : null;
const themesByTarget = Object.fromEntries(
  selectedTargets.map((target) => [target, themesForTarget(target, explicitThemes)]),
);
const selectedThemes = [
  ...new Set(selectedTargets.flatMap((target) => themesByTarget[target])),
];
const selectedFeatures = only
  ? featureOrder.filter((feature) => feature.id === only || feature.fixture === only)
  : featureOrder;
const needsCloudByok = selectedFeatures.some((feature) => feature.fixture === 'byok');
const needsOllama = selectedFeatures.some((feature) =>
  feature.fixture === 'offline-ai' || feature.fixture === 'byok',
);
const promoCloudCredentials = resolvePromoCloudCredentials({
  required: needsCloudByok && !args.has('--dry-run'),
});
let promoOllamaConfig = null;
let startedOllamaPid = null;
const outputDirs = {
  landing: path.resolve(
    landingOutputDirArg ??
      (outputDirArg && selectedTargets.length === 1 ? outputDirArg : defaultLandingOutputDir),
  ),
  'microsoft-store': path.resolve(
    storeOutputDirArg ??
      (outputDirArg && selectedTargets.length === 1 ? outputDirArg : defaultStoreOutputDir),
  ),
};
const wallpaperSources = {
  light:
    process.env.ZUSH_WINDOWS_PROMO_LIGHT_WALLPAPER ??
    firstExistingPath([
      path.join(windir, 'Web/4K/Wallpaper/Windows/img0_3840x2160.jpg'),
      path.join(windir, 'Web/Wallpaper/Windows/img0.jpg'),
    ]),
  dark:
    process.env.ZUSH_WINDOWS_PROMO_DARK_WALLPAPER ??
    firstExistingPath([
      path.join(windir, 'Web/4K/Wallpaper/Windows/img19_3840x2160.jpg'),
      path.join(windir, 'Web/Wallpaper/Windows/img19.jpg'),
      path.join(windir, 'Web/Wallpaper/ThemeB/img24.jpg'),
    ]),
};

if (selectedFeatures.length === 0) {
  throw new Error(`No feature matched --only=${only}`);
}

const storeOutputCount =
  selectedTargets.includes('microsoft-store')
    ? selectedFeatures.length * themesByTarget['microsoft-store'].length
    : 0;
if (storeOutputCount > 10 && !args.has('--allow-store-overflow')) {
  throw new Error(
    `Microsoft Store desktop screenshots support up to 10 images. This run would write ${storeOutputCount}. ` +
      'Use --theme=light, --theme=dark, --only=..., or --allow-store-overflow for a non-upload folder.',
  );
}

await main();

async function main() {
  assertWindowsHostUnlessDryRun();
  assertDebugConfiguration();
  assertOfflineBackendUnlessDryRun();
  if (args.has('--dry-run')) {
    console.log(
      JSON.stringify(
        {
          targets: selectedTargets,
          themesByTarget,
          features: selectedFeatures.map((feature) => feature.id),
          outputDirs,
          supabaseUrl: promoSupabaseUrl,
          sourceAssetRoot,
          cloudByokProvider: promoCloudCredentials?.provider ?? null,
          hasCloudByokKey: Boolean(promoCloudCredentials?.apiKey),
        },
        null,
        2,
      ),
    );
    return;
  }

  const appExe = appExeArg ? path.resolve(appExeArg) : ensureBuiltAndResolveApp();
  assertDebugAppExecutable(appExe);
  if (promoCloudCredentials) {
    await assertPromoCloudConnection(promoCloudCredentials);
  }

  if (needsOllama) {
    promoOllamaConfig = await prepareOllamaForPromo();
  }

  const runId = `zush-windows-promo-${process.pid}-${Date.now()}`;
  const assetRoot = copyFixtureAssets(runId);
  const outputs = [];

  try {
    for (const feature of selectedFeatures) {
      for (const theme of selectedThemes) {
        const capture = await captureFeature({ appExe, feature, theme, runId, assetRoot });
        for (const target of selectedTargets) {
          if (!themesByTarget[target].includes(theme)) {
            continue;
          }

          const outputPath = path.join(
            outputDirs[target],
            outputNameForTarget({ feature, theme, target }),
          );
          await renderComposite({ capture, theme, outputPath, target });
          outputs.push(outputPath);
          console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
        }
      }
    }
  } finally {
    cleanupStartedOllama();
    cleanupTempRoot();
  }

  console.log(`Generated ${outputs.length} screenshot${outputs.length === 1 ? '' : 's'}.`);
}

function printHelp() {
  console.log(`Usage: pnpm promo:windows-feature-screenshots [options]

Generates Windows Zush feature screenshots for the landing page and Microsoft Store.

Options:
  --target=landing,microsoft-store   Targets to generate. Default: both.
  --only=batch-rename                Generate one feature by id.
  --theme=light|dark                 Theme override. Landing defaults to light,dark; Store defaults to light.
  --landing-output-dir=PATH          Default: public/images/showcase/windows
  --store-output-dir=PATH            Default: ../zush-assets/Microsoft Store/Windows
  --app-exe=PATH                     Use an existing Debug Zush.Windows.App.exe.
  --skip-build                       Reuse the latest built Debug app exe.
  --configuration=Debug              Must stay Debug; promo fixtures are DEBUG-only.
  --runtime=win-x64                  dotnet runtime identifier.
  --settle-ms=900                    Extra wait after fixture marker before capture.
  --allow-store-overflow             Allow writing more than 10 Store PNGs.
  --keep-temp                        Keep temp capture files for debugging.

Environment:
  ZUSH_WINDOWS_APP_REPO              Path to zush-windows.
  ZUSH_PROMO_SOURCE_FILES            Source fixture file directory.
  .env/env files                     Loaded from zush-windows and zush-landing roots before env lookup.
  ZUSH_WINDOWS_PROMO_SUPABASE_URL    Local screenshot backend URL. Default: http://127.0.0.1:9
  ZUSH_WINDOWS_PROMO_SUPABASE_PUBLISHABLE_KEY
                                      Local publishable key. Default: offline placeholder.
  ZUSH_WINDOWS_PROMO_AI_PROVIDER      Optional "gemini" or "openai" BYOK provider override.
  ZUSH_WINDOWS_PROMO_GEMINI_API_KEY   Gemini key for BYOK screenshots. Falls back to GEMINI_API_KEY or GOOGLE_API_KEY.
  ZUSH_WINDOWS_PROMO_OPENAI_API_KEY   OpenAI key for BYOK screenshots. Falls back to OPENAI_API_KEY.
  ZUSH_WINDOWS_PROMO_OLLAMA_ENDPOINT  Ollama endpoint. Default: http://127.0.0.1:11434
  ZUSH_WINDOWS_PROMO_OLLAMA_MODEL     Preferred local model. Defaults to gemma3, or the first installed model.
  ZUSH_WINDOWS_PROMO_OLLAMA_EXE       Optional ollama executable path.
  ZUSH_WINDOWS_PROMO_LIGHT_WALLPAPER Windows 11 light wallpaper path.
  ZUSH_WINDOWS_PROMO_DARK_WALLPAPER  Windows 11 dark wallpaper path.
`);
}

function assertWindowsHostUnlessDryRun() {
  if (process.platform !== 'win32' && !args.has('--dry-run')) {
    throw new Error(
      'Windows screenshot capture must run on Windows because it launches and captures the WinUI client. ' +
        'Use --help for options or --dry-run to validate argument parsing.',
    );
  }
}

function assertDebugConfiguration() {
  if (buildConfig.trim().toLowerCase() !== 'debug') {
    throw new Error(
      'Windows promo screenshots must use the Debug configuration so promo fixtures and Pro screenshot state are available.',
    );
  }
}

function assertDebugAppExecutable(appExe) {
  if (!isDebugAppExecutablePath(appExe)) {
    throw new Error(
      `Windows promo screenshots must launch a Debug app build. Refusing app exe: ${appExe}`,
    );
  }
}

function assertOfflineBackendUnlessDryRun() {
  if (args.has('--dry-run')) {
    return;
  }

  if (isLoopbackUrl(promoSupabaseUrl)) {
    return;
  }

  throw new Error(
    `Refusing to run promo screenshots against a non-local Supabase endpoint (${promoSupabaseUrl || '<empty>'}). ` +
      'Leave ZUSH_WINDOWS_PROMO_SUPABASE_URL unset for the offline blackhole, or point it at a loopback Supabase instance.',
  );
}

function resolvePromoCloudCredentials({ required }) {
  const providerOverride = envValue('ZUSH_WINDOWS_PROMO_AI_PROVIDER')?.toLowerCase();
  if (providerOverride && !['gemini', 'openai'].includes(providerOverride)) {
    throw new Error('ZUSH_WINDOWS_PROMO_AI_PROVIDER must be "gemini" or "openai".');
  }

  const geminiKey =
    envValue('ZUSH_WINDOWS_PROMO_GEMINI_API_KEY') ??
    envValue('GEMINI_API_KEY') ??
    envValue('GOOGLE_API_KEY') ??
    (providerOverride === 'gemini' ? envValue('ZUSH_WINDOWS_PROMO_CLOUD_API_KEY') : null);
  const openAiKey =
    envValue('ZUSH_WINDOWS_PROMO_OPENAI_API_KEY') ??
    envValue('OPENAI_API_KEY') ??
    (providerOverride === 'openai' ? envValue('ZUSH_WINDOWS_PROMO_CLOUD_API_KEY') : null);

  if (providerOverride === 'gemini' && geminiKey) {
    return { provider: 'gemini', apiKey: geminiKey };
  }

  if (providerOverride === 'openai' && openAiKey) {
    return { provider: 'openai', apiKey: openAiKey };
  }

  if (!providerOverride && geminiKey) {
    return { provider: 'gemini', apiKey: geminiKey };
  }

  if (!providerOverride && openAiKey) {
    return { provider: 'openai', apiKey: openAiKey };
  }

  if (required) {
    const expected = providerOverride === 'openai'
      ? 'ZUSH_WINDOWS_PROMO_OPENAI_API_KEY or OPENAI_API_KEY'
      : providerOverride === 'gemini'
        ? 'ZUSH_WINDOWS_PROMO_GEMINI_API_KEY, GEMINI_API_KEY, or GOOGLE_API_KEY'
        : 'GEMINI_API_KEY, GOOGLE_API_KEY, or OPENAI_API_KEY';
    throw new Error(`BYOK promo screenshots require a Gemini or OpenAI API key in env (${expected}).`);
  }

  return null;
}

async function assertPromoCloudConnection(credentials) {
  const response = credentials.provider === 'openai'
    ? await fetchWithTimeout('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${credentials.apiKey}` },
    })
    : await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(credentials.apiKey)}`,
    );

  if (!response.ok) {
    throw new Error(
      `BYOK promo ${credentials.provider} key did not pass the live provider check. ` +
        `Provider returned HTTP ${response.status}.`,
    );
  }
}

async function prepareOllamaForPromo() {
  const endpoint = normalizeUrl(envValue('ZUSH_WINDOWS_PROMO_OLLAMA_ENDPOINT') ?? 'http://127.0.0.1:11434');
  let models = await tryFetchOllamaModels(endpoint);
  if (!models) {
    startOllamaServer();
    models = await waitForOllamaModels(endpoint);
  }

  if (models.length === 0) {
    throw new Error('Ollama is running, but no local models are installed. Run "ollama pull gemma3" or set ZUSH_WINDOWS_PROMO_OLLAMA_MODEL to an installed model.');
  }

  const explicitModel = envValue('ZUSH_WINDOWS_PROMO_OLLAMA_MODEL') ?? envValue('OLLAMA_MODEL');
  const model = selectOllamaModel(models, explicitModel ?? 'gemma3', Boolean(explicitModel));
  return { endpoint, model };
}

function startOllamaServer() {
  const ollamaExe = findOllamaExecutable();
  if (!ollamaExe) {
    throw new Error('Ollama is not running and the ollama executable was not found. Install Ollama or set ZUSH_WINDOWS_PROMO_OLLAMA_EXE.');
  }

  console.log('Starting Ollama with "ollama serve" for AI Setup screenshots...');
  const child = spawn(ollamaExe, ['serve'], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });
  startedOllamaPid = child.pid;
  child.unref();
}

async function waitForOllamaModels(endpoint, timeoutMs = 30_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const models = await tryFetchOllamaModels(endpoint);
    if (models) {
      return models;
    }

    await wait(750);
  }

  throw new Error(`Timed out waiting for Ollama at ${endpoint}.`);
}

async function tryFetchOllamaModels(endpoint) {
  try {
    const response = await fetchWithTimeout(ollamaApiUrl(endpoint, '/api/tags'), {}, 2_500);
    if (!response.ok) {
      return null;
    }

    const decoded = await response.json();
    return Array.isArray(decoded.models)
      ? decoded.models
        .map((model) => model?.name)
        .filter((name) => typeof name === 'string' && name.trim())
      : [];
  } catch {
    return null;
  }
}

function selectOllamaModel(models, preferredModel, isExplicit) {
  const preferred = stripLatestSuffix(preferredModel.trim());
  const normalized = models.map(stripLatestSuffix);
  if (normalized.includes(preferred)) {
    return preferred;
  }

  if (isExplicit) {
    throw new Error(
      `Requested Ollama model "${preferredModel}" is not installed. Installed models: ${models.join(', ')}.`,
    );
  }

  return stripLatestSuffix(models[0]);
}

function findOllamaExecutable() {
  const explicit = envValue('ZUSH_WINDOWS_PROMO_OLLAMA_EXE');
  if (explicit && fs.existsSync(explicit)) {
    return explicit;
  }

  const whereResult = spawnSync('where.exe', ['ollama'], {
    encoding: 'utf8',
    windowsHide: true,
  });
  if (whereResult.status === 0) {
    const candidate = whereResult.stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line && fs.existsSync(line));
    if (candidate) {
      return candidate;
    }
  }

  return firstExistingPath([
    path.join(process.env.LOCALAPPDATA ?? '', 'Programs/Ollama/ollama.exe'),
    path.join(process.env.LOCALAPPDATA ?? '', 'Microsoft/WindowsApps/ollama.exe'),
    path.join(process.env.ProgramFiles ?? '', 'Ollama/ollama.exe'),
  ]);
}

function promoEnvironmentForFeature(feature) {
  const env = {};
  if (feature.fixture === 'byok' && promoCloudCredentials) {
    env.ZUSH_PROMO_SCREENSHOT_BYOK_PROVIDER = promoCloudCredentials.provider;
    env.ZUSH_PROMO_SCREENSHOT_BYOK_API_KEY = promoCloudCredentials.apiKey;
  }

  if ((feature.fixture === 'offline-ai' || feature.fixture === 'byok') && promoOllamaConfig) {
    env.ZUSH_PROMO_SCREENSHOT_LOCAL_AI_ENDPOINT = promoOllamaConfig.endpoint;
    env.ZUSH_PROMO_SCREENSHOT_LOCAL_AI_MODEL = promoOllamaConfig.model;
  }

  return env;
}

function ensureBuiltAndResolveApp() {
  if (!args.has('--skip-build')) {
    run('dotnet', [
      'build',
      appProject,
      '-c',
      buildConfig,
      '-r',
      runtimeIdentifier,
      '-p:WindowsPackageType=None',
      '-p:Platform=x64',
    ], { cwd: appRepo, stdio: 'inherit' });
  }

  const appExe = findLatestFile(
    path.join(appRepo, 'src/Zush.Windows.App/bin'),
    'Zush.Windows.App.exe',
    (candidate) => isDebugAppExecutablePath(candidate) && isRuntimeExecutablePath(candidate),
  );
  if (!appExe) {
    throw new Error(`Could not find built Debug ${runtimeIdentifier} Zush.Windows.App.exe under ${appRepo}`);
  }

  return appExe;
}

async function captureFeature({ appExe, feature, theme, runId, assetRoot }) {
  const captureDir = path.join(tempRoot, runId, `${feature.id}-${theme}`);
  fs.mkdirSync(captureDir, { recursive: true });

  const markerPath = path.join(captureDir, 'fixture-marker.json');
  const capturePath = path.join(captureDir, 'window.png');
  const baseDir = path.join(captureDir, 'app-data');
  const promoFixtureEnv = promoEnvironmentForFeature(feature);
  const child = spawn(appExe, [], {
    cwd: path.dirname(appExe),
    windowsHide: false,
    env: {
      ...process.env,
      ZUSH_BASE_DIR: baseDir,
      ZUSH_DISABLE_SENTRY: '1',
      ZUSH_DISABLE_TELEMETRYDECK: '1',
      ZUSH_SUPABASE_URL: promoSupabaseUrl,
      ZUSH_SUPABASE_PUBLISHABLE_KEY: promoSupabasePublishableKey,
      ZUSH_SUPABASE_ANON_KEY: '',
      ZUSH_PROMO_SCREENSHOT_RUN_ID: runId,
      ZUSH_PROMO_SCREENSHOT_FIXTURE: feature.fixture,
      ZUSH_PROMO_SCREENSHOT_THEME: theme,
      ZUSH_PROMO_SCREENSHOT_ASSET_ROOT: assetRoot,
      ZUSH_PROMO_SCREENSHOT_MARKER: markerPath,
      ...promoFixtureEnv,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stdout = '';
  let stderr = '';
  child.stdout?.on('data', (chunk) => {
    stdout = trimBufferedOutput(stdout + chunk.toString());
  });
  child.stderr?.on('data', (chunk) => {
    stderr = trimBufferedOutput(stderr + chunk.toString());
  });

  try {
    await waitForFixtureMarker(markerPath, child);
    await wait(settleMs);
    captureWindowWithPowerShell({
      processId: child.pid,
      outputPath: capturePath,
    });
  } catch (error) {
    const detail = [error.message, stdout, stderr].filter(Boolean).join('\n');
    throw new Error(`Failed to capture ${feature.id} (${theme}).\n${detail}`);
  } finally {
    killProcessTree(child.pid);
  }

  return {
    path: capturePath,
    feature,
    theme,
  };
}

async function waitForFixtureMarker(markerPath, child, timeoutMs = 60_000) {
  const startedAt = Date.now();
  let exitCode = null;
  child.once('exit', (code) => {
    exitCode = code;
  });

  while (Date.now() - startedAt < timeoutMs) {
    if (fs.existsSync(markerPath)) {
      const marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
      if (marker.status !== 'ok') {
        throw new Error(marker.error ?? `Fixture marker status: ${marker.status}`);
      }

      return marker;
    }

    if (exitCode !== null) {
      throw new Error(`Zush exited before writing fixture marker. Exit code: ${exitCode}`);
    }

    await wait(250);
  }

  throw new Error(`Timed out waiting for fixture marker: ${markerPath}`);
}

function captureWindowWithPowerShell({ processId, outputPath }) {
  if (!processId) {
    throw new Error('Zush process id is unavailable.');
  }

  const scriptPath = path.join(tempRoot, 'capture-window.ps1');
  fs.writeFileSync(scriptPath, powerShellCaptureScript(), 'utf8');
  run(powerShellExecutable(), [
    '-NoProfile',
    '-ExecutionPolicy',
    'Bypass',
    '-File',
    scriptPath,
    '-ProcessId',
    String(processId),
    '-OutputPath',
    outputPath,
  ]);

  if (!fs.existsSync(outputPath)) {
    throw new Error(`Window capture failed: ${outputPath}`);
  }
}

async function renderComposite({ capture, theme, outputPath, target }) {
  const config = targetConfigs[target];
  const canvas = config.canvas;
  const captureImage = sharp(capture.path);
  const metadata = await captureImage.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read capture size: ${capture.path}`);
  }

  const crop = windowCaptureCrop(metadata, config.captureCropPx ?? 0);
  const scale = config.windowWidth / crop.width;
  const windowWidth = Math.round(crop.width * scale);
  const windowHeight = Math.round(crop.height * scale);
  const x = Math.round((canvas.width - windowWidth) / 2);
  const y = Math.round((canvas.height - windowHeight) / 2 + config.yBias);
  const background = await renderBackground(theme, canvas);
  const windowBuffer = await sharp(capture.path)
    .extract(crop)
    .resize(windowWidth, windowHeight, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .ensureAlpha()
    .composite([
      { input: Buffer.from(roundedWindowMaskSvg(windowWidth, windowHeight)), blend: 'dest-in' },
    ])
    .png()
    .toBuffer();
  const shadow = Buffer.from(shadowSvg(canvas, x, y, windowWidth, windowHeight, theme));
  const image = sharp(background).composite([
    { input: shadow, left: 0, top: 0 },
    { input: windowBuffer, left: x, top: y },
  ]);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  if (target === 'microsoft-store') {
    await image
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPath);
    await validateMicrosoftStorePng(outputPath, canvas);
    return;
  }

  await image
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(outputPath);
}

function windowCaptureCrop(metadata, inset) {
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const safeInset = Math.min(
    Math.max(0, inset),
    Math.floor((width - 1) / 2),
    Math.floor((height - 1) / 2),
  );

  return {
    left: safeInset,
    top: safeInset,
    width: width - (safeInset * 2),
    height: height - (safeInset * 2),
  };
}

async function renderBackground(theme, canvas) {
  const requestedSource = wallpaperSources[theme];
  const fallbackSource = wallpaperSources.light;
  const hasThemeSource = requestedSource && fs.existsSync(requestedSource);
  const source = hasThemeSource
    ? requestedSource
    : fallbackSource && fs.existsSync(fallbackSource)
      ? fallbackSource
      : null;

  if (!source) {
    return sharp(Buffer.from(generatedWindowsBackdropSvg(theme, canvas)))
      .png()
      .toBuffer();
  }

  let image = sharp(source)
    .resize(canvas.width, canvas.height, { fit: 'cover', position: 'center' })
    .ensureAlpha();

  if (theme === 'dark' && !hasThemeSource) {
    image = image.modulate({ brightness: 0.46, saturation: 0.82 });
  } else if (theme === 'light') {
    image = image.modulate({ brightness: 1.04, saturation: 1.03 });
  }

  return image.png().toBuffer();
}

function validateMicrosoftStorePng(outputPath, canvas) {
  const stats = fs.statSync(outputPath);
  const maxBytes = 50 * 1024 * 1024;
  if (stats.size > maxBytes) {
    throw new Error(`Microsoft Store PNG exceeds 50 MB: ${outputPath}`);
  }

  return sharp(outputPath)
    .metadata()
    .then((metadata) => {
      if (metadata.format !== 'png') {
        throw new Error(`Microsoft Store screenshot must be PNG: ${outputPath}`);
      }

      if ((metadata.width ?? 0) < 1366 || (metadata.height ?? 0) < 768) {
        throw new Error(`Microsoft Store desktop screenshot is too small: ${metadata.width}x${metadata.height}`);
      }

      if (metadata.width !== canvas.width || metadata.height !== canvas.height) {
        throw new Error(`Unexpected Store screenshot size: ${metadata.width}x${metadata.height}`);
      }
    });
}

function outputNameForTarget({ feature, theme, target }) {
  if (target === 'microsoft-store') {
    const storeThemes = themesByTarget['microsoft-store'];
    const suffix = storeThemes.length > 1 || theme !== 'light' ? `-${theme}` : '';
    return `${feature.storeName}${suffix}.png`;
  }

  return `${feature.id}-${theme}.webp`;
}

function copyFixtureAssets(runId) {
  const targetRoot = path.join(tempRoot, runId, 'Files');
  fs.mkdirSync(targetRoot, { recursive: true });

  if (!fs.existsSync(sourceAssetRoot)) {
    console.warn(`Warning: promo source files directory is missing, using bundled fallback seeds: ${sourceAssetRoot}`);
  } else {
    for (const entry of fs.readdirSync(sourceAssetRoot)) {
      if (entry.startsWith('.')) {
        continue;
      }

      fs.cpSync(path.join(sourceAssetRoot, entry), path.join(targetRoot, entry), {
        recursive: true,
      });
    }
  }

  seedMissingPromoAssets(targetRoot);

  return targetRoot;
}

function seedMissingPromoAssets(targetRoot) {
  for (const seed of promoAssetSeeds) {
    const target = path.join(targetRoot, seed.name);
    if (fs.existsSync(target) && fs.statSync(target).size > 0) {
      continue;
    }

    const source = firstExistingPath(seed.candidates);
    if (!source) {
      continue;
    }

    fs.copyFileSync(source, target);
  }
}

function parseTargets(value) {
  const targets = value
    .split(',')
    .map((target) => normalizeTarget(target.trim()))
    .filter(Boolean);

  if (targets.length === 0) {
    throw new Error('No screenshot targets selected');
  }

  return [...new Set(targets)];
}

function normalizeTarget(target) {
  if (target === 'landing') {
    return 'landing';
  }

  if (['microsoft-store', 'store', 'ms-store', 'windows-store'].includes(target)) {
    return 'microsoft-store';
  }

  throw new Error(`Unsupported screenshot target: ${target}`);
}

function parseThemes(value) {
  const themes = value
    .split(',')
    .map((theme) => theme.trim().toLowerCase())
    .filter(Boolean);

  for (const theme of themes) {
    if (!['light', 'dark'].includes(theme)) {
      throw new Error(`Unsupported theme: ${theme}`);
    }
  }

  return [...new Set(themes)];
}

function themesForTarget(target, explicit) {
  if (explicit) {
    return explicit;
  }

  return target === 'microsoft-store' ? ['light'] : ['light', 'dark'];
}

function firstExistingPath(paths) {
  return paths.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function loadEnvFiles(paths) {
  for (const envPath of paths) {
    if (!fs.existsSync(envPath)) {
      continue;
    }

    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const parsed = parseEnvLine(line);
      if (!parsed || process.env[parsed.key]) {
        continue;
      }

      process.env[parsed.key] = parsed.value;
    }
  }
}

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }

  const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(trimmed);
  if (!match) {
    return null;
  }

  return {
    key: match[1],
    value: parseEnvValue(match[2]),
  };
}

function parseEnvValue(rawValue) {
  let value = rawValue.trim();
  if (!value) {
    return '';
  }

  const quote = value[0];
  if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
    value = value.slice(1, -1);
    return quote === '"'
      ? value
        .replaceAll('\\n', '\n')
        .replaceAll('\\r', '\r')
        .replaceAll('\\t', '\t')
        .replaceAll('\\"', '"')
        .replaceAll('\\\\', '\\')
      : value;
  }

  const commentIndex = value.search(/\s#/);
  return (commentIndex >= 0 ? value.slice(0, commentIndex) : value).trim();
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 8_000) {
  if (typeof fetch !== 'function') {
    throw new Error('This script requires a Node.js runtime with fetch support.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function ollamaApiUrl(endpoint, apiPath) {
  const url = new URL(normalizeUrl(endpoint));
  url.pathname = apiPath;
  url.search = '';
  url.hash = '';
  return url.toString();
}

function stripLatestSuffix(model) {
  return model.endsWith(':latest') ? model.slice(0, -':latest'.length) : model;
}

function normalizeUrl(value) {
  return value.trim().replace(/\/+$/, '');
}

function envValue(name) {
  const direct = process.env[name]?.trim();
  if (direct) {
    return direct;
  }

  if (process.platform !== 'win32') {
    return null;
  }

  const script = [
    `$name = '${escapePowerShellSingleQuoted(name)}'`,
    "$value = [Environment]::GetEnvironmentVariable($name, 'User')",
    "if ([string]::IsNullOrWhiteSpace($value)) { $value = [Environment]::GetEnvironmentVariable($name, 'Machine') }",
    "if (-not [string]::IsNullOrWhiteSpace($value)) { [Console]::Out.Write($value.Trim()) }",
  ].join('; ');
  const result = spawnSync(powerShellExecutable(), ['-NoProfile', '-Command', script], {
    encoding: 'utf8',
    windowsHide: true,
  });

  return result.status === 0 && result.stdout.trim() ? result.stdout.trim() : null;
}

function escapePowerShellSingleQuoted(value) {
  return value.replaceAll("'", "''");
}

function isLoopbackUrl(value) {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname);
  } catch {
    return false;
  }
}

function isDebugAppExecutablePath(appExe) {
  const segments = path.normalize(appExe).toLowerCase().split(/[\\/]+/);
  return segments.includes('debug');
}

function isRuntimeExecutablePath(appExe) {
  const segments = path.normalize(appExe).toLowerCase().split(/[\\/]+/);
  return segments.includes(runtimeIdentifier.toLowerCase());
}

function findLatestFile(root, basename, predicate = () => true) {
  if (!fs.existsSync(root)) {
    return null;
  }

  const matches = [];
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && entry.name === basename && predicate(fullPath)) {
        matches.push(fullPath);
      }
    }
  }

  return matches
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0] ?? null;
}

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: options.cwd ?? repoRoot,
    encoding: 'utf8',
    stdio: options.stdio ?? 'pipe',
    windowsHide: false,
    env: { ...process.env, ...(options.env ?? {}) },
  });

  if (result.status !== 0) {
    throw new Error(
      [
        `Command failed: ${command} ${commandArgs.join(' ')}`,
        result.stdout,
        result.stderr,
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }

  return typeof result.stdout === 'string' ? result.stdout.trim() : '';
}

function killProcessTree(pid) {
  if (!pid) {
    return;
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
      encoding: 'utf8',
      stdio: 'ignore',
    });
    return;
  }

  try {
    process.kill(pid, 'SIGTERM');
  } catch {
    // The process may already be gone.
  }
}

function cleanupTempRoot() {
  if (args.has('--keep-temp')) {
    console.warn(`Kept temp screenshot files at ${tempRoot}`);
    return;
  }

  try {
    fs.rmSync(tempRoot, {
      recursive: true,
      force: true,
      maxRetries: 8,
      retryDelay: 250,
    });
  } catch (error) {
    console.warn(`Warning: could not remove temp screenshot files at ${tempRoot}: ${error.message}`);
  }
}

function cleanupStartedOllama() {
  if (!startedOllamaPid) {
    return;
  }

  killProcessTree(startedOllamaPid);
  startedOllamaPid = null;
}

function powerShellExecutable() {
  return process.env.PWSH ?? 'powershell.exe';
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function trimBufferedOutput(value, maxLength = 12_000) {
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function argValue(name) {
  const prefix = `${name}=`;
  const direct = process.argv.find((arg) => arg.startsWith(prefix));
  if (direct) {
    return direct.slice(prefix.length);
  }

  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--')) {
    return process.argv[index + 1];
  }

  return null;
}

function shadowSvg(canvas, x, y, width, height, theme) {
  const opacity = theme === 'dark' ? 0.44 : 0.25;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
  <defs>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="30" stdDeviation="34" flood-color="#000000" flood-opacity="${opacity}" />
      <feDropShadow dx="0" dy="7" stdDeviation="12" flood-color="#000000" flood-opacity="${opacity * 0.65}" />
    </filter>
  </defs>
  <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="18" fill="#000" filter="url(#shadow)" />
</svg>`;
}

function roundedWindowMaskSvg(width, height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect x="0" y="0" width="${width}" height="${height}" rx="18" fill="#fff" />
</svg>`;
}

function generatedWindowsBackdropSvg(theme, canvas) {
  const dark = theme === 'dark';
  const bg = dark ? '#0b1020' : '#dcecff';
  const c1 = dark ? '#4468ff' : '#4ea7ff';
  const c2 = dark ? '#24b6c9' : '#7ddff6';
  const c3 = dark ? '#6b38d6' : '#8d7cff';
  const c4 = dark ? '#11284f' : '#f5fbff';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <defs>
    <radialGradient id="a" cx="38%" cy="42%" r="48%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="${dark ? 0.82 : 0.64}" />
      <stop offset="56%" stop-color="${c2}" stop-opacity="${dark ? 0.42 : 0.48}" />
      <stop offset="100%" stop-color="${bg}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="b" cx="64%" cy="48%" r="46%">
      <stop offset="0%" stop-color="${c3}" stop-opacity="${dark ? 0.62 : 0.48}" />
      <stop offset="72%" stop-color="${c4}" stop-opacity="${dark ? 0.32 : 0.62}" />
      <stop offset="100%" stop-color="${bg}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${dark ? '#050914' : '#eff7ff'}" />
      <stop offset="48%" stop-color="${bg}" />
      <stop offset="100%" stop-color="${dark ? '#14112a' : '#eaf2ff'}" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#base)" />
  <rect width="100%" height="100%" fill="url(#a)" />
  <rect width="100%" height="100%" fill="url(#b)" />
</svg>`;
}

function powerShellCaptureScript() {
  return String.raw`param(
  [Parameter(Mandatory=$true)][int]$ProcessId,
  [Parameter(Mandatory=$true)][string]$OutputPath
)

$ErrorActionPreference = 'Stop'

$outputDirectory = Split-Path -Parent $OutputPath
if (-not [string]::IsNullOrWhiteSpace($outputDirectory)) {
  [System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
}

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class ZushWindowCapture
{
    private const int DWMWA_EXTENDED_FRAME_BOUNDS = 9;
    private const int SW_RESTORE = 9;
    private const uint SWP_SHOWWINDOW = 0x0040;
    private const uint SWP_NOSIZE = 0x0001;
    private const uint SWP_NOMOVE = 0x0002;
    private static readonly IntPtr HwndTopMost = new IntPtr(-1);
    private static readonly IntPtr HwndNoTopMost = new IntPtr(-2);

    [StructLayout(LayoutKind.Sequential)]
    public struct RECT
    {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }

    [DllImport("user32.dll")]
    private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    private static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    private static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

    [DllImport("user32.dll")]
    private static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);

    [DllImport("user32.dll")]
    private static extern int GetSystemMetrics(int nIndex);

    [DllImport("dwmapi.dll")]
    private static extern int DwmGetWindowAttribute(IntPtr hwnd, int dwAttribute, out RECT pvAttribute, int cbAttribute);

    public static void Prepare(IntPtr hwnd)
    {
        ShowWindow(hwnd, SW_RESTORE);
        SetForegroundWindow(hwnd);
        RECT rect = Bounds(hwnd);
        int width = Math.Max(1, rect.Right - rect.Left);
        int height = Math.Max(1, rect.Bottom - rect.Top);
        int screenWidth = GetSystemMetrics(0);
        int screenHeight = GetSystemMetrics(1);
        int x = Math.Max(0, (screenWidth - width) / 2);
        int y = Math.Max(0, (screenHeight - height) / 2);
        SetWindowPos(hwnd, HwndTopMost, x, y, 0, 0, SWP_SHOWWINDOW | SWP_NOSIZE);
    }

    public static void ReleaseTopmost(IntPtr hwnd)
    {
        SetWindowPos(hwnd, HwndNoTopMost, 0, 0, 0, 0, SWP_SHOWWINDOW | SWP_NOSIZE | SWP_NOMOVE);
    }

    public static RECT Bounds(IntPtr hwnd)
    {
        RECT rect;
        int result = DwmGetWindowAttribute(hwnd, DWMWA_EXTENDED_FRAME_BOUNDS, out rect, Marshal.SizeOf(typeof(RECT)));
        if (result != 0 || rect.Right <= rect.Left || rect.Bottom <= rect.Top)
        {
            GetWindowRect(hwnd, out rect);
        }

        return rect;
    }

    public static void Capture(IntPtr hwnd, string path)
    {
        RECT rect = Bounds(hwnd);
        int width = Math.Max(1, rect.Right - rect.Left);
        int height = Math.Max(1, rect.Bottom - rect.Top);
        using (Bitmap bitmap = new Bitmap(width, height, PixelFormat.Format32bppArgb))
        {
            using (Graphics graphics = Graphics.FromImage(bitmap))
            {
                graphics.CopyFromScreen(rect.Left, rect.Top, 0, 0, new Size(width, height), CopyPixelOperation.SourceCopy);
            }

            bitmap.Save(path, ImageFormat.Png);
        }
    }
}
"@

$process = Get-Process -Id $ProcessId -ErrorAction Stop
for ($i = 0; $i -lt 120; $i++) {
  $process.Refresh()
  if ($process.MainWindowHandle -ne 0) {
    break
  }
  Start-Sleep -Milliseconds 250
}

if ($process.MainWindowHandle -eq 0) {
  throw "Process $ProcessId does not have a main window handle."
}

[ZushWindowCapture]::Prepare($process.MainWindowHandle)
try {
  Start-Sleep -Milliseconds 700
  [ZushWindowCapture]::Capture($process.MainWindowHandle, $OutputPath)
} finally {
  [ZushWindowCapture]::ReleaseTopmost($process.MainWindowHandle)
}
if (-not (Test-Path $OutputPath)) {
  throw "Capture did not create output file: $OutputPath"
}
`;
}
