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
    category="document"
    definitionTitle="What Is AI Document Renaming?"
    definitionText="AI document renaming reads the text content of your contracts, reports, and invoices, then generates filenames that reflect what each document is about."
    showcaseSlides={[{
      files: [
        { before: 'download (7).pdf', after: 'Q1 Revenue Report.pdf', type: 'pdf' },
        { before: 'Document1.docx', after: 'Project Proposal Acme.docx', type: 'doc' },
        { before: 'Untitled spreadsheet.xlsx', after: 'Employee Payroll Feb.xlsx', type: 'sheet' },
        { before: 'presentation_final_v3.pptx', after: 'Marketing Strategy Q2.pptx', type: 'slides' },
        { before: 'note.txt', after: 'Meeting Notes Roadmap.txt', type: 'doc' },
        { before: 'report_copy.pdf', after: 'Annual Budget Review.pdf', type: 'pdf' },
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
