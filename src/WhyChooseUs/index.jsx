// WhyChooseUs.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  FaBoxOpen, 
  FaShippingFast,
  FaUsers,
  FaAward,
  FaHandsHelping,
  FaBox,
  FaShoppingCart
} from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import StatsGrid from "./StatsGrid";
import ImageShowcase from "./ImageShowcase";

const WhyChooseUs = () => {
  const { t, i18n } = useTranslation("home");
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  // Features Grid
  const features = [
    {
      icon: <FaBoxOpen />,
      title: t('whyChooseUs.features.packaging.title'),
      description: t('whyChooseUs.features.packaging.description'),
      boxType: "green"
    },
    {
      icon: <FaShippingFast />,
      title: t('whyChooseUs.features.delivery.title'),
      description: t('whyChooseUs.features.delivery.description'),
      boxType: "blue"
    },
    {
      icon: <FaUsers />,
      title: t('whyChooseUs.features.customers.title'),
      description: t('whyChooseUs.features.customers.description'),
      boxType: "purple"
    },
    {
      icon: <FaAward />,
      title: t('whyChooseUs.features.awards.title'),
      description: t('whyChooseUs.features.awards.description'),
      boxType: "amber"
    }
  ];

  // Process Timeline
  const processSteps = [
    { 
      step: "01",
      title: t('whyChooseUs.process.steps.harvesting.title'), 
      description: t('whyChooseUs.process.steps.harvesting.description'),
      icon: <FaShoppingCart />,
      color: "from-green-400 to-emerald-500"
    },
    { 
      step: "02",
      title: t('whyChooseUs.process.steps.sorting.title'), 
      description: t('whyChooseUs.process.steps.sorting.description'),
      icon: <FaHandsHelping />,
      color: "from-blue-400 to-cyan-500"
    },
    { 
      step: "03",
      title: t('whyChooseUs.process.steps.drying.title'), 
      description: t('whyChooseUs.process.steps.drying.description'),
      icon: <FaBox />,
      color: "from-amber-400 to-yellow-500"
    },
    { 
      step: "04",
      title: t('whyChooseUs.process.steps.testing.title'), 
      description: t('whyChooseUs.process.steps.testing.description'),
      icon: <FaShippingFast />,
      color: "from-purple-400 to-violet-500"
    }
  ];

  return (
    <section 
      className="py-20 bg-gradient-to-b from-surface to-surface/90 overflow-hidden"
      dir={i18n.dir()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="flex text-black justify-center items-center gap-2 md:gap-4 text-[28px] md:text-[36px] lg:text-[48px] font-semibold text-center">
              {t('whyChooseUs.title.line2')}
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Stats + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div className="relative"><ImageShowcase /></div>
          <div><StatsGrid /></div>
        
        </div>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
            <span className="flex text-black justify-center items-center gap-2 md:gap-4 text-[28px] md:text-[36px] lg:text-[48px] font-semibold text-center">
              {t('whyChooseUs.process.title')}
            </span>
          </h2>

          <div className="relative space-y-12">
            {processSteps.map((process, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${process.color} border-4 border-surface flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  {process.icon}
                  <div className="absolute -inset-2 rounded-full border-2 border-primary/30 animate-ping opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-surface border border-muted/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
                    <h4 className="text-xl font-bold text-on-surface mb-2">{process.title}</h4>
                    <p className="text-muted-dark leading-relaxed">{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
