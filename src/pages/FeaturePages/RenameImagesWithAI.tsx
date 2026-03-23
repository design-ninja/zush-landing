import FeatureLandingPage from '@/components/FeatureLandingPage';

const faqItems = [
  {
    question: 'Does Zush support RAW camera files like CR2 and NEF?',
    answer:
      'Yes. Zush supports all major RAW formats including CR2, CR3, NEF, ARW, DNG, ORF, RAF, RW2, PEF, SRW, SR2, and generic RAW files. The AI analyzes embedded previews to understand the image content and generate a descriptive filename.',
  },
  {
    question: 'Can I rename HEIC photos taken on my iPhone?',
    answer:
      'Absolutely. HEIC and HEIF files are fully supported. Zush reads the visual content of your iPhone photos and replaces generic names like IMG_4382 with descriptions that actually tell you what the photo contains.',
  },
  {
    question: 'How many images can I rename at once?',
    answer:
      'The free tier lets you test the full workflow at no cost, and you can use your renames all at once in a single batch. The Pro plan ($10 one-time) gives you 10,000 renames, and the BYOK (Bring Your Own Key) option allows unlimited renames.',
  },
  {
    question: 'Will renaming my images affect their quality or metadata?',
    answer:
      'No. Zush only changes the filename. All EXIF data, color profiles, resolution, and other metadata remain completely untouched. Your original image quality is preserved.',
  },
  {
    question: 'Can Zush automatically rename images as I save them to a folder?',
    answer:
      'Yes. Zush includes a folder monitoring feature that watches designated folders and automatically renames new files as they arrive. This is especially useful for photographers importing images from a memory card.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to rename images with AI on macOS',
      description:
        'Use Zush to automatically rename image files based on their visual content using AI on macOS.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Drop your images into Zush',
          text: 'Drag and drop image files or select an entire folder. Zush accepts all common image formats including RAW files from professional cameras.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'AI analyzes visual content',
          text: 'Zush uses AI vision models to understand what each image contains — subjects, scenes, lighting, objects — and generates a clear, descriptive filename.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Review and apply',
          text: 'Preview the suggested names, adjust your naming pattern if needed, and apply the new names to all selected files in one click.',
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

const RenameImagesWithAI = () => (
  <FeatureLandingPage
    h1="Rename Images with AI on macOS"
    definitionTitle="What is AI image renaming?"
    definitionText="AI image renaming uses vision models to analyze the visual content of your photos, screenshots, and graphics, then generates descriptive filenames based on what the image actually contains. Instead of cryptic camera codes like IMG_4382 or DSC_0091, you get names that tell you exactly what you're looking at."
    beforeAfterExamples={[
      { before: 'IMG_4382.jpg', after: 'sunset-beach-golden-hour.jpg' },
      { before: 'DSC_0091.NEF', after: 'portrait-studio-softbox-lighting.nef' },
      { before: 'DCIM_20260315.png', after: 'product-white-sneakers-side-view.png' },
      { before: 'image001.HEIC', after: 'dog-playing-fetch-park.heic' },
      { before: 'P1040229.TIFF', after: 'aerial-downtown-skyline-dusk.tiff' },
    ]}
    supportedFormats={[
      'PNG', 'JPG', 'JPEG', 'WEBP', 'GIF', 'BMP', 'TIFF', 'HEIC', 'HEIF', 'SVG',
      'CR2', 'CR3', 'NEF', 'ARW', 'DNG', 'ORF', 'RAF', 'RW2', 'PEF', 'SRW', 'SR2', 'RAW',
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'AI Renamer', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited' },
      { tool: 'Renamer.ai', platform: 'Web', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited' },
      { tool: 'Photos app', platform: 'macOS', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Yes' },
      { tool: 'Manual renaming', platform: 'Any', aiPowered: 'No', batchRename: 'No', autoMonitor: 'No', freeTier: 'Yes' },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'AI Image Renamer for Mac', href: 'ai-image-renamer-for-mac' },
      { title: 'How to Rename Images with AI on macOS', href: 'how-to-rename-images-with-ai-on-macos' },
      { title: 'Best Ways to Organize Photos on Mac', href: 'best-ways-to-organize-photos-on-mac' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameImagesWithAI;
