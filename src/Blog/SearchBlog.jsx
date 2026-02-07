import React from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

const SearchBlog = ({query,setQuery}) => {
  const { t } = useTranslation("blog");

  return (
    <div className="flex justify-center items-center gap-[30px] flex-col mt-6">
      <div className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl mb-4 bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 rounded-xl md:rounded-2xl">
  search Blogs
</div>
      <div className="relative lg:w-[732px]">
       
        {/* Search Icon */}
        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" aria-label={t("search.searchIcon")} />

        {/* Input */}
        <input
          type="text"
          placeholder={t("search.placeholder")}
          className="w-full h-[44px] bg-[#F3F3F3] rounded-[8px] pl-10 pr-4 outline-none text-gray-700"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          aria-label={t("search.inputLabel")}
        />
     
      </div>
       
    </div>
  );
};

export default SearchBlog;