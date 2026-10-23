import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const ComparisonSection: React.FC = () => {
  const { language, t } = useLanguage();

  const featureIcons = [
    'fi-sr-flask',
    'fi-sr-water',
    'fi-sr-benefit-hand',
    'fi-sr-arrow-from-bottom'
  ];

  return (
    <section className="relative overflow-hidden bg-tertiary/10 px-6 py-24">
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="transition-all duration-700 ease-out mb-16 text-center opacity-100 translate-y-0">
          <div className="inline-flex items-center gap-2 mb-6">
            <PawIcon className="h-5 w-5" />
            <span className="text-sm font-semibold text-text-secondary">
              {t.comparison.tag}
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary md:text-5xl">
            {t.comparison.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t.comparison.desc}
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="transition-all duration-700 ease-out hidden md:block opacity-100 translate-y-0">
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-surface shadow-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-text-primary text-surface">
                <tr>
                  <th className="px-8 py-5 font-semibold">
                    {t.comparison.headers.feature}
                  </th>
                  <th className="px-8 py-5 font-semibold">
                    {t.comparison.headers.vet}
                  </th>
                  <th className="px-8 py-5 font-semibold">
                    {t.comparison.headers.owner}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {t.comparison.items.map((item, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-yellow/5">
                    <td className="px-8 py-5 font-semibold text-text-primary">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow/10 text-yellow">
                          <i
                            className={`fi ${featureIcons[idx]}`}
                            style={{ fontSize: '0.8rem' }}
                          />
                        </span>
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-text-secondary">{item.vet}</td>
                    <td className="px-8 py-5 text-text-secondary">{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-6">
          {t.comparison.items.map((item, idx) => (
            <div
              key={idx}
              className="transition-all duration-700 ease-out opacity-100 translate-y-0"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow/10 text-yellow">
                    <i
                      className={`fi ${featureIcons[idx]}`}
                      style={{ fontSize: '0.95rem' }}
                    />
                  </span>
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/10 text-yellow mt-0.5">
                      <i className="fi fi-sr-stethoscope" style={{ fontSize: '0.75rem' }} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary/60">
                        {language === 'en' ? 'For Veterinarians' : '面向獸醫'}
                      </p>
                      <p className="text-sm text-text-secondary">{item.vet}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/10 text-yellow mt-0.5">
                      <i className="fi fi-sr-home" style={{ fontSize: '0.75rem' }} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary/60">
                        {language === 'en' ? 'For Cat Owners' : '面向貓主人'}
                      </p>
                      <p className="text-sm text-text-secondary">{item.owner}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
