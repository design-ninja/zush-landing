import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

type SearchLandingSlug =
  | 'batch-rename-files'
  | 'offline-ai-file-renamer'
  | 'ai-file-organizer'
  | 'hazel-alternative'
  | 'powerrename-alternative'
  | 'rename-invoices-with-ai'
  | 'rename-receipts-with-ai';

const invoiceSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'download (7).pdf', after: 'Cloudflare – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'INV-00921.pdf', after: 'Figma – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'scan_0042.pdf', after: 'AWS – 2026-05 – Invoice.pdf', type: 'pdf' },
      { before: 'statement_final.pdf', after: 'Adobe – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'document (3).pdf', after: 'Notion – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'inv.pdf', after: 'Vercel – 2026-06 – Invoice.pdf', type: 'pdf' },
    ],
  },
  {
    files: [
      { before: 'download (2).pdf', after: '2026-06 – Linear – 96 USD.pdf', type: 'pdf' },
      { before: 'bill.pdf', after: '2026-06 – GitHub – 21 USD.pdf', type: 'pdf' },
      { before: 'scan_0110.pdf', after: '2026-05 – Rippling – 1,204 USD.pdf', type: 'pdf' },
      { before: 'receipt.pdf', after: '2026-06 – Slack – 187 USD.pdf', type: 'pdf' },
      { before: 'invoice_copy.pdf', after: '2026-06 – Datadog – 340 USD.pdf', type: 'pdf' },
      { before: 'doc.pdf', after: '2026-06 – Zoom – 45 USD.pdf', type: 'pdf' },
    ],
  },
];

const receiptSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'IMG_2041.jpg', after: 'Whole Foods – 2026-06-03 Receipt.jpg', type: 'image' },
      { before: 'IMG_2042.HEIC', after: 'Shell Gas – 2026-06-04 Receipt.heic', type: 'image' },
      { before: 'scan_receipt.pdf', after: 'Amazon – 2026-06-01 Receipt.pdf', type: 'pdf' },
      { before: 'photo.jpg', after: 'Home Depot – 2026-06-05 Receipt.jpg', type: 'image' },
      { before: 'receipt_email.pdf', after: 'Uber – 2026-06-02 Receipt.pdf', type: 'pdf' },
      { before: 'IMG_2050.jpg', after: 'Starbucks – 2026-06-06 Receipt.jpg', type: 'image' },
    ],
  },
  {
    files: [
      { before: 'IMG_3011.jpg', after: '2026-06-03 – Office Supplies – 42 USD.jpg', type: 'image' },
      { before: 'doc.pdf', after: '2026-06-04 – Software – 120 USD.pdf', type: 'pdf' },
      { before: 'IMG_3020.HEIC', after: '2026-06-05 – Travel – 380 USD.heic', type: 'image' },
      { before: 'scan.pdf', after: '2026-06-06 – Meals – 64 USD.pdf', type: 'pdf' },
      { before: 'receipt (2).jpg', after: '2026-06-07 – Parking – 18 USD.jpg', type: 'image' },
      { before: 'IMG_3033.jpg', after: '2026-06-08 – Hardware – 240 USD.jpg', type: 'image' },
    ],
  },
];

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
      'Yes. You can combine AI-generated titles with dates, categories, original names, counters, document fields, client names, invoice details, and other Naming Blocks so every file follows the same convention. You can also create Custom AI Blocks that extract any detail you describe, such as a brand or case number.',
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

const fileOrganizerFaq = [
  {
    question: 'What is an AI file organizer?',
    answer:
      'An AI file organizer reads what each file contains and turns that into clean, searchable filenames and consistent naming conventions. Instead of sorting by pattern rules alone, Zush analyzes screenshots, PDFs, photos, documents, videos, audio, and design files, then names each one by its content so Finder, Spotlight, and Windows Search can actually find it.',
  },
  {
    question: 'How is an AI file organizer different from an AI file sorter?',
    answer:
      'A file sorter moves files into folders; an organizer also fixes the names themselves. Zush focuses on the naming layer: content-aware filenames, templates, and Naming Blocks that keep every folder consistent. Combined with folder monitoring, new files get organized names automatically as they arrive.',
  },
  {
    question: 'Is Zush AI file and folder naming software?',
    answer:
      'Zush is AI file naming software: point it at a folder and it gives every file inside a descriptive, searchable name based on content. It organizes your files and folders by fixing the names — screenshots, PDFs, invoices, photos, and documents — and monitors folders such as Downloads so new files are named automatically. Zush names files in place and does not rename or move the folders themselves.',
  },
  {
    question: 'Can Zush automatically organize my Downloads folder?',
    answer:
      'Yes. Point folder monitoring at Downloads and Zush will name new screenshots, invoices, receipts, and exports by content as they land, using the template you choose. Every change stays in rename history, so you can undo any batch.',
  },
  {
    question: 'Does the AI file organizer work on both Mac and Windows?',
    answer:
      'Yes. Zush has a native Mac app (macOS 15+) and a Windows build in the Microsoft Store. Both support content-aware naming, templates, Naming Blocks, folder monitoring, and undo history.',
  },
  {
    question: 'Is my data private when AI organizes my files?',
    answer:
      'You choose the mode: managed cloud, BYOK with your own provider key, or Offline AI with local Ollama models so supported file analysis never leaves your device. Files themselves are renamed in place on your disk.',
  },
];

const hazelAlternativeFaq = [
  {
    question: 'Is Zush a replacement for Hazel?',
    answer:
      'It depends on what you use Hazel for. Hazel is a rule engine that watches folders and acts on files based on conditions like name patterns, dates, or kind. Zush focuses on naming: it reads what each file actually contains and suggests a descriptive, searchable name. If your Hazel rules mostly rename or file things by hand-written patterns, Zush covers that with content-aware AI and folder monitoring. If you rely on Hazel for complex conditional moves, tagging, and shell scripts, you may keep both.',
  },
  {
    question: 'Can Zush watch folders like Hazel?',
    answer:
      'Yes. Zush has folder monitoring: point it at a folder such as Downloads and new files get content-aware names automatically as they arrive, using the template you choose. Every change stays in rename history, so you can undo any batch.',
  },
  {
    question: 'Does Zush work on Windows? Hazel does not.',
    answer:
      'Yes. Hazel is macOS-only. Zush has a native Mac app and a Windows build in the Microsoft Store, so the same content-aware renaming workflow follows you across both platforms.',
  },
  {
    question: 'When is Hazel still the better tool?',
    answer:
      'Hazel is excellent when your logic is about where a file came from rather than what is inside it — sorting by extension or source, running AppleScript or shell scripts, tagging by rule, or moving files through elaborate conditional pipelines. Zush does not move files between folders or run scripts; it renames in place by content. Many people use both.',
  },
  {
    question: 'Can I use Zush and Hazel together?',
    answer:
      'Yes. A common setup is to let Hazel handle sorting and moving, and let Zush handle content-aware naming. Because Zush renames in place and keeps undo history, it fits alongside an existing Hazel workflow without conflict.',
  },
];

const powerRenameAlternativeFaq = [
  {
    question: 'How is Zush different from PowerRename?',
    answer:
      'PowerRename, part of Microsoft PowerToys, is a search-and-replace tool: you match text or a regular expression in existing filenames and rewrite it. It never looks inside the file. Zush reads the content of each file — screenshots, PDFs, photos, documents — and suggests a descriptive name based on what it contains, then lets you review every name before applying.',
  },
  {
    question: 'When is PowerRename enough?',
    answer:
      'Use PowerRename when every file needs the same mechanical change: strip a prefix, swap a word, add a counter, or apply one regex across a batch. Use Zush when each file needs a different name that describes what is actually in it.',
  },
  {
    question: 'Does Zush work inside File Explorer on Windows 11?',
    answer:
      'Zush is a standalone Windows app from the Microsoft Store rather than a right-click shell extension. You add files or folders, review AI-suggested names, and apply the batch. The resulting content-aware names are what make files findable later in File Explorer and Windows Search.',
  },
  {
    question: 'Is Zush free like PowerRename?',
    answer:
      'Zush has a free tier so you can rename batches and try content-aware naming, Naming Blocks, and Custom AI Blocks without paying. PowerRename is free as part of PowerToys. The difference is capability, not just price: PowerRename rewrites text you specify, while Zush generates names from file content.',
  },
  {
    question: 'Can Zush rename files by content on Windows?',
    answer:
      'Yes. That is the core difference. Zush reads each file and proposes a searchable name, so you are not limited to find-and-replace on names that are already meaningless.',
  },
];

const invoiceRenameFaq = [
  {
    question: 'Can Zush read the vendor, date, and amount from an invoice?',
    answer:
      'Yes. Zush reads the content of each invoice PDF and can pull details like the vendor, date, and invoice number using built-in Naming Blocks. For amounts or any other field, you can add a Custom AI Block that describes exactly what to extract, then combine these into a filename such as "Cloudflare – 2026-06 – Invoice".',
  },
  {
    question: 'Can I set my own invoice naming convention?',
    answer:
      'Yes. Combine Naming Blocks — vendor, date, invoice number, amount, and your own Custom AI Blocks — into a template so every invoice follows the same pattern. You can reorder blocks, choose separators, and set the case style once and reuse it everywhere.',
  },
  {
    question: 'Can invoices be renamed automatically when they arrive?',
    answer:
      'Yes. Point folder monitoring at your Downloads folder and new invoice PDFs are named by content as they land, using your invoice template. Every change stays in rename history so you can undo any batch.',
  },
  {
    question: 'Is it private? These are financial documents.',
    answer:
      'You choose the mode. Managed cloud is the default, BYOK uses your own provider key, and Offline AI mode analyzes files with a local Ollama model so supported file analysis never leaves your device. Files are renamed in place on your disk.',
  },
  {
    question: 'Does it work with scanned invoices?',
    answer:
      'Yes. When an invoice PDF is a scan rather than selectable text, Zush falls back to AI vision that reads the page image directly. This works well for scanned invoices, receipts, and letters.',
  },
];

const receiptRenameFaq = [
  {
    question: 'Can Zush name receipts by store, date, and amount?',
    answer:
      'Yes. Zush reads each receipt — whether it is a photo from your phone or a PDF — and can build a filename from the store name, date, and amount using Naming Blocks and Custom AI Blocks, for example "Whole Foods – 2026-06-03 Receipt".',
  },
  {
    question: 'Can it rename photo receipts, not just PDFs?',
    answer:
      'Yes. Receipts photographed as HEIC or JPG are read with AI vision, so a picture named IMG_2041.jpg becomes something searchable like "Home Depot – 2026-06-05 Receipt". PDF receipts and email exports work too.',
  },
  {
    question: 'Can I organize receipts for tax season?',
    answer:
      'Yes. Add a Custom AI Block for a category — office supplies, travel, meals — and combine it with the date and amount so a year of receipts becomes consistently named and easy to total. You review every name before applying, and undo history keeps a batch reversible.',
  },
  {
    question: 'Can I process a whole backlog of receipts at once?',
    answer:
      'Yes. Drop a folder of mixed receipt photos and PDFs into Zush, review the suggested names, and apply the batch. Zush handles mixed folders of images and documents in one pass.',
  },
  {
    question: 'Is receipt data kept private?',
    answer:
      'You choose the mode: managed cloud, BYOK with your own key, or Offline AI mode with a local Ollama model so supported file analysis stays on your device. Receipts are renamed in place on your disk.',
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
      { title: 'Batch Rename Docs', href: '/docs/batch-rename-files' },
      { title: 'Templates Guide', href: '/docs/templates' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ],
    relatedBlogPosts: [
      { title: 'Rename Files by Content', href: 'rename-files-by-content-guide' },
      { title: 'Mac batch rename methods', href: 'batch-rename-files-on-mac-complete-guide' },
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
      { title: 'Offline AI Docs', href: '/docs/offline-ai' },
      { title: 'BYOK Docs', href: '/docs/byok' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
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
          { name: 'Enable Offline AI mode', text: 'Open Zush, go to BYOK/Offline, refresh the model list, select and test the installed model, then enable Offline AI mode.' },
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
  'ai-file-organizer': {
    h1: 'AI File Organizer for Mac & Windows',
    h1Accent: 'AI File Organizer',
    category: 'general',
    definitionTitle: 'What Is an AI File Organizer?',
    definitionText:
      'An AI file organizer reads what each file contains and turns messy folders full of files into consistently named, searchable libraries. Point Zush at your files and folders on Mac and Windows and it names screenshots, PDFs, invoices, photos, documents, videos, audio, and design files by content — you review before applying, with templates, folder monitoring, and full undo history. Zush renames files in place; it does not move them between folders or rename the folders themselves.',
    showcaseSlides: sharedSlides,
    faqItems: fileOrganizerFaq,
    relatedPages: [
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Templates Guide', href: '/docs/templates' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Zush for Mac', href: '/mac' },
      { title: 'Zush for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Automatic File Organizer for Mac', href: 'automate-file-organization-macos' },
      { title: 'Best Ways to Organize Photos on Mac', href: 'best-ways-to-organize-photos-on-mac' },
      { title: 'Declutter Your Mac: File Cleanup Guide', href: 'declutter-your-mac-file-cleanup-guide' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Organize files with AI',
        description: 'Use Zush to create descriptive, consistent filenames for Mac and Windows folders without moving files between folders.',
        steps: [
          { name: 'Drop a messy folder into Zush', text: 'Add Downloads, a screenshots folder, a client folder, or any mixed batch of files.' },
          { name: 'Pick a naming convention', text: 'Use an AI title or combine dates, clients, categories, counters, and metadata with templates and Naming Blocks.' },
          { name: 'Review, apply, and automate', text: 'Preview every name, apply the batch, then enable folder monitoring so new files get organized automatically.' },
        ],
      },
      faqItems: fileOrganizerFaq,
      software: {
        pagePath: '/ai-file-organizer',
        description:
          'AI file organizer for Mac and Windows. Zush names files in place by content, keeps folders consistent with templates and Naming Blocks, monitors folders, and supports full undo without moving files between folders.',
        featureList: [
          'AI file organizer for Mac and Windows',
          'Name files by content, not just by pattern',
          'Rename files in place without moving them between folders',
          'Organize screenshots, PDFs, invoices, photos, documents, audio, and videos',
          'Automatic organization for Downloads via folder monitoring',
          'Consistent naming conventions with templates and 145+ Naming Blocks',
          'Preview every filename before applying',
          'Undo and rename history',
        ],
      },
    }),
  },
  'hazel-alternative': {
    h1: 'The Hazel Alternative That Reads Your Files',
    h1Accent: 'Hazel Alternative',
    category: 'general',
    definitionTitle: 'Zush vs Hazel: Rules vs Content',
    definitionText:
      'Hazel is a rule engine for macOS: it watches folders and acts on files based on conditions you write, such as name patterns, dates, or kind. Zush works the other way around — it reads what each file actually contains and suggests a descriptive, searchable name. Zush also monitors folders so new files are named as they arrive, keeps every batch in undo history, and runs on both Mac and Windows, while Hazel is macOS-only. Rules ask where a file came from; AI asks what is inside it.',
    showcaseSlides: sharedSlides,
    faqItems: hazelAlternativeFaq,
    relatedPages: [
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Zush for Mac', href: '/mac' },
    ],
    relatedBlogPosts: [
      { title: 'Automatic File Organizer for Mac', href: 'automate-file-organization-macos' },
      { title: 'Zush vs Sparkle', href: 'zush-vs-sparkle' },
      { title: 'Folder Monitoring for Automatic Renaming', href: 'folder-monitoring-automatic-file-renaming' },
      { title: 'Declutter Your Mac: File Cleanup Guide', href: 'declutter-your-mac-file-cleanup-guide' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Switch from Hazel to content-aware naming with Zush',
        description: 'Use Zush as a Hazel alternative that names files by content on Mac and Windows.',
        steps: [
          { name: 'Point Zush at a folder', text: 'Add a watched folder such as Downloads, or drop in an existing batch of files.' },
          { name: 'Choose a naming convention', text: 'Combine an AI title with dates, categories, clients, and metadata using templates and Naming Blocks.' },
          { name: 'Review, apply, and monitor', text: 'Preview every name, apply the batch, then enable folder monitoring so new files are named automatically.' },
        ],
      },
      faqItems: hazelAlternativeFaq,
      software: {
        pagePath: '/hazel-alternative',
        description:
          'Hazel alternative for Mac and Windows that names files by content. Zush reads screenshots, PDFs, photos, and documents, monitors folders, and keeps full undo history.',
        featureList: [
          'Content-aware file naming instead of pattern rules',
          'Folder monitoring for automatic renaming',
          'Works on macOS and Windows, not macOS only',
          'Templates, Naming Blocks, and Custom AI Blocks',
          'Preview every filename before applying',
          'Undo and rename history',
        ],
      },
    }),
  },
  'powerrename-alternative': {
    h1: 'The PowerRename Alternative That Understands Your Files',
    h1Accent: 'PowerRename Alternative',
    category: 'general',
    definitionTitle: 'Zush vs PowerRename: Find-and-Replace vs Content',
    definitionText:
      'PowerRename, part of Microsoft PowerToys, rewrites filenames with search-and-replace and regular expressions — it never looks inside a file. Zush reads the content of each file on Windows and suggests a descriptive, searchable name based on what it contains, then lets you review every name before applying. Use PowerRename for uniform mechanical changes; use Zush when each file needs a different, meaningful name.',
    showcaseSlides: sharedSlides,
    faqItems: powerRenameAlternativeFaq,
    relatedPages: [
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Zush for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Best AI File Renamers for Windows', href: 'best-ai-file-renamer-tools-windows-compared' },
      { title: 'Bulk Rename Utility Alternatives', href: 'bulk-rename-utility-alternatives' },
      { title: 'Rename Files with AI on Windows', href: 'rename-files-with-ai-windows-guide' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename files by content on Windows with Zush',
        description: 'Use Zush as a PowerRename alternative that reads file content on Windows 11.',
        steps: [
          { name: 'Add files or a folder', text: 'Open Zush for Windows and add a mixed File Explorer folder or a batch of files.' },
          { name: 'Pick a naming pattern', text: 'Use an AI title or combine dates, counters, categories, and metadata with Naming Blocks.' },
          { name: 'Review and apply', text: 'Preview every content-aware name, regenerate individual suggestions, then apply the batch with undo available.' },
        ],
      },
      faqItems: powerRenameAlternativeFaq,
      software: {
        pagePath: '/powerrename-alternative',
        description:
          'PowerRename alternative for Windows that renames files by content. Zush reads screenshots, PDFs, photos, and documents and suggests searchable names with preview and undo.',
        featureList: [
          'Content-aware naming instead of find-and-replace',
          'Reads screenshots, PDFs, photos, and documents',
          'Searchable filenames for File Explorer and Windows Search',
          'Templates, Naming Blocks, and Custom AI Blocks',
          'Preview every filename before applying',
          'Undo and rename history',
        ],
      },
    }),
  },
  'rename-invoices-with-ai': {
    h1: 'Rename Invoices Automatically with AI',
    h1Accent: 'Rename Invoices',
    category: 'pdf',
    definitionTitle: 'What Is AI Invoice Renaming?',
    definitionText:
      'AI invoice renaming reads each invoice and turns a filename like "download (7).pdf" into "Cloudflare – 2026-06 – Invoice". Zush reads the vendor, date, and invoice number from invoice PDFs, plus any field you define with a Custom AI Block such as the amount, then applies your naming convention across the whole batch. Scanned invoices are read with AI vision, folder monitoring names new invoices as they arrive, and every change is reversible from rename history.',
    showcaseSlides: invoiceSlides,
    faqItems: invoiceRenameFaq,
    relatedPages: [
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename & Organize Receipts with AI', href: '/rename-receipts-with-ai' },
      { title: 'Custom AI Blocks Docs', href: '/docs/custom-ai-blocks' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'BYOK Docs', href: '/docs/byok' },
    ],
    relatedBlogPosts: [
      { title: 'Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'Batch Rename Google Drive Files', href: 'batch-rename-google-drive-files' },
      { title: 'Naming Blocks File Naming Guide', href: 'naming-blocks-file-naming-guide' },
      { title: 'Organize Client Files for Freelancers', href: 'organize-client-files-freelancers-mac' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename invoices automatically with AI',
        description: 'Use Zush to rename invoice PDFs by vendor, date, and amount on Mac and Windows.',
        steps: [
          { name: 'Add your invoices', text: 'Drop a folder of invoice PDFs, or point folder monitoring at Downloads.' },
          { name: 'Build an invoice template', text: 'Combine vendor, date, invoice number, and a Custom AI Block for the amount into one naming pattern.' },
          { name: 'Review and apply', text: 'Preview every invoice name, adjust if needed, and apply the batch with undo history available.' },
        ],
      },
      faqItems: invoiceRenameFaq,
      software: {
        pagePath: '/rename-invoices-with-ai',
        description:
          'AI invoice renamer for Mac and Windows. Zush reads vendor, date, and amount from invoice PDFs, applies your naming convention, and supports scanned invoices, folder monitoring, and undo.',
        applicationSubCategory: 'Invoice Management',
        featureList: [
          'Rename invoice PDFs by vendor, date, and invoice number',
          'Extract amounts and custom fields with Custom AI Blocks',
          'Read scanned invoices with AI vision',
          'Automatic renaming for Downloads via folder monitoring',
          'Consistent invoice naming conventions with templates',
          'Private modes: BYOK and Offline AI',
          'Preview every filename and undo any batch',
        ],
      },
    }),
  },
  'rename-receipts-with-ai': {
    h1: 'Rename and Organize Receipts with AI',
    h1Accent: 'Organize Receipts',
    category: 'pdf',
    definitionTitle: 'What Is AI Receipt Renaming?',
    definitionText:
      'AI receipt renaming turns a phone photo named IMG_2041.jpg or a PDF into a searchable filename like "Whole Foods – 2026-06-03 Receipt". Zush reads receipts whether they are HEIC and JPG photos or PDF and email exports, pulls the store, date, and amount, and can add a Custom AI Block for a tax or expense category. You review every name before applying, and undo history keeps a batch reversible — ideal for tax season and expense reports on Mac and Windows.',
    showcaseSlides: receiptSlides,
    faqItems: receiptRenameFaq,
    relatedPages: [
      { title: 'Rename & Organize Invoices with AI', href: '/rename-invoices-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Custom AI Blocks Docs', href: '/docs/custom-ai-blocks' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
    ],
    relatedBlogPosts: [
      { title: 'Naming Blocks File Naming Guide', href: 'naming-blocks-file-naming-guide' },
      { title: 'Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'Organize Client Files for Freelancers', href: 'organize-client-files-freelancers-mac' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename and organize receipts with AI',
        description: 'Use Zush to name receipt photos and PDFs by store, date, and amount on Mac and Windows.',
        steps: [
          { name: 'Add your receipts', text: 'Drop a folder of receipt photos and PDFs, or point folder monitoring at where they land.' },
          { name: 'Build a receipt template', text: 'Combine store, date, amount, and a Custom AI Block for a tax or expense category.' },
          { name: 'Review and apply', text: 'Preview every receipt name, apply the batch, and undo from history if a folder needs another pass.' },
        ],
      },
      faqItems: receiptRenameFaq,
      software: {
        pagePath: '/rename-receipts-with-ai',
        description:
          'AI receipt organizer for Mac and Windows. Zush names receipt photos and PDFs by store, date, and amount, adds tax categories with Custom AI Blocks, and keeps undo history.',
        applicationSubCategory: 'Receipt Management',
        featureList: [
          'Name receipts by store, date, and amount',
          'Read photo receipts (HEIC, JPG) with AI vision',
          'Add tax or expense categories with Custom AI Blocks',
          'Batch process a backlog of mixed receipts',
          'Private modes: BYOK and Offline AI',
          'Preview every filename and undo any batch',
        ],
      },
    }),
  },
};
