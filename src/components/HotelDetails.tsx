"use client";

import Image from 'next/image';
import { MapPin, Star, Wifi, Coffee, Utensils, Car } from 'lucide-react';
import { Hotels } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface HotelDetailsProps {
  hotelDetails: Hotels[];
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotelDetails }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // FIXED: Removed the ! operator
  }, []);

  const handleBooking = (hotelId: number, roomTypes: string) => {
    if (!isAuthenticated) {
      // User is NOT authenticated → show warning
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    } else {
      // User IS authenticated → proceed to booking page
      router.push(`/client/booking?hotelId=${hotelId}&type=${roomTypes}`);
    }
  };

  const defaultAmenities = ['Wifi', 'Parking', 'Restaurant', 'Coffee'];

  return (
    <div className="mx-auto pt-20 z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Login Warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 border border-red-400 text-white px-6 py-4 rounded-xl shadow-2xl z-50 font-semibold backdrop-blur-md"
          >
            🔒 Please login to continue booking
          </motion.div>
        )}
      </AnimatePresence>

      {hotelDetails.map((hotel, hotelIndex) => (
        <div key={hotelIndex}>
          {/* Image and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5 md:p-8 px-5 py-8">
            {/* Image Gallery */}
            <div className="relative h-50 lg:h-[280px] rounded-3xl overflow-hidden group shadow-2xl">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
                {hotel.imageList.slice(0, 4).map((img, imgIndex) => (
                  <div
                    key={img.id}
                    className={`relative overflow-hidden rounded-2xl group/img cursor-pointer ${
                      imgIndex === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${hotel.name} - Image ${imgIndex + 1}`}
                      fill
                      className="object-cover group-hover/img:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>
            </div>

            {/* Hotel Information */}
            <div className="flex flex-col justify-between lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/30 backdrop-blur-md rounded-3xl p-8 border border-slate-600/50 shadow-xl">
                <h2 className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 tracking-tight mb-4">
                  {hotel.name.toUpperCase()}
                </h2>
                <div className="flex items-center text-slate-200 mb-4">
                  <MapPin className="w-5 h-5 text-amber-400 mr-2" />
                  <span className="font-medium text-sm">📍 {hotel.location}</span>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed text-base font-light">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-3">
                  {(hotel.amenities || defaultAmenities).map((amenity, i) => {
                    const icons = {
                      Wifi: <Wifi className="w-4 h-4" />,
                      Parking: <Car className="w-4 h-4" />,
                      Restaurant: <Utensils className="w-4 h-4" />,
                      Coffee: <Coffee className="w-4 h-4" />,
                    };
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 rounded-full text-xs font-semibold shadow-lg border border-amber-500/30 hover:shadow-xl hover:from-amber-500/30 hover:to-amber-600/30 transition-all backdrop-blur-sm"
                      >
                        {icons[amenity as keyof typeof icons] || <Star className="w-4 h-4" />}
                        {amenity}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Rooms Section */}
          <div className="px-5 md:px-8 pb-12 mt-8">
            <h3 className="text-white mb-8 tracking-tight font-bold text-2xl">
              🛏️ Available Rooms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotel.room.map((room, roomIndex) => (
                <div
                  key={roomIndex}
                  className="group border border-slate-600/50 rounded-2xl p-5 hover:shadow-2xl hover:border-amber-400/70 transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-slate-700/40 to-slate-800/40 hover:from-slate-700/60 hover:to-slate-800/60"
                >
                  <div className="mb-5">
                    <h4 className="font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {room.roomTypes}
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-300 rounded-full font-semibold border border-emerald-500/30 backdrop-blur-sm">
                        {room.roomAvailableQuantity} Available
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                        ₹{room.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-sm font-medium">/night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBooking(hotel.hotelId!, room.roomTypes)}
                    disabled={room.roomAvailableQuantity === 0}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold transition-all duration-300 cursor-pointer text-sm uppercase tracking-wide ${
                      room.roomAvailableQuantity === 0
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0'
                    }`}
                  >
                    {room.roomAvailableQuantity === 0 ? '❌ Sold Out' : '🔖 Book Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelDetails;