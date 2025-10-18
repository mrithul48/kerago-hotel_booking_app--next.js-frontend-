"use client";

import React from "react";

const HotelPolicies = () => {
  const policies: string[] = [
    "Couples are welcome",
    "Guests can check in using any local or outstation ID proof (PAN card not accepted).",
    "Only Indian Nationals allowed",
    "This hotel is serviced under the trade name of J2 Service Apartment as per quality standards of OYO",
  ];

  return (
    <div className="w-full border border-gray-200 rounded-lg py-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Hotel Policies</h2>

      {/* Check-in & Check-out */}
      <div className="flex flex-wrap items-center gap-10 mb-5">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Check-in</span>
          <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 font-semibold">
            12:00 PM
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Check-out</span>
          <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 font-semibold">
            11:00 AM
          </div>
        </div>
      </div>

      {/* Policy List */}
      <ul className="space-y-2 list-disc list-inside text-gray-700">
        {policies.map((policy, index) => (
          <li key={index} className="text-sm leading-relaxed">
            {policy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelPolicies;
