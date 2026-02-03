import { memo, lazy, Suspense, useEffect, useState } from 'react';
import Hero from '@/components/Hero';

const Videos = lazy(() => import('@/components/Videos'));
const Features = lazy(() => import('@/components/Features'));
const UseCases = lazy(() => import('@/components/UseCases'));
const Pricing = lazy(() => import('@/components/Pricing'));
const FAQ = lazy(() => import('@/components/FAQ'));

const SectionPlaceholder = ({ minHeight }: { minHeight: number }) => (
  <div style={{ minHeight }} aria-hidden="true" />
);

const Home = () => {
  const [renderDeferred, setRenderDeferred] = useState(false);

  useEffect(() => {
    const windowWithIdle = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (windowWithIdle.requestIdleCallback) {
      const idleId = windowWithIdle.requestIdleCallback(
        () => setRenderDeferred(true),
        { timeout: 1500 }
      );
      return () => windowWithIdle.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => setRenderDeferred(true), 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Hero />
      {renderDeferred ? (
        <Suspense fallback={<SectionPlaceholder minHeight={520} />}>
          <Videos />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={520} />
      )}
      {renderDeferred ? (
        <Suspense fallback={<SectionPlaceholder minHeight={760} />}>
          <Features />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={760} />
      )}
      {renderDeferred ? (
        <Suspense fallback={<SectionPlaceholder minHeight={640} />}>
          <UseCases />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={640} />
      )}
      {renderDeferred ? (
        <Suspense fallback={<SectionPlaceholder minHeight={720} />}>
          <Pricing />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={720} />
      )}
      {renderDeferred ? (
        <Suspense fallback={<SectionPlaceholder minHeight={700} />}>
          <FAQ />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={700} />
      )}
    </>
  );
};

const MemoizedHome = memo(Home);

export default MemoizedHome;
