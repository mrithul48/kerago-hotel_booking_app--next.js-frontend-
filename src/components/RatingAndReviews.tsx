"use client";

import { Star } from "lucide-react";
import React from "react";

interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const RatingsAndReviews = () => {
  const totalRating = 3.5;
  const totalReviews = 281;

  const ratingBreakdown = [
    { stars: 5, percent: 52 },
    { stars: 4, percent: 11 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 24 },
  ];

  const reviews: Review[] = [
    {
      name: "Aaditya Sharma",
      date: "22 Apr 2025",
      rating: 5,
      comment:
        "Very nice stay. The property was nice and clean. The rooms were spacious, and the hospitality was overwhelming. Nothing to complain about. Overall, the accommodation was very safe, pleasant, and nice.",
    },
    {
      name: "Subhash Anand",
      date: "21 Apr 2025",
      rating: 5,
      comment:
        "Worth the money. Awesome rooms and bathrooms. Our stay was comfortable. Hotel staff were good and cooperative. Reception members were very gentle and friendly.",
    },
  ];

  return (
    <div className="w-full border border-gray-200 rounded-lg sm:p-6 ">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ratings and Reviews</h2>

      {/* Overall Rating Section */}
      <div className="flex flex-col md:flex-row border border-gray-300 rounded-md mb-6">
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 border-r border-gray-200 p-6">
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-md font-semibold text-lg">
            {totalRating} <Star className="w-4 h-4 fill-green-600 text-green-600" />
          </div>
          <p className="text-gray-800 font-medium mt-2">GOOD</p>
          <p className="text-gray-500 text-sm">{totalReviews} ratings</p>
        </div>

        {/* Rating Breakdown */}
        <div className="w-full md:w-2/3 p-6">
          {ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-700 w-6">{r.stars}★</span>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-yellow-400 h-2"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-10 text-right">{r.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-green-700 text-white text-sm px-2 py-1 rounded">
                {review.rating}
                <Star className="w-3 h-3 fill-white text-white" />
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsAndReviews;
