import Hero from '@/components/Hero';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import SupportedFormats from '@/components/SupportedFormats';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import DownloadCTA from '@/components/DownloadCTA';

const Home = () => (
  <>
    <Hero />
    <Videos />
    <Features />
    <SupportedFormats />
    <DownloadCTA />
    <ComparisonTable />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
);

export default Home;
