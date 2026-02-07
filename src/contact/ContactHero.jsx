// components/ContactHero.jsx
'use client';

import { useState, useEffect } from 'react';

const ContactHero = () => {
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=1920&q=80',
      alt: 'Golden saffron threads on dark surface',
      overlay: 'from-red-900/70 via-red-800/60 to-transparent'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1621298881336-96fa4b5d8205?auto=format&fit=crop&w=1920&q=80',
      alt: 'Saffron harvest in golden hour',
      overlay: 'from-red-900/60 via-amber-900/50 to-transparent'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1920&q=80',
      alt: 'Chef cooking with saffron',
      overlay: 'from-red-900/70 via-red-800/60 to-transparent'
    }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentImage((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsAnimating(false), 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(127, 29, 29, 0.8), rgba(127, 29, 29, 0.4)), url(${images[currentImage].src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div className="relative w-full h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000
              ${index === currentImage ? 'opacity-100' : 'opacity-0'}
              ${isAnimating && index === currentImage ? 'scale-110' : 'scale-100'}`}
            style={{
              backgroundImage: `url(${image.src})`,
            }}
          />
        ))}
      </div>

      {/* Animated Overlay Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${images[currentImage].overlay} transition-all duration-1000`}
      />

      {/* Saffron Particle Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            <div className="w-2 h-6 bg-gradient-to-b from-amber-300 to-red-500 rounded-full opacity-60" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto transform transition-all duration-700">
          {/* Decorative Saffron Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Title with Glow Effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            <span className="inline-block bg-gradient-to-r from-amber-200 via-white to-amber-100 bg-clip-text text-transparent drop-shadow-2xl">
              Contact Us
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Connect with us. Let's create something extraordinary with the finest saffron.
          </p>

          {/* Animated CTA Button */}
          <div className="mt-10">
            <button className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-700 to-red-800 rounded-full overflow-hidden shadow-2xl hover:shadow-red-900/50 transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-white/20 blur-md group-hover:blur-lg transition-all duration-500" />
              
              {/* Animated Ring */}
              <div className="absolute inset-0 border-2 border-amber-300/30 rounded-full animate-ping-slow opacity-0 group-hover:opacity-100" />
              
              <svg className="w-5 h-5 ml-3 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-6">
            <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-150" />
            <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-300" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-300/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ContactHero;