import { memo, lazy, Suspense } from 'react';
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

const Home = () => {
  const videosSection = useInViewOnce<HTMLDivElement>({ rootMargin: '450px 0px' });
  const featuresSection = useInViewOnce<HTMLDivElement>({ rootMargin: '450px 0px' });
  const useCasesSection = useInViewOnce<HTMLDivElement>({ rootMargin: '450px 0px' });
  const pricingSection = useInViewOnce<HTMLDivElement>({ rootMargin: '500px 0px' });
  const faqSection = useInViewOnce<HTMLDivElement>({ rootMargin: '500px 0px' });

  return (
    <>
      <Hero />
      <div ref={videosSection.ref}>
        {videosSection.isInView ? (
          <Suspense fallback={<SectionPlaceholder minHeight={520} />}>
            <Videos />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={520} />
        )}
      </div>
      <div
        ref={featuresSection.ref}
        id={featuresSection.isInView ? undefined : 'features'}
      >
        {featuresSection.isInView ? (
          <Suspense fallback={<SectionPlaceholder minHeight={760} />}>
            <Features />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={760} />
        )}
      </div>
      <div ref={useCasesSection.ref}>
        {useCasesSection.isInView ? (
          <Suspense fallback={<SectionPlaceholder minHeight={640} />}>
            <UseCases />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={640} />
        )}
      </div>
      <div
        ref={pricingSection.ref}
        id={pricingSection.isInView ? undefined : 'pricing'}
      >
        {pricingSection.isInView ? (
          <Suspense fallback={<SectionPlaceholder minHeight={720} />}>
            <Pricing />
          </Suspense>
        ) : (
          <SectionPlaceholder minHeight={720} />
        )}
      </div>
      <div
        ref={faqSection.ref}
        id={faqSection.isInView ? undefined : 'faq'}
      >
        {faqSection.isInView ? (
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
