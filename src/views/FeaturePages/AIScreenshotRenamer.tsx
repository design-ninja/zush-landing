import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIScreenshotRenamer = () => (
  <FeatureLandingPage
    h1="AI Screenshot Renamer for macOS"
    definitionTitle="What Is an AI Screenshot Renamer?"
    definitionText="macOS names every screenshot with a timestamp that tells you nothing. An AI screenshot renamer identifies the app and content shown, and replaces it with a searchable name."
    showcaseSlides={[{
      files: [
        { before: 'Screenshot 2026-03-14.png', after: 'Slack Q2 Roadmap.png', img: '/images/examples/workspace.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-14.png', after: 'VS Code Auth Error.png', img: '/images/examples/dashboard.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-13.png', after: 'Chrome 502 Error Page.png', img: '/images/examples/diagram.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-12.png', after: 'Figma Checkout Flow.png', img: '/images/examples/chart.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-12.png', after: 'Gmail Vendor Follow-Up.png', img: '/images/examples/office.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-11.png', after: 'Notion Sprint Board.png', img: '/images/examples/building.jpg', type: 'image' },
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
        question: 'Can Zush automatically rename screenshots as I take them?',
        answer: 'Yes. Set up folder monitoring on your screenshots directory and Zush will detect new screenshots as they appear, analyze them with AI, and rename them automatically. No manual intervention required.',
      },
      {
        question: 'Does it work with third-party screenshot tools like CleanShot?',
        answer: 'Zush monitors folders, not specific apps. As long as your screenshot tool saves files to a folder that Zush is watching, the screenshots will be picked up and renamed regardless of which app captured them.',
      },
      {
        question: 'How well does AI understand what\'s in a screenshot?',
        answer: 'Vision models are very capable at reading text, identifying applications, and understanding UI layouts in screenshots. Zush can typically distinguish between a Slack conversation, a code editor, a design tool, and a web browser, and include relevant details in the filename.',
      },
      {
        question: 'Will Zush rename old screenshots or only new ones?',
        answer: 'Both. You can drag existing screenshots into Zush for batch renaming, and set up folder monitoring for new ones going forward. This lets you clean up your existing collection while keeping new screenshots organized automatically.',
      },
      {
        question: 'Does renaming screenshots affect their metadata?',
        answer: 'No. Zush only changes the filename. The original creation date, resolution, and all other metadata embedded in the image file remain intact.',
      },
    ]}
    relatedPages={[
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Auto Rename Files on macOS', href: '/auto-rename-files' },
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'Screenshot Naming Conventions on macOS', href: 'screenshot-naming-conventions-macos' },
      { title: 'How to Organize Your Downloads Folder on Mac', href: 'how-to-organize-downloads-folder-mac' },
      { title: 'Batch Rename Files on Mac: Complete Guide', href: 'batch-rename-files-on-mac-complete-guide' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Zush',
          description: 'AI-powered screenshot renamer for macOS that uses vision AI to replace meaningless timestamps with descriptive, searchable filenames automatically.',
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
              name: 'Can Zush automatically rename screenshots as I take them?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Set up folder monitoring on your screenshots directory and Zush will detect new screenshots as they appear, analyze them with AI, and rename them automatically. No manual intervention required.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does it work with third-party screenshot tools like CleanShot?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush monitors folders, not specific apps. As long as your screenshot tool saves files to a folder that Zush is watching, the screenshots will be picked up and renamed regardless of which app captured them.',
              },
            },
            {
              '@type': 'Question',
              name: "How well does AI understand what's in a screenshot?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Vision models are very capable at reading text, identifying applications, and understanding UI layouts in screenshots. Zush can typically distinguish between a Slack conversation, a code editor, a design tool, and a web browser, and include relevant details in the filename.',
              },
            },
            {
              '@type': 'Question',
              name: 'Will Zush rename old screenshots or only new ones?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Both. You can drag existing screenshots into Zush for batch renaming, and set up folder monitoring for new ones going forward. This lets you clean up your existing collection while keeping new screenshots organized automatically.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does renaming screenshots affect their metadata?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Zush only changes the filename. The original creation date, resolution, and all other metadata embedded in the image file remain intact.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AIScreenshotRenamer;
