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
const outputDir = path.join(repoRoot, 'public/images/showcase/macos');
const tempRoot = path.join(os.tmpdir(), `zush-feature-screenshots-${Date.now()}`);

const wallpapers = {
  light: '/Users/lirik/Desktop/tahoe/macos-tahoe-26-6016x6016-22673.jpg',
  dark: '/Users/lirik/Desktop/tahoe/macos-tahoe-26-5k-6016x6016-22672.jpg',
};

const features = [
  { id: 'batch-rename', fixture: 'batch-rename', mainWidth: 1460 },
  { id: 'monitor', fixture: 'monitor', mainWidth: 1380 },
  { id: 'activity', fixture: 'activity', mainWidth: 1460 },
  { id: 'tags', fixture: 'smart-tags', mainWidth: 1120, extraOwners: ['Finder'] },
  { id: 'naming', fixture: 'naming', mainWidth: 1120 },
  { id: 'multilanguage', fixture: 'multilanguage', mainWidth: 1120 },
  { id: 'custom-prompts', fixture: 'custom-prompts', mainWidth: 1450, captureZushExtras: true },
  { id: 'byok', fixture: 'byok', mainWidth: 1120 },
  { id: 'offline-ai', fixture: 'offline-ai', mainWidth: 1120 },
];

const args = new Set(process.argv.slice(2));
const only = process.argv.find((arg) => arg.startsWith('--only='))?.split('=')[1];
const themeArg = process.argv.find((arg) => arg.startsWith('--theme='))?.split('=')[1];
const selectedThemes = themeArg ? [themeArg] : ['light', 'dark'];
const selectedFeatures = only
  ? features.filter((feature) => feature.id === only || feature.fixture === only)
  : features;
let activeZushPid = null;

if (selectedFeatures.length === 0) {
  throw new Error(`No feature matched --only=${only}`);
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

  return result.stdout.trim();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    if (fs.statSync(source).isFile()) {
      fs.copyFileSync(source, target);
    }
  }

  setFinderTags(path.join(targetRoot, 'wedding.jpg'), ['wedding', 'portrait', 'bride', 'groom']);
  return targetRoot;
}

function setFinderTags(filePath, tags) {
  const swift = `
import Foundation
var url = URL(fileURLWithPath: ${JSON.stringify(filePath)})
var values = URLResourceValues()
values.tagNames = ${JSON.stringify(tags)}
try url.setResourceValues(values)
`;
  run('/usr/bin/swift', ['-e', swift]);
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

function postFixture({ fixture, theme, assetRoot, runId }) {
  const swift = `
import Foundation
let userInfo: [String: Any] = [
    "fixture": ${JSON.stringify(fixture)},
    "theme": ${JSON.stringify(theme)},
    "assetRoot": ${JSON.stringify(assetRoot)},
    "runId": ${JSON.stringify(runId)}
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

function renderComposite({ feature, theme, captures, outputPath }) {
  const canvas = { width: 2560, height: 1440 };
  const main = captures.find((capture) => capture.role === 'main');
  const pointScale = main.size.width / main.window.width;
  const mainTargetWidth = feature.mainWidth;
  const scale = mainTargetWidth / main.size.width;
  const mainTargetHeight = Math.round(main.size.height * scale);
  const mainX = Math.round((canvas.width - mainTargetWidth) / 2);
  const mainY = Math.round((canvas.height - mainTargetHeight) / 2);

  const commandArgs = [
    wallpapers[theme],
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

      if (feature.id === 'tags' && capture.window.owner === 'Finder') {
        width = 430;
        height = Math.round(capture.size.height * (width / capture.size.width));
        x = Math.round(mainX + mainTargetWidth + 85);
        y = Math.round((canvas.height - height) / 2);
      }
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

  commandArgs.push('-quality', '90', '-define', 'webp:method=6', outputPath);
  run('magick', commandArgs);
}

async function captureFeature({ feature, theme, runId, assetRoot }) {
  setSystemDarkMode(theme === 'dark');
  await wait(450);

  postFixture({ fixture: feature.fixture, theme, assetRoot, runId });
  await wait(feature.fixture === 'custom-prompts' ? 1600 : 1100);

  if (feature.fixture === 'smart-tags') {
    await openFinderInfo(path.join(assetRoot, 'wedding.jpg'));
  } else {
    closeFinderInfoWindows();
  }

  await wait(300);
  await waitForMainWindow();

  const captureDir = path.join(tempRoot, runId, `${feature.id}-${theme}`);
  fs.mkdirSync(captureDir, { recursive: true });
  const captures = captureWindowsForFeature(feature, captureDir);
  const outputPath = path.join(outputDir, `${feature.id}-${theme}.webp`);
  fs.mkdirSync(outputDir, { recursive: true });
  renderComposite({ feature, theme, captures, outputPath });
  return outputPath;
}

async function main() {
  for (const theme of selectedThemes) {
    if (!['light', 'dark'].includes(theme)) {
      throw new Error(`Unsupported theme: ${theme}`);
    }
    if (!fs.existsSync(wallpapers[theme])) {
      throw new Error(`Missing ${theme} wallpaper: ${wallpapers[theme]}`);
    }
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
    for (const theme of selectedThemes) {
      for (const feature of selectedFeatures) {
        const output = await captureFeature({ feature, theme, runId, assetRoot });
        outputs.push(output);
        console.log(`Wrote ${path.relative(repoRoot, output)}`);
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
