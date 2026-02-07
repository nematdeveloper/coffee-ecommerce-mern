import React from 'react'
import Nav from '../components/Nav/NavMain'
import Hero from '../Home/HeroContainer'
import WelcomePopup from '../components/Features/WelcomePopup'
import Video from '../Home/Video'
import Features from '../Home/Features'
import Why from "../Why/Index"
import BestProductsContainer from '../Products/BestProducts/BestProductsContainer'
import Certificates from '../Home/CertificatesContainer'
import HeroCarousel from '../About/imageSlider/HeroCarousel'
import Steps from '../Home/Steps'
import Info from '../Home/Facility/InfoContainer'
import Card from '../Testiminal/ContainerCard'
import FormAbout from '../contact/FormAbout'
import Chat from "../Home/Social"
import Footer from '../components/Footer/MainFooter'

const Home = () => {
  return (
    <div className=' flex flex-col'>
      {/* Optional: Add Nav if it's not in layout */}
      {/* <Nav /> */}
      
      <main className=' gap-20'>
        {/* 1. Hero - First impression */}
        <Hero/>
        
        {/* 2. Welcome - Immediately engage visitor */}
        <WelcomePopup/>
        
        {/* 3. Video/Intro - Show what you do */}
        <Video/>
        
        {/* 4. Features/Value proposition - What you offer */}
     
        
        {/* 5. Why choose us - Build trust early */}
      
        
        {/* 6. Products/Services - Main offerings */}
        <BestProductsContainer/>
        
        {/* 7. Social proof - Showcase quality */}
        <Certificates/>
        
        {/* 8. Process/How it works - Explain simply */}
        <Steps/>
        
        {/* 9. Gallery/Showcase - Visual proof */}
        <HeroCarousel/>
        
        {/* 10. Company info/Facilities - Build credibility */}
        <Info/>
        
        {/* 11. Testimonials - Social validation */}
      
        <Card/>
        
        {/* 12. CTA/Contact - Conversion point */}
        <FormAbout/>
        
        {/* 13. Chat - Available for questions (sticky/fixed might be better) */}
        <Chat/>
      </main>
      
      <Footer/>
    </div>
  )
}

export default Home