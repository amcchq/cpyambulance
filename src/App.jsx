import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationHandler from './components/NavigationHandler';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import FloatingButtons from './components/FloatingButtons';

// Lazy load pages (no artificial delay - natural loading)
const Home = lazy(() => import('./pages/Home'));
const Book = lazy(() => import('./pages/Book'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Quote = lazy(() => import('./pages/Quote'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Full page loading wrapper
const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-50">
      <LoadingSpinner />
    </div>
  );
};

// Simple page loader for navigation (smaller, non-intrusive)
const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
};

// App content that shows after loading
const AppContent = () => {
  return (
    <>
      <NavigationHandler />
      <FloatingButtons />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<Book />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Always show loading screen for 2 seconds on page load
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <FullPageLoader />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
