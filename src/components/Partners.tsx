"use client";

import React from "react";
import { Check, Shield, BarChart3, Users, Clock } from "lucide-react";

const PartnersSection = () => {
  const mutedClass = "text-gray-400";
  const borderClass = "border-gray-700";
  const cardBg = "bg-slate-900";

  return (
    <section id="partners" className="py-5 bg-slate-950 text-white">
       <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Partner with Kerago
          </h2>
          <p className={mutedClass}>Partners Service</p>
        </div>
      <div>
        
        <div
          className={`${cardBg}  ${borderClass}  p-12 relative overflow-hidden`}
        >
          {/* background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5"></div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Left side content */}
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-4xl font-bold mb-4">Partner with Kerago</h2>
              <p className={`${mutedClass} mb-6 text-lg`}>
                Built on Spring Boot for unmatched reliability and scalability.
                Join thousands of hotels leveraging our enterprise-grade
                platform to grow their business.
              </p>

              {/* Features list */}
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time booking management",
                  "Advanced analytics dashboard",
                  "Automated pricing optimization",
                  "24/7 technical support",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-teal-500" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 cursor-pointer">
                Join as Partner Hotel
              </button>
            </div>

            {/* Right side icons grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Enterprise Security" },
                { icon: BarChart3, label: "Advanced Analytics" },
                { icon: Users, label: "Multi-user Access" },
                { icon: Clock, label: "99.9% Uptime" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-800 rounded-2xl p-6 text-center hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-sm">{item.label}</div>
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
