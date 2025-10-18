"use client";
import React from "react";

const HotelFilters = () => {
  // Define your filter options
  const filters = {
    priceRange: ["₹0 - ₹2,000", "₹2,000 - ₹5,000", "₹5,000+"],
    amenities: ["Free Parking", "Restaurant", "Family Rooms", "Room Service"],
    hotelType: ["Luxury", "Budget", "Business"],
  };

  return (
    <div className=" shadow h-fit sticky px-5 w-full py-10 ">
      <h2 className="text-xl font-semibold text-[#146785] mb-2">Filters</h2>

      {/* Map through each filter section */}
      <div className="space-y-6 text-gray-700">
        {Object.entries(filters).map(([key, options]) => (
          <div key={key}>
            <h3 className="font-medium mb-2 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </h3>

            {/* Map each option */}
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-[#146785] cursor-pointer"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default HotelFilters;
