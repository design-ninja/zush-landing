import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

// English-only landing data for /for-medical. The page is not in
// LOCALIZED_ROUTES, so copy lives here rather than in src/i18n/copy.ts.
//
// Messaging direction (deliberate): the privacy story is NOT about hiding data
// in filenames. The doctor names files however they want — any field on the
// page can go in the name. The guarantee is the run mode: with Offline AI
// (local Ollama) the files never leave the machine and nothing is transmitted.
// Nothing here claims HIPAA compliance — no tool makes a practice compliant by
// itself; what Offline AI provides is that records stay local.

export const MEDICAL_PAGE_PATH = '/for-medical';
export const MEDICAL_PAGE_TITLE = 'Zush for Medical Practices';

export const MEDICAL_HERO = {
  eyebrow: 'AI file renamer & organizer',
  titleLead: 'Patient records that ',
  titleAccent: 'name themselves',
  subtitle:
    'Zush reads every scan, fax, and lab report and names it by the details you choose — patient, date, record type. With Offline AI it all runs on your machine: nothing is uploaded, nothing leaves. Review the batch, apply, undo anytime.',
  secondaryCta: {
    label: 'See how a practice sets it up',
    href: '#workflow',
  },
  trustLine: [
    'Offline AI mode',
    'Files never leave the machine',
    'Get started for free',
  ],
  // Imported as an astro:assets module in MedicalHero; only the alt text lives
  // here.
  photo: {
    alt: 'A physician at a desk reviewing scanned patient records on a monitor',
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

export interface MedicalPain {
  title: string;
  description: string;
}

export const MEDICAL_PAINS: MedicalPain[] = [
  {
    title: 'The scanner names nothing.',
    description:
      'Scan0001.pdf, Scan0002.pdf, Scan0003.pdf. A day of intake is a folder of mystery files that only opens one at a time.',
  },
  {
    title: 'Nothing is searchable.',
    description:
      'To find one lab result or referral you open files one at a time. A folder of scans is a filing cabinet with the labels torn off.',
  },
  {
    title: 'Cloud tools are a non-starter.',
    description:
      'A web renamer means uploading patient records to someone else’s server. For records you keep in-house, that’s the whole problem — the files should never leave the building.',
  },
];

export interface MedicalField {
  label: string;
  /** The scanner default the interactive demo starts from. */
  before: string;
  /** The proposed filename the demo reveals (always identifier-safe). */
  after: string;
  /** Substring of `after` to highlight (fields that land in the name). */
  emphasis?: string;
}

// `after` values are kept short enough to sit on one line in the demo card.
export const MEDICAL_FIELDS: MedicalField[] = [
  { label: 'Patient name', before: 'Scan0001.pdf', after: 'Jordan Miles – 2026-06-12 – Lab Results', emphasis: 'Jordan Miles' },
  { label: 'MRN / Patient ID', before: 'Scan0001.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results', emphasis: 'MRN-48211' },
  { label: 'Date of birth', before: 'Scan0002.pdf', after: 'Jordan Miles – DOB 1974-03-02 – Intake', emphasis: 'DOB 1974-03-02' },
  { label: 'Date of service', before: 'Scan0002.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results', emphasis: '2026-06-12' },
  { label: 'Record type', before: 'fax_received.pdf', after: 'MRN-30177 – 2026-05-30 – Chest X-Ray', emphasis: 'Chest X-Ray' },
  { label: 'Referring provider', before: 'referral.pdf', after: 'MRN-30177 – 2026-06-02 – Dr Chen', emphasis: 'Dr Chen' },
  { label: 'Specialty', before: 'consult_note.pdf', after: 'MRN-30177 – 2026-06-02 – Cardiology', emphasis: 'Cardiology' },
  { label: 'Blood type', before: 'Scan0003.pdf', after: 'MRN-30177 – 2026-06-02 – O+ Panel', emphasis: 'O+' },
  { label: 'Diagnosis', before: 'Scan_0044.pdf', after: 'MRN-30177 – 2026-06-02 – Hypertension', emphasis: 'Hypertension' },
  { label: 'Payer / Insurance', before: 'eob.pdf', after: 'ACC-2210 – 2026-06-04 – Blue Cross', emphasis: 'Blue Cross' },
  { label: 'Claim #', before: 'Scan_0052.pdf', after: 'ACC-2210 – 2026-06-04 – Claim 88213', emphasis: 'Claim 88213' },
  { label: 'Amount', before: 'statement.pdf', after: 'ACC-2210 – 2026-06-04 – Aetna $1,240', emphasis: '$1,240' },
  { label: 'Custom field — describe it in plain language', before: 'doc_20260608.pdf', after: 'MRN-51402 – 2026-06-05 – Consent Form', emphasis: 'Consent Form' },
];

export const MEDICAL_FIELDS_FOOTNOTE =
  'Custom AI Blocks extract any field you can describe — “the ordering physician”, “the CPT code”, “left or right side”.';

export const MEDICAL_FILENAME_PATTERN = '{Patient ID} – {Date of service} – {Record type}';

// Identifier-based only. Carried over from the medicalSlides pairs that used to
// live in searchLandingPages.ts.
export const MEDICAL_FILENAME_EXAMPLES = [
  { before: 'Scan0001.pdf', after: 'MRN-48211 – 2026-06-12 – Lab Results.pdf' },
  { before: 'fax_received.pdf', after: 'MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf' },
  { before: 'Scanned Document 4.pdf', after: 'MRN-51402 – 2026-06-05 – Intake Form.pdf' },
];

// The three run modes, ordered least-to-most private, each paired with the
// matching homepage Remotion demo (kind → FeatureAnimation). Same bento-card
// pattern as the homepage "3 secure ways to run Zush" section, with records-
// specific copy.
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
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Cloud AI',
    badge: 'Default',
    description:
      'Managed cloud AI reads the document content under the provider’s standard terms. Filenames and folder structure never leave your disk — but for records you are obligated to keep in-house, use a local mode instead.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Bring Your Own Key',
    badge: 'Your account',
    description:
      'Route analysis through your practice’s own OpenAI, Anthropic, or Google account, under the agreement — and any BAA — you already hold with that provider. The key stays in secure local storage.',
  },
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Private Offline AI',
    badge: 'Recommended for records',
    badgeTone: 'success',
    description:
      'Analysis runs on local Ollama models on Mac and Windows. A scan is read, named, and filed on the same machine it was scanned to — nothing about the document reaches Zush or any third-party AI provider.',
  },
];

export const MEDICAL_PRIVACY_NOTE =
  'No tool makes a practice HIPAA-compliant by itself — but with Offline AI the records never leave the machine they were scanned to, and nothing about them is transmitted anywhere.';

export const MEDICAL_WORKFLOW = [
  {
    title: 'Point Zush at the scan folder',
    description:
      'Folder monitoring watches whatever your scanner or fax software writes into — the intake folder, the shared drive, the fax spool.',
  },
  {
    title: 'Review the proposed names',
    description:
      'The preview is a control, not a formality: read the batch, confirm no patient names made it into a filename, regenerate anything that looks wrong.',
  },
  {
    title: 'Apply with undo',
    description:
      'Rename history reverts any batch. A convention change is a re-run, not a cleanup project.',
  },
];

export interface MedicalFeature {
  title: string;
  description: string;
  icon: 'folder' | 'scan' | 'template' | 'blocks' | 'history' | 'layouts';
  href?: string;
}

export const MEDICAL_FEATURES: MedicalFeature[] = [
  {
    title: 'Folder monitoring',
    description:
      'Assign a Template to the scanner or fax output folder. Every new document that lands is named to the same convention.',
    icon: 'folder',
    href: '/docs/folder-monitoring',
  },
  {
    title: 'AI vision for image-only scans',
    description:
      'Most records arrive as page images with no text layer. Zush reads the page directly — no separate OCR pass to run or maintain.',
    icon: 'scan',
    href: '/rename-scanned-documents',
  },
  {
    title: 'Templates per document flow',
    description:
      'Clinical records and billing paperwork want different names. Keep one Template for charts and another for claims, EOBs, and ERAs.',
    icon: 'template',
    href: '/docs/templates/medical-records',
  },
  {
    title: 'Custom AI Blocks',
    description:
      'Describe the field in plain language — “the ordering physician”, “the CPT code” — and it becomes part of the filename.',
    icon: 'blocks',
    href: '/docs/custom-ai-blocks',
  },
  {
    title: 'Undo and rename history',
    description:
      'Every applied batch is reversible. Nothing about a rename is one-way, which is what makes running it on records reasonable.',
    icon: 'history',
  },
  {
    title: 'Charts-style and intake-style folders',
    description:
      'Whether the folder tree is one directory per patient or one directory per intake day, the same filename pattern sorts correctly inside it.',
    icon: 'layouts',
    href: '/blog/medical-records-file-naming-convention',
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
    question: 'Can Zush rename patient records without uploading them anywhere?',
    answer:
      'Yes. In Offline AI mode, Zush analyzes supported files with local Ollama models on Mac or Windows — records are read and renamed entirely on the machine. Renaming always happens in place on your disk; Zush never uploads or stores your files.',
  },
  {
    question: 'Can I put the patient name or diagnosis in the filename?',
    answer:
      'Yes — you decide what goes in the name. Zush reads every field on the page, and a Template controls which ones it uses: MRN, date of service, record type, patient name, diagnosis, or a field you describe in plain language. In Offline AI mode none of it leaves your machine, so the naming choice is entirely yours, with a batch preview before anything is applied.',
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
    question: 'Does Zush work with our EHR?',
    answer:
      'Zush organizes the file layer around the EHR — scanner and fax output, exported records, attachments waiting to be imported, archive folders. It does not connect to, read from, or modify an EHR system. If a document lives inside the EHR, Zush is not involved; if it lives in a folder, Zush can name it.',
  },
  {
    question: 'Is Zush HIPAA compliant?',
    answer:
      'No software tool makes a practice HIPAA-compliant by itself — compliance lives in your organization’s safeguards and agreements. What Zush provides is a renaming step that can run entirely on your machine: Offline AI processing with local Ollama models, in-place renaming with no file uploads, and nothing transmitted to Zush or any third party. Review the setup with whoever owns compliance in your practice.',
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
  howTo: {
    name: 'Set up private AI renaming for medical records',
    description:
      'Use Zush to name scanned records by the fields you choose on Mac and Windows — locally, with Offline AI so files never leave the machine.',
    steps: [
      {
        name: 'Enable Offline AI mode',
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
  software: {
    pagePath: MEDICAL_PAGE_PATH,
    description:
      'AI document renamer for medical practices on Mac and Windows. Zush names scanned records by the fields you choose — with local Offline AI so files never leave the machine, plus in-place renaming and no file uploads.',
    applicationSubCategory: 'Medical Records Management',
    featureList: [
      'Name records by the fields you choose — MRN, date, record type, and more',
      'Offline AI mode: files never leave the machine',
      'Nothing transmitted to Zush or any third-party AI provider',
      'Read scans and faxes with AI vision — no OCR pass',
      'Preview every batch before applying, with undo',
      'Folder monitoring for scanner and fax folders',
      'In-place renaming — no uploads, no file storage',
    ],
  },
});
