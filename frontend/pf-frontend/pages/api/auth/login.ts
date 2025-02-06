import { NextApiRequest, NextApiResponse } from "next";
import { TLoginValidationSchema } from "schemas";
import { api } from "../utils/api-client";
import { AuthenticationResponse } from "types/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthenticationResponse | { error: string }>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    try {
        const loginDetails: TLoginValidationSchema = req.body;
        const response = await api.post("/api/v1/auth/login", loginDetails, {
            withCredentials: true,
        });

        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
            res.setHeader("Set-Cookie", setCookieHeader);
        } else {
            console.warn("Set-Cookie Missing From Backend Response");
        }

        console.log("Backend response", response.data);
        const { userId, token } = response.data;
        if (!token) throw new Error("Missing JWT");

        return res.status(200).json({ userId, token });
    } catch (error: any) {
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Internal Server Error",
        });
    }
}
