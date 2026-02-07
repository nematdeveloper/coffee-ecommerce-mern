import React from 'react'
import Nav from '../components/Nav/NavMain'
import Footer from '../components/Footer/MainFooter'
import SearchBar from '../Products/SearchBar'
import ProductCard from '../Products/ProductCard'
import ProductHeader from '../Products/ProductHeaderMain'
import { useState } from 'react'
const Product = () => {
   const [query, setQuery] = useState("");
  return (
    <div className='flex justify-between flex-col h-[100vh]'>
       <ProductHeader/>
        <SearchBar query={query} setQuery={setQuery} />
      <div className='mb-[153px]'>
        <ProductCard query={query}/>
         
      </div>
      <Footer/>
    </div>

  )
}

export default Product