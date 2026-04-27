import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

const AIFileRenamer = () => (
  <FeatureLandingPage
    h1="AI File Renamer"
    h1Accent="AI File Renamer"
    category="general"
    definitionTitle="What Is an AI File Renamer?"
    definitionText="Zush is the AI file renamer when you need one workflow for screenshots, PDFs, documents, and photos with descriptive names, batch control, and rollback."
    showcaseSlides={[
      {
        files: [
          { before: 'IMG_2087.PNG', after: 'Summer Campaign Mockup.png', img: '/images/examples/sunset.jpg', type: 'image' },
          { before: 'final_presentation.pptx', after: 'Series A Pitch Deck.pptx', type: 'slides' },
          { before: 'download (7).pdf', after: 'IRS W-9 Form Signed.pdf', type: 'pdf' },
          { before: 'DCIM_20260301.jpg', after: 'Team Offsite Group Photo.jpg', img: '/images/examples/building.jpg', type: 'image' },
          { before: 'budget_v3.xlsx', after: 'Q1 Product Budget.xlsx', type: 'sheet' },
          { before: 'meeting_notes.docx', after: 'Roadmap Discussion Notes.docx', type: 'doc' },
        ],
      },
      {
        files: [
          { before: 'IMG_4203.HEIC', after: 'Alpine Hiking Trail.heic', img: '/images/examples/mountain.jpg', type: 'image' },
          { before: 'attachment-3.pdf', after: 'Home Depot Receipt.pdf', type: 'pdf' },
          { before: 'spreadsheet_copy.xlsx', after: 'Sales Pipeline March.xlsx', type: 'sheet' },
          { before: 'DSC_0192.jpg', after: 'Park Guell Barcelona.jpg', img: '/images/examples/parkguell.jpg', type: 'image' },
          { before: 'contract_clean.docx', after: 'Vendor NDA Final.docx', type: 'doc' },
          { before: 'launch_deck_v4.pptx', after: 'Product Launch Keynote.pptx', type: 'slides' },
        ],
      },
      {
        files: [
          { before: 'CAM_0021.jpg', after: 'Tokyo Night Skyline.jpg', img: '/images/examples/city.jpg', type: 'image' },
          { before: 'IMG_0842.jpg', after: 'Persian Cat Napping.jpg', img: '/images/examples/cat.jpg', type: 'image' },
          { before: 'scan_001.pdf', after: 'Medical Lab Results.pdf', type: 'pdf' },
          { before: 'forecast_export.xlsx', after: 'Revenue Forecast 2026.xlsx', type: 'sheet' },
          { before: 'policy_draft.docx', after: 'HR Policy Update.docx', type: 'doc' },
          { before: 'board_review.pptx', after: 'Q1 Board Deck.pptx', type: 'slides' },
        ],
      },
    ]}
    faqItems={[
      {
        question: 'How is Zush different from other AI file renamers?',
        answer: 'Zush combines content-aware renaming, batch processing, and automatic folder monitoring in a single desktop app. It also uses a one-time pricing model ($10 for Pro) instead of monthly subscriptions, which saves money over time.',
      },
      {
        question: 'Do I need an internet connection for AI renaming?',
        answer: 'Cloud and BYOK processing require an internet connection. PRO users can enable Offline AI mode - private local models via Ollama to process supported files after installing Ollama and downloading a compatible model.',
      },
      {
        question: 'What does "Bring Your Own Key" (BYOK) mean?',
        answer: 'BYOK lets you connect your own Gemini, Groq, OpenAI, or Claude API key for unlimited cloud renames. Your key is stored locally in secure platform storage and sent only when Zush calls your selected provider.',
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
      { title: 'Auto Rename Files with AI', href: '/auto-rename-files' },
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename Files with AI: Step-by-Step Guide', href: 'rename-files-with-ai-guide' },
      { title: 'Best AI File Renamer Tools in 2026: 8 Picks Tested', href: 'best-ai-file-renamer-tools-2026' },
      { title: 'How to Rename Files with AI for Free in 2026', href: 'rename-files-with-ai-free' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        buildSoftwareApplicationJsonLd({
          pagePath: '/ai-file-renamer',
          description:
            'AI-powered file renaming app that analyzes screenshots, PDFs, documents, and photos to generate descriptive, searchable filenames automatically.',
          featureList: [
            'AI-powered content-aware file renaming',
            'Batch rename for files and folders',
            'Automatic folder monitoring',
            'Custom naming patterns',
            'Smart tags and metadata',
            'PDF, document, and image analysis',
            'Bring Your Own API Key (BYOK)',
            'Offline AI mode - private local models via Ollama',
          ],
        }),
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How is Zush different from other AI file renamers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush combines content-aware renaming, batch processing, and automatic folder monitoring in a single desktop app. It also uses a one-time pricing model ($10 for Pro) instead of monthly subscriptions, which saves money over time.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do I need an internet connection for AI renaming?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Cloud and BYOK processing require an internet connection. PRO users can enable Offline AI mode - private local models via Ollama to process supported files after installing Ollama and downloading a compatible model.',
              },
            },
            {
              '@type': 'Question',
              name: 'What does "Bring Your Own Key" (BYOK) mean?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'BYOK lets you connect your own Gemini, Groq, OpenAI, or Claude API key for unlimited cloud renames. Your key is stored locally in secure platform storage and sent only when Zush calls your selected provider.',
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
