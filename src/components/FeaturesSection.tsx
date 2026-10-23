import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const vetIcons = [
    'fi-sr-check-circle',
    'fi-sr-heart',
    'fi-sr-users',
    'fi-sr-dollar'
  ];

  const ownerIcons = [
    'fi-sr-home',
    'fi-sr-bell',
    'fi-sr-heart',
    'fi-sr-dollar'
  ];

  return (
    <>
      {/* SECTION 5: For Veterinarians */}
      <section id="features" className="relative overflow-hidden bg-surface px-6 py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Left: Vet Image */}
          <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-xl">
                  <img
                    src="/images/vet-exam.webp"
                    alt="Veterinarian examining cat with stethoscope"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vet Features List */}
          <div className="transition-all duration-700 ease-out order-1 space-y-8 lg:order-2 opacity-100 translate-y-0">
            <div className="inline-flex items-center gap-2 mb-4">
              <PawIcon className="h-5 w-5" />
              <span className="text-sm font-semibold text-text-secondary">
                {t.veterinary.tag}
              </span>
            </div>

            <h2 className="text-3xl font-semibold leading-tight text-text-primary md:text-5xl">
              {t.veterinary.title}
            </h2>

            <p className="text-lg leading-relaxed text-text-secondary">
              {t.veterinary.desc}
            </p>

            <div className="grid gap-4 pt-2">
              {t.veterinary.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-yellow/30 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow/10 text-yellow">
                    <i
                      className={`fi ${vetIcons[idx]}`}
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{pt.title}</h4>
                    <p className="text-sm text-text-secondary">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: For Cat Owners */}
      <section className="relative overflow-hidden bg-tertiary/10 px-6 py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Left: Owner Features */}
          <div className="transition-all duration-700 ease-out space-y-8 opacity-100 translate-y-0">
            <div className="inline-flex items-center gap-2 mb-4">
              <PawIcon className="h-5 w-5" />
              <span className="text-sm font-semibold text-text-secondary">
                {t.catOwner.tag}
              </span>
            </div>

            <h2 className="text-3xl font-semibold leading-tight text-text-primary md:text-5xl">
              {t.catOwner.title}
            </h2>

            <p className="text-lg leading-relaxed text-text-secondary">
              {t.catOwner.desc}
            </p>

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              {t.catOwner.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-background p-5 transition-all hover:border-yellow/30 hover:shadow-md"
                >
                  <div className="mb-3 text-yellow">
                    <i
                      className={`fi ${ownerIcons[idx]}`}
                      style={{ fontSize: '1.1rem' }}
                    />
                  </div>
                  <h4 className="font-semibold text-text-primary">{pt.title}</h4>
                  <p className="mt-1 text-sm text-text-secondary">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Owner Image */}
          <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-xl">
                <img
                  src="/images/cat-owner.webp"
                  alt="Happy cat owner petting cat at home"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
