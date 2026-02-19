import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import firsts from "../../assets/about/5.JPG"
import first from "../../assets/about/4.jpg"
import second from "../../assets/about/6.jpg"
import forth from "../../assets/about/7.jpg"
import fifth from "../../assets/about/8.jpg"
import sixth from "../../assets/about/9.jpg"
import seventh from "../../assets/about/10.jpg"
import eighth from "../../assets/about/11.jpg"
const Data = [
  {
    image: firsts,
    titleKey: "info.saffron.premiumGrade.title",
    informationKey: "info.saffron.premiumGrade.information",
  },
  {
    image: first,
    titleKey: "info.saffron.handPicked.title",
    informationKey: "info.saffron.handPicked.information",
  },
  {
    image: second,
    titleKey: "info.saffron.organicCertified.title",
    informationKey: "info.saffron.organicCertified.information",
  },
  {
    image: forth,
    titleKey: "info.saffron.freshHarvest.title",
    informationKey: "info.saffron.freshHarvest.information",
  },
  {
    image: fifth,
    titleKey: "info.saffron.traditionalCultivation.title",
    informationKey: "info.saffron.traditionalCultivation.information",
  },
  {
    image:sixth,
    titleKey: "info.saffron.qualityTested.title",
    informationKey: "info.saffron.qualityTested.information",
  },
  {
    image: seventh,
    titleKey: "info.saffron.sustainableSource.title",
    informationKey: "info.saffron.sustainableSource.information",
  },
  {
    image: eighth,
    titleKey: "info.saffron.versatileUse.title",
    informationKey: "info.saffron.versatileUse.information",
  },
]
const Info = () => {
  const { t } = useTranslation("home")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [resetTimer, setResetTimer] = useState(0)
  const [fade, setFade] = useState(true)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => prev === Data.length - 1 ? 0 : prev + 1)
        setFade(true)
      }, 300)
    }, 10000)

    return () => clearInterval(interval)
  }, [resetTimer])

  const handleDotClick = (index) => {
    setFade(false)
    
    setTimeout(() => {
      setCurrentIndex(index)
      setFade(true)
      setResetTimer((prev) => prev + 1)
    }, 300)
  }

  const currentItem = Data[currentIndex]

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-0">
      {/* Main Container with 60/30/10 split */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        
        {/* Image Box - 60% width */}
        <div className="lg:w-[60%]">
          <div className="relative overflow-hidden rounded-xl lg:rounded-2xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] xl:h-[500px]">
            <img 
              ref={imageRef}
              src={currentItem.image} 
              alt={t(currentItem.titleKey)} 
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out transform ${
                fade 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            />
          </div>
        </div>

        {/* Text Box - 30% width with 10% gap */}
        <div className="lg:w-[30%] flex flex-col">
          <div className="p-4 sm:p-6 md:p-8 flex flex-col bg-gray-50 rounded-xl lg:rounded-2xl h-full">
            <div className="flex-grow">
              <h2 
                ref={textRef} 
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 transition-all duration-500 ease-in-out ${
                  fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {t(currentItem.titleKey)}
              </h2>
              <div 
                className={`text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-500 ease-in-out ${
                  fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  maxHeight: 'calc(100vh - 350px)'
                }}
              >
                {t(currentItem.informationKey)}
              </div>
            </div>
          </div>
        </div>

        {/* The remaining 10% is just empty space between the boxes */}
      </div>

      {/* Navigation Bullets */}
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10">
        {Data.map((item, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="flex flex-col items-center group min-w-[60px] sm:min-w-[70px]"
            aria-label={t('info.aria.goToItem', { item: t(item.titleKey) })}
          >
            {/* Dot */}
            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 transform ${
              index === currentIndex 
                ? 'bg-primary border-black' 
                : 'bg-white border-gray-300 group-hover:border-primary group-hover:scale-110'
            }`}></div>
            
            {/* Title indicator */}
            <div className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium transition-all duration-300 truncate max-w-[60px] sm:max-w-[80px] md:max-w-none ${
              index === currentIndex 
                ? 'text-black' 
                : 'text-black opacity-70 group-hover:opacity-100'
            }`}>
              {t(item.titleKey)}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Info