import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const ConnectedCareSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-surface px-6 py-24">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="transition-all duration-700 ease-out mb-16 text-center opacity-100 translate-y-0">
          <div className="inline-flex items-center gap-2 mb-6">
            <PawIcon className="h-5 w-5" />
            <span className="text-sm font-semibold text-text-secondary">
              {t.careLoop.tag}
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary md:text-5xl">
            {t.careLoop.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t.careLoop.desc}
          </p>
        </div>

        {/* 3 Connected Nodes */}
        <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center md:gap-6">
          {/* Node 1: Cat Owner */}
          <div className="transition-all duration-700 ease-out relative z-10 w-full max-w-xs md:w-1/3 opacity-100 translate-y-0">
            <div className="group flex h-full flex-col items-center rounded-3xl border border-border/50 bg-surface p-8 text-center shadow-sm transition-all hover:-translate-y-2 hover:border-yellow/30 hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow/10 text-yellow transition-colors group-hover:bg-yellow/20">
                <i className="fi fi-sr-home" style={{ fontSize: '1.4rem' }} />
              </div>
              <h4 className="text-lg font-semibold text-text-primary">
                {t.careLoop.nodes.owner.title}
              </h4>
              <p className="mt-2 text-sm text-text-secondary">
                {t.careLoop.nodes.owner.desc}
              </p>
            </div>
          </div>

          {/* Node 2: CAT LAB+ (Black elevated card with floating 3D render) */}
          <div className="transition-all duration-700 ease-out relative z-10 w-full max-w-xs md:w-1/3 opacity-100 translate-y-0">
            <div className="group relative flex h-full flex-col items-center rounded-3xl bg-text-primary p-8 pt-12 text-center text-surface shadow-2xl transition-all hover:-translate-y-2">
              <div className="relative z-10 mx-auto -mt-24 mb-2 flex h-36 w-36 items-center justify-center">
                <img
                  src="/images/product-front.webp"
                  alt="CAT LAB+ Front Packaging"
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
              <h4 className="relative text-lg font-semibold">CAT LAB+</h4>
              <p className="relative mt-2 text-sm text-surface/70">
                {t.careLoop.nodes.catlab.desc}
              </p>
            </div>
          </div>

          {/* Node 3: Veterinarian */}
          <div className="transition-all duration-700 ease-out relative z-10 w-full max-w-xs md:w-1/3 opacity-100 translate-y-0">
            <div className="group flex h-full flex-col items-center rounded-3xl border border-border/50 bg-surface p-8 text-center shadow-sm transition-all hover:-translate-y-2 hover:border-yellow/30 hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow/10 text-yellow transition-colors group-hover:bg-yellow/20">
                <i className="fi fi-sr-stethoscope" style={{ fontSize: '1.4rem' }} />
              </div>
              <h4 className="text-lg font-semibold text-text-primary">
                {t.careLoop.nodes.vet.title}
              </h4>
              <p className="mt-2 text-sm text-text-secondary">
                {t.careLoop.nodes.vet.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Card 1: Dr. Chen */}
          <div className="transition-all duration-700 ease-out h-full opacity-100 translate-y-0">
            <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-tertiary/10 p-8 backdrop-blur-sm">
              <i
                className="fi fi-sr-quote-right mb-4 text-yellow/40"
                style={{ fontSize: '1.4rem' }}
              />
              <p className="flex-1 text-base italic leading-relaxed text-text-secondary">
                "{t.careLoop.testimonials[0].quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow/10 text-yellow">
                  <i className="fi fi-sr-stethoscope" style={{ fontSize: '0.95rem' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {t.careLoop.testimonials[0].author}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {t.careLoop.testimonials[0].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Mrs. Zhang */}
          <div className="transition-all duration-700 ease-out h-full opacity-100 translate-y-0">
            <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-yellow/5 p-8 backdrop-blur-sm">
              <i
                className="fi fi-sr-quote-right mb-4 text-yellow/60"
                style={{ fontSize: '1.4rem' }}
              />
              <p className="flex-1 text-base italic leading-relaxed text-text-secondary">
                "{t.careLoop.testimonials[1].quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow/10 text-yellow">
                  <i className="fi fi-sr-home" style={{ fontSize: '0.95rem' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {t.careLoop.testimonials[1].author}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {t.careLoop.testimonials[1].location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
