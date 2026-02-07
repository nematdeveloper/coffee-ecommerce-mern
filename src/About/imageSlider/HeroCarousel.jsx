import { useState, useEffect } from 'react';
import First from "../../assets/products/Rayan Saffron Packages/All Types Of Saffron/1.jpg"
import Second from "../../assets/products/packages/azin/2.jpg"
import Third from "../../assets/products/packages/azin/3.jpg"
import Forth from "../../assets/products/packages/azin/4.jpg"
import Fifth from ".../../assets/products/packages/metal/5.jpg"
import Sexth from "../../assets/products/packages/metal/7.jpg"
import Seventh from "../../assets/about/11.webp"
import Eighth from "../../assets/about/12.webp"
import Ninth from "../../assets/about/13.webp"
import Tenth from "../../assets/about/14.webp"
const HeroCarousel = () => {
const images = [
  { id: 1, src: First, alt: 'Saffron field' },
  { id: 2, src: Second, alt: 'Saffron harvest' },
  { id: 3, src: Third, alt: 'Premium saffron' },
  { id: 5, src: Forth, alt: 'Saffron packaging' },
  { id: 6, src:  Fifth, alt: 'Saffron packaging' },
  { id: 7, src:  Sexth, alt: 'Saffron packaging' },
  { id: 8, src: Seventh, alt: 'Saffron packaging' },
  { id: 9, src: Eighth, alt: 'Saffron packaging' },
  { id: 10, src: Ninth, alt: 'Saffron packaging' },
  { id: 11, src: Tenth, alt: 'Saffron packaging' },
];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative w-[90%] mt-10 mx-auto overflow-hidden">
      {/* Main Container - Responsive with rounded corners */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] 
                      rounded-none sm:rounded-xl md:rounded-2xl lg:rounded-3xl 
                      overflow-hidden shadow-2xl">
        
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out
                ${idx === currentIndex ? 'opacity-100 ' : 'opacity-0 '}
                ${isAnimating && idx === currentIndex ? 'scale-110' : 'scale-100'}`}
              style={{ 
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transitionProperty: 'opacity, transform'
              }}
            />
          ))}
        </div>

        {/* Red with White Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-red-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5" />

        {/* Responsive Bullets - Different sizes for mobile/desktop */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 
                        flex gap-2 sm:gap-3 md:gap-4 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-900 rounded-full transition-transform hover:scale-110"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div className="relative">
                {/* Outer circle - responsive sizing */}
                <div className={`transition-all duration-300 rounded-full
                  ${idx === currentIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-red-200/70 hover:bg-red-100'
                  }
                  w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4`}
                />
                
                {/* Inner dot - only shows when active */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  rounded-full bg-red-600 transition-all duration-300
                  ${idx === currentIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                  }
                  w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;