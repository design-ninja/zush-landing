import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildSoftwareApplicationJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Does Zush support RAW camera formats?',
    answer: 'Yes. Zush supports all major RAW formats including CR2, CR3, NEF, ARW, DNG, ORF, RAF, RW2, PEF, SRW, SR2, and generic RAW files. It analyzes the embedded preview to understand the image content and generate an accurate name.',
  },
  {
    question: 'How accurate is AI image renaming?',
    answer: 'Modern vision models are very good at identifying subjects, scenes, and context in images. Zush lets you review every suggested name before applying it, so you stay in control. Most users find the suggestions accurate enough to apply in bulk with minimal edits.',
  },
  {
    question: 'Can I rename thousands of images at once?',
    answer: 'Absolutely. Zush handles batch renaming natively — drop an entire folder of images and it will process them all. The free tier lets you try AI renaming at no cost, and the Pro plan offers 10,000 renames for a one-time payment of $10.',
  },
  {
    question: 'Does AI image renaming work offline?',
    answer: 'No, an internet connection is required since the AI analysis happens via cloud-based vision models. However, your images are only sent for analysis and are never stored on remote servers after processing.',
  },
  {
    question: 'Can I set up automatic renaming for new images?',
    answer: 'Yes. Zush includes folder monitoring that watches a directory for new files and renames them automatically as they appear. This is useful for screenshots folders, camera import directories, or download locations.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    buildSoftwareApplicationJsonLd({
      pagePath: '/ai-image-renamer',
      description:
        'AI-powered image renamer for macOS that uses vision models to rename screenshots, photos, downloaded images, and design assets with descriptive filenames.',
      featureList: [
        'AI renaming for screenshots and downloaded images',
        'Photo and design asset naming across 22 image formats',
        'Batch rename with review before apply',
        'Automatic folder monitoring for incoming images',
        'Support for HEIC, RAW, JPG, PNG, and WebP',
        'Bring Your Own API Key (BYOK)',
      ],
    }),
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

const AIImageRenamer = () => (
  <FeatureLandingPage
    h1="AI Image Renamer for Mac"
    h1Accent="AI Image Renamer"
    category="image"
    definitionTitle="What Is an AI Image Renamer?"
    definitionText="Use Zush as an AI image renamer for Mac for screenshots, photos, downloads, and design assets with descriptive names and repeatable cleanup."
    showcaseSlides={[
      {
        files: [
          { before: 'IMG_3847.jpg', after: 'Mountain Autumn Foliage.jpg', img: '/images/examples/mountain.jpg', type: 'image' },
          { before: 'DSC_0192.NEF', after: 'Coffee Mug On Linen.nef', img: '/images/examples/coffee.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-10.png', after: 'Revenue Dashboard View.png', img: '/images/examples/dashboard.jpg', type: 'image' },
          { before: 'DCIM_0038.HEIC', after: 'Backyard Barbecue.heic', img: '/images/examples/food.jpg', type: 'image' },
          { before: 'image (12).webp', after: 'Social Media Statistics.webp', img: '/images/examples/chart.jpg', type: 'image' },
          { before: 'CAM_0021.jpg', after: 'Tokyo Night Skyline.jpg', img: '/images/examples/city.jpg', type: 'image' },
        ],
      },
      {
        files: [
          { before: 'PXL_20240720.jpg', after: 'Yellow Wildflowers Field.jpg', img: '/images/examples/flowers.jpg', type: 'image' },
          { before: 'IMG_0842.jpg', after: 'Persian Cat Napping.jpg', img: '/images/examples/cat.jpg', type: 'image' },
          { before: 'Screenshot 2026-02-18.png', after: 'Architecture Flow Diagram.png', img: '/images/examples/diagram.jpg', type: 'image' },
          { before: 'IMG_5523.HEIC', after: 'Pug Puppy Portrait.heic', img: '/images/examples/pug.jpg', type: 'image' },
          { before: 'DCIM_0072.jpg', after: 'Home Office Workspace.jpg', img: '/images/examples/office.jpg', type: 'image' },
          { before: 'CAM00233.HEIC', after: 'Golden Hour Sunset.heic', img: '/images/examples/sunset.jpg', type: 'image' },
        ],
      },
      {
        files: [
          { before: 'IMG_4201.HEIC', after: 'Sagrada Familia Evening.heic', img: '/images/examples/sagrada.jpg', type: 'image' },
          { before: 'DSC_0488.jpg', after: 'Spanish Tapas Plate.jpg', img: '/images/examples/tapas.jpg', type: 'image' },
          { before: 'Screenshot 2026-03-22.png', after: 'Designer Workspace Setup.png', img: '/images/examples/workspace.jpg', type: 'image' },
          { before: 'DCIM_0104.jpg', after: 'Golden Retriever At Park.jpg', img: '/images/examples/dog.jpg', type: 'image' },
          { before: 'CAM00847.jpg', after: 'Black Ford Mustang.jpg', img: '/images/examples/car.jpg', type: 'image' },
          { before: 'IMG_2019.CR2', after: 'Forest Waterfall Scene.cr2', img: '/images/examples/nature.jpg', type: 'image' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'AI File Renamer for macOS', href: '/ai-file-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename Images with AI on Mac (2026 Step-by-Step)', href: 'how-to-rename-images-with-ai-on-macos' },
      { title: 'AI Image Tagging vs Manual Photo Organization', href: 'ai-image-tagging-vs-manual-photo-organization' },
      { title: 'Best AI File Renamer for Mac (2026): 6 Tools Compared', href: 'best-ai-file-renamer-tools-mac-compared' },
    ]}
    jsonLd={jsonLd}
  />
);

export default AIImageRenamer;
