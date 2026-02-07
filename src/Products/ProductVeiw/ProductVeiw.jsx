import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { toast } from "react-toastify";

const ProductView = () => {
  const { addToCart } = useCart();
  const { t } = useTranslation('products'); // Using 'products' namespace
  const{ i18n} = useTranslation()
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const baseUrl = "https://rayanbackend-1.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products/${id}?lang=${i18n.language}`);
        const json = await res.json();

        if (json.success) {
          setData(json.product);
          setSelectedImage(json.product?.productImage || "");
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, i18n.language]);

  if (loading)
    return (
      <div className="flex flex-wrap justify-center gap-4 md:gap-[63px] mt-24 md:mt-[150px] px-4 md:px-[32px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 w-full max-w-[283px] rounded-[26px] bg-[#f7f7f7] p-4"
          >
            <div
              className="h-32 md:h-[203px] rounded-[26px] bg-gradient-to-r from-[#e0e0e0] via-[#f5f5f5] to-[#e0e0e0] bg-[length:400%_100%] animate-shimmer"
            />
            <div className="h-3.5 w-4/5 rounded bg-[#e0e0e0]" />
            <div className="h-3 w-3/5 rounded bg-[#e0e0e0]" />
          </div>
        ))}
      </div>
    );

  if (error) return <p>{t("errorLoading")}</p>; // translated
  if (!data) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 mt-8 md:mt-[10rem]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-12">
        {/* Images Section */}
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-square md:aspect-[645/380] rounded-[26px] bg-[#F7F7F7] flex justify-center items-center p-4">
            <img
              className="w-full h-full object-contain max-h-[500px]"
              src={selectedImage}
              alt={data.name}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
            {data.productDetailsImages.map((img) => (
              <div
                key={img._id}
                className="w-20 h-20 md:w-[150px] md:h-[116px] rounded-[18px] bg-[#F7F7F7] flex justify-center items-center cursor-pointer flex-shrink-0"
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 max-w-[545px] mx-auto lg:mx-0">
          <div className="inline-flex items-center justify-center gap-[10px] px-4 py-1.5 rounded-[32px] bg-[#8D398E4D]/30 text-sm md:text-base">
            {data.type}
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-[40px] mt-2 md:mt-4 font-semibold">
            {data.productname}
          </h1>

          <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm md:text-base">{t("products.min")}</p>
              <p className="text-sm md:text-base font-medium">
                {data.productamount} {t("gram")}
              </p>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between items-center">
              <p className="text-sm md:text-base">{t("products.stock")}</p>
              <p className="text-sm md:text-base font-medium">{data.stock}</p>
            </div>
          </div>

          {data.productDescription && (
            <div className="text-[#919191] mt-4 md:mt-6 text-sm md:text-base">
              {data.productDescription}
            </div>
          )}

          <div className="mt-6 md:mt-8">
            <button
              className="w-full max-w-[405px] h-[44px] rounded-[8px] bg-primary text-white text-sm md:text-base hover:opacity-90 transition-opacity"
              onClick={() => {
                addToCart({
                  productImage: data.productImage,
                  productname: data.productname,
                  type: data.type,
                });

                toast.success(
                  t("products.addedToCart", { name: data.productname }),
                  {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                  }
                );
              }}
            >
              {t("products.addcart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
