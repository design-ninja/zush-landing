import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { memo } from 'react';
import { useTheme } from './hooks/useTheme';
import { useCheckoutAutoOpen } from './hooks/useCheckoutAutoOpen';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Legal from './components/Legal';
import Changelog from './components/Changelog';
import ThankYou from './components/ThankYou';
import Recover from './components/Recover';
import Activate from './components/Activate';
import ManageSubscription from './components/ManageSubscription';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer';
import styles from './App.module.scss';

const MainContent = memo(() => (
  <>
    <Hero />
    <Features />
    <Pricing />
    <FAQ />
  </>
));

const AppContent = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  useCheckoutAutoOpen();
  
  return (
    <>
      <ScrollToTop />
      <div className={styles.App}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className={styles.App__Main}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/terms-of-service" element={<Legal type="tos" />} />
            <Route path="/privacy-policy" element={<Legal type="privacy" />} />
            <Route path="/refund-policy" element={<Legal type="refund" />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/recover" element={<Recover />} />
            <Route path="/activate" element={<Activate />} />
            <Route path="/manage-subscription" element={<ManageSubscription />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
