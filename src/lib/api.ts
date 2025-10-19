import axios, { AxiosError, AxiosRequestConfig} from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/v1";
console.log(" API Base URL:", baseURL); 
export const api = axios.create({
  // baseURL: "http://localhost:8080/v1",
  baseURL: baseURL,
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