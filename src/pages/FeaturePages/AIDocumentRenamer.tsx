import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIDocumentRenamer = () => (
  <FeatureLandingPage
    h1="AI Document Renamer for macOS"
    definitionTitle="Why Documents Need AI Renaming"
    definitionText="Every day, files land on your Mac named 'download.pdf', 'Document (3).docx', or 'Untitled.xlsx'. You know what's inside, but the filename tells you nothing. An AI document renamer reads the actual text content of your files — extracting titles, dates, names, and topics — and generates filenames that make sense without opening the file. It turns document chaos into an organized, searchable library."
    beforeAfterExamples={[
      { before: 'download (7).pdf', after: 'Master Services Agreement — Acme Corp — 2026.pdf' },
      { before: 'Invoice_final_FINAL.docx', after: 'Invoice #4821 — WebDev Studio — March 2026.docx' },
      { before: 'Report.xlsx', after: 'Q1 2026 Sales Report — Northeast Region.xlsx' },
      { before: 'Presentation1.pptx', after: 'Series A Pitch Deck — TechStartup Inc.pptx' },
      { before: 'Fwd_ Important.eml', after: 'Email — Vendor contract renewal notice — March 15 2026.eml' },
    ]}
    supportedFormats={[
      'PDF', 'DOCX', 'DOC', 'XLSX', 'PPTX', 'PPT', 'TXT', 'MD', 'CSV', 'EML', 'JSON',
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS (native)', aiPowered: 'Yes (text + vision)', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'Finder', platform: 'macOS', aiPowered: 'No', batchRename: 'Basic only', autoMonitor: 'No', freeTier: 'Built-in' },
      { tool: 'Automator', platform: 'macOS', aiPowered: 'No', batchRename: 'Rule-based', autoMonitor: 'Limited', freeTier: 'Built-in' },
      { tool: 'Adobe Acrobat', platform: 'Cross-platform', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'No (subscription)' },
      { tool: 'Manual conventions', platform: 'Any', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Free (your time)' },
    ]}
    faqItems={[
      {
        question: 'What types of documents can Zush rename?',
        answer: 'Zush supports PDFs, Word documents (DOC, DOCX), Excel spreadsheets (XLSX), PowerPoint presentations (PPT, PPTX), plain text files (TXT, MD, CSV), emails (EML), and JSON files. It extracts the text content from each format to understand what the document is about.',
      },
      {
        question: 'Can Zush rename scanned documents that are just images?',
        answer: 'If a PDF contains embedded images rather than selectable text, Zush uses its vision AI to analyze the visual content. This works well for scanned letters, receipts, and forms where the text is clearly visible in the scan.',
      },
      {
        question: 'Will renaming break links or references to my documents?',
        answer: 'Zush renames the file on disk, so any existing shortcuts, aliases, or links that reference the old filename will need to be updated. It is a good idea to rename files as they arrive rather than after they have been linked elsewhere.',
      },
      {
        question: 'How does AI document renaming compare to naming conventions?',
        answer: 'Manual naming conventions require discipline and consistency across a team. AI renaming applies structure automatically based on the content itself, which means even files from external sources get named consistently without any effort.',
      },
      {
        question: 'Can I use Zush for documents in languages other than English?',
        answer: 'Yes. Zush supports over 60 languages for generated filenames. The AI can read document content in most major languages and produce names in your preferred language, which is especially useful for international teams or multilingual document workflows.',
      },
    ]}
    relatedPages={[
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'AI PDF Renamer', href: '/ai-pdf-renamer' },
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'Rename PDF Files with AI on Mac', href: 'rename-pdf-files-with-ai-mac' },
      { title: 'File Naming Conventions & Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'How to Organize Client Files as a Freelancer on Mac', href: 'organize-client-files-freelancers-mac' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Zush',
          description: 'AI-powered document renamer for macOS that reads file content and generates descriptive, organized filenames automatically.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'macOS 14.0+',
          offers: [
            {
              '@type': 'Offer',
              name: 'Free',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free tier available',
            },
            {
              '@type': 'Offer',
              name: 'Pro',
              price: '10',
              priceCurrency: 'USD',
              description: '10,000 AI renames, one-time payment',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What types of documents can Zush rename?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush supports PDFs, Word documents (DOC, DOCX), Excel spreadsheets (XLSX), PowerPoint presentations (PPT, PPTX), plain text files (TXT, MD, CSV), emails (EML), and JSON files. It extracts the text content from each format to understand what the document is about.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can Zush rename scanned documents that are just images?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'If a PDF contains embedded images rather than selectable text, Zush uses its vision AI to analyze the visual content. This works well for scanned letters, receipts, and forms where the text is clearly visible in the scan.',
              },
            },
            {
              '@type': 'Question',
              name: 'Will renaming break links or references to my documents?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush renames the file on disk, so any existing shortcuts, aliases, or links that reference the old filename will need to be updated. It is a good idea to rename files as they arrive rather than after they have been linked elsewhere.',
              },
            },
            {
              '@type': 'Question',
              name: 'How does AI document renaming compare to naming conventions?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Manual naming conventions require discipline and consistency across a team. AI renaming applies structure automatically based on the content itself, which means even files from external sources get named consistently without any effort.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I use Zush for documents in languages other than English?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush supports over 60 languages for generated filenames. The AI can read document content in most major languages and produce names in your preferred language, which is especially useful for international teams or multilingual document workflows.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AIDocumentRenamer;
