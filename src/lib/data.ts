import {
 
  UtensilsCrossed,
  BedDouble,
  Wifi,
  Tv,
  Coffee,
  Dumbbell,
  Snowflake,
  ShowerHead,
  Users,
  ShieldCheck,
  Waves,
  Dog,
  ParkingCircle,
} from "lucide-react";

import room1 from "../../public/images/room-1.jpg"
import room2 from "../../public/images/room-2.jpeg"
import room3 from "../../public/images/room-3.webp"

//aminity
export const amenitiesList = [
  { title: "Free Wi-Fi", icon: Wifi },
  { title: "Restaurant", icon: UtensilsCrossed },
  { title: "Room Service", icon: Coffee },
  { title: "Family Rooms", icon: Users },
  { title: "Car Parking", icon: ParkingCircle },
  { title: "Air Conditioning", icon: Snowflake },
  { title: "Swimming Pool", icon: Waves },
  { title: "Gym", icon: Dumbbell },
  { title: "TV", icon: Tv },
  { title: "Luxury Beds", icon: BedDouble },
  { title: "Pet Friendly", icon: Dog },
  { title: "Hot Shower", icon: ShowerHead },
  { title: "Security 24/7", icon: ShieldCheck },
];




export const testimonials = [
  { name: "Sarah Chen", role: "Business Traveler", text: "Kerago transformed how I book hotels. The room selection process is seamless and the pricing is transparent." },
  { name: "Marcus Rodriguez", role: "Travel Blogger", text: "As someone who books 50+ hotels annually, Kerago's efficiency is unmatched. The luxury room filters are perfect." },
  { name: "Emily Watson", role: "Event Coordinator", text: "Managing group bookings has never been easier. The dashboard gives us complete control over our reservations." }
];


export const hotelRoom = [
  {title:"NORMAL",image:room1},
    {title:"LUXURY",image:room2},
  {title:"DELUXE",image:room3}

]


export const roomDescription = [
  {
    id: 1,
    name: "NORMAL",
    description: "A cozy, well-furnished room ideal for solo travelers or couples, featuring a queen bed, free Wi-Fi, and a modern bathroom.",
  },
  {
    id: 2,
    name: "DELUXE",
    description: "Spacious and stylish with premium bedding, city or pool view, minibar, and 24-hour room service.",
  },
  {
    id: 3,
    name: "LUXURY",
    description: "Elegant comfort with added space, work desk, flat-screen TV, and complimentary breakfast.",
  },
];

