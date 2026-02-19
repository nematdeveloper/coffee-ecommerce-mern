import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaHeart,
  FaYoutube,
} from "react-icons/fa";

/* ------------------ SCROLL HOOK ------------------ */

const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* ------------------ COMPONENT ------------------ */

const FormAbout = () => {
  const { t } = useTranslation("contact");
  const [headerRef, headerVisible] = useInView();
  const [valuesRef, valuesVisible] = useInView();
  const [missionRef, missionVisible] = useInView();
  const [socialRef, socialVisible] = useInView();

  return (
    <div className="w-full bg-gradient-to-b from-red-50 via-white to-amber-50  py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ---------------- HEADER ---------------- */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700
          ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <FaHeart className="text-white text-2xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("about.title")}
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            {t("about.subtitle")}
          </p>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("about.description")}
          </p>
        </div>

        {/* ---------------- VALUES ---------------- */}
        <div ref={valuesRef} className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-14">
            {t("values.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div
              style={{ transitionDelay: `0ms` }}
              className={`group relative bg-white p-8 rounded-xl border
                transition-all duration-700
                hover:-translate-y-3 hover:shadow-xl
                ${
                  valuesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  1
                </div>
              </div>

              <h3 className="text-xl font-bold text-center mt-8 mb-4">
                {t("values.innovation.title")}
              </h3>
              <p className="text-gray-600 text-center">
                {t("values.innovation.description")}
              </p>
            </div>

            {/* Value 2 */}
            <div
              style={{ transitionDelay: `120ms` }}
              className={`group relative bg-white p-8 rounded-xl border
                transition-all duration-700
                hover:-translate-y-3 hover:shadow-xl
                ${
                  valuesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  2
                </div>
              </div>

              <h3 className="text-xl font-bold text-center mt-8 mb-4">
                {t("values.excellence.title")}
              </h3>
              <p className="text-gray-600 text-center">
                {t("values.excellence.description")}
              </p>
            </div>

            {/* Value 3 */}
            <div
              style={{ transitionDelay: `240ms` }}
              className={`group relative bg-white p-8 rounded-xl border
                transition-all duration-700
                hover:-translate-y-3 hover:shadow-xl
                ${
                  valuesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  3
                </div>
              </div>

              <h3 className="text-xl font-bold text-center mt-8 mb-4">
                {t("values.collaboration.title")}
              </h3>
              <p className="text-gray-600 text-center">
                {t("values.collaboration.description")}
              </p>
            </div>

            {/* Value 4 */}
            <div
              style={{ transitionDelay: `360ms` }}
              className={`group relative bg-white p-8 rounded-xl border
                transition-all duration-700
                hover:-translate-y-3 hover:shadow-xl
                ${
                  valuesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  4
                </div>
              </div>

              <h3 className="text-xl font-bold text-center mt-8 mb-4">
                {t("values.integrity.title")}
              </h3>
              <p className="text-gray-600 text-center">
                {t("values.integrity.description")}
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- MISSION ---------------- */}
        <div
          ref={missionRef}
          className={`bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-12 mb-24
          transition-all duration-700
          ${
            missionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t("mission.title")}
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              {t("mission.description")}
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </div>

        {/* ---------------- SOCIAL ---------------- */}
        <div
          ref={socialRef}
          className={`text-center transition-all duration-700
          ${
            socialVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
        >
          <h2 className="text-3xl font-bold mb-6">
            {t("social.title")}
          </h2>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("social.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/brevacoffee"
              className="group w-32 p-6 bg-white rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:rotate-1 hover:text-[#1877F2]"
              aria-label={t("social.facebook.ariaLabel")}
            >
              <div className="text-3xl mb-3 text-gray-700 group-hover:scale-110 transition-transform">
                <FaFacebook />
              </div>
              <span className="text-gray-600 font-medium">
                {t("social.facebook.name")}
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/breave"
              className="group w-32 p-6 bg-white rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:rotate-1 hover:text-[#E4405F]"
              aria-label={t("social.instagram.ariaLabel")}
            >
              <div className="text-3xl mb-3 text-gray-700 group-hover:scale-110 transition-transform">
                <FaInstagram />
              </div>
              <span className="text-gray-600 font-medium">
                {t("social.instagram.name")}
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/brevacoffee"
              className="group w-32 p-6 bg-white rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:rotate-1 hover:text-[#0A66C2]"
              aria-label={t("social.linkedin.ariaLabel")}
            >
              <div className="text-3xl mb-3 text-gray-700 group-hover:scale-110 transition-transform">
                <FaLinkedin />
              </div>
              <span className="text-gray-600 font-medium">
                {t("social.linkedin.name")}
              </span>
            </a>

            {/* Twitter */}
            <a
              href="https://www.youtube.com/brevacoffee"
              className="group w-32 p-6 bg-white rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:rotate-1 hover:text-[#1DA1F2]"
              aria-label={t("social.twitter.ariaLabel")}
            >
              <div className="text-3xl mb-3 text-gray-700 group-hover:scale-110 transition-transform">
                <FaYoutube />
              </div>
              <span className="text-gray-600 font-medium">
                {t("social.twitter.name")}
              </span>
            </a>
          </div>
        </div>

        {/* ---------------- DECORATION ---------------- */}
        <div className="hidden lg:block">
          <div className="absolute left-10 top-1/3 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute right-20 top-1/4 w-6 h-6 bg-primary/10 rounded-full animate-pulse" />
          <div className="absolute left-1/3 bottom-1/4 w-3 h-3 bg-primary/15 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default FormAbout;