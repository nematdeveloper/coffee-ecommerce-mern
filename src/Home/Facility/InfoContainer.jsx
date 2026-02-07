import React from 'react'
import Info from './Info'

const InfoContainer = () => {
  return (
    <div className='bg-gray-200 w-[90%] m-auto rounded-3xl  mt-10  py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12'>
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center px-4 sm:px-0">
        Facility Center
      </h3>
      <div className="w-full max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
        <Info/>
      </div>
    </div>
  )
}

export default InfoContainer