import type { Slide } from '@/components/FileShowcase';
import type { FeatureCategory } from '@/data/featureContent';

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedLink {
  title: string;
  href: string;
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
  jsonLd: object;
  category?: FeatureCategory;
}

const FeatureLandingPage = (_props: FeatureLandingPageProps) => null;

export default FeatureLandingPage;
