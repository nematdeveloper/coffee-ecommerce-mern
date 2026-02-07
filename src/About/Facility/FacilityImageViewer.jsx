import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const FacilityImageViewer = ({ imageUrl, title, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/95"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-16 right-0 text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
            />
          </div>
          <div className="bg-gray-900 p-6">
            <h3 className="text-xl font-medium text-white">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityImageViewer;