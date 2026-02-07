import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CiClock2 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ query }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const getTimeAgo = (date) => {
    const diffMs = Date.now() - new Date(date);
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const blogHandeler = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://rayanbackend-1.onrender.com/api/blog?lang=${i18n.language}`
      );
      const result = await response.json();
      const blogs = Array.isArray(result.blogs) ? result.blogs : [];
      setData(blogs);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    blogHandeler();
  }, [i18n.language]);

  if (loading)
    return (
      <div className="flex flex-wrap justify-around gap-[63px] mt-[150px] px-[32px]" >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4"
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
            <div style={{ height: 14, width: "80%", borderRadius: 4, background: "#e0e0e0" }} />
            <div style={{ height: 12, width: "60%", borderRadius: 4, background: "#e0e0e0" }} />
          </div>
        ))}
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  const filteredProducts = data.filter((blog) =>
    blog.blogTitle.toLowerCase().startsWith(query.trim().toLowerCase())
  );

  return (
<div className="flex justify-center flex-wrap gap-[63px] items-start mt-20 px-[32px]">

      {filteredProducts.map(blog => (
        <div key={blog._id} className="w-[313px] gap-[18px] h-[426px] rounded-[32px] items-center justify-between flex flex-col border overflow-hidden p-5"
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          <div className='h-[203px] w-[283px] flex justify-center items-center'>
            <img src={blog.blogImage} alt="" className='rounded-[26px] w-[100%] h-[100%]' />
          </div>

          <div>
            <div className='flex items-center gap-[8px]'>
              <CiClock2 />
              {getTimeAgo(blog.createdAt)}
            </div>
            <div className='text-[19px]'>{blog.blogTitle}</div>
            <p className="line-clamp-3 text-[#ADADAD]">{blog.blogInfo}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogCard;
