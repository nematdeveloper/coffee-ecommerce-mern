import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useTranslation } from 'react-i18next';

const FaqHeader = ({ query, setQuery }) => {
  const { t } = useTranslation('faq');

  return (
    <div>
      <div className='flex justify-center flex-col items-center gap-5 mt-20'>
        <p>{t("header.faqs")}</p>
        <h3 className='text-3xl font-bold'>{t("header.title")}</h3>
        <p className='text-text-second'>{t("header.subtitle")}</p>
        <div className="relative w-full max-w-2xl px-4">
          {/* Search Icon */}
          <CiSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          
          {/* Input */}
          <input
            type="text"
            placeholder={t("header.searchPlaceholder")}
            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 
                     outline-none text-gray-800 text-lg shadow-sm hover:shadow-md 
                     focus:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     transition-all duration-200 placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {/* Optional: Clear button when typing */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                       hover:text-gray-600 transition-colors p-1"
              aria-label={t("header.clearSearch")}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FaqHeader;