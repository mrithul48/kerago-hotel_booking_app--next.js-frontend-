// "use client"


// import Image from 'next/image';
// import { MapPin, Star, Wifi, Coffee, Utensils, Car } from 'lucide-react';
// import { Hotels } from '@/lib/utils';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { AnimatePresence,motion } from 'framer-motion';

// interface HotelDetailsProps {
//   hotelDetails: Hotels[];
// }

// const HotelDetails: React.FC<HotelDetailsProps> = ({ hotelDetails }:HotelDetailsProps) => {
 
//   const [bookingAuthenticate,setBookingAuthenticate] = useState<boolean>(false);

//   const route = useRouter();
// useEffect(()=>{
//  const token = localStorage.getItem("token");

//  if(token) {
//   setBookingAuthenticate(true)
//  } else{
//   setBookingAuthenticate(false)
//  }
// }, [])
 
  

//   const handleBooking = (hotelId: number, roomTypes: string) => {
    
//     if (!bookingAuthenticate) {
//            setBookingAuthenticate(true)
//             setTimeout(() => setBookingAuthenticate(false), 3000); 
//           } else {
//               route.push(`/client/booking?hotelId=${hotelId}&type=${roomTypes}`);
//           }
//   };

//   const defaultAmenities = ['Wifi', 'Parking', 'Restaurant', 'Coffee'];

//   return (
//     <div className=" mx-auto pt-20">
//        {/* Animated Login Popup */}
//       <AnimatePresence>
//         {bookingAuthenticate && (
//           <motion.div
//             initial={{ y: -80, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -80, opacity: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
//           >
//             ⚠️ Please login before trying again!
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {hotelDetails.map((hotel, hotelIndex) => (
//         <div
//           key={hotelIndex}
          
//         >
//           {/* Image and Details */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5 md:p-5 px-5">
//             {/* Image Gallery */}
//             <div className="relative h-50 lg:h-[250px]  rounded-2xl overflow-hidden group">
//               <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
//                 {hotel.imageList.slice(0, 4).map((img, imgIndex) => (
//                   <div  
//                     key={img.id}
//                     className={`relative overflow-hidden rounded-xl ${
//                       imgIndex === 0 ? 'col-span-2 row-span-2' : ''
//                     }`}
//                   >
//                     <Image
//                       src={img.url}
//                       alt={`${hotel.name} - Image ${imgIndex + 1}`}
//                       fill
//                       className="object-cover  "
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
//             </div>

//             {/* Hotel Information */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 <h2 className="font-extrabold text-white tracking-tight mb-2">
//                   {hotel.name.toUpperCase()}
//                 </h2>
//                 <div className="flex items-center text-white mb-2">
//                   <MapPin className="w-4 h-4 text-amber-500 mr-1" />
//                   <span className="font-light">Location : {hotel.location}</span>
//                 </div>

//                 <p className="text-white mb-2 leading-relaxed text-base ">
//                   {hotel.description}
//                 </p>

//                 {/* Amenities */}
//                 <div className="flex flex-wrap gap-3">
//                   {(hotel.amenities || defaultAmenities).map((amenity, i) => {
//                     const icons = {
//                       Wifi: <Wifi className="w-4 h-4" />,
//                       Parking: <Car className="w-4 h-4" />,
//                       Restaurant: <Utensils className="w-4 h-4" />,
//                       Coffee: <Coffee className="w-4 h-4" />,
//                     };
//                     return (
//                       <div
//                         key={i}
//                         className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
//                       >
//                         {icons[amenity as keyof typeof icons] || <Star className="w-4 h-4" />}
//                         {amenity}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Rooms Section */}
//           <div className="px-5 pb-5 mt-2 border-gray-100">
//             <h3 className="text-white mb-4 tracking-tight">
//               Available Rooms
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {hotel.room.map((room, roomIndex) => (
//                 <div
//                   key={roomIndex}
//                   className="group border border-gray-300 rounded-2xl p-3 hover:shadow-xl hover:border-amber-400 transition-all duration-300  backdrop-blur-sm"
//                 >
//                   <div className="mb-4">
//                     <h4 className=" font-semibold text-white mb-1">
//                       {room.roomTypes}
//                     </h4>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full ">
//                         {room.roomAvailableQuantity} Available
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mb-5">
//                     <div className="flex items-baseline gap-1">
//                       <span className=" font-bold text-white">
//                         ₹{room.pricePerNight.toLocaleString()}
//                       </span>
//                       <span className="text-white text-sm">/night</span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => handleBooking(hotel.hotelId!, room.roomTypes)}
//                     disabled={room.roomAvailableQuantity === 0}
//                     className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
//                       room.roomAvailableQuantity === 0
//                         ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                         : 'bg-[#146785] hover:to-amber-700 text-white shadow-md hover:shadow-xl transform hover:-translate-y-0.5'
//                     }`}
//                   >
//                     {room.roomAvailableQuantity === 0 ? 'Sold Out' : 'Book Now'}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HotelDetails;


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
    setIsAuthenticated(!token); // true if token exists, false otherwise
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
    <div className="mx-auto pt-20 z-50">
      {/* Animated Login Warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-black/30 via-transparent to-transparent border text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ⚠️ Please login before booking!
          </motion.div>
        )}
      </AnimatePresence>

      {hotelDetails.map((hotel, hotelIndex) => (
        <div key={hotelIndex}>
          {/* Image and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5 md:p-5 px-5">
            {/* Image Gallery */}
            <div className="relative h-50 lg:h-[250px] rounded-2xl overflow-hidden group">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
                {hotel.imageList.slice(0, 4).map((img, imgIndex) => (
                  <div
                    key={img.id}
                    className={`relative overflow-hidden rounded-xl ${
                      imgIndex === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${hotel.name} - Image ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
            </div>

            {/* Hotel Information */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-extrabold text-white tracking-tight mb-2">
                  {hotel.name.toUpperCase()}
                </h2>
                <div className="flex items-center text-white mb-2">
                  <MapPin className="w-4 h-4 text-amber-500 mr-1" />
                  <span className="font-light">Location : {hotel.location}</span>
                </div>

                <p className="text-white mb-2 leading-relaxed text-base">
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
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
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
          <div className="px-5 pb-5 mt-2 border-gray-100">
            <h3 className="text-white mb-4 tracking-tight">Available Rooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {hotel.room.map((room, roomIndex) => (
                <div
                  key={roomIndex}
                  className="group border border-gray-300 rounded-2xl p-3 hover:shadow-xl hover:border-amber-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-1">{room.roomTypes}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {room.roomAvailableQuantity} Available
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-white">
                        ₹{room.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-white text-sm">/night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBooking(hotel.hotelId!, room.roomTypes)}
                    disabled={room.roomAvailableQuantity === 0}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                      room.roomAvailableQuantity === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#146785] hover:to-amber-700 text-white shadow-md hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    {room.roomAvailableQuantity === 0 ? 'Sold Out' : 'Book Now'}
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
