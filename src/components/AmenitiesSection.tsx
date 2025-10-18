import React from "react";

import { LucideIcon } from "lucide-react";
import { amenitiesList } from "@/lib/data";

export interface Amenity {
  title: string;
  icon: LucideIcon;
}

const AmenitiesSection: React.FC = () => {
  const visibleCount = 3; // show first 5 amenities
  const visibleAmenities = amenitiesList.slice(0, visibleCount);
  const hiddenCount = amenitiesList.length - visibleCount;

  return (
    <div className="flex flex-wrap gap-3">
      {/* Visible amenities */}
      {visibleAmenities.map(({ title, icon: Icon }: Amenity) => (
        <div
          key={title}
          className="flex items-center gap-2 py-2  rounded-xl "
        >
          <div className="p-2 rounded-lg bg-[#dbdbd7] ">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
      ))}

      {/* Hidden count indicator */}
      {hiddenCount > 0 && (
        <div className="flex items-center justify-center cursor-pointer">
          +{hiddenCount} more
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;
