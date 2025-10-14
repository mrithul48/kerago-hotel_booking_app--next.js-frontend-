"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hotel, Plus, Trash2, Edit, X, Check, Upload, Building2 } from "lucide-react";
import { hotelService } from "@/service/hotelService";

export interface Room {
  roomId?: number;
  roomTypes: string;
  roomAvailableQuantity: number;
  pricePerNight: number;
}

export interface HotelDataUpdateProps {
  name: string;
  location: string;
  description: string;
  room: Room[];
}

export interface ImagesList {
  id: number;
  url: string;
}

export interface HotelProps {
  hotelId?: number;
  name: string;
  location: string;
  description: string;
  room: Room[];
  imagesList: ImagesList[];
}

export type HotelRequestData = Omit<HotelProps, "hotelId">;

const AdminHotelControl: React.FC = () => {
  const [hotelForm, setHotelForm] = useState<HotelProps>({
    name: "",
    location: "",
    description: "",
    room: [],
    imagesList: [],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hotels, setHotels] = useState<HotelProps[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<HotelRequestData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const data = await hotelService.getAll();
    setHotels(data);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHotelForm({ ...hotelForm, [e.target.name]: e.target.value });
  };

  const handleRoomChange = (
    roomId: number,
    field: keyof Room,
    value: string | number
  ) => {
    const updatedRooms = hotelForm.room.map((room) =>
      room.roomId === roomId
        ? {
            ...room,
            [field]:
              field === "pricePerNight" || field === "roomAvailableQuantity"
                ? Number(value)
                : String(value),
          }
        : room
    );
    setHotelForm({ ...hotelForm, room: updatedRooms });
  };

  const addRoom = () => {
    setHotelForm({
      ...hotelForm,
      room: [
        ...hotelForm.room,
        {
          roomId: Date.now(),
          roomTypes: "",
          roomAvailableQuantity: 0,
          pricePerNight: 0,
        },
      ],
    });
  };

  const removeRoom = (roomId: number) => {
    setHotelForm({
      ...hotelForm,
      room: hotelForm.room.filter((r) => r.roomId !== roomId),
    });
  };

  const handleCreate = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imagesList, ...hotelDataToSend } = hotelForm;
            

      await hotelService.registerHotel(
        hotelDataToSend as HotelRequestData,
        imageFile || undefined
      );

      setHotels([...hotels, { ...hotelForm, hotelId: Date.now() }]);

      setHotelForm({
        name: "",
        location: "",
        description: "",
        room: [],
        imagesList: [],
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      fetchHotels();
      setImageFile(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create hotel");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    await hotelService.deleteHotel(id);
    setHotels(hotels.filter((h) => h.hotelId !== id));
    fetchHotels();
  };

  const handleSelectHotel = (id: number) => {
    const hotel = hotels.find((h) => h.hotelId === id);
    if (hotel) {
      setSelectedHotel(hotel);
      setHotelForm(hotel);
      setShowForm(true);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!hotelForm.hotelId) {
        alert("No hotel selected for update!");
        return;
      }

      // const hotelDataToSend: HotelDataUpdateProps = {
      //   name: hotelForm.name,
      //   location: hotelForm.location,
      //   description: hotelForm.description,
      //   room: hotelForm.room.map((r) => ({
      //     roomTypes: r.roomTypes,
      //     roomAvailableQuantity: r.roomAvailableQuantity,
      //     pricePerNight: r.pricePerNight,
      //   })),
      // };

      setHotels(
        hotels.map((h) =>
          h.hotelId === hotelForm.hotelId ? hotelForm : h
        )
      );

      setHotelForm({
        name: "",
        location: "",
        description: "",
        room: [],
        imagesList: [],
      });
      setSelectedHotel(null);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update hotel");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedHotel(null);
    setHotelForm({
      name: "",
      location: "",
      description: "",
      room: [],
      imagesList: [],
    });
    setImageFile(null);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Success Banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check size={20} />
            {selectedHotel
              ? "Hotel updated successfully!"
              : "Hotel created successfully!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Building2 className="text-indigo-600 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
                <p className="text-gray-500 text-sm mt-1">Create and manage your hotel properties</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setSelectedHotel(null);
                setHotelForm({
                  name: "",
                  location: "",
                  description: "",
                  room: [],
                  imagesList: [],
                });
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus size={20} /> Add Hotel
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedHotel ? "Edit Hotel" : "Create New Hotel"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Hotel Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Hotel Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Hotel Name</label>
                      <input
                        type="text"
                        placeholder="Enter hotel name"
                        name="name"
                        value={hotelForm.name}
                        required
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Location</label>
                      <input
                        type="text"
                        placeholder="Enter location"
                        name="location"
                        value={hotelForm.location}
                        required
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      placeholder="Enter hotel description"
                      name="description"
                      value={hotelForm.description}
                      required
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Hotel Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files && setImageFile(e.target.files[0])
                        }
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <Upload className="text-gray-400 w-6 h-6" />
                        <span className="text-gray-600 text-sm">
                          {imageFile ? imageFile.name : "Click to upload image"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Rooms Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Room Details</h3>
                    <button
                      onClick={addRoom}
                      className="flex items-center gap-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-4 py-2 rounded-lg transition text-sm font-medium"
                    >
                      <Plus size={16} /> Add Room
                    </button>
                  </div>

                  <div className="space-y-4">
                    {hotelForm.room.map((r) => (
                      <div
                        key={r.roomId}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-gray-700 font-medium text-sm mb-1">
                              Room Type
                            </label>
                            <select
                              value={r.roomTypes}
                              onChange={(e) =>
                                handleRoomChange(r.roomId!, "roomTypes", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                            >
                              <option value="">Select Room Type</option>
                              <option value="LUXURY">LUXURY</option>
                              <option value="DELUXE">DELUXE</option>
                              <option value="NORMAL">NORMAL</option>
                              <option value="FAMILY">FAMILY</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium text-sm mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              required
                              value={r.roomAvailableQuantity}
                              onChange={(e) =>
                                handleRoomChange(
                                  r.roomId!,
                                  "roomAvailableQuantity",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium text-sm mb-1">
                              Price/Night (₹)
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              required
                              value={r.pricePerNight}
                              onChange={(e) =>
                                handleRoomChange(
                                  r.roomId!,
                                  "pricePerNight",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => removeRoom(r.roomId!)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded text-sm font-medium transition"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    ))}

                    {hotelForm.room.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No rooms added. Click &quot;Add Room&quot; to get started.</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t border-gray-200 pt-6">
                  <button
                    onClick={selectedHotel ? handleUpdate : handleCreate}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium"
                  >
                    <Check size={20} />
                    {selectedHotel ? "Update Hotel" : "Create Hotel"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search hotels by name or location..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Hotels Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              All Hotels <span className="text-gray-500 text-sm font-normal">({filteredHotels.length})</span>
            </h2>
          </div>

          {filteredHotels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hotel Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Rooms</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHotels.map((hotel) => (
                    <tr key={hotel.hotelId} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{hotel.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{hotel.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{hotel.description}</td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {hotel.room.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleSelectHotel(hotel.hotelId!)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Edit hotel"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(hotel.hotelId!)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Delete hotel"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Hotel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No hotels found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria or create a new hotel</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHotelControl;
