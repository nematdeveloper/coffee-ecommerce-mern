import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import img from "../assets/saffron/feature.png";

const ImageShowcase = () => {
  const { t, i18n } = useTranslation("home"); // use 'home' namespace

  const features = [
    t("whyChooseUs.imageShowcase.feature1"),
    t("whyChooseUs.imageShowcase.feature2"),
    t("whyChooseUs.imageShowcase.feature3"),
    t("whyChooseUs.imageShowcase.feature4")
  ];

  return (
    <div className="relative" dir={i18n.dir()}>
      {/* Plain Image */}
      <div className="relative rounded-3xl overflow-hidden">
        <img 
          src={img} 
          alt={t("whyChooseUs.imageShowcase.altText")} 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Floating Feature List */}
      <div className={`absolute -bottom-8 ${i18n.dir() === 'rtl' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} w-11/12 max-w-lg`}>
        <div className="bg-surface border border-muted/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-on-surface" dir={i18n.dir()}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageShowcase;
