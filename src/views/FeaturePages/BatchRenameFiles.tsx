import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

const BatchRenameFiles = () => (
  <FeatureLandingPage
    h1="Batch Rename Files on Mac"
    h1Accent="Batch Rename"
    category="general"
    definitionTitle="What Is Batch File Renaming on Mac?"
    definitionText="Batch rename (bulk rename) hundreds of files at once. Zush AI reads each file and gives it a unique descriptive name — not a shared prefix or counter."
    showcaseSlides={[
      {
        files: [
          { before: 'IMG_4201.HEIC', after: 'Sagrada Familia Evening.heic', img: '/images/examples/sagrada.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-12 10.44.png', after: 'Stripe Revenue Dashboard.png', img: '/images/examples/dashboard.jpg', type: 'image' },
          { before: 'document (3).pdf', after: 'Lease Agreement Signed 2026.pdf', type: 'pdf' },
          { before: 'meeting_notes_v7.docx', after: 'Q1 Board Meeting Notes.docx', type: 'doc' },
          { before: 'budget_copy(2).xlsx', after: 'Q2 Marketing Budget.xlsx', type: 'sheet' },
          { before: 'deck_v12_final.pptx', after: 'Series A Pitch Deck.pptx', type: 'slides' },
        ],
      },
      {
        files: [
          { before: 'CAM00847.jpg', after: 'Black Ford Mustang.jpg', img: '/images/examples/car.jpg', type: 'image' },
          { before: 'IMG_5523.HEIC', after: 'Golden Retriever at Park.heic', img: '/images/examples/dog.jpg', type: 'image' },
          { before: 'download (14).pdf', after: 'IRS W-9 Form Signed.pdf', type: 'pdf' },
          { before: 'Untitled spreadsheet.xlsx', after: 'Sales Pipeline March.xlsx', type: 'sheet' },
          { before: 'notes_final_v3.docx', after: 'Vendor Contract Notes.docx', type: 'doc' },
          { before: 'sales-kickoff(3).pptx', after: 'Sales Kickoff Slides.pptx', type: 'slides' },
        ],
      },
      {
        files: [
          { before: 'PXL_20240720_091234.jpg', after: 'Yellow Wildflowers Field.jpg', img: '/images/examples/flowers.jpg', type: 'image' },
          { before: 'Photo-2026-03-18.jpg', after: 'Italian Restaurant Menu.jpg', img: '/images/examples/food.jpg', type: 'image' },
          { before: 'scan_0019.pdf', after: 'Medical Lab Results.pdf', type: 'pdf' },
          { before: 'forecast_export.xlsx', after: 'Revenue Forecast 2026.xlsx', type: 'sheet' },
          { before: 'client-brief-scan.pdf', after: 'Acme Creative Brief.pdf', type: 'pdf' },
          { before: 'marketing-review-v5.pptx', after: 'Campaign Review Slides.pptx', type: 'slides' },
        ],
      },
    ]}
    faqItems={[
      {
        question: 'Is "batch rename" the same as "bulk rename" on Mac?',
        answer: 'Functionally yes — both terms describe renaming many files at once in one operation. "Batch rename" is the standard term on macOS (Finder calls its built-in tool "Rename Finder Items" and every Apple tutorial uses "batch"). "Bulk rename" is more common on Windows because of the popular Bulk Rename Utility. This page uses both terms interchangeably.',
      },
      {
        question: 'How many files can Zush batch rename at once?',
        answer: 'There is no hard limit. Zush has been tested with folders of 2,000+ files. Processing speed depends on file type and AI model — screenshots and small images typically take 1–2 seconds each, PDFs and RAW photos a little longer. Batches run in parallel, so a 400-file folder is usually done in a few minutes.',
      },
      {
        question: 'How is AI batch renaming different from Finder\'s built-in batch rename?',
        answer: 'Finder\'s batch rename can only apply the same rule to every file — replace text, add a prefix, or number files sequentially. It cannot read what is inside the file. Zush reads each file\'s content and generates a unique descriptive name, so "IMG_4201.jpg, IMG_4202.jpg, IMG_4203.jpg" become three different meaningful names like "Barcelona Sagrada Familia.jpg, Park Guell Bench.jpg, Tapas Dinner.jpg".',
      },
      {
        question: 'Can I undo a batch rename if the AI gets names wrong?',
        answer: 'Yes. Every rename is logged in Zush history and can be reverted with one click — individually or as an entire batch. You can also enable preview mode, which shows all AI-suggested names before applying them, so you can approve or edit names before any file is touched.',
      },
      {
        question: 'Does batch rename work with RAW photos, HEIC, PDFs and DOCX?',
        answer: 'Yes. Zush supports 22+ formats including JPG, PNG, HEIC, CR2/NEF/ARW RAW, PDF, DOCX, XLSX, PPTX, TXT, CSV and more. Mixed-format folders (photos + PDFs + documents together) work in a single batch.',
      },
      {
        question: 'Is there a free version for batch renaming?',
        answer: 'Yes. Zush includes 50 free AI renames with no signup and no credit card. That is enough to clean up a Downloads folder or a screenshot archive. Pro is a one-time $10 purchase for 10,000 renames — no subscription. BYOK (Bring Your Own Key) gives unlimited renames at provider cost.',
      },
    ]}
    relatedPages={[
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
      { title: 'Auto Rename Files on Mac', href: '/auto-rename-files' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Batch Rename Files on Mac (2026): 4 Methods Tested', href: 'batch-rename-files-on-mac-complete-guide' },
      { title: 'macOS Automator: Rename Files Guide', href: 'macos-automator-rename-files-guide' },
      { title: 'Best AI File Renamer for Mac (2026): 6 Tools Compared', href: 'best-ai-file-renamer-tools-mac-compared' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'How to Batch Rename Files on Mac with AI',
          description: 'Batch rename many files at once on macOS using Zush. AI reads each file\'s content and generates unique descriptive names — not just a shared prefix or counter.',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Select a folder or drop files',
              text: 'Drag a folder or a selection of files into Zush. Mixed formats (photos, PDFs, documents) work in one batch.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Review AI-generated names',
              text: 'Zush analyzes every file in parallel and shows a preview of the new name next to the original. Edit any name inline before applying.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Apply or roll back',
              text: 'Apply the entire batch with one click. Every rename is logged in history so you can revert single files or the whole batch later.',
            },
          ],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'meta[name="description"]'],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is "batch rename" the same as "bulk rename" on Mac?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Functionally yes — both terms describe renaming many files at once in one operation. "Batch rename" is the standard term on macOS (Finder calls its built-in tool "Rename Finder Items" and every Apple tutorial uses "batch"). "Bulk rename" is more common on Windows because of the popular Bulk Rename Utility. This page uses both terms interchangeably.',
              },
            },
            {
              '@type': 'Question',
              name: 'How many files can Zush batch rename at once?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'There is no hard limit. Zush has been tested with folders of 2,000+ files. Processing speed depends on file type and AI model — screenshots and small images typically take 1–2 seconds each, PDFs and RAW photos a little longer. Batches run in parallel, so a 400-file folder is usually done in a few minutes.',
              },
            },
            {
              '@type': 'Question',
              name: "How is AI batch renaming different from Finder's built-in batch rename?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Finder's batch rename can only apply the same rule to every file — replace text, add a prefix, or number files sequentially. It cannot read what is inside the file. Zush reads each file's content and generates a unique descriptive name.",
              },
            },
            {
              '@type': 'Question',
              name: 'Can I undo a batch rename if the AI gets names wrong?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Every rename is logged in Zush history and can be reverted with one click — individually or as an entire batch. You can also enable preview mode, which shows all AI-suggested names before applying them.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does batch rename work with RAW photos, HEIC, PDFs and DOCX?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush supports 22+ formats including JPG, PNG, HEIC, CR2/NEF/ARW RAW, PDF, DOCX, XLSX, PPTX, TXT, CSV and more. Mixed-format folders work in a single batch.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is there a free version for batch renaming?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush includes 50 free AI renames with no signup and no credit card. Pro is a one-time $10 purchase for 10,000 renames — no subscription. BYOK gives unlimited renames at provider cost.',
              },
            },
          ],
        },
        buildSoftwareApplicationJsonLd({
          pagePath: '/batch-rename-files',
          description:
            'Batch rename hundreds of files on Mac using AI. Zush generates unique descriptive names for photos, PDFs, documents and screenshots — not just prefixes or counters.',
          featureList: [
            'AI-powered batch rename for mixed-format folders',
            'Unique descriptive names per file (not shared prefix)',
            'Preview and edit names before applying',
            'Full rollback history for every batch',
            'Support for 22+ formats including RAW and HEIC',
            'Folder monitoring for ongoing batches',
            'One-time $10 Pro (no subscription)',
          ],
        }),
      ],
    }}
  />
);

export default BatchRenameFiles;
