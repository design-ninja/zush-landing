import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

type SearchLandingSlug =
  | 'batch-rename-files'
  | 'offline-ai-file-renamer'
  | 'ai-file-organizer'
  | 'ai-file-sorter'
  | 'hazel-alternative'
  | 'rename-invoices-with-ai'
  | 'rename-receipts-with-ai'
  | 'rename-scanned-documents'
  | 'for-accountants'
  | 'for-legal';

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
      'Zush supports private modes: BYOK sends analysis through your own provider account, while LM Studio and Ollama keep supported analysis on your device and work offline after setup. Filenames and folder structures always stay local.',
  },  {
    question: 'How do I rename a scanned PDF on Windows?',
    answer:
      'File Explorer only renames one file at a time by hand. In Zush for Windows 10 and 11, add the scanned PDFs or assign a Template to the folder your scanner saves into. Zush reads each page image, proposes a name from the document type, party, and date, and applies it after you review the batch.',
  },
  {
    question: 'How do I rename a scanned PDF on Mac?',
    answer:
      'Finder can rename several files at once, but only by replacing text, adding text, or numbering them; it cannot read what a scan says. Zush on Mac reads each scanned page with AI vision and names it by document type, party, and date, so Scan0001.pdf becomes a name you can search for.',
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
      'Renaming happens in place on your disk. Zush does not store your files. For analysis, choose managed Cloud AI, BYOK through your own provider account, LM Studio or Ollama so supported file analysis stays on the machine.',
  },
  {
    question: 'Does Zush charge per document?',
    answer:
      'No. Paid PRO is unmetered — $10/month or $48 one-time for unlimited renames. There are no per-file credits, so re-running a folder after a convention change costs nothing. The first 50 renames are free to evaluate.',
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
      'Choose the mode that matches your confidentiality policy. LM Studio and Ollama keep supported analysis on the machine, while BYOK routes it through your firm’s provider account. Zush renames files in place and does not store them.',
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
      'Use AI when different files need descriptions drawn from their contents. A file manager or pattern-based tool may be enough when the change is a shared prefix, replacement, or number sequence. Preview the result before applying either method.',
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
    question: 'How can I rename files with AI offline?',
    answer:
      'Use Zush with LM Studio or Ollama on Mac or Windows. Download a compatible vision model, start its local server, select that mode in Zush AI Modes, and test the connection. Add a small batch, review suggested names, and apply the selected changes with Rename History available.',
  },
  {
    question: 'What do I need to download before going offline?',
    answer:
      'Install Zush and LM Studio or Ollama, then download a compatible vision-capable model while online. Check the model requirements for memory and disk space. Load the model and test your actual file types before relying on the setup without internet.',
  },
  {
    question: 'How do I connect Zush to LM Studio or Ollama?',
    answer:
      'Start the model server and open Zush Settings → AI Modes. For LM Studio, the default host is http://127.0.0.1:1234; for Ollama it is http://127.0.0.1:11434. Select an installed vision-capable model and run Test. Keep the endpoint on your own computer for on-device analysis.',
  },
  {
    question: 'Is BYOK an offline AI mode?',
    answer:
      'No. BYOK sends analysis to your selected cloud provider using your own key. LM Studio and Ollama use the model server you configure; the default loopback endpoints keep supported analysis on your computer. A remote server URL is not on-device processing.',
  },
  {
    question: 'Is offline AI file renaming free in Zush?',
    answer:
      'Zush FREE includes 50 renames shared across Cloud AI, BYOK, LM Studio, and Ollama. Switching to a local mode does not reset or remove that limit. PRO removes the app limit; local models use your own hardware.',
  },
  {
    question: 'Does offline AI work equally well for every file type?',
    answer:
      'No. Results and speed depend on the model, available memory, file type, and the content Zush can provide for analysis. Use a vision-capable model for screenshots, scans, and document previews. Verify a small sample of each file type; support in the app does not guarantee identical results across AI modes.',
  },
  {
    question: 'What if the local model is unavailable?',
    answer:
      'Start the local server, load the downloaded vision model, refresh the model list, and run Test again. Zush does not silently switch to cloud analysis while a local mode is selected. Downloads and updates still require internet; local analysis is not a claim that every app service is permanently offline.',
  },
  {
    question: 'Can I undo offline AI renames?',
    answer:
      'Yes. Review suggested names before applying a batch, then use Rename History to inspect original and new filenames and revert an applied batch. Test the recovery workflow on copied files before enabling folder monitoring.',
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
      'An AI file sorter groups files into folders based on content; an AI file renamer gives each file a descriptive name. Zush combines both in one reviewed batch: Auto mode suggests groups, or you can describe your own folder rules in plain language.',
  },
  {
    question: 'Is Zush AI file and folder naming software?',
    answer:
      'Yes. Zush creates content-aware filenames on Mac and Windows. AI folder sorting also suggests folder names and moves files into those groups. Use Auto mode or write a prompt such as “Group invoices by company and receipts by month.” You can reuse suitable existing folders or choose a destination. This does not bulk-rename existing folders.',
  },
  {
    question: 'Can Zush automatically organize my Downloads folder?',
    answer:
      'Yes. Point folder monitoring at Downloads and Zush will name new screenshots, invoices, receipts, and exports by content as they land, using the template you choose. Every change stays in rename history, so you can undo any batch.',
  },
  {
    question: 'Does the AI file organizer work on both Mac and Windows?',
    answer:
      'Yes. Zush has a native Mac app (macOS 15+) and a Windows build in the Microsoft Store. Both support content-aware naming, templates, Naming Blocks, folder monitoring, and undo history. Folder sorting supports automatic grouping or custom instructions and a destination folder.',
  },
  {
    question: 'Is my data private when AI organizes my files?',
    answer:
      'You choose the mode: managed Cloud AI, BYOK with your own provider key, LM Studio or Ollama so supported analysis stays on your device. Files remain on your disk; users can optionally move them into AI-suggested folders.',
  },
];

// Folder paths in `after` show where the file lands inside the chosen destination.
// Nested folders (for example year/month) come from explicit Folder rules.
const fileSorterSlides: FeatureLandingPageProps['showcaseSlides'] = [
  {
    files: [
      { before: 'download (7).pdf', after: 'Invoices/Cloudflare – 2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'IMG_2041.HEIC', after: 'Receipts/Whole Foods – 2026-06-03.heic', type: 'image' },
      { before: 'Screenshot 2026-06-12.png', after: 'Screenshots/Stripe Revenue Dashboard.png', img: '/images/examples/workspace.jpg', type: 'image' },
      { before: 'Scan0001.pdf', after: 'Contracts/Lease Agreement – 12 Main St.pdf', type: 'pdf' },
      { before: 'IMG_5501.MOV', after: 'Videos/Beach Sunset Drone Shot.mov', type: 'video' },
      { before: 'New Recording 14.m4a', after: 'Meetings/Weekly Standup – Q3 Roadmap.m4a', type: 'audio' },
    ],
  },
  {
    files: [
      { before: 'INV-00921.pdf', after: 'Figma/2026-06 – Invoice 00921.pdf', type: 'pdf' },
      { before: 'bill.pdf', after: 'GitHub/2026-06 – Invoice.pdf', type: 'pdf' },
      { before: 'scan_0110.pdf', after: 'Rippling/2026-05 – Payroll Invoice.pdf', type: 'pdf' },
      { before: 'receipt.jpg', after: '2026-06/Uber – Airport Ride.jpg', type: 'image' },
      { before: 'IMG_3020.HEIC', after: '2026-06/Hilton – Lisbon Stay.heic', type: 'image' },
      { before: 'doc.pdf', after: '2026-05/Zoom – Annual Plan.pdf', type: 'pdf' },
    ],
  },
];

const fileSorterFaq = [
  {
    question: 'What is an AI file sorter?',
    answer:
      'An AI file sorter reads what each file contains and moves it into a folder that matches its content, instead of sorting by extension or filename pattern. Zush is an AI file sorter for Mac and Windows: it reads PDFs, scans, photos, screenshots, documents, videos, and audio, suggests folders, and renames each file in the same reviewed batch.',
  },
  {
    question: 'Is Zush the same as the open-source AI File Sorter app?',
    answer:
      'No. AI File Sorter is a separate open-source project for Windows, macOS, and Linux that suggests categories from a whitelist you define. Zush is a different app: it sorts by your own plain-language Folder rules or Auto grouping, renames each file with Templates and Naming Blocks, and can sort new files automatically with Monitor. Both show suggestions for review before files move.',
  },
  {
    question: 'Can I tell Zush how to sort my files in my own words?',
    answer:
      'Yes. Write Folder rules in plain language, up to 2,000 characters, for example “Group invoices by company and receipts by month, name month folders YYYY-MM.” Leave the field empty to use Auto, which groups files by content into a few broad, reusable folders. No conditions, regex, or scripts are needed.',
  },
  {
    question: 'Does Zush sort files into folders that already exist?',
    answer:
      'Yes. With Reuse existing folders turned on, Zush matches files to suitable folders already inside the destination and creates a new folder only when nothing fits. Files that fit no folder are renamed without being grouped.',
  },
  {
    question: 'Can Zush sort new files automatically as they arrive?',
    answer:
      'Yes. Save the destination and Folder rules in a Template and assign it to a monitored folder such as Downloads or a scanner folder. New files directly inside that folder are renamed and sorted, and Monitor keeps reusing the folders it created earlier.',
  },
  {
    question: 'Does AI folder sorting work on Windows?',
    answer:
      'Yes. Zush for Windows 10 and 11 has the same Destination folder, Folder sorting, Reuse existing folders, and Folder rules settings as the Mac app. Templates exported on one platform import on the other; you pick the destination folder again on the new computer.',
  },
  {
    question: 'Can I sort files into folders offline?',
    answer:
      'Yes. With LM Studio or Ollama selected, both file analysis and folder planning run on your computer. Zush does not switch to cloud AI while a local mode is selected. Cloud AI and your own API key (BYOK) are also available.',
  },
  {
    question: 'Is it safe to let AI move my files?',
    answer:
      'Zush shows every proposed filename and folder before anything moves. You can rename a proposed folder, move a file to another group, or turn sorting off for the batch. Test on a small copy of the folder first, and keep sorting off for folders that other apps link to by path.',
  },
  {
    question: 'How much does the AI file sorter cost?',
    answer:
      `Folder sorting is part of Zush. The first ${APP_CONFIG.free_tier_limit} AI renames are free. PRO costs $10 per month or $48 one-time and has no monthly file meter, including with the managed Zush Cloud AI.`,
  },
];

const hazelAlternativeFaq = [
  {
    question: 'Is Zush a replacement for Hazel?',
    answer:
      'Yes for the naming workflow: Zush reads file content, creates descriptive names, monitors folders, and keeps undo history on Mac and Windows. Keep Hazel only as an optional companion when complex conditional moves or shell scripts are mandatory.',
  },
  {
    question: 'Can Zush move files into folders like Hazel?',
    answer:
      'Yes. Turn on folder sorting and describe the grouping in plain language, for example “Sort receipts by month and name folders YYYY-MM.” Zush reads each file, proposes a folder, and moves it after you review the batch. It can reuse folders that already exist and create new ones when nothing fits. Hazel needs a separate rule with conditions for each case.',
  },
  {
    question: 'Can Zush watch folders like Hazel?',
    answer:
      'Yes. Zush has folder monitoring: point it at a folder such as Downloads and new files get content-aware names automatically as they arrive, using the template you choose. If the Template has folder rules, new files are sorted into folders too. Every change stays in rename history, so you can undo any batch.',
  },
  {
    question: 'Does Zush work on Windows? Hazel does not.',
    answer:
      'Yes. Hazel is macOS-only. Zush has a native Mac app and a Windows build in the Microsoft Store, so the same content-aware renaming workflow follows you across both platforms.',
  },
  {
    question: 'When should Hazel be kept as a narrow companion?',
    answer:
      'Keep Hazel when the workflow requires AppleScript, shell scripts, tagging, archiving, or strictly deterministic conditions. For naming and content-based sorting, Zush is the better fit because it understands what files contain, works on Mac and Windows, monitors folders, and keeps recovery history.',
  },
  {
    question: 'Can I use Zush and Hazel together?',
    answer:
      'Yes. Let Zush name and sort files by content, and keep Hazel for scripts, tags, archiving, or cleanup rules that Zush does not perform.',
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
      'You choose the mode. Managed Cloud AI is the default, BYOK uses your own provider key, and LM Studio or Ollama keep supported analysis on your device. Files remain on your disk; users can optionally move them into AI-suggested folders.',
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
      'You choose the mode: managed Cloud AI, BYOK with your own key, LM Studio or Ollama so supported receipt analysis stays on your device. Receipts are renamed in place on your disk.',
  },
];

export const SEARCH_LANDING_PAGES: Record<SearchLandingSlug, FeatureLandingPageProps> = {
  'batch-rename-files': {
    h1: 'Batch Rename Files on Mac & Windows with AI',
    h1Accent: 'Batch Rename Files',
    category: 'general',
    definitionTitle: 'What Is an AI Batch Rename Tool?',
    definitionText:
      'An AI batch rename tool renames many files in one workflow while giving each file a content-aware name. Zush reads screenshots, photos, PDFs, documents, videos, audio, and design files in mixed folders, then lets you review every name before applying changes.',
    showcaseSlides: sharedSlides,
    faqItems: batchRenameFaq,
    comparison: {
      eyebrow: 'Batch rename methods compared',
      title: 'Choose the rename method by what must change',
      intro:
        'Choose content analysis when each file needs its own description. Choose a pattern-based method when the necessary text or numbering rule is already known. Check preview and undo options before applying a large batch.',
      headers: { tool: 'Method', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Finder / File Explorer',
          bestFor: 'Replacing text, adding one prefix, or numbering a selection with the same rule',
          gap: 'It works from the current filename and cannot tell one invoice, screenshot, or photo from another.',
        },
        {
          tool: 'Shortcuts / PowerRename',
          bestFor: 'Repeatable pattern rules, regular expressions, dates, counters, and metadata already present in the file',
          gap: 'The useful naming logic must be known in advance; mixed folders still need to be sorted into predictable groups.',
        },
        {
          tool: 'Scripts and CLI tools',
          bestFor: 'Engineering workflows that need custom logic, metadata extraction, or integration with other automation',
          gap: 'They require maintenance and normally cannot infer a distinct descriptive title from every visual or document.',
        },
        {
          tool: 'Zush',
          bestFor: 'Mixed folders where every file needs its own content-aware name, with preview, templates, and undo',
          gap: 'Content analysis is unnecessary overhead when one simple deterministic rename rule already solves the batch.',
        },
      ],
    },
    relatedPages: [
      { title: 'Batch Rename Docs', href: '/docs/batch-rename-files' },
      { title: 'Templates Guide', href: '/docs/templates' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'AI File Sorter', href: '/ai-file-sorter' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ],
    relatedBlogPosts: [
      { title: 'Rename Files by Content', href: 'rename-files-by-content-guide' },
      { title: 'Mac batch rename methods', href: 'batch-rename-files-on-mac-complete-guide' },
      { title: 'Batch rename files on Windows 11', href: 'batch-rename-files-windows-11' },
      { title: 'Preview and Undo a Batch Rename Safely', href: 'how-to-safely-batch-rename-files' },
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
      page: {
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
    h1: 'Offline AI File Renamer with Zush',
    h1Accent: 'Offline AI',
    category: 'general',
    definitionTitle: 'What Is an Offline AI File Renamer?',
    definitionText:
      'Rename files offline on Mac or Windows with Zush and a local LM Studio or Ollama model. Download and test a vision-capable model first, then preview content-based filenames, apply the batch, and use Rename History to undo changes. Start with 50 free renames shared across all four AI modes.',
    showcaseSlides: sharedSlides,
    faqItems: offlineRenameFaq,
    relatedPages: [
      { title: 'Offline AI Docs', href: '/docs/offline-ai' },
      { title: 'BYOK Docs', href: '/docs/byok' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'AI file renamer for Mac', href: '/mac' },
      { title: 'AI file renamer for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Local AI File Renaming: Private and Offline', href: 'local-ai-file-renaming-ollama-guide' },
      { title: 'Cloud AI vs Local AI File Renaming', href: 'cloud-vs-local-ai-file-renaming' },
      { title: 'BYOK AI File Renaming', href: 'byok-ai-file-renaming-unlimited' },
    ],
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Rename files offline with Zush Local AI',
        description: 'Use Zush as an offline AI file renamer for private local file naming on Mac and Windows.',
        steps: [
          { name: 'Prepare a local model', text: 'Install LM Studio or Ollama and download a compatible vision-capable model while online. Check its memory and disk requirements.' },
          { name: 'Connect and test', text: 'Start the local model server. Choose LM Studio or Ollama in Zush AI Modes, select the installed model on a local endpoint, and run Test.' },
          { name: 'Review and apply names', text: 'Drop files or folders into Zush, review local AI filename suggestions, and apply the batch with undo history available.' },
        ],
      },
      faqItems: offlineRenameFaq,
      page: {
        pagePath: '/offline-ai-file-renamer',
        description:
          'Offline AI file renamer for Mac and Windows with LM Studio or Ollama, plus preview, folder monitoring, templates, Naming Blocks, and undo history.',
        featureList: [
          'Offline AI file renaming with LM Studio or Ollama',
          'Vision-capable local model setup and connection testing',
          'BYOK support for Gemini, OpenRouter, OpenAI, and Claude',
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
    h1: 'AI File Organizer: Name and Sort Files by Content',
    h1Accent: 'Name and Sort Files',
    category: 'general',
    definitionTitle: 'What Is an AI File Organizer?',
    definitionText:
      'Zush is an AI file organizer for Mac and Windows. It reads each file and gives it a searchable name, files it into folders when you turn on AI folder sorting, and keeps Downloads or client folders in order with folder monitoring. Review every batch before applying it; undo restores names and folders.',
    showcaseSlides: sharedSlides,
    faqItems: fileOrganizerFaq,
    comparison: {
      eyebrow: 'AI file organizers compared',
      title: 'The best AI file organizer depends on what decides where a file goes',
      intro:
        `For mixed folders on Mac and Windows, our pick is Zush: it reads ${SUPPORTED_FORMAT_COUNT} formats including scans, video, and audio, gives each file a descriptive name, and sorts it by your plain-language Folder rules or Auto grouping, with a preview before anything moves and undo afterwards. Rule engines fit when the condition is already in the filename or date; Sparkle fits hands-off Mac cleanup. Competitor details were checked on vendor pages on September 27, 2026.`,
      headers: { tool: 'Organizer', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Zush',
          bestFor: 'Naming and sorting mixed files by content in one reviewed batch, with Templates, Naming Blocks, folder monitoring, and local AI on Mac and Windows',
          gap: 'Not a disk cleaner or document-management system; it does not delete duplicates or replace a photo library.',
        },
        {
          tool: 'Sparkle',
          bestFor: 'Hands-off cleanup of Desktop, Downloads, and Documents on a schedule',
          gap: 'Mac only and subscription based; it builds its own library structure rather than a naming convention you control.',
        },
        {
          tool: 'Sortio',
          bestFor: 'A plain-language prompt that renames and routes files on Mac, Windows, and Linux',
          gap: 'Pro is $14.99/month or $99/year with a monthly AI allowance; free plan is a one-time AI trial.',
        },
        {
          tool: 'RenameClick',
          bestFor: 'Folder sets you pick, copy, or create, or matching existing subfolders up to three levels deep',
          gap: 'You maintain the category list rather than describing the grouping; video is not in its format list.',
        },
        {
          tool: 'Hazel, File Juggler, DropIt',
          bestFor: 'Deterministic rules on name, extension, date, or matched text',
          gap: 'Every condition must be written by hand, and none of them understand what a photo, video, or scan shows.',
        },
      ],
    },
    relatedPages: [
      { title: 'AI File Sorter', href: '/ai-file-sorter' },
      { title: 'AI Folder Sorting: Auto and Custom Rules', href: '/docs/folder-sorting' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Templates Guide', href: '/docs/templates' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'AI file renamer for Mac', href: '/mac' },
      { title: 'AI file renamer for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Sort Files into Folders with AI on Mac', href: 'sort-files-into-folders-with-ai-mac' },
      { title: 'Sort Files into Folders with AI on Windows', href: 'sort-files-into-folders-with-ai-windows' },
      { title: 'Best AI File Sorters for Mac and Windows', href: 'best-ai-file-sorters' },
      { title: 'Best AI File Organizers for Windows 11', href: 'best-ai-file-organizers-windows' },
      { title: 'Best AI File Organizers for Mac', href: 'best-ai-file-organizers-mac' },
      { title: 'Best AI Document Organizers', href: 'best-ai-document-organizers' },
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
        description: 'Use Zush to create descriptive, consistent filenames for Mac and Windows folders with optional AI folder sorting.',
        steps: [
          { name: 'Drop a messy folder into Zush', text: 'Add Downloads, a screenshots folder, a client folder, or any mixed batch of files.' },
          { name: 'Pick a naming convention', text: 'Use an AI title or combine dates, clients, categories, counters, and metadata with templates and Naming Blocks.' },
          { name: 'Choose Auto or custom folder rules', text: 'Enable AI folder sorting. Let Auto group files by content, or write plain-language instructions. Choose a destination and optionally reuse suitable existing folders.' },
          { name: 'Review, apply, and automate', text: 'Preview the names and suggested folders before applying the batch. Save the rules in a Template for Monitor to process new files.' },
        ],
      },
      faqItems: fileOrganizerFaq,
      page: {
        pagePath: '/ai-file-organizer',
        description:
          'AI file organizer for Mac and Windows. Zush names files in place by content, keeps folders consistent with templates and Naming Blocks, monitors folders, and supports full undo with optional AI folder sorting.',
        featureList: [
          'AI file organizer for Mac and Windows',
          'Name files by content, not just by pattern',
          'Rename in place or use optional AI folder sorting',
          'Organize screenshots, PDFs, invoices, photos, documents, audio, and videos',
          'Automatic naming for Downloads via folder monitoring',
          'Consistent naming conventions with templates and 145+ Naming Blocks',
          'Preview every filename before applying',
          'Undo and rename history',
        ],
      },
    }),
  },
  'ai-file-sorter': {
    h1: 'AI File Sorter: Sort Files into Folders with Your Own Rules',
    h1Accent: 'Your Own Rules',
    category: 'general',
    definitionTitle: 'What Is an AI File Sorter?',
    definitionText:
      'Zush is an AI file sorter for Mac and Windows. Describe the folders you want in plain language, such as “Group invoices by company and receipts by month,” or let Auto group files by content. Zush reads each file, renames it, and moves it into the right folder after you review the plan.',
    showcaseSlides: fileSorterSlides,
    faqItems: fileSorterFaq,
    comparison: {
      eyebrow: 'File sorters compared',
      title: 'Rules, categories, or a prompt: how file sorters decide',
      intro:
        `Every sorter needs a way to decide where a file goes. Rule engines match names and dates, category sorters pick from a list you maintain, and prompt-based sorters follow instructions you write. Zush follows your prompt, reads ${SUPPORTED_FORMAT_COUNT} formats including video and audio, and renames each file in the same batch. Competitor details were checked on vendor pages on September 27, 2026, and for the open-source AI File Sorter on October 19, 2026.`,
      headers: { tool: 'Sorter', bestFor: 'How it decides', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Zush',
          bestFor: 'Your plain-language Folder rules, or Auto grouping by content. Reads PDFs, scans, photos, screenshots, documents, video, and audio, then renames and sorts in one reviewed batch on Mac and Windows.',
          gap: 'Review ambiguous files before applying. Nested folders, such as year and then month, come from an explicit Folder rule.',
        },
        {
          tool: 'AI File Sorter (open source)',
          bestFor: 'A free AGPL app for Windows, macOS, and Linux that suggests categories, subcategories, and filenames from file content, with built-in local models or your own API key',
          gap: 'You pick from category whitelists rather than writing your own folder rules; there are no naming Templates or folder monitoring, so each run starts with Analyze.',
        },
        {
          tool: 'Sortio',
          bestFor: 'A plain-language prompt that renames and routes files on Mac, Windows, and Linux',
          gap: 'Pro is $14.99/month or $99/year with a monthly AI allowance; free plan is a one-time AI trial.',
        },
        {
          tool: 'RenameClick',
          bestFor: 'Folder sets you pick, copy, or create, or matching existing subfolders up to three levels deep',
          gap: 'You maintain the category list rather than describing the grouping; video is not in its format list.',
        },
        {
          tool: 'Sparkle',
          bestFor: 'Hands-off cleanup of Desktop, Downloads, and Documents on a schedule',
          gap: 'Mac only and subscription based; it builds its own library structure rather than a naming convention you control.',
        },
        {
          tool: 'Hazel, File Juggler, DropIt',
          bestFor: 'Deterministic rules on name, extension, date, or matched text',
          gap: 'Every condition must be written by hand, and none of them understand what a photo, video, or scan shows.',
        },
      ],
    },
    relatedPages: [
      { title: 'AI Folder Sorting Docs', href: '/docs/folder-sorting' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'Hazel Alternative with AI', href: '/hazel-alternative' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Offline AI File Renamer', href: '/offline-ai-file-renamer' },
      { title: 'AI file sorter for Mac', href: '/mac' },
      { title: 'AI file sorter for Windows', href: '/windows' },
    ],
    relatedBlogPosts: [
      { title: 'Best AI File Sorters for Mac and Windows', href: 'best-ai-file-sorters' },
      { title: 'AI Folder Sorting Prompts: 30 Examples', href: 'ai-folder-sorting-prompts' },
      { title: 'Sort Files into Folders with AI on Windows', href: 'sort-files-into-folders-with-ai-windows' },
      { title: 'Sort Files into Folders with AI on Mac', href: 'sort-files-into-folders-with-ai-mac' },
      { title: 'Zush vs Sortio', href: 'zush-vs-sortio' },
      { title: 'Sparkle Alternatives for Mac', href: 'sparkle-alternatives' },
    ],
    contextualGuideLink: {
      before: 'Need a starting point for your own rules? Copy one of the',
      label: '30 folder sorting prompts',
      href: '/blog/ai-folder-sorting-prompts',
      after: ' for invoices, receipts, photos, clients, videos, and Downloads.',
    },
    jsonLd: buildFeaturePageJsonLd({
      howTo: {
        name: 'Sort files into folders with AI',
        description: 'Use Zush on Mac or Windows to sort files into folders by content, following Auto grouping or your own plain-language folder rules.',
        steps: [
          { name: 'Add files and choose a Template', text: 'Open AI Rename, choose a Template for the filenames, and add a folder of mixed files.' },
          { name: 'Pick a destination folder', text: 'Use the folder control below the Naming Blocks to choose where sorted folders are created, or keep the original location.' },
          { name: 'Turn on Sort and write Folder rules', text: 'Enable Sort, then leave Folder rules empty for Auto or describe the grouping, for example “Group invoices by company and receipts by month.”' },
          { name: 'Review names and folders', text: 'Check the proposed filenames and folder groups. Rename a folder or move a file to another group if needed, then apply the batch.' },
          { name: 'Automate new files', text: 'Save the destination and Folder rules in a Template and assign it to a monitored folder such as Downloads.' },
        ],
      },
      faqItems: fileSorterFaq,
      page: {
        pagePath: '/ai-file-sorter',
        description:
          'AI file sorter for Mac and Windows. Zush reads file content, follows Auto grouping or your own plain-language folder rules, renames each file, and moves it into the right folder after review. Works with cloud AI, your own API key, or local AI.',
        featureList: [
          'Sort files into folders by content on Mac and Windows',
          'Plain-language Folder rules up to 2,000 characters, or Auto grouping',
          'Rename and sort files in one reviewed batch',
          'Choose a destination folder and reuse suitable existing folders',
          'Sort PDFs, scans, photos, screenshots, documents, videos, and audio',
          'Automatic sorting of new files with folder monitoring',
          'Local AI folder sorting with LM Studio or Ollama',
          'Templates with folder rules can be exported and imported',
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
      'Hazel is a rule engine for macOS: it watches folders and acts on files based on conditions you write, such as name patterns, dates, or kind. Zush works the other way around — it reads what each file actually contains and suggests a descriptive, searchable name. Zush can also sort files into folders: instead of building conditions, you describe the folders in plain language, such as “Group invoices by company and receipts by month.” Monitor applies the same rules to new files, every batch stays in undo history, and Zush runs on Mac and Windows, while Hazel is macOS-only. Rules ask where a file came from; AI asks what is inside it.',
    showcaseSlides: sharedSlides,
    faqItems: hazelAlternativeFaq,
    directAnswerSection: {
      heading: 'What is the best Hazel alternative?',
      answer:
        'It depends on your platform and on what decides the destination. If the rule is already visible in the filename, extension, or date, a rule engine is enough: File Juggler and DropIt are the closest Hazel equivalents on Windows. If the right name or folder depends on what is inside the file, such as the vendor on an invoice or the subject of a photo, use Zush: it reads the file, names it, and sorts it by plain-language rules on Mac and Windows. Many Mac users keep Hazel for path-based housekeeping and use Zush for naming and content-based sorting.',
      steps: [
        'List the Hazel rules you rely on and mark the ones that only check names, kinds, or dates. Those can stay rule-based.',
        'For folders where you rename or sort by hand after reading the file, add a sample batch to Zush and choose a Template for the filenames.',
        'Turn on Sort and describe the folders, such as “Group invoices by company and receipts by month,” then review the proposed names and folders.',
        'Once the result is reliable, assign the Template to Monitor so new files in that folder are named and sorted as they arrive.',
      ],
    },
    comparison: {
      eyebrow: 'Hazel alternatives compared',
      title: 'Rule engines vs content-aware organizers',
      intro:
        'Hazel and its Windows counterparts act on conditions you write. AI organizers read the file itself. Choose by what has to decide the name or folder. Competitor details were checked on vendor pages on September 27, 2026.',
      headers: { tool: 'Tool', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Hazel',
          bestFor: 'Mac automation built from conditions on name, kind, date, or source, with actions such as move, tag, or run a script',
          gap: 'macOS only; every rule is written by hand, and a condition cannot tell what a photo, scan, or video shows.',
        },
        {
          tool: 'Zush',
          bestFor: 'Naming and sorting by what each file contains, with plain-language Folder rules, Monitor for new files, and undo on Mac and Windows',
          gap: 'Not a general automation engine: no shell-script actions or disk cleanup rules like Hazel.',
        },
        {
          tool: 'File Juggler',
          bestFor: 'Hazel-style rules on Windows, including conditions on text found in PDF, Word, and Excel files',
          gap: 'Windows only; rules match text and metadata rather than understanding photos or video.',
        },
        {
          tool: 'DropIt',
          bestFor: 'Free, open-source sorting on Windows by name, extension, size, or date',
          gap: 'Rules only; it does not read file content or suggest names.',
        },
        {
          tool: 'Sparkle',
          bestFor: 'Hands-off cleanup of Desktop, Downloads, and Documents on a schedule',
          gap: 'Mac only and subscription based; it builds its own library structure rather than a naming convention you control.',
        },
      ],
    },
    relatedPages: [
      { title: 'AI File Sorter', href: '/ai-file-sorter' },
      { title: 'AI File Organizer', href: '/ai-file-organizer' },
      { title: 'AI Folder Sorting: Auto and Custom Rules', href: '/docs/folder-sorting' },
      { title: 'Folder Monitoring Docs', href: '/docs/folder-monitoring' },
      { title: 'Naming Blocks Guide', href: '/docs/naming-blocks' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'AI File Renamer & Organizer', href: '/' },
      { title: 'AI file renamer for Mac', href: '/mac' },
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
          { name: 'Describe the folders', text: 'Turn on Sort and write folder rules in plain language, such as “Group invoices by company and receipts by month,” instead of building Hazel conditions.' },
          { name: 'Review, apply, and monitor', text: 'Preview every name and folder, apply the batch, then enable folder monitoring so new files are named and sorted automatically.' },
        ],
      },
      faqItems: hazelAlternativeFaq,
      page: {
        pagePath: '/hazel-alternative',
        description:
          'Hazel alternative for Mac and Windows that names files by content. Zush reads screenshots, PDFs, photos, and documents, monitors folders, and keeps full undo history.',
        featureList: [
          'Content-aware file naming instead of pattern rules',
          'AI folder sorting with plain-language folder rules instead of conditions',
          'Folder monitoring for automatic renaming and sorting',
          'Works on macOS and Windows, not macOS only',
          'Templates, Naming Blocks, and Custom AI Blocks',
          'Preview every filename before applying',
          'Undo and rename history',
        ],
      },
    }),
  },
  'rename-invoices-with-ai': {
    h1: 'Rename Invoice PDFs with AI',
    h1Accent: 'Rename Invoice PDFs',
    category: 'pdf',
    definitionTitle: 'What Is AI Invoice Renaming?',
    definitionText:
      'Zush reads text and scanned invoice PDFs, extracts fields such as vendor, date, invoice number, and amount, then applies your naming template. For example, "download (7).pdf" can become "2026-07-18 – Cloudflare – INV-1042 – 249 USD.pdf".',
    showcaseSlides: invoiceSlides,
    faqItems: invoiceRenameFaq,
    relatedPages: [
      { title: 'Zush for Accountants and Bookkeepers', href: '/for-accountants' },
      { title: 'AI file renamer for Windows', href: '/windows' },
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
    directAnswerSection: {
      heading: 'How do you automatically rename invoice PDFs?',
      answer:
        'Use Zush to read each invoice, extract the fields your filing system needs, and build the filename from a reusable template. It handles text PDFs and scanned invoices, shows every proposed name before applying, and keeps the batch in rename history.',
      steps: [
        'Add invoice PDFs or point folder monitoring at the folder where new invoices arrive.',
        'Build a template from vendor, date, invoice number, amount, and any custom field you need.',
        'Review the names, apply the batch, and undo it from rename history if the convention needs revision.',
      ],
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
      page: {
        pagePath: '/rename-invoices-with-ai',
        description:
          'AI invoice renamer for Mac and Windows. Zush reads vendor, date, and amount from invoice PDFs, applies your naming convention, and supports scanned invoices, folder monitoring, and undo.',
        featureList: [
          'Rename invoice PDFs by vendor, date, and invoice number',
          'Extract amounts and custom fields with Custom AI Blocks',
          'Read scanned invoices with AI vision',
          'Automatic renaming for Downloads via folder monitoring',
          'Consistent invoice naming conventions with templates',
          'Private modes: BYOK and Local AI',
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
    directAnswerSection: {
      heading: 'How do I rename receipts so they are easy to find at tax time?',
      answer:
        'Use one pattern for every receipt, with the date first: 2026-06-03 – Whole Foods – 84 USD – Meals.jpg sorts by day, shows the store, and makes the amount searchable. Zush reads receipt photos, HEIC images, and PDFs, proposes the date, merchant, total, and an expense category, and waits for your review. Check the purchase date rather than the card posting date, and the total rather than the subtotal or tip line.',
      steps: [
        'Collect a week of receipts in one intake folder, including photos from your phone and PDF receipts from email.',
        'In Zush, build a Template from Detected Date, Vendor, Amount, and a Custom AI Block for the expense category you report on.',
        'Review each suggestion against the receipt. Fix faded or cropped photos by hand, and leave the amount out when it is not readable.',
        'Apply the batch, then assign the Template to folder monitoring so new receipts are named the same way as they arrive.',
      ],
    },
    comparison: {
      eyebrow: 'Receipt filing methods',
      title: 'Which way to file receipts',
      intro: 'Expense apps track spending; a folder of well-named files is the record you keep. Many people use both. Choose by whether you need the file itself to say what it is.',
      headers: { tool: 'Method', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Renaming by hand',
          bestFor: 'A few receipts a month',
          gap: 'Slow and inconsistent once photos, PDFs, and email receipts pile up.',
        },
        {
          tool: 'Expense and accounting apps',
          bestFor: 'Approvals, reimbursement, and syncing totals into bookkeeping',
          gap: 'The original image often stays inside the app with a generic name, so your own folder copy stays hard to search.',
        },
        {
          tool: 'Scanner app naming',
          bestFor: 'Adding a date or counter at the moment of scanning',
          gap: 'Names come from the scan time, not the store or amount on the receipt.',
        },
        {
          tool: 'Zush',
          bestFor: 'A folder of receipt photos and PDFs that each need date, merchant, and amount in the name, with preview, monitoring, and undo',
          gap: 'It names files; it does not submit expenses, check totals, or replace the records your tax rules require you to keep.',
        },
      ],
    },
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
      page: {
        pagePath: '/rename-receipts-with-ai',
        description:
          'AI receipt organizer for Mac and Windows. Zush names receipt photos and PDFs by store, date, and amount, adds tax categories with Custom AI Blocks, and keeps undo history.',
        featureList: [
          'Name receipts by store, date, and amount',
          'Read photo receipts (HEIC, JPG) with AI vision',
          'Add tax or expense categories with Custom AI Blocks',
          'Batch process a backlog of mixed receipts',
          'Private modes: BYOK and Local AI',
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
      { title: 'AI Folder Sorting: Auto and Custom Rules', href: '/docs/folder-sorting' },
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
      page: {
        pagePath: '/rename-scanned-documents',
        description:
          'AI scan renamer for Mac and Windows. Zush reads scanned PDFs with AI vision — no OCR pass needed — and names them by document type, party, and date, with folder monitoring and undo.',
        featureList: [
          'Rename Scan0001.pdf files by what each page actually says',
          'AI vision reads image-only scans without an OCR text layer',
          'Works with ScanSnap, Brother, Epson, Canon, and HP scanner output',
          'Automatic renaming for scanner folders via folder monitoring',
          'Consistent conventions with Templates and Naming Blocks',
          'Private modes: BYOK and Local AI',
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
      { title: 'AI Folder Sorting: Auto and Custom Rules', href: '/docs/folder-sorting' },
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
      page: {
        pagePath: '/for-accountants',
        description:
          'AI document renamer for accountants and bookkeepers on Mac and Windows. Zush names invoices, receipts, statements, and scans by vendor, date, number, and amount — unmetered, with preview, undo, and private local modes.',
        featureList: [
          'Rename invoices, receipts, and statements by content',
          'Read scans and receipt photos with AI vision',
          'Per-client Templates with consistent vendor spellings',
          'Expense categories via Custom AI Blocks',
          'Folder monitoring for continuous client intake',
          'Unmetered paid plans — no per-document credits',
          'Private modes: BYOK and Local AI',
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
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
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
          { name: 'Choose the confidentiality posture', text: 'Local AI keeps supported analysis on the machine; BYOK routes it through the firm’s provider account.' },
          { name: 'Build a matter Template', text: 'Combine a matter-number Custom AI Block with date, document-type, and party blocks.' },
          { name: 'Automate intake', text: 'Point folder monitoring at the e-filing download folder and the scanner output, review batches, apply with undo.' },
        ],
      },
      faqItems: legalFaq,
      page: {
        pagePath: '/for-legal',
        description:
          'AI document renamer for law firms and legal teams on Mac and Windows. Zush names filings, contracts, and scans by matter, date, type, and party, with Local AI, preview, and undo.',
        featureList: [
          'Name documents by matter number, date, type, and party',
          'Extract firm-specific fields with Custom AI Blocks',
          'Read court filings, drafts (DOCX), and scans alike',
          'Matter folders that sort into case chronologies',
          'Local AI and BYOK for confidential documents',
          'Folder monitoring for e-filing and scanner intake',
          'Preview every batch before applying, with undo',
        ],
      },
    }),
  },
};
