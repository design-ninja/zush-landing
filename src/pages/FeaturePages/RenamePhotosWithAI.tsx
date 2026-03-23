import FeatureLandingPage from '@/components/FeatureLandingPage';

const faqItems = [
  {
    question: 'Does Zush support RAW photo formats from different camera brands?',
    answer:
      'Yes. Zush supports RAW files from Canon (CR2, CR3), Nikon (NEF), Sony (ARW, SR2, SRW), Fuji (RAF), Olympus (ORF), Panasonic (RW2), Pentax (PEF), and Adobe DNG. It reads embedded previews to understand image content without needing to decode the full RAW data.',
  },
  {
    question: 'Can Zush handle HEIC files from my iPhone?',
    answer:
      'Absolutely. HEIC and HEIF are fully supported. Zush analyzes the photo content and replaces generic iPhone names like IMG_2847 with descriptions of what the photo actually shows, such as "family-dinner-birthday-cake".',
  },
  {
    question: 'Can I include dates in the photo filename?',
    answer:
      'Yes. You can set up custom naming patterns that combine AI-generated descriptions with dates, sequence numbers, or other metadata. For example, "2026-03-15-mountain-landscape-sunrise" follows a date-first pattern while keeping the AI description.',
  },
  {
    question: 'Does Zush support renaming in languages other than English?',
    answer:
      'Yes. Zush can generate filenames in over 60 languages. If you want your photo library named in Japanese, Spanish, German, or any other supported language, just set your preferred language in the app settings.',
  },
  {
    question: 'How do I rename an entire photo library without duplicates?',
    answer:
      'Zush handles duplicate detection automatically. If two photos would receive the same name, Zush appends a sequential number to keep every filename unique. You can also customize the separator and numbering format in your naming pattern.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to rename photos with AI on macOS',
      description:
        'Use Zush to automatically rename photos based on their visual content using AI on macOS.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Import your photos',
          text: 'Drag and drop photos into Zush or point it at a folder. Zush supports JPG, HEIC, PNG, TIFF, and all major RAW formats from Canon, Nikon, Sony, Fuji, and more.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'AI describes each photo',
          text: 'Zush uses AI vision models to understand the content of each photo — people, places, objects, events — and generates a clear, descriptive filename.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply and organize',
          text: 'Preview the new names, adjust your naming pattern, and apply. Your photo library is instantly searchable by filename in Finder.',
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

const RenamePhotosWithAI = () => (
  <FeatureLandingPage
    h1="Rename Photos with AI on macOS"
    definitionTitle="What is AI photo renaming?"
    definitionText="AI photo renaming uses vision models to analyze what your photos contain and generate descriptive filenames based on the actual content. Instead of scrolling through thousands of files named IMG_2847 or _DSC3921, every photo gets a name that tells you what it shows — people, places, objects, and events."
    beforeAfterExamples={[
      { before: 'IMG_2847.HEIC', after: 'family-dinner-birthday-cake.heic' },
      { before: '_DSC3921.ARW', after: 'mountain-landscape-sunrise-fog.arw' },
      { before: 'DSCF0445.RAF', after: 'street-market-vendor-spices.raf' },
      { before: 'P1080127.JPG', after: 'wedding-ceremony-first-kiss.jpg' },
      { before: 'IMG_0023.CR3', after: 'golden-retriever-autumn-leaves.cr3' },
    ]}
    supportedFormats={[
      'JPG', 'JPEG', 'HEIC', 'HEIF', 'PNG', 'TIFF',
      'CR2', 'CR3', 'NEF', 'ARW', 'DNG', 'ORF', 'RAF', 'RW2', 'PEF', 'SRW', 'SR2', 'RAW',
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'Lightroom', platform: 'Cross-platform', aiPowered: 'No', batchRename: 'Template-based', autoMonitor: 'No', freeTier: 'No' },
      { tool: 'Photos app', platform: 'macOS', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Yes' },
      { tool: 'Manual naming', platform: 'Any', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Yes' },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'AI Photo Renamer', href: '/ai-photo-renamer' },
      { title: 'Rename Images with AI', href: '/rename-images-with-ai' },
      { title: 'Auto Rename Files', href: '/auto-rename-files' },
    ]}
    relatedBlogPosts={[
      { title: 'Photo Management Workflow for Photographers on Mac', href: 'photo-management-workflow-photographers-mac' },
      { title: 'Why Your Photos Are Named IMG and How to Fix It', href: 'why-your-photos-are-named-img-and-how-to-fix-it' },
      { title: 'Best Ways to Organize Photos on Mac', href: 'best-ways-to-organize-photos-on-mac' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenamePhotosWithAI;
