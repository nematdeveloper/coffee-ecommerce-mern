// components/Certificates/FeaturedCertificate.jsx
import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Award, ExternalLink } from "lucide-react";
import featuredImage from "../assets/about/2.webp";

const useInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, visible];
};

const CalendarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FeaturedCertificate = ({ certificate, onViewClick }) => {
  const { t } = useTranslation("certificates");
  const [containerRef, isVisible] = useInView();

  return (
    <div
      ref={containerRef}
      className={`bg-primary rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Container - 90% width on large screens, full width on mobile */}
        <div className="lg:w-[90%] w-full flex items-center justify-center p-6 lg:p-10">
          <div className="relative w-full max-w-4xl">
            <div className="bg-gray-100 rounded-lg shadow-xl overflow-hidden w-full aspect-video lg:aspect-auto lg:h-[500px]">
              <img
                src={featuredImage}
                alt={certificate.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="lg:w-[40%] w-full p-6 lg:p-8 text-white flex flex-col justify-center">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
              {certificate.title}
            </h2>

            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-base lg:text-lg">{certificate.issuer}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-base lg:text-lg">
                  {t('featuredCertificate.issued')}: {certificate.date}
                </span>
              </div>
            </div>

            <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-6">
              {certificate.description}
            </p>
          </div>

          <div className="flex flex-col flex-wrap sm:flex-row gap-3 lg:gap-4">
            <button
              onClick={onViewClick}
              className="bg-white text-primary px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-base lg:text-lg flex-1 text-center"
              aria-label={t('featuredCertificate.viewDetailsButton')}
            >
              {t('featuredCertificate.viewDetails')}
            </button>
            <a
              href={certificate.issuerWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 lg:gap-3 border-2 border-white text-white px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-base lg:text-lg flex-1 text-center"
              aria-label={t('featuredCertificate.visitIssuerLink')}
            >
              <ExternalLink className="w-5 h-5 lg:w-6 lg:h-6" />
              {t('featuredCertificate.visitIssuer')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCertificate;