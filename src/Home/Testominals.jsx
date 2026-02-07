import React from 'react';
import First from '../assets/testominals/1.jpg';
import Second from '../assets/testominals/2.png';
import Third from '../assets/testominals/3.png';
import { useTranslation } from 'react-i18next';

const logos = [
  { src: First, alt: 'Client 1' },
  { src: Second, alt: 'Client 2' },
  { src: Third, alt: 'Client 3' },
];

const Testimonials = () => {
  const { t } = useTranslation("home"); // ensure namespace matches your JSON

  return (
    <div className="flex flex-col items-center gap-16">
      <h2 className="text-[48px] font-bold mb-16">{t("testimonials.title")}</h2>

      <div className="flex flex-wrap justify-center gap-16 items-center">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt} // optionally translate alt if needed
            className="h-20 w-auto rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
