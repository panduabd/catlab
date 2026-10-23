import React, { useState } from 'react';
import { useAuth, Order } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

interface MyAccountPageProps {
  onNavigate: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account',
    anchor?: string,
    accountTab?: 'orders' | 'profile' | 'address'
  ) => void;
  initialTab?: 'orders' | 'profile' | 'address';
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({
  onNavigate,
  initialTab = 'orders'
}) => {
  const { language } = useLanguage();
  const {
    isAuthenticated,
    user,
    address,
    orders,
    login,
    logout,
    updateProfile,
    updatePassword,
    updateAddress
  } = useAuth();

  // Directly default to 'orders' (Account Overview is removed)
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'address'>(
    initialTab || 'orders'
  );

  // Selected order for "Detail Pesanan" modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Order status filter strictly standardized to 3 statuses
  const [orderFilter, setOrderFilter] = useState<'all' | 'Pending Payment' | 'Awaiting Shipment' | 'Shipped'>('all');

  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Password edit form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordSuccessToast, setPasswordSuccessToast] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Address edit modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState(address);
  const [addressSavedToast, setAddressSavedToast] = useState(false);

  // Copy tracking number toast
  const [copiedToast, setCopiedToast] = useState(false);

  const currencySymbol = language === 'en' ? '$' : 'NT$ ';

  // If not signed in, show sign-in gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-32 pb-24 text-text-primary antialiased">
        <div className="mx-auto max-w-md px-6">
          <div className="rounded-3xl border border-gray-200/90 bg-white p-8 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow/20 text-charcoal border border-yellow/30">
              <PawIcon className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
              {language === 'en' ? 'Welcome to Member Area' : '歡迎來到會員中心'}
            </h1>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              {language === 'en'
                ? 'Sign in to access your order history, manage your profile and shipping address.'
                : '登入以查看訂單紀錄、管理個人資料與預設收件地址。'}
            </p>

            <button
              type="button"
              onClick={login}
              className="mt-6 w-full rounded-full bg-yellow hover:bg-yellow/90 text-charcoal font-bold py-3 text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {language === 'en' ? 'Sign In as Member' : '登入會員'}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="mt-3 w-full rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2.5 text-xs transition-all cursor-pointer"
            >
              {language === 'en' ? 'Back to Home' : '返回首頁'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle profile submit
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  // Handle password submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordForm.currentPassword) {
      setPasswordError(language === 'en' ? 'Please enter your current password.' : '請輸入目前密碼。');
      return;
    }
    const hasMinLength = passwordForm.newPassword.length >= 8;
    const hasLetter = /[A-Za-z]/.test(passwordForm.newPassword);
    const hasNumber = /[0-9]/.test(passwordForm.newPassword);
    const hasSymbol = /[^A-Za-z0-9]/.test(passwordForm.newPassword);

    if (!hasMinLength || !hasLetter || !hasNumber || !hasSymbol) {
      setPasswordError(
        language === 'en'
          ? 'New password must be at least 8 characters and include letters, numbers, and symbols.'
          : '新密碼至少需8個字元，且必須包含英文字母、數字與特殊符號。'
      );
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError(
        language === 'en' ? 'New passwords do not match.' : '兩次輸入的新密碼不相符。'
      );
      return;
    }

    updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordSuccessToast(true);
    setTimeout(() => setPasswordSuccessToast(false), 3000);
  };

  // Handle address submit
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAddress(addressForm);
    setIsAddressModalOpen(false);
    setAddressSavedToast(true);
    setTimeout(() => setAddressSavedToast(false), 3000);
  };

  // Copy tracking number
  const handleCopyTracking = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  // Consistent Status Badge for "Pending Payment", "Awaiting Shipment", "Shipped"
  const renderAccountStatusBadge = (status: string) => {
    if (status === 'Pending Payment' || status === 'Pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
          Pending Payment
        </span>
      );
    }
    if (status === 'Awaiting Shipment') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
          Awaiting Shipment
        </span>
      );
    }
    if (status === 'Cancelled') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-300">
          Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
        Shipped
      </span>
    );
  };

  // Filtered orders matching strictly the 3 statuses
  const filteredOrders =
    orderFilter === 'all'
      ? orders
      : orders.filter((o) => (o.status || o.processingStatus) === orderFilter);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-24 text-text-primary antialiased">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-text-secondary font-medium">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-charcoal transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Home' : '首頁'}
          </button>
          <span>/</span>
          <span className="text-charcoal font-semibold">
            {language === 'en' ? 'My Account' : '會員中心'}
          </span>
        </nav>

        {/* User Profile Header Card (NO ONLINE ICON, NO ACTIVE MEMBER BADGE) */}
        <div className="mb-8 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-yellow/20 text-charcoal border-2 border-yellow font-extrabold text-xl sm:text-2xl shrink-0 shadow-xs">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                  {user.email} • {user.phone}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {language === 'en' ? 'Member since' : '加入會員時間'}: {user.memberSince}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer shadow-2xs"
              >
                <i className="fi fi-sr-exit text-[12px]" />
                <span>{language === 'en' ? 'Sign Out' : '登出帳號'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Layout: Navigation Tabs (Directly Order History by default) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Tabs (NO Account Overview tab) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200/90 bg-white p-2 shadow-xs space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                  activeTab === 'orders'
                    ? 'bg-yellow text-charcoal shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <i className="fi fi-sr-box-alt text-[14px]" />
                <span className="flex-1">{language === 'en' ? 'Order History' : '訂單紀錄'}</span>
                <span className="rounded-full bg-white/80 border border-black/10 px-2 py-0.5 text-[10px] font-bold">
                  {orders.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                  activeTab === 'profile'
                    ? 'bg-yellow text-charcoal shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <i className="fi fi-sr-user text-[14px]" />
                <span className="flex-1">{language === 'en' ? 'My Profile' : '個人資料'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('address')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                  activeTab === 'address'
                    ? 'bg-yellow text-charcoal shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <i className="fi fi-sr-marker text-[14px]" />
                <span className="flex-1">{language === 'en' ? 'Address Book' : '收件通訊錄'}</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* ========================================================================= */}
            {/* TAB 1: ORDER HISTORY (Default View)                                      */}
            {/* ========================================================================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs">
                  {/* Header & Filter Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-charcoal tracking-tight">
                        {language === 'en' ? 'Order History' : '歷史訂單紀錄'}
                      </h2>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {language === 'en'
                          ? 'Review all your transactions, courier receipts, and items'
                          : '查看您所有的訂單清單、付款與配送狀態'}
                      </p>
                    </div>

                    {/* Filter Pills: Strictly "all", "Pending Payment", "Awaiting Shipment", "Shipped" */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(['all', 'Pending Payment', 'Awaiting Shipment', 'Shipped'] as const).map(
                        (status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setOrderFilter(status)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                              orderFilter === status
                                ? 'bg-charcoal text-white shadow-2xs'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {status === 'all'
                              ? language === 'en'
                                ? 'All'
                                : '全部'
                              : status}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Orders List */}
                  <div className="mt-6 space-y-4">
                    {filteredOrders.length === 0 ? (
                      <div className="py-12 text-center text-text-secondary">
                        <i className="fi fi-rr-box-open text-3xl text-gray-300 block mb-2" />
                        <p className="text-sm">
                          {language === 'en'
                            ? 'No orders found matching this filter.'
                            : '目前沒有符合條件的訂單。'}
                        </p>
                      </div>
                    ) : (
                      filteredOrders.map((order) => {
                        const activeStatus = order.status || order.processingStatus;

                        return (
                          <div
                            key={order.id}
                            className="group rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 transition-all hover:border-gray-300 hover:shadow-sm"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span className="font-extrabold text-sm sm:text-base text-charcoal">
                                  {order.id}
                                </span>
                                <span className="text-xs text-gray-400">• {order.date}</span>

                                {/* Standardized Consistent Order Status Badge */}
                                {renderAccountStatusBadge(activeStatus)}
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <span className="text-xs text-gray-400 block">Total</span>
                                  <span className="text-base sm:text-lg font-extrabold text-charcoal tabular-nums">
                                    {currencySymbol}
                                    {order.total.toLocaleString()}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setSelectedOrder(order)}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white hover:border-charcoal hover:bg-gray-50 text-charcoal px-4 py-1.5 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                                >
                                  <span>{language === 'en' ? 'View Details' : '查看詳情'}</span>
                                  <i className="fi fi-rr-arrow-right text-[10px]" />
                                </button>
                              </div>
                            </div>

                            {/* Item previews and Courier / Resi glance */}
                            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex flex-wrap items-center gap-4">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-12 w-12 rounded-xl border border-gray-200 bg-[#f8f9fa] object-contain p-1"
                                    />
                                    <div>
                                      <p className="text-xs font-bold text-charcoal">{item.name}</p>
                                      <p className="text-[11px] text-gray-400">
                                        Qty: {item.quantity} × {currencySymbol}
                                        {item.price.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Courier & Resi if available */}
                              {order.tracking && (
                                <div className="text-left sm:text-right text-xs">
                                  <p className="text-gray-400 text-[11px]">Courier: {order.tracking.courier}</p>
                                  <p className="font-mono font-bold text-charcoal text-xs">
                                    Resi: {order.tracking.trackingNumber}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: PROFIL SAYA (My Profile & Password Facility)                      */}
            {/* ========================================================================= */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Personal Information Form */}
                <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
                  <div className="pb-5 border-b border-gray-100">
                    <h2 className="text-lg sm:text-xl font-extrabold text-charcoal tracking-tight">
                      {language === 'en' ? 'Personal Profile' : '個人資料更新'}
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {language === 'en'
                        ? 'Update your name, email address, and primary contact phone number'
                        : '更新您的姓名、電子信箱與聯絡電話'}
                    </p>
                  </div>

                  {profileSavedToast && (
                    <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                      <i className="fi fi-sr-check-circle text-emerald-600" />
                      <span>{language === 'en' ? 'Profile updated successfully!' : '個人資料已成功更新！'}</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileSubmit} className="mt-6 space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                        {language === 'en' ? 'Full Name' : '姓名'}
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                        className="contact-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                        {language === 'en' ? 'Email Address' : '電子信箱'}
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                        className="contact-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                        {language === 'en' ? 'Phone Number' : '聯絡電話'}
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        required
                        className="contact-input text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="rounded-full bg-charcoal hover:bg-black text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        {language === 'en' ? 'Save Changes' : '儲存變更'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Change Password Facility */}
                <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
                  <div className="pb-5 border-b border-gray-100">
                    <h2 className="text-lg sm:text-xl font-extrabold text-charcoal tracking-tight">
                      {language === 'en' ? 'Change Password' : '密碼安全設定'}
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {language === 'en'
                        ? 'Ensure your account stays secure with a strong password'
                        : '定期更換密碼以保障帳號與訂單安全'}
                    </p>
                  </div>

                  {passwordSuccessToast && (
                    <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                      <i className="fi fi-sr-check-circle text-emerald-600" />
                      <span>{language === 'en' ? 'Password changed successfully!' : '密碼已成功變更！'}</span>
                    </div>
                  )}

                  {passwordError && (
                    <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
                      <i className="fi fi-sr-cross-circle text-rose-500" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                        {language === 'en' ? 'Current Password' : '目前密碼'}
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                        }
                        className="contact-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                        {language === 'en' ? 'New Password' : '新密碼'}
                      </label>
                      <input
                        type="password"
                        placeholder={language === 'en' ? 'Minimum 8 characters (letters, numbers, symbols)' : '至少8個字元（英數與特殊符號）'}
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                        }
                        className="contact-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                        {language === 'en' ? 'Confirm New Password' : '確認新密碼'}
                      </label>
                      <input
                        type="password"
                        placeholder="Re-enter new password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                        }
                        className="contact-input text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="rounded-full bg-charcoal hover:bg-black text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        {language === 'en' ? 'Update Password' : '更新密碼'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: BUKU ALAMAT (Address Book - Single Primary Address)                */}
            {/* ========================================================================= */}
            {activeTab === 'address' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-charcoal tracking-tight">
                        {language === 'en' ? 'Address Book' : '收件通訊錄'}
                      </h2>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {language === 'en'
                          ? 'Saved primary delivery address to speed up your future checkouts'
                          : '儲存的主要送件地址，用於加速後續結帳流程'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setAddressForm(address);
                        setIsAddressModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-yellow hover:bg-yellow/90 text-charcoal px-5 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <i className="fi fi-rr-edit text-[11px]" />
                      <span>{language === 'en' ? 'Edit Address' : '修改預設地址'}</span>
                    </button>
                  </div>

                  {addressSavedToast && (
                    <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                      <i className="fi fi-sr-check-circle text-emerald-600" />
                      <span>{language === 'en' ? 'Address saved successfully!' : '收件地址已儲存！'}</span>
                    </div>
                  )}

                  {/* Primary Address Card */}
                  <div className="mt-6 rounded-2xl border-2 border-yellow/40 bg-yellow/5 p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-charcoal text-xs">
                          <i className="fi fi-sr-marker" />
                        </span>
                        <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
                          {address.label || 'Home'}
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        {language === 'en' ? 'Primary Address' : '預設收件地址'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-charcoal">{address.recipientName}</h3>
                    <div className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed max-w-lg space-y-1">
                      <p className="font-semibold text-charcoal">
                        {address.street}
                        {address.apartment ? `, ${address.apartment}` : ''}
                      </p>
                      <p>
                        {address.city}
                        {address.province ? `, ${address.province}` : ''} {address.postalCode}
                      </p>
                      <p className="font-medium text-gray-700">
                        {address.country}
                      </p>
                      {address.deliveryNotes && (
                        <div className="mt-2.5 pt-2 border-t border-yellow/20 text-[11px] text-gray-500">
                          <span className="font-semibold text-charcoal">
                            {language === 'en' ? 'Delivery Note:' : '配送備註：'}
                          </span>{' '}
                          {address.deliveryNotes}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-charcoal font-medium mt-3.5 flex items-center gap-2">
                      <i className="fi fi-rr-phone-call text-gray-400" />
                      <span>{address.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: DETAIL PESANAN (No live tracking steps, Courier, Resi, Status)    */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Order Details' : '訂單詳細資訊'}
                </span>
                <h3 className="text-xl font-extrabold text-charcoal mt-0.5">
                  {selectedOrder.id}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Placed on {selectedOrder.date}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <i className="fi fi-sr-cross text-xs" />
              </button>
            </div>

            {/* Courier, Resi, and Tracking Status Summary (NO EXPEDISI WORDING, NO TIMELINE) */}
            {selectedOrder.tracking ? (
              <div className="mt-6 rounded-2xl bg-[#f8f9fa] border border-gray-200/80 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Courier
                    </span>
                    <p className="text-sm font-bold text-charcoal mt-0.5">
                      {selectedOrder.tracking.courier}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Resi
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs font-bold text-charcoal">
                        {selectedOrder.tracking.trackingNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyTracking(selectedOrder.tracking!.trackingNumber)}
                        className="rounded-md bg-white border border-gray-200 hover:bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 transition-all cursor-pointer"
                        title="Copy Resi"
                      >
                        {copiedToast ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Status Pesanan
                    </span>
                    <div className="mt-1">
                      {renderAccountStatusBadge(selectedOrder.status || selectedOrder.processingStatus)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-[#f8f9fa] border border-gray-200/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Status Pesanan</span>
                  {renderAccountStatusBadge(selectedOrder.status || selectedOrder.processingStatus)}
                </div>
              </div>
            )}

            {/* Purchased Items List */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                {language === 'en' ? 'Purchased Items' : '購買商品清單'}
              </h4>
              <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-xl border border-gray-200 bg-[#f8f9fa] object-contain p-1"
                      />
                      <div>
                        <p className="text-xs font-bold text-charcoal">{item.name}</p>
                        <p className="text-[11px] text-gray-400">
                          Qty: {item.quantity} × {currencySymbol}
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-charcoal tabular-nums">
                      {currencySymbol}
                      {(item.quantity * item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address & Cost Breakdown */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-gray-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  {language === 'en' ? 'Shipping Destination' : '收件地址'}
                </h4>
                <p className="text-xs font-semibold text-charcoal">
                  {selectedOrder.shippingAddress.recipientName}
                </p>
                <div className="text-xs text-text-secondary mt-0.5 leading-relaxed space-y-0.5">
                  <p>
                    {selectedOrder.shippingAddress.street}
                    {selectedOrder.shippingAddress.apartment ? `, ${selectedOrder.shippingAddress.apartment}` : ''}
                  </p>
                  <p>
                    {selectedOrder.shippingAddress.city}
                    {selectedOrder.shippingAddress.province ? `, ${selectedOrder.shippingAddress.province}` : ''}{' '}
                    {selectedOrder.shippingAddress.postalCode}
                  </p>
                  {selectedOrder.shippingAddress.country && (
                    <p className="font-medium text-gray-700">
                      {selectedOrder.shippingAddress.country}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{selectedOrder.shippingAddress.phone}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  {language === 'en' ? 'Cost Breakdown' : '費用明細'}
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>
                      {currencySymbol}
                      {selectedOrder.costBreakdown.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>
                      {selectedOrder.costBreakdown.shipping === 0
                        ? 'FREE'
                        : `${currencySymbol}${selectedOrder.costBreakdown.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-charcoal pt-2 border-t border-gray-100 text-sm">
                    <span>Total Paid</span>
                    <span>
                      {currencySymbol}
                      {selectedOrder.costBreakdown.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Close Button */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-charcoal hover:bg-black text-white px-6 py-2 text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT ADDRESS (Address Book Edit Modal)                           */}
      {/* ========================================================================= */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-extrabold text-charcoal">
                  {language === 'en' ? 'Edit Primary Shipping Address' : '修改主要收件地址'}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  {language === 'en'
                    ? 'This address will be automatically prefilled at checkout'
                    : '此地址將在結帳時自動帶入'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <i className="fi fi-sr-cross text-xs" />
              </button>
            </div>

            <form onSubmit={handleAddressSubmit} className="mt-5 space-y-4">
              {/* Address Label & Quick Presets */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="address-label" className="block text-xs font-bold text-charcoal uppercase">
                    {language === 'en' ? 'Address Label' : '地址標籤'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {['Home', 'Office', 'Apartment', 'Clinic'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAddressForm({ ...addressForm, label: `${preset} (Alamat Utama)` })}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                          addressForm.label.startsWith(preset)
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  id="address-label"
                  name="label"
                  type="text"
                  value={addressForm.label}
                  onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                  placeholder="e.g. Home (Alamat Utama), Office, Apartment"
                  required
                  className="contact-input text-xs sm:text-sm"
                />
              </div>

              {/* Recipient Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="recipient-name" className="block text-xs font-bold text-charcoal uppercase mb-1">
                    {language === 'en' ? 'Recipient Name' : '收件人姓名'}
                  </label>
                  <input
                    id="recipient-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={addressForm.recipientName}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, recipientName: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="contact-input text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone-number" className="block text-xs font-bold text-charcoal uppercase mb-1">
                    {language === 'en' ? 'Phone Number' : '聯絡電話'}
                  </label>
                  <input
                    id="phone-number"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    placeholder="e.g. +886 912-345-678 or +1 (555) 234-5678"
                    required
                    className="contact-input text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Country & State / Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-xs font-bold text-charcoal uppercase mb-1">
                    {language === 'en' ? 'Country / Region' : '國家 / 地區'}
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                    required
                    className="contact-input text-xs sm:text-sm bg-white cursor-pointer"
                  >
                    <option value="Taiwan">Taiwan (台灣)</option>
                    <option value="United States">United States</option>
                    <option value="Japan">Japan (日本)</option>
                    <option value="Hong Kong">Hong Kong (香港)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="province" className="block text-xs font-bold text-charcoal uppercase mb-1">
                    {language === 'en' ? 'State / Province' : '州 / 省份 / 直轄市'}
                  </label>
                  <input
                    id="province"
                    name="province"
                    type="text"
                    autoComplete="address-level1"
                    value={addressForm.province}
                    onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                    placeholder={
                      addressForm.country === 'Taiwan'
                        ? 'e.g. Taipei City (台北市)'
                        : 'e.g. Oregon (OR) / California'
                    }
                    required
                    className="contact-input text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* City / District & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-bold text-charcoal uppercase mb-1">
                    {language === 'en' ? 'City / District' : '城市 / 行政區'}
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder={
                      addressForm.country === 'Taiwan'
                        ? 'e.g. Daan District (大安區)'
                        : 'e.g. Springfield'
                    }
                    required
                    className="contact-input text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="postal-code" className="block text-xs font-bold text-charcoal uppercase mb-1">
                    {language === 'en' ? 'Postal / ZIP Code' : '郵遞區號'}
                  </label>
                  <input
                    id="postal-code"
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={addressForm.postalCode}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, postalCode: e.target.value })
                    }
                    placeholder="e.g. 97477 / 106"
                    required
                    className="contact-input text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              {/* Street Address Line 1 */}
              <div>
                <label htmlFor="street-address" className="block text-xs font-bold text-charcoal uppercase mb-1">
                  {language === 'en' ? 'Street Address (Line 1)' : '詳細街道地址 (第一行)'}
                </label>
                <input
                  id="street-address"
                  name="street"
                  type="text"
                  autoComplete="address-line1"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder={
                    language === 'en'
                      ? 'Street name, house/building number (e.g. 742 Evergreen Terrace)'
                      : '街道名、路段、巷弄、門牌號碼 (例：忠孝東路三段168號)'
                  }
                  required
                  className="contact-input text-xs sm:text-sm"
                />
              </div>

              {/* Apartment, Suite, Floor, Unit Line 2 (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="apartment-unit" className="block text-xs font-bold text-charcoal uppercase">
                    {language === 'en'
                      ? 'Apartment, Suite, Unit, Floor'
                      : '公寓、大樓、室號、樓層'}
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {language === 'en' ? 'Optional' : '選填'}
                  </span>
                </div>
                <input
                  id="apartment-unit"
                  name="apartment"
                  type="text"
                  autoComplete="address-line2"
                  value={addressForm.apartment || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                  placeholder={
                    language === 'en'
                      ? 'e.g. Apt 4B, 3rd Floor, Suite 100'
                      : '例：4樓之2、B棟、8樓'
                  }
                  className="contact-input text-xs sm:text-sm"
                />
              </div>

              {/* Delivery Instructions / Notes for Courier (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="delivery-notes" className="block text-xs font-bold text-charcoal uppercase">
                    {language === 'en'
                      ? 'Delivery Instructions for Courier'
                      : '快遞配送備註'}
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {language === 'en' ? 'Optional' : '選填'}
                  </span>
                </div>
                <input
                  id="delivery-notes"
                  name="deliveryNotes"
                  type="text"
                  value={addressForm.deliveryNotes || ''}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, deliveryNotes: e.target.value })
                  }
                  placeholder={
                    language === 'en'
                      ? 'e.g. Ring buzzer #4B / Leave at security desk if unattended'
                      : '例：請按4B電鈴、無人應門時代收於大樓管理室'
                  }
                  className="contact-input text-xs sm:text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700 transition-all cursor-pointer"
                >
                  {language === 'en' ? 'Cancel' : '取消'}
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-charcoal hover:bg-black text-white px-6 py-2 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  {language === 'en' ? 'Save Address' : '儲存地址'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
