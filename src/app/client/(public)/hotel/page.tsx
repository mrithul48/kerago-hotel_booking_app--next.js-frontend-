"use client";

import HotelCard from "@/components/HotelCard";
import { Hotels } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchHotels } from "@/store/slice/hotelSlice";
import React, { useEffect } from "react";

const Hotel:React.FC = () => {

const hotels:Hotels[] = useAppSelector((state) => state.hotel.hotel);
const dispatch = useAppDispatch();
useEffect(() => {
    dispatch(fetchHotels({ type: "all" }));
  }, [dispatch]);

  return (

    <div>
      
    
      <HotelCard hotelData={hotels}/>
      
    </div>

  )
};
export default Hotel;
