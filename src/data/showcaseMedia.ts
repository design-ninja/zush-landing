export type ShowcaseTheme = 'light' | 'dark';

interface ThemeAwareMedia {
  light: string;
  dark: string;
}

export interface ShowcaseVideoAsset {
  id: string;
  title: string;
  description: string;
  sources: ThemeAwareMedia;
  posters: ThemeAwareMedia;
}

export interface ShowcaseScreenshotAsset {
  id: string;
  title: string;
  description: string;
  images: ThemeAwareMedia;
  video?: ThemeAwareMedia;
  alt: string;
}

export interface ResolvedShowcaseVideoMedia {
  source: string;
  poster: string;
}

export interface HeroVideoShowcaseAsset {
  title: string;
  description: string;
  frame?: 'mac' | 'windows';
  width: number;
  height: number;
  dimensions?: Record<ShowcaseTheme, { width: number; height: number }>;
  sources: ThemeAwareMedia;
  posters: ThemeAwareMedia;
}

export const HOME_HERO_BATCH_RENAME_VIDEO: HeroVideoShowcaseAsset = {
  title: 'Zush batch rename workflow on macOS',
  description: 'A Zush for Mac window showing AI batch rename analysis, review, and completed rename results for mixed files.',
  frame: 'mac',
  width: 1280,
  height: 1050,
  dimensions: {
    light: { width: 2082, height: 1638 },
    dark: { width: 2084, height: 1636 },
  },
  sources: {
    light: '/videos/hero/zush-invoices-demo-mac-window-light.mp4',
    dark: '/videos/hero/zush-invoices-demo-mac-window-dark.mp4',
  },
  posters: {
    light: '/videos/posters/hero-invoices-demo-mac-window-light.webp',
    dark: '/videos/posters/hero-invoices-demo-mac-window-dark.webp',
  },
};

export const WINDOWS_HERO_BATCH_RENAME_VIDEO: HeroVideoShowcaseAsset = {
  title: 'Zush batch rename workflow on Windows',
  description: 'A Zush for Windows window showing AI batch rename analysis, review, and completed rename results for mixed files.',
  frame: 'windows',
  width: 1778,
  height: 1388,
  sources: {
    light: '/videos/hero/zush-batch-rename-windows-window-light.mp4',
    dark: '/videos/hero/zush-batch-rename-windows-window-dark.mp4',
  },
  posters: {
    light: '/videos/posters/hero-batch-rename-windows-window-light.png',
    dark: '/videos/posters/hero-batch-rename-windows-window-dark.png',
  },
};

const SHOWCASE_VIDEOS: ShowcaseVideoAsset[] = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    description: 'Batch rename files with AI based on their actual content',
    sources: {
      light: '/videos/zush-batch-rename.mp4',
      dark: '/videos/zush-batch-rename-dark.mp4',
    },
    posters: {
      light: '/videos/posters/batch-rename.webp',
      dark: '/videos/posters/batch-rename-dark.webp',
    },
  },
  {
    id: 'monitor',
    title: 'Folder Monitoring',
    description: 'Automatically rename selected file types as they appear',
    sources: {
      light: '/videos/zush-monitor.mp4',
      dark: '/videos/zush-monitor-dark.mp4',
    },
    posters: {
      light: '/videos/posters/monitor.webp',
      dark: '/videos/posters/monitor-dark.webp',
    },
  },
  {
    id: 'naming',
    title: 'Naming Patterns',
    description: 'Create reusable naming patterns with flexible variables',
    sources: {
      light: '/videos/zush-naming-pattern.mp4',
      dark: '/videos/zush-naming-pattern-dark.mp4',
    },
    posters: {
      light: '/videos/posters/naming.webp',
      dark: '/videos/posters/naming-dark.webp',
    },
  },
  {
    id: 'custom-prompts',
    title: 'Custom Prompts',
    description: 'Guide filename generation with your own instructions',
    sources: {
      light: '/videos/zush-custom-prompts.mp4',
      dark: '/videos/zush-custom-prompts-dark.mp4',
    },
    posters: {
      light: '/videos/posters/custom-prompts.webp',
      dark: '/videos/posters/custom-prompts-dark.webp',
    },
  },
  {
    id: 'byok',
    title: 'BYOK',
    description: 'Connect your own AI provider for unlimited renaming',
    sources: {
      light: '/videos/zush-byok.mp4',
      dark: '/videos/zush-byok-dark.mp4',
    },
    posters: {
      light: '/videos/posters/byok.webp',
      dark: '/videos/posters/byok-dark.webp',
    },
  },
  {
    id: 'offline-ai',
    title: 'Offline AI mode',
    description: 'Process supported files offline after Ollama setup checks pass',
    sources: {
      light: '/videos/zush-ollama.mp4',
      dark: '/videos/zush-ollama-dark.mp4',
    },
    posters: {
      light: '/videos/posters/ollama.webp',
      dark: '/videos/posters/ollama-dark.webp',
    },
  },
];

export const MACOS_SHOWCASE_SCREENSHOTS: ShowcaseScreenshotAsset[] = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    description: 'Batch rename files with AI based on their actual content',
    images: {
      light: '/images/showcase/macos/batch-rename-light.webp',
      dark: '/images/showcase/macos/batch-rename-dark.webp',
    },
    alt: 'Batch rename results in Zush for macOS',
  },
  {
    id: 'custom-ai-blocks',
    title: 'Custom AI Blocks',
    description: 'Describe what AI should extract and reuse it as your own naming block',
    images: {
      light: '/images/showcase/macos/custom-ai-blocks-light.webp',
      dark: '/images/showcase/macos/custom-ai-blocks-dark.webp',
    },
    alt: 'Custom AI Blocks in the Naming Blocks picker in Zush for macOS',
  },
  {
    id: 'monitor',
    title: 'Folder Monitoring',
    description: 'Automatically rename new files as they appear',
    images: {
      light: '/images/showcase/macos/monitor-light.webp',
      dark: '/images/showcase/macos/monitor-dark.webp',
    },
    alt: 'Folder monitoring settings in Zush for macOS',
  },
  {
    id: 'activity',
    title: 'Activity History',
    description: 'Review recent renames and undo changes when needed',
    images: {
      light: '/images/showcase/macos/activity-light.webp',
      dark: '/images/showcase/macos/activity-dark.webp',
    },
    alt: 'Activity history in Zush for macOS',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'See rename volume, Monitor share, activity, and file type trends',
    images: {
      light: '/images/showcase/macos/statistics-light.webp',
      dark: '/images/showcase/macos/statistics-dark.webp',
    },
    alt: 'Statistics dashboard in Zush for macOS',
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Save reusable rename setups for repeated AI Rename and Monitor workflows',
    images: {
      light: '/images/showcase/macos/templates-light.webp',
      dark: '/images/showcase/macos/templates-dark.webp',
    },
    alt: 'Reusable templates list in Zush for macOS',
  },
  {
    id: 'naming-blocks',
    title: 'Naming Blocks',
    description: 'Build filenames from your file content using 145+ ready-made blocks',
    images: {
      light: '/images/showcase/macos/naming-blocks-light.webp',
      dark: '/images/showcase/macos/naming-blocks-dark.webp',
    },
    alt: 'Naming Blocks catalog in Zush for macOS',
  },
  {
    id: 'custom-prompts',
    title: 'Custom Prompts',
    description: 'Guide filename generation with your own instructions',
    images: {
      light: '/images/showcase/macos/custom-prompts-light.webp',
      dark: '/images/showcase/macos/custom-prompts-dark.webp',
    },
    alt: 'Custom prompt editor in Zush for macOS',
  },
  {
    id: 'byok',
    title: 'BYOK',
    description: 'Connect your own AI provider for unlimited renaming',
    images: {
      light: '/images/showcase/macos/byok-light.webp',
      dark: '/images/showcase/macos/byok-dark.webp',
    },
    alt: 'Bring your own key settings in Zush for macOS',
  },
  {
    id: 'offline-ai',
    title: 'Offline AI mode',
    description: 'Process supported files offline with private local models via Ollama',
    images: {
      light: '/images/showcase/macos/offline-ai-light.webp',
      dark: '/images/showcase/macos/offline-ai-dark.webp',
    },
    alt: 'Offline AI setup in Zush for macOS',
  },
];

export const WINDOWS_SHOWCASE_SCREENSHOTS: ShowcaseScreenshotAsset[] = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    description: 'Batch rename files with AI based on their actual content',
    images: {
      light: '/images/showcase/windows/batch-rename-light.webp',
      dark: '/images/showcase/windows/batch-rename-dark.webp',
    },
    video: {
      light: '/videos/windows/zush-batch-rename.mp4',
      dark: '/videos/windows/zush-batch-rename.mp4',
    },
    alt: 'Batch rename workflow in Zush for Windows',
  },
  {
    id: 'monitor',
    title: 'Folder Monitoring',
    description: 'Automatically rename new files as they appear',
    images: {
      light: '/images/showcase/windows/monitor-light.webp',
      dark: '/images/showcase/windows/monitor-dark.webp',
    },
    alt: 'Folder monitoring settings in Zush for Windows',
  },
  {
    id: 'activity',
    title: 'Activity History',
    description: 'Review recent renames and undo changes when needed',
    images: {
      light: '/images/showcase/windows/activity-light.webp',
      dark: '/images/showcase/windows/activity-dark.webp',
    },
    alt: 'Activity history and undo workflow in Zush for Windows',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'See rename totals and recent processing insights',
    images: {
      light: '/images/showcase/windows/statistics-light.webp',
      dark: '/images/showcase/windows/statistics-dark.webp',
    },
    alt: 'Rename statistics in Zush for Windows',
  },
  {
    id: 'templates',
    title: 'Smart Rename Templates',
    description: 'Reuse setups for invoices, media, screenshots, and more',
    images: {
      light: '/images/showcase/windows/templates-light.webp',
      dark: '/images/showcase/windows/templates-dark.webp',
    },
    alt: 'Smart Rename templates in Zush for Windows',
  },
  {
    id: 'naming-blocks',
    title: 'Naming Blocks',
    description: 'Build structured names from detected fields and custom formats',
    images: {
      light: '/images/showcase/windows/naming-blocks-light.webp',
      dark: '/images/showcase/windows/naming-blocks-dark.webp',
    },
    alt: 'Naming Blocks editor in Zush for Windows',
  },
  {
    id: 'custom-ai-blocks',
    title: 'Custom AI Blocks',
    description: 'Describe what AI should extract and reuse it as your own naming block',
    images: {
      light: '/images/showcase/windows/custom-ai-blocks-light.webp',
      dark: '/images/showcase/windows/custom-ai-blocks-dark.webp',
    },
    alt: 'Custom AI Block editor in Zush for Windows',
  },
  {
    id: 'custom-prompts',
    title: 'Custom Prompts',
    description: 'Guide filename generation with your own instructions',
    images: {
      light: '/images/showcase/windows/custom-prompts-light.webp',
      dark: '/images/showcase/windows/custom-prompts-dark.webp',
    },
    alt: 'Custom prompt settings in Zush for Windows',
  },
  {
    id: 'byok',
    title: 'BYOK',
    description: 'Connect your own AI provider for unlimited renaming',
    images: {
      light: '/images/showcase/windows/byok-light.webp',
      dark: '/images/showcase/windows/byok-dark.webp',
    },
    alt: 'Bring your own key setup in Zush for Windows',
  },
  {
    id: 'offline-ai',
    title: 'Offline AI mode',
    description: 'Process supported files offline with private local models via Ollama',
    images: {
      light: '/images/showcase/windows/offline-ai-light.webp',
      dark: '/images/showcase/windows/offline-ai-dark.webp',
    },
    alt: 'Offline AI setup in Zush for Windows',
  },
];

const SHOWCASE_VIDEO_BY_SRC = Object.fromEntries(
  SHOWCASE_VIDEOS.flatMap((video) => [
    [video.sources.light, video],
    [video.sources.dark, video],
  ]),
) as Record<string, ShowcaseVideoAsset>;

export function resolveShowcaseVideoMedia(
  asset: ShowcaseVideoAsset,
  theme: ShowcaseTheme,
): ResolvedShowcaseVideoMedia {
  return {
    source: asset.sources[theme],
    poster: asset.posters[theme],
  };
}

export function resolveShowcaseScreenshotMedia(
  asset: ShowcaseScreenshotAsset,
  theme: ShowcaseTheme,
): string {
  return asset.images[theme];
}

export function getShowcaseVideoBySrc(src?: string | null) {
  if (!src) {
    return undefined;
  }

  return SHOWCASE_VIDEO_BY_SRC[src];
}
