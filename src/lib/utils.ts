export interface Hotels {
  hotelId?: number; 
  name: string;
  location: string;
  description: string;
  room: Room[];
  imageList: Image[];
  amenities?:string[];
}

export interface Room {
  roomId?:number;
  roomTypes: string;
  roomAvailableQuantity: number;
  pricePerNight: number;
}

export interface Image {
  id: number;
  url: string;
}


