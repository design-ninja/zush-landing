export interface RenameTaskExample {
  id: string;
  title: string;
  intro: string;
  before: string;
  after: string;
  evidence: string;
  templateName: string;
  prompt: string;
  limitation: string;
  guideHref: string;
  guideLabel: string;
  macOnly?: boolean;
}

export const RENAME_TASK_EXAMPLES: Record<string, RenameTaskExample> = {
  '/rename-videos-with-ai': {
    id: 'video',
    title: 'Find a screen recording by what it shows',
    intro: 'Turn a generic recording name into a searchable description. Zush renames the file in its current folder; it does not sort or move videos into other folders.',
    before: 'Screen Recording 2026-09-01 at 10.32.14.mov',
    after: 'checkout-payment-error.mov',
    evidence: 'Illustrative example: sampled frames show a checkout screen with a payment error.',
    templateName: 'Screen recording topics',
    prompt: 'Name each video using a short description of the visible task or scene. Use lowercase words separated by hyphens. Use sampled frames and available subtitles; do not invent details that are not present. Avoid generic words such as video, recording, and final. Keep the original file extension.',
    limitation: 'Sampled frames can miss brief events. Subtitles may be absent. Review the suggested topic before applying names, especially for long recordings.',
    guideHref: '/blog/rename-video-files-with-ai',
    guideLabel: 'Video analysis and renaming guide',
  },
  '/rename-audio-with-ai': {
    id: 'audio',
    title: 'Find a meeting recording by its topic',
    intro: 'Replace an anonymous voice memo name with a topic you can search for later. Zush changes filenames in place; it does not move recordings or organize a music library into folders.',
    before: 'voice_memo_042.m4a',
    after: 'website-launch-planning.m4a',
    evidence: 'Illustrative example: transcript context describes a meeting about planning a website launch.',
    templateName: 'Meeting recording topics',
    prompt: 'Name each spoken recording after its main topic using available transcript context or metadata. Use a short lowercase phrase with hyphens. Omit speaker names, client names, and dates unless explicitly present. Do not guess missing information. Keep the original file extension.',
    limitation: 'Sparse metadata, background noise, or incomplete transcript context can produce weak suggestions. Check the recording before accepting an uncertain topic.',
    guideHref: '/blog/rename-audio-files-with-ai',
    guideLabel: 'Audio metadata and transcript guide',
  },
  '/rename-pdf-with-ai': {
    id: 'pdf',
    title: 'Turn a scanned invoice into a searchable filename',
    intro: 'Use the invoice date, supplier, and invoice number instead of the scanner’s counter. Zush renames PDFs in their current folders; it does not move them into supplier or month folders.',
    before: 'Scan0001.pdf',
    after: '2026-09-01_Acme_INV-1042.pdf',
    evidence: 'Illustrative invoice: date 1 September 2026, supplier Acme, invoice number INV-1042.',
    templateName: 'Invoice date, supplier and number',
    prompt: 'Name each invoice using its invoice date in YYYY-MM-DD format, supplier name, and invoice number, separated by underscores. Use the invoice date, not the scan date or due date. Include only fields clearly present in the document. Omit unreadable or missing fields rather than guessing. Keep the original file extension.',
    limitation: 'Scans can contain unreadable numbers or several dates. Verify each field against the PDF. Renaming does not add an OCR text layer or alter the invoice contents.',
    guideHref: '/docs/templates/invoices',
    guideLabel: 'Invoice Template setup',
  },
  '/blog/best-photo-organizing-software-mac': {
    id: 'photo-library',
    title: 'Need better filenames, or a photo library?',
    intro: 'Choose a photo library app for albums, people search, and culling. Use Zush for searchable filenames in Finder: it renames photos in place and does not move them into folders or replace a photo catalog.',
    before: 'IMG_4382.HEIC',
    after: 'golden-retriever-on-beach.HEIC',
    evidence: 'Illustrative example: a photo shows a golden retriever on a beach. Subject-based naming does not require inventing a location or a capture date.',
    templateName: 'Searchable photo subjects',
    prompt: 'Describe the main visible subject and scene in a short lowercase filename with hyphens. Avoid generic words such as image, photo, and picture. Do not guess people’s names, locations, or dates. Keep the original file extension.',
    limitation: 'Work with ordinary photo files or exported copies. Do not rename files inside an Apple Photos library package or a linked editing catalog without checking that app’s workflow.',
    guideHref: '/rename-photos-with-ai',
    guideLabel: 'Photo renaming workflow',
    macOnly: true,
  },
  '/blog/batch-rename-files-on-mac-complete-guide': {
    id: 'mac-batch',
    title: 'One shared prefix, or a different name for every file?',
    intro: 'Finder works for a shared prefix or numbered sequence. Use Zush when each file needs a name based on its contents. Zush renames files in their existing folders; it does not move or sort files between folders.',
    before: 'Screenshot 2026-09-01 at 09.15.00.png',
    after: 'checkout-payment-error.png',
    evidence: 'Illustrative example: the screenshot shows a checkout payment error. A fixed Finder prefix cannot describe each screenshot individually.',
    templateName: 'Mixed-folder descriptions',
    prompt: 'Give each file a short, specific name based on its contents. For screenshots, describe the visible screen and state; for documents, describe the document purpose; for photos, describe the main subject. Use lowercase words separated by hyphens. Omit uncertain details and keep the original file extension.',
    limitation: 'Preview a small batch first. Linked design projects, media catalogs, and code can depend on original filenames. Review duplicates and keep a backup before processing the full folder.',
    guideHref: '/docs/batch-rename-files',
    guideLabel: 'Batch preview and undo steps',
    macOnly: true,
  },
};
