// ContactMap.jsx
import React from "react";

export default function ContactMap() {
  // Include the shop name for better identification
  const shopAddress = "Rayan Saffron Shop, Office No. 8, Saffron Plaza Market, Ameriat Square, Kabul 3001, Afghanistan";
  
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    shopAddress
  )}&z=17&output=embed`;

  
  return (
    <div className="flex justify-center rounded-[17px] items-center" style={{ width: "100%", height: "600px" }}>
      <iframe
        title="Office Location"
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        
      />
    </div>
  );
}
