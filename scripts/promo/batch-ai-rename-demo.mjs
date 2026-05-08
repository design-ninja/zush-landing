#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const zushRoot = process.env.ZUSH_APP_ROOT ||
  resolve(repoRoot, "../zush-app");
const openscreenRoot = process.env.OPENSCREEN_ROOT ||
  resolve(repoRoot, "../openscreen");
const assetsRoot = process.env.ZUSH_ASSETS_ROOT ||
  resolve(repoRoot, "../zush-assets");

const localAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const demoLocalAiConfig = {
  ai_provider: "groq",
  ai_model: "meta-llama/llama-4-scout-17b-16e-instruct",
  ai_provider_fallback: "gemini",
  ai_model_fallback: "gemini-3-flash-preview",
};
const demoLocalAiConfigKeys = Object.keys(demoLocalAiConfig);

const defaultFiles = [
  "Untitled.xlsx",
  "apasaric-1388030.jpg",
  "wedding.jpg",
  "Employee Performance.docx",
  "Deep_Work_-_Cal_Newport.pdf",
];

const renderTargets = {
  landing: { width: 2560, height: 1440 },
  story: { width: 1440, height: 2560 },
};

const optionDefaults = {
  backend: "local",
  theme: "both",
  duration: 26,
  aiWaitTimeout: 90,
  build: true,
  startLocalBackend: true,
  allowAiUpload: false,
  demoAiConfig: true,
  dryRun: false,
  renderOnly: false,
  sourceType: "window",
  source: "AI Rename",
};

const options = parseArgs(process.argv.slice(2));
const cleanupTasks = [];
let originalSystemDarkMode = null;
let systemAppearanceTouched = false;
let originalLocalAiConfig = null;

process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});
process.on("exit", cleanup);

main().catch((error) => {
  cleanup();
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

async function main() {
  validateOptions(options);
  if (!options.renderOnly && !options.dryRun && !options.allowAiUpload) {
    throw new Error(
      [
        "Refusing to run real AI analysis without --allow-ai-upload.",
        "This demo opens temporary copies of files in Zush; Zush sends their content to the selected backend and AI provider.",
        "Use --allow-ai-upload only when those demo files are safe to send.",
      ].join("\n"),
    );
  }

  const themes = options.theme === "both" ? ["light", "dark"] : [options.theme];
  const app = appConfigFor(options.backend);

  if (!options.renderOnly && options.build) {
    buildZush(app);
  }

  if (!options.renderOnly && options.backend === "local" && options.startLocalBackend) {
    await startLocalBackend();
    await waitForLocalConfig();
  }

  if (!options.renderOnly && options.backend === "local" && options.demoAiConfig) {
    configureLocalDemoAiConfig();
  }

  ensureOpenScreenBuilt();

  for (const theme of themes) {
    if (options.renderOnly) {
      renderExistingTheme(theme);
    } else {
      await recordTheme({ theme, app });
    }
  }

  console.log("Done.");
  cleanup();
}

function parseArgs(argv) {
  const parsed = { ...optionDefaults };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) {
        throw new Error(`Missing value for ${arg}`);
      }
      return argv[index];
    };

    switch (arg) {
      case "--":
        break;
      case "--backend":
        parsed.backend = next();
        break;
      case "--theme":
        parsed.theme = next();
        break;
      case "--duration":
        parsed.duration = Number(next());
        break;
      case "--ai-wait-timeout":
        parsed.aiWaitTimeout = Number(next());
        break;
      case "--source-type":
        parsed.sourceType = next();
        break;
      case "--source":
        parsed.source = next();
        break;
      case "--skip-build":
        parsed.build = false;
        break;
      case "--no-start-local-backend":
        parsed.startLocalBackend = false;
        break;
      case "--no-demo-ai-config":
        parsed.demoAiConfig = false;
        break;
      case "--allow-ai-upload":
        parsed.allowAiUpload = true;
        break;
      case "--dry-run":
        parsed.dryRun = true;
        break;
      case "--render-only":
        parsed.renderOnly = true;
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function validateOptions(value) {
  if (!["local", "prod"].includes(value.backend)) {
    throw new Error("--backend must be local or prod");
  }
  if (!["light", "dark", "both"].includes(value.theme)) {
    throw new Error("--theme must be light, dark, or both");
  }
  if (!Number.isFinite(value.duration) || value.duration < 8) {
    throw new Error("--duration must be a number >= 8");
  }
  if (!Number.isFinite(value.aiWaitTimeout) || value.aiWaitTimeout < 5) {
    throw new Error("--ai-wait-timeout must be a number >= 5");
  }
  for (const path of [zushRoot, openscreenRoot, assetsRoot]) {
    if (!existsSync(path)) {
      throw new Error(`Required path does not exist: ${path}`);
    }
  }
}

function printHelp() {
  console.log(`Usage:
  pnpm promo:batch-ai-rename -- --backend local --theme both --allow-ai-upload

Options:
  --backend local|prod          Backend to use. Default: local.
  --theme light|dark|both       Theme(s) to record. Default: both.
  --duration <seconds>          Recording length. Default: 26.
  --ai-wait-timeout <seconds>   Max time to wait for analyzed rows. Default: 90.
  --source-type window|screen|any
  --source <name>               OpenScreen capture source match. Default: AI Rename.
  --skip-build                  Reuse the existing /private/tmp Zush build.
  --no-start-local-backend      Do not run Supabase CLI local stack/functions.
  --no-demo-ai-config           Do not temporarily align local app_config with prod-like demo AI settings.
  --allow-ai-upload             Required for real AI runs.
  --render-only                 Re-render existing /private/tmp OpenScreen projects.
  --dry-run                     Print and validate setup without recording.
`);
}

function appConfigFor(backend) {
  if (backend === "local") {
    return {
      configuration: "Debug",
      backend,
      appPath:
        "/private/tmp/zush-demo-derived-debug/Build/Products/Debug/Zush.app",
      derivedDataPath: "/private/tmp/zush-demo-derived-debug",
    };
  }

  return {
    configuration: "Release",
    backend,
    appPath: "/private/tmp/zush-demo-derived/Build/Products/Release/Zush.app",
    derivedDataPath: "/private/tmp/zush-demo-derived",
  };
}

function buildZush(app) {
  run(
    "xcodebuild",
    [
      "-project",
      join(zushRoot, "Zush.xcodeproj"),
      "-scheme",
      "Zush",
      "-configuration",
      app.configuration,
      "-derivedDataPath",
      app.derivedDataPath,
      "CODE_SIGNING_ALLOWED=NO",
      "build",
    ],
    { cwd: zushRoot },
  );
}

async function startLocalBackend() {
  run("open", ["-a", "Docker"], { allowFail: true });
  await waitForCommand({
    label: "Docker daemon",
    command: "docker",
    args: ["info", "--format", "{{.ServerVersion}}"],
    timeoutMs: 60_000,
  });

  run("./scripts/supabase-local.sh", ["start"], { cwd: zushRoot });

  const serve = spawn("./scripts/supabase-local.sh", [
    "functions",
    "serve",
    "--env-file",
    ".env",
  ], {
    cwd: zushRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });
  cleanupTasks.push(() => stopProcess(serve));

  await waitForOutput({
    child: serve,
    label: "Supabase functions",
    pattern: /Serving functions on/,
    timeoutMs: 45_000,
  });
}

async function waitForLocalConfig() {
  const url = "http://127.0.0.1:54321/functions/v1/config";
  const startedAt = Date.now();
  let lastError = "";

  while (Date.now() - startedAt < 30_000) {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${localAnonKey}` },
      });
      if (response.ok) return;
      lastError = `${response.status} ${await response.text()}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await delay(750);
  }

  throw new Error(`Local config function did not become ready: ${lastError}`);
}

function ensureOpenScreenBuilt() {
  if (!existsSync(join(openscreenRoot, "dist", "index.html"))) {
    run("npm", ["run", "build-vite"], { cwd: openscreenRoot });
  }
}

async function recordTheme({ theme, app }) {
  const paths = pathsForTheme(theme);
  prepareFiles(paths.inputDir);

  if (options.dryRun) {
    console.log(`[dry-run] ${theme}: would record ${paths.landingOutput}`);
    return;
  }

  configureSystemAppearanceForTheme(theme);
  configureZushDefaults({ theme, backend: app.backend });
  quitZush();
  openZush(app.appPath);
  await delay(2_000);
  positionZushWindow();
  await delay(500);
  resetZushBatchIfNeeded();

  const recordArgs = [
    "run",
    "cli",
    "--",
    "record",
    "--duration",
    String(options.duration),
    "--source-type",
    options.sourceType,
    "--source",
    options.source,
    "--output",
    paths.rawRecording,
    "--project",
    paths.project,
    "--json",
  ];

  rmSync(paths.workDir, { recursive: true, force: true });
  mkdirSync(paths.workDir, { recursive: true });
  prepareFiles(paths.inputDir);

  const recorder = spawn("npm", recordArgs, {
    cwd: openscreenRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });
  pipeChild(recorder, `openscreen:${theme}`);

  await delay(2_000);
  openFilesInZush(app.appPath, paths.demoFiles);
  await waitForAnalyzedRows(defaultFiles.length, options.aiWaitTimeout * 1000);
  await delay(2_500);

  await waitForExit(recorder, `OpenScreen record (${theme})`);

  styleProject(paths.project, theme);
  clearProjectZooms(paths.project);
  renderOutputs(paths, theme);
  makePoster(paths.landingOutput, paths.posterOutput);
  copyLandingAssets(paths, theme);
}

function renderExistingTheme(theme) {
  const paths = pathsForTheme(theme);

  if (options.dryRun) {
    console.log(`[dry-run] ${theme}: would render ${paths.project}`);
    return;
  }

  if (!existsSync(paths.project)) {
    throw new Error(`Missing OpenScreen project: ${paths.project}`);
  }

  styleProject(paths.project, theme);
  clearProjectZooms(paths.project);
  renderOutputs(paths, theme);
  makePoster(paths.landingOutput, paths.posterOutput);
  copyLandingAssets(paths, theme);
}

function pathsForTheme(theme) {
  const suffix = theme === "dark" ? "-dark" : "";
  const workDir = `/private/tmp/zush-promo/batch-ai-rename/${theme}`;
  const outputDir = join(assetsRoot, "promo-videos");
  const postersDir = join(repoRoot, "public/videos/posters");
  const publicVideoDir = join(repoRoot, "public/videos");
  const inputDir = join(workDir, "input");

  return {
    workDir,
    inputDir,
    rawRecording: join(workDir, `batch-ai-rename${suffix}.webm`),
    project: join(workDir, `batch-ai-rename${suffix}.openscreen`),
    landingMaster: join(workDir, `zush-batch-rename${suffix}-landing-master.mp4`),
    storyMaster: join(workDir, `zush-batch-rename${suffix}-story-master.mp4`),
    landingOutput: join(outputDir, `zush-batch-rename${suffix}.mp4`),
    storyOutput: join(outputDir, `zush-batch-rename${suffix}-story.mp4`),
    posterOutput: join(postersDir, `batch-rename${suffix}.webp`),
    publicVideo: join(publicVideoDir, `zush-batch-rename${suffix}.mp4`),
    demoFiles: defaultFiles.map((name) => join(inputDir, name)),
  };
}

function prepareFiles(inputDir) {
  const sourceDir = join(assetsRoot, "#test files/Files");
  rmSync(inputDir, { recursive: true, force: true });
  mkdirSync(inputDir, { recursive: true });

  for (const file of defaultFiles) {
    const source = join(sourceDir, file);
    if (!existsSync(source) || !statSync(source).isFile()) {
      throw new Error(`Missing demo file: ${source}`);
    }
    copyFileSync(source, join(inputDir, basename(file)));
  }
}

function configureZushDefaults({ theme, backend }) {
  run("defaults", ["write", "com.lirik.Zush", "hasCompletedOnboarding", "-bool", "true"]);
  run("defaults", ["write", "com.lirik.Zush", "hasAgreedToAIDataProcessing", "-bool", "true"]);
  run("defaults", ["write", "com.lirik.Zush", "appearancePreference", "-string", theme]);
  run("defaults", ["write", "com.lirik.Zush", "interfaceLanguagePreference", "-string", "en"]);
  run("defaults", ["write", "com.lirik.Zush", "showDockIconPreference", "-bool", "true"]);

  if (backend === "local") {
    run("defaults", ["write", "com.lirik.Zush", "debug.backend.environment", "-string", "local"]);
    run("defaults", ["write", "com.lirik.Zush", "debugTierOverride.local", "-int", "2"]);
  } else {
    run("defaults", ["write", "com.lirik.Zush", "debug.backend.environment", "-string", "prod"]);
  }
}

function configureLocalDemoAiConfig() {
  if (originalLocalAiConfig !== null) return;

  originalLocalAiConfig = readLocalAppConfig(demoLocalAiConfigKeys);
  cleanupTasks.push(restoreLocalAiConfig);

  updateLocalAppConfig(demoLocalAiConfig);
}

function restoreLocalAiConfig() {
  if (originalLocalAiConfig === null) return;

  try {
    updateLocalAppConfig(originalLocalAiConfig);
  } finally {
    originalLocalAiConfig = null;
  }
}

function readLocalAppConfig(keys) {
  const keyList = keys.map(sqlStringLiteral).join(", ");
  const result = run("./scripts/supabase-local.sh", [
    "db",
    "query",
    "--output",
    "json",
    `select key, value from app_config where key in (${keyList}) order by key;`,
  ], { cwd: zushRoot, capture: true });
  const payload = parseSupabaseJson(result.stdout || "");
  const rows = Array.isArray(payload.rows) ? payload.rows : [];
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

function updateLocalAppConfig(values) {
  const entries = Object.entries(values);
  if (entries.length === 0) return;

  const cases = entries
    .map(([key, value]) => `when ${sqlStringLiteral(key)} then ${sqlJsonbLiteral(value)}`)
    .join(" ");
  const keyList = entries.map(([key]) => sqlStringLiteral(key)).join(", ");

  run("./scripts/supabase-local.sh", [
    "db",
    "query",
    `update app_config set value = case key ${cases} else value end where key in (${keyList});`,
  ], { cwd: zushRoot });
}

function parseSupabaseJson(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Supabase CLI did not return JSON: ${output.slice(0, 300)}`);
  }

  return JSON.parse(output.slice(start, end + 1));
}

function configureSystemAppearanceForTheme(theme) {
  const darkMode = theme === "dark";
  if (originalSystemDarkMode === null) {
    originalSystemDarkMode = getSystemDarkMode();
    cleanupTasks.push(restoreSystemAppearance);
  }

  setSystemDarkMode(darkMode);
}

function getSystemDarkMode() {
  const result = run("osascript", [
    "-e",
    'tell application "System Events" to tell appearance preferences to get dark mode',
  ], { capture: true });

  return (result.stdout || "").trim() === "true";
}

function setSystemDarkMode(enabled) {
  run("osascript", [
    "-e",
    `tell application "System Events" to tell appearance preferences to set dark mode to ${
      enabled ? "true" : "false"
    }`,
  ]);
  systemAppearanceTouched = true;
  delaySync(1_000);
}

function restoreSystemAppearance() {
  if (originalSystemDarkMode === null || !systemAppearanceTouched) return;

  try {
    run("osascript", [
      "-e",
      `tell application "System Events" to tell appearance preferences to set dark mode to ${
        originalSystemDarkMode ? "true" : "false"
      }`,
    ], { allowFail: true, capture: true });
  } finally {
    originalSystemDarkMode = null;
    systemAppearanceTouched = false;
  }
}

function quitZush() {
  run("osascript", [
    "-e",
    'tell application id "com.lirik.Zush" to quit',
  ], { allowFail: true });
  delaySync(1_000);
}

function openZush(appPath) {
  run("open", ["-n", appPath]);
}

function positionZushWindow() {
  run("osascript", [
    "-e",
    'tell application "System Events" to tell process "Zush" to set frontmost to true',
    "-e",
    'tell application "System Events" to tell process "Zush" to tell window 1 to set position to {484, 130}',
    "-e",
    'tell application "System Events" to tell process "Zush" to tell window 1 to set size to {760, 640}',
  ], { allowFail: true });
}

function resetZushBatchIfNeeded() {
  run("osascript", [
    "-e",
    [
      'tell application "System Events" to tell process "Zush"',
      'if exists button "Start Over" of window 1 then click button "Start Over" of window 1',
      'if exists button "Cancel" of window 1 then click button "Cancel" of window 1',
      "end tell",
    ].join("\n"),
  ], { allowFail: true });
  delaySync(500);
}

function openFilesInZush(appPath, files) {
  run("open", ["-a", appPath, ...files]);
}

async function waitForAnalyzedRows(total, timeoutMs) {
  const startedAt = Date.now();
  let lastTree = "";
  let sawInProgress = false;

  while (Date.now() - startedAt < timeoutMs) {
    const result = run("osascript", [
      "-e",
      'tell application "System Events" to tell process "Zush" to tell window 1 to get entire contents',
    ], { allowFail: true, capture: true });

    lastTree = result.stdout || result.stderr || "";
    const analyzedCount = getAnalyzedCount(lastTree, total);
    if (lastTree.includes("Analyzing file") ||
      (analyzedCount !== null && analyzedCount < total)) {
      sawInProgress = true;
    }
    if (analyzedCount === total && (sawInProgress || Date.now() - startedAt > 2_000)) {
      return;
    }

    await delay(1_500);
  }

  throw new Error(
    `Timed out waiting for ${total} analyzed rows. Last UI tree contained: ${
      lastTree.slice(0, 600)
    }`,
  );
}

function getAnalyzedCount(tree, total) {
  const progressMatch = tree.match(new RegExp(`(\\d+) of ${total} analyzed`));
  if (progressMatch) return Number(progressMatch[1]);
  if (tree.includes(`${total} analyzed`)) return total;
  return null;
}

function styleProject(project, theme) {
  runOpenScreen([
    "project",
    "edit",
    "--project",
    project,
    "--aspect-ratio",
    "16:9",
    "--wallpaper",
    theme === "dark" ? "#101113" : "#f2f4f7",
    "--padding",
    "10",
    "--border-radius",
    "0",
    "--shadow-intensity",
    "0.32",
    "--show-blur",
    "--motion-blur",
    "0.08",
    "--export-quality",
    "source",
    "--export-format",
    "mp4",
  ]);
}

function clearProjectZooms(project) {
  const data = JSON.parse(readFileSync(project, "utf8"));
  data.editor = data.editor || {};
  data.editor.zoomRegions = [];
  writeFileSync(project, JSON.stringify(data, null, 2));
}

function renderOutputs(paths, theme) {
  mkdirSync(dirname(paths.landingOutput), { recursive: true });
  mkdirSync(dirname(paths.storyOutput), { recursive: true });

  runOpenScreen([
    "render",
    "--project",
    paths.project,
    "--output",
    paths.landingMaster,
    "--format",
    "mp4",
    "--quality",
    "source",
    "--width",
    String(renderTargets.landing.width),
    "--height",
    String(renderTargets.landing.height),
    "--overwrite",
    "--json",
  ]);
  optimizeMp4(paths.landingMaster, paths.landingOutput);

  runOpenScreen([
    "project",
    "edit",
    "--project",
    paths.project,
    "--aspect-ratio",
    "9:16",
    "--wallpaper",
    theme === "dark" ? "#101113" : "#f2f4f7",
    "--padding",
    "7",
    "--border-radius",
    "0",
    "--shadow-intensity",
    "0.28",
  ]);

  runOpenScreen([
    "render",
    "--project",
    paths.project,
    "--output",
    paths.storyMaster,
    "--format",
    "mp4",
    "--quality",
    "source",
    "--width",
    String(renderTargets.story.width),
    "--height",
    String(renderTargets.story.height),
    "--overwrite",
    "--json",
  ]);
  optimizeMp4(paths.storyMaster, paths.storyOutput);

  styleProject(paths.project, theme);
}

function optimizeMp4(input, output) {
  run("ffmpeg", [
    "-y",
    "-i",
    input,
    "-map",
    "0:v:0",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    output,
  ]);
}

function makePoster(video, poster) {
  mkdirSync(dirname(poster), { recursive: true });
  const frame = `${poster}.png`;
  const frameResult = run("ffmpeg", [
    "-y",
    "-ss",
    "00:00:08",
    "-i",
    video,
    "-frames:v",
    "1",
    "-vf",
    "scale=1400:-1",
    "-update",
    "1",
    frame,
  ], { allowFail: true, capture: true });

  if (frameResult.status !== 0) {
    console.warn(`Poster frame generation skipped: ${frameResult.stderr || "ffmpeg failed"}`);
    return;
  }

  const posterResult = run("magick", [
    frame,
    "-quality",
    "82",
    poster,
  ], { allowFail: true, capture: true });

  rmSync(frame, { force: true });

  if (posterResult.status !== 0) {
    console.warn(`Poster conversion skipped: ${posterResult.stderr || "magick failed"}`);
  }
}

function copyLandingAssets(paths) {
  mkdirSync(dirname(paths.publicVideo), { recursive: true });
  copyFileSync(paths.landingOutput, paths.publicVideo);
}

function runOpenScreen(args) {
  run("npm", ["run", "cli", "--", ...args], { cwd: openscreenRoot });
}

function run(command, args, settings = {}) {
  const {
    cwd = repoRoot,
    allowFail = false,
    capture = false,
  } = settings;

  const printable = `${command} ${args.map(shellQuote).join(" ")}`;
  console.log(`$ ${printable}`);

  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error && !allowFail) {
    throw result.error;
  }
  if (result.status !== 0 && !allowFail) {
    throw new Error(`Command failed (${result.status}): ${printable}`);
  }

  return result;
}

async function waitForCommand({ label, command, args, timeoutMs }) {
  const startedAt = Date.now();
  let lastStatus = null;

  while (Date.now() - startedAt < timeoutMs) {
    const result = spawnSync(command, args, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    lastStatus = result.status;
    if (result.status === 0) return;
    await delay(1_000);
  }

  throw new Error(`${label} did not become ready; last status ${lastStatus}`);
}

async function waitForOutput({ child, label, pattern, timeoutMs }) {
  let buffer = "";
  const append = (chunk) => {
    const text = chunk.toString();
    buffer += text;
    process.stdout.write(text);
  };

  child.stdout.on("data", append);
  child.stderr.on("data", append);

  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (pattern.test(buffer)) return;
    if (child.exitCode !== null) {
      throw new Error(`${label} exited early with code ${child.exitCode}`);
    }
    await delay(250);
  }

  throw new Error(`${label} did not print readiness marker`);
}

function pipeChild(child, label) {
  child.stdout.on("data", (chunk) => process.stdout.write(`[${label}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[${label}] ${chunk}`));
}

async function waitForExit(child, label) {
  const code = child.exitCode ?? await new Promise((resolve) => {
    child.once("exit", resolve);
  });
  if (code !== 0) {
    throw new Error(`${label} failed with code ${code}`);
  }
}

function stopProcess(child) {
  if (child.exitCode === null && !child.killed) {
    child.kill("SIGTERM");
  }
}

function cleanup() {
  while (cleanupTasks.length > 0) {
    const task = cleanupTasks.pop();
    try {
      task();
    } catch {
      // Best-effort cleanup.
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function delaySync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function shellQuote(value) {
  if (/^[A-Za-z0-9_./:=@-]+$/.test(value)) return value;
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function sqlStringLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlJsonbLiteral(value) {
  return `${sqlStringLiteral(JSON.stringify(value))}::jsonb`;
}
