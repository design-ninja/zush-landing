import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useCheckoutAutoOpen } from './hooks/useCheckoutAutoOpen';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Legal from './pages/Legal';
import Changelog from './pages/Changelog';
import ThankYou from './pages/ThankYou';
import Recover from './pages/Recover';
import Activate from './pages/Activate';
import ManageSubscription from './pages/ManageSubscription';
import Upgrade from './pages/Upgrade';
import NotFound from './pages/NotFound/NotFound';

import styles from './App.module.scss';

const AppContent = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  useCheckoutAutoOpen();
  
  return (
    <>
      <ScrollToTop />
      <div className={styles.App}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className={styles.App__Main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/terms-of-service" element={<Legal type="tos" />} />
            <Route path="/privacy-policy" element={<Legal type="privacy" />} />
            <Route path="/refund-policy" element={<Legal type="refund" />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/recover" element={<Recover />} />
            <Route path="/activate" element={<Activate />} />
            <Route path="/manage-subscription" element={<ManageSubscription />} />
            <Route path="/upgrade" element={<Upgrade />} />
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
