export const BLOG_PUBLIC_TAG_ORDER = [
  'ai-file-renaming',
  'automation',
  'file-organization',
  'photos',
  'screenshots',
  'pdf-documents',
  'tool-comparisons',
  'file-naming',
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
      'Guides and explainers on using AI to rename files, screenshots, photos, and documents',
    seoTitle: 'AI File Renaming Guides & Workflows — Zush Blog',
    seoDescription:
      'Browse Zush guides on AI file renaming across screenshots, photos, PDFs, and mixed-file workflows on desktop.',
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
      'Side-by-side comparisons of AI file renamers across Mac, Windows, and cross-platform workflows',
    seoTitle: 'AI File Renamer Comparisons & Reviews — Zush Blog',
    seoDescription:
      'Compare AI file renamers across Mac, Windows, pricing, workflow fit, and mixed-file support.',
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
