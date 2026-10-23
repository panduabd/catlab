import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onNavigate: (view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account', anchor?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, totalQuantity, getSubtotal } =
    useCart();

  const currencySymbol = language === 'en' ? '$' : 'NT$ ';
  const subtotal = getSubtotal(language);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle ESC key to dismiss (light dismiss accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-visibility duration-200 ${
        isCartOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Shopping Cart Drawer"
    >
      {/* Untitled UI Backdrop with subtle blur */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity duration-200 ease-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Untitled UI Slide-Over Modal Panel: Full top to bottom from right */}
      <div
        className={`fixed inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out border-l border-gray-200 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Untitled UI Drawer Header */}
        <div className="flex h-18 items-center justify-between border-b border-gray-200 px-6 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              {language === 'en' ? 'Shopping Cart' : '購物車'}
            </h3>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-gray-200">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <i className="fi fi-sr-cross" style={{ fontSize: '0.85rem' }} />
          </button>
        </div>

        {/* Untitled UI Cart Items Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-gray-100">
          {items.length > 0 ? (
            <div className="divide-y divide-gray-100 space-y-4">
              {items.map((item) => {
                const title = language === 'en' ? item.titleEn : item.titleZh;
                const subtitle = language === 'en' ? item.subtitleEn : item.subtitleZh;
                const price = language === 'en' ? item.priceEn : item.priceZh;
                const itemTotal = price * item.quantity;

                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    {/* Product Thumbnail */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Product Info & Controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-gray-900 leading-snug line-clamp-2">
                          {title}
                        </h4>
                      </div>

                      <p className="mt-1 text-xs text-gray-500 line-clamp-1">{subtitle}</p>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Untitled UI Minimalist Stepper */}
                        <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition-colors focus:outline-none"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-gray-900 select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition-colors focus:outline-none"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            title={language === 'en' ? 'Remove' : '移除'}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="1.75"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>

                          <span className="font-semibold text-sm text-gray-900 tabular-nums">
                            {currencySymbol}
                            {itemTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <i className="fi fi-sr-shopping-bag" style={{ fontSize: '1.4rem' }} />
              </div>
              <h4 className="text-base font-semibold text-gray-900">
                {language === 'en' ? 'Your cart is empty' : '購物車目前是空的'}
              </h4>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  onNavigate('product');
                }}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-all focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                {language === 'en' ? 'Explore Products' : '探索產品'}
              </button>
            </div>
          )}
        </div>

        {/* Untitled UI Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-5 space-y-4 shrink-0">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">
                  {language === 'en' ? 'Subtotal' : '商品小計'}
                </span>
                <span className="font-semibold text-gray-900 tabular-nums text-base">
                  {currencySymbol}
                  {subtotal.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                {language === 'en'
                  ? 'Shipping and taxes calculated at checkout.'
                  : '運費與稅金將於結帳填寫地址時計算。'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  onNavigate('checkout');
                }}
                className="w-full rounded-xl bg-[#fed700] hover:bg-[#fed700]/90 text-gray-900 py-3 text-sm font-semibold shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-yellow-100"
              >
                <span>{language === 'en' ? 'Proceed to Checkout' : '前往結帳'}</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeCart();
                  onNavigate('catalog');
                }}
                className="w-full text-center text-xs font-medium text-gray-500 hover:text-gray-700 py-1.5 transition-colors"
              >
                {language === 'en' ? 'Continue Shopping' : '繼續瀏覽商品'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
