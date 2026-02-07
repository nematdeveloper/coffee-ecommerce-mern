import React, { useState } from 'react';
import { FaUser, FaFileInvoice } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const CheckOut = ({ setIsModalOpen }) => {
  const { t } = useTranslation('products');
  const { cart, clearCart } = useCart();
  const [username, setusername] = useState("");
  const [address, setaddress] = useState("");
  const [shippingMethod, setshippingMethod] = useState("");
  const [qunatity, setqunatity] = useState("");
  const [unit, setUnit] = useState("Gram");
  const [phone, setPhone] = useState("");
  
  const navigate = useNavigate();
  
  const baseUrl = "https://rayanbackend-1.onrender.com";

  const orderHandler = async () => {
    const data = {
      username,
      phone,
      address,
      shippingMethod,
      qunatity,
      unit,
      purchasedProducts: cart,
    };

    try {
      const response = await fetch(`${baseUrl}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const order = await response.json();
      localStorage.setItem("order", JSON.stringify(data));

      if (order.success) {
        clearCart();
        setIsModalOpen(false);
        navigate("/success");
        toast.success(t("products.orderHasBeenSubmitted"), {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: t("products.failedToSubmitOrder")
        });
      }
    } catch (err) {
      console.error("Order error:", err);
      alert(t("products.orderErrorOccurred"));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={() => setIsModalOpen(false)}
      />
      
      {/* Modal */}
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl relative p-4 md:p-6 lg:p-10 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-800 text-xl md:text-2xl font-bold z-10"
        >
          ✕
        </button>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16">
          {/* LEFT STEPS - Vertical on mobile, horizontal on large screens */}
          <div className="flex lg:flex-col items-center justify-center lg:justify-start gap-6 lg:gap-0">
            {/* Step 1 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-[54px] md:h-[54px] rounded-full bg-primary flex items-center justify-center text-white text-base md:text-xl">
                <FaUser />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-400">{t("products.step1")}</p>
                <p className="font-semibold text-sm md:text-base">{t("products.userInfo")}</p>
              </div>
            </div>

            {/* Connector Line - Horizontal on mobile, vertical on desktop */}
            <div className="lg:hidden w-16 h-[4px] bg-gray-200 rounded-full relative">
              <div className="absolute left-0 w-1/2 h-full bg-primary rounded-full" />
            </div>
            <div className="hidden lg:block w-[4px] h-12 md:h-[80px] bg-gray-200 rounded-full relative my-4 mx-auto">
              <div className="absolute top-0 w-full h-1/2 bg-primary rounded-full" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-[54px] md:h-[54px] rounded-full bg-primary flex items-center justify-center text-white text-base md:text-xl">
                <FaFileInvoice />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-400">{t("products.step2")}</p>
                <p className="font-semibold text-sm md:text-base">{t("products.invoice")}</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="flex flex-col gap-4 md:gap-6 flex-1">
            {/* Full Name */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-sm md:text-base font-medium">{t("products.fullName")}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="w-full h-10 md:h-[44px] bg-[#F7F7F7] rounded-md px-3 outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-sm md:text-base font-medium">{t("products.quantity")}</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  min="1"
                  value={qunatity}
                  onChange={(e) => setqunatity(e.target.value)}
                  className="w-full sm:w-[calc(100%-140px)] h-10 md:h-[44px] bg-[#F7F7F7] rounded-md px-3 outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full sm:w-[140px] h-10 md:h-[44px] bg-[#F7F7F7] rounded-md px-2 md:px-3 outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option>{t("products.gram")}</option>
                  <option>{t("products.kilogram")}</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-sm md:text-base font-medium">{t("products.shippingAddress")}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="w-full h-10 md:h-[44px] bg-[#F7F7F7] rounded-md px-3 outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-sm md:text-base font-medium">{t("products.phoneNumber")}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 md:h-[44px] bg-[#F7F7F7] rounded-md px-3 outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Shipping Type */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-sm md:text-base font-medium">{t("products.shippingType")}</label>
              <select
                value={shippingMethod}
                onChange={(e) => setshippingMethod(e.target.value)}
                className="w-full h-10 md:h-[44px] bg-[#F7F7F7] rounded-md px-2 md:px-3 outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="">{t("products.selectShippingMethod")}</option>
                <option>{t("products.inPockets")}</option>
                <option>{t("products.notInPockets")}</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-12 md:h-[44px] bg-primary text-white rounded-md mt-4 md:mt-6 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
              onClick={orderHandler}
              disabled={!username || !qunatity || !address || !phone || !shippingMethod}
            >
              {t("products.placeOrder")}
            </button>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;