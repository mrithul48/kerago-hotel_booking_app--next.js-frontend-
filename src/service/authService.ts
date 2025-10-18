// import { RegisterForm } from "@/components/auth/RegisterForm";
import { RegisterForm } from "@/components/auth/RegisterModel";
import { api } from "@/lib/api";

export const authService = {
  //login
  async login(username: string, password: string) {
    const res = await api.post("v1/auth/login", { username, password });
   
    
    
    // Store tokens after login
    if (res.data.token ) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",res.data.role);
      localStorage.setItem("username",res.data.username);
      // localStorage.setItem("refreshToken", res.data.refreshToken);
    }

    return res.data;
  },

   //logout
    async logout() {
    // const refreshToken = localStorage.getItem("refreshToken");

    // Optional: call backend to delete refresh token
    // if (refreshToken) {
    //   await api.post("/auth/logout", { refreshToken });
    // }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    window.location.href = "/";
  },

  //  async refresh() {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   if (!refreshToken) throw new Error("No refresh token available");

  //   const res = await api.post("/auth/refresh", { refreshToken });
  //   localStorage.setItem("token", res.data.accessToken);
  //   return res.data;
  // },
  async register(userRegister:RegisterForm){
    const res = await api.post("v1/users",userRegister)
    return res.data
  }
};
