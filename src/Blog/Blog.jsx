import React from "react";
import BlogHeader from "./BlogDetailsHeader";
import SearchBlog from "./SearchBlog";
import BlogCard from "./BlogCard";
import Footer from "../components/Footer/MainFooter";
import { useState } from "react";
const Blog = () => {
     const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col">
      <BlogHeader />
      <SearchBlog  query={query} setQuery={setQuery}  />
      <div className="mb-30"> 
      <BlogCard query={query}/>
    </div>
        <Footer/>

      {/* other blog content here */}
    </div>
  );
};

export default Blog;
