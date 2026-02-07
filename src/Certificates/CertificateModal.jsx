// components/Certificates/CertificateModal.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink, Award, Shield, Calendar } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  const { t } = useTranslation("certificates");

  const getIcon = (type) => {
    if (type === 'award') return <TrophyIcon />;
    if (type === 'food-safety') return <Shield className="w-6 h-6" />;
    return <Award className="w-6 h-6" />;
  };

  const getTypeLabel = (type) => {
    if (type === 'award') return t('modal.typeLabels.award');
    if (type === 'food-safety') return t('modal.typeLabels.foodSafety');
    return t('modal.typeLabels.certificate');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon(certificate.type)}
            <h2 className="text-2xl font-bold text-gray-900">{certificate.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={t('modal.closeButton')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Issuer */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {t('modal.sections.issuer')}
              </h3>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gray-400" />
                <p className="text-lg font-semibold text-gray-900">{certificate.issuer}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {t('modal.sections.description')}
              </h3>
              <p className="text-gray-700">{certificate.description}</p>
            </div>

            {/* Date */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {t('modal.sections.issueDate')}
              </h3>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{certificate.date}</span>
              </div>
            </div>

            {/* Certificate Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {t('modal.sections.certificateType')}
              </h3>
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                {getIcon(certificate.type)}
                <span className="font-medium capitalize">{getTypeLabel(certificate.type)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={certificate.issuerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  aria-label={t('modal.visitWebsiteButton')}
                >
                  <ExternalLink className="w-5 h-5" />
                  {t('modal.visitWebsite')}
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  aria-label={t('modal.closeModalButton')}
                >
                  {t('modal.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trophy Icon Component
const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default CertificateModal;