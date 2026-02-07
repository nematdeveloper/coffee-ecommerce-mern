// components/Certificates/CertificatesFilter.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";

const CertificatesFilter = ({ activeFilter, onFilterChange }) => {
  const { t } = useTranslation("certificates");

  const filters = [
    { id: "all", label: t('filter.filters.all.label'), ariaLabel: t('filter.filters.all.ariaLabel') },
    { id: "award", label: t('filter.filters.award.label'), ariaLabel: t('filter.filters.award.ariaLabel') },
    { id: "food-safety", label: t('filter.filters.foodSafety.label'), ariaLabel: t('filter.filters.foodSafety.ariaLabel') },
  ];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border border-gray-200  ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-primary" aria-label={t('filter.filterIcon')} />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {t('filter.title')}
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              aria-label={filter.ariaLabel}
              aria-pressed={isActive}
              className={`
                px-5 py-2.5 rounded-lg font-medium transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-primary
                ${isActive 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CertificatesFilter;