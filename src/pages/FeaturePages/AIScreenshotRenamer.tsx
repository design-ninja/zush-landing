import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIScreenshotRenamer = () => (
  <FeatureLandingPage
    h1="AI Screenshot Renamer for macOS"
    definitionTitle="The Screenshot Naming Problem"
    definitionText="macOS names every screenshot 'Screenshot 2026-03-14 at 10.42.17.png' — a timestamp that tells you nothing about what's in the image. After a few days, your desktop or screenshots folder becomes a wall of identically formatted filenames. An AI screenshot renamer looks at each screenshot, identifies the app, content, and context shown, and replaces that timestamp with a name you can actually search for and recognize."
    beforeAfterExamples={[
      { before: 'Screenshot 2026-03-14 at 09.15.33.png', after: 'Slack thread — Q2 roadmap planning discussion.png' },
      { before: 'Screenshot 2026-03-14 at 11.42.08.png', after: 'VS Code — React component auth error stack trace.png' },
      { before: 'Screenshot 2026-03-13 at 16.20.45.png', after: 'Chrome — 502 Bad Gateway error page production.png' },
      { before: 'Screenshot 2026-03-12 at 14.05.22.png', after: 'Figma — mobile checkout flow design review comments.png' },
      { before: 'Screenshot 2026-03-12 at 10.30.11.png', after: 'Gmail — vendor proposal follow-up from March 12.png' },
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS (native)', aiPowered: 'Yes (vision)', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'macOS default', platform: 'macOS', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Built-in' },
      { tool: 'CleanShot X', platform: 'macOS', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'No (paid app)' },
      { tool: 'Automator', platform: 'macOS', aiPowered: 'No', batchRename: 'Rule-based', autoMonitor: 'Limited', freeTier: 'Built-in' },
      { tool: 'Hazel', platform: 'macOS', aiPowered: 'No', batchRename: 'Rule-based', autoMonitor: 'Yes', freeTier: 'No (paid app)' },
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
