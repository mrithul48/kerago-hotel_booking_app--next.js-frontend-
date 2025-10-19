"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  Clock,
  BedDouble,
  X,
} from "lucide-react";
import { bookingService } from "@/service/bookingService";
import Loading from "@/components/Loading";

interface Room {
  id: number;
  roomTypes: string;
  pricePerNight: number;
  roomBookingQuantity: number;
}

interface Booking {
  bookingId: number;
  username: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  guests: number;
  totalPrice: number;
  room: Room[];
}

export default function BookingDetails() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<number | null>(null);
  

useEffect(() => {
  const fetchBooking = async () => {
    try {
      const response = await bookingService.bookingById();
      
      setBookings(response);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchBooking();
}, [cancelling]);

  

  const handleCancelClick = async (bookingId: number) => {
    try {
      setCancelling(bookingId);
      await bookingService.bookingCancel(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const [day1, month1, year1] = checkIn.split("-");
    const [day2, month2, year2] = checkOut.split("-");
    const start = new Date(`${year1}-${month1}-${day1}`);
    const end = new Date(`${year2}-${month2}-${day2}`);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <>
    <Loading loading={loading}/>
    <div className="pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-2">
            Your Bookings
          </h1>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking.bookingId}
            className=" rounded-[5px] overflow-hidden mb-8 border border-gray-400 "
          >
            {/* Header */}
            <div className="bg-[#777C6D] px-2 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-3 h-3 text-white" />
                <h2 className=" font-bold text-white">
                  {booking.hotelName}
                </h2>
              </div>
              <div
                className={`px-4 py-2 rounded-[5px] ${getStatusColor(
                  booking.status
                )} font-semibold text-[10px] flex items-center space-x-2`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{booking.status}</span>
              </div>
            </div>

            {/* Horizontal Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {/* Check-in / Check-out / Duration */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#777C6D]" />
                  <span className="font-bold text-gray-700">Check-in</span>
                </div>
                <p className="text-[12px] text-gray-900">
                  {formatDate(booking.checkIn)}
                </p>

                <div className="flex items-center space-x-2 mt-4 mb-2">
                  <Calendar className="w-5 h-5 text-[#777C6D]" />
                  <span className="font-bold text-gray-700">Check-out</span>
                </div>
                <p className="text-[12px] text-gray-900">
                  {formatDate(booking.checkOut)}
                </p>

                <div className="flex items-center space-x-2 mt-4">
                  <Clock className="w-5 h-5 text-[#777C6D]" />
                  <span className="font-bold text-gray-700">Duration</span>
                </div>
                <p className="text-[12px] text-gray-900">
                  {calculateNights(booking.checkIn, booking.checkOut)} Night
                  {calculateNights(booking.checkIn, booking.checkOut) > 1
                    ? "s"
                    : ""}
                </p>
              </div>

              {/* Guests */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-5 h-5 text-[#777C6D]" />
                  <span className="font-bold text-gray-900">
                    Guest Information
                  </span>
                </div>
                <p className="text-[12px] text-gray-700">
                  <span className="text-[12px]">{booking.guests}</span>{" "}
                  {booking.guests > 1 ? "Guests" : "Guest"}
                </p>
              </div>

              {/* Room Details */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 overflow-y-auto max-h-48">
                <div className="flex items-center space-x-2 mb-3">
                  <BedDouble className="w-5 h-5 text-[#777C6D]" />
                  <span className="font-semibold text-gray-900">
                    Room Details
                  </span>
                </div>
                {booking.room.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between mb-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {room.roomTypes.toLowerCase()} Room
                      </p>
                      <p className="text-[12px] text-gray-600">
                        {room.roomBookingQuantity} × ₹
                        {room.pricePerNight.toLocaleString()} / night
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col justify-between h-full">
                <div className="bg-[#777C6D] text-white rounded-xl p-5 mb-4">
                  <div className="flex items-center space-x-3 mb-2">
                   
                    <span className="text-lg font-semibold">Total Amount</span>
                  </div>
                  <p className="text-3xl font-bold">
                    ₹{booking.totalPrice.toLocaleString()}
                  </p>
                </div>

                {booking.status === "CONFIRMED" ? (
                  <button
                    onClick={() => handleCancelClick(booking.bookingId)}
                    disabled={cancelling === booking.bookingId}
                    className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-[5px] flex items-center justify-center space-x-1  cursor-pointer"
                  >
                    {cancelling === booking.bookingId ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Cancelling...</span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5" />
                        <span>Cancel Booking</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                    <p className="text-red-700 font-semibold text-sm">
                      This booking has been cancelled
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}
