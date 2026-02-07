import React from "react";
import featureBg from "../assets/features/Logo.png"; // <-- your image path

const FeatureCard = ({ icon, name, info }) => {
  return (
    <div
      className="
        relative
        group
        w-[315px]
        h-[78px]
        rounded-[20px]
        overflow-hidden
        bg-[#ffffff]
        flex
        items-center
        gap-[3px]
        cursor-pointer
      "
    >
      {/* Hover Background Image */}
      <div
        className="
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          bg-cover bg-center
        "
        style={{ backgroundImage: `url(${featureBg})` }}
      />

      {/* Optional dark overlay (keeps text readable) */}
      <div
        className="
          absolute inset-0
          bg-black/30
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
        "
      />

      {/* Content (unchanged) */}
      <div className="relative z-10 flex items-center gap-[3px] w-full">
        <div className="w-[49px] h-[51px] bg-primary rounded-[16px] flex items-center justify-center text-[#ffffff] ml-[18px]">
          {icon}
        </div>

        <div className="flex flex-col justify-center">
          <h4 className="group-hover:text-white transition">
            {name}
          </h4>
          <p className="text-text-second group-hover:text-white/80 transition">
            {info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
