import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { SignUpType } from "../types";

const api: AxiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: "http://localhost:5000",
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
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        try {
            if (["401", "403"].includes(error.code || "")) {
                // take access token from local storage
                const token = localStorage.getItem("accessToken");

                setHead(token || "");
            }
            // refresh = false;
            return error;
        } catch (err) {
            console.log(err);
        }

        return Promise.reject(error);
    },
);

// export const apiUserData = () => api.get("/users/me", { withCredentials: true });

// export const logout = () => api.post("/users/auth/signout", {}, { withCredentials: true });

export const signup = (data: SignUpType) => api.post("/auth/signup", data);
export const login = (data: SignUpType) => api.post("/auth/login", data);
export default api;
