// ProductsHeaderWithNav.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from "../components/Nav/NavMain";
import img1 from "../assets/about/5.jpg"
import img2 from "../assets/about/9.jpg"
import img3 from "../assets/about/7.jpg"

const ProductsHeaderWithNav = ({ category = "all" }) => {
  const { t } = useTranslation("products");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  // Category-specific slides
  const productSlides = {
    all: [
      {
        title: t('header.all.title1', "Premium Quality Products"),
        subtitle: t('header.all.subtitle1', "Carefully curated selection"),
        image: img1
      },
      {
        title: t('header.all.title2', "Exceptional Craftsmanship"),
        subtitle: t('header.all.subtitle2', "Traditional meets modern"),
        image: img2
      },
      {
        title: t('header.all.title3', "Sustainable Sourcing Products"),
        subtitle: t('header.all.subtitle3', "Ethically produced"),
        image: img3
      }
    ],
    saffron: [
      {
        title: t('header.saffron.title1', "Pure Saffron Threads"),
        subtitle: t('header.saffron.subtitle1', "Highest grade available"),
        image: img1
      },
      {
        title: t('header.saffron.title2', "Direct Farm Fresh"),
        subtitle: t('header.saffron.subtitle2', "Harvested with care"),
        image: img2
      }
    ],
    spices: [
      {
        title: t('header.spices.title1', "Aromatic Spices"),
        subtitle: t('header.spices.subtitle1', "Rich flavors & aromas"),
        image: img3
      }
    ]
  };

  // Get slides based on category
  const slides = productSlides[category] || productSlides.all;

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Fade in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for Nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setNavScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Nav positioned absolutely over the header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Nav 
          transparent={!navScrolled}
          scrolled={navScrolled}
          showBackgroundOnScroll={true}
        />
      </div>

      {/* Hero Section - Increased to 50% height */}
      <section className="relative w-full min-h-[80vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out
                ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
          {/* Gradient overlay - darker at top for nav contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Content positioned lower (moved down with mt-32) */}
        <div className="relative container mx-auto px-4 md:px-8 pt-32 mt-16">
          <div className={`text-center transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Bigger text for 50% height */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {slides[currentIndex].title}
            </h1>

            {/* Bigger subtitle text */}
          
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsHeaderWithNav;