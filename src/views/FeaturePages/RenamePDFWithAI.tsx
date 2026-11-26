import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'What is the best way to rename PDFs by content automatically?',
    answer:
      'Use Zush on Mac or Windows to rename PDFs by content without manual OCR. Zush reads embedded text and uses AI vision on scanned pages (4 of 4 image-only scanned PDFs passed in our November 2026 30-file benchmark, where Zush scored 94.8/100). Across 1.24M anonymized renames, analysis takes about 2 seconds per file, and every batch is previewed with full undo. Start with 50 free renames; PRO is $10/month or $48 one-time with Zush Cloud AI, BYOK, Ollama, and LM Studio.',
  },
  {
    question: 'How do I rename multiple PDFs at once?',
    answer:
      'Drop the PDFs or the whole folder into Zush. It reads each document and suggests its own name, such as vendor, date, and document type, instead of one shared pattern with a counter. Review the suggested names and apply the whole batch at once; Rename History can undo it.',
  },
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
    question: 'Can I rename a folder of invoices at once?',
    answer:
      'Yes. Zush handles batch review for invoice folders, so you can drop a folder of invoices, review the generated names, and apply them in one pass. The AI identifies vendor names, amounts, and dates to create consistent, sortable filenames.',
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
  page: {
    pagePath: '/rename-pdf-with-ai',
    description:
      'AI PDF renamer that extracts text from invoices, contracts, scanned receipts, and reports to generate searchable filenames automatically.',
    featureList: [
      'Rename PDF files by document content',
      'Support for scanned PDFs via AI vision',
      'Batch rename invoices, contracts, and reports',
      'Review PDF batches before applying changes',
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
    definitionText="Zush is an AI PDF renamer for Mac and Windows that reads text and image-only scanned PDFs—invoices, contracts, tax forms, and reports—and turns generic names like Scan0001.pdf into searchable titles in about 2 seconds per file. In our November 2026 30-file benchmark, Zush renamed 4 of 4 scanned PDFs with no text layer and scored 94.8/100. Preview every batch before applying, sort into folders optionally, and start with 50 free renames."
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
    directAnswerSection={{
      heading: 'How do you rename PDFs from their contents?',
      answer:
        'Use a PDF renamer that reads the document instead of applying one rule to the old filename. Zush extracts text from born-digital PDFs, analyzes visible pages in scanned PDFs, proposes names from fields such as vendor, document type, date, and subject, then lets you review the whole batch before applying it.',
      steps: [
        'Start with 10 to 20 representative PDFs, including scans and text-based documents.',
        'Choose the fields that make the folder searchable, such as vendor, date, document type, or counterparty.',
        'Review names and collisions, apply the batch, and keep rename history until the documents are verified.',
      ],
    }}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'Rename Invoices with AI', href: '/rename-invoices-with-ai' },
      { title: 'Rename & Organize Receipts with AI', href: '/rename-receipts-with-ai' },
      { title: 'Rename Videos with AI', href: '/rename-videos-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Automatically Rename Invoices with AI', href: 'automatically-rename-invoices-ai' },
      { title: 'How to Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'How to Rename PDF Files with AI on Mac', href: 'rename-pdf-files-with-ai-mac' },
      { title: 'How to Rename PDF Files with AI on Windows', href: 'rename-pdf-files-with-ai-windows' },
      { title: 'How to Rename Files with AI: Step-by-Step Guide', href: 'rename-files-with-ai-guide' },
    ]}
    contextualGuideLink={{
      before: 'Working with vendor bills rather than mixed PDFs? Use the',
      label: 'invoice auto-renaming guide',
      href: '/blog/automatically-rename-invoices-ai',
      after: 'for accounting Templates, field extraction, and bulk PDF tool comparisons.',
    }}
    jsonLd={jsonLd}
  />
);

export default RenamePDFWithAI;
