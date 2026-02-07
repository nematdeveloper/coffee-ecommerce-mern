import React from "react";
import { useTranslation } from "react-i18next";
import FeatureCard from "./FeatureCard";
import {
  FaCertificate,
  FaUserShield,
  FaRocket,
  FaCogs,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

const Features = () => {
  const { t } = useTranslation();

  const featuresData = [
    {
      icon: <FaCertificate className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.certifiedCourses.name'),
      info: t('features.certifiedCourses.info'),
    },
    {
      icon: <FaUserShield className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.securePlatform.name'),
      info: t('features.securePlatform.info'),
    },
    {
      icon: <FaRocket className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.fastLearning.name'),
      info: t('features.fastLearning.info'),
    },
    {
      icon: <FaCogs className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.customizable.name'),
      info: t('features.customizable.info'),
    },
    {
      icon: <FaHeadset className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.support.name'),
      info: t('features.support.info'),
    },
    {
      icon: <FaGlobe className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.globalAccess.name'),
      info: t('features.globalAccess.info'),
    },
    {
      icon: <FaShieldAlt className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.trustedSystem.name'),
      info: t('features.trustedSystem.info'),
    },
    {
      icon: <FaStar className="text-xl md:text-2xl lg:text-3xl" />,
      name: t('features.topRated.name'),
      info: t('features.topRated.info'),
    },
  ];

  return (
    <div className="bg-primary/10  w-full py-8 md:py-12  lg:py-16">
      <div className="flex flex-col justify-center  items-center mx-auto px-4  sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-12">
          {t('features.title')}
        </h2>

        <div className="flex flex-wrap justify-between items-center gap-y-13 gap-x-6">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              name={feature.name}
              info={feature.info}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;