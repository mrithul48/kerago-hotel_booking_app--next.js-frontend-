"use client";

import { testimonials } from "@/lib/data";


const TravelersSection = () => {
  
  return (
    <section id="travelers" className="py-15 w-full text-white"
    style={{ backgroundImage: "url('/images/travel.jpg')" }}
>
      <div>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white font-mono">
            Loved by Travelers
          </h2>
          <p className="text-black">See what our users have to say</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 min-h-90 w-90%">
            {testimonials.map((item,index)=>{
              return(
                <div key={index} 
                className="bg-white/30 shadow flex justify-center items-center p-5 rounded-[5px] transform hover:scale-103 transition duration-300 font-mono hover:bg-white/50">
                  <div className=" text-black text-center">
                    <p>{item.text}</p>
                    <div className="grid text-end">
                      <h3>{item.name}</h3>
                      <h2>{item.role}</h2>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

         </div>
    </section>
  );
};

export default TravelersSection;
