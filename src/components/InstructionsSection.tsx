import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const InstructionsSection: React.FC = () => {
  const { t } = useLanguage();

  const noticeIconClasses = [
    'fi-sr-stethoscope',
    'fi-sr-hospital',
    'fi-sr-eye',
    'fi-sr-flask',
    'fi-sr-water',
    'fi-sr-snowflake'
  ];

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="transition-all duration-700 ease-out mb-16 text-center opacity-100 translate-y-0">
          <div className="inline-flex items-center gap-2 mb-5">
            <PawIcon className="h-5 w-5" />
            <span className="text-sm font-semibold text-text-secondary">
              {t.instructions.tag}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-charcoal md:text-5xl">
            {t.instructions.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            {t.instructions.desc}
          </p>
        </div>

        {/* 8 Step Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.instructions.steps.map((step, idx) => (
            <div
              key={step.step}
              className="transition-all duration-700 ease-out h-full opacity-100 translate-y-0"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
                <div className="h-28 bg-white flex items-center justify-center py-3 px-4">
                  <img
                    src={step.image}
                    alt={`Step ${step.step}: ${step.title}`}
                    className="max-h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 items-start gap-3 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow text-xs font-bold text-charcoal">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="font-semibold text-charcoal leading-snug">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="transition-all duration-700 ease-out mt-16 opacity-100 translate-y-0">
          <div className="mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-stone-50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
                <i className="fi fi-sr-triangle-warning" style={{ fontSize: '1rem' }} />
              </div>
              <h3 className="text-xl font-bold text-charcoal">
                {t.instructions.noticeTitle}
              </h3>
            </div>
            <ul className="space-y-4">
              {t.instructions.noticePoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow/15 text-yellow">
                    <i
                      className={`fi ${noticeIconClasses[idx % noticeIconClasses.length]}`}
                      style={{ fontSize: '0.85rem' }}
                    />
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Waste Disposal */}
        <div className="transition-all duration-700 ease-out mt-8 opacity-100 translate-y-0">
          <div className="mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-stone-50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
                <i className="fi fi-sr-recycle" style={{ fontSize: '1rem' }} />
              </div>
              <h3 className="text-xl font-bold text-charcoal">
                {t.instructions.disposalTitle}
              </h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.instructions.disposalPoints.map((pt) => (
                <div key={pt.step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow text-xs font-bold text-charcoal">
                    {pt.step}
                  </span>
                  <div>
                    <h4 className="font-semibold text-charcoal leading-snug">
                      {pt.title}
                    </h4>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
