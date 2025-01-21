"user server";

import {
    TRegistrationValidationSchmea,
    TLoginValidationSchema,
    TResetPasswordValidationSchema,
} from "@/schemas";
import axios from "axios";

const API_AUTH_URL = "http://localhost:8090";
const API_GATEWAY_URL = "http://localhost:8222";

const api = axios.create({
    baseURL: API_AUTH_URL,
    headers: { "Content-Type": "application/json" },
});

const gatewayApi = axios.create({
    baseURL: API_GATEWAY_URL,
    headers: { "Content-Type": "application/json" },
});

export const register = async (userRegistrationDetails: TRegistrationValidationSchmea) => {
    const { data } = await api.post("/api/v1/auth/register", userRegistrationDetails);
    return data;
};

export const login = async (loginDetails: TLoginValidationSchema) => {
    const { data } = await api.post("/api/v1/auth/login", loginDetails);
    return data;
};

export const resetPassword = async (resetCredentials: TResetPasswordValidationSchema) => {
    const { data } = await gatewayApi.post("/api/v1/users/reset", resetCredentials);
    return data;
};
