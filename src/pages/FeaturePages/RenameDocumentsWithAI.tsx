import FeatureLandingPage from '@/components/FeatureLandingPage';

const faqItems = [
  {
    question: 'What types of documents can Zush rename?',
    answer:
      'Zush supports PDFs, Word documents (DOC, DOCX), Excel spreadsheets (XLSX), PowerPoint presentations (PPTX, PPT), plain text files, Markdown, CSV, JSON, and EML email files. The AI reads the content of each file to generate an appropriate name.',
  },
  {
    question: 'How does Zush understand what a document is about?',
    answer:
      'Zush extracts text from your documents using format-specific parsers. For PDFs it reads the embedded text, for Word files it parses the document structure, and for spreadsheets it analyzes headers and data. The extracted content is then sent to an AI model that identifies the topic and generates a meaningful filename.',
  },
  {
    question: 'Is my document content sent to the cloud?',
    answer:
      'Zush sends extracted text snippets to the AI model for analysis. Only the minimum text necessary for generating a good filename is transmitted. Your full documents are never uploaded or stored on any server.',
  },
  {
    question: 'Can I set up a naming convention for all my documents?',
    answer:
      'Yes. Zush supports custom naming patterns where you can define templates like date-type-client or category-title. The AI follows your pattern while still generating context-aware names for each file.',
  },
  {
    question: 'Does it work with scanned documents?',
    answer:
      'For scanned PDFs that contain images of text, Zush uses AI vision models to read the content. Standard text-based PDFs are processed through text extraction for faster and more accurate results.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to rename documents with AI on macOS',
      description:
        'Use Zush to automatically rename document files based on their text content using AI on macOS.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add your documents',
          text: 'Drag and drop files or select a folder containing documents. Zush supports PDFs, Word, Excel, PowerPoint, text files, and more.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'AI extracts and analyzes text',
          text: 'Zush reads the text content of each document, identifies key topics, dates, and entities, then generates a descriptive filename.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply new names',
          text: 'Review the AI-suggested names, make any adjustments, and rename all your documents in a single batch.',
        },
      ],
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
  ],
};

const RenameDocumentsWithAI = () => (
  <FeatureLandingPage
    h1="Rename Documents with AI on macOS"
    definitionTitle="What is AI document renaming?"
    definitionText="AI document renaming reads the actual text content of your files — contracts, reports, invoices, presentations — and generates filenames that reflect what the document is about. No more opening dozens of files named 'Document1' or 'download (7)' to find the one you need."
    beforeAfterExamples={[
      { before: 'download (7).pdf', after: 'q1-revenue-report-march-2026.pdf' },
      { before: 'Document1.docx', after: 'project-proposal-client-acme.docx' },
      { before: 'Untitled spreadsheet.xlsx', after: 'employee-payroll-february-2026.xlsx' },
      { before: 'presentation_final_v3.pptx', after: 'marketing-strategy-q2-launch.pptx' },
      { before: 'note.txt', after: 'meeting-notes-product-roadmap-review.txt' },
    ]}
    supportedFormats={[
      'PDF', 'DOCX', 'DOC', 'XLSX', 'PPTX', 'PPT', 'TXT', 'MD', 'CSV', 'EML', 'JSON',
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'Finder', platform: 'macOS', aiPowered: 'No', batchRename: 'Sequential only', autoMonitor: 'No', freeTier: 'Yes' },
      { tool: 'Automator', platform: 'macOS', aiPowered: 'No', batchRename: 'Pattern-based', autoMonitor: 'No', freeTier: 'Yes' },
      { tool: 'Manual naming', platform: 'Any', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Yes' },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'AI Document Renamer', href: '/ai-document-renamer' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename Files with AI', href: '/rename-files-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'Rename PDF Files with AI on Mac', href: 'rename-pdf-files-with-ai-mac' },
      { title: 'File Naming Conventions Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'Organize Client Files as a Freelancer on Mac', href: 'organize-client-files-freelancers-mac' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameDocumentsWithAI;
