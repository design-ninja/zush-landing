import { memo } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';

const Home = memo(() => (
  <>
    <Hero />
    <Features />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
));

export default Home;
