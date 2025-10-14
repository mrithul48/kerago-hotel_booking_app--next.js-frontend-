import { HotelDataUpdateProps, HotelProps} from "@/app/admin/hotel/page";
import { api, apiMultipart } from "@/lib/api"



export const hotelService = {

    //fetch hotel
    async getAll(){
        const res = await api.get("/hotels");
        return res.data
    },
    async getById(id:number|string){
        const res = await api.get(`/hotels/${id}`);
        return res.data
    },
    async getByCategory(category:string){
        const res = await api.get(`/hotels/${category}`);
        return res.data
    },

    //update hotel
    async updateHotel(id:number,hotelDataToSend:HotelDataUpdateProps){
        const res = await api.put(`/hotels/${id}`,hotelDataToSend);
        return res.data
    },

    //delete hotel
    async deleteHotel(id:number){
        const res = await api.delete(`/hotels/${id}`);
        return res.data
    },
    //hotel register
    async registerHotel(hotelData:HotelProps,imageFile?:File){
        const formData = new FormData();
        formData.append( "hotelRequest",
           new Blob([JSON.stringify(hotelData)], { type: "application/json" }));

        if(imageFile) formData.append("file",imageFile);

        const res = await apiMultipart({
            url:"/hotels/register",
            method:"POST",
            data:formData,
             headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")||""}`, // if JWT needed
    },
        });
        return res.data;
    },
    
};

