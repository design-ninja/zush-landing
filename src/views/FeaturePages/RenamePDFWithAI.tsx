import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

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
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'Rename PDFs with AI on Mac',
      description:
        'Use Zush to automatically rename PDF files based on their text content using AI on macOS.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add your PDF files',
          text: 'Drag and drop PDFs into Zush or select a folder. You can add individual files or process an entire directory of PDFs at once.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'AI reads and understands each PDF',
          text: 'Zush extracts text from your PDFs, identifying document types, key entities, dates, and topics. For scanned documents, AI vision reads the page images directly.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Review and rename',
          text: 'Check the AI-generated names, tweak your naming pattern if desired, and apply the changes. All files are renamed instantly while preserving their content.',
        },
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'meta[name="description"]'],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    buildSoftwareApplicationJsonLd({
      pagePath: '/rename-pdf-with-ai',
      description:
        'AI PDF renamer for macOS that extracts text from invoices, contracts, scanned receipts, and reports to generate searchable filenames automatically.',
      featureList: [
        'Rename PDF files by document content',
        'Support for scanned PDFs via AI vision',
        'Batch rename invoices, contracts, and reports',
        'Automatic folder monitoring for repeating PDF workflows',
        'Custom naming patterns with dates and entities',
        'Undo and rename history',
      ],
    }),
  ],
};

const RenamePDFWithAI = () => (
  <FeatureLandingPage
    h1="Rename PDFs with AI on Mac"
    category="pdf"
    definitionTitle="What Is AI PDF Renaming?"
    definitionText="Rename PDFs with AI on Mac using Zush to read invoices, contracts, scans, and reports, then turn weak filenames into searchable document titles."
    showcaseSlides={[{
      files: [
        { before: 'scan_001.pdf', after: 'Amazon Invoice March.pdf', type: 'pdf' },
        { before: 'document.pdf', after: 'Employment Contract.pdf', type: 'pdf' },
        { before: 'download.pdf', after: 'Tax Return 2025 Federal.pdf', type: 'pdf' },
        { before: 'attachment-3.pdf', after: 'Lease Agreement 123 Main.pdf', type: 'pdf' },
        { before: 'IMG_20260310_scan.pdf', after: 'Home Depot Receipt.pdf', type: 'pdf' },
        { before: 'report_final_v2.pdf', after: 'Q1 Revenue Report.pdf', type: 'pdf' },
      ],
    }]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', freeTier: '50', batchRename: true, autoMonitor: true, pricing: '$10 one-time / 10,000 renames' },
      { tool: 'Renamer.ai', platform: 'Mac & Windows', freeTier: '15/m', batchRename: true, autoMonitor: true, pricing: 'From $9.95/mo (200 renames)' },
      { tool: 'AI Renamer', platform: 'Mac & Windows', freeTier: '10', batchRename: true, autoMonitor: false, pricing: '$19 one-time or $10/200 renames' },
      { tool: 'NameQuick', platform: 'macOS', freeTier: '50', batchRename: true, autoMonitor: true, pricing: 'From $5/mo (500 renames) or $38 BYOK' },
      { tool: 'RenameClick', platform: 'Mac & Windows', freeTier: '30/m', batchRename: true, autoMonitor: true, pricing: '$48 lifetime or $8/mo' },
      { tool: 'Riffo', platform: 'macOS', freeTier: 'Limited', batchRename: true, autoMonitor: false, pricing: 'Freemium' },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
      { title: 'Auto Rename Files on macOS', href: '/auto-rename-files' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename PDF Files Automatically', href: 'rename-pdf-files-automatically' },
      { title: 'How to Rename Files with AI: Step-by-Step Guide', href: 'rename-files-with-ai-guide' },
      { title: 'Automate File Organization on macOS', href: 'automate-file-organization-macos' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenamePDFWithAI;
