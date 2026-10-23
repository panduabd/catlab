import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

interface CTASectionProps {
  onNavigate: (view: 'home' | 'contact') => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl pb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <PawIcon className="h-5 w-5" />
            <span className="text-sm font-semibold text-text-secondary">
              {t.cta.tag}
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-tight text-charcoal md:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t.cta.desc}</p>
        </div>

        {/* 2-Column Product Showcase */}
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

          {/* Right: Features */}
          <div className="transition-all duration-700 ease-out space-y-7 opacity-100 translate-y-0">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-charcoal md:text-5xl">
                {t.cta.card.name}
                <br />
                <span className="text-yellow">{t.cta.card.highlight}</span>
              </h2>
              <p className="mt-3 text-lg text-text-secondary">{t.cta.card.desc}</p>
            </div>

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

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="rounded-full bg-yellow px-8 py-3.5 text-sm font-semibold text-charcoal shadow-lg shadow-yellow/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow/30 focus:outline-none focus:ring-2 focus:ring-yellow/50"
              >
                {t.cta.btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
