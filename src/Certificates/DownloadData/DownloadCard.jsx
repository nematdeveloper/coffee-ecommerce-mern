// FullWidthFileCards.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const FullWidthFileCards = () => {
  const { t } = useTranslation('download');

  const files = [
    { 
      id: 1, 
      name: t("files.file1.name"), 
      type: t("files.file1.type"), 
      size: t("files.file1.size"), 
      url: "https://www.rayansaffron.af/shared-files/5595/?Rayan-Saffron-COMPANY-PROFILE-LAST-ONE.pdf" 
    },
    { 
      id: 2, 
      name: t("files.file2.name"), 
      type: t("files.file2.type"), 
      size: t("files.file2.size"), 
      url: "https://www.rayansaffron.af/shared-files/8129/?%DA%A9%D8%A7%D8%AA%D8%A7%D9%84%D9%88%DA%AF1.pdf" 
    },
    { 
      id: 3, 
      name: t("files.file3.name"), 
      type: t("files.file3.type"), 
      size: t("files.file3.size"), 
      url: "https://www.rayansaffron.af/shared-files/8128/?%D8%A8%D8%B1%D9%88%D8%B4%D9%88%D8%B1.pdf" 
    },
    { 
      id: 4, 
      name: t("files.file4.name"), 
      type: t("files.file4.type"), 
      size: t("files.file4.size"), 
      url: "https://www.rayansaffron.af/our-profile/" 
    },
    { 
      id: 5, 
      name: t("files.file5.name"), 
      type: t("files.file5.type"), 
      size: t("files.file5.size"), 
      url: "https://www.rayansaffron.af/shared-files/5663/?%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA-%DA%A9%D8%A7%D8%B4%D8%AA-%D8%B2%D8%B9%D9%81%D8%B1%D8%A7%D9%86-2.pdf" 
    }
  ];

  const handleDownload = (url, fileName) => {
    if (!url || url === "#") {
      alert(t("alerts.downloadNotConfigured", { fileName }));
      return;
    }

    // Direct download from URL
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {t("header.title")}
        </h1>
        
        <div className="space-y-4">
          {files.map(file => (
            <div 
              key={file.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* File Information */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                        {file.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {file.size}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {file.name}
                    </h3>
                  </div>
                  
                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(file.url, file.name)}
                    className="w-full md:w-32 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                  >
                    {t("buttons.download")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullWidthFileCards;