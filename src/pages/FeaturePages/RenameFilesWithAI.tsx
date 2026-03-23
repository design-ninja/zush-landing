import FeatureLandingPage from '@/components/FeatureLandingPage';

const RenameFilesWithAI = () => (
  <FeatureLandingPage
    h1="Rename Files with AI on macOS"
    definitionTitle="What Is AI File Renaming?"
    definitionText="AI file renaming uses vision and language models to analyze the actual content of your files — not just metadata — and generate descriptive, human-readable names automatically. Instead of manually typing out names for every screenshot, scan, or photo, AI examines what's inside and produces a meaningful filename in seconds."
    beforeAfterExamples={[
      { before: 'Screenshot 2026-03-14 at 10.42.17.png', after: 'Slack conversation — project timeline update.png' },
      { before: 'IMG_4892.HEIC', after: 'Golden retriever playing fetch at sunset — park.heic' },
      { before: 'Document (3).pdf', after: 'Chase Bank — January 2026 credit card statement.pdf' },
      { before: 'DSC_0041.jpg', after: 'Product photoshoot — white sneakers on marble.jpg' },
      { before: 'Untitled spreadsheet.xlsx', after: 'Q1 2026 marketing budget breakdown.xlsx' },
      { before: 'scan0012.pdf', after: 'Signed apartment lease agreement — 123 Main St.pdf' },
      { before: 'recording_final_v2 (1).webm', after: 'Client demo — dashboard walkthrough March 2026.webm' },
    ]}
    supportedFormats={[
      'PNG', 'JPG', 'JPEG', 'WEBP', 'GIF', 'HEIC', 'HEIF', 'TIFF', 'BMP', 'SVG',
      'PDF', 'RAW', 'CR2', 'NEF', 'ARW',
      'TXT', 'MD', 'JSON', 'EML', 'CSV',
      'DOC', 'DOCX', 'PPT', 'PPTX', 'XLSX',
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', aiPowered: 'Yes (vision + language)', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'AI Renamer', platform: 'macOS / Windows', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited trial' },
      { tool: 'Renamer.ai', platform: 'Web', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited' },
      { tool: 'WaFile', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited trial' },
      { tool: 'Finder', platform: 'macOS', aiPowered: 'No', batchRename: 'Basic only', autoMonitor: 'No', freeTier: 'Built-in' },
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
