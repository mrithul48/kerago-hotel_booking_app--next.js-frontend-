import axios, { AxiosError, AxiosRequestConfig} from "axios";
// Extend AxiosRequestConfig to allow _retry flag
// interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
//   _retry?: boolean;
// }
// import { error } from "console";

// Create axios instance
export const api = axios.create({
  baseURL: "http://localhost:8080/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to send multipart requests without changing global default
export const apiMultipart = (config: AxiosRequestConfig) => {
  return api({
    ...config,
    headers: {
      ...(config.headers || {}),
      "Content-Type": "multipart/form-data",
    },
  });
};

//Request interceptor (add token if available)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


// Automatically refresh token if 401 Unauthorized

// api.interceptors.response.use(
//   (response)=>response,
//   async(error:AxiosError)=>{
//     const originalRequest = error.config as AxiosRequestConfigWithRetry;


//     //only retry once
//     if(error.response?.status=== 401 && !originalRequest._retry){
//       originalRequest._retry=true;

//       try{
//         const refreshToken = localStorage.getItem("refreshToken");
//         if(!refreshToken){
//           // No refresh token → force logout
//            localStorage.removeItem("token");
//            localStorage.removeItem("refreshToken");
//            window.location.href = "/";
//            return Promise.reject(error);

//         }
//          // Call backend refresh endpoint
//          const res = await api.post("auth/refresh",{refreshToken,});
//          const newAccessToken = res.data.accessToken;

//          // Save new access token
//         localStorage.setItem("token", newAccessToken);

//          // Update failed request headers and retry
//         if (originalRequest.headers) {
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         }
//         return api(originalRequest);
//       }catch(refreshError){
//         console.error("Refresh token expired or invalid");
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// )

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);