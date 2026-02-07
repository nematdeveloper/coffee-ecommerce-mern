import React from "react";
import ContactHeader from "./ContactHeader";
import Footer from "../components/Footer/MainFooter";
import ContactUsSimple from "./ContactMap";
import Form from "./Form";
import FormAbout from "./FormAbout";
import HeroCarousel from "../About/imageSlider/HeroCarousel";
const Contacts = () => {
  return (
   
    <div className="flex flex-col  ">
     
      <ContactHeader />
    <HeroCarousel/>
    
    <div className="flex flex-col   justify-between">
     
       <Form/>
         <ContactUsSimple/>
     <FormAbout/>
     
    </div>
    
         <Footer/>
      

      {/* other blog content here */}
    </div>
  );
};

export default Contacts;
