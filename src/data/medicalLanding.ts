import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

// English-only landing data for /for-medical. The page is not in
// LOCALIZED_ROUTES, so copy lives here rather than in src/i18n/copy.ts.
//
// This is the primary search landing for medical workflows. Privacy messaging
// stays grounded in product mechanics: Local AI runs supported Ollama models,
// BYOK uses an account and key controlled by the organization, and every rename
// is previewed before it is applied in place.

export const MEDICAL_PAGE_PATH = '/for-medical';
export const MEDICAL_PAGE_TITLE = 'Healthcare Document Management with Offline AI File Renaming';

export const MEDICAL_HERO = {
  eyebrow: 'Healthcare document management for medical practices',
  titleLead: 'Rename healthcare documents by ',
  titleAccent: 'MRN, date, and type',
  subtitle:
    'Zush handles the filename layer of healthcare document management: it renames scanned medical records, faxes, lab reports, and intake forms using the fields your practice chooses. It works alongside your EHR with Local AI or organization-controlled BYOK, plus batch preview and undo.',
  secondaryCta: {
    label: 'See how a practice sets it up',
    href: '#workflow',
  },
  trustLine: [
    'Local AI with Ollama',
    'Organization-controlled BYOK',
    'Preview and undo every batch',
  ],
  // Imported as an astro:assets module in MedicalHero; only the alt text lives
  // here.
  photo: {
    alt: 'A physician using a desktop computer to organize scanned medical records',
  },
} as const;

// Header copy for the Remotion demo section (MedicalRecordsAnimation defines
// its own file rows). Every generated name in the demo is identifier-based;
// see house rule 1 at the top.
export const MEDICAL_DEMO = {
  title: 'Watch patient scans name themselves',
  titleAccent: 'name themselves',
  description:
    'Real scanner output on the left, the names Zush proposes on the right — every batch is reviewed before anything is applied.',
} as const;

export interface MedicalField {
  label: string;
  /** The scanner default the interactive demo starts from. */
  before: string;
  /** The proposed filename the demo reveals. */
  after: string;
  /** Substring of `after` to highlight (fields that land in the name). */
  emphasis?: string;
}

// `after` values are kept short enough to sit on one line in the demo card.
export const MEDICAL_FIELDS: MedicalField[] = [
  { label: 'MRN / Patient ID', before: 'Scan0001.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results', emphasis: 'MRN-48211' },
  { label: 'Date of service', before: 'Scan0002.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results', emphasis: '2026-06-12' },
  { label: 'Record type', before: 'fax_received.pdf', after: 'MRN-30177 – 2026-05-30 – Chest X-Ray', emphasis: 'Chest X-Ray' },
  { label: 'Referring provider', before: 'referral.pdf', after: 'MRN-30177 – 2026-06-02 – Dr Chen', emphasis: 'Dr Chen' },
  { label: 'Specialty', before: 'consult_note.pdf', after: 'MRN-30177 – 2026-06-02 – Cardiology', emphasis: 'Cardiology' },
  { label: 'Payer / Insurance', before: 'eob.pdf', after: 'ACC-2210 – 2026-06-04 – Blue Cross', emphasis: 'Blue Cross' },
  { label: 'Claim #', before: 'Scan_0052.pdf', after: 'ACC-2210 – 2026-06-04 – Claim 88213', emphasis: 'Claim 88213' },
  { label: 'Amount', before: 'statement.pdf', after: 'ACC-2210 – 2026-06-04 – Aetna $1,240', emphasis: '$1,240' },
  { label: 'Procedure code', before: 'procedure.pdf', after: 'MRN-51402 – 2026-06-05 – CPT 93000', emphasis: 'CPT 93000' },
  { label: 'Document date', before: 'outside_records.pdf', after: 'MRN-51402 – 2026-06-05 – Outside Records', emphasis: '2026-06-05' },
  { label: 'Custom field — describe it in plain language', before: 'doc_20260608.pdf', after: 'MRN-51402 – 2026-06-05 – Consent Form', emphasis: 'Consent Form' },
];

export const MEDICAL_FIELDS_FOOTNOTE =
  'Custom AI Blocks can extract any field you describe — “the ordering physician”, “the procedure code”, or “the signed date”. Your Template decides which fields become part of the filename.';

export const MEDICAL_FILENAME_PATTERN = '{Internal ID} – {Date of service} – {Document type}';

// Identifier-based only. Carried over from the medicalSlides pairs that used to
// live in searchLandingPages.ts.
export const MEDICAL_FILENAME_EXAMPLES = [
  { before: 'Scan0001.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results.pdf' },
  { before: 'fax_received.pdf', after: 'MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf' },
  { before: 'Scanned Document 4.pdf', after: 'MRN-51402 – 2026-06-05 – Intake Form.pdf' },
];

// The three run modes, with the medical-first recommendations shown before the
// managed cloud option. Each mode is paired with the matching homepage demo.
export interface MedicalPrivacyMode {
  id: 'cloud' | 'byok' | 'offline';
  kind: 'cloud-ai' | 'byok' | 'offline-ai';
  title: string;
  badge?: string;
  badgeTone?: 'success';
  description: string;
}

export const MEDICAL_PRIVACY_MODES: MedicalPrivacyMode[] = [
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Local AI with Ollama',
    badge: 'Recommended for records',
    badgeTone: 'success',
    description:
      'Local Ollama models analyze supported scans and documents on the Mac or Windows PC where they are stored. File content is not sent to Zush or a third-party AI provider.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Organization-controlled BYOK',
    badge: 'Your provider account',
    description:
      'Route analysis through the AI provider account and API key your organization controls. The key stays in secure local storage, and your team chooses the provider and model used for the workflow.',
  },
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Managed Cloud AI',
    badge: 'For general files',
    description:
      'Managed cloud processing is available for ordinary files. For medical document workflows, use Local AI or your organization’s BYOK setup according to the policy your team follows.',
  },
];

export const MEDICAL_PRIVACY_NOTE =
  'Use Local AI when document content must stay on the machine and work offline after setup. Use BYOK when your organization routes analysis through its own provider account and key. In every mode, Zush renames files in place and does not store them.';

export const MEDICAL_WORKFLOW = [
  {
    title: 'Point Zush at the scan folder',
    description:
      'Folder monitoring watches whatever your scanner or fax software writes into — the intake folder, the shared drive, the fax spool.',
  },
  {
    title: 'Review the proposed names',
    description:
      'The preview is a control, not a formality: read the batch, confirm only approved fields appear in each filename, and regenerate anything that looks wrong.',
  },
  {
    title: 'Apply with undo',
    description:
      'Rename history reverts any batch. A convention change is a re-run, not a cleanup project.',
  },
];

export interface MedicalDocumentType {
  title: string;
  description: string;
  example: string;
}

export const MEDICAL_DOCUMENT_TYPES: MedicalDocumentType[] = [
  {
    title: 'Scanned patient records',
    description:
      'Turn scanner output and archive exports into consistent filenames built from an internal ID, service date, and document type.',
    example: 'MRN-48211 – 2026-06-12 – Progress Note.pdf',
  },
  {
    title: 'Lab reports',
    description:
      'Read image-only lab PDFs and name them by the identifier, date of service, and report type without a separate OCR workflow.',
    example: 'MRN-48211 – 2026-06-12 – Lab Results.pdf',
  },
  {
    title: 'Referrals and faxed documents',
    description:
      'Identify incoming referrals, consultation letters, and faxed records, then apply the same naming pattern used by the rest of the practice.',
    example: 'MRN-30177 – 2026-06-02 – Referral – Cardiology.pdf',
  },
  {
    title: 'Intake and consent forms',
    description:
      'Extract the form type and signed date from front-desk scans so every intake batch follows one reusable Template.',
    example: 'MRN-51402 – 2026-06-05 – Consent Form.pdf',
  },
  {
    title: 'Imaging and consult reports',
    description:
      'Name imaging reports, specialist notes, and outside records by the fields your team uses to retrieve them later.',
    example: 'MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf',
  },
  {
    title: 'EOBs, ERAs, and claim correspondence',
    description:
      'Use a separate billing Template for payer documents, account references, remittances, and claim correspondence.',
    example: 'ACC-2210 – 2026-06-04 – ERA – Aetna.pdf',
  },
];

export interface MedicalAudience {
  title: string;
  description: string;
  example: { before: string; after: string };
  icon: 'clinic' | 'frontdesk' | 'billing';
  href?: string;
  linkLabel?: string;
}

export const MEDICAL_AUDIENCES: MedicalAudience[] = [
  {
    title: 'Solo practice & clinic owners',
    description:
      'The day’s intake pile becomes a filed set of records overnight — named by MRN, date of service, and record type, without anyone typing.',
    example: { before: 'Scan0002.pdf', after: 'MRN-48211 – 2026-06-12 – Referral – Cardiology.pdf' },
    icon: 'clinic',
  },
  {
    title: 'Practice managers & front desk',
    description:
      'One convention across every person who scans, with no training session. The Template holds the rule; staff just drop files in.',
    example: { before: 'doc_20260608.pdf', after: 'MRN-51402 – 2026-06-08 – Consent – Procedure.pdf' },
    icon: 'frontdesk',
  },
  {
    title: 'Medical billing',
    description:
      'EOBs, ERAs, and claim correspondence named by account number and payer, so matching a remittance to a claim stops being a hunt.',
    example: { before: 'Scan_0052.pdf', after: 'ACC-2210 – 2026-06-04 – ERA – Aetna.pdf' },
    icon: 'billing',
    href: '/for-accountants',
    linkLabel: 'Also handling the practice books? See Zush for accountants',
  },
];

export const MEDICAL_TESTIMONIALS = [
  {
    name: 'Dr. Amir Khan',
    role: 'Clinic owner',
    quote:
      'I keep a separate de-identified archive for follow-up notes. With Offline AI, Zush can name scans by visit date and record type. It is not something I run blindly, but it cuts the typing way down.',
  },
  {
    name: 'Renata Alves',
    role: 'Practice manager',
    quote:
      'Front desk scans everything into one folder and by evening it used to be four hundred files called Scan-something. Now it comes out named by MRN and date. I still read the preview list before applying — that is the part that makes me comfortable with it.',
  },
  {
    name: 'Dana Whitfield',
    role: 'Medical biller',
    quote:
      'Matching remittances to claims was the worst hour of my week. Naming the EOBs by account number and payer did most of it. A couple of scans come back generic and I fix those by hand.',
  },
];

export const MEDICAL_PRICING_PREFACE =
  'One license, unmetered. No per-document credits — re-run a folder after a template change for free.';

export const MEDICAL_FAQ = [
  {
    question: 'Is Zush HIPAA compliant?',
    answer:
      'Zush does not claim that the app by itself makes a workflow HIPAA compliant. Local AI keeps supported file analysis on the workstation and works offline after setup, but compliance also depends on device security, access controls, backups, retention, filename policy, and your organization’s procedures. Have your privacy or security lead review the complete workflow before processing protected health information.',
  },
  {
    question: 'Can Zush rename patient records without uploading them anywhere?',
    answer:
      'Yes. In Local AI mode, Zush analyzes supported files with Ollama models on Mac or Windows and works offline after setup. Records are read and renamed entirely on the machine. File content is not sent to Zush or a third-party AI provider, and Zush does not store the files.',
  },
  {
    question: 'How should a practice structure medical record filenames?',
    answer:
      'A practical starting pattern is internal ID, date of service, and document type. Your organization decides the exact naming policy, and a Zush Template applies it consistently. Keep details that do not need to appear in a folder listing inside the document, and review the proposed batch before applying it.',
  },
  {
    question: 'Does it handle scanned records and faxes?',
    answer:
      'Yes. Most records enter as scanner or fax output with no text layer. Zush reads the page image with AI vision — no separate OCR pass — and extracts the identifier, date of service, and record type from what is printed on the page.',
  },
  {
    question: 'Can Zush read handwriting or poor-quality scans?',
    answer:
      'Typical office scans — printed lab reports, faxed referrals, forms with handwritten fields — are read reliably. Dense handwritten notes and badly skewed or faint pages are not: those come back with a generic name instead of a wrong one, and the preview is where you catch them before anything is applied.',
  },
  {
    question: 'Does Zush replace healthcare document management software or our EHR?',
    answer:
      'No. Zush handles the filename layer around an EHR or document management system — scanner and fax output, exported records, attachments waiting to be imported, and archive folders. It does not connect to, read from, or modify the EHR itself. If a document lives inside the EHR, Zush is not involved; if it lives in a folder, Zush can name it.',
  },
  {
    question: 'Which AI mode should a medical practice use?',
    answer:
      'Use Local AI when supported document analysis must remain on the machine; it runs Ollama models on Mac or Windows and works offline after setup. Use BYOK when your organization wants analysis routed through its own AI provider account and API key. Your team chooses the mode that matches its internal policy.',
  },
  {
    question: 'Will the naming convention still make sense after we change systems?',
    answer:
      'That is the reason to put the identifier, the date of service, and the record type in the filename itself. Records outlive the software that produced them: an export, a migration, or an archive drive strips away the database that gave those files meaning, and a self-describing filename is what survives. A folder named this way is still readable in ten years with nothing but a file browser.',
  },
  {
    question: 'Can the scanner folder be renamed automatically?',
    answer:
      'Yes. Assign a Template to folder monitoring on the folder your scanner or fax software saves into, and each new document is renamed to your convention as it arrives — with preview batches and rename history for reverting.',
  },
];

export const MEDICAL_JSON_LD = buildFeaturePageJsonLd({
  pageName: MEDICAL_PAGE_TITLE,
  howTo: {
    name: 'Set up AI file renaming for scanned medical records',
    description:
      'Use Zush to name scanned medical records by internal ID, date of service, and document type with Local AI or an organization-controlled BYOK account.',
    steps: [
      {
        name: 'Enable Local AI',
        text: 'Analysis runs on local Ollama models, so supported files are processed entirely on the machine.',
      },
      {
        name: 'Build a records Template',
        text: 'Pick the fields to put in the name — MRN or account number, date of service, record type, or any field you describe in plain language.',
      },
      {
        name: 'Review and monitor',
        text: 'Preview each batch before applying, then assign the Template to the scanner folder so new scans are named automatically.',
      },
    ],
  },
  faqItems: MEDICAL_FAQ,
  page: {
    pagePath: MEDICAL_PAGE_PATH,
    description:
      'AI document renamer for medical practices on Mac and Windows. Zush names scanned records by the fields you choose, with Local AI so files never leave the machine, plus in-place renaming and no file uploads.',
    featureList: [
      'Name records by the fields you choose — MRN, date, record type, and more',
      'Local AI with Ollama on Mac and Windows; works offline after setup',
      'BYOK through an AI provider account and key controlled by the organization',
      'Read scans and faxes with AI vision — no OCR pass',
      'Preview every batch before applying, with undo',
      'Folder monitoring for scanner and fax folders',
      'In-place renaming — no uploads, no file storage',
    ],
  },
});
