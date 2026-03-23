import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useCheckoutAutoOpen } from './hooks/useCheckoutAutoOpen';
import { useSeo } from './hooks/useSeo';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppLink from './components/AppLink';

// Primary page - loaded immediately
import Home from './pages/Home';

// Secondary pages - lazy loaded
const Legal = lazy(() => import('./pages/Legal'));
const Changelog = lazy(() => import('./pages/Changelog'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Recover = lazy(() => import('./pages/Recover'));
const Activate = lazy(() => import('./pages/Activate'));
const ManageSubscription = lazy(() => import('./pages/ManageSubscription'));
const BYOKSetup = lazy(() => import('./pages/BYOKSetup'));
const BlogList = lazy(() => import('./pages/Blog/BlogList'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// SEO Landing Pages
const RenameFilesWithAI = lazy(() => import('./pages/FeaturePages/RenameFilesWithAI'));
const AIFileRenamer = lazy(() => import('./pages/FeaturePages/AIFileRenamer'));
const AutoRenameFiles = lazy(() => import('./pages/FeaturePages/AutoRenameFiles'));
const RenameImagesWithAI = lazy(() => import('./pages/FeaturePages/RenameImagesWithAI'));
const RenameDocumentsWithAI = lazy(() => import('./pages/FeaturePages/RenameDocumentsWithAI'));
const RenamePDFWithAI = lazy(() => import('./pages/FeaturePages/RenamePDFWithAI'));
const RenameScreenshotsWithAI = lazy(() => import('./pages/FeaturePages/RenameScreenshotsWithAI'));
const RenamePhotosWithAI = lazy(() => import('./pages/FeaturePages/RenamePhotosWithAI'));
const AIImageRenamer = lazy(() => import('./pages/FeaturePages/AIImageRenamer'));
const AIDocumentRenamer = lazy(() => import('./pages/FeaturePages/AIDocumentRenamer'));
const AIPDFRenamer = lazy(() => import('./pages/FeaturePages/AIPDFRenamer'));
const AIScreenshotRenamer = lazy(() => import('./pages/FeaturePages/AIScreenshotRenamer'));
const AIPhotoRenamer = lazy(() => import('./pages/FeaturePages/AIPhotoRenamer'));

import styles from './App.module.scss';

const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    opacity: 0.5
  }}>
    Loading…
  </div>
);

const AppContent = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  useCheckoutAutoOpen();
  useSeo();

  return (
    <>
      <ScrollToTop />
      <div className={styles.App}>
        <AppLink className={styles.SkipLink} href="#main-content">
          Skip to content
        </AppLink>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main id="main-content" className={styles.App__Main}>
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/byok-setup" element={<BYOKSetup />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* SEO Landing Pages */}
              <Route path="/rename-files-with-ai" element={<RenameFilesWithAI />} />
              <Route path="/ai-file-renamer" element={<AIFileRenamer />} />
              <Route path="/auto-rename-files" element={<AutoRenameFiles />} />
              <Route path="/rename-images-with-ai" element={<RenameImagesWithAI />} />
              <Route path="/rename-documents-with-ai" element={<RenameDocumentsWithAI />} />
              <Route path="/rename-pdf-with-ai" element={<RenamePDFWithAI />} />
              <Route path="/rename-screenshots-with-ai" element={<RenameScreenshotsWithAI />} />
              <Route path="/rename-photos-with-ai" element={<RenamePhotosWithAI />} />
              <Route path="/ai-image-renamer" element={<AIImageRenamer />} />
              <Route path="/ai-document-renamer" element={<AIDocumentRenamer />} />
              <Route path="/ai-pdf-renamer" element={<AIPDFRenamer />} />
              <Route path="/ai-screenshot-renamer" element={<AIScreenshotRenamer />} />
              <Route path="/ai-photo-renamer" element={<AIPhotoRenamer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
