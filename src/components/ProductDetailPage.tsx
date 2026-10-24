import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PawIcon } from './PawIcon';

interface ProductDetailPageProps {
  onNavigate: (view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout', anchor?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { addToCart, openCart } = useCart();
  const pdp = t.pdp;

  // Gallery state
  const galleryImages = [
    {
      src: '/images/product-front.webp',
      alt: 'CAT LAB+ Box Packaging Front',
      label: language === 'en' ? 'Front Package' : '包裝正面'
    },
    {
      src: '/images/product.webp',
      alt: 'CAT LAB+ Complete Kit Showcase',
      label: language === 'en' ? 'Kit Overview' : '套裝全覽'
    },
    {
      src: '/images/step-4.webp',
      alt: 'CAT LAB+ Hydrophobic Surface Droplet Collection',
      label: language === 'en' ? 'Hydrophobic Droplets' : '疏水採樣'
    },
    {
      src: '/images/step-5.webp',
      alt: 'CAT LAB+ Volumetric Flask and Pipette',
      label: language === 'en' ? 'Pipette & Flask' : '量瓶滴管'
    },
    {
      src: '/images/step-6.webp',
      alt: 'CAT LAB+ 10-Parameter Urine Test Strip',
      label: language === 'en' ? '10-Param Strip' : '10項試紙'
    },
    {
      src: '/images/vet-exam.webp',
      alt: 'Veterinary Clinical Diagnostics Exam',
      label: language === 'en' ? 'Vet Clinical' : '獸醫臨床'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Quantity Stepper
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Accordion state (Only 3: details, delivery, cms)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    delivery: false,
    cms: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Sticky Buy Bar on scroll
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        // Show sticky bar once bottom of buy box scrolls above viewport
        setShowStickyBar(rect.bottom < 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO: Update page title on detail page
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${pdp.title} | CAT LAB+`;
    return () => {
      document.title = prevTitle;
    };
  }, [language, pdp.title]);

  // Image Zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Cart Add Action
  const handleAddToCart = (openDrawer = true) => {
    addToCart(
      {
        id: 'catlab-collection-kit',
        titleEn: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        titleZh: 'CAT LAB+ 疏水性貓砂採集套裝',
        subtitleEn: 'Complete home kit with 10-parameter test strip foil pack',
        subtitleZh: '完整家庭採尿套裝，附10項尿液檢測試紙鋁箔包',
        priceEn: 29.0,
        priceZh: 890,
        image: '/images/product.webp'
      },
      quantity
    );

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);

    if (openDrawer) {
      setTimeout(() => {
        openCart();
      }, 350);
    }
  };

  const handleOpenBuyNow = () => {
    addToCart(
      {
        id: 'catlab-collection-kit',
        titleEn: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        titleZh: 'CAT LAB+ 疏水性貓砂採集套裝',
        subtitleEn: 'Complete at-home urine collection kit with 10-parameter test strip',
        subtitleZh: '完整家庭採尿套裝，附10項尿液檢測試紙鋁箔包',
        priceEn: pdp.priceAmount,
        priceZh: 890,
        image: '/images/product.webp'
      },
      quantity
    );
    onNavigate('checkout');
  };

  // FAQ Accordion State (PDP)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currencySymbol = language === 'en' ? '$' : 'NT$ ';
  const unitPrice = language === 'en' ? pdp.priceAmount : 890;
  const unitOriginalPrice = language === 'en' ? 35.0 : 1080;
  const totalPrice = unitPrice * quantity;
  const totalOriginalPrice = unitOriginalPrice * quantity;
  const originalPriceDisplay = pdp.originalPriceDisplay || (language === 'en' ? '$35.00' : 'NT$ 1,080');

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-gray-900 antialiased selection:bg-yellow/30">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-24 right-6 z-[90] flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{pdp.addedToCart}</p>
            <p className="text-xs text-gray-500">
              {quantity} × {pdp.priceDisplay}
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Untitled UI Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-500">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>{pdp.breadcrumb.home}</span>
          </button>
          <svg className="h-3.5 w-3.5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="hover:text-gray-900 transition-colors"
          >
            {pdp.breadcrumb.products}
          </button>
          <svg className="h-3.5 w-3.5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
            {pdp.breadcrumb.current}
          </span>
        </nav>

        {/* Product Hero 2-Column Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            {/* Primary Image Viewport with interactive hover zoom */}
            <div
              className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-6 shadow-sm transition-all"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Main Product Image with hover magnifying effect */}
              <div className="relative h-full w-full flex items-center justify-center">
                <img
                  src={galleryImages[activeImageIndex].src}
                  alt={galleryImages[activeImageIndex].alt}
                  className={`h-full w-full object-contain drop-shadow-md transition-transform duration-300 ease-out select-none ${
                    isZoomed ? 'scale-125' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        }
                      : undefined
                  }
                  loading="eager"
                />
              </div>

              {/* Zoom hint indicator */}
              <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-gray-900/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-xs transition-opacity group-hover:opacity-0">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>{language === 'en' ? 'Hover to zoom' : '懸停放大檢視'}</span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {galleryImages.map((thumb, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View ${thumb.label}`}
                    className={`relative aspect-square overflow-hidden rounded-xl border bg-white p-1.5 transition-all focus:outline-none ${
                      isActive
                        ? 'border-yellow ring-2 ring-yellow ring-offset-2 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.label}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Product Info & Buy Box (Strict Minimalist Price) */}
          <div className="lg:col-span-6 space-y-6" ref={buyBoxRef}>
            {/* Header / Category / Brand Tag */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                <span>{pdp.badgeCategory}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {pdp.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
                {pdp.subtitle}
              </p>
            </div>

            {/* Price Box - Price with Strikethrough Original Price */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                  {pdp.priceDisplay}
                </span>
                {originalPriceDisplay && (
                  <span className="text-base sm:text-lg text-gray-400 line-through font-medium">
                    {originalPriceDisplay}
                  </span>
                )}
              </div>

              {/* Quantity Stepper & Buttons */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    {pdp.quantityLabel}
                  </span>

                  {/* Untitled UI Stepper Input Group */}
                  <div className="inline-flex items-center rounded-xl border border-gray-300 bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-10 w-10 items-center justify-center text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-l-xl transition-colors focus:outline-none focus:ring-2 focus:ring-yellow/50 cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-900 select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-xl transition-colors focus:outline-none focus:ring-2 focus:ring-yellow/50 cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Primary CTA Buttons (Add to Cart & Buy Now - No Lightning Icon) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(true)}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow px-5 text-sm font-bold text-charcoal shadow-sm transition-all hover:bg-yellow/90 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-yellow/30 cursor-pointer"
                  >
                    <i className="fi fi-sr-shopping-cart text-base" />
                    <span>{pdp.addToCart}</span>
                  </button>

                  {/* Direct Buy Now Button - No Lightning Icon */}
                  <button
                    type="button"
                    onClick={handleOpenBuyNow}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-charcoal px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-black hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-gray-300 cursor-pointer"
                  >
                    <span>{pdp.buyNow}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Reassurance Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {pdp.trustPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 bg-white p-3.5 text-center shadow-2xs"
                >
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow/15 text-charcoal">
                    <i className={`fi ${point.icon}`} style={{ fontSize: '1rem' }} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">{point.title}</h4>
                  <p className="mt-1 text-[11px] leading-tight text-gray-500 line-clamp-2">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Untitled UI Accordion Stack (Exactly 3: Product Details, Delivery, and Lorem Ipsum CMS Section) */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white divide-y divide-gray-200 overflow-hidden shadow-xs">
              {/* Accordion 1: Product Details */}
              <div className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-gray-900 hover:bg-gray-50/80 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <i className="fi fi-sr-box text-gray-500" style={{ fontSize: '1.1rem' }} />
                    <span>{pdp.accordions.detailsTitle}</span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      openAccordions.details ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openAccordions.details && (
                  <div className="px-5 pb-6 text-sm text-gray-600 space-y-4 border-t border-gray-100 pt-4">
                    <p className="leading-relaxed">{pdp.accordions.detailsIntro}</p>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-2.5">
                        {pdp.accordions.packageIncludesTitle}
                      </h4>
                      <ul className="space-y-2">
                        {pdp.accordions.packageItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-yellow/30 text-charcoal">
                              <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-2.5">
                        {pdp.accordions.specsTitle}
                      </h4>
                      <div className="rounded-xl border border-gray-100 bg-gray-50/70 divide-y divide-gray-100 text-xs">
                        {pdp.accordions.specs.map((spec, idx) => (
                          <div key={idx} className="flex justify-between px-3.5 py-2">
                            <span className="text-gray-500 font-medium">{spec.label}</span>
                            <span className="text-gray-900 font-semibold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Delivery */}
              <div className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('delivery')}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-gray-900 hover:bg-gray-50/80 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <i className="fi fi-sr-truck-side text-gray-500" style={{ fontSize: '1.1rem' }} />
                    <span>{pdp.accordions.deliveryTitle}</span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      openAccordions.delivery ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openAccordions.delivery && (
                  <div className="px-5 pb-6 text-xs text-gray-600 space-y-2.5 border-t border-gray-100 pt-4">
                    {pdp.accordions.deliveryPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 3: Lorem Ipsum (CMS Editable Demonstration) */}
              <div className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('cms')}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-gray-900 hover:bg-gray-50/80 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <i className="fi fi-sr-document text-gray-500" style={{ fontSize: '1.1rem' }} />
                    <span>Lorem Ipsum</span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      openAccordions.cms ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openAccordions.cms && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-gray-600 space-y-3.5 border-t border-gray-100 pt-4 leading-relaxed">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <ul className="space-y-1.5 list-disc pl-4 text-xs text-gray-600">
                      <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</li>
                      <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</li>
                      <li>Deserunt mollit anim id est laborum et dolorum fuga.</li>
                    </ul>
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-[11px] text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {language === 'en' ? '💡 Admin CMS Note:' : '💡 後台 CMS 說明:'}
                      </span>{' '}
                      {language === 'en'
                        ? 'This section is customizable from the admin CMS panel for additional marketing copy, care guides, or warranty terms.'
                        : '此區塊為示範 CMS 自由編輯欄位，未來可在後台管理系統中自由新增、修改或替換自訂圖文。'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Deep Dive - Trusted by Veterinary Professionals */}
        <section className="mt-28 border-t border-gray-200 pt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2">
              <PawIcon className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {t.veterinary.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {t.veterinary.title}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {t.veterinary.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.veterinary.points.map((card, idx) => {
              const icons = ['fi-sr-shield-check', 'fi-sr-heart', 'fi-sr-users', 'fi-sr-clock'];
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-7 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow/20 text-charcoal transition-transform group-hover:scale-110">
                      <i className={`fi ${icons[idx] || 'fi-sr-shield-check'}`} style={{ fontSize: '1.3rem' }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-gray-600">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-charcoal">
                    <span>{language === 'en' ? 'Veterinary Validated' : '獸醫專業認可'}</span>
                    <svg className="h-3.5 w-3.5 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: 8-Step Visual Demonstration (Card Background Pure White) */}
        <section className="mt-28 border-t border-gray-200 pt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2">
              <PawIcon className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {t.instructions.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {t.instructions.title}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {t.instructions.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.instructions.steps.map((st) => (
              <div
                key={st.step}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs hover:shadow-md transition-all duration-300"
              >
                {/* Visual Image Container - Pure White Background */}
                <div className="relative aspect-4/3 w-full bg-white p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
                  <img
                    src={st.image}
                    alt={`Step ${st.step}: ${st.title}`}
                    className="max-h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-yellow font-extrabold text-xs text-charcoal shadow-xs">
                    {st.step}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 leading-tight">
                      {st.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-4">
                      {st.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Product Detail FAQs (Synchronized with Landing Page FAQ) */}
        <section className="mt-28 border-t border-gray-200 pt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2">
              <PawIcon className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {t.faqs.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {t.faqs.title}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {t.faqs.desc}
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-xs">
            {t.faqs.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left text-sm sm:text-base font-bold text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="pr-4">{item.q}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-yellow' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Floating Sticky Purchase Bar on Scroll - No In-Stock Badge, No Subtitle, No Lightning Icon */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg transition-transform duration-300 ease-out ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Left: Product summary */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-1">
              <img
                src="/images/product-front.webp"
                alt="CAT LAB+ Kit"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <h4 className="text-xs font-bold text-gray-900 truncate max-w-xs md:max-w-md">
                {pdp.title}
              </h4>
            </div>
          </div>

          {/* Right: Price & Quick CTA buttons (No lightning icon, no sub title) */}
          <div className="flex items-center gap-3">
            <div className="text-right flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-extrabold text-gray-900">
                {pdp.priceDisplay}
              </span>
              {originalPriceDisplay && (
                <span className="text-xs text-gray-400 line-through">
                  {originalPriceDisplay}
                </span>
              )}
            </div>

            {/* Stepper (compact) */}
            <div className="hidden sm:inline-flex items-center rounded-lg border border-gray-300 bg-white shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30 rounded-l-lg cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-gray-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center text-xs text-gray-600 hover:bg-gray-50 rounded-r-lg cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleAddToCart(true)}
              className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-yellow px-4 text-xs font-bold text-charcoal shadow-xs hover:bg-yellow/90 active:scale-95 transition-all cursor-pointer"
            >
              <i className="fi fi-sr-shopping-cart" style={{ fontSize: '0.85rem' }} />
              <span className="hidden xs:inline">{pdp.addToCart}</span>
            </button>

            {/* Buy Now Button - No Lightning Icon */}
            <button
              type="button"
              onClick={handleOpenBuyNow}
              className="flex h-10 items-center justify-center rounded-xl bg-charcoal px-4 text-xs font-bold text-white shadow-xs hover:bg-black active:scale-95 transition-all cursor-pointer"
            >
              <span>{pdp.buyNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
