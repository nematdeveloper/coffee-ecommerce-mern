// components/DownloadsHero.jsx
'use client';

import { useState } from 'react';

const DownloadsHero = () => {
  const [activeDownload, setActiveDownload] = useState(null);

  const downloads = [
    {
      id: 1,
      type: "catalog",
      title: "Saffron Selection Catalog",
      description: "View our premium saffron varieties",
      image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80",
      format: "PDF",
      size: "8.4 MB",
      gradient: "from-amber-500 to-red-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      type: "profile",
      title: "Company Profile",
      description: "Our journey with saffron",
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80",
      format: "PDF",
      size: "12.1 MB",
      gradient: "from-red-600 to-amber-700",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 3,
      type: "certificates",
      title: "Quality Certificates",
      description: "Authenticity & purity documents",
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=800&q=80",
      format: "PDF",
      size: "5.2 MB",
      gradient: "from-amber-600 to-red-700",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      type: "pricelist",
      title: "Current Price List",
      description: "Updated wholesale prices",
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=80",
      format: "XLS",
      size: "3.8 MB",
      gradient: "from-red-700 to-amber-800",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const handleDownload = (item) => {
    setActiveDownload(item.id);
    // Simulate download
    setTimeout(() => {
      setActiveDownload(null);
      alert(`Downloading: ${item.title}`);
    }, 1500);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-red-50 via-white to-amber-50">
      {/* Background Pattern - Saffron Stigmas */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="saffron-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50,20 L55,40 L65,45 L55,50 L50,70 L45,50 L35,45 L45,40 Z" 
                fill="none" stroke="#dc2626" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#saffron-pattern)" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        
        {/* Header - Visual Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl 
              flex items-center justify-center shadow-2xl animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl 
              flex items-center justify-center shadow-2xl animate-pulse delay-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-700 via-amber-600 to-red-800 
                bg-clip-text text-transparent">
                Business Resources
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Essential documents for saffron trade partners
            </p>
          </div>
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {downloads.map((item) => (
            <div 
              key={item.id}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative h-full bg-white rounded-2xl overflow-hidden shadow-lg 
                hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2
                border border-red-100`}>
                
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-60`} />
                  
                  {/* File Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm 
                    rounded-xl flex items-center justify-center">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Format Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-red-700 
                      text-sm font-semibold rounded-full">
                      {item.format}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title with visual indicator */}
                  <div className="flex items-start mb-3">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 bg-gradient-to-r ${item.gradient}`} />
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>

                  {/* File Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {item.size}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Updated recently
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(item)}
                    disabled={activeDownload === item.id}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
                      flex items-center justify-center space-x-2
                      ${activeDownload === item.id 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : `bg-gradient-to-r ${item.gradient} text-white hover:shadow-lg`}`}
                  >
                    {activeDownload === item.id ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Active State Indicator */}
                {activeDownload === item.id && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-red-600 border-t-transparent 
                        rounded-full animate-spin" />
                      <p className="text-red-700 font-semibold">Preparing your file...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl 
                opacity-0 group-hover:opacity-20 blur transition duration-500`} />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-red-100">
          <div className="inline-flex items-center text-gray-500 text-sm">
            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            All documents are secure and updated regularly
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsHero;