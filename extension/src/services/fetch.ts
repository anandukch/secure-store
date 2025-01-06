import { StorageEnum } from "../common/enum";
import { browserService } from "./browser";

class FetchService {
    readonly baseUrl: string = "http://localhost:5050/api";
    DEFAULT_HEADERS: HeadersInit = {
        "Content-Type": "application/json",
    };

    async getToken() {
        const data = await browserService.getData("token", StorageEnum.LOCAL);
        if (!data || !data.token) {
            throw new Error("Token is undefined");
        }
        return data.token;
    }

    async post(url: string, data: any) {
        const token = await this.getToken();
        console.log("fetch serice token", token);

        const headers = { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` };
        return fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });
    }

    async get(url: string) {
        const token = await this.getToken();
        const headers = { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` };
        return fetch(`${this.baseUrl}${url}`, {
            method: "GET",
            headers,
        });
    }

    async put(url: string, data: any) {
        const token = await this.getToken();
        const headers = { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` };
        return fetch(`${this.baseUrl}${url}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
        });
    }
}

export const fetchService = new FetchService();
