import type { FunctionComponent, ReactElement } from 'react';
import type { FeatureLandingPageProps } from '@/components/FeatureLandingPage';

export function getFeaturePageProps(
  featureView: FunctionComponent,
): FeatureLandingPageProps {
  const element = featureView({}) as ReactElement<FeatureLandingPageProps>;
  return element.props;
}
