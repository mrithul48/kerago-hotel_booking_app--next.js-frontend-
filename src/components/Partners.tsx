"use client";

import React from "react";
import { Check, Shield, BarChart3, Users, Clock } from "lucide-react";

const PartnersSection = () => {
  const mutedClass = "text-gray-700";
  const borderClass = "border-gray-700";
  const cardBg = "bg-slate-900";

  return (
    <section id="partners" className="py-10 bg-[#EEEEEE] text-white">
       <div className="text-center mb-5">
          <h2 className="text-4xl font-bold mb-2 text-[#646462] ">
            Partner with Kerago
          </h2>
          <p className={mutedClass} >Partners Service</p>
        </div>
      <div>
        
        <div
          className={`${cardBg}  ${borderClass}  px-5 sm:px-10 relative overflow-hidden`}
        >
          {/* background gradient overlay */}
          <div className="absolute inset-0 bg-[#EEEEEE]"></div>

          <div className="relative grid md:grid-cols-2 gap-5 items-center ">
            {/* Left side content */}
            <div className="flex flex-col  items-start  ">
              <h2 className="sm:text-[35px] text-[20px] text-black   font-bold mb-2">Modern & Tech-Oriented</h2>
              <p className={`${mutedClass} mb-6 text-[15px]  sm:text-start`}>
                Built on Spring Boot for unmatched reliability and scalability.
                Join thousands of hotels leveraging our enterprise-grade
                platform to grow their business.
              </p>

              {/* Features list */}
              <ul className="space-y-4 mb-5 ">
                {[
                  "Real-time booking management",
                  "Advanced analytics dashboard",
                  "Automated pricing optimization",
                  "24/7 technical support",
                ].map((item, i) => (
                  <li key={i} className="flex sm:items-center  space-x-3">
                    <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-teal-500" />
                    </div>
                    <span className="text-black text-[13px]">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className=" w-full flex justify-center sm:justify-start py-5">
                    <button className="px-8 py-4 bg-[#75756a] hover:bg-[#474745] text-white rounded-lg font-semibold  hover:scale-103 transition-all duration-300 cursor-pointer">
                Join as Partner Hotel
              </button>
              </div>
              
            </div>

            {/* Right side icons grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Shield, label: "Enterprise Security" },
                { icon: BarChart3, label: "Advanced Analytics" },
                { icon: Users, label: "Multi-user Access" },
                { icon: Clock, label: "99.9% Uptime" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#EAE4D5] p-4 text-center rounded-[10px]  hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="w-12 h-12  rounded-[10px] flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="font-semibold text-black text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
