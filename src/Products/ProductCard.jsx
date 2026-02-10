import React from "react";
import useFetch from "../hooks/custom/useFetch";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./css/ProductCard.css";

const ProductCard = ({ query }) => {
  const { t } = useTranslation("products");
  const { i18n} = useTranslation()
  const navigate = useNavigate();

  const baseUrl = "https://rayanbackend-1.onrender.com";
  const { data, error, loading } = useFetch(
    `${baseUrl}/api/products?lang=${i18n.language}`
  );

  if (loading)
    return (
      <div className="flex flex-wrap justify-around gap-[63px] mt-[150px] px-[32px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4"
            style={{
              width: 283,
              borderRadius: 26,
              background: "#f7f7f7",
              padding: 16,
            }}
          >
            <div
              style={{
                height: 203,
                borderRadius: 26,
                background:
                  "linear-gradient(90deg,#e0e0e0 25%,#f5f5f5 37%,#e0e0e0 63%)",
                backgroundSize: "400% 100%",
                animation: "shimmer 1.4s infinite",
              }}
            />
            <div
              style={{
                height: 14,
                width: "80%",
                borderRadius: 4,
                background: "#e0e0e0",
              }}
            />
            <div
              style={{
                height: 12,
                width: "60%",
                borderRadius: 4,
                background: "#e0e0e0",
              }}
            />
          </div>
        ))}
      </div>
    );

  if (error) return <p>{t("Error loading products")}</p>;

  const filteredProducts = data.filter((product) =>
    product.productname.toLowerCase().startsWith(query.trim().toLowerCase())
  );

  return (
  
    <div className="flex flex-wrap justify-center gap-[63px] mt-[150px] px-[32px]">
      {filteredProducts.map((product) => (
        <div key={product._id} className="card gap-10 flex flex-col">
          {/* Product image */}
          <div className="flex justify-center items-center w-[283px] rounded-[26px] bg-[#F7F7F7] h-[203px]">
            <img
              src={product.productImage}
              alt={product.productname}
              className="w-[80%] h-[80%]"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">{t("products.names")}{product.productname}</p>
            <p className="text-gray-600"> {t("products.types")}{product.type}</p>
          </div>

          {/* View button */}
          <button
            className="slanted-button size-[23px] mt-[-22px] bg-primary"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {t("products.view")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
