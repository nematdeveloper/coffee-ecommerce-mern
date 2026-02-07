// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- Import page-specific translation files ---
// Home page translations
import enHome from './en/home.json';
import faHome from './fa/home.json';
import arHome from './ar/home.json';
import enCommon from "./en/common.json";
import faCommon from "./fa/common.json";
import arCommon from "./ar/common.json";
import enProducts from "./en/EnProducts.json";
import faProducts from "./fa/FaProducts.json";
import arProducts from "./ar/ArProducts.json";
import enAbout from "./en/about.json";
import faAbout from "./fa/about.json";
import arAbout from "./ar/about.json";
import enContact from "./en/contact.json";
import faContact from "./fa/contact.json";
import arContact from "./ar/contact.json";
import enCertificates from "./en/certificates.json";  // تصحیح نام
import faCertificates from "./fa/certificates.json";  // تصحیح نام
import arCertificates from "./ar/certificates.json";  // تصحیح نام
import enfaq  from "./en/Faq.json"
import fafaq from "./fa/Faq.json"
import arfaq from "./ar/Faq.json"
import enblog  from "./en/blog.json"
import fablog from "./fa/blog.json"
import arblog from "./ar/blog.json"

import endownload  from "./en/Download.json"
import fadownload from "./fa/Download.json"
import ardownload from "./ar/Download.json"

// --- Language configuration ---
export const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    fontFamily: "'Poppins', sans-serif", // 👈 ADD THIS LINE
    isDefault: true
  },
  {
    code: 'fa',
    name: 'Farsi',
    nativeName: 'فارسی',
    flag: '🇮🇷',
    direction: 'rtl',
    fontFamily: "'Vazirmatn', sans-serif" // 👈 ADD THIS LINE
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
    fontFamily: "'Vazirmatn', sans-serif" // 👈 ADD THIS LINE
  }
];

// --- Initialize i18next ---
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        home: enHome, 
        common: enCommon, 
        products: enProducts, 
        about: enAbout, 
    
        contact: enContact,
        certificates: enCertificates,
        faq: enfaq,
        blog:enblog,
        download:endownload
      },
      fa: { 
        home: faHome, 
        common: faCommon, 
      
        products: faProducts, 
        about: faAbout, 
        contact: faContact,
        certificates: faCertificates ,
        faq:fafaq,
        blog:fablog,
        download:fadownload
      },
      ar: { 
        home: arHome, 
        common: arCommon, 
        products: arProducts, 
        about: arAbout, 
        contact: arContact,
        certificates: arCertificates,
        faq: arfaq,
        blog:arblog,
        download:ardownload
      }
    },
    ns: ['home', "common", "products", "about", "contact", "certificates","faq","blog","download"], 
    defaultNS: 'home',                 // default namespace if none specified
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa', 'ar'],
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    }
  });

// --- Function to change language and update direction ---
export const changeLanguage = (langCode) => {
  const lang = languages.find(l => l.code === langCode) || languages[0];

  // Update HTML attributes
  const html = document.documentElement;
  html.lang = langCode;
  html.dir = lang.direction;

    html.style.setProperty('--font-primary', lang.fontFamily);

      html.classList.remove('lang-en', 'lang-fa', 'lang-ar');
  html.classList.add(`lang-${langCode}`);

  return i18n.changeLanguage(langCode);
};

// --- Set initial HTML direction ---
const initialLang = i18n.language || 'en';
const initialLangConfig = languages.find(l => l.code === initialLang) || languages[0];
const html = document.documentElement;
html.lang = initialLang;
html.dir = initialLangConfig.direction;

html.style.setProperty('--font-primary', initialLangConfig.fontFamily);
html.classList.add(`lang-${initialLang}`)

export default i18n;