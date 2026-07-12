import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Which Word formats can Zush rename?',
    answer:
      'Zush supports Word and OpenDocument text formats including DOC, DOCX, DOCM, DOTX, DOTM, and ODT, plus RTF. The AI reads the document text to generate a descriptive name based on what the file is about.',
  },
  {
    question: 'How does Zush understand what a Word document contains?',
    answer:
      'Zush parses the document structure and extracts the text — headings, the opening content, and key entities — then sends it to an AI model that identifies the topic and generates a meaningful filename, turning "meeting_notes_FINAL_v2.docx" into "Q1 Board Meeting Notes".',
  },
  {
    question: 'Can I batch rename a folder of Word documents?',
    answer:
      'Yes. Drop a folder of DOCX files into Zush, review the suggested names, choose a naming pattern, and apply the whole batch at once. Mixed folders with other document types work too.',
  },
  {
    question: 'Can I set a naming convention for all my documents?',
    answer:
      'Yes. Combine an AI title with dates, categories, clients, and your own Custom AI Blocks using templates and Naming Blocks, so every document follows the same convention.',
  },
  {
    question: 'How is this different from the general documents page?',
    answer:
      'This page focuses on Word documents specifically — DOCX and related formats. Zush also renames spreadsheets, presentations, PDFs, and other document types; see the Rename Documents with AI page for the full document workflow.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Word documents with AI',
    description:
      'Use Zush to rename Word documents by their text content using AI on Mac and Windows.',
    steps: [
      {
        name: 'Add your Word documents',
        text: 'Drag and drop files or select a folder of DOCX, DOC, DOTX, ODT, or RTF files.',
      },
      {
        name: 'AI reads the text',
        text: 'Zush extracts the document text, identifies the topic, dates, and entities, then generates a descriptive filename.',
      },
      {
        name: 'Review and apply',
        text: 'Review the AI-suggested names, adjust the pattern if needed, and rename the whole batch with undo history available.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-word-documents-with-ai',
    description:
      'AI Word document renamer that reads DOCX, DOC, DOTX, ODT, and RTF content to generate searchable filenames automatically on Mac and Windows.',
    featureList: [
      'Rename Word and text formats: DOC, DOCX, DOCM, DOTX, DOTM, ODT, RTF',
      'Read document text and headings to name files by content',
      'Batch rename folders of Word documents in one pass',
      'Custom naming patterns for date, client, and category',
      'Folder monitoring for ongoing document workflows',
      'Private modes: BYOK and Offline AI',
      'Preview every filename and undo any batch',
    ],
  },
});

const RenameWordDocumentsWithAI = () => (
  <FeatureLandingPage
    h1="Rename Word Documents with AI"
    h1Accent="Rename Word Documents"
    category="document"
    definitionTitle="What Is AI Word Document Renaming?"
    definitionText="Rename Word documents with AI using Zush to read the text inside each DOCX file — headings, opening content, and key entities — then generate a filename that matches what the document is about, turning FINAL_v2_REALLY_FINAL.docx into a name you can actually search."
    showcaseSlides={[
      {
        files: [
          { before: 'Document1.docx', after: 'Project Proposal Acme.docx', type: 'doc' },
          { before: 'meeting_notes_FINAL_v2.docx', after: 'Q1 Board Meeting Notes.docx', type: 'doc' },
          { before: 'contract_clean.docx', after: 'Vendor NDA Final.docx', type: 'doc' },
          { before: 'essay draft.docx', after: 'Renaissance Art History Essay.docx', type: 'doc' },
          { before: 'letter.docx', after: 'Landlord Notice to Vacate.docx', type: 'doc' },
          { before: 'Copy of report.docx', after: 'Q2 Sales Report.docx', type: 'doc' },
        ],
      },
      {
        files: [
          { before: 'policy_draft.docx', after: 'HR Remote Work Policy.docx', type: 'doc' },
          { before: 'notes.docx', after: 'Client Discovery Notes.docx', type: 'doc' },
          { before: 'resume_final.docx', after: 'Jane Doe Resume 2026.docx', type: 'doc' },
          { before: 'chapter1.docx', after: 'Novel Draft Chapter One.docx', type: 'doc' },
          { before: 'invoice_terms.docx', after: 'Freelance Contract Terms.docx', type: 'doc' },
          { before: 'agenda.docx', after: 'Weekly Standup Agenda.docx', type: 'doc' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'Rename Excel Files with AI', href: '/rename-excel-files-with-ai' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Zush for Mac', href: '/mac' },
    ]}
    relatedBlogPosts={[
      { title: 'AI Document Renamer: How to Auto-Name Docs, PDFs & Spreadsheets', href: 'ai-document-renamer-guide' },
      { title: 'File Naming Conventions Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'File Organization Tips for Students', href: 'file-organization-tips-students-mac' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameWordDocumentsWithAI;
