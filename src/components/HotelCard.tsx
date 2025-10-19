"use client";

import Image from "next/image";
import { Hotels } from "@/lib/utils";
import { useRouter } from "next/navigation";
import HotelFilters from "./FilterBox";
import AmenitiesSection from "./AmenitiesSection";

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

    <div className="grid grid-cols-12">
      <div className=" hidden lg:flex col-span-2 sticky top-15 h-[calc(100vh-6rem)] overflow-y-auto">
        <HotelFilters />
      </div>
      <div className="lg:col-span-10 col-span-12 overflow-y-auto">
        <div className="grid  lg:px-10 px-2 pt-15 pb-5 overflow-y-scroll ">
          {hotels.map((hotel) => (
            <div
              key={hotel.hotelId}
              className="group relative md:flex grid  overflow-hidden py-10 border-b border-gray-400 "
            >
              {/* Hotel Image with Overlay */}
              <div className="relative h-55 sm:w-[700px]  overflow-hidden">

                <Image
                  src={hotel.imageList[0].url}
                  alt={hotel.name}
                  fill
                  className="object-cover "
                  sizes="1"
                />

                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500" /> */}
              </div>

              {/* Content */}
              <div className="md:px-5 w-full grid">
                <div>
                      <h2 className="text-[25px] font-semibold text-black line-clamp-1 font-sans">
                  {hotel.name}
                </h2>
                <p className="text-black text-md line-clamp-2 leading-relaxed">
                  {hotel.description} , {hotel.location}
                </p>
                 <span className="text-sm  text-black">
                     
                    </span>
                   
                </div>
                  
                  <div>
                    <div className="flex gap-2 items-center mt-2">
                        <span className="bg-green-500 px-2 py-1 text-[12px] text-white rounded-[2px] font-bold">4.4 rating </span>
                    <span className="text-[12px] text-gray-700">Excellent</span>
                    </div>
                    <div>
                      <AmenitiesSection/>
                    </div>
                    
                  </div>

                <div className="md:flex grid items-center md:justify-between pt-2">
                 <div className="flex gap-1 text-[15px] items-center ">
                  <span>Starting from</span>
              {hotel.room.map((item,index)=>{
                      return(
                        <div key={index} className="font-bold text-black text-[20px]">
                        {item.roomTypes=="NORMAL"?` ₹${item.pricePerNight}`:""}
                        </div>
                      )
                    })}
                    <span className="bg-orange-400 text-[10px] text-white px-1 py-1 rounded-[50px]">10% off</span>
                 </div>
                 <div className=" bg-amber-600 flex mt-3 ">
                       <button
                    className="px-4 py-2 text-sm w-full  text-white bg-[#75756a] hover:bg-[#474745] cursor-pointer"
                    onClick={() => gotoDetailsPage(hotel.hotelId!)}
                  >
                    View Details
                  </button>
                 </div>
                 
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;