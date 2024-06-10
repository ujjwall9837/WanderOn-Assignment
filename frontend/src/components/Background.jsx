import React from 'react'

import mountains from '/mountains.png';
import stars from '/stars.jpg';
import logo from "/logo.png"

function Background() {
  return (
    <div className="relative w-full h-[100vh] text-white overflow-hidden ">
      <div className="absolute z-20 top-2 md:top-1 left-4 md:left-12">
        <img className='w-20 md:w-32' src={logo} alt="" />
      </div>
      
      <div
        className="absolute inset-0 bg-cover bg-top z-20  animate-moutains"
        style={{ backgroundImage: `url(${mountains})` }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-bottom z-0 top-90% animate-moutains"
        style={{ backgroundImage: `url(${stars})` }}
      ></div>
      <div
        className="absolute w-[100vw] h-[100vh] bg-purple-900 bg-opacity-10 z-10"
      ></div>
      <main className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      animate-wiggle2 md:animate-wiggle3 xl:animate-wiggle font-Poppins font-medium">
       Explore
      </main>
      
    </div>
  )
}

export default Background