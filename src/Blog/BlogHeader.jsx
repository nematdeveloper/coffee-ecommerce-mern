import React from "react";
import { useTranslation } from "react-i18next";
import Nav from "../components/Nav/NavMain";

const BlogHeader = () => {
  const { t } = useTranslation("blog");

  return (
    <div className="relative w-full">
      {/* Make Nav position absolute over gradient */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Nav text="white" />
      </div>
      
      {/* Gradient background */}
      <div className="h-[406px] bg-[linear-gradient(to_bottom,#4E2C6E,#8B6FA0)] pt-20">
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl text-center text-white font-bold">
            {t("header.title")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;