import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Can Zush rename scanned PDFs that contain images instead of text?',
    answer:
      'Yes. When a PDF contains scanned pages rather than selectable text, Zush falls back to AI vision models that can read the content from the page images. This works well for scanned invoices, receipts, and letters.',
  },
  {
    question: 'How does Zush extract text from PDF files?',
    answer:
      'Zush uses a built-in PDF parser to read the embedded text layer. It pulls out key information like titles, headings, dates, and names from the first few pages, then sends that context to the AI to generate a meaningful filename.',
  },
  {
    question: 'Can I rename hundreds of invoices at once?',
    answer:
      'Absolutely. Zush handles batch renaming, so you can drop an entire folder of invoices and have them all renamed in one go. The AI identifies vendor names, amounts, and dates to create consistent, sortable filenames.',
  },
  {
    question: 'Will renaming affect the PDF content or bookmarks?',
    answer:
      'No. Zush only changes the filename on disk. The PDF content, bookmarks, annotations, form fields, and all internal structure remain completely unchanged.',
  },
  {
    question: 'Can Zush add dates to PDF filenames automatically?',
    answer:
      'Yes. When the AI detects dates within the document content, it can include them in the generated filename. You can also configure custom naming patterns to control where the date appears and in what format.',
  },
  {
    question: 'How is this different from Adobe Acrobat, Preview, or Finder?',
    answer:
      'Adobe Acrobat and Preview are useful for opening, editing, signing, exporting, and reviewing PDFs. Finder and File Explorer can rename files manually. Zush focuses on the missing workflow between them: reading each PDF, understanding the document type and entities, and generating a searchable filename for a whole batch.',
  },
  {
    question: 'What naming patterns work best for invoices and contracts?',
    answer:
      'For invoices, a pattern like vendor-date-invoice-number keeps folders sortable. For contracts, party-document-type-status-date usually works better, such as Acme-NDA-signed-2026-03-14.pdf. Zush can follow these patterns while still adapting to the content of each PDF.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename PDFs with AI',
    description:
      'Use Zush to automatically rename PDF files based on their text content using AI.',
    steps: [
      {
        name: 'Add your PDF files',
        text: 'Drag and drop PDFs into Zush or select a folder. You can add individual files or process an entire directory of PDFs at once.',
      },
      {
        name: 'AI reads and understands each PDF',
        text: 'Zush extracts text from your PDFs, identifying document types, key entities, dates, and topics. For scanned documents, AI vision reads the page images directly.',
      },
      {
        name: 'Review and rename',
        text: 'Check the AI-generated names, tweak your naming pattern if desired, and apply the changes. All files are renamed instantly while preserving their content.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-pdf-with-ai',
    description:
      'AI PDF renamer that extracts text from invoices, contracts, scanned receipts, and reports to generate searchable filenames automatically.',
    featureList: [
      'Rename PDF files by document content',
      'Support for scanned PDFs via AI vision',
      'Batch rename invoices, contracts, and reports',
      'PDF-specific patterns for vendors, counterparties, dates, and document types',
      'Comparison workflow for Finder, Preview, and Adobe Acrobat users',
      'Automatic folder monitoring for repeating PDF workflows',
      'Custom naming patterns with dates and entities',
      'Undo and rename history',
    ],
  },
});

const RenamePDFWithAI = () => (
  <FeatureLandingPage
    h1="Rename PDFs with AI"
    h1Accent="Rename PDFs"
    category="pdf"
    definitionTitle="What Is AI PDF Renaming?"
    definitionText="Rename PDFs with AI using Zush to read invoices, contracts, scans, and reports, then turn weak filenames into searchable document titles."
    showcaseSlides={[
      {
        files: [
          { before: 'scan_001.pdf', after: 'Amazon Invoice March.pdf', type: 'pdf' },
          { before: 'document.pdf', after: 'Employment Contract.pdf', type: 'pdf' },
          { before: 'download.pdf', after: 'Tax Return 2025 Federal.pdf', type: 'pdf' },
          { before: 'attachment-3.pdf', after: 'Lease Agreement 123 Main.pdf', type: 'pdf' },
          { before: 'IMG_20260310_scan.pdf', after: 'Home Depot Receipt.pdf', type: 'pdf' },
          { before: 'report_final_v2.pdf', after: 'Q1 Revenue Report.pdf', type: 'pdf' },
        ],
      },
      {
        files: [
          { before: 'download (14).pdf', after: 'IRS W-9 Form Signed.pdf', type: 'pdf' },
          { before: 'scan_0019.pdf', after: 'Medical Lab Results.pdf', type: 'pdf' },
          { before: 'client-brief-scan.pdf', after: 'Acme Creative Brief.pdf', type: 'pdf' },
          { before: 'document (3).pdf', after: 'Vendor NDA Final.pdf', type: 'pdf' },
          { before: 'cam_scan_0042.pdf', after: 'Apartment Lease 2026.pdf', type: 'pdf' },
          { before: 'Untitled-2.pdf', after: 'Series A Term Sheet.pdf', type: 'pdf' },
        ],
      },
      {
        files: [
          { before: 'IMG_scan_77.pdf', after: 'Uber Receipt March 14.pdf', type: 'pdf' },
          { before: 'download (7).pdf', after: 'Delta Airlines Itinerary.pdf', type: 'pdf' },
          { before: 'file_export.pdf', after: 'Annual Insurance Policy.pdf', type: 'pdf' },
          { before: 'doc2026031.pdf', after: 'Consulting Agreement v2.pdf', type: 'pdf' },
          { before: 'bank_statement_unknown.pdf', after: 'Chase Statement March.pdf', type: 'pdf' },
          { before: 'presentation_export.pdf', after: 'Product Launch Brief.pdf', type: 'pdf' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
      { title: 'Auto Rename Files with AI', href: '/auto-rename-files' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'How to Rename PDF Files with AI on Windows', href: 'rename-pdf-files-with-ai-windows' },
      { title: 'How to Rename Files with AI: Step-by-Step Guide', href: 'rename-files-with-ai-guide' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenamePDFWithAI;
