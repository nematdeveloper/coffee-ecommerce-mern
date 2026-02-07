import React from "react"
import First from "../assets/Certs/1.jpg"
import Second from "../assets/Certs/2.jpg"
import Third from "../assets/Certs/3.jpg"
import Forth from "../assets/Certs/4.jpg"
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
