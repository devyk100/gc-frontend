import axios from "axios";
import { AWS_LAMBDA_URL } from "./urls";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
    baseURL: AWS_LAMBDA_URL,
});


export const setAuthToken = (token: string) => {
    if (token) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};


export const clearAuthToken = () => {
    delete apiClient.defaults.headers.common["Authorization"];
};

apiClient.interceptors.request.use(async (config) => {
    const session = await getSession();
    console.log("Adding the auth header")
    if (session?.user?.token) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
});

export default apiClient;
