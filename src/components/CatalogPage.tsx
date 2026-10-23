import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';

interface CatalogPageProps {
  onNavigate: (view: 'home' | 'catalog' | 'product' | 'contact', anchor?: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  // SEO: Update page title and meta description dynamically
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      language === 'en'
        ? 'Products - Cat Urine Collection & At-Home Diagnostic Kits | CAT LAB+'
        : 'Products - 貓咪居家尿液採集與健康檢測套裝目錄 | CAT LAB+';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        language === 'en'
          ? 'Explore CAT LAB+ veterinary-approved at-home cat urine collection kits and 10-parameter urinalysis diagnostic strips for stress-free feline health monitoring.'
          : '探索 CAT LAB+ 獸醫臨床認證貓咪居家採尿套組與10項尿液檢測試紙，提供零壓力、非侵入性毛孩健康監測方案。'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [language]);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-28 text-text-primary antialiased">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* LEFT-ALIGNED MINIMALIST HEADER: "Products" (NO SUBTITLE)                 */}
        {/* ========================================================================= */}
        <header className="mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-charcoal">
            {language === 'en' ? 'Products' : 'Products'}
          </h1>
        </header>

        {/* ========================================================================= */}
        {/* HORIZONTAL CARDS STACKED VERTICALLY FROM TOP TO BOTTOM                   */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
};
