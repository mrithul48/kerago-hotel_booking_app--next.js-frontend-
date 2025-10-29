"use client";

import Image from "next/image";
import { Hotels } from "@/lib/utils";
import { useRouter } from "next/navigation";
import HotelFilters from "./FilterBox";
import AmenitiesSection from "./AmenitiesSection";
import { useState, useEffect } from "react";
import { hotelService } from "@/service/hotelService";

interface HotelCardProps {
  hotelData: Hotels[];
}

const HotelCard: React.FC<HotelCardProps> = ({ hotelData }: HotelCardProps) => {

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Hotels[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  // Load all hotels on page load
  useEffect(() => {
    const loadHotels = async () => {
      try {
        setIsLoading(true);
        setFilter(hotelData);
      } catch (err) {
        console.error("Error loading hotels:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHotels();
  }, [hotelData]);
 
   
  const handleClick = async () => {
    if (!search.trim()) {
      setFilter(hotelData);
      setIsSearched(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsSearched(true);
      const searchResults = await hotelService.search(search);
      setFilter(searchResults || []);
    } catch (err) {
      console.error("Search error:", err);
      setFilter([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    
    // If search is cleared, show all hotels
    if (value.trim() === "" && isSearched) {
      setFilter(hotelData);
      setIsSearched(false);
    }
  };

  console.log("filter", filter);
   

  const router = useRouter();
  const gotoDetailsPage = (id: number) => {
    router.push(`/client/hotel/hoteldetail/${id}`);
  };
  const hotels = Array.isArray(filter) ? filter : [filter];

  return (

    <div className="grid grid-cols-12">
      <div className=" hidden lg:flex col-span-2 sticky top-15 h-[calc(100vh-6rem)] overflow-y-auto">
        <HotelFilters />
      </div>
      <div className="lg:col-span-10 col-span-12 overflow-y-auto">
        {/*search*/}
        <div className="pt-20 lg:px-10 px-2">
          <div className="w-full  rounded-[5px] flex gap-2">
            <input
              type="text"
              placeholder="search hotels"
              className="px-2 h-[40] rounded-[5px] bg-gray-300  w-full outline-none border-none"
              value={search}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleClick()}
            />
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="bg-[#72756c] hover:bg-[#484946] rounded-[5px] cursor-pointer lg:px-10 px-5 text-white">
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>


        <div className="grid  lg:px-10 px-2 pb-5 overflow-y-scroll ">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600">Loading...</div>
            </div>
          ) : hotels.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600">No hotels found</div>
            </div>
          ) : (
            hotels.map((hotel) => (
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
                      <AmenitiesSection />
                    </div>

                  </div>

                  <div className="md:flex grid items-center md:justify-between pt-2">
                    <div className="flex gap-1 text-[15px] items-center ">
                      <span>Starting from</span>
                      {hotel.room.map((item, index) => {
                        return (
                          <div key={index} className="font-bold text-black text-[20px]">
                            {item.roomTypes == "NORMAL" ? ` ₹${item.pricePerNight}` : ""}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;