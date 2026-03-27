import FeatureLandingPage from '@/components/FeatureLandingPage';

const AIPhotoRenamer = () => (
  <FeatureLandingPage
    h1="AI Photo Renamer for macOS"
    definitionTitle="What Is an AI Photo Renamer?"
    definitionText="An AI photo renamer analyzes the visual content of each shot and produces searchable filenames. Supports RAW, HEIC, and all major camera formats."
    showcaseSlides={[{
      files: [
        { before: 'DSC_4821.NEF', after: 'Mountain Lake Reflection.nef', img: '/images/examples/nature.jpg', type: 'image' },
        { before: 'IMG_0293.HEIC', after: 'Woman Portrait Window.heic', img: '/images/examples/office.jpg', type: 'image' },
        { before: '_MG_1847.CR3', after: 'Wedding Bride Aisle.cr3', img: '/images/examples/flowers.jpg', type: 'image' },
        { before: 'DSCF0092.RAF', after: 'Leather Wallet Product.raf', img: '/images/examples/coffee.jpg', type: 'image' },
        { before: 'P1000412.RW2', after: 'Rainy Tokyo Crosswalk.rw2', img: '/images/examples/city.jpg', type: 'image' },
        { before: 'CAM_3318.jpg', after: 'Cat On Windowsill.jpg', img: '/images/examples/cat.jpg', type: 'image' },
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
        question: 'Does Zush support RAW files from my camera?',
        answer: 'Yes. Zush supports RAW formats from all major camera manufacturers: Canon (CR2, CR3), Nikon (NEF), Sony (ARW), Fujifilm (RAF), Panasonic (RW2), Olympus (ORF), Pentax (PEF), Samsung (SRW, SR2), and Adobe DNG. It analyzes the embedded preview to understand the photo content.',
      },
      {
        question: 'Can I rename HEIC photos from my iPhone?',
        answer: 'Absolutely. Zush handles HEIC and HEIF files natively, which are the default formats for iPhone photos. It analyzes the image content and produces descriptive names, making your iPhone photo library much easier to navigate.',
      },
      {
        question: 'How does Zush compare to Lightroom\'s rename feature?',
        answer: 'Lightroom uses template-based renaming with metadata tokens like date and sequence number, but it cannot describe what is in the photo. Zush uses AI vision to understand the actual content of each image, producing names like "sunset over harbor" instead of "2026-03-14_001".',
      },
      {
        question: 'Can I add a custom prefix or date to AI-generated names?',
        answer: 'Yes. Zush supports custom naming patterns that let you combine AI-generated descriptions with your own structure. You can prepend shoot dates, client codes, or category tags to the AI-suggested name.',
      },
      {
        question: 'Is bulk renaming fast enough for large shoots?',
        answer: 'Zush processes photos in batches and handles hundreds of files efficiently. The free tier lets you test AI renaming at no cost, and the Pro plan provides 10,000 renames for a one-time $10 payment — enough for dozens of full shoots.',
      },
    ]}
    relatedPages={[
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'AI Image Renamer', href: '/ai-image-renamer' },
      { title: 'AI File Renamer', href: '/ai-file-renamer' },
    ]}
    relatedBlogPosts={[
      { title: 'Photo Management Workflow for Photographers on Mac', href: 'photo-management-workflow-photographers-mac' },
      { title: 'Why Your Photos Are Named IMG_ and How to Fix It', href: 'why-your-photos-are-named-img-and-how-to-fix-it' },
      { title: 'HEIC & RAW Image Management Guide for macOS', href: 'heic-raw-image-management-guide-macos' },
    ]}
    jsonLd={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Zush',
          description: 'AI-powered photo renamer for macOS designed for photographers. Uses vision AI to analyze photo content and generate descriptive filenames, with native support for RAW, HEIC, and 18 image formats.',
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
              name: 'Does Zush support RAW files from my camera?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush supports RAW formats from all major camera manufacturers: Canon (CR2, CR3), Nikon (NEF), Sony (ARW), Fujifilm (RAF), Panasonic (RW2), Olympus (ORF), Pentax (PEF), Samsung (SRW, SR2), and Adobe DNG. It analyzes the embedded preview to understand the photo content.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I rename HEIC photos from my iPhone?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Zush handles HEIC and HEIF files natively, which are the default formats for iPhone photos. It analyzes the image content and produces descriptive names, making your iPhone photo library much easier to navigate.',
              },
            },
            {
              '@type': 'Question',
              name: "How does Zush compare to Lightroom's rename feature?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Lightroom uses template-based renaming with metadata tokens like date and sequence number, but it cannot describe what is in the photo. Zush uses AI vision to understand the actual content of each image, producing names like "sunset over harbor" instead of "2026-03-14_001".',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I add a custom prefix or date to AI-generated names?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Zush supports custom naming patterns that let you combine AI-generated descriptions with your own structure. You can prepend shoot dates, client codes, or category tags to the AI-suggested name.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is bulk renaming fast enough for large shoots?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zush processes photos in batches and handles hundreds of files efficiently. The free tier lets you test AI renaming at no cost, and the Pro plan provides 10,000 renames for a one-time $10 payment — enough for dozens of full shoots.',
              },
            },
          ],
        },
      ],
    }}
  />
);

export default AIPhotoRenamer;
