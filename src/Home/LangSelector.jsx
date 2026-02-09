import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { languages, changeLanguage } from "../locals/i18n";

const LangSelector = () => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);
  const dropdownRef = useRef(null);

  // Initialize selected language
  useEffect(() => {
    const currentLang =
      languages.find((lang) => lang.code === i18n.language) || languages[0];
    setSelectedLang(currentLang);
  }, [i18n.language]);

  const handleLanguageSelect = async (lang) => {
    try {
      await changeLanguage(lang.code);
      setSelectedLang(lang);
      setIsLangOpen(false);
      console.log(`Language changed to: ${lang.name} (${lang.code})`);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!selectedLang) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop version */}
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="hidden min-[1100px]:flex text-white items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-on-white transition-all hover:bg-muted/40 hover:text-white"
        aria-label={t("nav.selectLanguage") || "Select language"}
        aria-expanded={isLangOpen}
        aria-haspopup="true"
      >
        <span className="text-lg" aria-hidden="true">
          {selectedLang.flag}
        </span>
      
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isLangOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Mobile version */}
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="min-[1100px]:hidden flex items-center gap-2 rounded-lg p-2 text-on-surface transition-colors hover:bg-muted/40 hover:text-primary"
        aria-label={t("nav.selectLanguage") || "Select language"}
        aria-expanded={isLangOpen}
        aria-haspopup="true"
      >
        <span className="text-lg" aria-hidden="true">
          {selectedLang.flag}
        </span>
        <span className="font-medium">{selectedLang.code}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isLangOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      {isLangOpen && (
        <div
          className="absolute right-0 mt-2 w-30  bg-primary  shadow-lg z-50 animate-in fade-in slide-in-from-top-2"
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-black ${
                selectedLang.code === lang.code
                  ? "text-primary font-medium bg-white"
                  : "text-white"
              }`}
              role="menuitem"
              tabIndex={0}
            >
            
              <div className="flex flex-col items-start">
                
                <span className="text-xs text-on-surface/60">{lang.name}</span>
              </div>
              {selectedLang.code === lang.code && (
                <div className="ml-auto h-2 w-2 rounded-full bg-gray-200" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Mobile menu version for dropdown menu integration
export const LangSelectorMobileMenu = ({ closeMenu }) => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    const currentLang =
      languages.find((lang) => lang.code === i18n.language) || languages[0];
    setSelectedLang(currentLang);
  }, [i18n.language]);

  const handleLanguageSelect = async (lang) => {
    try {
      await changeLanguage(lang.code);
      setSelectedLang(lang);
      if (closeMenu) closeMenu();
      console.log(`Language changed to: ${lang.name} (${lang.code})`);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  if (!selectedLang) return null;

  return (
    <div className="pt-4">
      <h3 className="px-3 py-2 text-sm font-semibold  text-on-surface/70">
        {t("nav.selectLanguage") || "Select Language"}
      </h3>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageSelect(lang)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-base font-medium transition-colors ${
            selectedLang.code === lang.code
              ? "text-primary bg-primary/10"
              : "text-on-surface hover:bg-muted/40"
          }`}
        >
          <span className="text-xl" aria-hidden="true">
            {lang.flag}
          </span>
          <div className="flex flex-col items-start">
            <span className="font-medium">{lang.nativeName}</span>
          
          </div>
          {selectedLang.code === lang.code && (
            <div className="ml-auto h-3 w-3 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};

export default LangSelector;
