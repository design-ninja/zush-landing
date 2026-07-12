import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Which spreadsheet formats can Zush rename?',
    answer:
      'Zush supports Excel and OpenDocument spreadsheet formats including XLS, XLSX, XLSM, XLTX, XLTM, and ODS, plus CSV and TSV data files. The AI reads the content of each file — headers, sheet names, and data — to generate a descriptive name.',
  },
  {
    question: 'How does Zush know what a spreadsheet is about?',
    answer:
      'Zush analyzes the spreadsheet content: it reads column headers, sheet names, and the data itself, then sends the extracted content to an AI model that identifies the topic and generates a meaningful filename like "Q2 Marketing Budget" instead of "Book1".',
  },
  {
    question: 'Can I bulk rename a folder of Excel files?',
    answer:
      'Yes. Drop a folder of spreadsheets into Zush, review the suggested names, choose a naming pattern, and apply the whole batch at once. You can mix XLSX, CSV, and other files in the same folder.',
  },
  {
    question: 'Can I set a naming convention for all my spreadsheets?',
    answer:
      'Yes. Combine an AI title with dates, categories, clients, and your own Custom AI Blocks using templates and Naming Blocks, so every spreadsheet follows the same pattern.',
  },
  {
    question: 'Is my spreadsheet data sent to the cloud?',
    answer:
      'You choose the mode. Managed cloud is the default, BYOK uses your own provider key, and Offline AI mode analyzes files with a local Ollama model so supported file analysis never leaves your device. Only the content needed to generate a good filename is used, and files are renamed in place.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Excel files with AI',
    description:
      'Use Zush to rename Excel and spreadsheet files by their content using AI on Mac and Windows.',
    steps: [
      {
        name: 'Add your spreadsheets',
        text: 'Drag and drop files or select a folder of XLSX, XLS, XLSM, ODS, CSV, or TSV files.',
      },
      {
        name: 'AI reads the content',
        text: 'Zush analyzes column headers, sheet names, and data, then generates a descriptive filename for each spreadsheet.',
      },
      {
        name: 'Review and apply',
        text: 'Review the AI-suggested names, adjust the pattern if needed, and rename the whole batch with undo history available.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-excel-files-with-ai',
    description:
      'AI Excel renamer that reads XLSX, XLS, XLSM, ODS, CSV, and TSV content — headers, sheet names, and data — to generate searchable spreadsheet filenames automatically.',
    featureList: [
      'Rename Excel and spreadsheet formats: XLS, XLSX, XLSM, XLTX, XLTM, ODS, CSV, TSV',
      'Read column headers, sheet names, and data to name files by content',
      'Bulk rename folders of spreadsheets in one batch',
      'Custom naming patterns for date, client, and category',
      'Folder monitoring for ongoing spreadsheet workflows',
      'Private modes: BYOK and Offline AI',
      'Preview every filename and undo any batch',
    ],
  },
});

const RenameExcelFilesWithAI = () => (
  <FeatureLandingPage
    h1="Rename Excel Files with AI"
    h1Accent="Rename Excel Files"
    category="document"
    definitionTitle="What Is AI Excel File Renaming?"
    definitionText="Rename Excel files with AI using Zush to read column headers, sheet names, and data, then generate filenames that describe what each spreadsheet actually contains — turning Book1.xlsx and Untitled spreadsheet.xlsx into names you can search."
    showcaseSlides={[
      {
        files: [
          { before: 'Book1.xlsx', after: 'Q2 Marketing Budget.xlsx', type: 'sheet' },
          { before: 'Untitled spreadsheet.xlsx', after: 'Employee Payroll Feb.xlsx', type: 'sheet' },
          { before: 'export (3).csv', after: 'March Sales Pipeline.csv', type: 'sheet' },
          { before: 'Copy of Copy of data.xlsx', after: 'Product Launch Budget.xlsx', type: 'sheet' },
          { before: 'sheet_final_v2.xlsx', after: 'Q1 Revenue Forecast.xlsx', type: 'sheet' },
          { before: 'download.csv', after: 'Customer Signup Log.csv', type: 'sheet' },
        ],
      },
      {
        files: [
          { before: 'budget_v2.xlsx', after: 'Annual Operating Budget 2026.xlsx', type: 'sheet' },
          { before: 'inventory.csv', after: 'Warehouse Inventory June.csv', type: 'sheet' },
          { before: 'Untitled 1.xlsm', after: 'Expense Report Macro.xlsm', type: 'sheet' },
          { before: 'metrics_export.xlsx', after: 'Website Traffic Q2.xlsx', type: 'sheet' },
          { before: 'data (7).csv', after: 'Email Campaign Results.csv', type: 'sheet' },
          { before: 'Book2.xlsx', after: 'Team Capacity Planning.xlsx', type: 'sheet' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'Rename Word Documents with AI', href: '/rename-word-documents-with-ai' },
      { title: 'Batch Rename Files with AI', href: '/batch-rename-files' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Zush for Mac', href: '/mac' },
    ]}
    relatedBlogPosts={[
      { title: 'AI Document Renamer: How to Auto-Name Docs, PDFs & Spreadsheets', href: 'ai-document-renamer-guide' },
      { title: 'File Naming Conventions Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'Naming Blocks File Naming Guide', href: 'naming-blocks-file-naming-guide' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameExcelFilesWithAI;
