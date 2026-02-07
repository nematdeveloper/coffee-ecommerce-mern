import React from "react";
import { useTranslation } from 'react-i18next';

const Steps = ({ isRtl = false }) => {
  const { t } = useTranslation("process"); // Using "process" namespace

  // If you want to keep data in array format with translations
  const stepsData = [
    {
      step: 1,
      title: t('steps.step1.title'),
      information: t('steps.step1.information'),
      icon: "📝",
    },
    {
      step: 2,
      title: t('steps.step2.title'),
      information: t('steps.step2.information'),
      icon: "💳",
    },
    {
      step: 3,
      title: t('steps.step3.title'),
      information: t('steps.step3.information'),
      icon: "🏭",
    },
    {
      step: 4,
      title: t('steps.step4.title'),
      information: t('steps.step4.information'),
      icon: "🚚",
    },
    {
      step: 5,
      title: t('steps.step5.title'),
      information: t('steps.step5.information'),
      icon: "✅",
    },
  ];

  return (
    <div
      className="flex flex-col items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {t('header.title')}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          {t('header.description')}
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Main vertical line - hidden on mobile, visible on larger screens */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#4E2C6E] via-[#A37DA4] to-[#4E2C6E]"></div>

        {/* Steps container */}
        <div className="space-y-8 sm:space-y-12">
          {stepsData.map((step, index) => (
            <div
              key={step.step}
              className={`relative flex flex-col ${
                index % 2 === 0
                  ? "md:flex-row md:items-center"
                  : "md:flex-row-reverse md:items-center"
              } gap-6 sm:gap-8`}
            >
              {/* Timeline dot - visible on all screens */}
              <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none flex items-center justify-center z-10">
                {/* Outer glow effect */}
                <div className="absolute w-16 h-16 bg-[#4E2C6E] rounded-full opacity-20 animate-pulse"></div>
                
                {/* Step number in diamond */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4E2C6E] to-[#7A4F8C] flex items-center justify-center rotate-45 shadow-lg hover:scale-110 transition-transform duration-300">
                  <div className="rotate-[-45deg] flex flex-col items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {step.step}
                    </span>
                    <span className="text-xs mt-1">{step.icon}</span>
                  </div>
                </div>
              </div>

              {/* Connector line for mobile */}
              <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gray-300 to-transparent top-8"></div>

              {/* Step card */}
              <div
                className={`w-full md:w-5/12 mt-8 md:mt-0 ${
                  index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                }`}
              >
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-[#4E2C6E]/20">
                  {/* Step indicator for mobile */}
                  <div className="flex items-center gap-3 mb-4 md:hidden">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#4E2C6E] to-[#A37DA4] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#4E2C6E] bg-[#4E2C6E]/10 px-3 py-1 rounded-full">
                        {t('steps.stepIndicator', { step: step.step })}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#4E2C6E] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.information}
                  </p>

                  {/* Decorative bottom border */}
                  <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-[#4E2C6E]/30 transition-colors duration-300">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-6 h-0.5 bg-[#4E2C6E]"></span>
                      <span>{t('steps.processStep')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
        <button className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-[#4E2C6E] to-[#7A4F8C] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
          {t('cta.startOrder')}
        </button>
        <p className="mt-4 text-gray-500 text-sm">
          {t('cta.completionTime')}
        </p>
      </div>
    </div>
  );
};

export default Steps;