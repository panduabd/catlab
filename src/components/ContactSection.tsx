import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    telephone: '',
    email: '',
    address: '',
    subject: 'Product Inquiry',
    content: '',
    captchaCode: '',
  });

  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate dynamic authentic Captcha on canvas
  const drawCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaAnswer(code);
    setCaptchaError(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, 210, 64);

    // Grid lines / noise
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(200, 180, 150, ${0.3 + Math.random() * 0.4})`;
      ctx.lineWidth = 1 + Math.random();
      ctx.beginPath();
      ctx.moveTo(Math.random() * 210, Math.random() * 64);
      ctx.bezierCurveTo(
        Math.random() * 210,
        Math.random() * 64,
        Math.random() * 210,
        Math.random() * 64,
        Math.random() * 210,
        Math.random() * 64
      );
      ctx.stroke();
    }

    // Letters
    ctx.font = 'bold 30px system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const x = 32 + i * 42 + (Math.random() - 0.5) * 8;
      const y = 32 + (Math.random() - 0.5) * 8;
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = i % 2 === 0 ? '#282828' : '#666666';
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }

    // Speckles
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(150, 150, 150, ${Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 210, Math.random() * 64, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    drawCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.captchaCode.trim().toUpperCase() !== captchaAnswer) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        company: '',
        name: '',
        telephone: '',
        email: '',
        address: '',
        subject: 'Product Inquiry',
        content: '',
        captchaCode: '',
      });
      drawCaptcha();
    }, 600);
  };

  return (
    <div className="pt-16">
      <section id="contact" className="relative overflow-hidden bg-background px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="transition-all duration-700 ease-out mx-auto mb-8 max-w-3xl text-center md:mb-10 opacity-100 translate-y-0">
            <div className="mb-4 inline-flex items-center gap-2">
              <PawIcon className="h-5 w-5" />
              <span className="text-sm font-semibold text-text-secondary">
                {language === 'en' ? 'Get in Touch' : '聯絡我們'}
              </span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
              {language === 'en' ? 'Contact Us' : '聯絡我們'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
              {language === 'en'
                ? 'If you have any questions, please fill in the following form and send it out. We will contact you as soon as possible. Thank you!'
                : '如果您有任何問題，請填寫以下表格並送出。我們將儘快與您聯繫。謝謝！'}
            </p>
          </div>

          {/* Contact Form Card */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-white shadow-lg shadow-charcoal/5 dark:bg-surface"
          >
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {isSuccess && (
              <div className="p-6 bg-emerald-50 border-b border-emerald-100 text-center">
                <div className="inline-flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <i className="fi fi-sr-check-circle" style={{ fontSize: '1.2rem' }} />
                  <span>
                    {language === 'en'
                      ? 'Thank you! Your message has been sent successfully. We will contact you as soon as possible.'
                      : '感謝您的來信！我們已收到您的訊息，將儘快與您聯繫。'}
                  </span>
                </div>
              </div>
            )}

            <div className="grid gap-5 bg-white p-5 md:grid-cols-2 md:p-8 dark:bg-surface">
              {/* Company name */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Company name' : '公司名稱'}{' '}
                  <em className="not-italic text-red-500">*Required</em>
                </span>
                <input
                  name="company"
                  required
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="contact-input svelte-wzw3py"
                />
              </label>

              {/* Name */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Name' : '姓名'}{' '}
                  <em className="not-italic text-red-500">*Required</em>
                </span>
                <input
                  name="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input svelte-wzw3py"
                />
              </label>

              {/* Telephone */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Telephone' : '電話'}
                </span>
                <input
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="contact-input svelte-wzw3py"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Email' : '電子郵件'}{' '}
                  <em className="not-italic text-red-500">*Required</em>
                </span>
                <input
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input svelte-wzw3py"
                />
              </label>

              {/* Address */}
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Address' : '地址'}
                </span>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="contact-input svelte-wzw3py"
                />
              </label>

              {/* Subject */}
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Subject' : '主旨'}
                </span>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-input svelte-wzw3py"
                >
                  <option value="" disabled>
                    {language === 'en' ? 'Please select' : '請選擇'}
                  </option>
                  <option value="Product Inquiry">
                    {language === 'en' ? 'Product Inquiry' : '產品諮詢'}
                  </option>
                  <option value="Cross-Industry Collaboration">
                    {language === 'en' ? 'Cross-Industry Collaboration' : '異業合作'}
                  </option>
                  <option value="Other Questions">
                    {language === 'en' ? 'Other Questions' : '其他問題'}
                  </option>
                </select>
              </label>

              {/* Content */}
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Content' : '內容'}
                </span>
                <textarea
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  className="contact-input resize svelte-wzw3py"
                />
              </label>

              {/* Verification Code */}
              <div className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-text-primary">
                  {language === 'en' ? 'Verification code' : '驗證碼'}
                </span>
                <div className="captcha-controls svelte-wzw3py">
                  <input
                    name="captchaCode"
                    required
                    type="text"
                    value={formData.captchaCode}
                    onChange={handleChange}
                    autoComplete="off"
                    maxLength={4}
                    className="contact-input captcha-input svelte-wzw3py uppercase font-mono tracking-wider font-bold"
                    aria-label="Verification code"
                  />

                  {/* Canvas verification image */}
                  <canvas
                    ref={canvasRef}
                    width={210}
                    height={64}
                    className="captcha-image svelte-wzw3py cursor-pointer"
                    onClick={drawCaptcha}
                    title="Click to refresh verification code"
                  />

                  <button
                    type="button"
                    onClick={drawCaptcha}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-lg text-text-secondary transition hover:border-yellow hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-blue/50"
                    aria-label="Refresh verification code"
                    title="Refresh verification code"
                  >
                    ↻
                  </button>
                </div>
                {captchaError && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold">
                    {language === 'en'
                      ? 'Incorrect verification code. Please try again.'
                      : '驗證碼不正確，請重新輸入。'}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col items-center gap-3 border-t border-border/60 bg-surface px-6 py-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-yellow px-8 py-3.5 text-sm font-semibold text-charcoal shadow-lg shadow-yellow/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow/30 focus:outline-none focus:ring-2 focus:ring-blue/50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? (language === 'en' ? 'Sending...' : '傳送中...')
                  : (language === 'en' ? 'Send out after filling' : '填寫後送出')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
