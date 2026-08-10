import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

export const ACCOUNTANTS_PAGE_PATH = '/for-accountants';
export const ACCOUNTANTS_PAGE_TITLE = 'Accounting Document Management with AI File Renaming';

export const ACCOUNTANTS_HERO = {
  eyebrow: 'AI file renamer for accountants',
  titleLead: 'Rename accounting files by ',
  titleAccent: 'vendor, date, and number',
  subtitle:
    'Zush reads invoices, receipts, statements, tax forms, and scans, then names each file to your convention. Build a Template for each client, preview every batch, and undo anytime. Use unmetered Cloud AI, your own provider key, or local Offline AI.',
  trustLine: [
    'Unmetered paid plans',
    'Private Offline AI and BYOK',
    'Preview and undo every batch',
  ],
  photo: {
    alt: 'Accountant reviewing financial documents at a desktop computer in a bright office',
  },
} as const;

export interface AccountantField {
  label: string;
  before: string;
  after: string;
  emphasis?: string;
}

export const ACCOUNTANTS_FIELDS: AccountantField[] = [
  { label: 'Document date', before: 'download (7).pdf', after: '2026-06-12 – Acme Supply – INV-10234', emphasis: '2026-06-12' },
  { label: 'Vendor / client', before: 'invoice.pdf', after: '2026-06-12 – Acme Supply – INV-10234', emphasis: 'Acme Supply' },
  { label: 'Invoice number', before: 'attachment.pdf', after: '2026-06-12 – Acme Supply – INV-10234', emphasis: 'INV-10234' },
  { label: 'Amount', before: 'bill (3).pdf', after: '2026-06-12 – Acme Supply – 1,204 USD', emphasis: '1,204 USD' },
  { label: 'Currency', before: 'scan_0042.pdf', after: '2026-06-12 – Acme Supply – 1,204 USD', emphasis: 'USD' },
  { label: 'Expense category', before: 'IMG_2041.jpg', after: '2026-06-03 – Whole Foods – Meals – 84 USD', emphasis: 'Meals' },
  { label: 'Tax year / period', before: 'scan.pdf', after: '2025 – 1099-NEC – Rivera Consulting', emphasis: '2025' },
  { label: 'Payment status', before: 'invoice_copy.pdf', after: 'Vertex GmbH – INV-0088 – PAID', emphasis: 'PAID' },
  { label: 'Statement period', before: 'statement_final.pdf', after: '2026-05 – First National – Bank Statement', emphasis: '2026-05' },
  { label: 'Account / entity', before: 'export (1).xlsx', after: '2026-Q2 – Vertex GmbH – Expense Summary', emphasis: 'Vertex GmbH' },
  { label: 'Custom field — describe it in plain language', before: 'doc.pdf', after: '2026-06-08 – W-9 – Rivera Consulting', emphasis: 'W-9' },
];

export interface AccountantsPrivacyMode {
  id: 'cloud' | 'byok' | 'offline';
  kind: 'cloud-ai' | 'byok' | 'offline-ai';
  title: string;
  badge?: string;
  badgeTone?: 'success';
  description: string;
}

export const ACCOUNTANTS_PRIVACY_MODES: AccountantsPrivacyMode[] = [
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Offline AI with local models',
    badge: 'Files stay on the machine',
    badgeTone: 'success',
    description:
      'Local Ollama models analyze supported invoices, receipts, statements, and scans on the Mac or Windows PC where they are stored. File content is not sent to Zush or a third-party AI provider.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Your provider account with BYOK',
    badge: 'Your key and account',
    description:
      'Route analysis through the AI provider account and API key your firm controls. The key stays in secure local storage, and your team chooses the provider and model used for client work.',
  },
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Managed Cloud AI',
    badge: 'Fastest setup',
    description:
      'Use the built-in managed mode when convenience is the priority. Paid plans are unmetered, so recurring intake and backlog cleanup do not consume per-document credits.',
  },
];

export const ACCOUNTANTS_PRIVACY_NOTE =
  'Choose the processing mode that matches your firm and client policy. In every mode, Zush renames files in place and does not store them.';

export const ACCOUNTANTS_WORKFLOW = [
  {
    title: 'Route files to an intake folder',
    description:
      'Email attachments, portal downloads, scanner output, and receipt photos can land in one monitored folder per client or entity.',
  },
  {
    title: 'Review names from the client Template',
    description:
      'Choose the date, vendor, number, amount, category, or custom fields that belong in the filename, then read the proposed batch before applying it.',
  },
  {
    title: 'Apply with undo and keep monitoring',
    description:
      'Rename history can revert a batch. Keep the Template assigned to the folder so new source documents arrive already named to the same convention.',
  },
];

export interface AccountingDocumentType {
  title: string;
  description: string;
  example: string;
}

export const ACCOUNTING_DOCUMENT_TYPES: AccountingDocumentType[] = [
  {
    title: 'Supplier invoices and bills',
    description:
      'Name AP documents by invoice date, vendor, invoice number, amount, currency, or the fields required by the client convention.',
    example: '2026-06-12 – Acme Supply – INV-10234 – 1,204 USD.pdf',
  },
  {
    title: 'Receipts and expense evidence',
    description:
      'Read PDF, JPG, and HEIC receipts, then add the merchant, date, amount, and a category described with a Custom AI Block.',
    example: '2026-06-03 – Whole Foods – Meals – 84 USD.jpg',
  },
  {
    title: 'Bank and card statements',
    description:
      'Turn generic downloads into statements named by institution, account label, and statement period for faster retrieval during reconciliation.',
    example: '2026-05 – First National – Operating – Statement.pdf',
  },
  {
    title: 'Tax forms and client documents',
    description:
      'Name W-9s, 1099s, tax notices, and supporting scans by form type, tax year, issuer, or entity without typing every filename.',
    example: '2025 – 1099-NEC – Rivera Consulting.pdf',
  },
  {
    title: 'Payroll and close reports',
    description:
      'Keep payroll registers, journal support, and monthly reports aligned by period, entity, report type, and approval status.',
    example: '2026-05 – Vertex GmbH – Payroll Report – FINAL.pdf',
  },
  {
    title: 'Spreadsheets and exports',
    description:
      'Rename expense exports, reconciliations, and workbook deliverables by client, period, and content so the latest file is searchable after handoff.',
    example: '2026-Q2 – Vertex GmbH – Expense Summary.xlsx',
  },
];

export interface AccountantAudience {
  title: string;
  description: string;
  image: 'practice-owner' | 'bookkeeper' | 'team';
}

export const ACCOUNTANTS_AUDIENCES: AccountantAudience[] = [
  {
    title: 'Small accounting practices',
    description:
      'Keep every client intake folder on its own convention, even when invoices arrive through email, portals, scanners, and shared drives.',
    image: 'practice-owner',
  },
  {
    title: 'Independent bookkeepers',
    description:
      'Turn a weekly pile of receipts and downloads into files named by merchant, date, amount, and category before reconciliation starts.',
    image: 'bookkeeper',
  },
  {
    title: 'Client accounting and AP teams',
    description:
      'Use shared Templates so everyone names bills, statements, close support, and exports the same way without memorizing the rule.',
    image: 'team',
  },
];

export const ACCOUNTANTS_TESTIMONIALS = [
  {
    name: 'Elena Park',
    role: 'Accounting practice owner',
    quote:
      'Each client has a slightly different filename rule. Templates keep those rules out of my head, and I can check the whole proposed batch before applying it.',
  },
  {
    name: 'Marco Ruiz',
    role: 'Independent bookkeeper',
    quote:
      'The time sink was not one receipt — it was a month of IMG files and downloads. Naming them by date, merchant, amount, and category gives me a usable intake folder.',
  },
  {
    name: 'Nia Brown',
    role: 'Client accounting lead',
    quote:
      'We use Offline AI for client folders that need to stay on the workstation. The preview catches the odd scan before anyone applies the batch.',
  },
] as const;

export const ACCOUNTANTS_FAQ = [
  {
    question: 'Does Zush replace accounting document management software?',
    answer:
      'No. Zush is the file-naming layer around your existing accounting stack. It renames invoices, receipts, statements, scans, downloads, and exports in place, but it does not store client records, control access, approve bills, post transactions, or replace a document management system, QuickBooks, Xero, or your firm’s portal.',
  },
  {
    question: 'How does Zush help accountants and bookkeepers?',
    answer:
      'Zush reads invoices, receipts, statements, tax forms, spreadsheets, and scans, then proposes filenames built from fields such as vendor, date, invoice number, amount, currency, and category. You review the batch before applying it, and undo remains available afterward.',
  },
  {
    question: 'Can each client have a different naming convention?',
    answer:
      'Yes. Create one reusable Template per client, entity, or workflow. A Template controls the filename structure, date format, Naming Blocks, and any Custom AI Block fields such as expense category, account code, or approval status.',
  },
  {
    question: 'Can Zush watch a client intake folder?',
    answer:
      'Yes. Assign a Template to folder monitoring and Zush can process new email saves, portal downloads, or scanner output as they arrive. Rename history keeps applied batches reversible.',
  },
  {
    question: 'Does it work with scanned invoices and receipt photos?',
    answer:
      'Yes. Zush uses AI vision to read image-only PDFs and supported image formats, so scans and receipt photos can follow the same convention as born-digital documents without a separate OCR step.',
  },
  {
    question: 'Is client financial data kept private?',
    answer:
      'Files are renamed in place and are not stored by Zush. For analysis, choose managed Cloud AI, BYOK through the provider account and key your firm controls, or Offline AI with local Ollama models so supported file analysis stays on the machine.',
  },
  {
    question: 'Does Zush connect to QuickBooks or Xero?',
    answer:
      'Zush organizes the file layer around accounting software — downloads, email attachments, scans, exports, and supporting documents. It does not post transactions to or modify records inside QuickBooks, Xero, or another ledger.',
  },
  {
    question: 'Does Zush charge per document?',
    answer:
      'No. Paid plans include unlimited renames rather than per-file credits, so you can re-run a folder after changing a Template without paying for the same documents again. The first 50 renames are free to evaluate.',
  },
];

export const ACCOUNTANTS_JSON_LD = buildFeaturePageJsonLd({
  howTo: {
    name: 'Set up AI file renaming for accounting documents',
    description:
      'Use Zush to name invoices, receipts, statements, tax forms, and scans by vendor, date, number, amount, and other accounting fields.',
    steps: [
      {
        name: 'Create a client intake folder',
        text: 'Route email attachments, portal downloads, scanner output, and receipt photos into one folder for the client or entity.',
      },
      {
        name: 'Build an accounting Template',
        text: 'Choose the vendor, date, document number, amount, category, tax period, or custom fields that belong in each filename.',
      },
      {
        name: 'Review, apply, and monitor',
        text: 'Preview the proposed batch, apply it with undo available, then monitor the intake folder for new documents.',
      },
    ],
  },
  faqItems: ACCOUNTANTS_FAQ,
  software: {
    pagePath: ACCOUNTANTS_PAGE_PATH,
    description:
      'AI file renamer for accountants and bookkeepers on Mac and Windows. Zush names invoices, receipts, statements, tax forms, and scans by the fields each client workflow needs.',
    applicationSubCategory: 'Accounting Document File Renaming',
    featureList: [
      'Name invoices by vendor, date, number, amount, and currency',
      'Read scanned documents and receipt photos with AI vision',
      'Create reusable Templates for each client or entity',
      'Extract expense categories and account fields with Custom AI Blocks',
      'Monitor client intake and scanner folders',
      'Choose managed Cloud AI, BYOK, or local Offline AI',
      'Preview every batch before applying, with undo',
      'Unlimited renames on paid plans',
    ],
  },
});
