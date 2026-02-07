import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar, FaUser, FaQuoteLeft } from "react-icons/fa";
import flag from "../assets/home/arab.webp"
import spain from "../assets/home/spain.jpg"
import india from "../assets/home/india.jpg"
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

const Card = () => {
  const { t } = useTranslation("home");
  const [sectionRef, visible] = useInView();

  // Get testimonials data from translations
  const testimonials = [
    {
      id: 1,
      nameKey: "testimonials.johnSmith.name",
      roleKey: "testimonials.johnSmith.role",
      testimonialKey: "testimonials.johnSmith.testimonial",
      rating: 5,
      img:flag
    },
    {
      id: 2,
      nameKey: "testimonials.sarahJohnson.name",
      roleKey: "testimonials.sarahJohnson.role",
      testimonialKey: "testimonials.sarahJohnson.testimonial",
      rating: 4,
        img:spain
    },
    {
      id: 3,
      nameKey: "testimonials.michaelChen.name",
      roleKey: "testimonials.michaelChen.role",
      testimonialKey: "testimonials.michaelChen.testimonial",
      rating: 5,
        img:india
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="flex flex-col md:flex-row mt-10 flex-wrap justify-center items-center gap-15 px-4 py-16"
    >
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          style={{ transitionDelay: `${index * 150}ms` }}
          className={`w-full max-w-sm bg-gray-50 rounded-3xl p-6 shadow-lg relative
          transition-all duration-700 group
          hover:-translate-y-2 hover:shadow-xl
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* USER AVATAR */}
          <div
            className={`absolute -top-10 right-6 w-20 h-20 rounded-full bg-primary text-white
            border-4 border-white shadow-lg flex items-center justify-center
            transition-all duration-700 delay-200
            ${visible ? "scale-100" : "scale-0"}`}
          >
            <img src={testimonial.img} className="w-full h-full rounded-full " />
          </div>

          {/* HEADER */}
          <div className="mb-4 pr-16">
            <h3 className="text-xl font-bold text-primary">
              {t(testimonial.nameKey)}
            </h3>
            <p className="text-sm text-gray-500">{t(testimonial.roleKey)}</p>
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* CONTENT */}
          <p className="text-gray-600 italic mb-6 leading-relaxed">
            "{t(testimonial.testimonialKey)}"
          </p>

          {/* FOOTER */}
          <div className="flex justify-between items-center">
            <div 
              className="flex gap-1 p-2 rounded-lg bg-primary"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? "text-yellow-300"
                      : "text-white/40"
                  }`}
                />
              ))}
            </div>

            <FaQuoteLeft
              className="w-6 h-6 text-primary opacity-70
              transition-transform duration-300 group-hover:rotate-6"
              aria-label="Testimonial quote"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;