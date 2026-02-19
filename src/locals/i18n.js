// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- Import page-specific translation files ---
import enHome from './en/home.json';
import faHome from './fa/home.json';
import deHome from './de/home.json';

import enCommon from "./en/common.json";
import faCommon from "./fa/common.json";
import deCommon from "./de/common.json";

import enProducts from "./en/EnProducts.json";
import faProducts from "./fa/FaProducts.json";
import deProducts from "./de/DeProducts.json";

import enAbout from "./en/about.json";
import faAbout from "./fa/about.json";
import deAbout from "./de/about.json";

import enContact from "./en/contact.json";
import faContact from "./fa/contact.json";
import deContact from "./de/contact.json";

import enCertificates from "./en/certificates.json";
import faCertificates from "./fa/certificates.json";
import deCertificates from "./de/certificates.json";

import enfaq from "./en/Faq.json";
import fafaq from "./fa/Faq.json";
import defaq from "./de/Faq.json";

import enblog from "./en/blog.json";
import fablog from "./fa/blog.json";
import deblog from "./de/blog.json";

import endownload from "./en/Download.json";
import fadownload from "./fa/Download.json";
import dedownload from "./de/Download.json";

// --- Language configuration ---
export const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    fontFamily: "'Poppins', sans-serif",
    isDefault: true
  },
  {
    code: 'fa',
    name: 'فارسی',
    nativeName: 'فارسی',
    direction: 'rtl',
    fontFamily: "'Vazirmatn', sans-serif"
  },
  {
    code: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    direction: 'ltr',
    fontFamily: "'Poppins', sans-serif"
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
        blog: enblog,
        download: endownload
      },
      fa: {
        home: faHome,
        common: faCommon,
        products: faProducts,
        about: faAbout,
        contact: faContact,
        certificates: faCertificates,
        faq: fafaq,
        blog: fablog,
        download: fadownload
      },
      de: {
        home: deHome,
        common: deCommon,
        products: deProducts,
        about: deAbout,
        contact: deContact,
        certificates: deCertificates,
        faq: defaq,
        blog: deblog,
        download: dedownload
      }
    },
    ns: ['home', 'common', 'products', 'about', 'contact', 'certificates', 'faq', 'blog', 'download'],
    defaultNS: 'home',
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa', 'de'],

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

  const html = document.documentElement;
  html.lang = langCode;
  html.dir = lang.direction;
  html.style.setProperty('--font-primary', lang.fontFamily);
  html.classList.remove('lang-en', 'lang-fa', 'lang-de');
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
html.classList.add(`lang-${initialLang}`);

export default i18n;
