import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { DefaultProfileIcon } from './DefaultProfileIcon';

interface CheckoutPageProps {
  onNavigate: (view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout', anchor?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, getSubtotal } = useCart();
  const { language } = useLanguage();

  // Dynamic document title
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Checkout - CAT LAB+';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Authentication simulation state (for prototype)
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Form State
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('United States');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('California');
  const [zipCode, setZipCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'free' | 'express'>('free');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Mobile Order Summary Accordion
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Prototype Sign-In Simulator: autofills contact and verified shipping address
  const handleSignIn = () => {
    setIsSignedIn(true);
    setContact('sarah.jenkins@example.com');
    setFirstName('Sarah');
    setLastName('Jenkins');
    setAddress('742 Evergreen Terrace');
    setApartment('Apt 4B');
    setCity('Springfield');
    setStateVal('California');
    setZipCode('90210');
    setCountry('United States');
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setContact('');
    setFirstName('');
    setLastName('');
    setAddress('');
    setApartment('');
    setCity('');
    setZipCode('');
  };

  // Calculate Subtotal & Items
  // Fallback default item if user directly accessed /checkout with empty cart
  const checkoutItems = items.length > 0 ? items : [
    {
      id: 'catlab-collection-kit',
      titleEn: 'CAT LAB+ Hydrophobic Cat Litter Kit',
      titleZh: 'CAT LAB+ 疏水性貓砂採集套裝',
      subtitleEn: 'Complete at-home urine collection kit with 10-parameter test strip',
      subtitleZh: '完整家庭採尿套裝，附10項尿液檢測試紙鋁箔包',
      priceEn: 29.0,
      priceZh: 890,
      image: '/images/product.webp',
      quantity: 1
    }
  ];

  const subtotal = items.length > 0 ? getSubtotal('en') : 29.0;
  const shippingCost = address.trim().length > 0 ? (shippingMethod === 'express' ? 4.99 : 0.0) : 0.0;
  const total = Math.max(0, subtotal + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      const generatedOrder = '#CL-2026-' + Math.floor(1000 + Math.random() * 9000);
      setOrderNumber(generatedOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased font-sans">
      {/* Top Header Bar: Far Left "Return to shop", Center Brand Logo */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Far Left: Return to shop button */}
          <div className="flex-1 flex items-center justify-start">
            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2 cursor-pointer text-xs sm:text-sm group focus:outline-none"
            >
              <i className="fi fi-sr-arrow-left text-xs transition-transform group-hover:-translate-x-0.5" />
              <span>Return to shop</span>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
              title="Return to CAT LAB+ Home"
            >
              <img src="/images/logo-nav.webp" alt="CAT LAB+" className="h-7 sm:h-8 w-auto" />
            </button>
          </div>

          {/* Right Spacer for optical balance */}
          <div className="flex-1 hidden sm:flex items-center justify-end" />
        </div>
      </header>

      {/* Mobile Collapsible Order Summary Bar */}
      <div className="lg:hidden border-b border-gray-200 bg-[#fafafa]">
        <button
          type="button"
          onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
          className="w-full px-4 py-3.5 flex items-center justify-between text-sm cursor-pointer"
        >
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <i className="fi fi-sr-shopping-bag text-gray-500" />
            <span>{isMobileSummaryOpen ? 'Hide order summary' : 'Show order summary'}</span>
            <svg
              className={`h-4 w-4 text-gray-500 transition-transform ${isMobileSummaryOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="font-extrabold text-gray-900 tabular-nums text-base">
            ${total.toFixed(2)}
          </span>
        </button>

        {isMobileSummaryOpen && (
          <div className="px-4 pb-6 pt-2 border-t border-gray-200/60 bg-[#f9fafb] animate-in fade-in duration-200">
            {/* Mobile items preview */}
            <div className="space-y-3 divide-y divide-gray-200/60">
              {checkoutItems.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-xl border border-gray-200 bg-white p-1 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.titleEn} className="h-full w-full object-contain" />
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-[11px] font-bold text-white shadow-xs">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 leading-tight">{item.titleEn}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">${(item.priceEn * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Subtotal breakdown */}
            <div className="mt-4 pt-3 border-t border-gray-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{address.trim().length > 0 ? (shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`) : 'Enter shipping address'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>USD ${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Checkout Layout */}
      {!orderComplete ? (
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-72px)]">
            {/* ========================================================================= */}
            {/* LEFT COLUMN: Contact, Delivery, Shipping Method, Payment Form (Cols 1-7)  */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-8 lg:py-12 lg:pr-14">
              <form onSubmit={handleSubmitOrder} className="max-w-xl mx-auto lg:mr-0 space-y-9">
                {/* ----------------------------------------------------------------- */}
                {/* 1. CONTACT SECTION                                                */}
                {/* ----------------------------------------------------------------- */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                      Contact
                    </h2>
                    {!isSignedIn && (
                      <button
                        type="button"
                        onClick={handleSignIn}
                        className="text-xs font-semibold text-gray-700 hover:text-black underline underline-offset-2 transition-colors cursor-pointer"
                        title="Simulate signing in as Sarah Jenkins"
                      >
                        Sign in
                      </button>
                    )}
                  </div>

                  {isSignedIn ? (
                    /* Signed-In User State (Simulated) */
                    <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
                      <div className="flex items-center gap-3">
                        <DefaultProfileIcon className="h-10 w-10" iconClassName="h-5 w-5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-gray-900">Sarah Jenkins</p>
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                              Logged in
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">{contact}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    /* Guest Email Input with Question Mark Tooltip */
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Email"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                      />

                      {/* Tooltip trigger icon */}
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 group">
                        <button
                          type="button"
                          tabIndex={0}
                          aria-label="Email information"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                        >
                          <i className="fi fi-sr-question" style={{ fontSize: '0.95rem' }} />
                        </button>

                        {/* Untitled UI Floating Tooltip */}
                        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:flex group-focus-within:flex flex-col items-end z-30 pointer-events-none w-64 sm:w-72">
                          <div className="bg-gray-900 text-white text-xs font-normal rounded-xl px-3.5 py-2.5 shadow-xl leading-relaxed text-left border border-gray-800">
                            Email will be used to send transaction details, receipts, and order shipping updates.
                          </div>
                          <div className="w-2.5 h-2.5 bg-gray-900 rotate-45 mr-3 -mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* 2. DELIVERY SECTION                                               */}
                {/* ----------------------------------------------------------------- */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 mb-3.5">
                    Delivery
                  </h2>

                  <div className="space-y-3">
                    {/* Country / Region Select */}
                    <div className="relative">
                      <label className="absolute left-4 top-2 text-[10px] font-medium text-gray-500 uppercase tracking-wider pointer-events-none">
                        Country/Region
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full h-14 rounded-xl border border-gray-300 bg-white px-4 pt-4 pb-1 text-sm text-gray-900 shadow-2xs appearance-none transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none cursor-pointer"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Japan">Japan</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <i className="fi fi-sr-angle-down" style={{ fontSize: '0.75rem' }} />
                      </div>
                    </div>

                    {/* Name: First name & Last name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name (optional)"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                      />
                    </div>

                    {/* Address with Magnifying Glass Icon */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                      />
                      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <i className="fi fi-sr-search" style={{ fontSize: '0.95rem' }} />
                      </div>
                    </div>

                    {/* Apartment, suite, etc. (optional) */}
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                    />

                    {/* City, State, ZIP code (3-column grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                      />

                      {/* State Dropdown */}
                      <div className="relative">
                        <select
                          value={stateVal}
                          onChange={(e) => setStateVal(e.target.value)}
                          className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 pr-8 text-sm text-gray-900 shadow-2xs appearance-none transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none cursor-pointer"
                        >
                          <option value="California">California</option>
                          <option value="New York">New York</option>
                          <option value="Texas">Texas</option>
                          <option value="Washington">Washington</option>
                          <option value="Florida">Florida</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Other">Other Region</option>
                        </select>
                        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                          <i className="fi fi-sr-angle-down" style={{ fontSize: '0.75rem' }} />
                        </div>
                      </div>

                      <input
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="ZIP code"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 shadow-2xs transition-all hover:border-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* 3. SHIPPING METHOD SECTION                                        */}
                {/* ----------------------------------------------------------------- */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 mb-3.5">
                    Shipping method
                  </h2>

                  {address.trim().length === 0 ? (
                    /* Inactive message as shown in reference */
                    <div className="rounded-xl border border-gray-200 bg-[#f4f4f5]/70 p-4 text-sm text-gray-500">
                      Enter your shipping address to view available shipping methods.
                    </div>
                  ) : (
                    /* Active shipping options */
                    <div className="rounded-xl border border-gray-300 bg-white divide-y divide-gray-200 shadow-2xs overflow-hidden animate-in fade-in duration-200">
                      <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'free'}
                            onChange={() => setShippingMethod('free')}
                            className="h-4 w-4 text-charcoal focus:ring-yellow accent-charcoal cursor-pointer"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Standard Delivery</p>
                            <p className="text-xs text-gray-500">3–5 business days</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">FREE</span>
                      </label>

                      <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="h-4 w-4 text-charcoal focus:ring-yellow accent-charcoal cursor-pointer"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Priority Express</p>
                            <p className="text-xs text-gray-500">1–2 business days</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">$4.99</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* 4. PAY NOW CTA & RETURN LINK                                      */}
                {/* ----------------------------------------------------------------- */}
                <div className="pt-2 space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl bg-[#fed700] hover:bg-[#fed700]/90 text-charcoal font-extrabold text-base tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-yellow/30 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin text-charcoal" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Redirecting to payment gateway...</span>
                      </>
                    ) : (
                      <span>Pay now • ${total.toFixed(2)}</span>
                    )}
                  </button>

                  <div className="flex items-center text-xs text-gray-500 pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate('catalog')}
                      className="hover:text-gray-900 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <i className="fi fi-sr-arrow-left" style={{ fontSize: '0.7rem' }} />
                      <span>Return to cart</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: Order Summary Strip (Cols 8-12) (No Discount Code)          */}
            {/* ========================================================================= */}
            <div className="hidden lg:block lg:col-span-5 bg-[#fafafa] border-l border-gray-200/80 px-8 lg:px-12 py-12">
              <div className="max-w-md sticky top-28 space-y-7">
                {/* Product List */}
                <div className="space-y-4">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Thumbnail with Quantity Badge (Top-Right) */}
                        <div className="relative h-16 w-16 rounded-2xl border border-gray-200/90 bg-white p-2 flex items-center justify-center shrink-0 shadow-2xs">
                          <img
                            src={item.image}
                            alt={item.titleEn}
                            className="h-full w-full object-contain"
                          />
                          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white shadow-xs">
                            {item.quantity}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                            {item.titleEn}
                          </h4>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {item.subtitleEn || 'At-home feline wellness test kit'}
                          </p>
                        </div>
                      </div>

                      {/* Price on Right */}
                      <span className="text-sm font-semibold text-gray-900 tabular-nums shrink-0">
                        ${(item.priceEn * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary Breakdown (Subtotal, Shipping, Total) */}
                <div className="space-y-3 pt-4 border-t border-gray-200/70 text-sm">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 tabular-nums">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {address.trim().length > 0 ? (
                        shippingCost === 0 ? (
                          <span className="font-semibold text-emerald-600">Free</span>
                        ) : (
                          <span className="font-semibold text-gray-900">${shippingCost.toFixed(2)}</span>
                        )
                      ) : (
                        'Enter shipping address'
                      )}
                    </span>
                  </div>

                  {/* Total Line with USD prefix and bold price */}
                  <div className="pt-4 border-t border-gray-200/80 flex items-baseline justify-between">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                        USD
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums tracking-tight">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Seal */}
                <div className="pt-6 border-t border-gray-200/60 flex items-center justify-center gap-6 text-gray-400 text-xs">
                  <span className="flex items-center gap-1.5">
                    <i className="fi fi-sr-shield-check text-emerald-600" />
                    <span>Secure Checkout</span>
                  </span>
                  <span>•</span>
                  <span>Fast Domestic Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* ORDER CONFIRMATION / SUCCESS VIEW                                         */
        /* ========================================================================= */
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow/20 px-3 py-1 text-xs font-bold text-charcoal mb-3">
                Order Confirmed
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Thank you, {lastName || 'Cat Parent'}!
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                Your order has been placed successfully. A confirmation email has been sent to{' '}
                <strong className="text-gray-900">{contact || 'your email'}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 text-left max-w-lg mx-auto space-y-3">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-gray-900 text-sm">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Order Status:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 border border-blue-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Awaiting Shipment</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Estimated Delivery:</span>
                <span className="font-semibold text-gray-900">3–5 Business Days</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Shipping To:</span>
                <span className="font-semibold text-gray-900 text-right truncate max-w-[200px]">
                  {address ? `${address}, ${city}` : 'Default Address'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-gray-500 font-medium">Total Paid:</span>
                <span className="font-extrabold text-gray-900 text-sm">${total.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto rounded-xl bg-charcoal hover:bg-black text-white px-8 py-3.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                Back to Home
              </button>
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="w-full sm:w-auto rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3.5 text-sm font-semibold transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
