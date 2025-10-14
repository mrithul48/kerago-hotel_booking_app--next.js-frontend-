
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LandingHeader from "@/components/LandingHeader";
import PartnersSection from "@/components/Partners";
import TravelersSection from "@/components/Travelers";

export default function Home() {
  return (
    <div>
      <LandingHeader/>
      <Hero/>
      <TravelersSection/>
      <PartnersSection/>
     <Footer/>
    </div>
  );
}
