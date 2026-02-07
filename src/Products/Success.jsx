import React, { useEffect, useState } from "react";
import SuccessImg from "../assets/products/success.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Success = () => {
  const { t } = useTranslation('products');
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // Load order from localStorage
  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order"));
    if (savedOrder) {
      setOrder(savedOrder);
    } else {
      // Redirect to home if no order found
      navigate("/");
    }
  }, [navigate]);

  // Skeleton Loader
  if (!order)
    return (
      <div className="flex flex-wrap justify-center gap-6 mt-20 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 w-72 bg-gray-100 rounded-2xl p-4 animate-pulse"
          >
            <div className="h-48 rounded-2xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    );

  // Prepare WhatsApp message
  const productsText = order.purchasedProducts
    .map(
      (product, index) =>
        `${index + 1}. ${product.productname} (${product.type}) - ${product.qunatity || order.qunatity} x ${
          product.unit || order.unit
        }`
    )
    .join("\n");

  const message = `${t("products.helloOrderPlaced")}

${t("products.address")}: ${order.address}
${t("products.shippingMethod")}: ${order.shippingMethod}
${t("products.products")}:
${productsText}`;

  const number = "93728061919"; // WhatsApp number in international format (without +)
  const whatsappLink = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
 

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl p-8 flex flex-col gap-10">
        {/* Success Image */}
        <div className="flex justify-center">
          <img
            src={SuccessImg}
            alt={t("products.paymentSuccessful")}
            className="w-24 h-24"
          />
        </div>

        {/* Payment Confirmation */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {t("products.paymentSuccessful")}
          </h2>
          <p className="text-gray-600">
            {t("products.thankYouMessage", { username: order.username })}
          </p>
        </div>

        {/* Payment Details */}
        <div className="rounded-2xl p-6 shadow-md bg-gray-50 flex flex-col gap-4">
          <h3 className="font-semibold text-lg mb-2">{t("products.orderDetails")}</h3>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">{t("products.quantity")}:</span>
            <span className="font-bold text-black">
              {order.qunatity} {order.unit}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">{t("products.shippingMethod")}:</span>
            <span className="font-bold text-black">{order.shippingMethod}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">{t("products.address")}:</span>
            <span className="font-bold text-black">{order.address}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="font-medium text-gray-600">{t("products.products")}:</span>
            <ul className="list-disc list-inside text-right">
              {order.purchasedProducts.map((product, index) => (
                <li key={index} className="font-bold text-black">
                  {product.productname} ({product.type}) - {product.qunatity || order.qunatity} x{" "}
                  {product.unit || order.unit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-primary text-black px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition text-center"
          >
            {t("products.sendInvoiceWhatsApp")}
          </a>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            {t("products.backToHome")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;