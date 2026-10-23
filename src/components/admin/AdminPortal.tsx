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
  AlertTriangle,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';
import { AdminOrderManagement } from './AdminOrderManagement';
import { AdminProductManagement } from './AdminProductManagement';
import { AdminShippingManagement } from './AdminShippingManagement';
import { AdminCustomerManagement } from './AdminCustomerManagement';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminEditProfileModal } from './AdminEditProfileModal';

export type AdminModule = 'dashboard' | 'orders' | 'products' | 'shipping' | 'customers';

interface AdminPortalProps {
  onNavigateToStorefront: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin',
    anchor?: string
  ) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigateToStorefront }) => {
  const [activeModule, setActiveModule] = useState<AdminModule>('orders');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>({
    name: 'Dr. Alex Chen',
    email: 'alex.chen@catlabplus.com',
    role: 'Super Administrator'
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAdminUser(null);
    setIsLoginModalOpen(true);
    triggerToast('Logged out successfully.');
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setAdminUser(user);
    setIsLoginModalOpen(false);
    triggerToast(`Welcome back, ${user.name}!`);
  };

  const handleSaveProfile = (updated: { name: string; email: string; role: string }) => {
    setAdminUser(updated);
  };

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
        <div className="fixed top-5 right-5 z-[999999] max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900">Success</p>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-gray-600 text-xs p-1 cursor-pointer"
          >
            ✕
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
              const isProducts = item.id === 'products';

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

                    {/* Red Alert Notification: Icon Only without border and text */}
                    {isProducts && (
                      <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Untitled UI Bottom User Profile Card with Edit & Logout actions */}
          {adminUser && (
            <div className="p-3 border-t border-white/10 shrink-0">
              <div
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-yellow/20 text-yellow border border-yellow/30 flex items-center justify-center font-bold text-xs shrink-0">
                    {adminUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
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
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {activeModule === 'dashboard' && (
            <AdminAnalyticsDashboard
              onNavigateToOrders={() => setActiveModule('orders')}
              onNavigateToProducts={() => setActiveModule('products')}
            />
          )}

          {activeModule === 'orders' && (
            <AdminOrderManagement
              onShowToast={triggerToast}
              onNavigateToStorefront={onNavigateToStorefront}
            />
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
            <AdminCustomerManagement onShowToast={triggerToast} />
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
