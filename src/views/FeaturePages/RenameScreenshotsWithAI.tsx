import FeatureLandingPage from '@/components/FeatureLandingPage';
import { SCREENSHOT_PREVIEW_IMAGES } from '@/data/screenshotPreviewImages';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Can Zush automatically rename screenshots as I take them?',
    answer:
      'Yes. Zush can monitor your Screenshots folder (or any folder you choose) and automatically rename new files as they appear. Just enable folder monitoring and every new screenshot gets an AI-generated name within seconds.',
  },
  {
    question: 'Does it work with default screenshot naming formats?',
    answer:
      'Absolutely. Zush recognizes generic timestamp-based screenshot filenames and replaces them with content-based names. It also works with screenshots from any other tool that saves to a watched folder.',
  },
  {
    question: 'What if I take multiple screenshots of the same app?',
    answer:
      'Zush analyzes the actual content of each screenshot, so even multiple captures of the same app will get distinct names based on what is shown. A Slack conversation screenshot and a Slack settings screenshot will receive different, descriptive filenames.',
  },
  {
    question: 'Can I use Zush for screenshots saved as different formats?',
    answer:
      'Yes. Whether your screenshots are saved as PNG, JPG, or any other image format, Zush handles them all. You can change your preferred screenshot format and Zush will still work seamlessly.',
  },
  {
    question: 'How does this help with bug reporting?',
    answer:
      'When you attach screenshots to bug reports, descriptive filenames like "checkout-page-broken-layout-mobile.png" give immediate context to developers. It saves time explaining what each screenshot shows and makes issue trackers much easier to search.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Screenshots with AI',
    description:
      'Use Zush to automatically rename screenshots based on their visual content using AI.',
    steps: [
      {
        name: 'Set up folder monitoring',
        text: 'Point Zush at your Screenshots folder (or any folder where screenshots land). Zush will watch for new files and rename them automatically.',
      },
      {
        name: 'AI reads the screenshot content',
        text: 'When a new screenshot appears, Zush uses AI vision to identify the app, UI elements, text, and context shown in the image.',
      },
      {
        name: 'Screenshot is renamed instantly',
        text: 'The generic timestamp-based name is replaced with a descriptive name that reflects what the screenshot actually shows. No manual intervention needed.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-screenshots-with-ai',
    description:
      'AI screenshot renamer that replaces generic screenshot timestamps with descriptive filenames and can auto-rename new captures in watched folders.',
    featureList: [
      'Rename screenshots by visible app and on-screen content',
      'Automatic folder monitoring for new screenshots',
      'Batch rename existing screenshot archives',
      'Support for PNG, JPG, and downloaded image captures',
      'Useful filenames for bug reports and design references',
      'Undo and review before apply',
    ],
  },
});

const RenameScreenshotsWithAI = () => (
  <FeatureLandingPage
    h1="Rename Screenshots Automatically with AI"
    h1Accent="Rename Screenshots"
    category="screenshot"
    definitionTitle="What Is AI Screenshot Renaming?"
    definitionText="Rename screenshots automatically with AI using Zush to replace generic timestamp names with descriptive filenames on Mac and Windows."
    showcaseSlides={[
      {
        files: [
          { before: 'Screenshot 2026-03-15.png', after: 'Slack Design Feedback Thread.png', img: SCREENSHOT_PREVIEW_IMAGES.slackDesignFeedbackThread, type: 'image' },
          { before: 'Screenshot 2026-03-18.png', after: 'Figma Checkout Mobile Wireframe.png', img: SCREENSHOT_PREVIEW_IMAGES.figmaCheckoutMobileWireframe, type: 'image' },
          { before: 'Screenshot 2026-03-20.png', after: 'VS Code TypeScript Build Error.png', img: SCREENSHOT_PREVIEW_IMAGES.vsCodeTypescriptBuildError, type: 'image' },
          { before: 'Screenshot 2026-03-21.png', after: 'Stripe Monthly Revenue Dashboard.png', img: SCREENSHOT_PREVIEW_IMAGES.stripeMonthlyRevenueDashboard, type: 'image' },
          { before: 'Screenshot 2026-03-22.png', after: 'Linear Sprint Backlog Board.png', img: SCREENSHOT_PREVIEW_IMAGES.linearSprintBacklogBoard, type: 'image' },
          { before: 'Screenshot 2026-03-23.png', after: 'Safari Competitor Pricing Page.png', img: SCREENSHOT_PREVIEW_IMAGES.safariCompetitorPricingPage, type: 'image' },
        ],
      },
      {
        files: [
          { before: 'Screenshot 2026-02-10.png', after: 'Notion Product Roadmap Table.png', img: SCREENSHOT_PREVIEW_IMAGES.notionProductRoadmapTable, type: 'image' },
          { before: 'Screenshot 2026-02-12.png', after: 'GitHub Pull Request Review Comments.png', img: SCREENSHOT_PREVIEW_IMAGES.githubPullRequestReviewComments, type: 'image' },
          { before: 'Screenshot 2026-02-15.png', after: 'Google Analytics Traffic Sources.png', img: SCREENSHOT_PREVIEW_IMAGES.googleAnalyticsTrafficSources, type: 'image' },
          { before: 'Screenshot 2026-02-18.png', after: 'Xcode Simulator Layout Bug.png', img: SCREENSHOT_PREVIEW_IMAGES.xcodeSimulatorLayoutBug, type: 'image' },
          { before: 'Screenshot 2026-02-20.png', after: 'Zoom Meeting Shared Roadmap.png', img: SCREENSHOT_PREVIEW_IMAGES.zoomMeetingSharedRoadmap, type: 'image' },
          { before: 'Screenshot 2026-02-25.png', after: 'Apple Notes Research Checklist.png', img: SCREENSHOT_PREVIEW_IMAGES.appleNotesResearchChecklist, type: 'image' },
        ],
      },
      {
        files: [
          { before: 'Screenshot 2026-01-04.png', after: 'Maps Restaurant Directions.png', img: SCREENSHOT_PREVIEW_IMAGES.mapsRestaurantDirections, type: 'image' },
          { before: 'Screenshot 2026-01-07.png', after: 'System Settings Display Options.png', img: SCREENSHOT_PREVIEW_IMAGES.systemSettingsDisplayOptions, type: 'image' },
          { before: 'Screenshot 2026-01-10.png', after: 'Gmail Invoice Search Results.png', img: SCREENSHOT_PREVIEW_IMAGES.gmailInvoiceSearchResults, type: 'image' },
          { before: 'Screenshot 2026-01-14.png', after: 'Calendar Launch Timeline Week.png', img: SCREENSHOT_PREVIEW_IMAGES.calendarLaunchTimelineWeek, type: 'image' },
          { before: 'Screenshot 2026-01-18.png', after: 'Docs Proposal Comment Thread.png', img: SCREENSHOT_PREVIEW_IMAGES.docsProposalCommentThread, type: 'image' },
          { before: 'Screenshot 2026-01-22.png', after: 'Terminal Deploy Error Log.png', img: SCREENSHOT_PREVIEW_IMAGES.terminalDeployErrorLog, type: 'image' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Zush for Mac', href: '/mac' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename Screenshots Automatically on Mac', href: 'rename-screenshots-automatically-mac' },
      { title: 'How to Rename Screenshots Automatically on Windows', href: 'rename-screenshots-automatically-windows' },
      { title: 'Screenshot Naming Conventions on macOS', href: 'screenshot-naming-conventions-macos' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameScreenshotsWithAI;
