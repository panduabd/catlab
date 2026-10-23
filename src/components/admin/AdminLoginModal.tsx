import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, UserCheck, AlertCircle, ArrowRight, KeyRound, Globe } from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

interface AdminLoginModalProps {
  isOpen: boolean;
  onLoginSuccess: (adminUser: { name: string; email: string; role: string }) => void;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onLoginSuccess,
  onClose
}) => {
  const [email, setEmail] = useState('alex.chen@catlabplus.com');
  const [password, setPassword] = useState('catlab2026Secure!');
  const [role, setRole] = useState('Super Administrator');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Password validation: minimum 8 characters, letters, numbers, and symbols
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!hasMinLength || !hasLetter || !hasNumber || !hasSymbol) {
      setError('Password must be at least 8 characters and contain letters, numbers, and symbols.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Dr. Alex Chen',
        email: email || 'alex.chen@catlabplus.com',
        role
      });
    }, 500);
  };

  const handleQuickDemo = () => {
    setEmail('alex.chen@catlabplus.com');
    setPassword('catlab2026Secure!');
    setRole('Super Administrator');
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Dr. Alex Chen',
        email: 'alex.chen@catlabplus.com',
        role: 'Super Administrator'
      });
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Internal Domain Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-charcoal/5 border border-charcoal/10 px-3 py-1 text-[11px] font-mono text-gray-700">
          <Globe className="h-3.5 w-3.5 text-yellow" />
          <span>internal.catlabplus.com</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 font-sans">Internal Access Only</span>
        </div>

        {/* Header Icon & Brand */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-charcoal text-yellow shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                  CAT LAB+ Ops Console
                </h3>
                <AdminHelpIcon text="Internal staff authentication portal on internal.catlabplus.com with JWT token-based access control and HttpOnly Cookie session encryption." />
              </div>
              <p className="text-xs text-gray-500">Admin Authentication & Access Control</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="my-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <KeyRound className="h-4 w-4 text-amber-700 shrink-0" />
            <p className="text-xs text-amber-800 font-medium">
              Prototype Mode: You can sign in immediately with pre-filled credentials.
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="rounded-lg bg-charcoal hover:bg-black text-white px-3 py-1.5 text-xs font-semibold shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
          >
            Quick Sign-In
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700">Staff Email / Username</label>
              <AdminHelpIcon text="Account registered in the CAT LAB+ Taiwan internal staff directory." />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@catlabplus.com"
                className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700">Password</label>
              <span className="text-[10px] text-gray-400">Min 8 chars (letters, numbers, symbols)</span>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Role-Based Access Level
              </label>
              <AdminHelpIcon text="Restricts accessible modules based on internal organizational role." />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <UserCheck className="h-4 w-4" />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-8 text-xs sm:text-sm text-gray-900 shadow-2xs appearance-none focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none cursor-pointer"
              >
                <option value="Super Administrator">Super Administrator (Full Access to All Modules)</option>
                <option value="Operations & Fulfillment">Operations & Fulfillment (Orders & Shipping)</option>
                <option value="Product & Inventory Manager">Product & Inventory Manager (Catalog & Variants)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-charcoal hover:bg-black text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-yellow" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Verifying Session Token...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="h-4 w-4 text-yellow" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security badges footer */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            JWT Token Encrypted
          </span>
          <span>•</span>
          <span>HttpOnly Cookie Auth</span>
          <span>•</span>
          <span>Auto-Session Timeout</span>
        </div>
      </div>
    </div>
  );
};
