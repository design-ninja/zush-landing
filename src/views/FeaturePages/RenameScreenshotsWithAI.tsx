import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

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
      name: 'Rename Screenshots with AI on Mac',
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
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'meta[name="description"]'],
      },
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
    buildSoftwareApplicationJsonLd({
      pagePath: '/rename-screenshots-with-ai',
      description:
        'AI screenshot renamer for macOS that replaces generic screenshot timestamps with descriptive filenames and can auto-rename new captures in watched folders.',
      featureList: [
        'Rename screenshots by visible app and on-screen content',
        'Automatic folder monitoring for new macOS screenshots',
        'Batch rename existing screenshot archives',
        'Support for PNG, JPG, and downloaded image captures',
        'Useful filenames for bug reports and design references',
        'Undo and review before apply',
      ],
    }),
  ],
};

const RenameScreenshotsWithAI = () => (
  <FeatureLandingPage
    h1="Rename Screenshots with AI on Mac"
    h1Accent="Rename Screenshots"
    category="screenshot"
    definitionTitle="What Is AI Screenshot Renaming?"
    definitionText="Rename screenshots with AI on Mac using Zush to replace generic timestamp names with descriptive filenames and optionally auto-rename new captures."
    showcaseSlides={[
      {
        files: [
          { before: 'Screenshot 2026-03-15.png', after: 'Slack Project Timeline.png', img: '/images/examples/dashboard.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-18.png', after: 'Figma Dashboard Wireframe.png', img: '/images/examples/diagram.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-20.png', after: 'VS Code Error Log.png', img: '/images/examples/workspace.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-21.png', after: 'Stripe Revenue Chart.png', img: '/images/examples/chart.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-22.png', after: 'Architecture Flow Diagram.png', img: '/images/examples/diagram.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-23.png', after: 'Home Office Setup.png', img: '/images/examples/office.jpg', type: 'image' },
        ],
      },
      {
        files: [
          { before: 'Screenshot 2026-02-10.png', after: 'Notion Roadmap View.png', img: '/images/examples/dashboard.jpg', type: 'image' },
          { before: 'Screenshot 2026-02-12.png', after: 'Sagrada Familia Reference.png', img: '/images/examples/sagrada.jpg', type: 'image' },
          { before: 'Screenshot 2026-02-15.png', after: 'Designer Workspace Mood.png', img: '/images/examples/workspace.jpg', type: 'image' },
          { before: 'Screenshot 2026-02-18.png', after: 'Persian Cat Reference.png', img: '/images/examples/cat.jpg', type: 'image' },
          { before: 'Screenshot 2026-02-20.png', after: 'Analytics Funnel Chart.png', img: '/images/examples/chart.jpg', type: 'image' },
          { before: 'Screenshot 2026-02-25.png', after: 'Italian Menu Reference.png', img: '/images/examples/food.jpg', type: 'image' },
        ],
      },
      {
        files: [
          { before: 'Screenshot 2026-01-04.png', after: 'Linear Backlog Board.png', img: '/images/examples/dashboard.jpg', type: 'image' },
          { before: 'Screenshot 2026-01-07.png', after: 'Sunset Color Palette.png', img: '/images/examples/sunset.jpg', type: 'image' },
          { before: 'Screenshot 2026-01-10.png', after: 'Ford Mustang Reference.png', img: '/images/examples/car.jpg', type: 'image' },
          { before: 'Screenshot 2026-01-14.png', after: 'Wildflower Field Mood.png', img: '/images/examples/flowers.jpg', type: 'image' },
          { before: 'Screenshot 2026-01-18.png', after: 'Modern Facade Reference.png', img: '/images/examples/building.jpg', type: 'image' },
          { before: 'Screenshot 2026-01-22.png', after: 'Park Guell Inspiration.png', img: '/images/examples/parkguell.jpg', type: 'image' },
        ],
      },
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
