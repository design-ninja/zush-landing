import Hero from '@/components/Hero';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import SupportedFormats from '@/components/SupportedFormats';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import WhyZush from '@/components/WhyZush';
import FAQ from '@/components/FAQ';
import DownloadCTA from '@/components/DownloadCTA';

const Home = () => (
  <>
    <Hero />
    <Videos autoplayWhenInView />
    <Features />
    <SupportedFormats />
    <DownloadCTA />
    <WhyZush />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
);

export default Home;
