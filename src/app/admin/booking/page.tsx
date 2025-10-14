"use client";

import { bookingService } from "@/service/bookingService";
import { useEffect, useState } from "react";

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


export default function AdminBookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulate API call - REPLACE THIS with your actual fetch:
        const res = await bookingService.getAll();
        // OR
        // const res = await fetch('/api/bookings').then(r => r.json());
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setBookings(res);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
          <p className="text-gray-600">View and manage all hotel bookings</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-gray-500">Total Bookings</span>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Check-In
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Check-Out
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rooms
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((b) => (
                  <tr
                    key={b.bookingId}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">
                        #{b.bookingId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {b.hotelName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{b.username}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{b.checkIn}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{b.checkOut}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 font-medium">
                        {b.guests}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {b.room.map((r) => (
                          <div
                            key={r.id}
                            className="text-xs bg-gray-50 px-2 py-1 rounded border border-gray-200"
                          >
                            <span className="font-medium text-gray-700">
                              {r.roomTypes}
                            </span>
                            <span className="text-gray-500 mx-1">×</span>
                            <span className="text-gray-600">{r.roomBookingQuantity}</span>
                            <span className="text-gray-400 ml-1">
                              @ ₹{r.pricePerNight.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{b.totalPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg mt-6">
            <p className="text-gray-500 text-lg">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}