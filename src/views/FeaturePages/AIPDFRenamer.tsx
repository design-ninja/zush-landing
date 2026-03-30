import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIPDFRenamer = () => (
  <FeatureLandingPage
    h1="AI PDF Renamer for macOS"
    category="pdf"
    definitionTitle="What Is an AI PDF Renamer?"
    definitionText="An AI PDF renamer extracts text from your PDFs and generates filenames that tell you what each document contains at a glance."
    showcaseSlides={[{
      files: [
        { before: 'scan0023.pdf', after: 'Office Depot Invoice.pdf', type: 'pdf' },
        { before: 'download (14).pdf', after: 'NDA Acme Corp Signed.pdf', type: 'pdf' },
        { before: 'Document.pdf', after: 'ML Healthcare Paper.pdf', type: 'pdf' },
        { before: '2026-03-01_statement.pdf', after: 'Wells Fargo Statement.pdf', type: 'pdf' },
        { before: 'form_2025.pdf', after: 'IRS Form W-2 2025.pdf', type: 'pdf' },
        { before: 'contract_draft.pdf', after: 'Service Agreement.pdf', type: 'pdf' },
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
