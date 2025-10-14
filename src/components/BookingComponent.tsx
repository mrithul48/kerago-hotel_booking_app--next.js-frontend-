"use client";

import React, { useState } from "react";
import { Calendar, Users, Trash2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { bookingService } from "@/service/bookingService";

interface RoomSelection {
  roomTypes: string;
  roomBookingQuantity: number;
}

export interface BookingPayload {
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  room: RoomSelection[];
}

interface BookingDetailsProps {
  hotelId: number;
  type: string;
  onSubmit?: (booking: BookingPayload) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  hotelId,
  // type ,
  onSubmit,
}) => {
  const [guests, setGuests] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);
  const [conform, setConform] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomSelection[]>([
    { roomTypes: "NORMAL", roomBookingQuantity: 1 },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const route = useRouter();

  const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };


  const availableRoomTypes = ["NORMAL", "DELUXE", "SUITE", "PREMIUM"];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
        

    if (!checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }

    if (!checkOut) {
      newErrors.checkOut = "Check-out date is required";
    }

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = "Check-out must be after check-in";
      }
    }

    if (rooms.length === 0) {
      newErrors.rooms = "At least one room must be selected";
    }

    rooms.forEach((room, index) => {
      if (room.roomBookingQuantity < 1) {
        newErrors[`room-${index}`] = "Room quantity must be at least 1";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRemoveRoom = (index: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((_, i) => i !== index));
    }
  };

  const handleRoomTypeChange = (index: number, value: string) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].roomTypes = value;
    setRooms(updatedRooms);
  };

  const handleRoomQuantityChange = (index: number, value: number) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].roomBookingQuantity = Math.max(1, value);
    setRooms(updatedRooms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const bookingRequest: BookingPayload = {
        hotelId,
        checkIn: formatDateToDDMMYYYY(checkIn),
        checkOut: formatDateToDDMMYYYY(checkOut),
        guests,
        room: rooms,
      };

    

      if (onSubmit) {
        onSubmit(bookingRequest);
      } else {
        // For demonstration - replace with actual API call
        try {
          await bookingService.booking(bookingRequest);
          setConform(true);

        } catch (error) {
          console.log("booking failed", error);
        }finally{
          setLoading(false);
        }
      }
    }
  };

  const closePopup = () => {
    setConform(false);
    route.push("/client/hotel");
   }

     if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Processing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-20 px-4">
      <div className="max-w-3xl mx-auto">
     {conform && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-gray-900/50"></div>

    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md z-10 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div className="grid">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed</h2>
          <p className="text-gray-600 mb-4">
            Please check your email for more information about your booking
          </p>
          <button
            onClick={closePopup}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Booking
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Booking Details
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 text-gray-500" />
              Number of Guests
            </label>
            <input
              type="number"
              max="2"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
            />
            {errors.guests && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.guests}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
              {errors.checkIn && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.checkIn}
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
              {errors.checkOut && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.checkOut}
                </div>
              )}
            </div>
          </div>

          <div>
            {errors.rooms && (
              <div className="flex items-center gap-2 mb-4 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-md">
                <AlertCircle className="w-4 h-4" />
                {errors.rooms}
              </div>
            )}

            <div className="space-y-3">
              {rooms.map((room, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room Type
                        </label>
                        <select
                         
                          onChange={(e) =>
                            handleRoomTypeChange(index, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                        >
                          {availableRoomTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={room.roomBookingQuantity}
                          onChange={(e) =>
                            handleRoomQuantityChange(
                              index,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                        />
                      </div>
                    </div>

                    {rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRoom(index)}
                        className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {errors[`room-${index}`] && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors[`room-${index}`]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingDetails;