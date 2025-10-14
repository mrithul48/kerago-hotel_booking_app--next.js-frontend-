


"use client";

import Image from "next/image";
import { Hotels } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface HotelCardProps {
  hotelData: Hotels[];
}

const HotelCard: React.FC<HotelCardProps> = ({ hotelData }: HotelCardProps) => {
  const router = useRouter();
  const gotoDetailsPage = (id: number) => {
    router.push(`/client/hotel/hoteldetail/${id}`);
  };
  const hotels = Array.isArray(hotelData) ? hotelData : [hotelData];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pt-25 pb-5 ">
      {hotels.map((hotel) => (
        <div
          key={hotel.hotelId}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          {/* Hotel Image with Overlay */}
          <div className="relative h-56 w-full overflow-hidden">
            
              <Image
                src={hotel.imageList[0].url}
                alt={hotel.name}
                fill
                className="object-cover  "
              />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#146785] transition-colors duration-300">
              {hotel.name}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {hotel.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#146785]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  {hotel.location}
                </span>
              </div>
              <button
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#146785] to-[#1a7a9e] text-white rounded-xl hover:from-[#1a7a9e] hover:to-[#146785] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                onClick={() => gotoDetailsPage(hotel.hotelId!)}
              >
                View Details
              </button>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <svg
              className="w-5 h-5 text-[#146785]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelCard;