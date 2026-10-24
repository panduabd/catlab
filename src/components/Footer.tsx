import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin' | 'login' | 'register' | 'forgot-password'
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-text-primary px-6 py-20 text-surface">
      <div className="relative mx-auto max-w-7xl">
        {/* Top bar with Logo & Consultation CTA */}
        <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
          <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo-footer.webp"
                  alt="CAT LAB+"
                  className="h-10 w-auto"
                />
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-surface/60">
                {language === 'en'
                  ? 'A simple and reliable system designed specifically for modern veterinary care, trusted by veterinarians worldwide.'
                  : '專為現代獸醫護理設計的簡單可靠系統，深受全球獸醫信賴。'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-charcoal shadow-lg transition-all hover:scale-105"
            >
              {language === 'en' ? 'Get Free Consultation' : '獲得免費諮詢'}
            </button>
          </div>
        </div>

        {/* Quick Links & Company Info */}
        <div className="mt-12 border-t border-surface/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface/40">
              {language === 'en' ? 'Quick Links' : '快速連結'}
            </h4>
            <ul className="space-y-2.5 text-sm text-surface/70">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-yellow transition-colors"
                >
                  {language === 'en' ? 'Home' : '首頁'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-yellow transition-colors"
                >
                  {language === 'en' ? 'Product Catalog' : '商品目錄 (Catalog)'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('product')}
                  className="hover:text-yellow transition-colors font-medium text-surface/90"
                >
                  {language === 'en' ? 'CAT LAB+ Product Details' : 'CAT LAB+ 採尿套裝詳情'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-yellow transition-colors"
                >
                  {language === 'en' ? 'Contact & Consultation' : '聯絡我們與諮詢'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('account')}
                  className="hover:text-yellow transition-colors"
                >
                  {language === 'en' ? 'My Account (Member Area)' : '會員中心 (My Account)'}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface/40">
              {language === 'en' ? 'Company & Service' : '公司資訊與客服'}
            </h4>
            <ul className="space-y-3 text-sm text-surface/70">
              <li>
                {language === 'en'
                  ? 'Producer: CL Infinite Technology Co., Ltd.'
                  : '製造商：智聯無穹科技股份有限公司 (CL Infinite Technology Co., Ltd.)'}
              </li>
              <li>
                {language === 'en'
                  ? 'No. 3, Lane 598, Section 1, Zhonghang Rd., Shalu Dist., Taichung City, Taiwan'
                  : '台中市沙鹿區中航路一段598巷3號'}
              </li>
              <li>
                {language === 'en'
                  ? 'Customer Service Hotline: +886-4-2615-2878 (9:00 AM – 5:00 PM)'
                  : '客服專線：+886-4-2615-2878 (週一至週五 9:00 AM – 5:00 PM)'}
              </li>
              <li>
                {language === 'en'
                  ? 'Customer Service Email: chloe.chang@clitech.com.tw'
                  : '客服信箱：chloe.chang@clitech.com.tw'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & socials */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface/10 pt-8 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-surface/40">
              {language === 'en'
                ? '© 2026 CAT LAB+. All rights reserved.'
                : '© 2026 CAT LAB+. 版權所有。'}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 hover:bg-yellow hover:text-charcoal px-3 py-1 text-[11px] font-semibold text-surface/70 transition-all cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              <span>Admin Console</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* LINE */}
            <a
              href="https://line.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="LINE"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface/10 transition-colors hover:bg-green-500/20 hover:text-green-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="block h-[19px] w-[19px] shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface/10 transition-colors hover:bg-blue-600/20 hover:text-blue-400"
            >
              <i className="fi fi-brands-facebook" style={{ fontSize: '1rem' }} />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface/10 transition-colors hover:bg-pink-600/20 hover:text-pink-400"
            >
              <i className="fi fi-brands-instagram" style={{ fontSize: '1rem' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
