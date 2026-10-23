import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';

interface GetYourProductsSectionProps {
  onNavigate: (view: 'home' | 'catalog' | 'product' | 'contact', anchor?: string) => void;
}

export const GetYourProductsSection: React.FC<GetYourProductsSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const bottomItems = [
    language === 'en' ? 'Chosen by more cat families' : '受到更多貓家庭選擇',
    language === 'en' ? 'Supporting everyday health care' : '支持日常健康照護',
    language === 'en' ? 'Trusted by veterinary professionals' : '獸醫專業人士信賴',
    language === 'en' ? 'Professional quality, reliable sampling experience' : '專業品質，可靠採樣體驗',
    language === 'en' ? 'Expanding across global markets' : '拓展全球市場',
    language === 'en' ? 'Serving more regions worldwide' : '服務全球更多地區'
  ];

  // Maximum 2 products
  const displayProducts = PRODUCTS.slice(0, 2);

  return (
    <section id="get-your-products" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 lg:pb-20">
        {/* Header row: "GET YOUR PRODUCTS" in badge position, no title/subtitle, with small Explore button */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2">
            <PawIcon className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wider text-text-secondary uppercase">
              {language === 'en' ? 'GET YOUR PRODUCTS' : 'GET YOUR PRODUCTS'}
            </span>
          </div>

          {/* Small Explore Button pointing to /products */}
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-1.5 rounded-full bg-charcoal hover:bg-black text-white px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={language === 'en' ? 'Explore all products' : '瀏覽所有產品'}
          >
            <span>Explore</span>
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 2 Products in 1 row 2 columns, compact format with small image on left and no subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              layout="compact"
            />
          ))}
        </div>
      </div>

      {/* Charcoal bottom banner strip with 6 items ("section ini") */}
      <div className="border-t border-border/60 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {bottomItems.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow/15 text-yellow">
                  <PawIcon className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm font-medium text-white/85">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
