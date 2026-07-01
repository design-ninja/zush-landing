import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

type SearchLandingSlug =
  | 'batch-rename-tool'
  | 'file-renamer'
  | 'batch-rename-files'
  | 'bulk-rename-files'
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

const fileRenamerFaq = [
  {
    question: 'What is the best file renamer for mixed Mac and Windows folders?',
    answer:
      'For mixed folders, the best file renamer is one that can batch rename files by content, not only apply a shared prefix or number sequence. Zush combines AI file renaming, bulk review, custom naming patterns, folder monitoring, undo history, BYOK, and Offline AI mode for Mac and Windows.',
  },
  {
    question: 'How is Zush different from a normal batch rename utility?',
    answer:
      'Traditional rename utilities are pattern-based: they replace text, add numbers, or change case. Zush is content-aware: it reads screenshots, photos, PDFs, Office files, design files, audio, and videos, then suggests a unique descriptive filename for each file before you apply the batch.',
  },
  {
    question: 'Can I rename files based on their content?',
    answer:
      'Yes. Zush can rename files based on visual content, extracted PDF text, document context, audio metadata or transcript context, sampled video frames, and design previews, depending on the file type.',
  },
  {
    question: 'Does Zush work as a Bulk Rename Utility alternative?',
    answer:
      'Yes, when the job requires descriptive names instead of regex or sequence rules. Bulk Rename Utility is strong for static filename patterns; Zush is designed for content-aware batch renaming, review before apply, folder monitoring, and rollback on Mac and Windows.',
  },
  {
    question: 'Can I undo a batch rename?',
    answer:
      'Yes. Zush keeps rename history so you can revert files back to their original names if a batch needs another pass.',
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

const bulkRenameFaq = [
  {
    question: 'What is the difference between bulk rename and batch rename?',
    answer:
      'Most people use bulk rename and batch rename interchangeably. Both mean renaming many files in one operation. Zush supports both workflows, with AI-generated names when every file needs a unique content-based filename.',
  },
  {
    question: 'Can Zush bulk rename files by content?',
    answer:
      'Yes. Zush can bulk rename files by analyzing file content, then applying descriptive names through a review-before-apply workflow. It is useful for mixed downloads, photo imports, screenshot folders, invoice folders, and client assets.',
  },
  {
    question: 'Is Zush better for bulk renaming than regex tools?',
    answer:
      'Regex tools are better when the old filename already contains the information you need. Zush is better when filenames are generic, such as IMG_, Screenshot, scan_0042.pdf, document.pdf, or Untitled.mov, and the name must come from the file content.',
  },
  {
    question: 'Can Zush monitor folders for ongoing bulk rename workflows?',
    answer:
      'Yes. Zush can watch folders like Downloads, Desktop, Screenshots, camera imports, and project staging folders, then automatically rename supported files as they arrive.',
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
  'file-renamer': {
    h1: 'File Renamer for Mac & Windows',
    h1Accent: 'File Renamer',
    category: 'general',
    definitionTitle: 'What Is a File Renamer?',
    definitionText:
      'Zush is a file renamer for Mac and Windows that combines AI, batch rename, bulk review, naming patterns, folder monitoring, and undo history. It turns generic filenames into descriptive names based on what each file contains.',
    showcaseSlides: sharedSlides,
    faqItems: fileRenamerFaq,
    relatedPages: [
      { title: 'Zush Docs', href: '/docs/' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks/' },
      { title: 'Batch Rename Tool', href: '/batch-rename-tool' },
      { title: 'Bulk Rename Files', href: '/bulk-rename-files' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Zush for Mac', href: '/mac' },
      { title: 'Zush for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Best File Renamer for Mac: AI, Batch & Bulk Tools', href: 'best-ai-file-renamer-tools-mac-compared' },
      { title: 'Best File Renamer for Windows: AI, Batch & Bulk Tools', href: 'best-ai-file-renamer-tools-windows-compared' },
      { title: 'File Naming Conventions for SEO and Searchable Files', href: 'file-naming-conventions-best-practices' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename files with Zush',
        description: 'Use Zush as a file renamer for Mac and Windows to generate descriptive names from file content.',
        steps: [
          { name: 'Add files or folders', text: 'Drop a mixed folder into Zush from Finder or File Explorer.' },
          { name: 'Review AI-generated names', text: 'Zush analyzes each supported file and suggests a descriptive filename based on content.' },
          { name: 'Apply or monitor', text: 'Apply the batch rename once, or enable folder monitoring for automatic future renames.' },
        ],
      },
      faqItems: fileRenamerFaq,
      software: {
        pagePath: '/file-renamer',
        description:
          'File renamer for Mac and Windows with AI batch rename, bulk review, folder monitoring, Naming Blocks, templates, BYOK, Offline AI mode, and undo history.',
        featureList: [
          'File renamer for Mac and Windows',
          'AI batch rename for mixed folders',
          'Bulk rename files by content',
          'Review suggested names before applying changes',
          'Folder monitoring for automatic renaming',
          'Custom naming patterns and 145+ Naming Blocks',
          'Undo and rename history',
          'BYOK and Offline AI mode via Ollama',
        ],
      },
    }),
  },
  'batch-rename-tool': {
    h1: 'Batch Rename Tool',
    h1Accent: 'Batch Rename Tool',
    category: 'general',
    definitionTitle: 'What Is a Batch Rename Tool?',
    definitionText:
      'A batch rename tool changes many filenames in one workflow. Zush adds AI for Mac and Windows so every file can get a different descriptive name based on content, then lets you review the batch, apply naming patterns, monitor folders, and undo changes.',
    showcaseSlides: sharedSlides,
    faqItems: batchRenameFaq,
    relatedPages: [
      { title: 'Batch Rename Docs', href: '/docs/batch-rename-files/' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks/' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Bulk Rename Files', href: '/bulk-rename-files' },
      { title: 'File Renamer for Mac & Windows', href: '/file-renamer' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Zush for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'How to Batch Rename Files on Mac', href: 'batch-rename-files-on-mac-complete-guide' },
      { title: 'Best File Renamer for Mac: AI, Batch & Bulk Tools', href: 'best-ai-file-renamer-tools-mac-compared' },
      { title: 'Best File Renamer for Windows: AI, Batch & Bulk Tools', href: 'best-ai-file-renamer-tools-windows-compared' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Use an AI batch rename tool',
        description: 'Use Zush as a batch rename tool for content-aware file naming on Mac and Windows.',
        steps: [
          { name: 'Add files or a folder', text: 'Drop a mixed folder into Zush from Finder, File Explorer, Desktop, Downloads, or a project folder.' },
          { name: 'Generate names by content', text: 'Zush analyzes supported files and proposes descriptive names for each item in the batch.' },
          { name: 'Review and apply', text: 'Preview every filename, adjust naming patterns or individual suggestions, then apply the rename with undo history available.' },
        ],
      },
      faqItems: batchRenameFaq,
      software: {
        pagePath: '/batch-rename-tool',
        description:
          'Batch rename tool for Mac and Windows with AI content analysis, custom naming patterns, preview, folder monitoring, and undo history.',
        featureList: [
          'Batch rename tool for Mac and Windows',
          'AI batch rename files by content',
          'Bulk rename screenshots, photos, PDFs, documents, design files, audio, and videos',
          'Preview every filename before applying',
          'Custom naming patterns and reusable templates',
          'Folder monitoring for future files',
          'Undo and rename history',
        ],
      },
    }),
  },
  'batch-rename-files': {
    h1: 'Batch Rename Files with AI',
    h1Accent: 'Batch Rename Files',
    category: 'general',
    definitionTitle: 'What Is AI Batch Renaming?',
    definitionText:
      'Batch rename files with Zush when every file needs a useful name, not just the same prefix or counter. Zush analyzes file content, suggests descriptive names, and applies the whole batch after review.',
    showcaseSlides: sharedSlides,
    faqItems: batchRenameFaq,
    relatedPages: [
      { title: 'Batch Rename Docs', href: '/docs/batch-rename-files/' },
      { title: 'Templates Guide', href: '/docs/templates/' },
      { title: 'Batch Rename Tool', href: '/batch-rename-tool' },
      { title: 'File Renamer for Mac & Windows', href: '/file-renamer' },
      { title: 'Bulk Rename Files', href: '/bulk-rename-files' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ],
    relatedBlogPosts: [
      { title: 'How to Batch Rename Files on Mac', href: 'batch-rename-files-on-mac-complete-guide' },
      { title: 'Auto Rename Files on Mac', href: 'auto-rename-files-mac-guide' },
      { title: 'How to Rename Files with AI', href: 'rename-files-with-ai-guide' },
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
          'AI batch rename tool for Mac and Windows. Rename mixed folders by content with preview, templates, Naming Blocks, folder monitoring, and undo history.',
        featureList: [
          'Batch rename files by content',
          'Batch rename screenshots, photos, PDFs, documents, design files, audio, and videos',
          'Preview every filename before applying',
          'Custom naming conventions and templates',
          'Folder monitoring for future files',
          'Works on macOS and Windows',
        ],
      },
    }),
  },
  'bulk-rename-files': {
    h1: 'Bulk Rename Files on Mac & Windows',
    h1Accent: 'Bulk Rename Files',
    category: 'general',
    definitionTitle: 'What Is Bulk File Renaming?',
    definitionText:
      'Bulk rename files with Zush when a folder has too many generic filenames to fix by hand. Use AI to read each file, generate a descriptive name, and apply the rename safely after review.',
    showcaseSlides: sharedSlides,
    faqItems: bulkRenameFaq,
    relatedPages: [
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring/' },
      { title: 'Undo History Docs', href: '/docs/undo-history/' },
      { title: 'Batch Rename Tool', href: '/batch-rename-tool' },
      { title: 'File Renamer for Mac & Windows', href: '/file-renamer' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Zush for Mac', href: '/mac' },
      { title: 'Zush for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Best File Renamer for Windows: AI, Batch & Bulk Tools', href: 'best-ai-file-renamer-tools-windows-compared' },
      { title: 'Best File Renamer for Mac: AI, Batch & Bulk Tools', href: 'best-ai-file-renamer-tools-mac-compared' },
      { title: 'Folder Monitoring for Auto File Renaming', href: 'folder-monitoring-automatic-file-renaming' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Bulk rename files with AI',
        description: 'Use Zush to bulk rename files by content while keeping control over the final filenames.',
        steps: [
          { name: 'Select the folder', text: 'Choose the folder that contains generic filenames such as IMG_, Screenshot, scan_0042.pdf, or document.pdf.' },
          { name: 'Generate descriptive names', text: 'Zush analyzes supported files and proposes names based on image content, document text, video frames, audio context, or design previews.' },
          { name: 'Apply safely', text: 'Review the bulk rename list, adjust naming rules, and apply changes with undo history available afterward.' },
        ],
      },
      faqItems: bulkRenameFaq,
      software: {
        pagePath: '/bulk-rename-files',
        description:
          'Bulk file renamer for Mac and Windows with AI content analysis, batch review, folder monitoring, custom patterns, and undo history.',
        featureList: [
          'Bulk rename files on Mac and Windows',
          'Content-aware AI filename suggestions',
          'Bulk review before applying changes',
          'Automatic folder monitoring',
          'Bulk Rename Utility alternative for content-based filenames',
          'Undo and rename history',
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
      { title: 'File Renamer for Mac & Windows', href: '/file-renamer' },
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
