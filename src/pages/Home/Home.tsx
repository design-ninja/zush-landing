import Hero from '@/components/Hero';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import SupportedFormats from '@/components/SupportedFormats';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';

const Home = () => (
  <>
    <Hero />
    <Videos />
    <Features />
    <SupportedFormats />
    <ComparisonTable />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
);

export default Home;
