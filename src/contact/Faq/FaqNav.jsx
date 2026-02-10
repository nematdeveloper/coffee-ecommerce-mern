import React from 'react'
import Nav from '../../components/Nav/NavMain'
import { useTranslation } from 'react-i18next'
const FaqHeade = () => {
  const{t}= useTranslation("faq")
  return (
    <div className='bg-primary py-8 md:py-12 relative'>
      <Nav/>
      <div className="container mx-auto px-4">
        <div className="text-center py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 py-3 md:py-4 text-white bg-white/10 backdrop-blur-sm rounded-lg">
          {t("header.title")}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default FaqHeade