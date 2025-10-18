"use client";

import React, { useState } from "react";
import { formatDateToDDMMYYYY } from "@/lib/utils";
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
  onSubmit?: (payload: BookingPayload) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  hotelId,
  type,
  onSubmit,
}) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setMessage("Please select both check-in and check-out dates.");
      return;
    }

    const bookingRequest: BookingPayload = {
      hotelId,
      checkIn: formatDateToDDMMYYYY(checkIn),
      checkOut: formatDateToDDMMYYYY(checkOut),
      guests,
      room: [
        {
          roomTypes: type,
          roomBookingQuantity: roomQuantity,
        },
      ],
    };

    try {
      setLoading(true);
      await bookingService.booking(bookingRequest);
      setMessage("Booking successful ✅");

      if (onSubmit) onSubmit(bookingRequest); // close popup
    } catch (error) {
      setMessage("Booking failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
        Booking Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-In Date
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-Out Date
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Quantity
          </label>
          <input
            type="number"
            min={1}
            value={roomQuantity}
            onChange={(e) => setRoomQuantity(Number(e.target.value))}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-3">
        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-medium ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>

      {message && (
        <p
          className={`text-center text-sm font-medium ${
            message.includes("failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default BookingDetails;
