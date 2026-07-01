import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

type SearchLandingSlug =
  | 'batch-rename-files'
  | 'offline-ai-file-renamer';

const sharedSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'IMG_4382.HEIC', after: 'Golden Retriever Park.heic', img: '/images/examples/dog.jpg', type: 'image' },
      { before: 'Screenshot 2026-03-23.png', after: 'Figma Checkout Flow.png', img: '/images/examples/workspace.jpg', type: 'image' },
      { before: 'scan_0042.pdf', after: 'Apartment Lease 2026.pdf', type: 'pdf' },
      { before: 'meeting_notes_FINAL.docx', after: 'Client Discovery Notes.docx', type: 'doc' },
      { before: 'demo_take_02.mov', after: 'Settings Sidebar Walkthrough.mov', type: 'video' },
      { before: 'track_01_final.mp3', after: 'Lo-Fi Piano Loop 92BPM.mp3', type: 'audio' },
    ],
  },
  {
    files: [
      { before: 'download (7).pdf', after: 'Cloudflare Invoice December.pdf', type: 'pdf' },
      { before: 'DSC_0093.NEF', after: 'Mountain Sunrise Fog.nef', img: '/images/examples/mountain.jpg', type: 'image' },
      { before: 'checkout-flow.fig', after: 'Mobile Checkout Flow.fig', type: 'design', label: 'FIG' },
      { before: 'Untitled.xlsx', after: 'Employee Onboarding Checklist.xlsx', type: 'sheet' },
      { before: 'voice_memo_042.m4a', after: 'Client Discovery Call.m4a', type: 'audio' },
      { before: 'Screen Recording.mov', after: 'Dashboard Error Recording.mov', type: 'video' },
    ],
  },
];

const batchRenameFaq = [
  {
    question: 'How do I batch rename files with AI?',
    answer:
      'Drop files or folders into Zush, let AI analyze each file, review the suggested names, choose a naming pattern, and apply the batch. Zush can handle mixed folders with screenshots, photos, PDFs, documents, design files, audio, and videos.',
  },
  {
    question: 'When should I use AI instead of Finder or File Explorer batch rename?',
    answer:
      'Use Finder or File Explorer when every file needs the same rule, such as a prefix or number sequence. Use AI when each file needs a different descriptive name based on what it contains.',
  },
  {
    question: 'Can Zush batch rename files on both Mac and Windows?',
    answer:
      'Yes. Zush has a native Mac app and a Windows build distributed through the Microsoft Store. Both support AI batch rename, templates, Naming Blocks, folder monitoring, and undo history.',
  },
  {
    question: 'Can I use custom naming conventions in a batch?',
    answer:
      'Yes. You can combine AI-generated titles with dates, categories, original names, counters, document fields, client names, invoice details, and other Naming Blocks so every file follows the same convention.',
  },
];

const offlineRenameFaq = [
  {
    question: 'What is an offline AI file renamer?',
    answer:
      'An offline AI file renamer uses a local model on your computer to analyze files and suggest better filenames without sending supported file analysis to a cloud AI provider. In Zush, Offline AI mode connects to local Ollama models for private Mac and Windows workflows.',
  },
  {
    question: 'Can Zush rename files locally with Ollama?',
    answer:
      'Yes. Zush can use local Ollama models in Offline AI mode for supported files. Install Ollama, pull a vision-capable model, enable Offline AI mode in Zush, and review the generated filenames before applying the batch.',
  },
  {
    question: 'What is the difference between Offline AI and BYOK?',
    answer:
      'Offline AI uses a local Ollama model running on your device. BYOK uses your own cloud provider key from Gemini, Groq, OpenAI, or Claude. Both give you more control than the default managed cloud workflow, but Offline AI is the private local-processing option.',
  },
  {
    question: 'Does offline AI renaming work for every file type?',
    answer:
      'Offline model quality depends on the model and file type. It works best for visual and preview-based analysis such as screenshots, photos, PDFs, and visible document previews. For the highest naming quality across complex mixed folders, Cloud or BYOK mode may still produce better results.',
  },
  {
    question: 'Can I undo offline AI renames?',
    answer:
      'Yes. Zush keeps rename history, so offline-generated names can be reviewed before applying and reverted afterward if a batch needs another pass.',
  },
];

export const SEARCH_LANDING_PAGES: Record<SearchLandingSlug, FeatureLandingPageProps> = {
  'batch-rename-files': {
    h1: 'Batch Rename Files with AI',
    h1Accent: 'Batch Rename Files',
    category: 'general',
    definitionTitle: 'What Is an AI Batch Rename Tool?',
    definitionText:
      'An AI batch rename tool renames many files in one workflow while giving each file a content-aware name. Zush batch renames and bulk renames mixed folders on Mac and Windows by reading screenshots, photos, PDFs, documents, videos, audio, and design files, then letting you review every name before applying changes.',
    showcaseSlides: sharedSlides,
    faqItems: batchRenameFaq,
    relatedPages: [
      { title: 'Batch Rename Docs', href: '/docs/batch-rename-files/' },
      { title: 'Templates Guide', href: '/docs/templates/' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ],
    relatedBlogPosts: [
      { title: 'Rename Files by Content', href: 'rename-files-by-content-guide' },
      { title: 'How to Batch Rename Files on Mac', href: 'batch-rename-files-on-mac-complete-guide' },
      { title: 'Auto Rename Files on Mac', href: 'auto-rename-files-mac-guide' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Batch rename files with AI',
        description: 'Use Zush to batch rename files by content on Mac and Windows.',
        steps: [
          { name: 'Drop a batch into Zush', text: 'Add files, folders, or a mixed Downloads folder from your desktop.' },
          { name: 'Choose a naming pattern', text: 'Use a simple AI title or combine dates, categories, counters, original names, and metadata blocks.' },
          { name: 'Review and apply', text: 'Preview every suggested filename, regenerate individual names if needed, then apply the full batch.' },
        ],
      },
      faqItems: batchRenameFaq,
      software: {
        pagePath: '/batch-rename-files',
        description:
          'AI batch rename tool and bulk file renamer for Mac and Windows. Rename mixed folders by content with preview, templates, Naming Blocks, folder monitoring, and undo history.',
        featureList: [
          'AI batch rename tool for Mac and Windows',
          'Batch rename files by content',
          'Bulk rename files with content-aware names',
          'Batch rename screenshots, photos, PDFs, documents, design files, audio, and videos',
          'Preview every filename before applying',
          'Custom naming conventions and templates',
          'Folder monitoring for future files',
          'Works on macOS and Windows',
        ],
      },
    }),
  },
  'offline-ai-file-renamer': {
    h1: 'Offline AI File Renamer',
    h1Accent: 'Offline AI',
    category: 'general',
    definitionTitle: 'What Is an Offline AI File Renamer?',
    definitionText:
      'An offline AI file renamer analyzes files with a local model instead of a cloud provider. Zush supports private local renaming with Ollama, plus BYOK for users who want their own cloud provider key, while keeping preview, folder monitoring, templates, Naming Blocks, and undo history in the same Mac and Windows workflow.',
    showcaseSlides: sharedSlides,
    faqItems: offlineRenameFaq,
    relatedPages: [
      { title: 'Offline AI Docs', href: '/docs/offline-ai/' },
      { title: 'BYOK Docs', href: '/docs/byok/' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks/' },
      { title: 'Ollama Offline AI Setup', href: '/ollama-setup' },
      { title: 'BYOK Setup', href: '/byok-setup' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Zush for Mac', href: '/mac' },
      { title: 'Zush for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Local AI File Renaming with Ollama', href: 'local-ai-file-renaming-ollama-guide' },
      { title: 'Cloud AI vs Local AI File Renaming', href: 'cloud-vs-local-ai-file-renaming' },
      { title: 'BYOK: Unlimited AI File Renames', href: 'byok-ai-file-renaming-unlimited' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename files offline with Zush and Ollama',
        description: 'Use Zush as an offline AI file renamer for private local file naming on Mac and Windows.',
        steps: [
          { name: 'Install Ollama', text: 'Install Ollama and pull a vision-capable local model such as qwen2.5vl:3b or gemma3:4b.' },
          { name: 'Enable Offline AI mode', text: 'Open Zush, go to AI Setup, enable Offline AI mode, refresh the model list, and test the local connection.' },
          { name: 'Review and apply names', text: 'Drop files or folders into Zush, review local AI filename suggestions, and apply the batch with undo history available.' },
        ],
      },
      faqItems: offlineRenameFaq,
      software: {
        pagePath: '/offline-ai-file-renamer',
        description:
          'Offline AI file renamer for Mac and Windows with local Ollama models, BYOK, preview, folder monitoring, templates, Naming Blocks, and undo history.',
        featureList: [
          'Offline AI file renaming with local Ollama models',
          'BYOK support for Gemini, Groq, OpenAI, and Claude',
          'Preview every filename before applying changes',
          'Folder monitoring for automatic rename workflows',
          'Custom templates and 145+ Naming Blocks',
          'Undo and rename history',
          'Works on macOS and Windows',
        ],
      },
    }),
  },
};
