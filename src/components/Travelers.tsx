"use client";

import React, { useState } from "react";

const TravelersSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Business Traveler",
      text: "Kerago transformed how I book hotels. The room selection process is seamless and the pricing is transparent.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Travel Blogger",
      text: "As someone who books 50+ hotels annually, Kerago's efficiency is unmatched. The luxury room filters are perfect.",
    },
    {
      name: "Emily Watson",
      role: "Event Coordinator",
      text: "Managing group bookings has never been easier. The dashboard gives us complete control over our reservations.",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // dark theme classes
  const mutedClass = "text-gray-400";
  const borderClass = "border-gray-700";
  const cardBg = "bg-slate-900";

  return (
    <section id="travelers" className="py-10 w-full  bg-slate-950 text-white">
      <div>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Loved by Travelers
          </h2>
          <p className={mutedClass}>See what our users have to say</p>
        </div>

        {/* Testimonial Card */}
        <div className={`${cardBg} ${borderClass}  p-12 relative shadow-xl shadow-slate-900/40`}>
          <div className="text-6xl text-teal-500/20 mb-4">&ldquo;</div>
          <p className="text-xl mb-8 leading-relaxed text-gray-200">
            {testimonials[activeTestimonial].text}
          </p>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {testimonials[activeTestimonial].name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-lg">
                {testimonials[activeTestimonial].name}
              </div>
              <div className={`text-sm ${mutedClass}`}>
                {testimonials[activeTestimonial].role}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex space-x-2 mt-8 justify-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeTestimonial ? "w-8 bg-teal-500" : "w-1.5 bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelersSection;
