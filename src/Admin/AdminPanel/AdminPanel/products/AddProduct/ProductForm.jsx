import React, { useState } from "react";
import Swal from "sweetalert2";

const initialFormData = {
  productname: { en: "", fa: "", ar: "" },
  productamount: 1,
  discountPrice: 0,
  productPrice: 0,
  stock: 0,
  productDescription: { en: "", fa: "", ar: "" },
  type: { en: "", fa: "", ar: "" },
};
const baseUrl = "https://rayanbackend-1.onrender.com"
const ProductForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [productImage, setProductImage] = useState(null);
  const [productDetailsImages, setProductDetailsImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, lang, field) => {
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: e.target.value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!productImage) return Swal.fire("Please upload a main image");

    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("data", JSON.stringify(formData));
      form.append("productImage", productImage);
      productDetailsImages.forEach((file) =>
        form.append("productDetailsImages", file)
      );

      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to add");

      Swal.fire("Success", "Product added successfully", "success");
      onSuccess && onSuccess(data.product);

      // Reset form
      setFormData(initialFormData);
      setProductImage(null);
      setProductDetailsImages([]);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>

      {/* Multilingual Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["en", "fa", "ar"].map((lang) => (
          <div key={lang} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Name ({lang.toUpperCase()})
            </label>
            <input
              type="text"
              value={formData.productname[lang]}
              onChange={(e) => handleChange(e, lang, "productname")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required={lang === "en" || lang === "fa"}
            />
          </div>
        ))}
      </div>

      {/* Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["en", "fa", "ar"].map((lang) => (
          <div key={lang} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Type ({lang.toUpperCase()})
            </label>
            <input
              type="text"
              value={formData.type[lang]}
              onChange={(e) => handleChange(e, lang, "type")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["en", "fa", "ar"].map((lang) => (
          <div key={lang} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description ({lang.toUpperCase()})
            </label>
            <textarea
              value={formData.productDescription[lang]}
              onChange={(e) => handleChange(e, lang, "productDescription")}
              rows={3}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        ))}
      </div>

      {/* Pricing & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["productamount", "productPrice", "discountPrice", "stock"].map(
          (field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="number"
                value={formData[field]}
                onChange={(e) => handleChange(e, null, field)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                min={0}
                step={field === "productamount" ? 1 : 0.01}
              />
            </div>
          )
        )}
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Main Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Detail Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setProductDetailsImages([...e.target.files])
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
          isSubmitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {isSubmitting ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
