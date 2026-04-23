import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

const AutoRenameFiles = () => (
  <FeatureLandingPage
    h1="Auto Rename Files with AI"
    h1Accent="Auto Rename"
    category="general"
    definitionTitle="What Is Automatic File Renaming?"
    definitionText="Set up watched folders and let Zush rename new screenshots, downloads, PDFs, and documents automatically as files arrive."
    showcaseSlides={[
      {
        files: [
          { before: 'Screenshot 2026-03-20.png', after: 'Figma Login Screen.png', img: '/images/examples/dashboard.jpg', type: 'image' },
          { before: 'IMG_5523.HEIC', after: 'Whiteboard Sprint Plan.heic', img: '/images/examples/workspace.jpg', type: 'image' },
          { before: 'download.pdf', after: 'Amazon Order Receipt.pdf', type: 'pdf' },
          { before: 'Photo-2026-03-18.jpg', after: 'Italian Restaurant Menu.jpg', img: '/images/examples/food.jpg', type: 'image' },
          { before: 'report_draft.docx', after: 'Weekly Status Report.docx', type: 'doc' },
          { before: 'budget_v2.xlsx', after: 'Q2 Marketing Budget.xlsx', type: 'sheet' },
        ],
      },
      {
        files: [
          { before: 'download (7).pdf', after: 'IRS W-9 Form Signed.pdf', type: 'pdf' },
          { before: 'CAM00847.jpg', after: 'Black Ford Mustang.jpg', img: '/images/examples/car.jpg', type: 'image' },
          { before: 'meeting_notes.docx', after: 'Q1 Board Meeting Notes.docx', type: 'doc' },
          { before: 'Screenshot 2026-02-18.png', after: 'Architecture Flow Diagram.png', img: '/images/examples/diagram.jpg', type: 'image' },
          { before: 'forecast_export.xlsx', after: 'Revenue Forecast 2026.xlsx', type: 'sheet' },
          { before: 'launch_deck_v4.pptx', after: 'Product Launch Keynote.pptx', type: 'slides' },
        ],
      },
      {
        files: [
          { before: 'PXL_20240720.jpg', after: 'Yellow Wildflowers Field.jpg', img: '/images/examples/flowers.jpg', type: 'image' },
          { before: 'scan_001.pdf', after: 'Medical Lab Results.pdf', type: 'pdf' },
          { before: 'sales_data.xlsx', after: 'Sales Pipeline March.xlsx', type: 'sheet' },
          { before: 'IMG_5523.HEIC', after: 'Golden Retriever At Park.heic', img: '/images/examples/dog.jpg', type: 'image' },
          { before: 'contract_clean.docx', after: 'Vendor NDA Final.docx', type: 'doc' },
          { before: 'board_review.pptx', after: 'Q1 Board Deck.pptx', type: 'slides' },
        ],
      },
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
        question: 'Does auto-rename work when my computer is asleep?',
        answer: 'Auto-rename requires Zush to be running, so it pauses when your computer is asleep or the app is quit. Once your machine wakes up and Zush is open again, it will automatically process any files that arrived while it was inactive.',
      },
      {
        question: 'How is this different from Hazel or Automator?',
        answer: 'Hazel and Automator use rules you define manually — like "if filename contains X, rename to Y." Zush uses AI to actually understand file content, so it can generate descriptive names for files it has never seen before without any rule configuration.',
      },
    ]}
    relatedPages={[
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'Folder Monitoring for Automatic File Renaming: Set It and Forget It', href: 'folder-monitoring-automatic-file-renaming' },
      { title: 'Auto Rename Files on Windows (2026): Best Workflows for Downloads, Screenshots and PDFs', href: 'auto-rename-files-windows-guide' },
      { title: 'Automate File Organization on macOS', href: 'automate-file-organization-macos' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'How to Auto Rename Files with AI',
          description: 'Set up automatic AI-powered file renaming with Zush. Files are renamed as soon as they appear in a watched folder.',
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
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'meta[name="description"]'],
          },
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
              name: 'Does auto-rename work when my computer is asleep?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Auto-rename requires Zush to be running, so it pauses when your computer is asleep or the app is quit. Once your machine wakes up and Zush is open again, it will automatically process any files that arrived while it was inactive.',
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
        buildSoftwareApplicationJsonLd({
          pagePath: '/auto-rename-files',
          description:
            'Automatic file renamer that watches folders and uses AI to rename new screenshots, downloads, PDFs, and documents as they arrive.',
          featureList: [
            'Watched folders for automatic file renaming',
            'Rename downloads, screenshots, photos, and PDFs on arrival',
            'AI-based content understanding instead of manual rules',
            'Batch review mode and full rollback history',
            'Multiple monitored folders at once',
            'Custom naming patterns with automation',
          ],
        }),
      ],
    }}
  />
);

export default AutoRenameFiles;
