import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIFileRenamer = () => (
  <FeatureLandingPage
    h1="AI File Renamer for macOS"
    category="general"
    definitionTitle="What Is an AI File Renamer?"
    definitionText="An AI file renamer analyzes what's inside your files — images, documents, PDFs — and generates descriptive, searchable names automatically."
    showcaseSlides={[{
      files: [
        { before: 'IMG_2087.PNG', after: 'Summer Campaign Mockup.png', img: '/images/examples/sunset.jpg', type: 'image' },
        { before: 'final_presentation.pptx', after: 'Series A Pitch Deck.pptx', type: 'slides' },
        { before: 'download (7).pdf', after: 'IRS W-9 Form Signed.pdf', type: 'pdf' },
        { before: 'DCIM_20260301.jpg', after: 'Team Offsite Photo.jpg', img: '/images/examples/building.jpg', type: 'image' },
        { before: 'budget_v3.xlsx', after: 'Q1 Product Budget.xlsx', type: 'sheet' },
        { before: 'meeting_notes.docx', after: 'Roadmap Discussion Notes.docx', type: 'doc' },
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
        question: 'How is Zush different from other AI file renamers?',
        answer: 'Zush is the only macOS AI file renamer that combines content-aware renaming, batch processing, and automatic folder monitoring in a single app. It also uses a one-time pricing model ($10 for Pro) instead of monthly subscriptions, which saves money over time.',
      },
      {
        question: 'Do I need an internet connection for AI renaming?',
        answer: 'Yes, since Zush sends file content to cloud-based AI models for analysis. The processing happens in real time and files are not stored after renaming. A stable internet connection ensures fast and accurate results.',
      },
      {
        question: 'What does "Bring Your Own Key" (BYOK) mean?',
        answer: 'BYOK lets you connect your own OpenAI, Anthropic, or other AI provider API key to Zush. This gives you unlimited renames at your API provider\'s per-token pricing, and full control over which models process your files.',
      },
      {
        question: 'Can I undo a rename if I don\'t like the result?',
        answer: 'Yes. Zush keeps a history of all renames so you can revert any file back to its original name with a single click. You can also preview all AI-suggested names before applying them to avoid surprises.',
      },
      {
        question: 'Is there a file size limit?',
        answer: 'There is no hard file size limit in Zush. Very large files (like high-resolution RAW photos or lengthy PDFs) may take slightly longer to process, but the AI handles them just as accurately as smaller files.',
      },
    ]}
    relatedPages={[
      { title: 'Rename Files with AI on macOS', href: '/rename-files-with-ai' },
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
      { title: 'AI Document Renamer', href: '/ai-document-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'AI Renamer for Mac: A Deep Dive', href: 'ai-renamer-mac' },
      { title: 'How to Rename Images with AI on macOS', href: 'how-to-rename-images-with-ai-on-macos' },
      { title: 'Automate File Organization on macOS', href: 'automate-file-organization-macos' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Zush',
          operatingSystem: 'macOS',
          applicationCategory: 'UtilitiesApplication',
          description: 'AI-powered file renaming app for macOS that analyzes file content and generates descriptive, searchable filenames automatically.',
          offers: [
            {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free tier — try AI renaming at no cost',
            },
            {
              '@type': 'Offer',
              price: '10',
              priceCurrency: 'USD',
              description: 'Pro — one-time payment for 10,000 AI renames',
            },
          ],
          featureList: [
            'AI-powered content-aware file renaming',
            'Batch rename for files and folders',
            'Automatic folder monitoring',
            'Custom naming patterns',
            'Smart Finder tags and metadata',
            '60+ language support',
            'Bring Your Own API Key (BYOK)',
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How is Zush different from other AI file renamers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush is the only macOS AI file renamer that combines content-aware renaming, batch processing, and automatic folder monitoring in a single app. It also uses a one-time pricing model ($10 for Pro) instead of monthly subscriptions, which saves money over time.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do I need an internet connection for AI renaming?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, since Zush sends file content to cloud-based AI models for analysis. The processing happens in real time and files are not stored after renaming. A stable internet connection ensures fast and accurate results.',
              },
            },
            {
              '@type': 'Question',
              name: 'What does "Bring Your Own Key" (BYOK) mean?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'BYOK lets you connect your own OpenAI, Anthropic, or other AI provider API key to Zush. This gives you unlimited renames at your API provider\'s per-token pricing, and full control over which models process your files.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I undo a rename if I don\'t like the result?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush keeps a history of all renames so you can revert any file back to its original name with a single click. You can also preview all AI-suggested names before applying them to avoid surprises.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is there a file size limit?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'There is no hard file size limit in Zush. Very large files (like high-resolution RAW photos or lengthy PDFs) may take slightly longer to process, but the AI handles them just as accurately as smaller files.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AIFileRenamer;
