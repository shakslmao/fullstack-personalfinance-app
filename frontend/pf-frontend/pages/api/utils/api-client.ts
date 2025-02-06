import axios from "axios";

const NEXT_PUBLIC_API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;
const NEXT_PUBLIC_API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const gatewayApi = axios.create({
    baseURL: NEXT_PUBLIC_API_GATEWAY_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

export const api = axios.create({
    baseURL: NEXT_PUBLIC_API_AUTH_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});
