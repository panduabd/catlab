import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CartDrawer } from './CartDrawer';

export type NavView = 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (
    view: NavView,
    anchor?: string,
    accountTab?: 'orders' | 'profile' | 'address'
  ) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { language, t } = useLanguage();
  const { totalQuantity, openCart } = useCart();
  const { isAuthenticated, user, login, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(target) &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (anchor?: string) => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    onNavigate('home', anchor);
  };

  const navLinks = [
    { label: 'Products', isProduct: true },
    { label: 'How It Works', anchor: 'how-it-works' },
    { label: 'FAQs', anchor: 'faqs' },
    { label: 'Contact Us', isContact: true }
  ];

  // Render the Profile Menu Dropdown Content (Shared between desktop and mobile)
  const renderProfileDropdown = () => (
    <div className="w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 text-left">
      {isAuthenticated ? (
        // ==========================================
        // SIGNED-IN MEMBER STATE
        // ==========================================
        <div>
          {/* Member Card Header (No online icon, no active member badge) */}
          <div className="pb-4 border-b border-gray-100 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow/20 text-charcoal border-2 border-yellow font-extrabold text-sm shrink-0 shadow-2xs">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 truncate leading-snug">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Action Buttons: My Account & Order History (NO ICONS, NO SUBTITLES) */}
          <div className="py-3 space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                setIsMobileMenuOpen(false);
                onNavigate('account', undefined, 'orders');
              }}
              className="w-full text-left rounded-xl bg-gray-50 hover:bg-yellow hover:text-charcoal px-4 py-2.5 text-xs font-bold text-gray-800 transition-all cursor-pointer"
            >
              My Account
            </button>

            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                setIsMobileMenuOpen(false);
                onNavigate('account', undefined, 'orders');
              }}
              className="w-full text-left rounded-xl bg-gray-50 hover:bg-yellow hover:text-charcoal px-4 py-2.5 text-xs font-bold text-gray-800 transition-all cursor-pointer"
            >
              Order History
            </button>
          </div>

          {/* Footer: Help & Sign Out */}
          <div className="border-t border-gray-100 pt-3 space-y-1">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                handleNavClick('faqs');
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-left cursor-pointer"
            >
              <i className="fi fi-sr-bell text-gray-400" style={{ fontSize: '0.85rem' }} />
              <span>{language === 'en' ? 'Help & Support' : '常見問題與客服'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                logout();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <i className="fi fi-sr-exit text-rose-500" style={{ fontSize: '0.85rem' }} />
              <span>{language === 'en' ? 'Sign Out' : '登出帳號'}</span>
            </button>
          </div>
        </div>
      ) : (
        // ==========================================
        // GUEST STATE (Welcome to CAT LAB+)
        // ==========================================
        <div>
          <div className="text-center pb-4 border-b border-gray-100">
            <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 border border-gray-200">
              <i className="fi fi-sr-user" style={{ fontSize: '1.1rem' }} />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {language === 'en' ? 'Welcome to CAT LAB+' : '歡迎來到 CAT LAB+'}
            </div>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed px-1">
              {language === 'en'
                ? 'Sign in to track orders, save shipping info, and access health records.'
                : '登入以追蹤訂單、管理收件資料與毛孩健康記錄。'}
            </p>
          </div>

          {/* Auth Action Buttons: Clicking Sign In or Create an Account immediately signs in */}
          <div className="py-4 space-y-2">
            <button
              type="button"
              onClick={() => {
                login();
              }}
              className="w-full rounded-lg bg-[#fed700] hover:bg-[#fed700]/90 text-gray-900 py-2.5 text-xs font-semibold shadow-xs transition-all text-center block cursor-pointer"
            >
              {language === 'en' ? 'Sign In' : '登入會員'}
            </button>

            <button
              type="button"
              onClick={() => {
                login();
              }}
              className="w-full rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-2 text-xs font-semibold shadow-2xs transition-all text-center block cursor-pointer"
            >
              {language === 'en' ? 'Create an Account' : '註冊新帳號'}
            </button>
          </div>

          {/* Secondary Guest Links */}
          <div className="border-t border-gray-100 pt-3 space-y-1">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                handleNavClick('faqs');
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-left cursor-pointer"
            >
              <i className="fi fi-sr-bell text-gray-400" style={{ fontSize: '0.85rem' }} />
              <span>{language === 'en' ? 'Help & Support' : '常見問題與客服'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ||
          currentView === 'contact' ||
          currentView === 'catalog' ||
          currentView === 'product' ||
          currentView === 'account'
            ? 'bg-surface/90 shadow-md backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick();
              }}
              className="flex items-center gap-3"
            >
              <img src="/images/logo-nav.webp" alt="CAT LAB+" className="h-8 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((item, idx) => {
              const isActive =
                (item.isProduct && (currentView === 'catalog' || currentView === 'product')) ||
                (item.isContact && currentView === 'contact');

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.isProduct) {
                      onNavigate('catalog');
                    } else if (item.isContact) {
                      onNavigate('contact');
                    } else {
                      handleNavClick(item.anchor);
                    }
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow/50 cursor-pointer ${
                    isActive
                      ? 'bg-yellow/15 text-charcoal font-semibold'
                      : 'text-text-secondary hover:bg-yellow/5 hover:text-charcoal'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right CTA & Controls (Free Consultation + Cart & Profile Badge) */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Consultation Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="flex h-10 items-center justify-center rounded-full bg-yellow px-5 text-sm font-semibold text-charcoal shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow/50 shrink-0 cursor-pointer"
            >
              {t.nav.consultation}
            </button>

            {/* Badge: Cart & Profile */}
            <div className="relative flex h-10 items-center rounded-full border border-border/80 bg-surface/90 px-1.5 shadow-xs backdrop-blur-sm shrink-0">
              {/* Cart Button */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Open Cart Drawer"
                title={language === 'en' ? 'Shopping Cart' : '購物車'}
                className="relative flex h-8 w-8 items-center justify-center rounded-full text-text-primary hover:bg-yellow/15 hover:text-charcoal transition-all focus:outline-none cursor-pointer"
              >
                <i className="fi fi-sr-shopping-cart" style={{ fontSize: '0.95rem' }} />
                {totalQuantity > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow px-1 text-[10px] font-bold text-charcoal shadow-xs">
                    {totalQuantity}
                  </span>
                ) : (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow ring-1.5 ring-surface" />
                  </span>
                )}
              </button>

              {/* Divider between Cart and Profile */}
              <div className="h-4 w-px bg-border/80 mx-1" />

              {/* Profile Button (No online indicator icon) */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="User Profile"
                  title={
                    isAuthenticated
                      ? `Signed in as ${user.name}`
                      : language === 'en'
                      ? 'Sign In / Account'
                      : '會員登入'
                  }
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer ${
                    isProfileOpen || currentView === 'account'
                      ? 'bg-yellow text-charcoal shadow-xs'
                      : isAuthenticated
                      ? 'bg-yellow/20 text-charcoal hover:bg-yellow'
                      : 'text-text-primary hover:bg-yellow/15 hover:text-charcoal'
                  }`}
                >
                  <i className="fi fi-sr-user" style={{ fontSize: '0.9rem' }} />
                </button>

                {/* Profile Modal / Menu Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 z-50">
                    {renderProfileDropdown()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile controls: Cart & Profile Badge + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Badge */}
            <div className="flex h-9 items-center rounded-full border border-border/80 bg-surface/90 px-1 shadow-2xs">
              <button
                type="button"
                onClick={openCart}
                aria-label="Open Cart Drawer"
                className="relative flex h-7 w-7 items-center justify-center rounded-full text-text-primary hover:bg-yellow/15 transition-all"
              >
                <i className="fi fi-sr-shopping-cart" style={{ fontSize: '0.85rem' }} />
                {totalQuantity > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-yellow px-0.5 text-[9px] font-bold text-charcoal">
                    {totalQuantity}
                  </span>
                ) : (
                  <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-yellow ring-1 ring-surface" />
                )}
              </button>

              <div className="h-3.5 w-px bg-border/80 mx-0.5" />

              <div className="relative" ref={mobileProfileRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="User Profile"
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                    isAuthenticated ? 'bg-yellow/20 text-charcoal' : 'text-text-primary hover:bg-yellow/15'
                  }`}
                >
                  <i className="fi fi-sr-user" style={{ fontSize: '0.85rem' }} />
                </button>

                {/* Mobile Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 z-50">
                    {renderProfileDropdown()}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-text-primary"
              aria-label="Toggle menu"
            >
              <i
                className={`fi ${isMobileMenuOpen ? 'fi-sr-cross' : 'fi-sr-menu-burger'}`}
                style={{ fontSize: '1.2rem' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-surface px-6 py-6 shadow-xl md:hidden space-y-3">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (item.isProduct) {
                    onNavigate('catalog');
                  } else if (item.isContact) {
                    onNavigate('contact');
                  } else {
                    handleNavClick(item.anchor);
                  }
                }}
                className="block w-full text-left py-2 text-base font-medium text-text-primary hover:text-charcoal"
              >
                {item.label}
              </button>
            ))}

            {isAuthenticated ? (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('account', undefined, 'orders');
                  }}
                  className="block w-full text-left py-2 text-base font-semibold text-charcoal"
                >
                  My Account
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('account', undefined, 'orders');
                  }}
                  className="block w-full text-left py-2 text-base font-semibold text-charcoal"
                >
                  Order History
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    login();
                  }}
                  className="block w-full text-left py-2 text-base font-semibold text-charcoal"
                >
                  Sign In
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="w-full rounded-full bg-yellow py-3 text-center text-sm font-semibold text-charcoal shadow-md"
              >
                {t.nav.consultation}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer onNavigate={onNavigate} />
    </>
  );
};
