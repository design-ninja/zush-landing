import FeatureLandingPage from '@/components/FeatureLandingPage';

const AutoRenameFiles = () => (
  <FeatureLandingPage
    h1="Auto Rename Files on macOS"
    category="general"
    definitionTitle="What Is Automatic File Renaming?"
    definitionText="Point an app at a folder and every new file gets analyzed and given a descriptive name automatically. No manual renaming needed."
    showcaseSlides={[{
      files: [
        { before: 'Screenshot 2026-03-20.png', after: 'Figma Login Screen.png', img: '/images/examples/dashboard.jpg', type: 'image' },
        { before: 'IMG_5523.HEIC', after: 'Whiteboard Sprint Plan.heic', img: '/images/examples/workspace.jpg', type: 'image' },
        { before: 'download.pdf', after: 'Amazon Order Receipt.pdf', type: 'pdf' },
        { before: 'Photo-2026-03-18.jpg', after: 'Restaurant Menu Italian.jpg', img: '/images/examples/food.jpg', type: 'image' },
        { before: 'Scan 12.pdf', after: 'Medical Lab Results.pdf', type: 'pdf' },
        { before: 'report_draft.docx', after: 'Weekly Status Report.docx', type: 'doc' },
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
        question: 'How fast does auto-rename process new files?',
        answer: 'Zush detects new files within seconds of them appearing in a watched folder. The AI analysis typically takes a few seconds per file depending on size and type, so most files are renamed almost as quickly as they arrive.',
      },
      {
        question: 'Can I auto-rename files in multiple folders at once?',
        answer: 'Yes. You can set up monitoring on as many folders as you like — Downloads, Desktop, a camera import folder, project directories, and more. Each folder is watched independently and files are renamed as they appear.',
      },
      {
        question: 'What happens if the AI gives a file a bad name?',
        answer: 'Every rename is logged in Zush\'s history, so you can revert any file to its original name with one click. You can also start with manual review mode, where Zush suggests names but waits for your approval before applying them.',
      },
      {
        question: 'Does auto-rename work when my Mac is asleep?',
        answer: 'Auto-rename requires Zush to be running, so it pauses when your Mac is asleep or the app is quit. When your Mac wakes up and Zush is open, it will automatically process any files that arrived while it was inactive.',
      },
      {
        question: 'How is this different from Hazel or Automator?',
        answer: 'Hazel and Automator use rules you define manually — like "if filename contains X, rename to Y." Zush uses AI to actually understand file content, so it can generate descriptive names for files it has never seen before without any rule configuration.',
      },
    ]}
    relatedPages={[
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'Automate File Organization on macOS', href: 'automate-file-organization-macos' },
      { title: 'Auto Image Renamer for Mac', href: 'auto-image-renamer-mac' },
      { title: 'macOS Automator: Rename Files Guide', href: 'macos-automator-rename-files-guide' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'How to Auto Rename Files on macOS',
          description: 'Set up automatic AI-powered file renaming on your Mac using Zush. Files are renamed as soon as they appear in a watched folder.',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Set up a watched folder',
              text: 'Open Zush and choose which folder to monitor — such as Downloads, Desktop, or a camera import directory.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Files arrive automatically',
              text: 'New files from downloads, screenshots, AirDrop, or other sources are detected instantly by Zush.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'AI renames them on the spot',
              text: 'Each file is analyzed by AI and given a descriptive name based on its content, with no manual intervention required.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How fast does auto-rename process new files?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush detects new files within seconds of them appearing in a watched folder. The AI analysis typically takes a few seconds per file depending on size and type, so most files are renamed almost as quickly as they arrive.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I auto-rename files in multiple folders at once?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. You can set up monitoring on as many folders as you like — Downloads, Desktop, a camera import folder, project directories, and more. Each folder is watched independently and files are renamed as they appear.',
              },
            },
            {
              '@type': 'Question',
              name: 'What happens if the AI gives a file a bad name?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Every rename is logged in Zush\'s history, so you can revert any file to its original name with one click. You can also start with manual review mode, where Zush suggests names but waits for your approval before applying them.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does auto-rename work when my Mac is asleep?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Auto-rename requires Zush to be running, so it pauses when your Mac is asleep or the app is quit. When your Mac wakes up and Zush is open, it will automatically process any files that arrived while it was inactive.',
              },
            },
            {
              '@type': 'Question',
              name: 'How is this different from Hazel or Automator?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Hazel and Automator use rules you define manually — like "if filename contains X, rename to Y." Zush uses AI to actually understand file content, so it can generate descriptive names for files it has never seen before without any rule configuration.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AutoRenameFiles;
