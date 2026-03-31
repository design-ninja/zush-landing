import type { FunctionComponent, ReactElement } from 'react';
import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';
import { VIDEO_OBJECTS_JSON_LD } from '@/seo/config';

export function getFeaturePageProps(
  featureView: FunctionComponent,
): FeatureLandingPageProps {
  const element = featureView({}) as ReactElement<FeatureLandingPageProps>;
  return element.props;
}

export const VIDEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': VIDEO_OBJECTS_JSON_LD,
};
