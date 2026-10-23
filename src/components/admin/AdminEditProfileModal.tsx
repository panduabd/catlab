import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  Mail,
  CheckCircle,
  AlertCircle,
  X,
  Send,
  ArrowLeft,
  Lock,
  User,
  LogOut
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

interface AdminEditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser: { name: string; email: string; role: string };
  onSave: (updated: { name: string; email: string; role: string }) => void;
  onShowToast: (msg: string) => void;
  onLogout?: () => void;
}

export const AdminEditProfileModal: React.FC<AdminEditProfileModalProps> = ({
  isOpen,
  onClose,
  adminUser,
  onSave,
  onShowToast,
  onLogout
}) => {
  const [activeSubModal, setActiveSubModal] = useState<'main' | 'change_email' | 'change_password'>('main');

  // Main Form State
  const [name, setName] = useState(adminUser.name);
  const [mainError, setMainError] = useState<string | null>(null);

  // Change Email Sub-Modal State
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Change Password Sub-Modal State (Forgot password link mechanism)
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);

  if (!isOpen) return null;

  // Handle Main Form Save (Display Name)
  const handleSaveMain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMainError('Administrator name cannot be empty.');
      return;
    }

    onSave({
      ...adminUser,
      name: name.trim()
    });

    onShowToast('Administrator profile updated successfully.');
    onClose();
  };

  // Send verification code for changing email
  const handleSendEmailCode = () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setEmailError('Please enter a valid new email address.');
      return;
    }
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(mockCode);
    setIsCodeSent(true);
    setEmailError(null);
    onShowToast(`Verification code sent to ${newEmail}: [ ${mockCode} ]`);
  };

  // Submit new email
  const handleSubmitNewEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!newEmail.trim() || !newEmail.includes('@')) {
      setEmailError('Please enter a valid new email address.');
      return;
    }

    if (!sentCode || verificationCode.trim() !== sentCode) {
      setEmailError('Verification code does not match or has expired.');
      return;
    }

    onSave({
      ...adminUser,
      email: newEmail.trim()
    });

    onShowToast(`Administrator email updated to ${newEmail.trim()}.`);
    setActiveSubModal('main');
    setNewEmail('');
    setVerificationCode('');
    setIsCodeSent(false);
  };

  // Send password reset link (forgot password mechanism)
  const handleSendResetPasswordLink = () => {
    setIsResetLinkSent(true);
    onShowToast(`Password reset link sent to ${adminUser.email}. Please check your inbox.`);
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl">
        {/* ========================================================================= */}
        {/* VIEW 1: MAIN PROFILE EDIT VIEW                                            */}
        {/* ========================================================================= */}
        {activeSubModal === 'main' && (
          <div>
            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-yellow" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Security & Credentials
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-charcoal">Edit Admin Profile</h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {mainError && (
              <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{mainError}</span>
              </div>
            )}

            <form onSubmit={handleSaveMain} className="mt-5 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase mb-1.5">
                  Administrator Name
                </label>
                <div className="relative">
                  <User className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                    placeholder="e.g. Dr. Alex Chen"
                  />
                </div>
              </div>

              {/* Admin Email Row with Change Email Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-charcoal uppercase">
                    Administrator Email
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubModal('change_email');
                      setEmailError(null);
                    }}
                    className="text-xs font-bold text-charcoal hover:underline cursor-pointer"
                  >
                    Change Email
                  </button>
                </div>

                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={adminUser.email}
                    disabled
                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 text-xs sm:text-sm text-gray-700 font-medium cursor-not-allowed select-none shadow-2xs"
                  />
                </div>
              </div>

              {/* Password Section with Change Password Button */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-charcoal">Password</p>
                  <p className="text-[11px] text-gray-500">Stored with secure Argon2 hashing</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal('change_password');
                    setIsResetLinkSent(false);
                  }}
                  className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-3.5 py-1.5 text-xs font-bold text-gray-700 shadow-2xs transition-all cursor-pointer"
                >
                  Change Password
                </button>
              </div>

              {/* Modal Action Buttons: Log Out on bottom-left, Save on bottom-right */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onLogout) onLogout();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5 text-rose-600" />
                  <span>Log Out</span>
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-charcoal hover:bg-black text-white px-6 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: SUB-MODAL CHANGE EMAIL (with Back Button)                         */}
        {/* ========================================================================= */}
        {activeSubModal === 'change_email' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Top Back Navigation Button */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <button
                type="button"
                onClick={() => setActiveSubModal('main')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:text-black cursor-pointer group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-charcoal">Change Admin Email</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Current email: <strong className="text-gray-900">{adminUser.email}</strong>. Enter your new address and verify the code to update.
              </p>
            </div>

            {emailError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{emailError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitNewEmail} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase mb-1">
                  New Email Address
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="newstaff@catlabplus.com"
                    className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Verification Code Box */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-charcoal">Verification Code</span>
                  <button
                    type="button"
                    onClick={handleSendEmailCode}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-yellow hover:bg-yellow/90 text-charcoal px-3 py-1 text-xs font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                    <span>{isCodeSent ? 'Resend Code' : 'Send Code to Email'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed">
                  A 6-digit verification code will be sent to confirm ownership of your new address.
                </p>

                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code (e.g. 849201)"
                  className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-mono text-sm tracking-wider uppercase focus:outline-none focus:border-charcoal"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveSubModal('main')}
                  className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold shadow-xs cursor-pointer"
                >
                  Apply New Email
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SUB-MODAL CHANGE PASSWORD (Forgot Password Link Mechanism)        */}
        {/* ========================================================================= */}
        {activeSubModal === 'change_password' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Top Back Navigation Button */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <button
                type="button"
                onClick={() => setActiveSubModal('main')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:text-black cursor-pointer group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-charcoal">Change Admin Password</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Secure password reset mechanism via verified email link (Forgot Password Flow).
              </p>
            </div>

            {/* Password Link Box */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow/30 text-charcoal">
                <Lock className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-900">
                  Send Password Reset Link
                </p>
                <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  A one-time link with 15-minute expiration will be sent directly to your registered administrator email:
                </p>
                <p className="mt-2 font-mono text-xs font-bold text-charcoal bg-white py-1 px-3 rounded-lg border border-gray-200 inline-block">
                  {adminUser.email}
                </p>
              </div>

              {!isResetLinkSent ? (
                <button
                  type="button"
                  onClick={handleSendResetPasswordLink}
                  className="w-full rounded-xl bg-charcoal hover:bg-black text-white py-2.5 text-xs font-bold shadow-sm transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="h-3.5 w-3.5 text-yellow" />
                  <span>Send Reset Link to Email</span>
                </button>
              ) : (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 text-left flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Link Sent Successfully!</p>
                    <p className="mt-0.5 text-[11px] text-emerald-700 leading-relaxed">
                      Please check your inbox or spam folder at <strong>{adminUser.email}</strong> to set your new password.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveSubModal('main')}
                className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
