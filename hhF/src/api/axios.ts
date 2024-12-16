import axios from 'axios'
import {AppConfig} from "../config.ts";

export const apiClient = axios.create({
    baseURL: AppConfig.baseUrl
})

export const registerUser = async (userData: { password: string; email: string; name: string }) => {
    return await apiClient.post(`/auth/register`, userData)
}

export const login = async (email:string, password:string) => {
    try {
        const res = await apiClient.post('/auth/login', {email, password});
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

apiClient.interceptors.request.use((req) => {
    req.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    return req;
})

//?