import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation("blog");
  const navigate = useNavigate();
  const baseUrl = "https://rayanbackend-1.onrender.com";

  const handleNextImage = () => {
    if (blog?.blogImages?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === blog.blogImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (blog?.blogImages?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? blog.blogImages.length - 1 : prev - 1
      );
    }
  };

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [blog]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${baseUrl}/api/blog/${id}?lang=${i18n.language}`
      );

      if (!res.ok) throw new Error(t("errors.fetchFailed"));

      const data = await res.json();
      setBlog(data.blog || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlogDetails();
  }, [id, i18n.language]);

  if (loading)
    return (
      <div className="flex flex-wrap justify-around gap-[63px] mt-[150px] px-[32px]" >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4"
            style={{
              width: 283,
              borderRadius: 26,
              background: "#f7f7f7",
              padding: 16
            }}
          >
            <div
              style={{
                height: 203,
                borderRadius: 26,
                background:
                  "linear-gradient(90deg,#e0e0e0 25%,#f5f5f5 37%,#e0e0e0 63%)",
                backgroundSize: "400% 100%",
                animation: "shimmer 1.4s infinite"
              }}
            />
            <div
              style={{
                height: 14,
                width: "80%",
                borderRadius: 4,
                background: "#e0e0e0"
              }}
            />
            <div
              style={{
                height: 12,
                width: "60%",
                borderRadius: 4,
                background: "#e0e0e0"
              }}
            />
          </div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="py-24 text-center">
        <p className="text-red-500 mb-4 font-medium">{error}</p>
        <button
          onClick={fetchBlogDetails}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
        >
          {t("buttons.retry")}
        </button>
      </div>
    );

  if (!blog)
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 mb-4 font-medium">
          {t("errors.blogNotFound")}
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="text-primary font-medium text-sm py-2 px-4"
        >
          ← {t("buttons.backToBlogs")}
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/blog")}
        className="flex items-center gap-2 text-gray-600 mb-8 text-sm font-medium"
        aria-label={t("buttons.backToBlogsAria")}
      >
        <ArrowLeft size={18} />
        {t("buttons.backToBlogs")}
      </button>

      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {blog.blogTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
          {blog.author && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{blog.author}</span>
            </div>
          )}

          {blog.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(blog.createdAt).toLocaleDateString(
                  i18n.language
                )}
              </span>
            </div>
          )}

          {blog.readTime && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{blog.readTime} {t("content.minRead")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Blog Image (same as BlogCard) */}
      {blog.blogImages && blog.blogImages.length > 0 && (
        <div className="mb-8 relative">
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl">
            <img
              src={blog.blogImages?.[currentImageIndex]?.url}
              alt={t("images.altText", { 
                title: blog.blogTitle, 
                index: currentImageIndex + 1 
              })}
              className="object-cover w-full h-full"
            />

            {blog.blogImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
                  aria-label={t("buttons.previousImage")}
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg rotate-180"
                  aria-label={t("buttons.nextImage")}
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {blog.blogImages.map((_, index) => (
                    <button
                      key={index + blog._id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={t("buttons.goToImage", { number: index + 1 })}
                      aria-current={index === currentImageIndex ? "true" : "false"}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="text-center text-gray-500 text-sm mt-2">
            {t("images.counter", { 
              current: currentImageIndex + 1, 
              total: blog.blogImages.length 
            })}
          </div>
        </div>
      )}

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} />
            <span className="text-sm font-medium">
              {t("content.tags")}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Blog Content (same field as BlogCard) */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.blogInfo}
        </div>
      </div>

      {/* Back to Top */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="text-primary font-medium text-sm py-2 px-4"
          aria-label={t("buttons.backToTop")}
        >
          ↑ {t("buttons.backToTop")}
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;