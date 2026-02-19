import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/* ---------------- DATA ---------------- */

const videos = [
  "https://www.youtube.com/embed/0jIeCAOkgcQ?si=ndN929RjTfQAqtb6=1",
  "https://www.youtube.com/embed/0jIeCAOkgcQ?si=ndN929RjTfQAqtb6=1",
  "https://www.youtube.com/embed/0jIeCAOkgcQ?si=ndN929RjTfQAqtb6=1",

 
];

/* ---------------- SCROLL HOOK ---------------- */

const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* ---------------- COMPONENT ---------------- */

const Video = () => {
  const { t } = useTranslation("home");
  const [sectionRef, visible] = useInView();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div
      ref={sectionRef}
      className={`w-[90%] rounded-2xl m-auto mb-20 min-h-[700px] bg-gray-300 mt-40 relative py-16 px-4
      transition-all duration-700
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      <div className="w-full max-w-7xl mx-auto relative">

        {/* HEADER */}
        <div
          className={`text-center mb-14 transition-all duration-700 delay-150
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('video.title.firstPart')} <span className="text-black">{t('video.title.secondPart')}</span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Navigation]}
          centeredSlides
          loop
          spaceBetween={40}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="w-full"
        >
          {videos.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[550px] rounded-2xl overflow-hidden">
                {/* Main iframe - always clickable */}
                <iframe
                  src={src}
                  className="absolute inset-0 w-full h-full z-10"
                  title={t('video.iframeTitle', { number: index + 1 })}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Overlay - only for non-active slides or on hover */}
                {activeSlide !== index && (
                  <div 
                    className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center cursor-pointer group"
                    onClick={() => {
                      // When overlay is clicked, bring slide to center
                      const swiper = document.querySelector('.swiper')?.swiper;
                      if (swiper) {
                        swiper.slideTo(index);
                      }
                    }}
                  >
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors group-hover:scale-110">
                      <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Subtle gradient at bottom - doesn't block clicks */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

                {/* Play Hint - only for non-active slides */}
                {activeSlide !== index && (
                  <div className="absolute bottom-6 left-6 text-white text-sm z-30">
                    {t('video.playHint')}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAV ARROWS */}
        <div 
          className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition-all flex items-center justify-center hover:scale-110 cursor-pointer"
          aria-label={t('video.previousSlide')}
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        <div 
          className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition-all flex items-center justify-center hover:scale-110 cursor-pointer"
          aria-label={t('video.nextSlide')}
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Video;