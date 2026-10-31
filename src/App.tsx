import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Manifesto } from './components/Manifesto';
import { FiveSteps } from './components/FiveSteps';
import { MaskWord } from './components/MaskWord';
import { MenuSection } from './components/MenuSection';
import { Offers } from './components/Offers';
import { AfterDark } from './components/AfterDark';
import { Pour } from './components/Pour';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { MenuPage } from './pages/MenuPage';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>(
    window.location.hash === '#/menu' ? 'menu' : 'home'
  );

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/menu') {
        setCurrentRoute('menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === 'menu') {
    return <MenuPage onBackToHome={navigateToHome} />;
  }

  return (
    <div className="app-root" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 00. Initial Split Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* 01. Sticky Header Navigation with Live Status Pill */}
      <Navbar />

      <main>
        {/* 02. Scrubbed Hero Section with 8 dishes */}
        <Hero />

        {/* 03. Velocity-reactive Dual Marquee */}
        <Marquee />

        {/* 04. 01 The Vibe — Manifesto with progressive word-illumination */}
        <Manifesto />

        {/* 05. 02 Five steps · One memory — Horizontal scroll journey */}
        <FiveSteps />

        {/* 06. Mask Word — CRUSH ambient text zoom */}
        <MaskWord />

        {/* 08. 04 The Menu — Signature dishes & categorized tabbed menu */}
        <MenuSection />

        {/* Exclusive Promotions & Coupons */}
        <Offers />

        {/* 09. 05 After Dark — Charcoal stage with rising bokeh canvas particles */}
        <AfterDark />

        {/* 10. Pour — Hot fudge kinetic typography stack & highlight dishes */}
        <Pour />

        {/* 11. Visit — Live opening hours, counters, directions & CTAs */}
        <Visit />
      </main>

      {/* 13. Footer — Giant letter-by-letter wordmark, quick links & compliance */}
      <Footer />
    </div>
  );
};

export default App;
