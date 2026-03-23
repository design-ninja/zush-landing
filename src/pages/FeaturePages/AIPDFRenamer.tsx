import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIPDFRenamer = () => (
  <FeatureLandingPage
    h1="AI PDF Renamer for macOS"
    definitionTitle="How AI PDF Renamers Work"
    definitionText="An AI PDF renamer extracts text from your PDF files — whether they contain selectable text or scanned images — and uses language models to identify key details like document type, parties, dates, and subject matter. Instead of opening each PDF to figure out what it is, the AI reads it for you and produces a filename that tells you everything at a glance. This is especially valuable for PDFs since they are among the most commonly downloaded and poorly named file types."
    beforeAfterExamples={[
      { before: 'scan0023.pdf', after: 'Invoice #8842 — Office Depot — February 2026.pdf' },
      { before: 'download (14).pdf', after: 'Non-Disclosure Agreement — Acme Corp — signed March 2026.pdf' },
      { before: 'Document.pdf', after: 'Machine Learning in Healthcare — Chen et al. 2025 — Nature.pdf' },
      { before: '2026-03-01_statement.pdf', after: 'Wells Fargo checking account statement — March 2026.pdf' },
      { before: 'form_2025.pdf', after: 'IRS Form W-2 — 2025 — Jane Smith.pdf' },
    ]}
    supportedFormats={['PDF']}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS (native)', aiPowered: 'Yes (text + vision)', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'Adobe Acrobat', platform: 'Cross-platform', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'No (subscription)' },
      { tool: 'Preview', platform: 'macOS', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Built-in' },
      { tool: 'Hazel', platform: 'macOS', aiPowered: 'No', batchRename: 'Rule-based', autoMonitor: 'Yes', freeTier: 'No (paid app)' },
      { tool: 'Manual renaming', platform: 'Any', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Free (your time)' },
    ]}
    faqItems={[
      {
        question: 'Can Zush rename scanned PDFs that don\'t have selectable text?',
        answer: 'Yes. When a PDF contains scanned images instead of selectable text, Zush uses vision AI to read the visible content. This works well for scanned invoices, letters, and forms where text is clearly printed.',
      },
      {
        question: 'How does Zush handle multi-page PDFs?',
        answer: 'Zush extracts text from across the document to understand its full context, not just the first page. For a 50-page contract, it identifies the document type, parties, and key terms to generate an accurate name.',
      },
      {
        question: 'Will renaming a PDF affect its contents or bookmarks?',
        answer: 'No. Zush only changes the filename on disk. The contents, bookmarks, annotations, and internal structure of the PDF remain completely untouched.',
      },
      {
        question: 'Can I rename password-protected PDFs?',
        answer: 'Zush needs to be able to read the PDF content to generate a meaningful name. If a PDF is encrypted and requires a password to open, Zush may not be able to extract text from it and will rely on any available metadata instead.',
      },
      {
        question: 'Is there a limit to how many PDFs I can rename?',
        answer: 'The free tier lets you test AI renaming at no cost. For heavier use, the Pro plan gives you 10,000 renames for a one-time $10 payment, or you can bring your own API key for unlimited renaming.',
      },
    ]}
    relatedPages={[
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'AI Document Renamer', href: '/ai-document-renamer' },
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'Rename PDF Files with AI on Mac', href: 'rename-pdf-files-with-ai-mac' },
      { title: 'File Naming Conventions & Best Practices', href: 'file-naming-conventions-best-practices' },
      { title: 'Batch Rename Files on Mac: Complete Guide', href: 'batch-rename-files-on-mac-complete-guide' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Zush',
          description: 'AI-powered PDF renamer for macOS that extracts text from PDFs and generates clear, descriptive filenames automatically.',
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
              name: "Can Zush rename scanned PDFs that don't have selectable text?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. When a PDF contains scanned images instead of selectable text, Zush uses vision AI to read the visible content. This works well for scanned invoices, letters, and forms where text is clearly printed.',
              },
            },
            {
              '@type': 'Question',
              name: 'How does Zush handle multi-page PDFs?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush extracts text from across the document to understand its full context, not just the first page. For a 50-page contract, it identifies the document type, parties, and key terms to generate an accurate name.',
              },
            },
            {
              '@type': 'Question',
              name: 'Will renaming a PDF affect its contents or bookmarks?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Zush only changes the filename on disk. The contents, bookmarks, annotations, and internal structure of the PDF remain completely untouched.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I rename password-protected PDFs?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush needs to be able to read the PDF content to generate a meaningful name. If a PDF is encrypted and requires a password to open, Zush may not be able to extract text from it and will rely on any available metadata instead.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is there a limit to how many PDFs I can rename?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The free tier lets you test AI renaming at no cost. For heavier use, the Pro plan gives you 10,000 renames for a one-time $10 payment, or you can bring your own API key for unlimited renaming.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AIPDFRenamer;
