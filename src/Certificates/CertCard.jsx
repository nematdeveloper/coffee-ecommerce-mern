import React from "react";
import { useTranslation } from "react-i18next";
import { Award, Shield } from "lucide-react";

// Calendar Icon
const CalendarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CertificateCard = ({ certificate, onViewClick }) => {
  const { t } = useTranslation("certificates");

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Certificate Image Container */}
      <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img 
          src={certificate.image} 
          alt={certificate.title}
          className="w-auto h-full object-contain p-4" // Changed to object-contain
          loading="lazy"
        />
        
        {/* Certificate Type Badge */}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-white backdrop-blur-sm">
          {certificate.type === "award" && t('card.typeLabels.award')}
          {certificate.type === "food-safety" && t('card.typeLabels.foodSafety')}
          {certificate.type === "organic" && t('card.typeLabels.organic')}
          {certificate.type === "quality" && t('card.typeLabels.quality')}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{certificate.title}</h3>

        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{certificate.date}</span>
          </div>
        </div>

        <button
          onClick={onViewClick}
          className="mt-auto w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          aria-label={t('card.viewDetailsButton', { title: certificate.title })}
        >
          {t('card.viewDetails')}
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;