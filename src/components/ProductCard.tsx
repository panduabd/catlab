import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';
import { ProductData } from '../data/products';

interface ProductCardProps {
  product: ProductData;
  onNavigate: (view: 'home' | 'catalog' | 'product' | 'contact', anchor?: string) => void;
  layout?: 'horizontal' | 'grid' | 'compact';
  showSpecs?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  layout = 'horizontal',
  showSpecs = true
}) => {
  const { language } = useLanguage();
  const price = language === 'en' ? product.priceEn : product.priceZh;
  const originalPrice = language === 'en' ? product.originalPriceEn : product.originalPriceZh;
  const eyebrow = language === 'en' ? product.eyebrow.en : product.eyebrow.zh;
  const title = language === 'en' ? product.title.en : product.title.zh;
  const description = language === 'en' ? product.description.en : product.description.zh;
  const specs = language === 'en' ? product.specs.en : product.specs.zh;
  const currencySymbol = language === 'en' ? '$' : 'NT$ ';

  // Compact layout (used on Landing Page: image on the left & small, no subtitle, fits 1 row 2 cols)
  if (layout === 'compact') {
    return (
      <div className="group relative flex items-center gap-4 sm:gap-6 rounded-[24px] border border-gray-200/80 bg-white p-4 sm:p-5 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-gray-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
        {/* Left: Image Container (enlarged cleanly) */}
        <div
          onClick={() => onNavigate('product')}
          className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-2xl bg-[#f8f9fa] p-2 sm:p-2.5 flex items-center justify-center cursor-pointer transition-colors group-hover:bg-[#f3f4f6]"
          title={language === 'en' ? 'Click to view product details' : '點擊查看商品詳情'}
        >
          <img
            src={product.image}
            alt={title}
            className="max-h-full max-w-full object-contain drop-shadow-xs transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Right: Product Title, Price & SHOP NOW Button (No Subtitle) */}
        <div className="flex flex-1 flex-col justify-between min-w-0 py-1">
          <h3
            onClick={() => onNavigate('product')}
            className="text-sm sm:text-base font-bold text-charcoal tracking-tight cursor-pointer hover:text-gray-600 transition-colors leading-snug line-clamp-2"
            title={language === 'en' ? 'Click to view product details' : '點擊查看商品詳情'}
          >
            {title}
          </h3>

          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight tabular-nums">
                {currencySymbol}
                {price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-xs text-gray-400 line-through tabular-nums">
                  {currencySymbol}
                  {originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('product')}
              className="flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-full bg-charcoal hover:bg-black text-white px-4 sm:px-5 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            >
              <i className="fi fi-sr-shopping-bag" style={{ fontSize: '0.8rem' }} />
              <span>{language === 'en' ? 'SHOP NOW' : '立即選購'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (vertical card)
  if (layout === 'grid') {
    return (
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-gray-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-gray-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
        <div>
          {/* Visual Staging */}
          <div
            onClick={() => onNavigate('product')}
            className="relative h-60 sm:h-64 w-full rounded-2xl bg-[#f8f9fa] p-6 flex items-center justify-center cursor-pointer transition-colors group-hover:bg-[#f3f4f6]"
            title={language === 'en' ? 'Click to view product details' : '點擊查看商品詳情'}
          >
            <img
              src={product.image}
              alt={title}
              className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Product Information */}
          <div className="mt-5 flex flex-col">
            <span className="block text-[11px] font-semibold tracking-wide text-gray-400 uppercase mb-1.5">
              {eyebrow}
            </span>

            <h3
              onClick={() => onNavigate('product')}
              className="text-lg sm:text-xl font-bold text-charcoal tracking-tight cursor-pointer hover:text-gray-600 transition-colors leading-snug"
              title={language === 'en' ? 'Click to view product details' : '點擊查看商品詳情'}
            >
              {title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
              {description}
            </p>

            {/* Specifications */}
            {showSpecs && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {specs.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100/70 border border-gray-200/50 px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
                  >
                    <PawIcon className="h-2.5 w-2.5 text-gray-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar: Price + SHOP NOW Button */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight tabular-nums">
              {currencySymbol}
              {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through tabular-nums">
                {currencySymbol}
                {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('product')}
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-charcoal hover:bg-black text-white px-6 sm:px-7 text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gray-200 cursor-pointer"
          >
            <i className="fi fi-sr-shopping-bag" style={{ fontSize: '0.85rem' }} />
            <span>{language === 'en' ? 'SHOP NOW' : '立即選購'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Horizontal layout (used in /products CatalogPage)
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-gray-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Staging (seamless background, clickable to /products/product-url) */}
        <div
          onClick={() => onNavigate('product')}
          className="md:col-span-5 relative h-64 sm:h-72 w-full rounded-2xl bg-[#f8f9fa] p-6 sm:p-8 flex items-center justify-center cursor-pointer transition-colors group-hover:bg-[#f3f4f6]"
          title={language === 'en' ? 'Click to view product details' : '點擊查看商品詳情'}
        >
          <img
            src={product.image}
            alt={title}
            className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Right Column: Product Information & Action Controls */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            {/* Eyebrow Label */}
            <span className="block text-[11px] font-semibold tracking-wide text-gray-400 uppercase mb-1.5">
              {eyebrow}
            </span>

            {/* Title */}
            <h2
              onClick={() => onNavigate('product')}
              className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight cursor-pointer hover:text-gray-600 transition-colors leading-snug"
              title={language === 'en' ? 'Click to view product details' : '點擊查看商品詳情'}
            >
              {title}
            </h2>

            {/* Description */}
            <p className="mt-2.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
              {description}
            </p>

            {/* Specification Pill Chips */}
            {showSpecs && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {specs.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100/70 border border-gray-200/50 px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
                  >
                    <PawIcon className="h-2.5 w-2.5 text-gray-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Bar: Price + SHOP NOW Button */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight tabular-nums">
                {currencySymbol}
                {price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through tabular-nums">
                  {currencySymbol}
                  {originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* SHOP NOW Button (Navigates directly to Detail Product Page) */}
            <button
              type="button"
              onClick={() => onNavigate('product')}
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-charcoal hover:bg-black text-white px-7 sm:px-8 text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gray-200 cursor-pointer"
            >
              <i className="fi fi-sr-shopping-bag" style={{ fontSize: '0.85rem' }} />
              <span>{language === 'en' ? 'SHOP NOW' : '立即選購'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
