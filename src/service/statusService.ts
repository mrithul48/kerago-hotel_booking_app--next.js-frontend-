import { api } from "@/lib/api"

export const statusService = {
    async getStatus(){
        const res = await api.get("/chart");
        return res.data
    }
}