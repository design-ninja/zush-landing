import { memo } from 'react';
import Hero from '@/components/Hero';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';

const Home = memo(() => (
  <>
    <Hero />
    <Videos />
    <Features />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
));

export default Home;
