import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Overveiw from "../assets/about/5.jpg";

/* ----------- SCROLL ANIMATION HOOK ----------- */
const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* ---------------- COMPONENT ---------------- */
const Overview = () => {
  const { t } = useTranslation("about");
  const [sectionRef, visible] = useInView();

  return (
    <div
      ref={sectionRef}
      className="mt-20 sm:mt-32 px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
          {/* TEXT */}
          <div
            className={`flex flex-col text-xs gap-10 sm:gap-8 lg:gap-[40px] text-justify w-full lg:w-1/2 order-1
            transition-all duration-700 delay-100
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] text-center lg:text-left font-semibold">
              {t("overview.title")}
            </h2>
            <div className="space-y-4 sm:space-y-5">
              <p
                className={`text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed sm:leading-loose
                transition-opacity duration-700 delay-200
                ${visible ? "opacity-100" : "opacity-0"}`}
              >
                {t("overview.description1")}
              </p>
              <p
                className={`text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed sm:leading-loose
                transition-opacity duration-700 delay-400
                ${visible ? "opacity-100" : "opacity-0"}`}
              >
                {t("overview.description2")}
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div
            className={`relative w-full lg:w-1/2 order-2 max-w-lg lg:max-w-none self-start
            transition-all duration-700 delay-200
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Background accent */}
            <div
              className={`absolute top-4 sm:top-6 lg:top-10 -left-4 sm:-left-5 lg:-left-6 z-0 bg-primary
              w-20 sm:w-[100px] lg:w-[121px] h-48 sm:h-[300px] lg:h-[347px] rounded-2xl sm:rounded-[50px] lg:rounded-[78px]
              transition-all duration-700 delay-300
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            ></div>

            <img
              src={Overveiw}
              alt={t("overview.imageAlt")}
              className="relative z-20 w-full rounded-xl sm:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;