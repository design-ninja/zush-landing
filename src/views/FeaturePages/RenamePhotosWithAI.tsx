import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

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
      name: 'Rename Photos with AI on Mac',
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
      pagePath: '/rename-photos-with-ai',
      description:
        'AI photo renamer for macOS that replaces IMG_, HEIC, and RAW filenames with searchable descriptions for photo libraries, imports, and client shoots.',
      featureList: [
        'Rename HEIC, JPG, PNG, and major RAW photo formats',
        'Generate searchable names for iPhone and camera imports',
        'Batch rename entire photo libraries',
        'Automatic duplicate-safe naming with sequences',
        'Custom patterns with dates and AI descriptions',
        'Folder monitoring for ongoing photo workflows',
      ],
    }),
  ],
};

const RenamePhotosWithAI = () => (
  <FeatureLandingPage
    h1="Rename Photos with AI on Mac"
    category="photo"
    definitionTitle="What Is AI Photo Renaming?"
    definitionText="Rename photos with AI on Mac using Zush to replace IMG_, HEIC, and RAW camera filenames with searchable descriptions of the actual photo."
    showcaseSlides={[{
      files: [
        { before: 'IMG_2847.HEIC', after: 'Birthday Cake Dinner.heic', img: '/images/examples/food.jpg', type: 'image' },
        { before: '_DSC3921.ARW', after: 'Mountain Sunrise Fog.arw', img: '/images/examples/mountain.jpg', type: 'image' },
        { before: 'DSCF0445.RAF', after: 'Street Market Spices.raf', img: '/images/examples/city.jpg', type: 'image' },
        { before: 'P1080127.JPG', after: 'Wedding First Kiss.jpg', img: '/images/examples/flowers.jpg', type: 'image' },
        { before: 'IMG_0023.CR3', after: 'Golden Retriever Autumn.cr3', img: '/images/examples/dog.jpg', type: 'image' },
        { before: 'DSC_7102.NEF', after: 'Sunset Over Harbor.nef', img: '/images/examples/sunset.jpg', type: 'image' },
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
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Auto Rename Files on macOS', href: '/auto-rename-files' },
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
