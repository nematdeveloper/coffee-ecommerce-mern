import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Overveiw from "../assets/about/5.webp";

const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 } // Lower threshold for mobile
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Strategy = () => {
  const { t } = useTranslation("about");
  const [sectionRef, visible] = useInView();

  return (
    <div
      ref={sectionRef}
      className="flex flex-col lg:flex-row justify-center items-center
      lg:gap-12 xl:gap-16 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full"
    >
      {/* IMAGE SIDE - MOBILE FIRST */}
      <div
        className={`relative order-2 lg:order-1 w-full lg:w-1/2 max-w-full
        transition-all duration-700
        ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-20px] sm:translate-x-[-40px]"
        }`}
      >
        {/* Background Shape - Responsive */}
        <div
          className={`absolute top-4 lg:top-10 -left-4 sm:-left-6 z-0 bg-primary
          w-16 sm:w-24 lg:w-[121px] h-48 sm:h-64 lg:h-[347px] 
          rounded-3xl sm:rounded-[50px] lg:rounded-[78px]
          transition-all duration-700 delay-150
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 sm:translate-y-10"
          }`}
        ></div>

        <img
          src={Overveiw}
          alt={t("strategy.imageAlt")}
          className="relative z-20 w-full rounded-xl sm:rounded-2xl"
          loading="lazy"
        />
      </div>

      {/* TEXT SIDE */}
      <div
        className={`flex flex-col text-justify  gap-4 sm:gap-6 lg:gap-10 order-1 lg:order-2 
        w-full lg:w-1/2 max-w-full
        transition-all duration-700 delay-200
        ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-6 sm:translate-x-10"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] 
          font-semibold text-center lg:text-left">
          {t("strategy.title")}
        </h2>

        <p
          className={`text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed
          transition-all duration-700 delay-300
          ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {t("strategy.description1")}
        </p>

        <p
          className={`text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed
          transition-all duration-700 delay-500
          ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {t("strategy.description2")}
        </p>
      </div>
    </div>
  );
};

export default Strategy;