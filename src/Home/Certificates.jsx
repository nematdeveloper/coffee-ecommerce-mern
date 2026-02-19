import React from "react"
import First from "../assets/about/2.webp"
import Second from "../assets/about/3.webp"
import Third from "../assets/about/2.webp"
import Forth from "../assets/about/3.webp"
import "./css/Cert.css"

const images = [First, Second, Third, Forth]

const Certificates = () => {
  return (
    <div className="scene ">
      <div className="carousel">
        {images.map((img, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{ "--i": index }}
          >
            <img src={img} alt="certificate" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certificates
