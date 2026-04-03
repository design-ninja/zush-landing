export interface DemoVideoAsset {
  id: string;
  title: string;
  description: string;
  video: string;
  poster: string;
}

export const DEMO_VIDEOS: DemoVideoAsset[] = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    description: 'Rename multiple files at once with AI',
    video: '/videos/zush-batch-rename.mp4',
    poster: '/videos/posters/batch-rename.webp',
  },
  {
    id: 'monitor',
    title: 'Folder Monitoring',
    description: 'Automatically rename new files as they appear',
    video: '/videos/zush-monitor.mp4',
    poster: '/videos/posters/monitor.webp',
  },
  {
    id: 'tags',
    title: 'Smart Tags',
    description: 'Generate smart tags for faster file search',
    video: '/videos/zush-tags.mp4',
    poster: '/videos/posters/tags.webp',
  },
  {
    id: 'naming',
    title: 'Naming Patterns',
    description: 'Create reusable naming patterns with flexible variables',
    video: '/videos/zush-naming-pattern.mp4',
    poster: '/videos/posters/naming.webp',
  },
  {
    id: 'multilanguage',
    title: 'Multilanguage',
    description: 'Generate filenames in more than 60 languages',
    video: '/videos/zush-multilanguage.mp4',
    poster: '/videos/posters/multilanguage.webp',
  },
];

const DEMO_VIDEO_BY_SRC = Object.fromEntries(
  DEMO_VIDEOS.map((video) => [video.video, video]),
) as Record<string, DemoVideoAsset>;

export function getDemoVideoBySrc(src?: string | null) {
  if (!src) {
    return undefined;
  }

  return DEMO_VIDEO_BY_SRC[src];
}
