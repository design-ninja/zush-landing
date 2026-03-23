import FeatureLandingPage from '@/components/FeatureLandingPage';

const AutoRenameFiles = () => (
  <FeatureLandingPage
    h1="Auto Rename Files on macOS"
    definitionTitle="What Is Automatic File Renaming?"
    definitionText="Automatic file renaming means your files get renamed without you lifting a finger. You point an app at a folder, and every new file that lands there is analyzed and given a descriptive name on its own. It's the difference between manually renaming each download and having a system that keeps your files organized 24/7."
    beforeAfterExamples={[
      { before: 'Screenshot 2026-03-20 at 09.15.32.png', after: 'Figma design — mobile app login screen dark mode.png' },
      { before: 'IMG_5523.HEIC', after: 'Whiteboard photo — sprint planning user stories.heic' },
      { before: 'download.pdf', after: 'Amazon order receipt — March 2026 electronics.pdf' },
      { before: 'Photo-2026-03-18-14-22-01.jpg', after: 'Restaurant menu — Italian place downtown.jpg' },
      { before: 'Scan 12.pdf', after: 'Medical lab results — blood panel February 2026.pdf' },
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', aiPowered: 'Yes (vision + language)', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'Automator', platform: 'macOS', aiPowered: 'No', batchRename: 'Scripted only', autoMonitor: 'With Folder Actions', freeTier: 'Built-in' },
      { tool: 'Hazel', platform: 'macOS', aiPowered: 'No', batchRename: 'Rule-based', autoMonitor: 'Yes', freeTier: 'No (paid app)' },
      { tool: 'Manual Renaming', platform: 'Any', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Free (your time)' },
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
      { title: 'Rename Files with AI on macOS', href: '/rename-files-with-ai' },
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
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
