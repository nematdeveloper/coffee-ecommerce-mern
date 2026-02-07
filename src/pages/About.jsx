import React from 'react'
import Header from '../About/Header'
import HeroCarousel from '../About/imageSlider/HeroCarousel'
import Overview from '../About/Overview'
import Steretagy from '../About/Steretagy' // Assuming this is "Strategy" - typo?
import Feature from '../About/Feature'
import FoodSafetly from '../About/FoodSafetly' // Assuming this is "Food Safety"
import Team from '../About/Team'
import StepsShip from "../Home/Steps" // Assuming shipping/process steps
import Steps from '../Home/Facility/InfoContainer' // Assuming facility info
import FormAbout from '../contact/FormAbout'
import Why from "../Why/Index"
import Footer from '../components/Footer/MainFooter'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Header/Hero - Visual introduction */}
      <Header/>
      
      <main className="flex-grow">
        {/* 2. Visual Showcase - Company in action */}
        <HeroCarousel/>
        
        {/* 3. Company Story - Who we are */}
        <Overview/>
        
        {/* 4. Mission/Vision - Why we exist */}
        <Steretagy/> {/* Strategy/Mission */}
        <Why/>
        {/* 5. Key Features - What makes us special */}
        <Feature/>
        
        {/* 6. Standards & Quality - How we ensure excellence */}
        <FoodSafetly/> {/* Food Safety Standards */}
        
        {/* 7. Facilities - Where the magic happens */}
        <Steps/> {/* Facility Info */}
        
        {/* 8. Process - How we work */}
        <StepsShip/> {/* Shipping/Process Steps */}
        
        {/* 9. Team - The people behind it all */}
        <Team/>
        
        {/* 10. CTA - Get in touch */}
        <FormAbout/>
      </main>
      
      <Footer/>
    </div>
  )
}

export default About