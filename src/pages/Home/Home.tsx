import { memo, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const Videos = lazy(() => import('@/components/Videos'));
const Features = lazy(() => import('@/components/Features'));
const UseCases = lazy(() => import('@/components/UseCases'));
const Pricing = lazy(() => import('@/components/Pricing'));
const FAQ = lazy(() => import('@/components/FAQ'));

const SectionPlaceholder = ({ minHeight }: { minHeight: number }) => (
  <div style={{ minHeight }} aria-hidden="true" />
);

const getForceLevelByHash = (hash: string): number => {
  switch (hash) {
    case '#features':
      return 2;
    case '#pricing':
      return 4;
    case '#faq':
      return 5;
    default:
      return 0;
  }
};

const Home = () => {
  const location = useLocation();
  const videosSection = useInViewOnce<HTMLDivElement>({ rootMargin: '450px 0px' });
  const featuresSection = useInViewOnce<HTMLDivElement>({ rootMargin: '450px 0px' });
  const useCasesSection = useInViewOnce<HTMLDivElement>({ rootMargin: '450px 0px' });
  const pricingSection = useInViewOnce<HTMLDivElement>({ rootMargin: '500px 0px' });
  const faqSection = useInViewOnce<HTMLDivElement>({ rootMargin: '500px 0px' });
  const forceLevel = getForceLevelByHash(location.hash);

  const shouldRenderVideos = videosSection.isInView || forceLevel >= 1;
  const shouldRenderFeatures = featuresSection.isInView || forceLevel >= 2;
  const shouldRenderUseCases = useCasesSection.isInView || forceLevel >= 3;
  const shouldRenderPricing = pricingSection.isInView || forceLevel >= 4;
  const shouldRenderFaq = faqSection.isInView || forceLevel >= 5;

  return (
    <>
      <Hero />
      <div ref={videosSection.ref}>
        {shouldRenderVideos ? (
          <Suspense fallback={<SectionPlaceholder minHeight={520} />}>
            <Videos />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={520} />
        )}
      </div>
      <div ref={featuresSection.ref}>
        {shouldRenderFeatures ? (
          <Suspense fallback={<SectionPlaceholder minHeight={760} />}>
            <Features />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={760} />
        )}
      </div>
      <div ref={useCasesSection.ref}>
        {shouldRenderUseCases ? (
          <Suspense fallback={<SectionPlaceholder minHeight={640} />}>
            <UseCases />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={640} />
        )}
      </div>
      <div ref={pricingSection.ref}>
        {shouldRenderPricing ? (
          <Suspense fallback={<SectionPlaceholder minHeight={720} />}>
            <Pricing />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={720} />
        )}
      </div>
      <div ref={faqSection.ref}>
        {shouldRenderFaq ? (
          <Suspense fallback={<SectionPlaceholder minHeight={700} />}>
            <FAQ />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={700} />
        )}
      </div>
    </>
  );
};

const MemoizedHome = memo(Home);

export default MemoizedHome;
