"use server";

import axios from "axios";
import { AuthenticationResponse, RegistrationResponse } from "../../types/auth";
import {
    TActivationTokenSchema,
    TLoginValidationSchema,
    TRegistrationValidationSchmea,
    TResetPasswordValidationSchema,
} from "../../schemas";
import { LOGIN_REDIRECT, REGISTER_REDIRECT } from "routes";

const NEXT_PUBLIC_API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;
const NEXT_PUBLIC_API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

const api = axios.create({
    baseURL: NEXT_PUBLIC_API_AUTH_URL,
    headers: { "Content-Type": "application/json" },
});

const gatewayApi = axios.create({
    baseURL: NEXT_PUBLIC_API_AUTH_URL,
    headers: { "Content-Type": "application/json" },
});

export const register = async (
    userRegistrationDetails: TRegistrationValidationSchmea
): Promise<RegistrationResponse> => {
    try {
        const { data } = await api.post<RegistrationResponse>(
            "/api/v1/auth/register",
            userRegistrationDetails
        );
        return data;
    } catch (error) {
        console.error("Registration Failed", error);
        throw error;
    }
};

export const login = async (
    loginDetails: TLoginValidationSchema
): Promise<AuthenticationResponse> => {
    try {
        const { data } = await api.post<AuthenticationResponse>("/api/v1/auth/login", loginDetails);
        console.log("Login Response:", data);

        if (data.token) {
            document.cookie = `jwt=${data.token}; Path=/; Secure; HttpOnly`;
        }

        return data;
    } catch (error) {
        console.error("Failed to Login", error);
        throw error;
    }
};

export const activate = async (activationCode: TActivationTokenSchema) => {
    try {
        const { data } = await api.post("/api/v1/auth/activate", activationCode);
        console.log("activation response:", data);
        return data;
    } catch (err) {
        console.log("Failed to Activate Account with Token");
        throw err;
    }
};

export const resetPassword = async (resetCredentials: TResetPasswordValidationSchema) => {
    const { data } = await gatewayApi.post("/api/v1/users/reset", resetCredentials);
    return data;
};
