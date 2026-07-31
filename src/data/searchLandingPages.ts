import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

type SearchLandingSlug =
  | 'batch-rename-files'
  | 'offline-ai-file-renamer'
  | 'ai-file-organizer'
  | 'hazel-alternative'
  | 'powerrename-alternative'
  | 'rename-invoices-with-ai'
  | 'rename-receipts-with-ai'
  | 'rename-scanned-documents'
  | 'for-accountants'
  | 'for-medical'
  | 'for-legal'
  | 'automate-downloads-folder';

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

const scannedDocumentSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'Scan0001.pdf', after: 'Acme Supply – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'Scan0002.pdf', after: 'Lease Agreement – 12 Main St – 2026.pdf', type: 'pdf' },
      { before: 'img20260612_10331290.pdf', after: 'Blue Cross – EOB – 2026-06-12.pdf', type: 'pdf' },
      { before: 'Scanned Document 4.pdf', after: 'W-9 – Rivera Consulting – 2026.pdf', type: 'pdf' },
      { before: 'CCF_000135.pdf', after: 'Insurance Policy – Auto – 2026-2027.pdf', type: 'pdf' },
      { before: 'doc00421720260612103455.pdf', after: 'Utility Bill – Electric – 2026-06.pdf', type: 'pdf' },
    ],
  },
  {
    files: [
      { before: 'Scan_0042.pdf', after: '2026-06-10 – Receipt – Office Depot.pdf', type: 'pdf' },
      { before: 'Scan_0043.pdf', after: '2026-06-11 – Contract – NDA – Vertex.pdf', type: 'pdf' },
      { before: 'Scan_0044.pdf', after: '2026-06-11 – Bank Statement – May.pdf', type: 'pdf' },
      { before: 'Scan_0045.pdf', after: '2026-06-12 – Tax – 1099-NEC – 2025.pdf', type: 'pdf' },
      { before: 'Scan_0046.pdf', after: '2026-06-12 – Referral Letter – Dr Chen.pdf', type: 'pdf' },
      { before: 'Scan_0047.pdf', after: '2026-06-13 – Warranty – Dishwasher.pdf', type: 'pdf' },
    ],
  },
];

const scannedDocumentFaq = [
  {
    question: 'How do I rename scanned documents automatically?',
    answer:
      'Drop the scans into Zush or point folder monitoring at your scanner output folder. Zush reads each scan with AI vision, extracts the document type, party, and date, and proposes a name that follows your Template. You review the batch and apply it with undo available.',
  },
  {
    question: 'Do scanned PDFs need an OCR text layer first?',
    answer:
      'No. When a PDF is a page image with no selectable text, Zush falls back to AI vision that reads the page image directly. Scans from ScanSnap, Brother, Epson, Canon, and HP scanners work without a separate OCR pass.',
  },
  {
    question: 'Can Zush watch my scanner folder and rename new scans as they arrive?',
    answer:
      'Yes. Assign a Template to the folder your scanner saves into, and Zush renames each new Scan0001.pdf as it lands — the same convention every time, with rename history so any batch can be reverted.',
  },
  {
    question: 'What about sensitive scans like medical or financial documents?',
    answer:
      'Zush supports private modes: BYOK sends analysis to your own API account, and Offline AI mode uses local Ollama models so supported files never leave the machine. Filenames and folder structures always stay local.',
  },
];

const accountantSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'download (7).pdf', after: '2026-06-12 – Acme Supply – INV-10234 – 1,204 USD.pdf', type: 'pdf' },
      { before: 'Scan0001.pdf', after: '2026-06-03 – Cloudflare – CF-88112 – 96 USD.pdf', type: 'pdf' },
      { before: 'IMG_2041.jpg', after: '2026-06-03 – Whole Foods – 84 USD – Meals.jpg', type: 'image' },
      { before: 'statement_final.pdf', after: '2026-05-31 – Bank Statement – First National.pdf', type: 'pdf' },
      { before: 'attachment (3).pdf', after: '2026-06-05 – Payroll Report – May.pdf', type: 'pdf' },
      { before: 'doc.pdf', after: '2026-06-08 – W-9 – Rivera Consulting.pdf', type: 'pdf' },
    ],
  },
  {
    files: [
      { before: 'Scan_0042.pdf', after: 'Vertex GmbH – 2026-06 – INV-0088 – PAID.pdf', type: 'pdf' },
      { before: 'Scan_0043.pdf', after: 'Meridian LLC – 2026-06 – INV-0089 – SENT.pdf', type: 'pdf' },
      { before: 'receipt_email.pdf', after: '2026-06-02 – Uber – 34 USD – Travel.pdf', type: 'pdf' },
      { before: 'export (1).xlsx', after: '2026-Q2 – Expense Summary – Vertex.xlsx', type: 'sheet' },
      { before: 'scan.pdf', after: '2026-06-10 – 1099-NEC – Rivera Consulting.pdf', type: 'pdf' },
      { before: 'bill.pdf', after: '2026-06-04 – Utility – Electric – 210 USD.pdf', type: 'pdf' },
    ],
  },
];

const accountantFaq = [
  {
    question: 'How does Zush help accountants and bookkeepers?',
    answer:
      'Zush reads every invoice, receipt, statement, and scan, and renames it to your convention — vendor, date, invoice number, amount — in reviewed batches with undo. Folder monitoring keeps client intake folders continuously named, so month-end close starts from a folder that is already an inventory.',
  },
  {
    question: 'Can each client have their own naming convention?',
    answer:
      'Yes. Templates are reusable setups — one per client or one shared across all clients. A Template controls the filename structure, date format, vendor spelling, and any Custom AI Block fields like expense categories.',
  },
  {
    question: 'Does it work with scanned paper documents?',
    answer:
      'Yes. When a scan has no text layer, Zush reads the page image with AI vision, so scanner output like Scan0001.pdf follows the same convention as born-digital PDFs — no separate OCR pass.',
  },
  {
    question: 'Is client financial data kept private?',
    answer:
      'Renaming happens in place on your disk — Zush never uploads or stores your files. For analysis, choose your posture: managed cloud AI, BYOK through your own API account, or Offline AI with local models so supported files never leave the machine.',
  },
  {
    question: 'Does Zush charge per document?',
    answer:
      'No. Paid PRO is unmetered — $10/month or $48 one-time for unlimited renames. There are no per-file credits, so re-running a folder after a convention change costs nothing. The first 50 renames are free to evaluate.',
  },
];

const medicalSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'Scan0001.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results.pdf', type: 'pdf' },
      { before: 'Scan0002.pdf', after: 'MRN-48211 – 2026-06-12 – Referral – Cardiology.pdf', type: 'pdf' },
      { before: 'fax_received.pdf', after: 'MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf', type: 'pdf' },
      { before: 'Scan0003.pdf', after: 'MRN-30177 – 2026-06-02 – EOB – Blue Cross.pdf', type: 'pdf' },
      { before: 'Scanned Document 4.pdf', after: 'MRN-51402 – 2026-06-05 – Intake Form.pdf', type: 'pdf' },
      { before: 'doc_20260608.pdf', after: 'MRN-51402 – 2026-06-08 – Consent – Procedure.pdf', type: 'pdf' },
    ],
  },
  {
    files: [
      { before: 'Scan_0051.pdf', after: 'ACC-2210 – 2026-06-03 – Claim – Denial.pdf', type: 'pdf' },
      { before: 'Scan_0052.pdf', after: 'ACC-2210 – 2026-06-04 – ERA – Aetna.pdf', type: 'pdf' },
      { before: 'attachment (2).pdf', after: 'MRN-48211 – 2026-06-10 – Rx Record.pdf', type: 'pdf' },
      { before: 'IMG_5120.jpg', after: 'MRN-30177 – 2026-06-11 – Insurance Card.jpg', type: 'image' },
      { before: 'letter.pdf', after: 'MRN-51402 – 2026-06-12 – Correspondence – Lab.pdf', type: 'pdf' },
      { before: 'Scan_0060.pdf', after: 'MRN-51402 – 2026-06-13 – Progress Note.pdf', type: 'pdf' },
    ],
  },
];

const medicalFaq = [
  {
    question: 'Can Zush rename patient records without uploading them anywhere?',
    answer:
      'Yes. In Offline AI mode, Zush analyzes supported files with local Ollama models on Mac or Windows — records are read and renamed entirely on the machine. Renaming always happens in place on your disk; Zush never uploads or stores your files.',
  },
  {
    question: 'How does Zush keep patient names out of filenames?',
    answer:
      'Your Template defines what a filename contains. The recommended pattern uses the MRN or account number, the date of service, and a record type — extracted from the document by AI — so filenames never expose patient names in sync logs, attachment lines, or search indexes. The batch preview lets you confirm before anything is applied.',
  },
  {
    question: 'Does it handle scanned records and faxes?',
    answer:
      'Yes. Most records enter as scanner or fax output with no text layer. Zush reads the page image with AI vision — no separate OCR pass — and extracts the identifier, date of service, and record type from what is printed on the page.',
  },
  {
    question: 'Is Zush HIPAA compliant?',
    answer:
      'No software tool makes a practice HIPAA-compliant by itself — compliance lives in your organization’s safeguards and agreements. What Zush provides is a renaming step designed not to create new disclosure paths: local Offline AI processing, in-place renaming with no file uploads, and identifier-based naming patterns. Review the setup with whoever owns compliance in your practice.',
  },
  {
    question: 'Can the scanner folder be renamed automatically?',
    answer:
      'Yes. Assign a Template to folder monitoring on the folder your scanner or fax software saves into, and each new document is renamed to your convention as it arrives — with preview batches and rename history for reverting.',
  },
];

const legalSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'Document(1).pdf', after: '2026-0142 – 2026-05-29 – Answer – Meridian LLC.pdf', type: 'pdf' },
      { before: 'Scan_0042.pdf', after: '2026-0142 – 2026-03-02 – Engagement Letter – Vertex.pdf', type: 'pdf' },
      { before: 'download (3).pdf', after: '2026-0142 – 2026-05-06 – Complaint – SDNY.pdf', type: 'pdf' },
      { before: 'Agreement (clean).docx', after: '2026-0142 – 2026-06-11 – Settlement – Meridian.docx', type: 'doc' },
      { before: 'scan.pdf', after: '2026-0158 – 2026-06-01 – NDA – Executed – Northwind.pdf', type: 'pdf' },
      { before: 'attachment.pdf', after: '2026-0158 – 2026-06-04 – Motion – Continuance.pdf', type: 'pdf' },
    ],
  },
  {
    files: [
      { before: 'efiling_conf_88213.pdf', after: '2026-0158 – 2026-06-09 – Filing Receipt – SDNY.pdf', type: 'pdf' },
      { before: 'ltr_draft_final2.docx', after: '2026-0142 – 2026-06-10 – Demand Letter – v03.docx', type: 'doc' },
      { before: 'Scan_0044.pdf', after: '2026-0158 – 2026-06-11 – Exhibit B – Invoice Set.pdf', type: 'pdf' },
      { before: 'doc (7).pdf', after: '2026-0142 – 2026-06-12 – Order – Discovery.pdf', type: 'pdf' },
      { before: 'notes_meeting.docx', after: '2026-0142 – 2026-06-12 – Memo – Deposition Prep.docx', type: 'doc' },
      { before: 'Scan_0048.pdf', after: '2026-0158 – 2026-06-13 – Correspondence – Counsel.pdf', type: 'pdf' },
    ],
  },
];

const legalFaq = [
  {
    question: 'How does Zush name legal documents?',
    answer:
      'Zush reads each filing, contract, or scan and extracts the matter number, the document’s own date, the document type, and the parties — then applies your convention, so a matter folder sorted by name reads as the case chronology. Every batch is previewed before applying and can be reverted.',
  },
  {
    question: 'Is it safe for confidential client documents?',
    answer:
      'Choose the mode that matches your confidentiality posture: Offline AI analyzes supported files with local models so client documents never leave the machine, and BYOK routes analysis through your firm’s own AI provider account under its terms. Files are renamed in place — nothing is uploaded or stored by Zush.',
  },
  {
    question: 'Can it extract our matter numbers?',
    answer:
      'Yes. A Custom AI Block is a plain-language extraction rule — for example "the matter number, formatted YYYY-NNNN" — that becomes a reusable block in your naming pattern, alongside date, document type, and party.',
  },
  {
    question: 'What about court filings and scanner output?',
    answer:
      'Both are the intake problem Zush automates: e-filing downloads named by case-number hash and Scan_0042.pdf from the office scanner. Folder monitoring on the download and scan folders renames each arrival to your convention, reading image-only scans with AI vision.',
  },
  {
    question: 'Does Zush handle Word documents and drafts, not just PDFs?',
    answer:
      'Yes. Zush reads DOCX and other Office and iWork formats as well as PDFs and scans, so counterparty drafts like "Agreement (clean).docx" get proper matter-date-type names alongside filed PDFs.',
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

const downloadsFolderSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'download (7).pdf', after: 'Cloudflare – 2026-07 – Invoice.pdf', type: 'pdf' },
      { before: 'Screenshot 2026-07-14.png', after: 'Stripe Payouts Dashboard.png', type: 'image' },
      { before: 'document (3).pdf', after: 'Apartment Lease Renewal 2026.pdf', type: 'pdf' },
      { before: 'export (1).xlsx', after: 'Q2 Ad Spend Report.xlsx', type: 'sheet' },
      { before: 'attachment.pdf', after: 'Delta – 2026-08-02 – Boarding Pass.pdf', type: 'pdf' },
      { before: 'unnamed.jpg', after: 'Team Offsite Group Photo.jpg', type: 'image' },
    ],
  },
  {
    files: [
      { before: 'invoice_copy (2).pdf', after: 'AWS – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'Screen Shot 2026-07-03.png', after: 'Figma Pricing Page Redesign.png', type: 'image' },
      { before: 'scan_0042.pdf', after: 'Dental Insurance Claim Form.pdf', type: 'pdf' },
      { before: 'GMT20260701-recording.mp4', after: 'Client Kickoff Call July.mp4', type: 'video' },
      { before: 'ticket.pdf', after: 'Coldplay – 2026-09-14 – Tickets.pdf', type: 'pdf' },
      { before: 'IMG_8817.HEIC', after: 'Whiteboard Sprint Planning.heic', type: 'image' },
    ],
  },
];

const downloadsFolderFaq = [
  {
    question: 'How does Zush automate the Downloads folder?',
    answer:
      'Point folder monitoring at Downloads and Zush names every new file by content as it arrives — an invoice PDF becomes "Cloudflare – 2026-07 – Invoice.pdf", a screenshot becomes a description of what it shows. Files are renamed in place using the template you choose, and every change stays in rename history.',
  },
  {
    question: 'Does Zush move downloads into folders?',
    answer:
      'No. Zush renames files in place and never moves them, so it cannot break paths or workflows. If you also want files routed into folders, pair Zush with a mover such as Hazel on Mac: let the mover handle where files go and Zush handle what they are called. Searchable names make any folder structure work better.',
  },
  {
    question: 'Which kinds of downloads work best?',
    answer:
      'PDFs such as invoices, receipts, tickets, and statements; screenshots and images; Office documents and spreadsheets; audio and video. Zush supports 104 file extensions and leaves unsupported files untouched.',
  },
  {
    question: 'Can the Downloads folder use its own naming template?',
    answer:
      'Yes. Each monitored folder has its own template, so Downloads can use a vendor-date-category convention while Screenshots uses a simple AI title. Templates combine Naming Blocks — dates, vendors, amounts, counters — and Custom AI Blocks that extract any detail you describe.',
  },
  {
    question: 'Is monitoring my Downloads folder private?',
    answer:
      'You choose the mode: managed cloud, BYOK with your own provider key, or Offline AI with local Ollama models so supported file analysis never leaves your device. Files are renamed in place on your disk.',
  },
  {
    question: 'Does this work on both Mac and Windows?',
    answer:
      'Yes. Zush has a native Mac app (macOS 15+) and a Windows build in the Microsoft Store. Folder monitoring, templates, Naming Blocks, and undo history work on both.',
  },
];

export const SEARCH_LANDING_PAGES: Record<SearchLandingSlug, FeatureLandingPageProps> = {
  'automate-downloads-folder': {
    h1: 'Automate Your Downloads Folder with AI',
    h1Accent: 'Downloads Folder',
    category: 'general',
    definitionTitle: 'What Does Automating the Downloads Folder Mean?',
    definitionText:
      'Zush watches your Downloads folder on Mac and Windows and renames each new file by its content, so download (7).pdf lands as something you can search for.',
    showcaseSlides: downloadsFolderSlides,
    faqItems: downloadsFolderFaq,
    comparison: {
      eyebrow: 'Downloads folder cleanup compared',
      title: 'What each Downloads folder fix actually solves',
      intro:
        `Most Downloads advice solves storage or sorting, not findability. A file you can search for needs a name that says what it is. Zush reads ${SUPPORTED_FORMAT_COUNT} formats and names each new file as it lands, in 60+ languages, with the first ${APP_CONFIG.free_tier_limit} renames free.`,
      headers: { tool: 'Approach', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Storage Sense',
          bestFor: 'Reclaiming disk space by deleting Downloads files that have sat unopened past a cutoff you set',
          gap: 'It decides what to remove, never what anything is called — the files you keep are still named download (7).pdf.',
        },
        {
          tool: 'Sorting by file type',
          bestFor: 'Splitting a flat folder into Documents, Images, and Installers so it stops looking like a dump',
          gap: 'Moves the problem one level down: a folder of forty PDFs named scan_0042.pdf is no easier to search than a mixed folder was.',
        },
        {
          tool: 'Manual triage',
          bestFor: 'Small volumes, and the only approach that gets names exactly right every time',
          gap: 'It competes with everything else you do, so it holds for about a week and the backlog quietly returns.',
        },
        {
          tool: 'Zush folder monitoring',
          bestFor: 'Naming every new file by what it contains, the moment it lands, with undo history for the whole folder',
          gap: 'It names files in place rather than filing them away, so you still choose the folder structure you want.',
        },
      ],
    },
    relatedPages: [
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Hazel Alternative', href: '/hazel-alternative' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Rename Invoices with AI', href: '/rename-invoices-with-ai' },
    ],
    relatedBlogPosts: [
      { title: 'Organize the Downloads Folder on Mac', href: 'how-to-organize-downloads-folder-mac' },
      { title: 'Organize the Downloads Folder on Windows', href: 'organize-downloads-folder-windows' },
      { title: 'Folder Monitoring for Automatic Renaming', href: 'folder-monitoring-automatic-file-renaming' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Automate your Downloads folder with Zush',
        description: 'Use Zush folder monitoring to name new downloads by content on Mac and Windows.',
        steps: [
          { name: 'Add Downloads to Monitor', text: 'Open the Monitor tab in Zush and point it at your Downloads folder.' },
          { name: 'Choose a naming template', text: 'Use a simple AI title or combine dates, vendors, categories, and other Naming Blocks into one convention.' },
          { name: 'Let new files name themselves', text: 'New downloads are renamed in place as they arrive. Review the rename history and undo any batch.' },
        ],
      },
      faqItems: downloadsFolderFaq,
      software: {
        pagePath: '/automate-downloads-folder',
        description:
          'Downloads folder automation for Mac and Windows. Zush monitors Downloads and names every new file by content — invoices, receipts, screenshots, and documents — with preview and undo.',
        featureList: [
          'Automatic content-aware names for new downloads',
          'Folder monitoring on macOS and Windows',
          'Invoice, receipt, screenshot, and document naming',
          'Per-folder templates with Naming Blocks',
          'Renames in place — files are never moved',
          'Undo and rename history',
        ],
      },
    }),
  },
  'batch-rename-files': {
    h1: 'Batch Rename Files on Mac & Windows with AI',
    h1Accent: 'Batch Rename Files',
    category: 'general',
    definitionTitle: 'What Is an AI Batch Rename Tool?',
    definitionText:
      'An AI batch rename tool renames many files in one workflow while giving each file a content-aware name. Zush reads screenshots, photos, PDFs, documents, videos, audio, and design files in mixed folders, then lets you review every name before applying changes.',
    showcaseSlides: sharedSlides,
    faqItems: batchRenameFaq,
    relatedPages: [
      { title: 'Batch Rename Docs', href: '/docs/batch-rename-files' },
      { title: 'Templates Guide', href: '/docs/templates' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Automate Your Downloads Folder', href: '/automate-downloads-folder' },
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
      { title: 'Local AI File Renaming: Private and Offline', href: 'local-ai-file-renaming-ollama-guide' },
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
      { title: 'Best AI File Organizers for Mac', href: 'best-ai-file-organizers-mac' },
      { title: 'Automatic File Organizer for Mac', href: 'automate-file-organization-macos' },
      { title: 'Best Ways to Organize Photos on Mac', href: 'best-ways-to-organize-photos-on-mac' },
      { title: 'Declutter Your Mac: File Cleanup Guide', href: 'declutter-your-mac-file-cleanup-guide' },
    ],
    contextualGuideLink: {
      before: 'Comparing apps before you choose a workflow? See the',
      label: 'best AI file organizers for Mac',
      href: '/blog/best-ai-file-organizers-mac',
      after: 'for a verification-first breakdown of renaming, moving, local AI, undo, and pricing.',
    },
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
    // Hazel is macOS-only. This page happened to render Mac buttons because the
    // detection default is Mac; state it so a change to that default cannot
    // silently break it.
    forceOS: 'mac',
    definitionTitle: 'Zush vs Hazel: Rules vs Content',
    definitionText:
      'Hazel is a rule engine for macOS: it watches folders and acts on files based on conditions you write, such as name patterns, dates, or kind. Zush works the other way around — it reads what each file actually contains and suggests a descriptive, searchable name. Zush also monitors folders so new files are named as they arrive, keeps every batch in undo history, and runs on both Mac and Windows, while Hazel is macOS-only. Rules ask where a file came from; AI asks what is inside it.',
    showcaseSlides: sharedSlides,
    faqItems: hazelAlternativeFaq,
    relatedPages: [
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Automate Your Downloads Folder', href: '/automate-downloads-folder' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Zush for Mac', href: '/mac' },
    ],
    relatedBlogPosts: [
      { title: 'Automatic File Organizer for Mac', href: 'automate-file-organization-macos' },
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
    // PowerRename only exists in Windows PowerToys, so a Mac download button
    // here is wrong for every visitor and for anything reading the static HTML.
    forceOS: 'windows',
    definitionTitle: 'Zush vs PowerRename: Find-and-Replace vs Content',
    // The full PowerRename-vs-Zush breakdown lives in the comparison table
    // below the fold, so the hero only has to state the split.
    definitionText:
      'PowerRename, part of Microsoft PowerToys, rewrites filenames by pattern. Zush reads inside each Windows file and gives it a searchable name.',
    showcaseSlides: sharedSlides,
    faqItems: powerRenameAlternativeFaq,
    comparison: {
      eyebrow: 'Windows rename tools compared',
      title: 'Where each Windows rename tool stops',
      intro:
        `Every tool below is good at something. The split is simple: pattern tools rewrite the name you already have, while Zush reads the file and writes a new one. Zush covers ${SUPPORTED_FORMAT_COUNT} formats across images, documents, video, audio, and design files, names them in 60+ languages, and the first ${APP_CONFIG.free_tier_limit} renames are free.`,
      headers: { tool: 'Tool', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'PowerRename (PowerToys)',
          bestFor: 'Find-and-replace, regular expressions, counters, and date variables applied to a whole selection at once',
          gap: 'It works from filenames and file attributes and never opens the file, so two scans that both arrived as scan_004.pdf come out just as indistinguishable as they went in.',
        },
        {
          tool: 'File Explorer rename (F2)',
          bestFor: 'Numbering a single folder of similar files in a few keystrokes',
          gap: 'Produces Photo (1), Photo (2), Photo (3) — enough to keep names unique, never enough to find one of them again.',
        },
        {
          tool: 'Rule-based renamers',
          bestFor: 'Multi-step rules you configure once and reuse on folders that always look the same',
          gap: 'The rule has to be written before the tool sees the files, so a mixed folder still needs you to sort it into predictable batches first.',
        },
        {
          tool: 'Zush',
          bestFor: 'Mixed folders where every file needs its own descriptive name, with a preview of each name and undo for the whole batch',
          gap: 'It reads the file to name it, so it runs as a desktop app on the folder rather than as a one-key shortcut on a selection.',
        },
      ],
    },
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
      'AI invoice renaming reads each invoice PDF and turns "download (7).pdf" into "Cloudflare – 2026-06 – Invoice", using the vendor, date, and number it finds inside.',
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
      { title: 'How to Automatically Rename Invoices with AI', href: 'automatically-rename-invoices-ai' },
      { title: 'Invoice File Naming Convention', href: 'invoice-file-naming-convention' },
      { title: 'Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'Naming Blocks File Naming Guide', href: 'naming-blocks-file-naming-guide' },
    ],
    contextualGuideLink: {
      before: 'Need the complete accounting workflow? Follow the',
      label: 'guide to automatically renaming invoices with AI',
      href: '/blog/automatically-rename-invoices-ai',
      after: 'for naming Templates, review steps, and web-versus-desktop tool comparisons.',
    },
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
      'AI receipt renaming turns IMG_2041.jpg into "Whole Foods – 2026-06-03 Receipt", pulling the store, date, and amount from receipt photos and PDFs.',
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
      { title: 'How to Automatically Rename Invoices with AI', href: 'automatically-rename-invoices-ai' },
      { title: 'Naming Blocks File Naming Guide', href: 'naming-blocks-file-naming-guide' },
      { title: 'Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'Organize Client Files for Freelancers', href: 'organize-client-files-freelancers-mac' },
    ],
    contextualGuideLink: {
      before: 'Receipts and invoices can share one reviewed intake process; see how to',
      label: 'automatically rename invoices with AI',
      href: '/blog/automatically-rename-invoices-ai',
      after: 'and adapt the same vendor-date-amount convention for receipt photos and PDFs.',
    },
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
  'rename-scanned-documents': {
    h1: 'Rename Scanned Documents Automatically',
    h1Accent: 'Scanned Documents',
    category: 'pdf',
    definitionTitle: 'What Is Automatic Scan Renaming?',
    definitionText:
      'Automatic scan renaming reads each scanned page with AI vision and turns "Scan0001.pdf" into "Acme Supply – 2026-06 – Invoice", using the document type, party, and date it finds on the page — no separate OCR pass required.',
    showcaseSlides: scannedDocumentSlides,
    faqItems: scannedDocumentFaq,
    relatedPages: [
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename & Organize Invoices with AI', href: '/rename-invoices-with-ai' },
      { title: 'Rename & Organize Receipts with AI', href: '/rename-receipts-with-ai' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
    ],
    relatedBlogPosts: [
      { title: 'Rename Scanned Documents Automatically', href: 'rename-scanned-documents-automatically' },
      { title: 'Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'How to Automatically Rename Invoices with AI', href: 'automatically-rename-invoices-ai' },
      { title: 'Folder Monitoring for Automatic Renaming', href: 'folder-monitoring-automatic-file-renaming' },
    ],
    contextualGuideLink: {
      before: 'Coming from a document scanner? Follow the',
      label: 'guide to renaming scanned documents automatically',
      href: '/blog/rename-scanned-documents-automatically',
      after: 'for scanner-specific defaults, naming conventions, and a watch-folder setup.',
    },
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename scanned documents automatically',
        description: 'Use Zush to name scanner output by document type, party, and date on Mac and Windows.',
        steps: [
          { name: 'Add your scans', text: 'Drop a folder of scanned PDFs, or point folder monitoring at the folder your scanner saves into.' },
          { name: 'Build a scan template', text: 'Combine document type, vendor or party, and date Naming Blocks — add a Custom AI Block for case numbers or categories.' },
          { name: 'Review and apply', text: 'Preview every proposed name, adjust the template if needed, and apply the batch with undo history available.' },
        ],
      },
      faqItems: scannedDocumentFaq,
      software: {
        pagePath: '/rename-scanned-documents',
        description:
          'AI scan renamer for Mac and Windows. Zush reads scanned PDFs with AI vision — no OCR pass needed — and names them by document type, party, and date, with folder monitoring and undo.',
        applicationSubCategory: 'Document Management',
        featureList: [
          'Rename Scan0001.pdf files by what each page actually says',
          'AI vision reads image-only scans without an OCR text layer',
          'Works with ScanSnap, Brother, Epson, Canon, and HP scanner output',
          'Automatic renaming for scanner folders via folder monitoring',
          'Consistent conventions with Templates and Naming Blocks',
          'Private modes: BYOK and Offline AI',
          'Preview every filename and undo any batch',
        ],
      },
    }),
  },
  'for-accountants': {
    h1: 'Zush for Accountants and Bookkeepers',
    h1Accent: 'Accountants',
    category: 'pdf',
    definitionTitle: 'What Does Zush Do for Accounting Work?',
    definitionText:
      'Zush reads every invoice, receipt, statement, and scan in a client folder and renames it to your convention — "download (7).pdf" becomes "2026-06-12 – Acme Supply – INV-10234 – 1,204 USD" — so reconciliation and close start from folders that are already inventories.',
    showcaseSlides: accountantSlides,
    faqItems: accountantFaq,
    relatedPages: [
      { title: 'Rename & Organize Invoices with AI', href: '/rename-invoices-with-ai' },
      { title: 'Rename & Organize Receipts with AI', href: '/rename-receipts-with-ai' },
      { title: 'Rename Scanned Documents', href: '/rename-scanned-documents' },
      { title: 'Invoice Template Setup', href: '/docs/templates/invoices' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
    ],
    relatedBlogPosts: [
      { title: 'Invoice File Naming Convention', href: 'invoice-file-naming-convention' },
      { title: 'How to Organize Invoices and Receipts', href: 'how-to-organize-invoices-and-receipts' },
      { title: 'Rename Invoices for QuickBooks & Xero', href: 'rename-invoices-for-quickbooks-xero' },
      { title: 'How to Organize Tax Documents', href: 'how-to-organize-tax-documents' },
    ],
    contextualGuideLink: {
      before: 'Building the full filing system? Start with',
      label: 'how to organize invoices and receipts',
      href: '/blog/how-to-organize-invoices-and-receipts',
      after: 'for the intake-rename-archive loop this page automates.',
    },
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Set up AI document renaming for accounting work',
        description: 'Use Zush to keep client invoices, receipts, and scans named to one convention on Mac and Windows.',
        steps: [
          { name: 'Route documents to one intake folder', text: 'Email saves, portal downloads, scanner output, and receipt photos all land in one monitored folder per client.' },
          { name: 'Build a client Template', text: 'Combine date, vendor, invoice number, and amount Naming Blocks; add a Custom AI Block for expense categories.' },
          { name: 'Review and apply batches', text: 'Preview every proposed name, apply with undo history, and let folder monitoring handle new arrivals.' },
        ],
      },
      faqItems: accountantFaq,
      software: {
        pagePath: '/for-accountants',
        description:
          'AI document renamer for accountants and bookkeepers on Mac and Windows. Zush names invoices, receipts, statements, and scans by vendor, date, number, and amount — unmetered, with preview, undo, and private local modes.',
        applicationSubCategory: 'Accounting Document Management',
        featureList: [
          'Rename invoices, receipts, and statements by content',
          'Read scans and receipt photos with AI vision',
          'Per-client Templates with consistent vendor spellings',
          'Expense categories via Custom AI Blocks',
          'Folder monitoring for continuous client intake',
          'Unmetered paid plans — no per-document credits',
          'Private modes: BYOK and Offline AI',
        ],
      },
    }),
  },
  'for-medical': {
    h1: 'Zush for Medical Practices',
    h1Accent: 'Medical',
    category: 'pdf',
    definitionTitle: 'What Does Zush Do for Records Work?',
    definitionText:
      'Zush reads every scanned record, fax, and intake form — with AI vision, no OCR pass — and names it by identifier, date of service, and record type, keeping patient names out of filenames. In Offline AI mode, files never leave the machine.',
    showcaseSlides: medicalSlides,
    faqItems: medicalFaq,
    relatedPages: [
      { title: 'Rename Scanned Documents', href: '/rename-scanned-documents' },
      { title: 'Medical Records Template Setup', href: '/docs/templates/medical-records' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Privacy & Security Docs', href: '/docs/privacy-security' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Zush for Accountants', href: '/for-accountants' },
    ],
    relatedBlogPosts: [
      { title: 'Medical Records File Naming: HIPAA-Safe Patterns', href: 'medical-records-file-naming-convention' },
      { title: 'Rename Scanned Documents Automatically', href: 'rename-scanned-documents-automatically' },
      { title: 'Local AI File Renaming: Private and Offline', href: 'local-ai-file-renaming-ollama-guide' },
      { title: 'Cloud AI vs Local AI File Renaming', href: 'cloud-vs-local-ai-file-renaming' },
    ],
    contextualGuideLink: {
      before: 'Choosing the naming pattern first? Read',
      label: 'HIPAA-safe medical records file naming',
      href: '/blog/medical-records-file-naming-convention',
      after: 'for the identifier-date-type convention this page automates.',
    },
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Set up private AI renaming for medical records',
        description: 'Use Zush to name scanned records by identifier, date of service, and record type on Mac and Windows — locally.',
        steps: [
          { name: 'Enable Offline AI mode', text: 'Analysis runs on local Ollama models, so supported files are processed entirely on the machine.' },
          { name: 'Build a records Template', text: 'Combine an identifier Custom AI Block (MRN or account number), the date of service, and a record-type vocabulary.' },
          { name: 'Review and monitor', text: 'Preview each batch to confirm no patient names appear, then assign the Template to the scanner folder.' },
        ],
      },
      faqItems: medicalFaq,
      software: {
        pagePath: '/for-medical',
        description:
          'AI document renamer for medical practices on Mac and Windows. Zush names scanned records by identifier, date of service, and record type — with local Offline AI, in-place renaming, and no file uploads.',
        applicationSubCategory: 'Medical Records Management',
        featureList: [
          'Name records by MRN, date of service, and record type',
          'Keep patient names out of filenames',
          'Read scans and faxes with AI vision — no OCR pass',
          'Offline AI mode: files never leave the machine',
          'Preview every batch before applying, with undo',
          'Folder monitoring for scanner and fax folders',
          'In-place renaming — no uploads, no file storage',
        ],
      },
    }),
  },
  'for-legal': {
    h1: 'Zush for Legal Teams',
    h1Accent: 'Legal',
    category: 'pdf',
    definitionTitle: 'What Does Zush Do for Legal Files?',
    definitionText:
      'Zush reads every filing, contract, draft, and scan, extracts the matter number, date, document type, and party, and names the batch to your convention — so a sorted matter folder reads as the case chronology.',
    showcaseSlides: legalSlides,
    faqItems: legalFaq,
    relatedPages: [
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Legal Documents Template Setup', href: '/docs/templates/legal-documents' },
      { title: 'Rename Scanned Documents', href: '/rename-scanned-documents' },
      { title: 'Rename Word Documents with AI', href: '/rename-word-documents-with-ai' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'Custom AI Blocks Docs', href: '/docs/custom-ai-blocks' },
    ],
    relatedBlogPosts: [
      { title: 'Legal File Naming Conventions', href: 'legal-file-naming-conventions' },
      { title: 'Rename Scanned Documents Automatically', href: 'rename-scanned-documents-automatically' },
      { title: 'Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'Cloud AI vs Local AI File Renaming', href: 'cloud-vs-local-ai-file-renaming' },
    ],
    contextualGuideLink: {
      before: 'Defining the firm convention first? Read the',
      label: 'legal file naming conventions guide',
      href: '/blog/legal-file-naming-conventions',
      after: 'for matter-based patterns, versioning rules, and what stays out of filenames.',
    },
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Set up AI document renaming for legal work',
        description: 'Use Zush to keep filings, contracts, and scans named by matter, date, type, and party on Mac and Windows.',
        steps: [
          { name: 'Choose the confidentiality posture', text: 'Offline AI keeps analysis fully local; BYOK routes it through the firm’s own provider account.' },
          { name: 'Build a matter Template', text: 'Combine a matter-number Custom AI Block with date, document-type, and party blocks.' },
          { name: 'Automate intake', text: 'Point folder monitoring at the e-filing download folder and the scanner output, review batches, apply with undo.' },
        ],
      },
      faqItems: legalFaq,
      software: {
        pagePath: '/for-legal',
        description:
          'AI document renamer for law firms and legal teams on Mac and Windows. Zush names filings, contracts, and scans by matter, date, type, and party — with local Offline AI, preview, and undo.',
        applicationSubCategory: 'Legal Document Management',
        featureList: [
          'Name documents by matter number, date, type, and party',
          'Extract firm-specific fields with Custom AI Blocks',
          'Read court filings, drafts (DOCX), and scans alike',
          'Matter folders that sort into case chronologies',
          'Offline AI and BYOK for confidential documents',
          'Folder monitoring for e-filing and scanner intake',
          'Preview every batch before applying, with undo',
        ],
      },
    }),
  },
};
