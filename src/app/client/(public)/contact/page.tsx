
import TravelersSection from "@/components/Travelers";
import React from "react";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}
const Travel: React.FC = () => {
  return (
    <div>
      <TravelersSection/>
    </div>
  );
};

export default Travel;
