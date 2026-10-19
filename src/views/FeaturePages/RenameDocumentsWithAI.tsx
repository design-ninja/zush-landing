import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'What types of non-PDF documents can Zush rename?',
    answer:
      'Zush supports 40 document, PDF, and ebook formats: EPUB and FB2 ebooks, Word documents, Excel spreadsheets, PowerPoint presentations, Pages, Numbers, Keynote, text, Markdown, CSV/TSV, JSON, XML/YAML, subtitles (SRT/VTT), RTF, OpenDocument files, and EML email files. The AI reads the content of each file to generate an appropriate name.',
  },
  {
    question: 'How does Zush understand what a document is about?',
    answer:
      'Zush extracts text from your documents using format-specific parsers. For Word files it parses the document structure, for spreadsheets it analyzes headers and data, for presentations it reads slide text, and for iWork files it can use temporary PDF export for analysis. The extracted content is then sent to an AI model that identifies the topic and generates a meaningful filename.',
  },
  {
    question: 'Is my document content sent to the cloud?',
    answer:
      'Zush sends extracted text snippets or temporary iWork PDF previews to the AI model for analysis. Only the content necessary for generating a good filename is transmitted, and Zush does not store your document content after processing as part of normal operation.',
  },
  {
    question: 'Can I set up a naming convention for all my documents?',
    answer:
      'Yes. Zush supports custom naming patterns where you can define templates like date-type-client or category-title. The AI follows your pattern while still generating context-aware names for each file.',
  },
  {
    question: 'Which Word and Excel formats can Zush rename?',
    answer:
      'Zush renames Word and OpenDocument text files (DOC, DOCX, DOCM, DOTX, DOTM, ODT, RTF) and Excel and OpenDocument spreadsheets (XLS, XLSX, XLSM, XLTX, XLTM, ODS), plus CSV and TSV. For Word files it reads headings, the opening text, and key entities; for spreadsheets it reads column headers, sheet names, and the data, so Book1.xlsx becomes Q2 Marketing Budget.xlsx and meeting_notes_FINAL_v2.docx becomes Q1 Board Meeting Notes.docx.',
  },
  {
    question: 'Will renaming break links to my Word or Excel files?',
    answer:
      'It can. Other workbooks, Power Query connections, macros, mail merges, and intranet pages point to a file by its path, and Zush does not update those references. Rename closed copies, check Data > Edit Links in any workbook that pulls numbers from the renamed files, and use Rename History if a name needs to go back.',
  },
  {
    question: 'Can I use a separate workflow for PDFs and scans?',
    answer:
      'Yes. Zush has a dedicated PDF workflow for invoices, contracts, and scans at the PDF page, while this page focuses on EPUB, FB2, DOCX, XLSX, PPTX, TXT, CSV, subtitle files, email exports, and other document-heavy files.',
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
        text: 'Drag and drop files or select a folder containing documents. Zush supports EPUB and FB2 ebooks, Word, Excel, PowerPoint, Pages, Numbers, Keynote, text files, subtitle files, email exports, OpenDocument files, and more.',
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
  page: {
    pagePath: '/rename-documents-with-ai',
    description:
      'AI document renamer that reads EPUB, FB2, DOCX, XLSX, PPTX, Pages, Numbers, Keynote, TXT, CSV, JSON, subtitles, OpenDocument, and email files to generate searchable filenames automatically.',
    featureList: [
      'Rename 40 document, PDF, and ebook formats including EPUB, FB2, DOCX, XLSX, PPTX, Pages, Numbers, Keynote, TXT, CSV, JSON, SRT, VTT, and EML',
      'Rename Word (DOC, DOCX, RTF, ODT) and Excel (XLS, XLSX, ODS, CSV) files by their content',
      'Extract document text, spreadsheet headers, and slide titles',
      'Batch rename document-heavy folders',
      'Custom naming patterns for client, date, and category',
      'Folder monitoring for ongoing document workflows',
      'Batch review for document-heavy folders',
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
    definitionText="Rename documents and ebooks with AI using Zush to read EPUB and FB2 books, reports, proposals, spreadsheets, iWork files, slide decks, and email exports, then generate filenames that match their content."
    directAnswerSection={{
      heading: 'How do I rename a folder of Word and Excel files by what is in them?',
      answer:
        'Add the DOCX, XLSX, and other files to Zush, pick a Template such as Date + AI Title, and review the suggestions before applying. Zush reads the document text and the spreadsheet headers, sheet names, and cell data, so Document1.docx becomes Client Proposal – Acme Redesign.docx and export (3).csv becomes March Sales Pipeline.csv. That avoids two common traps: Word suggests a filename from the first line you typed, and the built-in Title property is often left over from the template the file started from.',
      steps: [
        'Close the files. Check whether a mail merge, a linked Excel chart, Power Query, or another workbook points to any of them by path, since a rename breaks that link.',
        'Drop the folder into Zush and pick a Template. Contracts read well as Counterparty + Document Type + Date, finance sheets as Period + Department + AI Title, exports as Source + Date + AI Title.',
        'Review the suggestions. Replace a version tag such as final_v3 with a date, and watch for generic sheet names such as Sheet1, which give the AI less to work with.',
        'Apply the batch, reopen one renamed file and any dependent workbook to confirm links, and keep Rename History for anything you need to restore.',
      ],
    }}
    comparison={{
      eyebrow: 'Document renaming methods',
      title: 'Which way to rename Word and Excel files',
      intro: 'Word and Excel rename only the file you have open. For a folder of drafts and spreadsheets, the method depends on how many files you have and whether the name should come from what is inside them.',
      headers: { tool: 'Method', bestFor: 'Best for', gap: 'Where it stops' },
      rows: [
        {
          tool: 'Word or Excel Save As',
          bestFor: 'The one document or workbook you are editing right now',
          gap: 'One file at a time; Save As leaves the old copy behind, and Word suggests the first line, not the subject.',
        },
        {
          tool: 'Finder / File Explorer',
          bestFor: 'Adding the same prefix, date, or number to a selection',
          gap: 'Applies one rule to every file without opening any of them, so it cannot tell a budget from a payroll export.',
        },
        {
          tool: 'Scripts (VBA, PowerShell, Shortcuts)',
          bestFor: 'A fixed rule built from a cell value or field in a predictable template',
          gap: 'Breaks when the layout differs and needs maintenance.',
        },
        {
          tool: 'Document properties',
          bestFor: 'Searching by Title or Author inside Office and SharePoint',
          gap: 'Properties are often stale and do not change the filename people see in folders and email.',
        },
        {
          tool: 'Zush',
          bestFor: 'Mixed DOCX, DOC, RTF, ODT, XLSX, XLS, ODS, and CSV files that each need a name from their content, with preview and undo',
          gap: 'It does not edit document properties or update links in other files; rename closed copies and refresh dependent files afterwards.',
        },
      ],
    }}
    showcaseSlides={[
      {
        files: [
          { before: 'book_download.fb2.zip', after: 'The Master and Margarita – Mikhail Bulgakov.fb2.zip', type: 'doc', label: 'FB2.ZIP' },
          { before: 'Document1.docx', after: 'Project Proposal Acme.docx', type: 'doc' },
          { before: 'Untitled spreadsheet.xlsx', after: 'Employee Payroll Feb.xlsx', type: 'sheet' },
          { before: 'presentation_final_v3.key', after: 'Marketing Strategy Q2.key', type: 'slides', label: 'KEY' },
          { before: 'note.txt', after: 'Meeting Notes Roadmap.txt', type: 'doc' },
          { before: 'exports.csv', after: 'March Sales Pipeline.csv', type: 'sheet' },
        ],
      },
      {
        files: [
          { before: 'unknown_title.epub', after: 'Pride and Prejudice – Jane Austen.epub', type: 'doc', label: 'EPUB' },
          { before: 'meeting_notes.docx', after: 'Q1 Board Meeting Notes.docx', type: 'doc' },
          { before: 'budget_v2.xlsx', after: 'Q2 Marketing Budget.xlsx', type: 'sheet' },
          { before: 'deck_v12_final.key', after: 'Series A Pitch Deck.key', type: 'slides', label: 'KEY' },
          { before: 'readme.md', after: 'API Integration Guide.md', type: 'doc' },
          { before: 'data_export.csv', after: 'Customer Signup Log.csv', type: 'sheet' },
        ],
      },
      {
        files: [
          { before: 'policy_draft.docx', after: 'HR Policy Update.docx', type: 'doc' },
          { before: 'forecast_export.numbers', after: 'Revenue Forecast 2026.numbers', type: 'sheet', label: 'NUM' },
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
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Rename Videos with AI', href: '/rename-videos-with-ai' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'AI file renamer for Mac', href: '/mac' },
    ]}
    relatedBlogPosts={[
      { title: 'Batch rename EPUB and FB2 files by author and title', href: 'batch-rename-epub-fb2-files' },
      { title: 'AI Document Renamer: Auto-Name PDFs, Docs & Spreadsheets', href: 'ai-document-renamer-guide' },
      { title: 'File Naming Conventions Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'How to Rename PDF Files with AI on Windows', href: 'rename-pdf-files-with-ai-windows' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameDocumentsWithAI;
