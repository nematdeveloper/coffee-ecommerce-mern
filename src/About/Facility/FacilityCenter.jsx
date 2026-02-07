import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FacilityStep from './FacilityStep';
import FacilityImageViewer from './FacilityImageViewer';
import first from "../../assets/about/4.webp"

const FacilityCenter = () => {
  const { t } = useTranslation("about"); // Using "facility" namespace
  
  // Facility data with translations
  const facilityData = [
    {
      id: 1,
      step: 1,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      images: [
        first,
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      ]
    },
    {
      id: 2,
      step: 2,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      ]
    },
    {
      id: 3,
      step: 3,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      ]
    },
    {
      id: 4,
      step: 4,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      ]
    },
    {
      id: 5,
      step: 5,
      title: t('steps.step5.title'),
      description: t('steps.step5.description'),
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      ]
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl, stepTitle, imageIndex) => {
    setSelectedImage({ url: imageUrl, title: stepTitle, index: imageIndex });
  };

  const handleCloseImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <header className="pt-12 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t('header.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('header.description')}
          </p>
        </div>
      </header>

      <main className="py-12 px-4 max-w-7xl mx-auto">
        {/* Wider Steps Container */}
        <div className="relative space-y-24">
          {facilityData.map((step, index) => (
            <FacilityStep
              key={step.id}
              step={step}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </main>


      {selectedImage && (
        <FacilityImageViewer
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={handleCloseImageViewer}
        />
      )}
    </div>
  );
};

export default FacilityCenter;