// ContactMap.jsx
import React from "react";

export default function ContactMap() {
  const shopName = "Rayan Saffron";
  const shopAddress = "Nawin Street, Golestan#12 Road, 3001, Afghanistan";
  
  // Your exact embed URL from Google Maps
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26359.420187154687!2d62.1941822!3d34.3268651!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f3ce7386231f989%3A0xac96fa105f4128ba!2sRayan%20Saffron!5e0!3m2!1sen!2s!4v1770785581741!5m2!1sen!2s";
  
  return (
    <div className="w-full">
      {/* Map container */}
      <div className="h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">
        <iframe
          title={`${shopName} - Herat, Afghanistan`}
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Location of ${shopName} in Herat, Afghanistan`}
        />
        
        {/* Floating location card */}
       
      </div>
      
    
    </div>
  );
}