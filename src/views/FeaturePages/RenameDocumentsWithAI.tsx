import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'What types of non-PDF documents can Zush rename?',
    answer:
      'Zush supports Word documents (DOC, DOCX), Excel spreadsheets (XLSX), PowerPoint presentations (PPTX, PPT), plain text files, Markdown, CSV, JSON, and EML email files. The AI reads the content of each file to generate an appropriate name.',
  },
  {
    question: 'How does Zush understand what a document is about?',
    answer:
      'Zush extracts text from your documents using format-specific parsers. For Word files it parses the document structure, for spreadsheets it analyzes headers and data, and for presentations it reads slide text. The extracted content is then sent to an AI model that identifies the topic and generates a meaningful filename.',
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
    question: 'Can I use a separate workflow for PDFs and scans?',
    answer:
      'Yes. Zush has a dedicated PDF workflow for invoices, contracts, and scans at the PDF page, while this page focuses on DOCX, XLSX, PPTX, TXT, CSV, and other document-heavy files.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Documents with AI',
    description:
      'Use Zush to automatically rename document files based on their text content using AI.',
    steps: [
      {
        name: 'Add your documents',
        text: 'Drag and drop files or select a folder containing documents. Zush supports Word, Excel, PowerPoint, text files, email exports, and more.',
      },
      {
        name: 'AI extracts and analyzes text',
        text: 'Zush reads the text content of each document, identifies key topics, dates, and entities, then generates a descriptive filename.',
      },
      {
        name: 'Apply new names',
        text: 'Review the AI-suggested names, make any adjustments, and rename all your documents in a single batch.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-documents-with-ai',
    description:
      'AI document renamer that reads DOCX, XLSX, PPTX, TXT, CSV, JSON, and email files to generate searchable filenames automatically.',
    featureList: [
      'Rename DOCX, XLSX, PPTX, TXT, CSV, JSON, and EML files',
      'Extract document text, spreadsheet headers, and slide titles',
      'Batch rename document-heavy folders',
      'Custom naming patterns for client, date, and category',
      'Folder monitoring for ongoing document workflows',
      'Undo and rename history',
    ],
  },
});

const RenameDocumentsWithAI = () => (
  <FeatureLandingPage
    h1="Rename Documents with AI"
    h1Accent="Rename Documents"
    category="document"
    definitionTitle="What Is AI Document Renaming?"
    definitionText="Rename documents with AI using Zush to read reports, proposals, spreadsheets, slide decks, and email exports, then generate filenames that match the document content."
    showcaseSlides={[
      {
        files: [
          { before: 'Document1.docx', after: 'Project Proposal Acme.docx', type: 'doc' },
          { before: 'Untitled spreadsheet.xlsx', after: 'Employee Payroll Feb.xlsx', type: 'sheet' },
          { before: 'presentation_final_v3.pptx', after: 'Marketing Strategy Q2.pptx', type: 'slides' },
          { before: 'note.txt', after: 'Meeting Notes Roadmap.txt', type: 'doc' },
          { before: 'exports.csv', after: 'March Sales Pipeline.csv', type: 'sheet' },
          { before: 'inbox-export.eml', after: 'Vendor Renewal Thread.eml', type: 'doc' },
        ],
      },
      {
        files: [
          { before: 'meeting_notes.docx', after: 'Q1 Board Meeting Notes.docx', type: 'doc' },
          { before: 'budget_v2.xlsx', after: 'Q2 Marketing Budget.xlsx', type: 'sheet' },
          { before: 'deck_v12_final.pptx', after: 'Series A Pitch Deck.pptx', type: 'slides' },
          { before: 'readme.md', after: 'API Integration Guide.md', type: 'doc' },
          { before: 'data_export.csv', after: 'Customer Signup Log.csv', type: 'sheet' },
          { before: 'contract_clean.docx', after: 'Vendor NDA Final.docx', type: 'doc' },
        ],
      },
      {
        files: [
          { before: 'policy_draft.docx', after: 'HR Policy Update.docx', type: 'doc' },
          { before: 'forecast_export.xlsx', after: 'Revenue Forecast 2026.xlsx', type: 'sheet' },
          { before: 'board_review.pptx', after: 'Q1 Board Deck.pptx', type: 'slides' },
          { before: 'transcript.txt', after: 'Interview Transcript Raw.txt', type: 'doc' },
          { before: 'metrics.json', after: 'User Analytics Export.json', type: 'doc' },
          { before: 'sales-kickoff.pptx', after: 'Sales Kickoff Slides.pptx', type: 'slides' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
      { title: 'Auto Rename Files with AI', href: '/auto-rename-files' },
    ]}
    relatedBlogPosts={[
      { title: 'AI Document Renamer: How to Auto-Name Docs, PDFs & Spreadsheets', href: 'ai-document-renamer-guide' },
      { title: 'File Naming Conventions Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'How to Rename PDF Files with AI on Windows', href: 'rename-pdf-files-with-ai-windows' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameDocumentsWithAI;
