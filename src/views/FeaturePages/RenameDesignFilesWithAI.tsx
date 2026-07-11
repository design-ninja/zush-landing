import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Which design file formats does Zush support?',
    answer:
      'Zush supports Sketch, Figma .fig, Adobe Illustrator .ai, and Photoshop .psd files. These formats live in a dedicated design category, separate from ordinary image formats.',
  },
  {
    question: 'How does Zush understand design files?',
    answer:
      'Zush uses available previews and platform rendering support to analyze what the design file shows, then generates names based on screens, components, brand assets, and project context.',
  },
  {
    question: 'Can Zush rename source files and exported images together?',
    answer:
      'Yes. You can batch rename design source files alongside screenshots, exported images, PDFs, documents, audio, and videos in the same review flow.',
  },
  {
    question: 'Will Zush edit my design file content?',
    answer:
      'No. Zush only changes the filename on disk. It does not modify layers, artboards, linked assets, symbols, pages, or internal document structure.',
  },
  {
    question: 'Can I use naming conventions for design handoff?',
    answer:
      'Yes. You can save templates and combine Naming Blocks for repeatable names like client-project-screen-state.fig or brand-channel-asset-role.psd.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Design Files with AI',
    description:
      'Use Zush to automatically rename Sketch, Figma, Illustrator, and PSD files based on visual previews and design context.',
    steps: [
      {
        name: 'Add design files',
        text: 'Drag Sketch, Figma .fig, Adobe Illustrator .ai, or Photoshop .psd files into Zush, or select a folder with mixed design assets.',
      },
      {
        name: 'AI analyzes design previews',
        text: 'Zush uses available visual previews and file context to identify screens, flows, components, logos, and campaign assets.',
      },
      {
        name: 'Review and apply names',
        text: 'Preview the suggested names, regenerate weak results, and apply the batch rename with history for rollback.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-design-files-with-ai',
    description:
      'AI design file renamer for Sketch, Figma .fig, Illustrator .ai, and PSD files.',
    featureList: [
      'Rename Sketch, Figma .fig, Adobe Illustrator .ai, and Photoshop .psd files',
      'Generate names from design previews and project context',
      'Batch rename design files alongside images, PDFs, documents, audio, and videos',
      'Templates for design handoff and campaign asset naming',
      'Naming Blocks for client, project, screen, component, channel, and date',
      'Full rename history with one-click revert',
    ],
  },
});

const RenameDesignFilesWithAI = () => (
  <FeatureLandingPage
    h1="Rename Design Files with AI"
    h1Accent="Rename Design Files"
    category="design"
    definitionTitle="What Is AI Design File Renaming?"
    definitionText="Rename design files with AI using Zush to turn generic Sketch, Figma .fig, Adobe Illustrator .ai, and PSD filenames into searchable names based on visual previews and project context."
    showcaseSlides={[
      {
        files: [
          { before: 'checkout-flow.fig', after: 'Mobile Checkout Flow.fig', type: 'design', label: 'FIG' },
          { before: 'mockup-v7.sketch', after: 'SaaS Dashboard Mockup.sketch', type: 'design', label: 'SKETCH' },
          { before: 'logo.ai', after: 'Acme Logo Concepts.ai', type: 'design', label: 'AI' },
          { before: 'hero-final.psd', after: 'Landing Hero Composition.psd', type: 'design', label: 'PSD' },
          { before: 'settings-artboards.fig', after: 'Settings Flow Artboards.fig', type: 'design', label: 'FIG' },
          { before: 'campaign-template.psd', after: 'Spring Campaign Social Template.psd', type: 'design', label: 'PSD' },
        ],
      },
      {
        files: [
          { before: 'wireframe_copy.sketch', after: 'Onboarding Wireframe Set.sketch', type: 'design', label: 'SKETCH' },
          { before: 'brand-assets.ai', after: 'Brand Icon Asset Sheet.ai', type: 'design', label: 'AI' },
          { before: 'design-system.fig', after: 'Design System Components.fig', type: 'design', label: 'FIG' },
          { before: 'ad-creative-final.psd', after: 'Product Launch Ad Creative.psd', type: 'design', label: 'PSD' },
          { before: 'profile-redesign.fig', after: 'User Profile Redesign.fig', type: 'design', label: 'FIG' },
          { before: 'presentation-cover.ai', after: 'Investor Deck Cover Art.ai', type: 'design', label: 'AI' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'Zush for Mac', href: '/mac' },
    ]}
    relatedBlogPosts={[
      { title: 'Digital Asset Management for Designers on Mac', href: 'digital-asset-management-designers-mac' },
      { title: 'AI Image Tagging vs Manual Photo Organization', href: 'ai-image-tagging-vs-manual-photo-organization' },
      { title: 'Screenshot Naming Conventions for macOS', href: 'screenshot-naming-conventions-macos' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameDesignFilesWithAI;
