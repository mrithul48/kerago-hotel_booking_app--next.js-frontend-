import { api } from "@/lib/api"

export const statusService = {
    async getStatus(){
        const res = await api.get("v1/chart");
        return res.data
    }
}