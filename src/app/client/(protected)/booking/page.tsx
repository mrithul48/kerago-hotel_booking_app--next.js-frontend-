"use client"

import BookingDetails from '@/components/BookingComponent'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const Booking = () => {

   const searchParams = useSearchParams();
    const hotelId = Number(searchParams.get("hotelId"));
    const roomTypes = searchParams.get("type") as string;

  return (
    <div>
      <BookingDetails hotelId={hotelId} type={roomTypes}/>
    </div>
  )
}

export default Booking

