import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationContent } from '../translations';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // English-only mode for prototype
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState('en');
    localStorage.setItem('catlab_lang', 'en');
  };

  useEffect(() => {
    document.documentElement.lang = 'en';
    localStorage.setItem('catlab_lang', 'en');
  }, []);

  const value = {
    language: 'en' as Language,
    setLanguage,
    t: translations['en']
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
