const BLOG_PUBLIC_TAG_ORDER = [
  'ai-file-renaming',
  'automation',
  'file-organization',
  'photos',
  'videos',
  'audio',
  'screenshots',
  'pdf-documents',
  'tool-comparisons',
  'file-naming',
  'templates',
  'naming-blocks',
  'downloads',
  'file-explorer',
  'image-formats',
  'image-seo',
  'byok',
  'ollama',
] as const;

export type BlogPublicTagSlug = (typeof BLOG_PUBLIC_TAG_ORDER)[number];

export interface BlogPublicTagMeta {
  slug: BlogPublicTagSlug;
  label: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export const BLOG_PUBLIC_TAGS: Record<BlogPublicTagSlug, BlogPublicTagMeta> = {
  'ai-file-renaming': {
    slug: 'ai-file-renaming',
    label: 'AI File Renaming',
    description:
      'Guides and explainers on using AI to rename files, screenshots, videos, photos, and documents',
    seoTitle: 'AI File Renaming Guides & Workflows — Zush Blog',
    seoDescription:
      'Browse Zush guides on AI file renaming across screenshots, videos, photos, PDFs, and mixed-file workflows on desktop.',
  },
  automation: {
    slug: 'automation',
    label: 'Automation',
    description:
      'Folder monitoring, auto-rename workflows, batch jobs, and set-it-and-forget-it cleanup systems',
    seoTitle: 'File Automation Guides & Auto-Rename Workflows — Zush Blog',
    seoDescription:
      'Learn how to automate file renaming and folder cleanup with batch workflows, folder monitoring, and desktop automation.',
  },
  'file-organization': {
    slug: 'file-organization',
    label: 'File Organization',
    description:
      'Practical systems for organizing downloads, client files, school files, and everyday folders',
    seoTitle: 'File Organization Guides & Folder Cleanup Tips — Zush Blog',
    seoDescription:
      'Browse file organization guides for downloads, client work, school files, and desktop folder cleanup on Mac and Windows.',
  },
  photos: {
    slug: 'photos',
    label: 'Photos',
    description:
      'Photo naming, image workflow, photo organization, and creator workflows for large image libraries',
    seoTitle: 'Photo Naming & Organization Guides — Zush Blog',
    seoDescription:
      'Photo naming, photo organization, and image workflow guides for photographers, creators, and desktop users.',
  },
  videos: {
    slug: 'videos',
    label: 'Videos',
    description:
      'Video filename workflows for screen recordings, clips, b-roll, subtitles, and searchable media libraries',
    seoTitle: 'Video File Naming & Organization Guides — Zush Blog',
    seoDescription:
      'Guides for renaming videos, screen recordings, b-roll, clips, and subtitle-backed media files with AI.',
  },
  audio: {
    slug: 'audio',
    label: 'Audio',
    description:
      'Audio filename workflows for music tracks, podcasts, voice memos, meeting recordings, and searchable media libraries',
    seoTitle: 'Audio File Naming & AI Rename Guides - Zush Blog',
    seoDescription:
      'Guides for renaming MP3, M4A, WAV, FLAC, podcast, music, voice memo, and meeting audio files with AI.',
  },
  screenshots: {
    slug: 'screenshots',
    label: 'Screenshots',
    description:
      'Screenshot naming conventions, cleanup, and automatic screenshot renaming workflows',
    seoTitle: 'Screenshot Naming & Auto-Rename Guides — Zush Blog',
    seoDescription:
      'Guides for naming screenshots, organizing screenshot folders, and automating screenshot renaming on desktop.',
  },
  'pdf-documents': {
    slug: 'pdf-documents',
    label: 'PDFs & Documents',
    description:
      'Guides for naming PDFs, scans, invoices, contracts, and document-heavy workflows',
    seoTitle: 'PDF & Document Naming Guides — Zush Blog',
    seoDescription:
      'Browse Zush guides for naming PDFs, scanned files, invoices, contracts, and other document workflows.',
  },
  'tool-comparisons': {
    slug: 'tool-comparisons',
    label: 'Tool Comparisons',
    description:
      'Side-by-side comparisons of file renamers, AI batch rename tools, and bulk rename workflows across Mac, Windows, and cross-platform setups',
    seoTitle: 'File Renamer Comparisons & Reviews - Zush Blog',
    seoDescription:
      'Compare file renamers, AI batch rename tools, and bulk rename workflows across Mac, Windows, pricing, workflow fit, and mixed-file support.',
  },
  'file-naming': {
    slug: 'file-naming',
    label: 'File Naming',
    description:
      'Naming conventions, searchable filenames, and structure rules for cleaner file systems',
    seoTitle: 'File Naming Conventions & Searchable Filenames — Zush Blog',
    seoDescription:
      'Guides to file naming conventions, searchable filenames, and better naming systems for files and folders.',
  },
  templates: {
    slug: 'templates',
    label: 'Templates',
    description:
      'Reusable naming setups, repeatable rename workflows, and folder-specific automation patterns',
    seoTitle: 'File Renaming Template Guides - Zush Blog',
    seoDescription:
      'Learn how reusable templates keep screenshots, audio, documents, client files, legal files, and monitored folders consistently named.',
  },
  'naming-blocks': {
    slug: 'naming-blocks',
    label: 'Naming Blocks',
    description:
      'Structured filename fields for dates, metadata, audio, finance, legal, travel, clients, and AI-detected content',
    seoTitle: 'Naming Blocks & Structured Filename Guides - Zush Blog',
    seoDescription:
      'Learn how Naming Blocks turn AI analysis, metadata, dates, clients, audio fields, and document details into consistent filenames.',
  },
  downloads: {
    slug: 'downloads',
    label: 'Downloads',
    description:
      'Workflows for organizing downloads folders and automatically naming new incoming files',
    seoTitle: 'Downloads Folder Organization Guides — Zush Blog',
    seoDescription:
      'Learn how to organize downloads folders and automatically rename new files on Mac and Windows.',
  },
  'file-explorer': {
    slug: 'file-explorer',
    label: 'File Explorer',
    description:
      'Windows File Explorer naming, search, and folder organization workflows',
    seoTitle: 'Windows File Explorer Naming & Search Guides — Zush Blog',
    seoDescription:
      'Windows File Explorer guides for naming files, improving searchability, and organizing folders more effectively.',
  },
  'image-formats': {
    slug: 'image-formats',
    label: 'Image Formats',
    description:
      'HEIC, RAW, JPEG, PNG, and other format guides for real-world desktop image workflows',
    seoTitle: 'Image Format Guides: HEIC, RAW, JPEG & More — Zush Blog',
    seoDescription:
      'Understand HEIC, RAW, JPEG, PNG, and related image format workflows for better organization and naming.',
  },
  'image-seo': {
    slug: 'image-seo',
    label: 'Image SEO',
    description:
      'How filenames affect image search visibility, rankings, and publishing workflows',
    seoTitle: 'Image SEO & Filename Optimization Guides — Zush Blog',
    seoDescription:
      'Browse guides on image SEO, descriptive filenames, image search visibility, and naming workflows for publishing.',
  },
  byok: {
    slug: 'byok',
    label: 'BYOK',
    description:
      'Bring-your-own-key workflows for AI file renaming with OpenAI, Gemini, Groq, and Claude',
    seoTitle: 'BYOK AI File Renaming Guides — Zush Blog',
    seoDescription:
      'Bring-your-own-key guides for AI file renaming with OpenAI, Gemini, Groq, Claude, and similar providers.',
  },
  ollama: {
    slug: 'ollama',
    label: 'Ollama',
    description:
      'Offline AI file renaming workflows with local Ollama models and private desktop processing',
    seoTitle: 'Ollama AI File Renaming Guides - Zush Blog',
    seoDescription:
      'Learn how to use Ollama for local AI file renaming, offline workflows, model choice, and private desktop processing.',
  },
};

const BLOG_PUBLIC_TAG_LABEL_TO_SLUG = new Map(
  Object.values(BLOG_PUBLIC_TAGS).map((tag) => [tag.label, tag.slug]),
);

export function getBlogPublicTagSlug(label: string): BlogPublicTagSlug | undefined {
  return BLOG_PUBLIC_TAG_LABEL_TO_SLUG.get(label);
}
