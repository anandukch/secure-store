import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { VaultRequest } from "../services/vault";

const api: AxiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: "http://localhost:5050/api",
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const setHead = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// export const verifyToken = () => api.get("/users/auth/tokens", { withCredentials: true });

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// let refresh = false;
// api.interceptors.response.use(
//     (response: AxiosResponse) => {
//         return response;
//     },
//     async (error: AxiosError) => {
//         try {
//             if (["401", "403"].includes(error.code || "")) {
//                 // take access token from local storage
//                 const token = localStorage.getItem("accessToken");

//                 setHead(token || "");
//             }
//             // refresh = false;
//             return error;
//         } catch (err) {
//             console.log(err);
//         }

//         return Promise.reject(error);
//     },
// );

// export const apiUserData = () => api.get("/users/me", { withCredentials: true });

// export const logout = () => api.post("/users/auth/signout", {}, { withCredentials: true });

export const signup = (data: any) => api.post("/auth/signup", data);
export const login = (data: any) => api.post("/auth/login", data);

export const getUserAttributes = (data: any) => api.post("/users/attributes", data);
export const createProject = (data: any) => api.post("/projects", data);
export const getProjects = () => api.get("/projects");
export const getProject = (id: string) => api.get(`/projects/${id}`);
export const createVaults = (data: VaultRequest) => api.post("/vaults", data);
export const getSecrets = () => api.get("/vaults");
export const getSecret = (id: string) => api.get(`/vaults/${id}`);
export const verifyUser = (token: string) => {
    setHead(token);
    return api.get("/auth/verify-token");
};
export const verifyOtp = (otp: string) => {
    return api.post("/auth/verify-otp", { otp: otp });
};
export default api;
