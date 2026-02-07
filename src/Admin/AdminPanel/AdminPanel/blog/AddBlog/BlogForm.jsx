import React, { useState } from "react";
import Swal from "sweetalert2";

const initialFormData = {
  blogTitle: { en: "", fa: "", ar: "" },
  blogInfo: { en: "", fa: "", ar: "" },
  blogImageAlt: { en: "", fa: "", ar: "" },
};

const baseUrl = "https://rayanbackend-1.onrender.com"
const BlogForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
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
    
    // Validation
    if (!mainImage) {
      Swal.fire("Warning", "Please upload a main image", "warning");
      return;
    }
    
    if (!formData.blogTitle.en || !formData.blogTitle.fa) {
      Swal.fire("Warning", "English and Farsi titles are required", "warning");
      return;
    }
    
    if (!formData.blogInfo.en || !formData.blogInfo.fa) {
      Swal.fire("Warning", "English and Farsi content are required", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      const form = new FormData();
      
      // Append JSON data
      form.append("data", JSON.stringify(formData));
      
      // Append main image
      form.append("blogImage", mainImage);
      
      // Append additional images
      additionalImages.forEach((file, index) => {
        form.append("blogImages", file);
      });

      const res = await fetch(`${baseUrl}/api/blog`, {
        method: "POST",
        body: form,
        // Don't set Content-Type header - let browser set it with boundary
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }
      
      if (!data.success) {
        throw new Error(data.message || "Failed to add blog");
      }

      Swal.fire({
        title: "Success!",
        text: "Blog added successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      // Reset form
      setFormData(initialFormData);
      setMainImage(null);
      setAdditionalImages([]);
      
      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(data.blog);
      }
      
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to add blog",
        icon: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Blog</h2>

      {/* Multilingual Blog Title */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["en", "fa", "ar"].map((lang) => (
          <div key={lang} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Title ({lang.toUpperCase()}) 
              {(lang === "en" || lang === "fa") && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.blogTitle[lang]}
              onChange={(e) => handleChange(e, lang, "blogTitle")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required={lang === "en" || lang === "fa"}
            />
          </div>
        ))}
      </div>

      {/* Multilingual Blog Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["en", "fa", "ar"].map((lang) => (
          <div key={lang} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Content ({lang.toUpperCase()}) 
              {(lang === "en" || lang === "fa") && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={formData.blogInfo[lang]}
              onChange={(e) => handleChange(e, lang, "blogInfo")}
              rows={4}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
              required={lang === "en" || lang === "fa"}
            />
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Main Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {mainImage && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {mainImage.name}
            </p>
          )}
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Additional Images (Max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (files.length > 5) {
                Swal.fire("Warning", "Maximum 5 additional images allowed", "warning");
                setAdditionalImages(files.slice(0, 5));
              } else {
                setAdditionalImages(files);
              }
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {additionalImages.length > 0 && (
            <p className="text-sm text-green-600 mt-1">
              {additionalImages.length} image(s) selected
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
          isSubmitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {isSubmitting ? "Uploading..." : "Add Blog"}
      </button>
    </form>
  );
};

export default BlogForm;