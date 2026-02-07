import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'

const ContainerCard = () => {
  const { t } = useTranslation('home')

  return (
    <div className='flex flex-col mt-20'>
      <h3 className='flex justify-center items-center text-4xl font-bold'>
        {t('testimonials.client.title')}
      </h3>
   
        <Card/>
  
    </div>
  )
}

export default ContainerCard