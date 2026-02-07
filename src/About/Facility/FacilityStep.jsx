import React from 'react';

const FacilityStep = ({ step, index, onImageClick }) => {
  const isLeftSide = index % 2 === 0;
  const desktopAlignment = isLeftSide ? 'lg:flex-row' : 'lg:flex-row-reverse';
  const contentAlignment = isLeftSide ? 'lg:text-left' : 'lg:text-right';

  const handleImageClick = (imgUrl, imgIndex) => {
    onImageClick(imgUrl, step.title, imgIndex);
  };

  return (
    <div className={`relative flex flex-col ${desktopAlignment} gap-10 lg:gap-20`}>
      {/* Timeline Marker - Larger */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4E2C6E] to-[#7A4F8C] flex items-center justify-center rounded-full shadow-xl">
          <span className="text-white font-bold text-2xl">
            {step.step}
          </span>
        </div>
      </div>

      {/* Wider Step Card */}
      <div className={`w-full lg:w-[60%] mt-16 lg:mt-0 ${contentAlignment}`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
          {/* Step Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-base font-semibold text-white bg-gradient-to-r from-[#4E2C6E] to-[#7A4F8C] px-5 py-2.5 rounded-full">
                Step {step.step}
              </span>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {step.description}
              </p>
            </div>
          </div>

          {/* Big Images - Wider Layout */}
          <div className="space-y-6">
            {step.images.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-72 rounded-xl overflow-hidden cursor-pointer border-2 border-gray-300/50 hover:border-[#4E2C6E]/30 transition-colors"
                onClick={() => handleImageClick(img, idx)}
              >
                <img
                  src={img}
                  alt={`Step ${step.step} - Image ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityStep;