import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export type AuthMode = 'login' | 'register' | 'forgot-password';

interface AuthPageProps {
  initialMode?: AuthMode;
  onNavigate: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin' | 'login' | 'register' | 'forgot-password',
    anchor?: string,
    accountTab?: 'orders' | 'profile' | 'address'
  ) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onNavigate
}) => {
  const { language } = useLanguage();
  const { login, register, resetPassword } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sync mode if initialMode prop changes (e.g. from navbar clicks)
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password validation helper: min 8 characters, letters, and symbols
  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasSymbol;

  // Clear errors when switching modes
  const handleSwitchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
    setPassword('');
    setConfirmPassword('');
    try {
      if (newMode === 'login') window.history.pushState(null, '', '/login');
      else if (newMode === 'register') window.history.pushState(null, '', '/register');
      else window.history.pushState(null, '', '/forgot-password');
    } catch {
      // ignore
    }
  };

  // Quick Demo fill for instant testing
  const handleFillDemo = () => {
    setEmail('sarah.jenkins@catmail.com');
    setPassword('CatLab2026!');
    setError('');
  };

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(language === 'en' ? 'Please enter your email address.' : '請輸入電子郵件。');
      return;
    }
    if (!password) {
      setError(language === 'en' ? 'Please enter your password.' : '請輸入密碼。');
      return;
    }
    if (!isPasswordValid) {
      setError(
        language === 'en'
          ? 'Password must be at least 8 characters and contain letters and symbols.'
          : '密碼長度至少需 8 個字符，且必須包含字母與符號。'
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        onNavigate('account', undefined, 'orders');
      } else {
        setError(res.error || (language === 'en' ? 'Invalid email or password.' : '帳號或密碼錯誤。'));
      }
    }, 400);
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(language === 'en' ? 'Please enter your full name.' : '請輸入您的姓名。');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError(language === 'en' ? 'Please enter a valid email address.' : '請輸入有效的電子郵件。');
      return;
    }
    if (!isPasswordValid) {
      setError(
        language === 'en'
          ? 'Password must be at least 8 characters and contain letters and symbols.'
          : '密碼長度至少需 8 個字符，且必須包含字母與符號。'
      );
      return;
    }
    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match.' : '兩次輸入的密碼不相符。');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = register(name, email, password);
      setIsLoading(false);
      if (res.success) {
        onNavigate('account', undefined, 'orders');
      } else {
        setError(res.error || (language === 'en' ? 'Registration failed.' : '註冊失敗，請重試。'));
      }
    }, 450);
  };

  // Handle Reset Password Submit (email only)
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError(language === 'en' ? 'Please enter your registered email address.' : '請輸入註冊的電子郵件。');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        language === 'en'
          ? `Password reset instructions have been sent to ${cleanEmail}. Please check your inbox or spam folder.`
          : `密碼重設指示已發送至 ${cleanEmail}，請至信箱或垃圾郵件匣查收。`
      );
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-gray-900 font-sans antialiased">
      {/* Top Breadcrumb / Back to Shop */}
      <div className="w-full max-w-md flex items-center mb-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{language === 'en' ? 'Back to Store' : '返回商店'}</span>
        </button>
      </div>

      {/* Main Untitled UI Auth Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/90 shadow-xl p-7 sm:p-9 animate-in fade-in zoom-in-98 duration-200">
        {/* Card Header (Title & Subtitle only, no broken images or headers) */}
        <div className="text-center pb-5 border-b border-gray-100">
          <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
            {mode === 'login' && (language === 'en' ? 'Welcome back' : '歡迎回來')}
            {mode === 'register' && (language === 'en' ? 'Create an account' : '註冊新會員')}
            {mode === 'forgot-password' && (language === 'en' ? 'Reset password' : '重設密碼')}
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
            {mode === 'login' &&
              (language === 'en'
                ? 'Sign in to access your order history and pet records.'
                : '登入以查看訂單紀錄與毛孩健康管理。')}
            {mode === 'register' &&
              (language === 'en'
                ? 'Join CatLab+ to track at-home urine tests and health.'
                : '加入 CatLab+，在家守護愛貓泌尿與健康。')}
            {mode === 'forgot-password' &&
              (language === 'en'
                ? 'Enter your email and we will send you a reset link.'
                : '輸入您的註冊電子信箱，我們將發送重設密碼連結。')}
          </p>
        </div>

        {/* Demo Fast Login Banner (Only on Login view) */}
        {mode === 'login' && (
          <div className="mt-5 mb-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <KeyRound className="h-4 w-4 text-amber-700 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-amber-900 font-semibold truncate">Demo Account</p>
                <p className="text-[11px] text-amber-700/90 truncate font-mono">sarah.jenkins@catmail.com</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="rounded-lg bg-charcoal hover:bg-black text-white px-3 py-1.5 text-xs font-bold shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
            >
              {language === 'en' ? 'Auto-fill' : '快速填入'}
            </button>
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div className="my-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="my-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-start gap-2.5 animate-in fade-in duration-150">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <p>{successMessage}</p>
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="mt-2 inline-flex items-center gap-1 font-bold text-xs text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
              >
                <span>{language === 'en' ? 'Proceed to Log In →' : '前往登入頁面 →'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: SIGN IN FORM                                                      */}
        {/* ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {language === 'en' ? 'Email' : '電子郵件'}
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
                  placeholder="name@example.com"
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  {language === 'en' ? 'Password' : '密碼'}
                </label>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('forgot-password')}
                  className="text-xs font-semibold text-charcoal hover:text-black hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Forgot password?' : '忘記密碼？'}
                </button>
              </div>
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
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-10 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-charcoal focus:ring-yellow/30 accent-charcoal cursor-pointer"
                />
                <span>{language === 'en' ? 'Remember me' : '記住我'}</span>
              </label>
            </div>

            {/* Sign In Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-charcoal hover:bg-black text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-yellow" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{language === 'en' ? 'Signing in...' : '登入中...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Sign in' : '登入會員'}</span>
                    <ArrowRight className="h-4 w-4 text-yellow" />
                  </>
                )}
              </button>
            </div>

            {/* Switch to Register */}
            <p className="text-center text-xs text-gray-600 pt-3">
              {language === 'en' ? "Don't have an account?" : '還沒有帳號？'}{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className="font-bold text-charcoal hover:text-black hover:underline cursor-pointer"
              >
                {language === 'en' ? 'Sign up' : '立即註冊'}
              </button>
            </p>
          </form>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: REGISTER FORM                                                     */}
        {/* ========================================================================= */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {language === 'en' ? 'Full Name' : '姓名'}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'en' ? 'Sarah Jenkins' : '王小明'}
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {language === 'en' ? 'Email Address' : '電子郵件地址'}
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
                  placeholder="name@example.com"
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {language === 'en' ? 'Password' : '設定密碼'}
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
                  placeholder={language === 'en' ? 'Minimum 8 characters, letters and symbols' : '至少 8 個字符，包含字母與符號'}
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-10 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
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

              {/* Untitled UI Password Requirements Badges */}
              <div className="mt-2.5 space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-500">
                  {language === 'en' ? 'Password requirements:' : '密碼安全規範：'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                      hasMinLength
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {hasMinLength ? <Check className="h-3 w-3 text-emerald-600" /> : '•'}
                    <span>{language === 'en' ? '8+ characters' : '至少 8 個字符'}</span>
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                      hasLetter
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {hasLetter ? <Check className="h-3 w-3 text-emerald-600" /> : '•'}
                    <span>{language === 'en' ? 'Letters (A-Z)' : '包含字母'}</span>
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                      hasSymbol
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {hasSymbol ? <Check className="h-3 w-3 text-emerald-600" /> : '•'}
                    <span>{language === 'en' ? 'Symbols (!@#$)' : '包含符號'}</span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {language === 'en' ? 'Confirm Password' : '確認密碼'}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={language === 'en' ? 'Re-enter your password' : '再次輸入新密碼'}
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Create Account Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-charcoal hover:bg-black text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-yellow" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{language === 'en' ? 'Creating account...' : '註冊帳號中...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Get started' : '建立帳號'}</span>
                    <ArrowRight className="h-4 w-4 text-yellow" />
                  </>
                )}
              </button>
            </div>

            {/* Switch to Login */}
            <p className="text-center text-xs text-gray-600 pt-3">
              {language === 'en' ? 'Already have an account?' : '已經有帳號？'}{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="font-bold text-charcoal hover:text-black hover:underline cursor-pointer"
              >
                {language === 'en' ? 'Log in' : '登入'}
              </button>
            </p>
          </form>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: RESET PASSWORD FORM (EMAIL ONLY)                                 */}
        {/* ========================================================================= */}
        {mode === 'forgot-password' && (
          <form onSubmit={handleResetSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {language === 'en' ? 'Registered Email' : '註冊電子郵件'}
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
                  placeholder="name@example.com"
                  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Reset Password Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-charcoal hover:bg-black text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-yellow" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{language === 'en' ? 'Sending link...' : '正在發送重設信...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Send reset link' : '發送重設密碼連結'}</span>
                    <ArrowRight className="h-4 w-4 text-yellow" />
                  </>
                )}
              </button>
            </div>

            {/* Back to Login link */}
            <p className="text-center text-xs text-gray-600 pt-3">
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="inline-flex items-center gap-1 font-bold text-charcoal hover:text-black hover:underline cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>{language === 'en' ? 'Back to log in' : '返回會員登入'}</span>
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
