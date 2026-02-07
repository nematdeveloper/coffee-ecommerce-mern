// Home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineShoppingBag } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { Link } from 'react-router-dom';
import img from "../assets/about/10.webp"
import imgs from "../assets/about/11.webp"
import imgss from "../assets/products/package/azin/1.jpg"
const Hero = () => {
  const { t } = useTranslation("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      title: t('hero.title1', "World's Finest Saffron"),
      description: t('hero.description1', "Premium quality saffron threads with exceptional aroma"),
      image: img
    },
    {
      title: t('hero.title2', "Directly from Our Farms"),
      description: t('hero.description2', "Freshly harvested saffron, delivered worldwide"),
      image: imgs
    },
    {
      title: t('hero.title3', "Certified Excellence"),
      description: t('hero.description3', "Internationally certified for quality and purity"),
      image: imgss
    }
  ];

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative  w-full  min-h-[90vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Images with reduced overlay */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-cover transition-opacity duration-1000 ease-out
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
        {/* Lighter gradient overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content with adjusted positioning */}
      <div className="relative container mx-auto mt-30 px-4 md:px-8 py-8">
        <div className={`max-w-2xl transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Main Title with better contrast */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {heroSlides[currentIndex].title}
          </h1>

          {/* Description with stronger text shadow */}
          <p className="text-lg md:text-xl text-white mb-10 max-w-xl font-medium drop-shadow-lg">
            {heroSlides[currentIndex].description}
          </p>

          {/* Improved CTA Buttons - Smarter layout */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            {/* Primary Button - More prominent */}
            <Link
              to="/products"
              className="group relative bg-gradient-to-r bg-primary text-white 
                px-8 py-4 rounded-full font-semibold transition-all duration-300 
                hover:shadow-xl hover:shadow-amber-500/40 flex items-center justify-center gap-3
                hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <MdOutlineShoppingBag className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-base md:text-lg font-bold">
                {t('hero.shopNow', "Shop Now")}
              </span>
            </Link>
            
            {/* Secondary Button - Enhanced visibility */}
            <Link
              to="/certificates"
              className="group relative bg-white/20 backdrop-blur-md border-2 border-white/40 text-white 
                px-4 py-4 rounded-full font-semibold transition-all duration-300 
                hover:bg-white/30 hover:border-white/60 hover:shadow-lg hover:shadow-white/20
                flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GrCertificate className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-base md:text-lg font-bold">
                {t('hero.certifications', "Our Certifications")}
              </span>
            </Link>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default Hero;