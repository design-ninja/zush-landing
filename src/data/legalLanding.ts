import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

export const LEGAL_PAGE_PATH = '/for-legal';

export const LEGAL_HERO = {
  eyebrow: 'Legal document file renamer',
  titleLead: 'Turn every matter folder into a ',
  titleAccent: 'case chronology',
  subtitle:
    'Zush reads filings, agreements, drafts, and scans, then names each file by matter, date, document type, party, or any field your firm defines. Preview every batch before it changes and undo it anytime.',
  trustLine: [
    'Local Offline AI',
    'Firm-controlled BYOK',
    'Preview and undo every batch',
  ],
} as const;

export type LegalFileType = 'pdf' | 'docx';

export const LEGAL_HERO_FILES = [
  {
    before: 'download (3).pdf',
    after: '2026-0142 – 2026-05-06 – Complaint – SDNY.pdf',
    type: 'pdf' as LegalFileType,
  },
  {
    before: 'ltr_draft_final2.docx',
    after: '2026-0142 – 2026-06-10 – Demand Letter – v03.docx',
    type: 'docx' as LegalFileType,
  },
  {
    before: 'doc (7).pdf',
    after: '2026-0142 – 2026-06-12 – Order – Discovery.pdf',
    type: 'pdf' as LegalFileType,
  },
  {
    before: 'Scan_0048.pdf',
    after: '2026-0142 – 2026-06-13 – Correspondence – Counsel.pdf',
    type: 'pdf' as LegalFileType,
  },
] as const;

export const LEGAL_AUDIENCES = [
  {
    label: 'Litigation teams',
    title: 'A folder that reads in procedural order',
    description:
      'E-filing downloads, correspondence, orders, exhibits, and scanner output share one matter-first convention, so sorting by name reveals the sequence of the case.',
    example: '2026-0142 – 2026-06-12 – Order – Discovery.pdf',
  },
  {
    label: 'Transactional practices',
    title: 'Drafts and executed copies stay distinct',
    description:
      'Name agreements by client, agreement type, counterparty, status, and version without asking every author to type the same pattern by hand.',
    example: 'Northwind – NDA – Meridian – Executed – 2026-06-01.pdf',
  },
  {
    label: 'Legal operations',
    title: 'One convention across every intake channel',
    description:
      'Apply reusable Templates to email saves, download folders, shared drives, and scanner output while keeping preview and undo in the workflow.',
    example: '2026-0158 – 2026-06-09 – Filing Receipt – SDNY.pdf',
  },
] as const;

export interface LegalField {
  id: string;
  label: string;
  example: string;
}

export const LEGAL_FIELDS: LegalField[] = [
  { id: 'matter', label: 'Matter number', example: '2026-0142' },
  { id: 'date', label: 'Document date', example: '2026-06-12' },
  { id: 'type', label: 'Document type', example: 'Order' },
  { id: 'subject', label: 'Subject', example: 'Discovery' },
  { id: 'party', label: 'Party', example: 'Meridian LLC' },
  { id: 'status', label: 'Status', example: 'Executed' },
  { id: 'version', label: 'Version', example: 'v03' },
  { id: 'court', label: 'Court / venue', example: 'SDNY' },
];

export const LEGAL_PRIVACY_MODES = [
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Offline AI with local models',
    badge: 'For confidential work',
    badgeTone: 'success' as const,
    description:
      'Analyze supported documents with local Ollama models on the Mac or Windows PC where they are stored. File content is not sent to Zush or an AI provider.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Firm-controlled BYOK',
    badge: 'Your provider account',
    description:
      'Use the AI provider account, key, and model your firm controls. The key stays in secure local storage and your team chooses the provider used for analysis.',
  },
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Managed Cloud AI',
    badge: 'Fastest setup',
    description:
      'Use the managed service for general documents when it matches your firm’s policy. Files are renamed in place and are not stored by Zush.',
  },
] as const;

export const LEGAL_WORKFLOW = [
  {
    label: 'Template',
    title: 'Define the firm convention once',
    description:
      'Combine matter number, date, document type, party, status, and Custom AI Blocks in the order your team already uses.',
  },
  {
    label: 'Review',
    title: 'Read every proposed filename',
    description:
      'Zush shows the full batch before applying it. Regenerate a weak result, edit one name, or stop the run without changing the source files.',
  },
  {
    label: 'Monitor',
    title: 'Keep intake folders organized',
    description:
      'Assign the Template to e-filing downloads or scanner output, then let the same convention handle new arrivals with rename history and undo.',
  },
] as const;

export const LEGAL_DOCUMENT_TYPES = [
  {
    title: 'Court filings',
    description: 'Complaints, answers, motions, orders, notices, and e-filing receipts.',
    example: '2026-0142 – 2026-05-29 – Answer – Meridian LLC.pdf',
  },
  {
    title: 'Contracts and agreements',
    description: 'Drafts, redlines, clean copies, and executed agreements across matters.',
    example: 'Northwind – NDA – Meridian – Executed – 2026-06-01.pdf',
  },
  {
    title: 'Correspondence',
    description: 'Demand letters, client letters, and communications with opposing counsel.',
    example: '2026-0142 – 2026-06-10 – Demand Letter – v03.docx',
  },
  {
    title: 'Discovery and exhibits',
    description: 'Productions, responses, exhibit sets, deposition materials, and evidence scans.',
    example: '2026-0158 – 2026-06-11 – Exhibit B – Invoice Set.pdf',
  },
  {
    title: 'Internal work product',
    description: 'Research, interview notes, strategy memos, and deposition preparation.',
    example: '2026-0142 – 2026-06-12 – Memo – Deposition Prep.docx',
  },
  {
    title: 'Scanner output',
    description: 'Image-only PDFs and paper correspondence with no useful source filename.',
    example: '2026-0158 – 2026-06-13 – Correspondence – Counsel.pdf',
  },
] as const;

export const LEGAL_FAQ = [
  {
    question: 'How does Zush name legal documents?',
    answer:
      'Zush reads each filing, contract, draft, or scan and extracts the fields your Template asks for — such as matter number, document date, document type, party, status, or version. It then proposes a complete filename for review before anything changes.',
  },
  {
    question: 'Can legal documents be processed without leaving the machine?',
    answer:
      'Yes. Offline AI uses supported local Ollama models on Mac or Windows, so document analysis stays on that machine. BYOK is also available when your firm prefers to route analysis through its own AI provider account and key.',
  },
  {
    question: 'Does Zush store client files?',
    answer:
      'No. Zush renames files in place and does not store them. The AI processing path depends on the mode you choose: managed Cloud AI, firm-controlled BYOK, or local Offline AI.',
  },
  {
    question: 'Can it extract our matter numbers?',
    answer:
      'Yes. A Custom AI Block is a reusable plain-language extraction rule, such as “the matter number, formatted YYYY-NNNN.” Put that block anywhere in a Template alongside date, document type, party, or other fields.',
  },
  {
    question: 'What about court filings and scanner output?',
    answer:
      'Zush handles both e-filing downloads and image-only scanner PDFs. Folder monitoring can watch those intake folders, while AI vision reads scanned pages without a separate OCR workflow.',
  },
  {
    question: 'Does Zush handle Word documents and drafts, not just PDFs?',
    answer:
      'Yes. Zush reads DOCX and other supported Office and iWork formats as well as PDFs and scans, so drafts can use the same matter, date, document-type, status, and version convention as filed documents.',
  },
  {
    question: 'Can a batch be reviewed or reversed?',
    answer:
      'Yes. Every proposed filename is shown before applying. Rename history can undo an applied batch, which makes it safe to refine a Template and run the copied test folder again.',
  },
];

export const LEGAL_JSON_LD = buildFeaturePageJsonLd({
  howTo: {
    name: 'Set up AI document renaming for legal work',
    description:
      'Use Zush to keep filings, contracts, drafts, and scans named by matter, date, type, and party on Mac and Windows.',
    steps: [
      {
        name: 'Choose the processing mode',
        text: 'Use local Offline AI, firm-controlled BYOK, or managed Cloud AI according to the policy that applies to the documents.',
      },
      {
        name: 'Build a matter Template',
        text: 'Combine matter number, date, document type, party, status, version, and any firm-specific Custom AI Blocks.',
      },
      {
        name: 'Review and monitor intake',
        text: 'Preview every proposed filename, apply with undo history, and assign the Template to e-filing or scanner folders.',
      },
    ],
  },
  faqItems: LEGAL_FAQ,
  software: {
    pagePath: LEGAL_PAGE_PATH,
    description:
      'AI document renamer for law firms and legal teams on Mac and Windows. Zush names filings, contracts, drafts, and scans by matter, date, type, party, and firm-specific fields.',
    applicationSubCategory: 'Legal Document Management',
    featureList: [
      'Name legal documents by matter, date, type, party, status, and version',
      'Extract firm-specific fields with Custom AI Blocks',
      'Read PDFs, Word documents, and image-only scans',
      'Offline AI mode with local Ollama models',
      'BYOK through a provider account controlled by the firm',
      'Preview every batch before applying, with undo history',
      'Folder monitoring for e-filing downloads and scanner output',
    ],
  },
});
