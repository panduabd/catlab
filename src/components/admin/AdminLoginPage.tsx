import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (adminUser: { name: string; email: string; role: string }) => void;
  onNavigateToStorefront: (view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin' | 'login' | 'register' | 'forgot-password', anchor?: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateToStorefront
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Dr. Alex Chen',
        email: cleanEmail,
        role: 'Super Administrator'
      });
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans antialiased flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Back to Storefront Link (version removed) */}
      <div className="w-full max-w-md flex items-center mb-6">
        <button
          type="button"
          onClick={() => onNavigateToStorefront('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Storefront</span>
        </button>
      </div>

      {/* Main Untitled UI Admin Login Card (shadow removed, header & footer removed) */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 p-7 sm:p-9 animate-in fade-in duration-200">
        {/* CAT LAB+ Brand Logo (no bottom border line) */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo-nav.webp"
            alt="CAT LAB+"
            className="h-8 w-auto object-contain select-none"
          />
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@catlabplus.com"
                className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input your password..."
                className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-10 text-xs sm:text-sm text-gray-900 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-[#282828] hover:bg-black text-white font-bold text-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-yellow" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Authenticating...</span>
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
      </div>
    </div>
  );
};
