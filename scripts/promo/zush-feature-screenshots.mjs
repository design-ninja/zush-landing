#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const appRepo = process.env.ZUSH_APP_REPO ?? '/Users/lirik/Projects/zush/zush-app';
const derivedDataPath = process.env.ZUSH_DERIVED_DATA ?? '/tmp/zush-promo-derived';
const appBinary = path.join(derivedDataPath, 'Build/Products/Debug/Zush.app/Contents/MacOS/Zush');
const sourceAssetRoot =
  process.env.ZUSH_PROMO_SOURCE_FILES ??
  '/Users/lirik/Projects/zush/zush-assets/#test files/Files';
const defaultLandingOutputDir = path.join(repoRoot, 'public/images/showcase/macos');
const defaultAppStoreOutputDir = '/Users/lirik/Projects/zush/zush-assets/App Store';
const tempRoot = path.join(os.tmpdir(), `zush-feature-screenshots-${Date.now()}`);
const baseMainWindowWidth = 1460;
const windowZoom = 1.035;
const tahoeWallpaperRoot = '/Users/lirik/Projects/zush/zush-assets/tahoe-wallpapers';
const tahoeAssetWallpapers = {
  light: path.join(tahoeWallpaperRoot, 'tahoe-light.jpeg'),
  dark: path.join(tahoeWallpaperRoot, 'tahoe-dark.jpeg'),
};
const tahoeLightWallpaper =
  '/System/Library/ExtensionKit/Extensions/NeptuneOneWallpaper.appex/Contents/Resources/TahoeLight.heic';
const tahoeDarkWallpaper =
  '/System/Library/ExtensionKit/Extensions/NeptuneOneWallpaper.appex/Contents/Resources/TahoeDark.heic';
const tahoeDayWallpaper = '/System/Library/Desktop Pictures/.wallpapers/Tahoe Day/Tahoe Day.mov';

const wallpaperSources = {
  light:
    process.env.ZUSH_PROMO_LIGHT_WALLPAPER ??
    firstExistingAssetPath([
      tahoeAssetWallpapers.light,
      '/Users/lirik/Desktop/tahoe/macos-tahoe-26-6016x6016-22673.jpg',
      tahoeLightWallpaper,
      tahoeDayWallpaper,
      '/System/Library/Desktop Pictures/Sonoma.heic[0]',
      '/System/Library/Desktop Pictures/.thumbnails/Sonoma Light.heic',
    ]),
  dark:
    process.env.ZUSH_PROMO_DARK_WALLPAPER ??
    firstExistingAssetPath([
      tahoeAssetWallpapers.dark,
      '/Users/lirik/Desktop/tahoe/macos-tahoe-26-5k-6016x6016-22672.jpg',
      tahoeDarkWallpaper,
      tahoeDayWallpaper,
      '/System/Library/Desktop Pictures/Sonoma.heic[1]',
      '/System/Library/Desktop Pictures/.thumbnails/Sonoma Dark.heic',
    ]),
};
const preparedWallpapers = {};

const features = [
  { id: 'batch-rename', fixture: 'batch-rename' },
  { id: 'monitor', fixture: 'monitor' },
  { id: 'statistics', fixture: 'statistics' },
  { id: 'activity', fixture: 'activity' },
  { id: 'templates', fixture: 'templates' },
  { id: 'naming-blocks', fixture: 'naming-blocks' },
  { id: 'naming', fixture: 'naming' },
  { id: 'custom-prompts', fixture: 'custom-prompts', captureZushExtras: true },
  { id: 'byok', fixture: 'byok' },
  { id: 'offline-ai', fixture: 'offline-ai' },
];

const args = new Set(process.argv.slice(2));
const only = process.argv.find((arg) => arg.startsWith('--only='))?.split('=')[1];
const themeArg = process.argv.find((arg) => arg.startsWith('--theme='))?.split('=')[1];
const outputDirArg = process.argv.find((arg) => arg.startsWith('--output-dir='))?.split('=')[1];
const landingOutputDirArg = process.argv
  .find((arg) => arg.startsWith('--landing-output-dir='))
  ?.split('=')[1];
const appStoreOutputDirArg = process.argv
  .find((arg) => arg.startsWith('--app-store-output-dir='))
  ?.split('=')[1];
const targetArg =
  process.argv.find((arg) => arg.startsWith('--targets='))?.split('=')[1] ??
  process.argv.find((arg) => arg.startsWith('--target='))?.split('=')[1];
const selectedTargets = parseTargets(
  targetArg ?? (args.has('--app-store') ? 'app-store' : 'landing,app-store'),
);
if (selectedTargets.includes('app-store') && themeArg && themeArg !== 'light') {
  throw new Error('App Store screenshots are light-only. Use --target=landing for dark screenshots.');
}
const selectedThemes = [
  ...new Set(selectedTargets.flatMap((target) => themesForTarget(target, themeArg))),
];
const outputDirs = {
  landing: path.resolve(
    landingOutputDirArg ??
      (outputDirArg && selectedTargets.length === 1 ? outputDirArg : defaultLandingOutputDir),
  ),
  'app-store': path.resolve(
    appStoreOutputDirArg ??
      (outputDirArg && selectedTargets.length === 1 ? outputDirArg : defaultAppStoreOutputDir),
  ),
};
const selectedFeatures = only
  ? features.filter((feature) => feature.id === only || feature.fixture === only)
  : features;
let activeZushPid = null;

const targetConfigs = {
  landing: {
    canvas: { width: 2560, height: 1440 },
    extension: 'webp',
    finderGap: 85,
    mainTargetWidth: (feature) => Math.round((feature.mainWidth ?? baseMainWindowWidth) * windowZoom),
  },
  'app-store': {
    canvas: { width: 2880, height: 1800 },
    extension: 'jpg',
    finderGap: Math.round(85 * (2880 / 2560)),
    mainTargetWidth: (feature) =>
      Math.round(2880 * ((feature.mainWidth ?? baseMainWindowWidth) / 2560) * windowZoom),
  },
};

const appStoreNames = {
  'batch-rename': '01-batch-rename',
  monitor: '02-monitor',
  statistics: '03-statistics',
  activity: '04-activity',
  templates: '05-templates',
  'naming-blocks': '06-naming-blocks',
  naming: '07-smart-rename',
  'offline-ai': '08-offline-ai',
  byok: '09-byok',
  'custom-prompts': '10-custom-prompts',
};

if (selectedFeatures.length === 0) {
  throw new Error(`No feature matched --only=${only}`);
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

  if (['app-store', 'appstore', 'app_store', 'asc'].includes(target)) {
    return 'app-store';
  }

  throw new Error(`Unsupported screenshot target: ${target}`);
}

function themesForTarget(target, explicitTheme) {
  if (explicitTheme) {
    return [explicitTheme];
  }

  return target === 'app-store' ? ['light'] : ['light', 'dark'];
}

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: options.cwd ?? repoRoot,
    encoding: 'utf8',
    stdio: options.stdio ?? 'pipe',
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

function commandExists(command) {
  return spawnSync('/usr/bin/which', [command], { encoding: 'utf8' }).status === 0;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function firstExistingAssetPath(paths) {
  return paths.find((assetPath) => fs.existsSync(pathForExistenceCheck(assetPath))) ?? paths[0];
}

function pathForExistenceCheck(assetPath) {
  return assetPath.replace(/\[\d+\]$/, '');
}

function isVideoWallpaper(assetPath) {
  return /\.(mov|mp4|m4v)$/i.test(pathForExistenceCheck(assetPath));
}

function prepareWallpaper(theme) {
  const source = wallpaperSources[theme];
  const sourcePath = pathForExistenceCheck(source);
  if (!isVideoWallpaper(source)) {
    return source;
  }

  if (!commandExists('ffmpeg')) {
    throw new Error(`ffmpeg is required to extract the ${theme} Tahoe wallpaper from ${sourcePath}`);
  }

  const rawFramePath = path.join(tempRoot, `tahoe-${theme}-raw.jpg`);
  const outputPath = path.join(tempRoot, `tahoe-${theme}.jpg`);
  const timestamp = theme === 'dark' ? '00:01:50' : '00:00:10';
  fs.mkdirSync(tempRoot, { recursive: true });

  run('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-ss',
    timestamp,
    '-i',
    sourcePath,
    '-frames:v',
    '1',
    '-q:v',
    '2',
    rawFramePath,
  ]);

  const magickArgs =
    theme === 'dark'
      ? [
          rawFramePath,
          '-modulate',
          '48,82,100',
          '-fill',
          '#07111f',
          '-colorize',
          '24',
          outputPath,
        ]
      : [rawFramePath, '-modulate', '108,104,100', outputPath];
  run('magick', magickArgs);

  return outputPath;
}

function wallpaperForTheme(theme) {
  return preparedWallpapers[theme] ?? wallpaperSources[theme];
}

function ensureBuilt() {
  if (args.has('--skip-build') && fs.existsSync(appBinary)) {
    return;
  }

  run(
    'xcodebuild',
    [
      '-project',
      'Zush.xcodeproj',
      '-scheme',
      'Zush',
      '-configuration',
      'Debug',
      '-derivedDataPath',
      derivedDataPath,
      'build',
    ],
    { cwd: appRepo, stdio: 'inherit' },
  );
}

function copyFixtureAssets(runId) {
  const targetRoot = path.join(tempRoot, runId, 'Files');
  fs.mkdirSync(targetRoot, { recursive: true });

  for (const entry of fs.readdirSync(sourceAssetRoot)) {
    if (entry.startsWith('.')) {
      continue;
    }

    const source = path.join(sourceAssetRoot, entry);
    const target = path.join(targetRoot, entry);
    fs.cpSync(source, target, { recursive: true });
  }

  return targetRoot;
}

function getSystemDarkMode() {
  const value = run('osascript', [
    '-e',
    'tell application "System Events" to tell appearance preferences to get dark mode',
  ]);
  return value === 'true';
}

function setSystemDarkMode(enabled) {
  run('osascript', [
    '-e',
    `tell application "System Events" to tell appearance preferences to set dark mode to ${enabled ? 'true' : 'false'}`,
  ]);
}

function startZush(runId) {
  if (!fs.existsSync(appBinary)) {
    throw new Error(`Zush binary not found: ${appBinary}`);
  }

  run('defaults', ['write', 'com.lirik.Zush', 'debug.backend.environment', 'local']);
  run('defaults', ['write', 'com.lirik.Zush', 'debugTierOverride.local', '-int', '2']);

  const before = new Set(zushPids());
  const appBundle = path.resolve(appBinary, '../../..');
  run('open', [
    '-n',
    '-F',
    '--env',
    `ZUSH_APP_DATA_DIR=${path.join(tempRoot, runId, 'data')}`,
    '--env',
    `ZUSH_PROMO_SCREENSHOT_RUN_ID=${runId}`,
    '--env',
    'ZUSH_SENTRY_DSN=',
    '--env',
    'OS_ACTIVITY_MODE=disable',
    appBundle,
  ]);

  return {
    async waitForPid() {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const after = zushPids();
        const created = after.find((pid) => !before.has(pid));
        if (created) {
          activeZushPid = created;
          return created;
        }
        await wait(150);
      }
      throw new Error('Timed out waiting for launched Zush pid');
    },
    kill() {
      if (activeZushPid) {
        try {
          process.kill(activeZushPid, 'SIGTERM');
        } catch {
          // The process may already be gone.
        }
      }
    },
  };
}

function zushPids() {
  const result = spawnSync('pgrep', ['-x', 'Zush'], { encoding: 'utf8' });
  if (result.status !== 0) {
    return [];
  }
  return result.stdout
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((pid) => Number(pid));
}

function postFixture({ fixture, theme, assetRoot, runId, completionMarkerPath }) {
  const completionMarkerEntry = completionMarkerPath
    ? `,
    "completionMarkerPath": ${JSON.stringify(completionMarkerPath)}`
    : '';
  const swift = `
import Foundation
let userInfo: [String: Any] = [
    "fixture": ${JSON.stringify(fixture)},
    "theme": ${JSON.stringify(theme)},
    "assetRoot": ${JSON.stringify(assetRoot)},
    "runId": ${JSON.stringify(runId)}${completionMarkerEntry}
]
DistributedNotificationCenter.default().postNotificationName(
    Notification.Name("com.lirik.Zush.debug.promoScreenshotFixture"),
    object: nil,
    userInfo: userInfo,
    deliverImmediately: true
)
`;
  run('/usr/bin/swift', ['-e', swift]);
}

async function waitForPromoRealAnalysis(markerPath, timeoutMs = 190_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (fs.existsSync(markerPath)) {
      const marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
      if (marker.status !== 'ok') {
        throw new Error(
          `Real AI batch analysis ended with ${marker.status}: ` +
            `${marker.analyzedCount}/${marker.expectedCount} analyzed, ` +
            `${marker.failedCount} failed. ${marker.errors?.join('; ') ?? ''}`,
        );
      }
      return marker;
    }

    await wait(500);
  }

  throw new Error(`Timed out waiting for real AI batch analysis marker: ${markerPath}`);
}

function listWindows() {
  const swift = `
import Foundation
import CoreGraphics

let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
let list = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as? [[String: Any]] ?? []
let rows = list.compactMap { info -> [String: Any]? in
    guard let id = info[kCGWindowNumber as String] as? UInt32,
          let owner = info[kCGWindowOwnerName as String] as? String,
          let bounds = info[kCGWindowBounds as String] as? [String: Any] else {
        return nil
    }
    let title = info[kCGWindowName as String] as? String ?? ""
    let pid = info[kCGWindowOwnerPID as String] as? Int ?? 0
    let layer = info[kCGWindowLayer as String] as? Int ?? 0
    let alpha = info[kCGWindowAlpha as String] as? Double ?? 1
    let x = bounds["X"] as? Double ?? 0
    let y = bounds["Y"] as? Double ?? 0
    let width = bounds["Width"] as? Double ?? 0
    let height = bounds["Height"] as? Double ?? 0
    guard layer == 0, alpha > 0, width > 40, height > 40 else { return nil }
    return [
        "id": Int(id),
        "owner": owner,
        "pid": pid,
        "title": title,
        "x": x,
        "y": y,
        "width": width,
        "height": height
    ]
}
let data = try JSONSerialization.data(withJSONObject: rows, options: [])
print(String(data: data, encoding: .utf8)!)
`;
  return JSON.parse(run('/usr/bin/swift', ['-e', swift]));
}

async function waitForMainWindow() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const windows = listWindows();
    const zushWindow = findZushWindow(windows);
    if (zushWindow) {
      return zushWindow;
    }
    await wait(150);
  }

  throw new Error('Timed out waiting for Zush window');
}

function findZushWindow(windows) {
  return windows
    .filter((window) => window.owner === 'Zush')
    .filter((window) => !activeZushPid || window.pid === activeZushPid)
    .sort((a, b) => b.width * b.height - a.width * a.height)[0];
}

function captureWindow(window, outputPath) {
  run('screencapture', ['-x', '-o', '-l', String(window.id), outputPath]);
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Window capture failed: ${outputPath}`);
  }
  run('magick', [outputPath, '-trim', '+repage', outputPath]);
}

function activateZushForCapture() {
  if (!activeZushPid) {
    return;
  }

  run('osascript', [
    '-e',
    `tell application "System Events"
      set targetProcess to first process whose unix id is ${activeZushPid}
      set frontmost of targetProcess to true
    end tell`,
  ]);
}

function focusZushSidebarWithTab() {
  if (!activeZushPid) {
    return;
  }
  run('osascript', [
    '-e',
    `tell application "System Events"
      set targetProcess to first process whose unix id is ${activeZushPid}
      set frontmost of targetProcess to true
      key code 48
      delay 0.08
      key code 48 using {shift down}
    end tell`,
  ]);
}

function imageSize(imagePath) {
  const out = run('magick', ['identify', '-format', '%w %h', imagePath]);
  const [width, height] = out.split(/\s+/).map(Number);
  return { width, height };
}

function closeFinderInfoWindows() {
  run('osascript', [
    '-e',
    'tell application "Finder" to close every information window',
  ]);
}

async function openFinderInfo(filePath) {
  closeFinderInfoWindows();
  run('osascript', [
    '-e',
    `tell application "Finder"
      activate
      set targetFile to POSIX file ${JSON.stringify(filePath)} as alias
      reveal targetFile
      open information window of targetFile
      delay 0.2
      set bounds of front window to {1350, 280, 1740, 980}
    end tell`,
  ]);
  await wait(700);
}

function captureWindowsForFeature(feature, captureDir) {
  const windows = listWindows();
  const main = findZushWindow(windows);
  if (!main) {
    throw new Error('No Zush main window found for capture');
  }

  const captures = [];
  const mainPath = path.join(captureDir, 'main.png');
  captureWindow(main, mainPath);
  captures.push({ role: 'main', window: main, path: mainPath, size: imageSize(mainPath) });

  const extras = [];
  if (feature.captureZushExtras) {
    extras.push(
      ...windows.filter(
        (window) =>
          window.owner === 'Zush' &&
          (!activeZushPid || window.pid === activeZushPid) &&
          window.id !== main.id &&
          window.width > 200 &&
          window.height > 160,
      ),
    );
  }

  if (feature.extraOwners?.includes('Finder')) {
    extras.push(
      ...windows.filter(
        (window) =>
          window.owner === 'Finder' &&
          /info/i.test(window.title) &&
          window.width > 160 &&
          window.height > 240,
      ),
    );
  }

  extras
    .sort((a, b) => a.x - b.x)
    .forEach((window, index) => {
      const capturePath = path.join(captureDir, `extra-${index}.png`);
      captureWindow(window, capturePath);
      captures.push({
        role: 'extra',
        window,
        path: capturePath,
        size: imageSize(capturePath),
      });
    });

  if (feature.id === 'custom-prompts') {
    const mainCapture = captures.find((capture) => capture.role === 'main');
    const promptWindowCapture = captures.find(
      (capture) =>
        capture.role === 'extra' &&
        mainCapture &&
        Math.abs(capture.size.width - mainCapture.size.width) < 8 &&
        Math.abs(capture.size.height - mainCapture.size.height) < 8,
    );

    if (promptWindowCapture) {
      return [{ ...promptWindowCapture, role: 'main' }];
    }
  }

  return captures;
}

function renderComposite({ feature, theme, captures, outputPath, target }) {
  const config = targetConfigs[target];
  const canvas = config.canvas;
  const main = captures.find((capture) => capture.role === 'main');
  const pointScale = main.size.width / main.window.width;
  const mainTargetWidth = config.mainTargetWidth(feature);
  const scale = mainTargetWidth / main.size.width;
  const mainTargetHeight = Math.round(main.size.height * scale);
  const mainX = Math.round((canvas.width - mainTargetWidth) / 2);
  const mainY = Math.round((canvas.height - mainTargetHeight) / 2);

  const commandArgs = [
    wallpaperForTheme(theme),
    '-resize',
    `${canvas.width}x${canvas.height}^`,
    '-gravity',
    'center',
    '-extent',
    `${canvas.width}x${canvas.height}`,
    '-gravity',
    'NorthWest',
  ];

  for (const capture of captures) {
    let width = Math.round(capture.size.width * scale);
    let height = Math.round(capture.size.height * scale);
    let x = mainX;
    let y = mainY;

    if (capture.role !== 'main') {
      const dx = (capture.window.x - main.window.x) * pointScale * scale;
      const dy = (capture.window.y - main.window.y) * pointScale * scale;
      x = Math.round(mainX + dx);
      y = Math.round(mainY + dy);
    }

    commandArgs.push(
      '(',
      capture.path,
      '-filter',
      'Lanczos',
      '-resize',
      `${width}x${height}!`,
      ')',
      '-geometry',
      `+${x}+${y}`,
      '-composite',
    );
  }

  if (target === 'app-store') {
    commandArgs.push(
      '-colorspace',
      'sRGB',
      '-strip',
      '-sampling-factor',
      '4:4:4',
      '-quality',
      '94',
      outputPath,
    );
  } else {
    commandArgs.push('-quality', '90', '-define', 'webp:method=6', outputPath);
  }

  run('magick', commandArgs);
}

function outputNameForTarget({ feature, theme, target }) {
  if (target === 'app-store') {
    return `${appStoreNames[feature.id] ?? feature.id}.jpg`;
  }

  return `${feature.id}-${theme}.webp`;
}

async function captureFeature({ feature, theme, runId, assetRoot, reuseCurrentFixture = false }) {
  setSystemDarkMode(theme === 'dark');
  await wait(450);

  if (reuseCurrentFixture) {
    await wait(700);
  } else {
    const completionMarkerPath =
      feature.fixture === 'batch-rename'
        ? path.join(tempRoot, runId, `${feature.id}-${theme}-real-analysis.json`)
        : null;
    if (completionMarkerPath) {
      fs.rmSync(completionMarkerPath, { force: true });
    }

    postFixture({ fixture: feature.fixture, theme, assetRoot, runId, completionMarkerPath });
    const fixtureDelay =
      feature.fixture === 'custom-prompts'
        ? 1600
        : feature.fixture === 'offline-ai'
          ? 1900
          : feature.fixture === 'statistics'
            ? 1800
            : 1100;
    if (completionMarkerPath) {
      const marker = await waitForPromoRealAnalysis(completionMarkerPath);
      console.log(`Real AI analyzed ${marker.analyzedCount}/${marker.expectedCount} batch files`);
      await wait(500);
    } else {
      await wait(fixtureDelay);
    }
  }

  if (reuseCurrentFixture) {
    console.log(`Reusing current ${feature.id} fixture state for ${theme}`);
    await wait(500);
  }

  closeFinderInfoWindows();

  await wait(300);
  await waitForMainWindow();
  activateZushForCapture();
  await wait(160);
  focusZushSidebarWithTab();
  await wait(300);

  const captureDir = path.join(tempRoot, runId, `${feature.id}-${theme}`);
  fs.mkdirSync(captureDir, { recursive: true });
  const captures = captureWindowsForFeature(feature, captureDir);
  const outputs = [];

  for (const target of selectedTargets) {
    if (target === 'app-store' && theme !== 'light') {
      continue;
    }

    const outputPath = path.join(outputDirs[target], outputNameForTarget({ feature, theme, target }));
    fs.mkdirSync(outputDirs[target], { recursive: true });
    renderComposite({ feature, theme, captures, outputPath, target });
    outputs.push(outputPath);
  }

  return outputs;
}

async function main() {
  for (const theme of selectedThemes) {
    if (!['light', 'dark'].includes(theme)) {
      throw new Error(`Unsupported theme: ${theme}`);
    }
    if (!fs.existsSync(pathForExistenceCheck(wallpaperSources[theme]))) {
      throw new Error(`Missing ${theme} wallpaper: ${wallpaperSources[theme]}`);
    }
    preparedWallpapers[theme] = prepareWallpaper(theme);
  }

  ensureBuilt();

  const originalDarkMode = getSystemDarkMode();
  const runId = `zush-promo-${process.pid}-${Date.now()}`;
  const assetRoot = copyFixtureAssets(runId);
  const app = startZush(runId);
  const outputs = [];

  try {
    await app.waitForPid();
    await wait(2500);
    let previousCapture = null;
    for (const feature of selectedFeatures) {
      for (const theme of selectedThemes) {
        const reuseCurrentFixture =
          feature.fixture === 'batch-rename' &&
          theme === 'dark' &&
          previousCapture?.featureId === feature.id &&
          previousCapture?.theme === 'light';
        const featureOutputs = await captureFeature({
          feature,
          theme,
          runId,
          assetRoot,
          reuseCurrentFixture,
        });
        outputs.push(...featureOutputs);
        for (const output of featureOutputs) {
          console.log(`Wrote ${path.relative(repoRoot, output)}`);
        }
        previousCapture = { featureId: feature.id, theme };
      }
    }
  } finally {
    closeFinderInfoWindows();
    setSystemDarkMode(originalDarkMode);
    app.kill();
  }

  console.log(`Generated ${outputs.length} screenshot${outputs.length === 1 ? '' : 's'}.`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
