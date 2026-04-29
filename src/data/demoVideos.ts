export type DemoVideoTheme = 'light' | 'dark';

interface ThemeAwareMedia {
  light: string;
  dark: string;
}

export interface DemoVideoAsset {
  id: string;
  title: string;
  description: string;
  sources: ThemeAwareMedia;
  posters: ThemeAwareMedia;
}

export interface DemoScreenshotAsset {
  id: string;
  title: string;
  description: string;
  images: ThemeAwareMedia;
  video?: ThemeAwareMedia;
  alt: string;
}

export interface ResolvedDemoVideoMedia {
  source: string;
  poster: string;
}

export const DEMO_VIDEOS: DemoVideoAsset[] = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    description: 'Rename multiple files at once with AI',
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
    description: 'Automatically rename new files as they appear',
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
    id: 'tags',
    title: 'Smart Tags',
    description: 'Generate smart tags for faster file search',
    sources: {
      light: '/videos/zush-tags.mp4',
      dark: '/videos/zush-tags-dark.mp4',
    },
    posters: {
      light: '/videos/posters/tags.webp',
      dark: '/videos/posters/tags-dark.webp',
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
    id: 'multilanguage',
    title: 'Multilanguage',
    description: 'Generate filenames in more than 60 languages',
    sources: {
      light: '/videos/zush-multilanguage.mp4',
      dark: '/videos/zush-multilanguage-dark.mp4',
    },
    posters: {
      light: '/videos/posters/multilanguage.webp',
      dark: '/videos/posters/multilanguage-dark.webp',
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
    description: 'Process supported files offline with private local models via Ollama',
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

export const WINDOWS_DEMO_SCREENSHOTS: DemoScreenshotAsset[] = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    description: 'Rename multiple files at once with AI',
    images: {
      light: '/images/showcase/windows-original/02-ai-rename-results.webp',
      dark: '/images/showcase/windows-original/10-dark-mode-results.webp',
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
      light: '/images/showcase/windows-original/09-folder-monitor.webp',
      dark: '/images/showcase/windows-original/09-folder-monitor.webp',
    },
    alt: 'Folder monitoring settings in Zush for Windows',
  },
  {
    id: 'activity',
    title: 'Activity History',
    description: 'Review recent renames and undo changes when needed',
    images: {
      light: '/images/showcase/windows-original/03-activity-history.webp',
      dark: '/images/showcase/windows-original/03-activity-history.webp',
    },
    alt: 'Activity history and undo workflow in Zush for Windows',
  },
  {
    id: 'naming',
    title: 'Naming & Metadata',
    description: 'Create naming patterns and add searchable metadata',
    images: {
      light: '/images/showcase/windows-original/04-processing-settings.webp',
      dark: '/images/showcase/windows-original/04-processing-settings.webp',
    },
    alt: 'Naming pattern and metadata settings in Zush for Windows',
  },
  {
    id: 'multilanguage',
    title: 'Multilanguage',
    description: 'Generate filenames in more than 60 languages',
    images: {
      light: '/images/showcase/windows-original/05-language-picker.webp',
      dark: '/images/showcase/windows-original/05-language-picker.webp',
    },
    alt: 'Localization settings for generated filenames in Zush for Windows',
  },
  {
    id: 'custom-prompts',
    title: 'Custom Prompts',
    description: 'Guide filename generation with your own instructions',
    images: {
      light: '/images/showcase/windows-original/06-rename-rules.webp',
      dark: '/images/showcase/windows-original/06-rename-rules.webp',
    },
    alt: 'Custom prompt settings in Zush for Windows',
  },
  {
    id: 'byok',
    title: 'BYOK',
    description: 'Connect your own AI provider for unlimited renaming',
    images: {
      light: '/images/showcase/windows-original/07-cloud-ai-setup.webp',
      dark: '/images/showcase/windows-original/07-cloud-ai-setup.webp',
    },
    alt: 'Bring your own key setup in Zush for Windows',
  },
  {
    id: 'offline-ai',
    title: 'Offline AI mode',
    description: 'Process supported files offline with private local models via Ollama',
    images: {
      light: '/images/showcase/windows-original/08-local-ai-setup.webp',
      dark: '/images/showcase/windows-original/08-local-ai-setup.webp',
    },
    alt: 'Offline AI setup in Zush for Windows',
  },
];

const DEMO_VIDEO_BY_SRC = Object.fromEntries(
  DEMO_VIDEOS.flatMap((video) => [
    [video.sources.light, video],
    [video.sources.dark, video],
  ]),
) as Record<string, DemoVideoAsset>;

export function resolveDemoVideoMedia(
  asset: DemoVideoAsset,
  theme: DemoVideoTheme,
): ResolvedDemoVideoMedia {
  return {
    source: asset.sources[theme],
    poster: asset.posters[theme],
  };
}

export function resolveDemoScreenshotMedia(
  asset: DemoScreenshotAsset,
  theme: DemoVideoTheme,
): string {
  return asset.images[theme];
}

export function getDemoVideoBySrc(src?: string | null) {
  if (!src) {
    return undefined;
  }

  return DEMO_VIDEO_BY_SRC[src];
}
