import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqs" className="relative overflow-hidden bg-tertiary/10 px-6 py-24">
      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="transition-all duration-700 ease-out mb-16 text-center opacity-100 translate-y-0">
          <div className="inline-flex items-center gap-2 mb-6">
            <PawIcon className="h-5 w-5" />
            <span className="text-sm font-semibold text-text-secondary">
              {t.faqs.tag}
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary md:text-5xl">
            {t.faqs.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            {t.faqs.desc}
          </p>
        </div>

        {/* Accordion Cards */}
        <div className="space-y-4">
          {t.faqs.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="transition-all duration-700 ease-out opacity-100 translate-y-0"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="group overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-sm transition-all hover:border-yellow/30">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-yellow/5"
                  >
                    <span className="font-semibold text-text-primary">
                      {item.q}
                    </span>
                    <span
                      className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-yellow text-charcoal rotate-180'
                          : 'bg-yellow/10 text-yellow'
                      }`}
                    >
                      <i className="fi fi-sr-angle-down" style={{ fontSize: '0.8rem' }} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-text-secondary">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
