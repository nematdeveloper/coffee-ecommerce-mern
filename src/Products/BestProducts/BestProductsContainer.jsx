import React from 'react'
import BestProducts from './BestProducts'

const BestProductsContainer = () => {
  return (
    <div className='bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300'>
      <div className='flex justify-center items-center px-4 md:px-0'>
        {/* Container that expands with content - no fixed height */}
        <div className='rounded-3xl md:rounded-4xl  md:max-w-none py-8  md:py-10 px-4 md:px-6'>
          
          <h2 className='flex text-black justify-center  items-center gap-2 md:gap-4 text-[28px] md:text-[36px] lg:text-[48px] font-semibold text-center mb-8 md:mb-12'>
            Best Products
          </h2>

          {/* Content area - BestProducts will determine the height */}
          <div className='flex  justify-around '>
            <BestProducts />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestProductsContainer