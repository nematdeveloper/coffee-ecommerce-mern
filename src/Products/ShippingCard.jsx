import React, { useState } from 'react';
import CheckOut from './CheckOut';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const ShippingCard = () => {
  const { t } = useTranslation('products');
  const { cart, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="mt-24 md:mt-[170px] text-center text-gray-500 text-lg md:text-xl">
        {t("products.emptyCart")}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={isModalOpen ? "blur-sm transition-all duration-300" : "transition-all duration-300"}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32  md:mt-[285px]">
          <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12">

            {/* LEFT SIDE - CART ITEMS */}
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center  md:mb-8 gap-4">
                <h4 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-center sm:text-left">
                  {t("products.shoppingCart")}
                </h4>
                <button 
                  onClick={clearCart} 
                  className="text-red-500 font-semibold hover:text-red-600 transition-colors text-sm md:text-base"
                >
                  {t("products.clearAll")}
                </button>
              </div>

              {/* Table Header */}
              <div className="bg-primary text-white flex items-center w-full h-12 md:h-[53px] px-4 md:px-6 rounded-t-lg">
                <p className="flex-1 text-sm md:text-base">{t("products.productDetails")}</p>
                <p className="text-sm md:text-base">{t("products.action")}</p>
              </div>

              {/* PRODUCT LIST */}
              <div className="w-full mt-4 space-y-4">
                {cart.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 md:px-6 py-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4 flex-1 w-full mb-4 sm:mb-0">
                      <img
                        className="w-20 h-20 md:w-[126px] md:h-[96px] bg-[#F7F7F7] object-cover rounded-lg md:rounded-[18px] flex-shrink-0"
                        src={item.productImage}
                        alt={item.productname}
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-base md:text-lg lg:text-[19px] truncate">
                          {item.productname}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 truncate">
                          {item.type}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-600 font-bold hover:text-red-700 transition-colors self-end sm:self-center text-lg md:text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - TOTAL SUMMARY */}
            <div className="w-full lg:w-1/3 max-w-[400px] mx-auto lg:mx-0">
              <div className="border rounded-[16px] p-4 md:p-6 h-auto">
                <h4 className="text-xl md:text-2xl text-center font-semibold mb-4 md:mb-6">
                  {t("products.orderSummary")}
                </h4>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-between text-base md:text-lg">
                    <p className="font-medium">{t("products.itemsInCart")}</p>
                    <p className="font-semibold">{cart.length}</p>
                  </div>

                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {t("products.quantityInfo")}
                  </p>

                  <div className="mt-6 md:mt-8">
                    <button
                      className="w-full h-12 md:h-[44px] rounded-[8px] text-white bg-primary hover:opacity-90 transition-all duration-200 font-medium text-sm md:text-base"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {t("products.proceedToCheckout")}
                    </button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <button
                      onClick={() => window.history.back()}
                      className="text-gray-600 hover:text-gray-800 text-sm md:text-base transition-colors"
                    >
                      {t("products.continueShopping")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {isModalOpen && <CheckOut setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default ShippingCard;