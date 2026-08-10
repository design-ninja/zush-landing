import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

export const LEGAL_PAGE_PATH = '/for-legal';
export const LEGAL_PAGE_TITLE = 'Legal Document Management with Offline AI File Renaming';

export const LEGAL_HERO = {
  eyebrow: 'For law firms and legal teams',
  titleLead: 'Rename legal documents by ',
  titleAccent: 'matter, date, and type',
  subtitle:
    'Zush reads pleadings, contracts, correspondence, discovery, and scans, then gives them consistent, searchable filenames. Use it with existing folders, shared drives, and DMS exports on Mac or Windows.',
  trustLine: [
    'Works with your existing folders',
    'Offline AI for confidential files',
    'Preview before every rename',
  ],
  photo: {
    alt: 'A young attorney reviewing case documents at a desktop computer in her office',
  },
} as const;

export interface LegalField {
  label: string;
  before: string;
  after: string;
  emphasis?: string;
}

export const LEGAL_FIELDS: LegalField[] = [
  { label: 'Matter number', before: 'document (7).pdf', after: '2026-0142 – 2026-06-12 – Discovery Order', emphasis: '2026-0142' },
  { label: 'Document date', before: 'scan_0048.pdf', after: '2026-0142 – 2026-06-13 – Counsel Letter', emphasis: '2026-06-13' },
  { label: 'Document type', before: 'download (3).pdf', after: '2026-0142 – 2026-05-06 – Complaint', emphasis: 'Complaint' },
  { label: 'Client', before: 'signed_final.pdf', after: 'Northwind – 2026-06-01 – NDA – Executed', emphasis: 'Northwind' },
  { label: 'Party / Counterparty', before: 'contract_v2.docx', after: 'Northwind – NDA – Meridian – Draft v02', emphasis: 'Meridian' },
  { label: 'Court / Venue', before: 'efile.pdf', after: '2026-0142 – 2026-05-29 – Answer – SDNY', emphasis: 'SDNY' },
  { label: 'Status', before: 'agreement.pdf', after: 'Northwind – Services Agreement – Executed', emphasis: 'Executed' },
  { label: 'Version', before: 'ltr_draft_final2.docx', after: '2026-0142 – Demand Letter – v03', emphasis: 'v03' },
  { label: 'Author / Counsel', before: 'correspondence.pdf', after: '2026-0142 – 2026-06-13 – Letter – J. Chen', emphasis: 'J. Chen' },
  { label: 'Custom field — describe it in plain language', before: 'Scan0091.pdf', after: '2026-0158 – Exhibit B – Invoice Set', emphasis: 'Exhibit B' },
];

export interface LegalPrivacyMode {
  id: 'cloud' | 'byok' | 'offline';
  kind: 'cloud-ai' | 'byok' | 'offline-ai';
  title: string;
  badge?: string;
  badgeTone?: 'success';
  description: string;
}

export const LEGAL_PRIVACY_MODES: LegalPrivacyMode[] = [
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Offline AI with local models',
    badge: 'Keep files on the machine',
    badgeTone: 'success',
    description:
      'Organize supported case files with local Ollama models on the Mac or Windows PC where they are stored. Document content is not sent to Zush or an AI provider.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Use your firm’s AI account',
    badge: 'BYOK',
    description:
      'Connect the AI provider account and model approved by your firm. The API key stays in secure local storage, while the provider processes the documents you choose.',
  },
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Start with managed AI',
    badge: 'Fastest setup',
    description:
      'Use Zush-managed AI for non-confidential documents and quick evaluation. Choose Offline AI or BYOK when client files require a different processing policy.',
  },
];

export const LEGAL_PRIVACY_NOTE =
  'Zush never becomes the repository for your case files: it renames documents in place and does not store them. Your firm chooses how document content is processed for each workflow.';

export const LEGAL_WORKFLOW = [
  {
    title: 'Define the matter naming rule',
    description:
      'Build a Template from the client or matter number, document date, type, party, status, version, and any field your practice uses.',
  },
  {
    title: 'Run it on intake or an archive',
    description:
      'Organize a copied case folder, downloaded filings, scanner output, or a DMS export without moving the documents into a new platform.',
  },
  {
    title: 'Approve the matter-ready filenames',
    description:
      'Review the whole batch, correct exceptions, and apply it with rename history. Then monitor recurring intake folders with the same rule.',
  },
];

export const LEGAL_DOCUMENT_TYPES = [
  {
    title: 'Court filings',
    description:
      'Name complaints, answers, motions, orders, notices, and e-filing receipts by matter, date, document type, and venue.',
    example: '2026-0142 – 2026-05-29 – Answer – SDNY.pdf',
  },
  {
    title: 'Contracts and agreements',
    description:
      'Keep drafts, redlines, clean copies, and executed agreements distinct across clients and counterparties.',
    example: 'Northwind – NDA – Meridian – Executed – 2026-06-01.pdf',
  },
  {
    title: 'Correspondence',
    description:
      'Organize demand letters, client letters, and communications with opposing counsel in chronological order.',
    example: '2026-0142 – 2026-06-10 – Demand Letter – v03.docx',
  },
  {
    title: 'Discovery and exhibits',
    description:
      'Name productions, responses, exhibit sets, deposition materials, and evidence scans by matter-specific fields.',
    example: '2026-0158 – 2026-06-11 – Exhibit B – Invoice Set.pdf',
  },
  {
    title: 'Internal work product',
    description:
      'Apply the same convention to research, interview notes, strategy memos, and deposition preparation files.',
    example: '2026-0142 – 2026-06-12 – Memo – Deposition Prep.docx',
  },
  {
    title: 'Scanner output',
    description:
      'Turn image-only PDFs and paper correspondence with generic source names into searchable matter files.',
    example: '2026-0158 – 2026-06-13 – Correspondence – Counsel.pdf',
  },
];

export interface LegalAudience {
  title: string;
  description: string;
  icon: 'attorney' | 'paralegal' | 'operations';
}

export const LEGAL_AUDIENCES: LegalAudience[] = [
  {
    title: 'Small firms working from shared folders',
    description:
      'Keep case files understandable across Finder, File Explorer, OneDrive, Dropbox, or a network drive without buying another document repository.',
    icon: 'attorney',
  },
  {
    title: 'Litigation and paralegal teams',
    description:
      'Turn downloaded pleadings, productions, exhibits, correspondence, and scanner output into a chronological matter folder before filing or review.',
    icon: 'paralegal',
  },
  {
    title: 'Legal ops and DMS administrators',
    description:
      'Standardize filenames at intake, migration, and export so documents keep their context when they move between systems or leave the DMS.',
    icon: 'operations',
  },
];

export const LEGAL_ORGANIZATION_OUTCOMES = [
  {
    title: 'Find the right document before opening it',
    description:
      'Matter number, document type, party, and status turn a folder listing into a useful index instead of a wall of downloads and scan numbers.',
  },
  {
    title: 'Read the case chronology at a glance',
    description:
      'Put the document date in a consistent ISO format and the matter folder sorts into a timeline of filings, letters, agreements, and events.',
  },
  {
    title: 'Preserve context outside the DMS',
    description:
      'Self-describing filenames remain useful in email attachments, client exports, shared drives, discovery sets, and closed-matter archives.',
  },
];

export const LEGAL_FAQ = [
  {
    question: 'What is the best way to organize legal documents?',
    answer:
      'Organize documents by client and matter, then use a consistent filename built from the matter number, document date, document type, party, and version or status. This makes each folder searchable and chronological while keeping the convention portable across shared drives, exports, and document management systems.',
  },
  {
    question: 'Can AI organize legal documents automatically?',
    answer:
      'Yes. Zush reads the contents of PDFs, Word documents, and scans, extracts the fields defined in your Template, and proposes consistent filenames for the batch. A person reviews the results before any filenames change.',
  },
  {
    question: 'Does Zush replace legal document management software?',
    answer:
      'No. Zush is an organization layer for the documents around your DMS: intake folders, shared drives, downloaded filings, scanner output, migration batches, and exports. It renames files in place and does not provide document storage, access control, legal research, or matter management.',
  },
  {
    question: 'Can Zush organize confidential case files without uploading them?',
    answer:
      'Yes. In Offline AI mode, supported files are analyzed with local Ollama models on Mac or Windows, so document content stays on that machine. Zush renames files in place and does not store them.',
  },
  {
    question: 'How can a law firm organize old case files?',
    answer:
      'Start with a copied closed-matter folder, define a Template for the fields already present in those documents, and preview the proposed names in batches. Once the rule is reliable, apply it to the archive with rename history available for undo.',
  },
  {
    question: 'Can Zush extract matter numbers from legal documents?',
    answer:
      'Yes. Add a Custom AI Block that describes the matter or case number and its required format. The block can appear alongside document date, type, party, venue, status, version, or other firm-specific fields in the naming Template.',
  },
  {
    question: 'Does it organize court filings and scanned legal documents?',
    answer:
      'Yes. Zush can read e-filing PDFs and image-only scanner output with AI vision, without a separate OCR step. Folder monitoring can watch the locations where those documents arrive.',
  },
  {
    question: 'Can it distinguish drafts, redlines, and executed copies?',
    answer:
      'Yes. Include status and version fields in a transactional Template so each proposed filename identifies whether the document is a draft, redline, clean copy, or executed agreement.',
  },
];

export const LEGAL_JSON_LD = buildFeaturePageJsonLd({
  howTo: {
    name: 'How to organize legal documents automatically with AI',
    description:
      'Use Zush to organize pleadings, agreements, correspondence, discovery, and scans into searchable, matter-based case files.',
    steps: [
      {
        name: 'Define the matter naming convention',
        text: 'Choose the matter number, date, document type, party, status, version, and firm-specific fields that make each file identifiable.',
      },
      {
        name: 'Organize an intake or archive folder',
        text: 'Run the Template on a copied case folder, downloaded filings, scanner output, shared drive, or document management system export.',
      },
      {
        name: 'Review and apply the filenames',
        text: 'Check the proposed batch, correct exceptions, apply it with undo history, and reuse the same Template for recurring intake.',
      },
    ],
  },
  faqItems: LEGAL_FAQ,
  software: {
    pagePath: LEGAL_PAGE_PATH,
    description:
      'AI legal document renamer and organizer for law firms on Mac and Windows. Zush turns inconsistent filenames into searchable, matter-based case files without replacing the firm’s document management system.',
    applicationSubCategory: 'Legal File Organization Software',
    featureList: [
      'Organize legal documents into searchable, matter-based case files',
      'Standardize filenames across folders, shared drives, and DMS exports',
      'Extract firm-specific fields with Custom AI Blocks',
      'Read PDFs, Word documents, and image-only scans',
      'Offline AI mode with local Ollama models',
      'BYOK through a provider account controlled by the firm',
      'Preview every batch before applying, with undo history',
    ],
  },
});
