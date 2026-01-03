import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Legal from './components/Legal';
import Changelog from './components/Changelog';
import ThankYou from './components/ThankYou';
import Recover from './components/Recover';
import Footer from './components/Footer';
import styles from './App.module.scss';

const MainContent = () => (
  <>
    <Hero />
    <Features />
    <Pricing />
  </>
);

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

