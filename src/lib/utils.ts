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


export const formatDateToDDMMYYYY = (dateString: string): string => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

