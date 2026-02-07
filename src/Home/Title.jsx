import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Title = () => {
  const { t } = useTranslation('home')
  const [isExpanded, setIsExpanded] = useState(false)

  const handlePhoneClick = () => {
    window.open('https://wa.me/+93728061919', '_blank')
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='relative'>
      {/* Desktop/Tablet View */}
      <div className='hidden md:flex justify-between px-4 md:px-10 items-center bg-[linear-gradient(to_bottom,#4E2C6E,#8B6FA0)] w-full h-10'>
        <div className='flex justify-between items-center gap-5 text-white'>
          <FaPhone 
            className='cursor-pointer' 
            onClick={handlePhoneClick}
            aria-label={t('topBar.phoneIcon')}
          />
          <h3 className='cursor-pointer' onClick={handlePhoneClick}>
            {t('topBar.phoneNumber')}
          </h3>
        </div>
        
        <div className='flex text-white text-sm md:text-base'>
          <h3>{t('topBar.shippingInfo')}</h3>
        </div>
        
        <div className='flex gap-4 md:gap-5 text-white'>
          <FaFacebook 
            className='cursor-pointer hover:text-blue-400 transition-colors'
            aria-label={t('topBar.social.facebook')}
          />
          <FaInstagram 
            className='cursor-pointer hover:text-pink-500 transition-colors'
            aria-label={t('topBar.social.instagram')}
          />
          <FaLinkedin 
            className='cursor-pointer hover:text-blue-600 transition-colors'
            aria-label={t('topBar.social.linkedin')}
          />
          <FaTwitter 
            className='cursor-pointer hover:text-sky-400 transition-colors'
            aria-label={t('topBar.social.twitter')}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className='md:hidden flex justify-between items-center px-4 bg-[linear-gradient(to_bottom,#4E2C6E,#8B6FA0)] w-full h-10'>
        {/* Phone number section - always visible on mobile */}
        <div 
          className='flex items-center gap-3 text-white cursor-pointer'
          onClick={toggleExpand}
          aria-label={t('topBar.mobile.expandLabel')}
        >
          <FaPhone />
          <h3>{t('topBar.phoneNumber')}</h3>
          <span className='text-xs'>{isExpanded ? t('topBar.mobile.collapseIcon') : t('topBar.mobile.expandIcon')}</span>
        </div>

        {/* Expanded section with social icons and shipping info */}
        {isExpanded && (
          <div className='absolute top-10 left-0 right-0 bg-[linear-gradient(to_bottom,#4E2C6E,#8B6FA0)] z-50 p-4 shadow-lg'>
            <div className='flex flex-col gap-4'>
              {/* Shipping info */}
              <div className='text-white text-center text-sm'>
                <h3>{t('topBar.shippingInfo')}</h3>
              </div>
              
              {/* Social icons */}
              <div className='flex justify-center gap-6 text-white text-xl'>
                <FaFacebook 
                  className='cursor-pointer hover:text-blue-400 transition-colors'
                  aria-label={t('topBar.social.facebook')}
                />
                <FaInstagram 
                  className='cursor-pointer hover:text-pink-500 transition-colors'
                  aria-label={t('topBar.social.instagram')}
                />
                <FaLinkedin 
                  className='cursor-pointer hover:text-blue-600 transition-colors'
                  aria-label={t('topBar.social.linkedin')}
                />
                <FaTwitter 
                  className='cursor-pointer hover:text-sky-400 transition-colors'
                  aria-label={t('topBar.social.twitter')}
                />
              </div>
              
              {/* WhatsApp button */}
              <button
                onClick={handlePhoneClick}
                className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors'
                aria-label={t('topBar.whatsapp.button')}
              >
                <FaPhone />
                {t('topBar.whatsapp.label')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Title