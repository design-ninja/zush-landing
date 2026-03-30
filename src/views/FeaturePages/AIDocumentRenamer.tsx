import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIDocumentRenamer = () => (
  <FeatureLandingPage
    h1="AI Document Renamer for macOS"
    category="document"
    definitionTitle="What Is an AI Document Renamer?"
    definitionText="An AI document renamer reads the text content of your files and generates filenames that make sense without opening them."
    showcaseSlides={[{
      files: [
        { before: 'download (7).pdf', after: 'Master Services Agreement.pdf', type: 'pdf' },
        { before: 'Invoice_final_FINAL.docx', after: 'Invoice WebDev Studio.docx', type: 'doc' },
        { before: 'Report.xlsx', after: 'Q1 Sales Report NE.xlsx', type: 'sheet' },
        { before: 'Presentation1.pptx', after: 'Series A Pitch Deck.pptx', type: 'slides' },
        { before: 'Fwd_ Important.eml', after: 'Vendor Contract Renewal.eml', type: 'doc' },
        { before: 'budget_draft.xlsx', after: 'Marketing Budget Q2.xlsx', type: 'sheet' },
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
