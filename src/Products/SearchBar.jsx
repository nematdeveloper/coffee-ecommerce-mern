import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useTranslation } from 'react-i18next';





const SearchBar = ({ query, setQuery, totalItems }) => {
 

 
  const { t } = useTranslation('products'); // using 'products' namespace

  return (
    <div className='flex flex-col md:flex-row w-[90%] m-auto justify-center items-start md:items-center gap-[20px] mt-[90px] md:mt-[80px] px-4 md:px-0'>
      <div className='flex flex-col w-full md:w-auto'>
        <p className='text-[24px] md:text-[28px]'>
          {t('products.title')} {/* All Products */}
        </p>
        <p className='text-text-second'> 
          {t('products.Count')} 
        </p>
      </div>
      <div className='bg-[#F7F7F7] w-full md:w-[1053px] h-[59px] flex items-center rounded-[12px] px-5'>
        <CiSearch className='text-gray-500 text-xl' />
        <input
          className='ml-4 flex-1 bg-transparent outline-none placeholder-gray-400'
          type="text"
          placeholder={t('products.searchPlaceholder')} // Search
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar;
