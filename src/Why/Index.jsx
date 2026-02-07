import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaAward } from "react-icons/fa6";
import { MdHighQuality } from "react-icons/md";
import { GiFarmTractor } from "react-icons/gi";
import { SiGoogleauthenticator } from "react-icons/si";
/* ---------------- SCROLL HOOK ---------------- */

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

/* ---------------- COMPONENT ---------------- */

const WhyUsSection = () => {
  const { t } = useTranslation("home");
  const [sectionRef, visible] = useInView();

  const features = [
    {
      id: 1,
      titleKey: "whyUs.features.bestQuality.title",
      descriptionKey: "whyUs.features.bestQuality.description",
      icon: <MdHighQuality/>,
    },
    {
      id: 2,
      titleKey: "whyUs.features.premiumProduct.title",
      descriptionKey: "whyUs.features.premiumProduct.description",
      icon: <FaAward />,
    },
    {
      id: 3,
      titleKey: "whyUs.features.authenticSource.title",
      descriptionKey: "whyUs.features.authenticSource.description",
      icon: <SiGoogleauthenticator/>,
    },
    {
      id: 4,
      titleKey: "whyUs.features.directFromFarm.title",
      descriptionKey: "whyUs.features.directFromFarm.description",
      icon: <GiFarmTractor />,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 py-20 mt-20 mb-20  transition-all duration-700
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* LEFT */}
        <div
          className={`transition-all duration-700 delay-100
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
        >
          <h3 className="text-lg font-semibold text-primary uppercase tracking-wider mb-4">
            {t('whyUs.subtitle')}
          </h3>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('whyUs.title')}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            {t('whyUs.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary font-medium px-6 py-3 rounded-lg
              transition-all duration-300 hover:gap-3"
            >
              {t('whyUs.buttons.orderNow')} <FaArrowCircleRight />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-lg
              transition-all duration-300 hover:bg-amber-50 hover:gap-3"
            >
              {t('whyUs.buttons.learnMore')} <FaArrowCircleRight />
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* Divider */}
          <div
            className={`hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300
            transition-all duration-700 delay-300
            ${visible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                style={{ transitionDelay: `${index * 120}ms` }}
                className={`group p-6 rounded-xl transition-all duration-700
                hover:-translate-y-2 hover:shadow-lg
                ${
                  index % 2 === 0 ? "sm:translate-y-[70px]" : ""
                }
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                    transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  >
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;