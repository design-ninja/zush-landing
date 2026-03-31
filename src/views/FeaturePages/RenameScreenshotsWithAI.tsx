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
    category="screenshot"
    definitionTitle="What Is AI Screenshot Renaming?"
    definitionText="AI screenshot renaming analyzes the visual content of your screenshots and replaces generic macOS timestamp names with descriptive, searchable filenames."
    showcaseSlides={[{
      files: [
        { before: 'Screenshot 2026-03-15.png', after: 'Slack Project Timeline.png', img: '/images/examples/dashboard.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-18.png', after: 'Figma Dashboard Wireframe.png', img: '/images/examples/diagram.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-20.png', after: 'VS Code Error Log.png', img: '/images/examples/workspace.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-21.png', after: 'Amazon Order Confirm.png', img: '/images/examples/chart.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-22.png', after: 'Google Maps Route.png', img: '/images/examples/office.jpg', type: 'image' },
        { before: 'Screenshot 2026-03-23.png', after: 'Gmail Vendor Proposal.png', img: '/images/examples/building.jpg', type: 'image' },
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
    faqItems={faqItems}
    relatedPages={[
      { title: 'Auto Rename Files on macOS', href: '/auto-rename-files' },
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
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
