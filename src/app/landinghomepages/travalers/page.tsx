import Footer from '@/components/Footer'
import LandingHeader from '@/components/LandingHeader'
import TravelersSection from '@/components/Travelers'
import React from 'react'

const TravalersPage = () => {
  return (
    <div>
      <LandingHeader/>
      <div className='pt-10'>
         <TravelersSection/>
      </div>
        <Footer/>
    </div>
  )
}

export default TravalersPage