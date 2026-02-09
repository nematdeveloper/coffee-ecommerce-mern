// pages/Certificates.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CertificatesHeader from '../Certificates/CertHeader';
import CertificatesFilter from '../Certificates/CertFilter';
import CertificateCard from '../Certificates/CertCard';
import FeaturedCertificate from '../Certificates/FeaturedCertificate';
import CertificateModal from '../Certificates/CertificateModal';
import fscp from "../assets/Certs/4.jpg"
import fsc from "../assets/Certs/3.jpg"
import firsttrademark from "../assets/Certs/2.jpg"
import secondtrademark from "../assets/Certs/1.jpg"
const Certificates = () => {
  const { t } = useTranslation("certificates");
  const [filter, setFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Certificate data with translation keys
  const certificates = [
    {
      id: 1,
      titleKey: "certificates.iso22000.title",
      issuerKey: "certificates.iso22000.issuer",
      type: "food-safety",
      dateKey: "certificates.iso22000.date",
      image:fscp,
      issuerWebsite: "https://www.iso.org",
      descriptionKey: "certificates.iso22000.description",
      featured: true
    },
    {
      id: 2,
      titleKey: "certificates.organic.title",
      issuerKey: "certificates.organic.issuer",
      type: "organic",
      dateKey: "certificates.organic.date",
      image: fscp,
      issuerWebsite: "https://www.controlunion.com",
      descriptionKey: "certificates.organic.description",
      featured: false
    },
    {
      id: 3,
      titleKey: "certificates.worldBest.title",
      issuerKey: "certificates.worldBest.issuer",
      type: "award",
      dateKey: "certificates.worldBest.date",
      image: fsc,
      issuerWebsite: "https://www.worldspiceassociation.org",
      descriptionKey: "certificates.worldBest.description",
      featured: false
    },
    {
      id: 4,
      titleKey: "certificates.haccp.title",
      issuerKey: "certificates.haccp.issuer",
      type: "food-safety",
      dateKey: "certificates.haccp.date",
      image: secondtrademark,
      issuerWebsite: "https://www.fssc.com",
      descriptionKey: "certificates.haccp.description",
      featured: false
    },
    {
      id: 5,
      titleKey: "certificates.goldQuality.title",
      issuerKey: "certificates.goldQuality.issuer",
      type: "award",
      dateKey: "certificates.goldQuality.date",
      image: firsttrademark,
      issuerWebsite: "https://www.taste-institute.com",
      descriptionKey: "certificates.goldQuality.description",
      featured: false
    },
   
  ];

  // Map certificates with actual translated values
  const getTranslatedCertificates = () => {
    return certificates.map(cert => ({
      ...cert,
      title: t(cert.titleKey),
      issuer: t(cert.issuerKey),
      date: t(cert.dateKey),
      description: t(cert.descriptionKey)
    }));
  };

  const translatedCertificates = getTranslatedCertificates();
  
  // Get featured certificate
  const featuredCert = translatedCertificates.find(cert => cert.featured);

  // Filter certificates
  const filteredCertificates = filter === 'all' 
    ? translatedCertificates.filter(cert => !cert.featured) // exclude featured from grid
    : translatedCertificates.filter(cert => cert.type === filter && !cert.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <CertificatesHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Certificate */}
        {featuredCert && (
          <FeaturedCertificate 
            certificate={featuredCert} 
            onViewClick={() => setSelectedCertificate(featuredCert)} 
          />
        )}

        {/* Filter */}
        <div className="mt-12">
          <CertificatesFilter 
            activeFilter={filter}
            onFilterChange={setFilter}
          />
        </div>
        
        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCertificates.map((cert) => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert}
              onViewClick={() => setSelectedCertificate(cert)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
};

export default Certificates;