import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

interface ProductSectionProps {
  onNavigate?: (view: 'home' | 'catalog' | 'product' | 'contact') => void;
}

export const ProductSection: React.FC<ProductSectionProps> = () => {
  const { t } = useLanguage();
  const [isPackageOpen, setIsPackageOpen] = useState(false);

  return (
    <section id="product" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 min-h-[520px] lg:min-h-[580px]">
          {/* Left: Product Render */}
          <div className="transition-all duration-700 ease-out relative flex items-center justify-center opacity-100 translate-y-0">
            <div className="relative z-10 w-full max-w-lg mx-auto py-10">
              <img
                src="/images/product.webp"
                alt="CAT LAB+ Product"
                className="w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right: Description & Features */}
          <div className="space-y-7">
            {/* Tag */}
            <div className="inline-flex items-center gap-2">
              <PawIcon className="h-5 w-5" />
              <span className="text-sm font-semibold text-text-secondary">
                {t.product.sectionTag}
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-4xl font-bold leading-tight text-charcoal md:text-5xl">
                {t.product.title}
                <br />
                <span className="text-yellow">{t.product.subtitle}</span>
              </h2>
              <p className="mt-3 text-lg text-text-secondary">{t.product.desc}</p>
            </div>

            {/* 3 Main Features */}
            <div className="space-y-4">
              {t.product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/20">
                    <PawIcon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{feature.title}</p>
                    <p className="text-sm text-text-secondary">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Package Includes Dropdown */}
            <div>
              <button
                type="button"
                onClick={() => setIsPackageOpen(!isPackageOpen)}
                className="w-full flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3 text-sm font-semibold text-charcoal transition-all hover:border-yellow hover:bg-yellow/5"
              >
                <span>{t.product.packageIncludes}</span>
                <svg
                  className={`h-4 w-4 text-charcoal/40 transition-transform duration-300 ${
                    isPackageOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {isPackageOpen && (
                <div className="mt-2 rounded-xl border border-border/60 bg-surface p-4 text-sm text-text-secondary">
                  <ul className="space-y-2">
                    {t.product.packageItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
