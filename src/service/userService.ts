// import { User } from "@/app/admin/users/page";
import { UserData } from "@/app/admin/users/page";
import { api } from "@/lib/api"

export const userService = {
    async adminRegister(formData:UserData){
        const res = await api.post("users/admin/register",formData);
        return res.data
    },
    async getAll(){
        const res = await api.get("/users");
            return res.data
        
    },
    async updateUser(id:number,formData:UserData){
        const res = await api.put(`/users/${id}`,formData);
        return res.data
    },
    async deleteUser(id:number){
        const res = await api.delete(`/users/${id}`)
        return res.data
    }
}