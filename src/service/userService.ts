// import { User } from "@/app/admin/users/page";
import { UserData } from "@/app/admin/users/page";
import { api } from "@/lib/api"

export const userService = {
    async adminRegister(formData:UserData){
        const res = await api.post("v1/users/admin/register",formData);
        return res.data
    },
    async getAll(){
        const res = await api.get("v1//users");
            return res.data
        
    },
    async updateUser(id:number,formData:UserData){
        const res = await api.put(`v1/users/${id}`,formData);
        return res.data
    },
    async deleteUser(id:number){
        const res = await api.delete(`v1/users/${id}`)
        return res.data
    }
}