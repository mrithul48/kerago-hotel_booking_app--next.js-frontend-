"use client";

import HotelDetails from "@/components/HotelDetails";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchHotels } from "@/store/slice/hotelSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Detailspage = () => {
  const param = useParams();
  const { id } = param;
  const hotelId = Number(id);
  const hotelDetails = useAppSelector((state) => state.hotel.hotel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotels({ type: "id", value: hotelId }));
  }, [dispatch, hotelId]);
  const hotels = Array.isArray(hotelDetails) ? hotelDetails : [hotelDetails];

  return (
    <div>
        <HotelDetails hotelDetails={hotels}/>
    </div>
  );
};

export default Detailspage;
