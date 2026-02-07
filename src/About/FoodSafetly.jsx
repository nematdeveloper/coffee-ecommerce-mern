import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Scroll reveal hook */
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

const FoodSafety = () => {
  const { t } = useTranslation("about");
  const [sectionRef, visible] = useInView();

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col justify-center mt-30 items-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8
      transition-all duration-700 transform
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <h3 className="text-2xl sm:text-3xl lg:text-[40px] text-center font-medium">
        {t("foodSafety.title")}
      </h3>
      <p className="w-full max-w-[900px] text-center text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed transition-opacity duration-700">
        {t("foodSafety.description")}
      </p>
    </div>
  );
};

export default FoodSafety;
