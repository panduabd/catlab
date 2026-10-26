import React, { useState } from 'react';
import {
  BarChart2,
  ShoppingBag,
  Package,
  Truck,
  Users,
  LogOut,
  X,
  CheckCircle2,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';
import { AdminOrderManagement } from './AdminOrderManagement';
import { AdminProductManagement } from './AdminProductManagement';
import { AdminShippingManagement } from './AdminShippingManagement';
import { AdminCustomerManagement } from './AdminCustomerManagement';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminEditProfileModal } from './AdminEditProfileModal';
import { AdminLoginPage } from './AdminLoginPage';
import { DefaultProfileIcon } from '../DefaultProfileIcon';

export type AdminModule = 'dashboard' | 'orders' | 'products' | 'shipping' | 'customers';

interface AdminPortalProps {
  onNavigateToStorefront: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin' | 'login' | 'register' | 'forgot-password',
    anchor?: string
  ) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigateToStorefront }) => {
  const [activeModule, setActiveModule] = useState<AdminModule>('dashboard');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    try {
      const isLoggedOut = localStorage.getItem('catlab_admin_logged_out');
      if (isLoggedOut === 'true') {
        return null;
      }
      const saved = localStorage.getItem('catlab_admin_user');
      if (saved) return JSON.parse(saved);
      return {
        name: 'Dr. Alex Chen',
        email: 'alex.chen@catlabplus.com',
        role: 'Super Administrator'
      };
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [adminLanguage, setAdminLanguage] = useState<'en' | 'zh'>('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      localStorage.setItem('catlab_admin_logged_out', 'true');
      localStorage.removeItem('catlab_admin_user');
    } catch {
      // ignore
    }
    setAdminUser(null);
    triggerToast('Logged out successfully.');
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    try {
      localStorage.removeItem('catlab_admin_logged_out');
      localStorage.setItem('catlab_admin_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    setAdminUser(user);
    setIsLoginModalOpen(false);
    triggerToast(`Welcome back, ${user.name}!`);
  };

  const handleSaveProfile = (updated: { name: string; email: string; role: string }) => {
    setAdminUser(updated);
    try {
      localStorage.setItem('catlab_admin_user', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  if (!adminUser) {
    return (
      <AdminLoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigateToStorefront={onNavigateToStorefront}
      />
    );
  }

  // Sidebar modules matching Untitled UI reference layout
  const navItems = [
    {
      id: 'dashboard' as AdminModule,
      label: 'Dashboard',
      icon: BarChart2
    },
    {
      id: 'orders' as AdminModule,
      label: 'Order Management',
      icon: ShoppingBag
    },
    {
      id: 'products' as AdminModule,
      label: 'Product Management',
      icon: Package
    },
    {
      id: 'shipping' as AdminModule,
      label: 'Shipping Management',
      icon: Truck
    },
    {
      id: 'customers' as AdminModule,
      label: 'Customer Management',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 antialiased font-sans flex flex-col lg:flex-row">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999999] max-w-md w-[92%] sm:w-auto min-w-[320px] rounded-2xl border border-gray-200/90 bg-white/95 backdrop-blur-md p-4 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-xl shrink-0 ${
              toastMessage.toLowerCase().includes('error') || toastMessage.toLowerCase().includes('validation')
                ? 'bg-rose-100 text-rose-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {toastMessage.toLowerCase().includes('error') || toastMessage.toLowerCase().includes('validation') ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-gray-900">
              {toastMessage.toLowerCase().includes('error') || toastMessage.toLowerCase().includes('validation')
                ? 'Notice'
                : 'Success'}
            </p>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-gray-600 text-xs p-1 cursor-pointer shrink-0 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Floating Toggle Button to re-open/unhide sidebar: Text is "Open" */}
      {(isSidebarCollapsed || !isMobileSidebarOpen) && (
        <button
          type="button"
          onClick={() => {
            setIsSidebarCollapsed(false);
            setIsMobileSidebarOpen(true);
          }}
          className={`fixed top-4 left-4 z-30 flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm hover:bg-white hover:text-black hover:border-gray-300 transition-all cursor-pointer backdrop-blur-xs ${
            !isSidebarCollapsed ? 'lg:hidden' : ''
          }`}
          aria-label="Open Sidebar"
        >
          <PanelLeftOpen className="h-3.5 w-3.5 text-gray-600" />
          <span>Open</span>
        </button>
      )}

      {/* ========================================================================= */}
      {/* UNTITLED UI SIDEBAR (Dark Charcoal #282828, White Logo, Clean Elements)  */}
      {/* ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-[#282828] text-white flex flex-col justify-between transition-all duration-300 border-r border-white/10 shrink-0 lg:sticky lg:top-0 lg:h-screen ${
          isMobileSidebarOpen
            ? 'translate-x-0 w-64'
            : isSidebarCollapsed
            ? '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0 lg:overflow-hidden'
            : '-translate-x-full lg:translate-x-0 w-64'
        }`}
      >
        <div className="flex flex-col h-full w-64">
          {/* Header: White CAT LAB+ Logo (No wrapper box) + Compact Hide Sidebar Icon */}
          <div className="h-18 px-5 flex items-center justify-between border-b border-white/10 shrink-0">
            <img
              src="/images/logo-footer.webp"
              alt="CAT LAB+"
              className="h-7 w-auto object-contain select-none"
            />

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsSidebarCollapsed(true);
                  setIsMobileSidebarOpen(false);
                }}
                className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Hide Sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Untitled UI Navigation Section */}
          <div className="p-3.5 space-y-1 overflow-y-auto flex-1">
            {/* GENERAL Category Label */}
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 pt-2 pb-1.5 select-none">
              GENERAL
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.06] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Language Switcher Badge Dropdown (UI Only, Above Profile) */}
          <div className="px-3 py-2.5 border-t border-white/10 shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-colors cursor-pointer"
                title="Change language"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="truncate">
                    {adminLanguage === 'en' ? 'English' : '繁體中文'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                    {adminLanguage === 'en' ? 'EN' : 'ZH'}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
                      isLangDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Upward Dropdown Menu */}
              {isLangDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <div className="absolute bottom-full left-0 right-0 mb-1.5 z-40 rounded-2xl border border-white/15 bg-[#202020] p-1.5 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 mb-1">
                      Language
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAdminLanguage('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        adminLanguage === 'en'
                          ? 'bg-white/15 text-white font-bold'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🇬🇧</span>
                        <span>English (EN)</span>
                      </div>
                      {adminLanguage === 'en' && <Check className="h-3.5 w-3.5 text-yellow" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAdminLanguage('zh');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        adminLanguage === 'zh'
                          ? 'bg-white/15 text-white font-bold'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🇹🇼</span>
                        <span>繁體中文 (Mandarin)</span>
                      </div>
                      {adminLanguage === 'zh' && <Check className="h-3.5 w-3.5 text-yellow" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Untitled UI Bottom User Profile Card with Edit & Logout actions */}
          {adminUser && (
            <div className="px-3 py-2.5 border-t border-white/10 shrink-0">
              <div
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <DefaultProfileIcon className="h-8 w-8" iconClassName="h-4 w-4" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-white truncate">
                      {adminUser.name}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {adminUser.role}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                  aria-label="Log Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA (Header Removed per Request, Direct Page Content)       */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="w-full flex-1">
          {activeModule === 'dashboard' && (
            <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
              <AdminAnalyticsDashboard
                onNavigateToOrders={() => setActiveModule('orders')}
                onNavigateToProducts={() => setActiveModule('products')}
              />
            </div>
          )}

          {activeModule === 'orders' && (
            <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
              <AdminOrderManagement
                onShowToast={triggerToast}
                onNavigateToStorefront={onNavigateToStorefront}
              />
            </div>
          )}

          {activeModule === 'products' && (
            <AdminProductManagement
              onShowToast={triggerToast}
              onNavigateToStorefront={onNavigateToStorefront}
            />
          )}

          {activeModule === 'shipping' && (
            <AdminShippingManagement onShowToast={triggerToast} />
          )}

          {activeModule === 'customers' && (
            <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
              <AdminCustomerManagement onShowToast={triggerToast} />
            </div>
          )}
        </div>
      </main>

      {/* Edit Admin Profile Modal (Edit Name & Password with Email Verification + Bottom-Left Log Out) */}
      {adminUser && (
        <AdminEditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          adminUser={adminUser}
          onSave={handleSaveProfile}
          onShowToast={triggerToast}
          onLogout={handleLogout}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onLoginSuccess={handleLoginSuccess}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};
