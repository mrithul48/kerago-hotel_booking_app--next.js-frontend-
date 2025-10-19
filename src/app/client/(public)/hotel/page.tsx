"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchHotels } from "@/store/slice/hotelSlice";
import HotelCard from "@/components/HotelCard";
import Loading from "@/components/Loading";
import { Hotels } from "@/lib/utils";

const Hotel: React.FC = () => {
  const dispatch = useAppDispatch();

  // ✅ Typed access to hotel state
  const { hotel: hotels, loading, error } = useAppSelector((state) => state.hotel);

  useEffect(() => {
    dispatch(fetchHotels({ type: "all" }));
  }, [dispatch]);

  if (error) {
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="min-h-80 relative">
      <Loading loading={loading} />
      <HotelCard hotelData={hotels as Hotels[]} />
    </div>
  );
};

export default Hotel;
