import React from 'react'
import Hero from './Hero'
import Nav from '../components/Nav/NavMain'

const HeroContainer = () => {
  return (
    <div className="relative ">
      <Hero />
      <div className="absolute -top-5 left-0 w-full z-10">
        <Nav />
        {/* Transparent spacer below nav */}
        <div className="h-16  md:h-24 w-full bg-transparent" />
      </div>
    </div>
  )
}

export default HeroContainer