"use client";

import Image from "next/image";
import { Hotels } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { amenitiesList, hotelRoom, roomDescription } from "@/lib/data";
import HotelPolicies from "./HotelPolicies";
import RatingsAndReviews from "./RatingAndReviews";
import BookingDetails from "./BookingComponent";

interface HotelDetailsProps {
  hotelDetails: Hotels[];
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotelDetails }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showBookingPopup, setShowBookingPopup] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleBooking = (hotelId: number, roomTypes: string) => {
    if (!isAuthenticated) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    } else {
      setSelectedHotelId(hotelId);
      setSelectedRoomType(roomTypes);
      setShowBookingPopup(true);
    }
  };

  const closeBookingPopup = () => {
    setShowBookingPopup(false);
    setSelectedHotelId(null);
    setSelectedRoomType("");
  };

  return (
    <div className="pt-15 z-50 bg-[#EEEEEE]">
      {/* 🔒 Animated Login Warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 border border-red-400 text-white px-6 py-4 rounded-xl shadow-2xl z-50 font-semibold backdrop-blur-md"
          >
             Please login to continue booking
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏨 Hotel Content */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 overflow-y-scroll">
          {hotelDetails.map((hotel, hotelIndex) => (
            <div key={hotelIndex}>
              {/* Hotel Images */}
              <div className="flex max-h-[300px]">
                <div>
                  {hotel.imageList.map((img, index) => (
                    <div key={index}>
                      <Image
                        src={img.url}
                        alt={`${hotel.name}`}
                        className="h-[250px] object-fill"
                        height={1000}
                        width={1000}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex space-y-1">
                  {hotelRoom.map((img, index) => (
                    <div key={index}>
                      <Image
                        src={img.image}
                        alt={img.title}
                        className="h-[250px] object-fill"
                        height={1000}
                        width={1000}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotel Info */}
              <div className="px-20 py-5 grid gap-8">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-[35px] font-bold">{hotel.name}</h1>
                    <p>{hotel.location}</p>
                  </div>
                  <div>
                    <span className="bg-green-500 px-2 py-1 text-[12px] text-white rounded-[2px] font-bold">
                      4.4 rating
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <h1 className="text-[25px] font-bold">Amenities</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 justify-center gap-y-5 gap-x-10">
                  {amenitiesList.map(({ title, icon: Icon }) => (
                    <div
                      key={title}
                      className="flex items-center text-center gap-3 text-gray-800"
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                      <span className="text-sm font-medium">{title}</span>
                    </div>
                  ))}
                </div>

                {/* About */}
                <div>
                  <h1 className="text-[25px] font-bold">About Kerago</h1>
                  <p className="text-sm text-gray-700 leading-7">
                    Kerago is a modern hotel booking platform designed to make
                    travel effortless and smart. We connect travelers with
                    trusted hotels, offering real-time availability, transparent
                    pricing, and seamless booking experiences. Our mission is to
                    simplify hotel management for partners while providing
                    guests with comfort, convenience, and reliability at every
                    stay.
                  </p>
                </div>

                {/* Rooms */}
                <div>
                  <h1 className="text-[25px] font-bold">Choose your Room</h1>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {hotel.room.map((item, index) => {
                      const matchedImage = hotelRoom.find(
                        (img) => img.title === item.roomTypes
                      );
                      const matchedHotelRoom = roomDescription.find(
                        (dec) => dec.name == item.roomTypes
                      );
                      return (
                        <div
                          key={index}
                          className="border border-gray-300 rounded-[5px] grid gap-1"
                        >
                          <h1 className="text-[12px] bg-gray-500 text-white px-5 py-2 h-10">
                            SELECTED CATEGORY
                          </h1>
                          <div className="flex justify-between p-5 border-b border-gray-300">
                            <div className="gap-2 h-fit items-center">
                              <h3 className="font-semibold flex items-center gap-2">
                                {item.roomTypes}
                                <span className="text-[10px] bg-green-500 px-2 py-1 font-semibold rounded-2xl h-fit">
                                  available {item.roomAvailableQuantity}
                                </span>
                              </h3>
                              {matchedHotelRoom && (
                                <p className="text-[15px] text-gray-500">
                                  {matchedHotelRoom.description}
                                </p>
                              )}
                            </div>

                            {matchedImage && (
                              <Image
                                src={matchedImage.image}
                                alt={matchedImage.title}
                                width={150}
                                height={150}
                              />
                            )}
                          </div>
                          <div className="flex justify-between p-5 items-center">
                            <div>₹{item.pricePerNight}</div>
                            <div className="px-2 py-1 text-white rounded-[2px] group">
                              <button
                                onClick={() =>
                                  handleBooking(hotel.hotelId!, item.roomTypes)
                                }
                                disabled={item.roomAvailableQuantity === 0}
                                className={`w-full py-2 px-2 rounded-[5px] cursor-pointer text-[10px] font-bold uppercase tracking-wide ${
                                  item.roomAvailableQuantity === 0
                                    ? "bg-[#75756a] cursor-not-allowed opacity-60"
                                    : "bg-[#75756a] hover:bg-[#474745] text-white"
                                }`}
                              >
                                {item.roomAvailableQuantity === 0
                                  ? "Sold Out"
                                  : "Book Now"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews and Policies */}
                <div>
                  <RatingsAndReviews />
                </div>

                <div>
                  <HotelPolicies />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🧾 Booking Popup */}
      <AnimatePresence>
        {showBookingPopup && selectedHotelId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={closeBookingPopup}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
              >
                ✕
              </button>
              <BookingDetails
                hotelId={selectedHotelId}
                type={selectedRoomType}
                onSubmit={closeBookingPopup}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelDetails;
