import FeatureLandingPage from '@/components/FeatureLandingPage';

const faqItems = [
  {
    question: 'Can Zush automatically rename screenshots as I take them?',
    answer:
      'Yes. Zush can monitor your Screenshots folder (or any folder you choose) and automatically rename new files as they appear. Just enable folder monitoring and every new screenshot gets an AI-generated name within seconds.',
  },
  {
    question: 'Does it work with the default macOS screenshot naming format?',
    answer:
      'Absolutely. Zush recognizes the standard "Screenshot YYYY-MM-DD at HH.MM.SS" format and replaces it with a content-based name. It also works with screenshots from any other tool that saves to a watched folder.',
  },
  {
    question: 'What if I take multiple screenshots of the same app?',
    answer:
      'Zush analyzes the actual content of each screenshot, so even multiple captures of the same app will get distinct names based on what is shown. A Slack conversation screenshot and a Slack settings screenshot will receive different, descriptive filenames.',
  },
  {
    question: 'Can I use Zush for screenshots saved as different formats?',
    answer:
      'Yes. Whether your screenshots are saved as PNG, JPG, or any other image format, Zush handles them all. You can even change the macOS default screenshot format and Zush will still work seamlessly.',
  },
  {
    question: 'How does this help with bug reporting?',
    answer:
      'When you attach screenshots to bug reports, descriptive filenames like "checkout-page-broken-layout-mobile.png" give immediate context to developers. It saves time explaining what each screenshot shows and makes issue trackers much easier to search.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to rename screenshots with AI on macOS',
      description:
        'Use Zush to automatically rename macOS screenshots based on their visual content using AI.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Set up folder monitoring',
          text: 'Point Zush at your Screenshots folder (or any folder where screenshots land). Zush will watch for new files and rename them automatically.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'AI reads the screenshot content',
          text: 'When a new screenshot appears, Zush uses AI vision to identify the app, UI elements, text, and context shown in the image.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Screenshot is renamed instantly',
          text: 'The generic timestamp-based name is replaced with a descriptive name that reflects what the screenshot actually shows. No manual intervention needed.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

const RenameScreenshotsWithAI = () => (
  <FeatureLandingPage
    h1="Rename Screenshots with AI on macOS"
    definitionTitle="What is AI screenshot renaming?"
    definitionText="AI screenshot renaming analyzes the visual content of your screenshots and replaces generic macOS names like 'Screenshot 2026-03-15 at 10.42.23' with descriptive filenames that tell you exactly what the screenshot contains. Combined with folder monitoring, it can happen automatically every time you press Cmd+Shift+4."
    beforeAfterExamples={[
      { before: 'Screenshot 2026-03-15 at 10.42.23.png', after: 'slack-thread-project-timeline.png' },
      { before: 'Screenshot 2026-03-18 at 14.07.51.png', after: 'figma-dashboard-wireframe-v2.png' },
      { before: 'Screenshot 2026-03-20 at 09.15.33.png', after: 'vscode-error-log-typescript-build.png' },
      { before: 'Screenshot 2026-03-21 at 16.30.02.png', after: 'amazon-order-confirmation-laptop.png' },
      { before: 'Screenshot 2026-03-22 at 11.55.19.png', after: 'google-maps-route-sf-to-la.png' },
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'macOS defaults', platform: 'macOS', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Yes' },
      { tool: 'Automator', platform: 'macOS', aiPowered: 'No', batchRename: 'Pattern-based', autoMonitor: 'Folder Actions', freeTier: 'Yes' },
      { tool: 'Hazel', platform: 'macOS', aiPowered: 'No', batchRename: 'Rule-based', autoMonitor: 'Yes', freeTier: 'No' },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'AI Screenshot Renamer', href: '/ai-screenshot-renamer' },
      { title: 'Auto Rename Files', href: '/auto-rename-files' },
      { title: 'Rename Images with AI', href: '/rename-images-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'Screenshot Naming Conventions on macOS', href: 'screenshot-naming-conventions-macos' },
      { title: 'How to Organize Your Downloads Folder on Mac', href: 'how-to-organize-downloads-folder-mac' },
      { title: 'Automate File Organization on macOS', href: 'automate-file-organization-macos' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameScreenshotsWithAI;
