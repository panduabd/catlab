import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 grid h-full lg:grid-cols-2">
        <div className="flex items-center justify-center px-8 pt-28 pb-16 md:px-16 lg:px-20">
          <div className="w-full max-w-xl space-y-8">
            {/* Top Paw Badge */}
            <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
              <div className="inline-flex items-center gap-2">
                <PawIcon className="h-5 w-5" />
                <span className="text-sm font-semibold text-text-secondary">
                  {t.hero.badge}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-charcoal sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl">
                <span className="block">{t.hero.titleLine1}</span>
                <span className="block text-yellow">{t.hero.titleLine2}</span>
              </h1>
            </div>

            {/* Description */}
            <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
              <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
                {t.hero.description}
              </p>
            </div>

            {/* Avatars and Market reach */}
            <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    <img
                      src="/images/cat-avatar-1.webp"
                      alt="User 1"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    <img
                      src="/images/cat-avatar-2.webp"
                      alt="User 2"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    <img
                      src="/images/cat-avatar-3.webp"
                      alt="User 3"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    <img
                      src="/images/cat-avatar-4.webp"
                      alt="User 4"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-charcoal">
                    {language === 'en'
                      ? 'Helping more cats enjoy healthier lives'
                      : '幫助更多貓咪享受更健康的生活'}
                  </div>
                  <div className="text-text-secondary">
                    {language === 'en'
                      ? 'Our reach continues to expand across markets.'
                      : '我們的服務範圍持續擴展至更多市場。'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty placeholder on desktop to balance grid */}
        <div className="hidden lg:block" />
      </div>

      {/* Hero Background image with exact original linear-gradient */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <img
          src="/images/hero-bg.webp"
          alt="CAT LAB+ in action"
          className="h-full w-full object-cover object-center"
          loading="eager"
          width="1920"
          height="1080"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 75%)',
          }}
        />
      </div>
    </section>
  );
};
