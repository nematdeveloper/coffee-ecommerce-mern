import React from 'react'
import Nav from '../components/Nav/NavMain'
import { useTranslation } from 'react-i18next'
const ProductHeader = () => {
  const{t} = useTranslation("products")
  return (
    <div className='bg-primary py-8 md:py-12 relative'>
      <Nav/>
      <div className="container mx-auto px-4">
        <div className="text-center py-6 md:py-8">
          <h1 className="text-2xl md:text-4xl font-bold inline-block px-6 md:px-48 py-3 md:py-4 text-white bg-white/10 backdrop-blur-sm rounded-lg w-full md:w-auto">
         {t("products.shoppingCart")}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default ProductHeader