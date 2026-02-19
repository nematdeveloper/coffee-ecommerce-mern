import React from "react";

export default function ContactMap() {
  const shopName = "breave coffe";
  
  
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71046364557257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316f5c3ce3%3A0x2a83ef6d2d4b9e0c!2sStumptown%20Coffee%20Roasters!5e0!3m2!1sen!2sus!4v1647891234567!5m2!1sen!2sus";
  
  return (
    <div className="w-full">
      <div className="h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">
        <iframe
          src={mapUrl}
          title={`${shopName} - usa, new york`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Location of ${shopName}`}
        />
      </div>
    </div>
  );
}