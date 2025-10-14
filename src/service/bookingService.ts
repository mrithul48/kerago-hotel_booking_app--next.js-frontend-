
import { BookingPayload } from "@/components/BookingComponent";
import { api } from "@/lib/api";

export const bookingService = {
  async booking( bookingRequest: BookingPayload){

        const res = await api.post("/booking",bookingRequest)
        return res.data
    },
    async getAll(){
      const res = await api.get("/booking")
      return res.data
    },
    async bookingCancel(bookingId:number){
       const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/auth/login";
          return;
        }
      const res = await api.put(`booking/cancel/${bookingId}`)
      return res.data
    },
    async bookingById(){
      const res = await api.get("/booking/my");
      return res.data;
    }
}