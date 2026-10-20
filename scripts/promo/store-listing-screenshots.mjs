#!/usr/bin/env node
// Renders the Mac App Store and Microsoft Store listing screenshots: a feature
// title and benefit on the left, the app window on the right, over the homepage
// hero background. The windows come from the lossless captures that
// zush-feature-screenshots.mjs and zush-windows-feature-screenshots.mjs save
// with --window-output-dir (<id>-light.png, transparent or square corners, no
// wallpaper).
//
// Store requirements reflected here:
//   App Store (macOS): 16:10, 2880x1800 is the largest accepted size, PNG
//   without alpha, up to 10 screenshots.
//   Microsoft Store (desktop): PNG, at least 1366x768 (4K supported), up to
//   10 screenshots, under 50 MB; text kept in the top two-thirds.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const templatePath = path.join(__dirname, 'store-listing/template.html');
const fontFiles = {
  manrope: path.join(repoRoot, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'),
  inter: path.join(repoRoot, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
};

const slides = [
  {
    name: '01-ai-batch-rename',
    title: 'AI Batch Rename',
    subtitle: 'Rename hundreds of files by what’s actually inside them. Preview every new name before you apply.',
    mac: 'batch-rename',
    windows: 'batch-rename',
  },
  {
    name: '02-custom-ai-blocks',
    title: 'Custom AI Blocks',
    subtitle: 'Describe a detail once, like an invoice number or client name, and reuse it as your own naming block.',
    mac: 'custom-ai-blocks',
    windows: 'custom-ai-blocks',
  },
  {
    name: '03-ai-folder-sorting',
    title: 'AI Folder Sorting',
    subtitle: 'Let AI sort files into folders by content, or describe your own folder rules in plain words.',
    mac: 'folder-sorting',
    windows: 'folder-sorting',
  },
  {
    name: '04-folders-monitor',
    title: 'Folders Monitor',
    subtitle: 'Choose a folder once. New files get clear, consistent names automatically as they arrive.',
    mac: 'monitor',
    windows: 'monitor',
  },
  {
    name: '05-activity-history',
    title: 'Activity History',
    subtitle: 'See every rename Zush has made and undo any batch when you change your mind.',
    mac: 'activity',
    windows: 'activity',
  },
  {
    name: '06-templates',
    title: 'Templates',
    subtitle: 'Save your naming setups and switch between them for different projects and workflows.',
    mac: 'templates',
    windows: 'templates',
  },
  {
    name: '07-naming-blocks',
    title: 'Naming Blocks',
    subtitle: 'Drag and drop 145+ ready-made blocks to build exactly the filename format you need.',
    mac: 'naming-blocks',
    windows: 'naming-blocks',
  },
  {
    name: '08-custom-prompts',
    title: 'Custom Prompts',
    subtitle: 'Extract any information you need from your files with AI and put it right into the filename.',
    mac: 'custom-prompts',
    windows: 'custom-prompts',
  },
  {
    name: '09-offline-mode',
    title: 'Offline Mode',
    subtitle: {
      mac: 'Keep your files private: AI runs on your Mac with LM Studio or Ollama, so files never leave your device.',
      windows: 'Keep your files private: AI runs on your PC with LM Studio or Ollama, so files never leave your device.',
    },
    mac: 'lm-studio',
    windows: 'offline-ai',
  },
  {
    name: '10-byok',
    title: 'BYOK',
    subtitle: 'Connect your own Gemini, OpenAI, Claude or OpenRouter key and pick the model you trust.',
    mac: 'byok',
    windows: 'byok',
  },
];

const targets = {
  'app-store': {
    platform: 'mac',
    source: 'mac',
    viewport: { width: 1440, height: 900 },
    scale: 2,
    defaultOutputDir: path.resolve(repoRoot, '../zush-assets/App Store'),
  },
  'microsoft-store': {
    platform: 'win',
    source: 'windows',
    viewport: { width: 1920, height: 1080 },
    // 2880x1620: the Windows capture (about 1780 px wide) is drawn at 1590 px,
    // a slight downscale. 3840x2160 would upscale it and soften the UI.
    scale: 1.5,
    defaultOutputDir: path.resolve(repoRoot, '../zush-assets/Microsoft Store/Windows'),
  },
};

function argValue(name) {
  return process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1);
}

// Windows captures include the window frame's dark 1-2 px border and opaque
// corners. Shave the border (measured from the capture, so any display scale
// works); the template clips the corners to the Windows 11 radius.
function shaveWindowsFrame(windowPath, outputPath) {
  const height = Number(run('magick', ['identify', '-format', '%h', windowPath]));
  const row = run('magick', [
    windowPath, '-crop', `12x1+0+${Math.round(height / 2)}`, '+repage',
    '-colorspace', 'Gray', '-depth', '8', 'txt:-',
  ]);
  const levels = row.split('\n').slice(1).map((line) => Number(line.match(/\((\d+)/)?.[1] ?? 255));
  const border = levels.findIndex((level) => level > 128);
  if (border < 0 || border > 6) throw new Error(`Unexpected window frame in ${windowPath}`);
  run('magick', [windowPath, '-shave', `${border}x${border}`, outputPath]);
  return outputPath;
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`${command} failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

const sourceDirs = {
  mac: argValue('--mac-windows-dir'),
  windows: argValue('--windows-windows-dir'),
};
const selectedTargets = (argValue('--targets') ?? 'app-store,microsoft-store').split(',').map((target) => target.trim());
const onlySlides = argValue('--only')?.split(',').map((name) => name.trim());
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (process.argv.includes('--help')) {
  console.log(`Usage: node scripts/promo/store-listing-screenshots.mjs --mac-windows-dir=DIR --windows-windows-dir=DIR

  --targets=app-store,microsoft-store  Which store sets to render.
  --only=01-ai-batch-rename,...        Render selected slides.
  --app-store-output-dir=DIR           Default: ../zush-assets/App Store
  --microsoft-store-output-dir=DIR     Default: ../zush-assets/Microsoft Store/Windows
  CHROME_PATH                          Chrome binary used for rendering.`);
  process.exit(0);
}

for (const target of selectedTargets) {
  const config = targets[target];
  if (!config) throw new Error(`Unknown target: ${target}`);
  if (!sourceDirs[config.source]) {
    throw new Error(`--${config.source}-windows-dir is required for ${target}.`);
  }
}
for (const file of [chrome, templatePath, ...Object.values(fontFiles)]) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${file}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'zush-store-listing-'));
let rendered = 0;
try {
  for (const target of selectedTargets) {
    const config = targets[target];
    const outputDir = path.resolve(argValue(`--${target}-output-dir`) ?? config.defaultOutputDir);
    fs.mkdirSync(outputDir, { recursive: true });

    for (const slide of slides) {
      if (onlySlides && !onlySlides.includes(slide.name)) continue;
      const windowPath = path.resolve(sourceDirs[config.source], `${slide[config.source]}-light.png`);
      if (!fs.existsSync(windowPath)) throw new Error(`Missing window capture: ${windowPath}`);
      const shotPath = config.platform === 'win'
        ? shaveWindowsFrame(windowPath, path.join(tempRoot, `${slide.name}-window.png`))
        : windowPath;

      const subtitle = typeof slide.subtitle === 'string' ? slide.subtitle : slide.subtitle[config.source];
      const query = new URLSearchParams({
        platform: config.platform,
        title: slide.title,
        subtitle,
        shot: pathToFileURL(shotPath).href,
        manrope: pathToFileURL(fontFiles.manrope).href,
        inter: pathToFileURL(fontFiles.inter).href,
      });
      const rawPath = path.join(tempRoot, `${target}-${slide.name}.png`);
      run(chrome, [
        '--headless=new',
        '--hide-scrollbars',
        '--force-color-profile=srgb',
        `--force-device-scale-factor=${config.scale}`,
        `--window-size=${config.viewport.width},${config.viewport.height}`,
        '--virtual-time-budget=5000',
        '--allow-file-access-from-files',
        `--user-data-dir=${path.join(tempRoot, 'chrome-profile')}`,
        `--screenshot=${rawPath}`,
        `${pathToFileURL(templatePath).href}?${query}`,
      ]);

      // Lossless PNG, opaque RGB: the App Store rejects alpha channels.
      const outputPath = path.join(outputDir, `${slide.name}.png`);
      run('magick', [
        rawPath,
        '-colorspace', 'sRGB',
        '-alpha', 'off',
        '-strip',
        '-define', 'png:color-type=2',
        '-define', 'png:compression-level=9',
        '-define', 'png:compression-filter=5',
        outputPath,
      ]);
      const expected = `${config.viewport.width * config.scale}x${config.viewport.height * config.scale}`;
      const actual = run('magick', ['identify', '-format', '%wx%h', outputPath]);
      if (actual !== expected) throw new Error(`${outputPath} is ${actual}, expected ${expected}`);
      console.log(`Wrote ${outputPath}`);
      rendered += 1;
    }
  }
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
console.log(`Rendered ${rendered} store screenshot${rendered === 1 ? '' : 's'}.`);
