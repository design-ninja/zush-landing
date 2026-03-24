import FeatureLandingPage from '@/components/FeatureLandingPage';

const RenameFilesWithAI = () => (
  <FeatureLandingPage
    h1="Rename Files with AI on macOS"
    definitionTitle="What Is AI File Renaming?"
    definitionText="AI file renaming uses vision and language models to analyze file content and generate descriptive, searchable names automatically."
    showcaseSlides={[{
      files: [
        { before: 'Screenshot 2026-03-14.png', after: 'Slack Project Timeline.png', img: '/images/examples/dashboard.jpg', type: 'image' },
        { before: 'IMG_4892.HEIC', after: 'Golden Retriever Sunset.heic', img: '/images/examples/dog.jpg', type: 'image' },
        { before: 'Document (3).pdf', after: 'Chase Bank Statement.pdf', type: 'pdf' },
        { before: 'DSC_0041.jpg', after: 'White Sneakers On Marble.jpg', img: '/images/examples/car.jpg', type: 'image' },
        { before: 'Untitled spreadsheet.xlsx', after: 'Q1 Marketing Budget.xlsx', type: 'sheet' },
        { before: 'scan0012.pdf', after: 'Apartment Lease Agreement.pdf', type: 'pdf' },
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
        question: 'Is AI file renaming actually accurate?',
        answer: 'Modern vision and language models are remarkably good at understanding file content. Zush uses state-of-the-art AI to analyze images, documents, and other files, producing accurate and descriptive names the vast majority of the time. You can always review suggestions before applying them.',
      },
      {
        question: 'Can I rename files with AI for free?',
        answer: 'Yes. Zush offers a generous free tier with no credit card or account required. If you need more, the Pro plan is a one-time $10 payment for 10,000 renames, or you can bring your own API key for unlimited use.',
      },
      {
        question: 'What types of files can AI rename?',
        answer: 'Zush supports a wide range of file types including images (PNG, JPG, HEIC, RAW formats), documents (PDF, DOCX, PPTX, XLSX), and plain text files (TXT, MD, CSV, JSON). It uses vision AI for images and text extraction for documents to understand what each file contains.',
      },
      {
        question: 'Does the AI send my files to the cloud?',
        answer: 'Zush sends file content to AI providers (like OpenAI or Anthropic) for analysis, but nothing is stored on their servers after processing. If privacy is a top concern, you can use your own API key with the BYOK option for full control over which provider handles your data.',
      },
      {
        question: 'Can I customize the naming format?',
        answer: 'Absolutely. Zush supports custom naming patterns so you can define your own structure — for example, adding dates, categories, or specific prefixes. You can also choose from over 60 languages for the generated names, making it useful for international workflows.',
      },
    ]}
    relatedPages={[
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
      { title: 'Auto Rename Files on macOS', href: '/auto-rename-files' },
      { title: 'Rename Images with AI', href: '/rename-images-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'Best AI File Renamer Tools for Mac Compared', href: 'best-ai-file-renamer-tools-mac-compared' },
      { title: 'Batch Rename Files on Mac: Complete Guide', href: 'batch-rename-files-on-mac-complete-guide' },
      { title: 'File Naming Conventions & Best Practices', href: 'file-naming-conventions-best-practices' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'How to Rename Files with AI on macOS',
          description: 'Use Zush to automatically rename files on your Mac using AI that analyzes file content and generates descriptive names.',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Download Zush',
              text: 'Install the free Zush app on your Mac. No account or credit card required.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Add your files',
              text: 'Drag and drop files or folders into Zush, or set up a watched folder for automatic detection.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Get AI-generated names',
              text: 'Zush analyzes each file with AI and suggests descriptive names. Review and apply them with one click.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is AI file renaming actually accurate?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Modern vision and language models are remarkably good at understanding file content. Zush uses state-of-the-art AI to analyze images, documents, and other files, producing accurate and descriptive names the vast majority of the time. You can always review suggestions before applying them.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I rename files with AI for free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush offers a generous free tier with no credit card or account required. If you need more, the Pro plan is a one-time $10 payment for 10,000 renames, or you can bring your own API key for unlimited use.',
              },
            },
            {
              '@type': 'Question',
              name: 'What types of files can AI rename?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush supports a wide range of file types including images (PNG, JPG, HEIC, RAW formats), documents (PDF, DOCX, PPTX, XLSX), and plain text files (TXT, MD, CSV, JSON). It uses vision AI for images and text extraction for documents to understand what each file contains.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does the AI send my files to the cloud?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush sends file content to AI providers (like OpenAI or Anthropic) for analysis, but nothing is stored on their servers after processing. If privacy is a top concern, you can use your own API key with the BYOK option for full control over which provider handles your data.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I customize the naming format?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Zush supports custom naming patterns so you can define your own structure — for example, adding dates, categories, or specific prefixes. You can also choose from over 60 languages for the generated names, making it useful for international workflows.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default RenameFilesWithAI;
