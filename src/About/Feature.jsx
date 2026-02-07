import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiHome, FiUser, FiSettings, FiStar } from "react-icons/fi";

const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Feature = () => {
  const { t } = useTranslation("about");
  const [sectionRef, visible] = useInView();

  const data = [
    { icon: <FiHome size={24} />, title: t("features.feature1.title"), text: t("features.feature1.text") },
    { icon: <FiUser size={24} />, title: t("features.feature2.title"), text: t("features.feature2.text") },
    { icon: <FiSettings size={24} />, title: t("features.feature3.title"), text: t("features.feature3.text") },
    { icon: <FiStar size={24} />, title: t("features.feature4.title"), text: t("features.feature4.text") },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full py-8 sm:py-12 lg:py-16 gap-8 sm:gap-12 lg:gap-20 flex flex-col items-center bg-[#4E2C6E1A]"
    >
      <h3 className="mt-4 sm:mt-6 lg:mt-10 text-2xl sm:text-3xl lg:text-4xl xl:text-[48px] text-center font-medium">
        {t("header.title")}
      </h3>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 px-4 sm:px-6 lg:px-8 items-center w-full">
        {data.map((feature, index) => (
          <div
            key={index}
            style={{ transitionDelay: `${index * 150}ms` }}
            className={`flex w-full sm:w-[calc(50%-1rem)] lg:w-[315px] min-h-[78px] rounded-[20px] bg-[#FFFFFF] px-4 sm:px-[13px] py-4 sm:py-[18px] gap-4 sm:gap-5 items-center
              transition-all duration-700 transform
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              hover:-translate-y-2 hover:shadow-xl
            `}
          >
            <div className="flex-shrink-0 flex justify-center items-center text-white w-12 h-12 sm:w-[49px] sm:h-[51px] bg-primary rounded-2xl sm:rounded-[16px]">
              <span className="text-lg sm:text-xl lg:text-2xl">{feature.icon}</span>
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-sm sm:text-base lg:text-lg">{feature.title}</div>
              <div className="text-xs sm:text-sm text-gray-600">{feature.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
