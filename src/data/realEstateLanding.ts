import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

export const REAL_ESTATE_PAGE_PATH = '/for-real-estate';
export const REAL_ESTATE_PAGE_TITLE = 'Real Estate Document Management with AI File Renaming';

export const REAL_ESTATE_HERO = {
  eyebrow: 'For real estate agents and transaction teams',
  titleLead: 'Rename property files by ',
  titleAccent: 'address, date, and type',
  subtitle:
    'Zush reads purchase agreements, disclosures, inspection reports, appraisals, title documents, and property photos, then gives them consistent filenames. Keep your existing transaction system, folders, and shared drives on Mac or Windows.',
  trustLine: [
    'Works beside your transaction system',
    'Local AI for sensitive files',
    'Preview and undo every batch',
  ],
  photo: {
    alt: 'A real estate agent showing house plans to two prospective buyers in a bright office',
  },
} as const;

export interface RealEstateField {
  label: string;
  before: string;
  after: string;
  emphasis?: string;
}

export const REAL_ESTATE_FIELDS: RealEstateField[] = [
  { label: 'Property address', before: 'DocuSign_892347234.pdf', after: '742 Evergreen Terrace - Purchase Agreement - Executed', emphasis: '742 Evergreen Terrace' },
  { label: 'Document date', before: 'download (8).pdf', after: '742 Evergreen Terrace - 2026-06-08 - Inspection Report', emphasis: '2026-06-08' },
  { label: 'Document type', before: 'Document (4).pdf', after: '742 Evergreen Terrace - Title Commitment - 2026-06-05', emphasis: 'Title Commitment' },
  { label: 'Buyer / seller', before: 'signed_final.pdf', after: '742 Evergreen Terrace - Johnson to Smith - Purchase Agreement', emphasis: 'Johnson to Smith' },
  { label: 'Transaction ID', before: 'attachment.pdf', after: 'TX-2026-0184 - 742 Evergreen Terrace - Disclosure', emphasis: 'TX-2026-0184' },
  { label: 'Status', before: 'contract_v3.pdf', after: '742 Evergreen Terrace - Purchase Agreement - Executed', emphasis: 'Executed' },
  { label: 'Closing date', before: 'closing.pdf', after: '742 Evergreen Terrace - Closing Disclosure - 2026-07-02', emphasis: '2026-07-02' },
  { label: 'Agent / brokerage', before: 'listing_docs.zip', after: '88 Harbor Lane - Listing Package - J. Chen', emphasis: 'J. Chen' },
  { label: 'Listing number', before: 'property.pdf', after: 'MLS-884201 - 88 Harbor Lane - Seller Disclosure', emphasis: 'MLS-884201' },
  { label: 'Photo subject', before: 'IMG_4821.jpg', after: '88 Harbor Lane - Kitchen - Wide - 01', emphasis: 'Kitchen' },
  { label: 'Custom field - describe it in plain language', before: 'scan_0042.pdf', after: '742 Evergreen Terrace - HOA Documents - 2026', emphasis: 'HOA Documents' },
];

export interface RealEstatePrivacyMode {
  id: 'cloud' | 'byok' | 'offline';
  kind: 'cloud-ai' | 'byok' | 'offline-ai';
  title: string;
  badge?: string;
  badgeTone?: 'success';
  description: string;
}

export const REAL_ESTATE_PRIVACY_MODES: RealEstatePrivacyMode[] = [
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Local AI with Ollama',
    badge: 'Keep files on the machine',
    badgeTone: 'success',
    description:
      'Analyze supported transaction documents and property media with local Ollama models on the Mac or Windows PC where they are stored. File content is not sent to Zush or an AI provider.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Use your brokerage’s AI account',
    badge: 'BYOK',
    description:
      'Connect the AI provider account and model approved by your brokerage. The API key stays in secure local storage while the provider processes only the files you choose.',
  },
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Start with managed AI',
    badge: 'Fastest setup',
    description:
      'Use Zush-managed AI for a quick evaluation or non-sensitive listing material. Choose Local AI or BYOK when a transaction requires a different processing policy.',
  },
];

export const REAL_ESTATE_PRIVACY_NOTE =
  'Zush does not become your transaction repository. It renames files in place, does not store them, and leaves permissions, retention, compliance checklists, and communication inside the systems your brokerage already uses.';

export const REAL_ESTATE_WORKFLOW = [
  {
    title: 'Define the property naming rule',
    description:
      'Build a Template from the property address, transaction ID, document date, type, party, status, closing date, and any brokerage-specific field.',
  },
  {
    title: 'Run it on transaction intake',
    description:
      'Organize DocuSign downloads, email attachments, scanner output, inspection reports, title documents, listing photos, or a closed-deal archive without moving them to a new platform.',
  },
  {
    title: 'Approve property-ready filenames',
    description:
      'Review the batch, correct exceptions, and apply it with rename history. Reuse the same rule on monitored intake folders for the next transaction.',
  },
];

export const REAL_ESTATE_DOCUMENT_TYPES = [
  {
    title: 'Purchase agreements and addenda',
    description:
      'Name offers, counters, amendments, and executed agreements by property, party, status, and document date.',
    example: '742 Evergreen Terrace - Purchase Agreement - Executed - 2026-06-12.pdf',
  },
  {
    title: 'Inspections and repairs',
    description:
      'Keep home inspections, specialist reports, repair estimates, and receipts attached to the correct address.',
    example: '742 Evergreen Terrace - Inspection Report - 2026-06-08.pdf',
  },
  {
    title: 'Title, escrow, and closing',
    description:
      'Organize title commitments, settlement statements, closing disclosures, wire instructions, and recorded documents without relying on portal download names.',
    example: '742 Evergreen Terrace - Closing Disclosure - 2026-07-02.pdf',
  },
  {
    title: 'Appraisals and lender documents',
    description:
      'Name appraisal reports, lender requests, approval letters, and supporting documents by property and date.',
    example: '742 Evergreen Terrace - Appraisal - 2026-06-18.pdf',
  },
  {
    title: 'Disclosures and HOA files',
    description:
      'Distinguish seller disclosures, lead-based paint forms, HOA packages, insurance records, and local forms in one transaction folder.',
    example: '88 Harbor Lane - Seller Disclosure - Signed - 2026-05-27.pdf',
  },
  {
    title: 'Listing and inspection photos',
    description:
      'Apply the same property address to listing photos, room details, inspection images, and marketing exports so media stays with the transaction context.',
    example: '88 Harbor Lane - Kitchen - Wide - 01.jpg',
  },
];

export interface RealEstateAudience {
  title: string;
  description: string;
  icon: 'agent' | 'coordinator' | 'listing-media';
}

export const REAL_ESTATE_AUDIENCES: RealEstateAudience[] = [
  {
    title: 'Agents managing active transactions',
    description:
      'Keep DocuSign downloads, disclosures, inspection reports, lender requests, and closing documents identifiable across email, Downloads, shared folders, and the transaction platform.',
    icon: 'agent',
  },
  {
    title: 'Transaction coordinators and broker operations',
    description:
      'Apply one address-based convention across the team before assembling compliance files, responding to requests, or archiving a closed transaction.',
    icon: 'coordinator',
  },
  {
    title: 'Listing teams handling documents and media',
    description:
      'Keep property photos, floor plans, disclosures, listing packages, and marketing exports tied to the right address without forcing them into one application.',
    icon: 'listing-media',
  },
];

export const REAL_ESTATE_OUTCOMES = [
  {
    title: 'Search the address and see the transaction',
    description:
      'A consistent property address in every filename makes agreements, reports, disclosures, and photos discoverable before you open them.',
  },
  {
    title: 'Assemble a closing package with less guesswork',
    description:
      'Document type, date, party, and status make the folder listing a usable checklist instead of a collection of portal IDs and repeated downloads.',
  },
  {
    title: 'Keep context after the deal closes',
    description:
      'Self-describing filenames remain useful in email attachments, brokerage archives, local backups, shared drives, and exports from a transaction system.',
  },
];

export const REAL_ESTATE_FAQ = [
  {
    question: 'What is real estate document management?',
    answer:
      'Real estate document management is the process of keeping agreements, disclosures, inspections, title files, lender documents, closing records, and property media identifiable throughout a transaction. Zush handles the filename layer by reading each file and applying a consistent property-based naming convention.',
  },
  {
    question: 'Does Zush replace real estate transaction management software?',
    answer:
      'No. Zush renames the files around your transaction system, including DocuSign downloads, email attachments, scanner output, inspection reports, property photos, exports, and archives. It does not manage deadlines, signatures, compliance checklists, communication, permissions, or transaction records.',
  },
  {
    question: 'Can Zush rename DocuSign files by property address?',
    answer:
      'Yes. A Template can extract the property address, document type, execution date, parties, transaction ID, and status from a DocuSign PDF, then propose a filename such as “742 Evergreen Terrace - Purchase Agreement - Executed - 2026-06-12.pdf.”',
  },
  {
    question: 'Can it organize closing documents automatically?',
    answer:
      'Zush can rename title commitments, appraisal reports, closing disclosures, settlement statements, lender documents, and recorded files as a reviewed batch. Folder monitoring can also watch the locations where new transaction documents arrive.',
  },
  {
    question: 'Can Zush rename property photos as well as PDFs?',
    answer:
      'Yes. Zush can name supported property photos by address, room, view, shot type, or another field in the Template. Use a separate Template for listing media when its filename structure differs from the transaction documents.',
  },
  {
    question: 'Does Zush move files into property folders?',
    answer:
      'No. Zush renames files in place and leaves the existing folder structure unchanged. This makes it safe to add a naming layer around a brokerage’s current transaction folders, shared drive, Dropbox, OneDrive, or local archive.',
  },
  {
    question: 'Can transaction files be processed without uploading them?',
    answer:
      'Yes. Local AI analyzes supported files with Ollama on Mac or Windows, so document content stays on that machine. It works offline after setup. BYOK is available when the brokerage prefers to use its own approved provider account.',
  },
  {
    question: 'Does it work with scanned real estate documents?',
    answer:
      'Yes. AI vision can read image-only PDFs and supported images without a separate OCR pass. That includes office scanner output, photographed paperwork, older closing files, and signed documents returned as scans.',
  },
  {
    question: 'Can a brokerage standardize filenames across multiple agents?',
    answer:
      'Yes. Create reusable Templates for purchase transactions, listings, leases, closing packages, and property media. Each agent or coordinator can apply the same required field order and preview the proposed names before changing the batch.',
  },
];

export const REAL_ESTATE_JSON_LD = buildFeaturePageJsonLd({
  howTo: {
    name: 'How to organize real estate transaction files with AI',
    description:
      'Use Zush to rename purchase agreements, disclosures, inspection reports, title documents, closing files, and property photos by address, date, and type.',
    steps: [
      {
        name: 'Define the property naming convention',
        text: 'Choose the property address, transaction ID, document date, type, party, status, closing date, and brokerage-specific fields that make each file identifiable.',
      },
      {
        name: 'Organize transaction intake',
        text: 'Run the Template on DocuSign downloads, email attachments, scanner output, inspection files, title documents, property photos, or a copied closed-deal archive.',
      },
      {
        name: 'Review and apply the filenames',
        text: 'Check the proposed batch, correct exceptions, apply it with undo history, and reuse the Template for recurring intake.',
      },
    ],
  },
  faqItems: REAL_ESTATE_FAQ,
  software: {
    pagePath: REAL_ESTATE_PAGE_PATH,
    description:
      'Real estate document management with AI file renaming for Mac and Windows. Zush names transaction documents and property media by address, date, type, party, and status without replacing the brokerage’s existing systems.',
    applicationSubCategory: 'Real Estate Document Organization Software',
    featureList: [
      'Rename real estate documents by property address, date, and type',
      'Turn DocuSign and portal downloads into searchable transaction files',
      'Read scanned inspection, title, appraisal, and closing documents',
      'Name property photos with the same address-based context',
      'Create reusable Templates for transactions, listings, and media',
      'Choose managed Cloud AI, BYOK, or Local AI',
      'Preview every batch before applying, with undo history',
    ],
  },
});
