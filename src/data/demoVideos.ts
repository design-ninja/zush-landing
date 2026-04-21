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

export function getDemoVideoBySrc(src?: string | null) {
  if (!src) {
    return undefined;
  }

  return DEMO_VIDEO_BY_SRC[src];
}
