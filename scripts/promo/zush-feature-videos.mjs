#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);

function argValue(name) {
  return rawArgs.find((arg) => arg.startsWith(`${name}=`))?.split('=')[1];
}

const appRepo = process.env.ZUSH_APP_REPO ?? '/Users/lirik/Projects/zush/zush-app';
const derivedDataPath = process.env.ZUSH_DERIVED_DATA ?? '/tmp/zush-promo-derived';
const appBinary = path.join(derivedDataPath, 'Build/Products/Debug/Zush.app/Contents/MacOS/Zush');
const sourceAssetRoot =
  argValue('--source-dir') ??
  process.env.ZUSH_PROMO_SOURCE_FILES ??
  '/Users/lirik/Projects/zush/zush-assets/#test files/Files';
const sourceMp3File =
  process.env.ZUSH_PROMO_MP3_SOURCE ??
  '/Users/lirik/Projects/zush/zush-assets/#test files/audio/Syntax.mp3';
const defaultOutputDir = path.join(repoRoot, 'public/videos/hero');
const defaultPosterOutputDir = path.join(repoRoot, 'public/videos/posters');
const tempRoot = path.join(os.tmpdir(), `zush-feature-videos-${Date.now()}`);

const only = argValue('--only') ?? 'batch-rename';
const themeArg = argValue('--theme');
const outputDirArg = argValue('--output-dir');
const posterOutputDirArg = argValue('--poster-output-dir');
const backendEnvironmentArg = argValue('--backend-environment');
const durationArg = Number(argValue('--duration'));
const realAnalysisTimeoutArg = Number(argValue('--real-analysis-timeout'));
const renameTimeoutArg = Number(argValue('--rename-timeout'));
const trimTailArg = Number(argValue('--trim-tail'));
const selectedThemes = themeArg ? [themeArg] : ['light', 'dark'];
const outputDir = path.resolve(outputDirArg ?? defaultOutputDir);
const posterOutputDir = path.resolve(posterOutputDirArg ?? defaultPosterOutputDir);
const selectedBackendEnvironment =
  backendEnvironmentArg ?? process.env.ZUSH_PROMO_BACKEND_ENVIRONMENT ?? 'prod';
const useRealAnalysis = args.has('--real-analysis');
const useSourceFolderFiles = args.has('--use-source-folder-files') || useRealAnalysis;
const durationSeconds = Number.isFinite(durationArg) && durationArg > 0
  ? Math.round(durationArg)
  : useRealAnalysis
    ? 240
    : 12;
const realAnalysisTimeoutMs = Number.isFinite(realAnalysisTimeoutArg) && realAnalysisTimeoutArg > 0
  ? Math.round(realAnalysisTimeoutArg * 1000)
  : Math.max(30_000, (durationSeconds - 20) * 1000);
const renameTimeoutMs = Number.isFinite(renameTimeoutArg) && renameTimeoutArg > 0
  ? Math.round(renameTimeoutArg * 1000)
  : 60_000;
const trimTailSeconds = Number.isFinite(trimTailArg) && trimTailArg > 0 ? trimTailArg : 1.8;
const stagedAnalysisDurationMs = 5_000;
const stagedAnalysisStartDelayMs = 2_000;
const promoAudioFileName = 'audio-sample.mp3';
const features = [{ id: 'batch-rename', fixture: 'batch-rename' }];
const selectedFeatures = features.filter((feature) => feature.id === only || feature.fixture === only);
const stagedHeroBatchFileNames = [
  '$_7 copy.jpg',
  'IMG_133.webp',
  'Deep_Work_-_Cal_Newport.pdf',
  'Employee Performance.docx',
  'Untitled.xlsx',
  'images.psd',
  'logo.ai',
  'work.fig',
  'animated.mp4',
  promoAudioFileName,
];
const skippedSourceFileNames = new Set(['.DS_Store', 'Thumbs.db']);

let activeZushPid = null;

if (selectedFeatures.length === 0) {
  throw new Error(`No feature matched --only=${only}`);
}

for (const theme of selectedThemes) {
  if (!['light', 'dark'].includes(theme)) {
    throw new Error(`Unsupported theme: ${theme}`);
  }
}

if (!['local', 'prod'].includes(selectedBackendEnvironment)) {
  throw new Error(`Unsupported backend environment: ${selectedBackendEnvironment}`);
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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sourceFolderFileNames(root = sourceAssetRoot) {
  if (!fs.existsSync(root)) {
    throw new Error(`Source fixture folder not found: ${root}`);
  }

  return fs.readdirSync(root)
    .filter((entry) => !entry.startsWith('.') && !skippedSourceFileNames.has(entry))
    .filter((entry) => fs.statSync(path.join(root, entry)).isFile())
    .sort((a, b) => a.localeCompare(b, 'en'));
}

function heroBatchFileNames() {
  return useSourceFolderFiles ? sourceFolderFileNames() : stagedHeroBatchFileNames;
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
  const fixtureFileNames = useSourceFolderFiles
    ? sourceFolderFileNames()
    : fs.readdirSync(sourceAssetRoot).filter((entry) => !entry.startsWith('.'));

  for (const entry of fixtureFileNames) {
    const source = path.join(sourceAssetRoot, entry);
    const target = path.join(targetRoot, entry);
    fs.cpSync(source, target, { recursive: true });
  }

  if (useSourceFolderFiles) {
    return targetRoot;
  }

  if (!fs.existsSync(sourceMp3File)) {
    throw new Error(`Promo MP3 fixture not found: ${sourceMp3File}`);
  }
  fs.copyFileSync(sourceMp3File, path.join(targetRoot, promoAudioFileName));

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

  run('defaults', ['write', 'com.lirik.Zush', 'debug.backend.environment', selectedBackendEnvironment]);
  run('defaults', [
    'write',
    'com.lirik.Zush',
    `debugTierOverride.${selectedBackendEnvironment}`,
    '-int',
    '2',
  ]);

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

function postFixture({
  fixture,
  theme,
  assetRoot,
  filePaths,
  runId,
  completionMarkerPath,
  stagedAnalysisDurationMs: fixtureStagedAnalysisDurationMs = 0,
  stagedAnalysisStartDelayMs: fixtureStagedAnalysisStartDelayMs = 0,
}) {
  const swift = `
import Foundation
let userInfo: [String: Any] = [
    "fixture": ${JSON.stringify(fixture)},
    "theme": ${JSON.stringify(theme)},
    "assetRoot": ${JSON.stringify(assetRoot)},
    "filePaths": ${JSON.stringify(filePaths ?? [])},
    "runId": ${JSON.stringify(runId)},
    "completionMarkerPath": ${JSON.stringify(completionMarkerPath)},
    "backendEnvironment": ${JSON.stringify(selectedBackendEnvironment)},
    "stagedAnalysisDurationMs": ${fixtureStagedAnalysisDurationMs},
    "stagedAnalysisStartDelayMs": ${fixtureStagedAnalysisStartDelayMs}
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

function heroBatchFilePaths(assetRoot) {
  return heroBatchFileNames().map((fileName) => path.join(assetRoot, fileName));
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

function postConfirmAllRenames({ runId, expectedCount, completionMarkerPath }) {
  const swift = `
import Foundation
let userInfo: [String: Any] = [
    "runId": ${JSON.stringify(runId)},
    "expectedCount": ${expectedCount},
    "completionMarkerPath": ${JSON.stringify(completionMarkerPath)}
]
DistributedNotificationCenter.default().postNotificationName(
    Notification.Name("com.lirik.Zush.debug.promoConfirmAllRenames"),
    object: nil,
    userInfo: userInfo,
    deliverImmediately: true
)
`;
  run('/usr/bin/swift', ['-e', swift]);
}

function postWaitForRenameCompletion({ runId, expectedCount, completionMarkerPath, timeoutMs }) {
  const swift = `
import Foundation
let userInfo: [String: Any] = [
    "runId": ${JSON.stringify(runId)},
    "expectedCount": ${expectedCount},
    "completionMarkerPath": ${JSON.stringify(completionMarkerPath)},
    "timeoutMs": ${timeoutMs}
]
DistributedNotificationCenter.default().postNotificationName(
    Notification.Name("com.lirik.Zush.debug.promoWaitForRenameCompletion"),
    object: nil,
    userInfo: userInfo,
    deliverImmediately: true
)
`;
  run('/usr/bin/swift', ['-e', swift]);
}

function pressRenameButton({ timeoutMs = 15_000 } = {}) {
  if (!activeZushPid) {
    throw new Error('Cannot press Rename because the active Zush pid is unknown');
  }

  const swift = `
import ApplicationServices
import Foundation

let app = AXUIElementCreateApplication(pid_t(${activeZushPid}))
let deadline = Date().addingTimeInterval(${timeoutMs / 1000})

func attributeValue<T>(_ element: AXUIElement, _ attribute: CFString) -> T? {
    var rawValue: CFTypeRef?
    let result = AXUIElementCopyAttributeValue(element, attribute, &rawValue)
    guard result == .success else { return nil }
    return rawValue as? T
}

func stringAttribute(_ element: AXUIElement, _ attribute: CFString) -> String? {
    if let value: String = attributeValue(element, attribute) {
        return value
    }
    return nil
}

func boolAttribute(_ element: AXUIElement, _ attribute: CFString) -> Bool? {
    if let value: Bool = attributeValue(element, attribute) {
        return value
    }
    return nil
}

func pointAttribute(_ element: AXUIElement, _ attribute: CFString) -> CGPoint? {
    var rawValue: CFTypeRef?
    let result = AXUIElementCopyAttributeValue(element, attribute, &rawValue)
    guard result == .success,
          let value = rawValue,
          CFGetTypeID(value) == AXValueGetTypeID() else {
        return nil
    }

    let axValue = value as! AXValue
    guard
          AXValueGetType(axValue) == .cgPoint else {
        return nil
    }

    var point = CGPoint.zero
    guard AXValueGetValue(axValue, .cgPoint, &point) else { return nil }
    return point
}

func sizeAttribute(_ element: AXUIElement, _ attribute: CFString) -> CGSize? {
    var rawValue: CFTypeRef?
    let result = AXUIElementCopyAttributeValue(element, attribute, &rawValue)
    guard result == .success,
          let value = rawValue,
          CFGetTypeID(value) == AXValueGetTypeID() else {
        return nil
    }

    let axValue = value as! AXValue
    guard
          AXValueGetType(axValue) == .cgSize else {
        return nil
    }

    var size = CGSize.zero
    guard AXValueGetValue(axValue, .cgSize, &size) else { return nil }
    return size
}

func elementList(_ element: AXUIElement, _ attribute: CFString) -> [AXUIElement] {
    var rawValue: CFTypeRef?
    let result = AXUIElementCopyAttributeValue(element, attribute, &rawValue)
    guard result == .success else { return [] }
    return rawValue as? [AXUIElement] ?? []
}

func children(of element: AXUIElement) -> [AXUIElement] {
    elementList(element, kAXWindowsAttribute as CFString) +
        elementList(element, kAXChildrenAttribute as CFString) +
        elementList(element, kAXContentsAttribute as CFString)
}

func isRenameButton(_ element: AXUIElement) -> Bool {
    guard stringAttribute(element, kAXRoleAttribute as CFString) == (kAXButtonRole as String) else {
        return false
    }

    let labels = [
        stringAttribute(element, kAXTitleAttribute as CFString),
        stringAttribute(element, kAXDescriptionAttribute as CFString),
        stringAttribute(element, kAXValueAttribute as CFString),
        stringAttribute(element, kAXIdentifierAttribute as CFString)
    ]

    return labels.compactMap { $0 }.contains("Rename")
}

func findRenameButton(in element: AXUIElement, depth: Int = 0) -> AXUIElement? {
    guard depth < 18 else { return nil }
    if isRenameButton(element) {
        return element
    }

    for child in children(of: element) {
        if let match = findRenameButton(in: child, depth: depth + 1) {
            return match
        }
    }

    return nil
}

func click(button: AXUIElement) -> Bool {
    if let position = pointAttribute(button, kAXPositionAttribute as CFString),
       let size = sizeAttribute(button, kAXSizeAttribute as CFString) {
        let center = CGPoint(x: position.x + size.width / 2, y: position.y + size.height / 2)
        CGWarpMouseCursorPosition(center)
        CGAssociateMouseAndMouseCursorPosition(boolean_t(1))
        Thread.sleep(forTimeInterval: 0.12)

        let source = CGEventSource(stateID: .hidSystemState)
        let down = CGEvent(
            mouseEventSource: source,
            mouseType: .leftMouseDown,
            mouseCursorPosition: center,
            mouseButton: .left
        )
        let up = CGEvent(
            mouseEventSource: source,
            mouseType: .leftMouseUp,
            mouseCursorPosition: center,
            mouseButton: .left
        )
        down?.post(tap: .cghidEventTap)
        Thread.sleep(forTimeInterval: 0.08)
        up?.post(tap: .cghidEventTap)
        return true
    }

    return AXUIElementPerformAction(button, kAXPressAction as CFString) == .success
}

while Date() < deadline {
    if let button = findRenameButton(in: app) {
        let enabled = boolAttribute(button, kAXEnabledAttribute as CFString) ?? true
        if enabled {
            if click(button: button) {
                print("pressed")
                exit(0)
            }
            fputs("Failed to click Rename button\\n", stderr)
            exit(1)
        }
    }

    Thread.sleep(forTimeInterval: 0.2)
}

fputs("Timed out waiting for enabled Rename button\\n", stderr)
exit(1)
`;

  run('/usr/bin/swift', ['-e', swift]);
}

async function waitForPromoRename(markerPath, timeoutMs = 45_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (fs.existsSync(markerPath)) {
      const marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
      if (marker.status !== 'ok') {
        throw new Error(
          `Promo rename ended with ${marker.status}: ` +
            `${marker.completedCount}/${marker.expectedCount ?? marker.itemCount} completed, ` +
            `${marker.failedCount} failed. ${marker.errors?.join('; ') ?? ''}`,
        );
      }
      return marker;
    }

    await wait(250);
  }

  throw new Error(`Timed out waiting for promo rename marker: ${markerPath}`);
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

function closeFinderInfoWindows() {
  run('osascript', [
    '-e',
    'tell application "Finder" to close every information window',
  ]);
}

function moveCursorOutsideWindow(window) {
  const x = window.x > 80 ? window.x - 40 : window.x + window.width + 40;
  const y = window.y + window.height / 2;
  const swift = `
import CoreGraphics
CGWarpMouseCursorPosition(CGPoint(x: ${Math.round(x)}, y: ${Math.round(y)}))
CGAssociateMouseAndMouseCursorPosition(boolean_t(1))
`;
  run('/usr/bin/swift', ['-e', swift]);
}

function recordWindow(window, outputPath) {
  const commandArgs = ['-x', '-o', '-a', '-v', `-V${durationSeconds}`, '-l', String(window.id), outputPath];

  return new Promise((resolve, reject) => {
    const child = spawn('screencapture', commandArgs, {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0 || !fs.existsSync(outputPath)) {
        reject(
          new Error(
            [
              `Command failed: screencapture ${commandArgs.join(' ')}`,
              stdout,
              stderr,
            ]
              .filter(Boolean)
              .join('\n'),
          ),
        );
        return;
      }
      resolve(outputPath);
    });
  });
}

function optimizeVideo({ rawPath, outputPath, trimSeconds }) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const commandArgs = [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    rawPath,
  ];

  if (Number.isFinite(trimSeconds) && trimSeconds > 0) {
    commandArgs.push('-t', String(trimSeconds));
  }

  commandArgs.push(
    '-an',
    '-vf',
    'fps=30,crop=iw-8:ih-8:4:4,scale=1280:1050:flags=lanczos,format=yuv420p',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '25',
    '-profile:v',
    'high',
    '-movflags',
    '+faststart',
    outputPath,
  );

  run('ffmpeg', commandArgs);
}

function writePoster({ videoPath, posterPath }) {
  fs.mkdirSync(path.dirname(posterPath), { recursive: true });
  const framePath = path.join(tempRoot, `${path.basename(posterPath, '.webp')}.png`);
  run('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-ss',
    '1',
    '-i',
    videoPath,
    '-frames:v',
    '1',
    framePath,
  ]);
  run('magick', [
    framePath,
    '-strip',
    '-quality',
    '78',
    '-define',
    'webp:method=6',
    posterPath,
  ]);
}

function videoMetadata(videoPath) {
  return run('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height,duration,bit_rate',
    '-of',
    'json',
    videoPath,
  ]);
}

async function captureFeatureVideo({ feature, theme, runId, assetRoot }) {
  setSystemDarkMode(theme === 'dark');
  await wait(450);

  const analysisMarkerPath = path.join(tempRoot, runId, `${feature.id}-${theme}-real-analysis.json`);
  const renameMarkerPath = path.join(tempRoot, runId, `${feature.id}-${theme}-rename.json`);
  fs.rmSync(analysisMarkerPath, { force: true });
  fs.rmSync(renameMarkerPath, { force: true });
  const filePaths = feature.id === 'batch-rename' ? heroBatchFilePaths(assetRoot) : undefined;
  postFixture({
    fixture: feature.fixture,
    theme,
    assetRoot,
    filePaths,
    runId,
    completionMarkerPath: analysisMarkerPath,
    stagedAnalysisDurationMs: useRealAnalysis ? 0 : stagedAnalysisDurationMs,
    stagedAnalysisStartDelayMs: useRealAnalysis ? 0 : stagedAnalysisStartDelayMs,
  });
  await wait(700);
  await waitForMainWindow();
  activateZushForCapture();

  const zushWindow = await waitForMainWindow();
  moveCursorOutsideWindow(zushWindow);
  await wait(120);
  const rawPath = path.join(tempRoot, runId, `${feature.id}-${theme}.mov`);
  console.log(`Recording ${feature.id} ${theme} for ${durationSeconds}s`);
  const recordingStartedAt = Date.now();
  const recordPromise = recordWindow(zushWindow, rawPath);
  const renamePromise = (async () => {
    const analysisMarker = await waitForPromoRealAnalysis(
      analysisMarkerPath,
      useRealAnalysis ? realAnalysisTimeoutMs : 30_000,
    );
    const elapsedText = analysisMarker.elapsedMilliseconds
      ? ` in ${(analysisMarker.elapsedMilliseconds / 1000).toFixed(1)}s`
      : '';
    console.log(
      `${useRealAnalysis ? 'Real AI analyzed' : 'Promo analysis staged'} ` +
        `${analysisMarker.analyzedCount}/${analysisMarker.expectedCount} batch files${elapsedText}`,
    );
    await wait(900);

    if (useRealAnalysis) {
      postWaitForRenameCompletion({
        runId,
        expectedCount: analysisMarker.expectedCount,
        completionMarkerPath: renameMarkerPath,
        timeoutMs: renameTimeoutMs,
      });
      pressRenameButton();
    } else {
      postConfirmAllRenames({
        runId,
        expectedCount: analysisMarker.expectedCount,
        completionMarkerPath: renameMarkerPath,
      });
    }

    const marker = await waitForPromoRename(
      renameMarkerPath,
      useRealAnalysis ? renameTimeoutMs + 5_000 : 45_000,
    );
    return {
      marker,
      completedAtMs: Date.now() - recordingStartedAt,
    };
  })();
  let renameError;
  renamePromise.catch((error) => {
    renameError = error;
  });

  await recordPromise;
  if (renameError) {
    throw renameError;
  }
  const { marker: renameMarker, completedAtMs } = await renamePromise;
  console.log(`Renamed ${renameMarker.completedCount}/${renameMarker.expectedCount} batch files`);

  const suffix = theme === 'dark' ? 'dark' : 'light';
  const outputPath = path.join(outputDir, `zush-${feature.id}-mac-window-${suffix}.mp4`);
  const posterPath = path.join(posterOutputDir, `hero-${feature.id}-mac-window-${suffix}.webp`);
  const trimSeconds = useRealAnalysis
    ? Math.min(durationSeconds, Math.ceil(completedAtMs / 1000 + trimTailSeconds))
    : undefined;
  optimizeVideo({ rawPath, outputPath, trimSeconds });
  writePoster({ videoPath: outputPath, posterPath });

  return { outputPath, posterPath };
}

async function main() {
  if (useSourceFolderFiles) {
    const fileNames = sourceFolderFileNames();
    console.log(`Using ${fileNames.length} source files from ${sourceAssetRoot}:`);
    for (const fileName of fileNames) {
      console.log(`- ${fileName}`);
    }
  }

  ensureBuilt();

  const originalDarkMode = getSystemDarkMode();
  const runId = `zush-promo-video-${process.pid}-${Date.now()}`;
  const app = startZush(runId);
  const outputs = [];

  try {
    await app.waitForPid();
    await wait(2500);

    for (const feature of selectedFeatures) {
      for (const theme of selectedThemes) {
        closeFinderInfoWindows();
        const assetRoot = copyFixtureAssets(`${runId}-${feature.id}-${theme}`);
        const output = await captureFeatureVideo({ feature, theme, runId, assetRoot });
        outputs.push(output);
        console.log(`Wrote ${path.relative(repoRoot, output.outputPath)}`);
        console.log(`Wrote ${path.relative(repoRoot, output.posterPath)}`);
        console.log(videoMetadata(output.outputPath));
      }
    }
  } finally {
    closeFinderInfoWindows();
    setSystemDarkMode(originalDarkMode);
    app.kill();
  }

  console.log(`Generated ${outputs.length} video${outputs.length === 1 ? '' : 's'}.`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
