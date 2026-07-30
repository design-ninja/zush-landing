import type { ComparisonTableProps } from '@/components/ComparisonTable/types';
import type { Slide } from '@/components/FileShowcase';
import type { FeatureCategory } from '@/data/featureContent';
import type { DownloadOS } from '@/utils/download';

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedLink {
  title: string;
  href: string;
}

interface ContextualGuideLink {
  before: string;
  label: string;
  href: string;
  after?: string;
}

interface DirectAnswerSection {
  heading: string;
  answer: string;
  steps: string[];
}

export interface FeatureLandingPageProps {
  h1: string;
  h1Accent?: string;
  definitionTitle?: string;
  definitionText: string;
  showcaseSlides: Slide[];
  faqItems: FAQItem[];
  relatedBlogPosts: RelatedLink[];
  relatedPages: RelatedLink[];
  contextualGuideLink?: ContextualGuideLink;
  directAnswerSection?: DirectAnswerSection;
  comparison?: ComparisonTableProps;
  /**
   * Pin the download UI to one OS. Without it the buttons fall back to runtime
   * detection, which server-renders as Mac — wrong in the static HTML that
   * crawlers and AI extractors read, on pages whose whole subject is one
   * platform. Set it only where the topic itself implies the OS.
   */
  forceOS?: DownloadOS;
  jsonLd: object;
  category?: FeatureCategory;
}

const FeatureLandingPage = (_props: FeatureLandingPageProps) => null;

export default FeatureLandingPage;
