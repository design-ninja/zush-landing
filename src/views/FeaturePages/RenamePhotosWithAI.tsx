import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Does Zush support RAW photo formats from different camera brands?',
    answer:
      'Yes. Zush supports RAW files from Canon (CR2, CR3), Nikon (NEF), Sony (ARW, SR2, SRW), Fuji (RAF), Olympus (ORF), Panasonic (RW2), Pentax (PEF), and Adobe DNG. It reads embedded previews to understand image content without needing to decode the full RAW data.',
  },
  {
    question: 'Can Zush handle HEIC files from my iPhone?',
    answer:
      'Absolutely. HEIC and HEIF are fully supported. Zush analyzes the photo content and replaces generic iPhone names like IMG_2847 with descriptions of what the photo actually shows, such as "spiced-steak-dinner".',
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

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Photos with AI',
    description:
      'Use Zush to automatically rename photos based on their visual content using AI.',
    steps: [
      {
        name: 'Import your photos',
        text: 'Drag and drop photos into Zush or point it at a folder. Zush supports JPG, HEIC, PNG, TIFF, and all major RAW formats from Canon, Nikon, Sony, Fuji, and more.',
      },
      {
        name: 'AI describes each photo',
        text: 'Zush uses AI vision models to understand the content of each photo — people, places, objects, events — and generates a clear, descriptive filename.',
      },
      {
        name: 'Apply and organize',
        text: 'Preview the new names, adjust your naming pattern, and apply. Your photo library is instantly searchable by filename.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-photos-with-ai',
    description:
      'AI photo renamer that replaces IMG_, HEIC, and RAW filenames with searchable descriptions for photo libraries, imports, and client shoots.',
    featureList: [
      'Rename HEIC, JPG, PNG, and major RAW photo formats',
      'Generate searchable names for iPhone and camera imports',
      'Batch rename entire photo libraries',
      'Automatic duplicate-safe naming with sequences',
      'Custom patterns with dates and AI descriptions',
      'Folder monitoring for ongoing photo workflows',
    ],
  },
});

const RenamePhotosWithAI = () => (
  <FeatureLandingPage
    h1="Rename Photos with AI"
    h1Accent="Rename Photos"
    category="photo"
    definitionTitle="What Is AI Photo Renaming?"
    definitionText="Rename photos with AI using Zush to replace IMG_, HEIC, and RAW camera filenames with searchable descriptions of the actual photo."
    showcaseSlides={[
      {
        files: [
          { before: 'IMG_2847.HEIC', after: 'Spiced Steak Dinner.heic', img: '/images/examples/food.jpg', type: 'image' },
          { before: '_DSC3921.ARW', after: 'Mountain Sunrise Fog.arw', img: '/images/examples/mountain.jpg', type: 'image' },
          { before: 'DSCF0445.RAF', after: 'Tokyo Night Skyline.raf', img: '/images/examples/city.jpg', type: 'image' },
          { before: 'P1080127.JPG', after: 'Yellow Wildflowers Field.jpg', img: '/images/examples/flowers.jpg', type: 'image' },
          { before: 'IMG_0023.CR3', after: 'Golden Retriever Autumn.cr3', img: '/images/examples/dog.jpg', type: 'image' },
          { before: 'DSC_7102.NEF', after: 'Sunset Over Harbor.nef', img: '/images/examples/sunset.jpg', type: 'image' },
        ],
      },
      {
        files: [
          { before: 'IMG_4201.HEIC', after: 'Sagrada Familia Evening.heic', img: '/images/examples/sagrada.jpg', type: 'image' },
          { before: 'DSC_0488.jpg', after: 'Spanish Tapas Plate.jpg', img: '/images/examples/tapas.jpg', type: 'image' },
          { before: 'CAM00847.jpg', after: 'Black Ford Mustang.jpg', img: '/images/examples/car.jpg', type: 'image' },
          { before: 'IMG_5523.HEIC', after: 'Pug Puppy Portrait.heic', img: '/images/examples/pug.jpg', type: 'image' },
          { before: '_DSC0192.NEF', after: 'Coffee Mug On Linen.nef', img: '/images/examples/coffee.jpg', type: 'image' },
          { before: 'P1080992.JPG', after: 'Forest Waterfall Scene.jpg', img: '/images/examples/nature.jpg', type: 'image' },
        ],
      },
      {
        files: [
          { before: 'IMG_0842.jpg', after: 'Tuxedo Cat Portrait.jpg', img: '/images/examples/cat.jpg', type: 'image' },
          { before: 'DCIM_0104.jpg', after: 'Park Guell Terrace.jpg', img: '/images/examples/parkguell.jpg', type: 'image' },
          { before: 'IMG_3039.HEIC', after: 'Modern Building Facade.heic', img: '/images/examples/building.jpg', type: 'image' },
          { before: '_DSC7721.ARW', after: 'Modern Office Corridor.arw', img: '/images/examples/office.jpg', type: 'image' },
          { before: 'CAM00233.HEIC', after: 'Spiced Steak Plate.heic', img: '/images/examples/food.jpg', type: 'image' },
          { before: 'DSCF2210.RAF', after: 'Designer Workspace Setup.raf', img: '/images/examples/workspace.jpg', type: 'image' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Zush for Mac', href: '/mac' },
    ]}
    relatedBlogPosts={[
      { title: 'Why Your Photos Are Named IMG and How to Fix It', href: 'why-your-photos-are-named-img-and-how-to-fix-it' },
      { title: 'Rename Photos for Social Media: Better Filenames for Reuse and SEO', href: 'rename-photos-for-social-media' },
      { title: 'Photo Management Workflow for Photographers on Mac', href: 'photo-management-workflow-photographers-mac' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenamePhotosWithAI;
