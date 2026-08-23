import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

export const HR_PAGE_PATH = '/for-hr';
export const HR_PAGE_TITLE = 'HR Document Management with Offline AI File Renaming';

export const HR_HERO = {
  eyebrow: 'For HR and people teams',
  titleLead: 'Rename HR documents by ',
  titleAccent: 'employee, date, and type',
  subtitle:
    'Zush reads resumes, offer letters, onboarding forms, reviews, policies, and exported records, then gives them consistent, searchable filenames. Use it with existing folders, shared drives, ATS downloads, and HRIS exports on Mac or Windows.',
  trustLine: [
    'Works with your existing folders',
    'Local AI for sensitive records',
    'Preview before every rename',
  ],
  photo: {
    alt: 'HR professionals reviewing employee onboarding documents in a modern office',
  },
} as const;

export interface HrField {
  label: string;
  before: string;
  after: string;
  emphasis?: string;
}

export const HR_FIELDS: HrField[] = [
  { label: 'Employee ID', before: 'scan_0048.pdf', after: 'EMP-1042 – 2026-08-03 – Benefits Enrollment', emphasis: 'EMP-1042' },
  { label: 'Candidate', before: 'resume-final.pdf', after: 'Rivera Sofia – Product Designer – Resume', emphasis: 'Rivera Sofia' },
  { label: 'Document date', before: 'document (7).pdf', after: 'EMP-1042 – 2026-08-03 – Offer Letter', emphasis: '2026-08-03' },
  { label: 'Document type', before: 'download (3).pdf', after: 'EMP-1042 – 2026-08-05 – Tax Form', emphasis: 'Tax Form' },
  { label: 'Role / Position', before: 'candidate_notes.docx', after: 'Rivera Sofia – Product Designer – Interview Notes', emphasis: 'Product Designer' },
  { label: 'Department', before: 'policy_ack.pdf', after: 'EMP-1186 – Finance – Security Policy Acknowledgment', emphasis: 'Finance' },
  { label: 'Effective date', before: 'signed_letter.pdf', after: 'EMP-1042 – Promotion – Effective 2026-09-01', emphasis: '2026-09-01' },
  { label: 'Review period', before: 'review_final2.docx', after: 'EMP-1042 – Performance Review – 2026 H1', emphasis: '2026 H1' },
  { label: 'Status', before: 'offer.pdf', after: 'Rivera Sofia – Product Designer – Offer – Signed', emphasis: 'Signed' },
  { label: 'Custom field — describe it in plain language', before: 'Form0091.pdf', after: 'EMP-1042 – Equipment Agreement – Laptop Return', emphasis: 'Laptop Return' },
];

export interface HrPrivacyMode {
  id: 'cloud' | 'byok' | 'offline';
  kind: 'cloud-ai' | 'byok' | 'offline-ai';
  title: string;
  badge?: string;
  badgeTone?: 'success';
  description: string;
}

export const HR_PRIVACY_MODES: HrPrivacyMode[] = [
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Local AI with Ollama',
    badge: 'Keep files on the machine',
    badgeTone: 'success',
    description:
      'Organize supported employee and candidate files with local Ollama models on the Mac or Windows PC where they are stored. Document content is not sent to Zush or an AI provider.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Use your organization’s AI account',
    badge: 'BYOK',
    description:
      'Connect the AI provider account and model approved by your organization. The API key stays in secure local storage, while the provider processes the documents you choose.',
  },
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Start with managed AI',
    badge: 'Fastest setup',
    description:
      'Use Zush-managed AI for sample or non-sensitive documents and quick evaluation. Choose Local AI or BYOK when personnel records require a different processing policy.',
  },
];

export const HR_PRIVACY_NOTE =
  'Zush never becomes the system of record for employee or candidate files: it renames documents in place and does not store them. Your organization chooses how document content is processed for each workflow.';

export const HR_WORKFLOW = [
  {
    title: 'Define the HR naming rule',
    description:
      'Build a Template from employee or candidate ID, document date, type, role, department, review period, status, and any field your people team uses.',
  },
  {
    title: 'Run it on intake or an export',
    description:
      'Organize a copied employee folder, recruiting downloads, onboarding scans, policy acknowledgments, or an ATS or HRIS export without moving files into a new platform.',
  },
  {
    title: 'Approve the searchable filenames',
    description:
      'Review the whole batch, correct exceptions, and apply it with rename history. Then monitor recurring intake folders with the same rule.',
  },
];

export const HR_DOCUMENT_TYPES = [
  {
    title: 'Recruiting and candidate files',
    description:
      'Name resumes, portfolios, interview notes, scorecards, background-check documents, and offers by candidate, role, date, and status.',
    example: 'Rivera Sofia – Product Designer – Offer – Signed.pdf',
  },
  {
    title: 'Onboarding records',
    description:
      'Keep signed offers, tax forms, benefits elections, identity documents, equipment agreements, and policy acknowledgments distinct.',
    example: 'EMP-1042 – 2026-08-05 – Benefits Enrollment.pdf',
  },
  {
    title: 'Employee changes',
    description:
      'Organize promotion letters, compensation changes, transfers, leave records, and flexible-work agreements by effective date and status.',
    example: 'EMP-1042 – Promotion – Effective 2026-09-01.pdf',
  },
  {
    title: 'Performance and development',
    description:
      'Name review forms, goals, development plans, training certificates, and manager notes by employee and review period.',
    example: 'EMP-1042 – Performance Review – 2026 H1.pdf',
  },
  {
    title: 'Policies and acknowledgments',
    description:
      'Separate handbook receipts, security training, code-of-conduct acknowledgments, and policy updates by employee, policy, and date.',
    example: 'EMP-1186 – Security Policy Acknowledgment – 2026-07-22.pdf',
  },
  {
    title: 'Offboarding and archives',
    description:
      'Turn exit forms, equipment returns, final letters, and exported personnel records into clear files before retention or archive workflows.',
    example: 'EMP-1042 – Equipment Return – Completed – 2026-10-04.pdf',
  },
];

export interface HrAudience {
  title: string;
  description: string;
  icon: 'generalist' | 'recruiting' | 'operations';
}

export const HR_AUDIENCES: HrAudience[] = [
  {
    title: 'HR generalists and small people teams',
    description:
      'Keep onboarding, employee changes, reviews, and offboarding documents understandable across Finder, File Explorer, OneDrive, Dropbox, or a network drive.',
    icon: 'generalist',
  },
  {
    title: 'Recruiting and talent acquisition',
    description:
      'Turn ATS downloads, resumes, portfolios, interview notes, scorecards, and signed offers into a consistent candidate record before handoff or archive.',
    icon: 'recruiting',
  },
  {
    title: 'People operations and HRIS administrators',
    description:
      'Standardize filenames at intake, migration, and export so employee records retain their context when they move between systems or leave the HRIS.',
    icon: 'operations',
  },
];

export const HR_ORGANIZATION_OUTCOMES = [
  {
    title: 'Identify the record before opening it',
    description:
      'Employee or candidate ID, document type, role, period, and status turn a folder listing into a useful index instead of a wall of downloads and scan numbers.',
  },
  {
    title: 'Make lifecycle handoffs easier to review',
    description:
      'Consistent names help recruiting, HR, managers, payroll, IT, and operations understand what a file is when it passes through an approved workflow.',
  },
  {
    title: 'Preserve context outside the HRIS',
    description:
      'Self-describing filenames remain useful in approved exports, migration batches, shared folders, employee packets, and retention archives.',
  },
];

export const HR_FAQ = [
  {
    question: 'What is the best way to organize HR documents?',
    answer:
      'Use the HRIS or ATS as the system of record, then organize the files around it by employee or candidate ID and a consistent filename built from the document date, type, role or department, period, and status. Keep sensitive personal details out of filenames unless your organization’s policy requires them.',
  },
  {
    question: 'Can AI organize employee files automatically?',
    answer:
      'Yes. Zush reads PDFs, Word documents, images, and scans, extracts the fields defined in your Template, and proposes consistent filenames for the batch. A person reviews the results before any filenames change.',
  },
  {
    question: 'Does Zush replace an HRIS, ATS, or employee document management system?',
    answer:
      'No. Zush is an organization layer for intake folders, shared drives, recruiting downloads, scanner output, migration batches, and exports. It renames files in place and does not provide employee records storage, permissions, recruiting, payroll, retention enforcement, or case management.',
  },
  {
    question: 'Can Zush organize sensitive HR files without uploading them?',
    answer:
      'Yes. Local AI analyzes supported files with Ollama on Mac or Windows, so document content stays on that machine. It works offline after setup. Zush renames files in place and does not store them.',
  },
  {
    question: 'How should HR name employee documents?',
    answer:
      'A practical pattern is EmployeeID – YYYY-MM-DD – DocumentType – PeriodOrStatus. For candidate files, use Candidate – Role – DocumentType – Status. The exact fields should follow your organization’s access, privacy, and retention policies.',
  },
  {
    question: 'Can Zush extract employee IDs and effective dates?',
    answer:
      'Yes. Add Custom AI Blocks that describe the employee ID, effective date, review period, role, department, or other organization-specific fields and required formats.',
  },
  {
    question: 'Does it organize scanned onboarding forms?',
    answer:
      'Yes. Zush can read image-only PDFs and photographed documents with AI vision, without a separate OCR step. Folder monitoring can watch the approved locations where onboarding documents arrive.',
  },
  {
    question: 'Can HR use different naming rules for recruiting and employee records?',
    answer:
      'Yes. Create separate Templates for candidate intake, onboarding, employee changes, performance documents, and offboarding so each workflow extracts only the fields it needs.',
  },
];

export const HR_JSON_LD = buildFeaturePageJsonLd({
  howTo: {
    name: 'How to organize HR documents automatically with AI',
    description:
      'Use Zush to organize recruiting, onboarding, employee, performance, policy, and offboarding files into searchable HR records.',
    steps: [
      {
        name: 'Define the HR document naming convention',
        text: 'Choose the employee or candidate ID, date, document type, role, department, period, status, and organization-specific fields that make each file identifiable.',
      },
      {
        name: 'Organize an intake or export folder',
        text: 'Run the Template on a copied employee folder, recruiting downloads, scanner output, shared drive, or ATS or HRIS export.',
      },
      {
        name: 'Review and apply the filenames',
        text: 'Check the proposed batch, correct exceptions, apply it with undo history, and reuse the same Template for recurring intake.',
      },
    ],
  },
  faqItems: HR_FAQ,
  software: {
    pagePath: HR_PAGE_PATH,
    description:
      'AI HR document renamer and organizer for people teams on Mac and Windows. Zush turns inconsistent employee and candidate filenames into searchable records without replacing the HRIS or ATS.',
    applicationSubCategory: 'HR File Organization Software',
    featureList: [
      'Organize employee and candidate documents into searchable files',
      'Standardize filenames across folders, shared drives, and HRIS or ATS exports',
      'Extract organization-specific fields with Custom AI Blocks',
      'Read PDFs, Word documents, images, and image-only scans',
      'Local AI with Ollama; works offline after setup',
      'BYOK through a provider account controlled by the organization',
      'Preview every batch before applying, with undo history',
    ],
  },
});
