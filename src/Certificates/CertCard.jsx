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

  const typeConfig = {
    "award": { 
      icon: <Award className="w-5 h-5" />, 
      color: "bg-yellow-100 text-yellow-800",
      label: t('card.typeLabels.award')
    },
    "food-safety": { 
      icon: <Shield className="w-5 h-5" />, 
      color: "bg-blue-100 text-blue-800",
      label: t('card.typeLabels.foodSafety')
    },
    "organic": { 
      icon: <Award className="w-5 h-5" />, 
      color: "bg-green-100 text-green-800",
      label: t('card.typeLabels.organic')
    },
    "quality": { 
      icon: <Award className="w-5 h-5" />, 
      color: "bg-purple-100 text-purple-800",
      label: t('card.typeLabels.quality')
    }
  };
  
  const config = typeConfig[certificate.type] || typeConfig["award"];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
      {/* Image / Icon */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
        {config.icon}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${config.color}`}>
          {config.icon}
          <span className="capitalize">{config.label}</span>
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{certificate.title}</h3>

        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
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