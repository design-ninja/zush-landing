import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIImageRenamer = () => (
  <FeatureLandingPage
    h1="AI Image Renamer for macOS"
    definitionTitle="What Makes a Great AI Image Renamer?"
    definitionText="A good AI image renamer goes beyond simple metadata extraction. It uses vision models to actually look at the image — identifying subjects, scenes, colors, and context — then generates a clear, descriptive filename. The best tools support RAW camera formats, work with batch selections, and let you monitor folders so new images are renamed automatically without manual intervention."
    beforeAfterExamples={[
      { before: 'IMG_3847.jpg', after: 'Mountain landscape — autumn foliage at sunrise.jpg' },
      { before: 'DSC_0192.NEF', after: 'Product flat lay — ceramic coffee mug on linen.nef' },
      { before: 'Screenshot 2026-03-10 at 14.22.01.png', after: 'Figma mockup — mobile app login screen.png' },
      { before: 'DCIM_0038.HEIC', after: 'Family dinner — backyard barbecue July 2026.heic' },
      { before: 'image (12).webp', after: 'Infographic — 2026 social media statistics.webp' },
    ]}
    supportedFormats={[
      'PNG', 'JPG', 'JPEG', 'WEBP', 'GIF', 'HEIC', 'HEIF', 'TIFF', 'BMP', 'SVG', 'PDF',
      'CR2', 'CR3', 'NEF', 'ARW', 'DNG', 'ORF', 'RAF', 'RW2', 'PEF', 'SRW', 'SR2', 'RAW',
    ]}
    comparisonRows={[
      { tool: 'Zush', platform: 'macOS (native)', aiPowered: 'Yes (vision + language)', batchRename: 'Yes', autoMonitor: 'Yes', freeTier: 'Free tier' },
      { tool: 'AI Renamer', platform: 'macOS / Windows', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited trial' },
      { tool: 'Renamer.ai', platform: 'Web', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited' },
      { tool: 'WaFile', platform: 'macOS', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited trial' },
      { tool: 'Cantrips.ai', platform: 'Web', aiPowered: 'Yes', batchRename: 'Yes', autoMonitor: 'No', freeTier: 'Limited' },
    ]}
    faqItems={[
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
    ]}
    relatedPages={[
      { title: 'Rename Images with AI', href: '/rename-images-with-ai' },
      { title: 'AI Photo Renamer', href: '/ai-photo-renamer' },
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'AI Image Renamer for Mac: The Complete Guide', href: 'ai-image-renamer-for-mac' },
      { title: 'How AI Image Recognition Works for File Naming', href: 'how-ai-image-recognition-works' },
      { title: 'AI Image Tagging vs Manual Photo Organization', href: 'ai-image-tagging-vs-manual-photo-organization' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Zush',
          description: 'AI-powered image renamer for macOS that uses vision models to analyze photos and generate descriptive filenames automatically.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'macOS 14.0+',
          offers: [
            {
              '@type': 'Offer',
              name: 'Free',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free tier available',
            },
            {
              '@type': 'Offer',
              name: 'Pro',
              price: '10',
              priceCurrency: 'USD',
              description: '10,000 AI renames, one-time payment',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Does Zush support RAW camera formats?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush supports all major RAW formats including CR2, CR3, NEF, ARW, DNG, ORF, RAF, RW2, PEF, SRW, SR2, and generic RAW files. It analyzes the embedded preview to understand the image content and generate an accurate name.',
              },
            },
            {
              '@type': 'Question',
              name: 'How accurate is AI image renaming?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Modern vision models are very good at identifying subjects, scenes, and context in images. Zush lets you review every suggested name before applying it, so you stay in control. Most users find the suggestions accurate enough to apply in bulk with minimal edits.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I rename thousands of images at once?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Zush handles batch renaming natively — drop an entire folder of images and it will process them all. The free tier lets you try AI renaming at no cost, and the Pro plan offers 10,000 renames for a one-time payment of $10.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does AI image renaming work offline?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No, an internet connection is required since the AI analysis happens via cloud-based vision models. However, your images are only sent for analysis and are never stored on remote servers after processing.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I set up automatic renaming for new images?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush includes folder monitoring that watches a directory for new files and renames them automatically as they appear. This is useful for screenshots folders, camera import directories, or download locations.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AIImageRenamer;
