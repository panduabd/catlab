import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProductSection } from './components/ProductSection';
import { GetYourProductsSection } from './components/GetYourProductsSection';
import { VideoSection } from './components/VideoSection';
import { InstructionsSection } from './components/InstructionsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ComparisonSection } from './components/ComparisonSection';
import { ConnectedCareSection } from './components/ConnectedCareSection';
import { CTASection } from './components/CTASection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { MyAccountPage } from './components/MyAccountPage';
import { AuthPage } from './components/AuthPage';
import { AdminPortal } from './components/admin/AdminPortal';
import { Footer } from './components/Footer';

export type ViewMode =
  | 'home'
  | 'catalog'
  | 'product'
  | 'contact'
  | 'checkout'
  | 'account'
  | 'admin'
  | 'login'
  | 'register'
  | 'forgot-password';

export const App: React.FC = () => {
  const [accountTab, setAccountTab] = useState<'orders' | 'profile' | 'address'>('orders');

  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    if (
      pathname.includes('/admin') ||
      hash === '#admin'
    ) {
      return 'admin';
    }

    if (
      pathname.includes('/login') ||
      hash === '#login'
    ) {
      return 'login';
    }

    if (
      pathname.includes('/register') ||
      pathname.includes('/signup') ||
      hash === '#register' ||
      hash === '#signup'
    ) {
      return 'register';
    }

    if (
      pathname.includes('/forgot-password') ||
      pathname.includes('/reset-password') ||
      hash === '#forgot-password' ||
      hash === '#reset-password'
    ) {
      return 'forgot-password';
    }

    if (
      pathname.includes('/account') ||
      pathname.includes('/my-account') ||
      hash === '#account' ||
      hash === '#my-account'
    ) {
      return 'account';
    }

    if (pathname.includes('/checkout') || hash === '#checkout') {
      return 'checkout';
    }

    if (pathname.includes('/contact')) return 'contact';

    // Detail product page (/detail-product)
    if (
      pathname.includes('/detail-product') ||
      pathname.includes('/product-detail') ||
      hash === '#detail-product' ||
      hash === '#product-detail'
    ) {
      return 'product';
    }

    // Products catalog page (/products, previously /catalog)
    if (
      pathname.includes('/products') ||
      pathname.includes('/catalog') ||
      hash === '#products' ||
      hash === '#catalog'
    ) {
      return 'catalog';
    }

    return 'home';
  });

  const handleNavigate = (
    view: ViewMode,
    anchor?: string,
    initialAccountTab?: 'orders' | 'profile' | 'address'
  ) => {
    setCurrentView(view);

    if (view === 'admin') {
      try {
        window.history.pushState(null, '', '/admin');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'login') {
      try {
        window.history.pushState(null, '', '/login');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'register') {
      try {
        window.history.pushState(null, '', '/register');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'forgot-password') {
      try {
        window.history.pushState(null, '', '/forgot-password');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'account') {
      if (initialAccountTab) {
        setAccountTab(initialAccountTab);
      } else {
        setAccountTab('orders');
      }
      try {
        window.history.pushState(null, '', '/account');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'checkout') {
      try {
        window.history.pushState(null, '', '/checkout');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'contact') {
      try {
        window.history.pushState(null, '', '/contact');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'catalog') {
      // Catalog page now points to /products (migrated from /catalog)
      try {
        window.history.pushState(null, '', '/products');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'product') {
      // Product detail page now points to /detail-product (moved from /products)
      try {
        window.history.pushState(null, '', '/detail-product');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      try {
        window.history.pushState(null, '', '/');
      } catch {
        // ignore
      }
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (
        pathname.includes('/admin') ||
        hash === '#admin'
      ) {
        setCurrentView('admin');
      } else if (
        pathname.includes('/login') ||
        hash === '#login'
      ) {
        setCurrentView('login');
      } else if (
        pathname.includes('/register') ||
        pathname.includes('/signup') ||
        hash === '#register' ||
        hash === '#signup'
      ) {
        setCurrentView('register');
      } else if (
        pathname.includes('/forgot-password') ||
        pathname.includes('/reset-password') ||
        hash === '#forgot-password' ||
        hash === '#reset-password'
      ) {
        setCurrentView('forgot-password');
      } else if (
        pathname.includes('/account') ||
        pathname.includes('/my-account') ||
        hash === '#account' ||
        hash === '#my-account'
      ) {
        setCurrentView('account');
      } else if (pathname.includes('/checkout') || hash === '#checkout') {
        setCurrentView('checkout');
      } else if (pathname.includes('/contact')) {
        setCurrentView('contact');
      } else if (
        pathname.includes('/detail-product') ||
        pathname.includes('/product-detail') ||
        hash === '#detail-product' ||
        hash === '#product-detail'
      ) {
        setCurrentView('product');
      } else if (
        pathname.includes('/products') ||
        pathname.includes('/catalog') ||
        hash === '#products' ||
        hash === '#catalog'
      ) {
        setCurrentView('catalog');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-text-primary">
      <main>
        {currentView !== 'checkout' && currentView !== 'admin' && (
          <Navbar currentView={currentView} onNavigate={handleNavigate} />
        )}
        {currentView === 'home' ? (
          <>
            <Hero />
            <Marquee />
            <ProductSection onNavigate={handleNavigate} />
            <GetYourProductsSection onNavigate={handleNavigate} />
            <VideoSection />
            <InstructionsSection />
            <FeaturesSection />
            <ComparisonSection />
            <ConnectedCareSection />
            <CTASection onNavigate={handleNavigate} />
            <FAQSection />
          </>
        ) : currentView === 'catalog' ? (
          <CatalogPage onNavigate={handleNavigate} />
        ) : currentView === 'product' ? (
          <ProductDetailPage onNavigate={handleNavigate} />
        ) : currentView === 'checkout' ? (
          <CheckoutPage onNavigate={handleNavigate} />
        ) : currentView === 'account' ? (
          <MyAccountPage onNavigate={handleNavigate} initialTab={accountTab} />
        ) : currentView === 'admin' ? (
          <AdminPortal onNavigateToStorefront={handleNavigate} />
        ) : currentView === 'login' || currentView === 'register' || currentView === 'forgot-password' ? (
          <AuthPage initialMode={currentView} onNavigate={handleNavigate} />
        ) : (
          <ContactSection />
        )}
      </main>
      {currentView !== 'checkout' && currentView !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
