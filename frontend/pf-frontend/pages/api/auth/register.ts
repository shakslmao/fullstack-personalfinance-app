import { NextApiRequest, NextApiResponse } from "next";
import { RegistrationResponse } from "types/auth";
import { TRegistrationValidationSchema } from "schemas";
import { api } from "../utils/api-client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationResponse | { error: string } | { message: string }>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const registrationDetails: TRegistrationValidationSchema = req.body;
        const response = await api.post("/api/v1/auth/register", registrationDetails);
        return res.status(200).json({
            id: response.data.id,
            email: response.data.email,
            message: "Registration Successful. Please Check Email For Activation Code",
        });
    } catch (error: any) {
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Internal Server Error",
        });
    }
}
