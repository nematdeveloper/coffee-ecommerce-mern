// ContactMap.jsx
import React from "react";

export default function ContactMap() {
  const shopName = "breave coffe";
  
  
  // Your exact embed URL from Google Maps

  
  return (
    <div className="w-full">
      {/* Map container */}
      <div className="h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">
        <iframe
          title={`${shopName} - usa,new york`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Location of ${shopName}`}
        />
        
        {/* Floating location card */}
       
      </div>
      
    
    </div>
  );
}