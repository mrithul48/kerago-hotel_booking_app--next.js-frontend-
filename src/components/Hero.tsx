"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";



const Hero: React.FC = () => {
const router = useRouter();
//      const handleClickStart = ()=>{
//        router.push("/auth/login");
//   }

  const handleExploreHotel = ()=>{
    router.push("/client/hotel")
  }
  const mutedClass = "text-gray-400";
  // const borderClass = "border-gray-700";

  return (
    <section className="relative pt-32 pb-10 px-6 overflow-hidden bg-slate-950 text-white">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-600/10"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(20,184,166,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(37,99,235,0.1) 0%, transparent 50%)`,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-teal-400">Now live in 150+ countries</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Book Your Perfect Stay
          <br />
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            with Kerago
          </span>
        </h1>

        {/* Description */}
        <p className={`text-xl ${mutedClass} max-w-2xl mx-auto mb-12`}>
          Find, book, and manage your hotel stay effortlessly — from luxury to budget
          rooms. Experience seamless travel planning with enterprise-grade reliability.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleExploreHotel}
            className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
          >
            <span>Explore Hotels</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

         
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "500K+", label: "Active Users" },
            { value: "10K+", label: "Partner Hotels" },
            { value: "150+", label: "Countries" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className={`text-sm ${mutedClass} mt-1`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

