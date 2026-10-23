import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Marquee: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background py-6">
      <div className="flex whitespace-nowrap">
        {/* Track 1 */}
        <div className="animate-marquee flex items-center gap-8 pr-8">
          {t.ticker.map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-3 text-sm font-semibold text-text-secondary/60"
            >
              <span className="h-2 w-2 rounded-full bg-yellow shrink-0" />
              {item}
            </span>
          ))}
        </div>

        {/* Track 2 (Clone for infinite seamless loop) */}
        <div className="animate-marquee flex items-center gap-8 pr-8" aria-hidden="true">
          {t.ticker.map((item, idx) => (
            <span
              key={`clone-${idx}`}
              className="flex items-center gap-3 text-sm font-semibold text-text-secondary/60"
            >
              <span className="h-2 w-2 rounded-full bg-yellow shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
