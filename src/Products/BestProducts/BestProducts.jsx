import React, { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/custom/useFetch";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../css/ProductCard.css";

/* ---------------- SCROLL HOOK ---------------- */

const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* ---------------- COMPONENT ---------------- */

const BestProducts = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [sectionRef, visible] = useInView();

  const baseUrl = "https://rayanbackend-1.onrender.com";
  const { data, error, loading } = useFetch(
    `${baseUrl}/api/products?lang=${i18n.language}`
  );

  /* ---------- LOADING STATE ---------- */
  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl p-4 bg-gray-100 animate-pulse"
          >
            <div className="h-48 sm:h-52 md:h-56 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-lg mt-2" />
          </div>
        ))}
      </div>
    );

  if (error) return <p className="text-center p-8 text-red-500">{t("Error loading products")}</p>;

  /* ---------- CONTENT ---------- */
  return (
    <div
      ref={sectionRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 transition-all duration-700
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      {data.slice(0, 4).map((product, index) => (
        <div
          key={product._id}
          style={{ transitionDelay: `${index * 120}ms` }}
          className={`card flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 group
          hover:-translate-y-2 border border-gray-100
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* IMAGE */}
          <div className="flex justify-center items-center h-48 sm:h-52 md:h-56 bg-gray-50 p-4">
            <img
              src={product.productImage}
              alt={product.productname}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-2 p-4 flex-grow">
            <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">
              {product.productname}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">{product.type || product.description}</p>
          </div>

          {/* BUTTON */}
          <div className="p-14 pt-0">
            <button
              className="slanted-button w-full h-12 bg-primary text-white font-medium rounded-lg
              transition-all duration-300 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {t("view")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestProducts;