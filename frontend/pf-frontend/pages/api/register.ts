"user server";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { RegistrationValidationSchema } from "../../schemas";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const fieldsValidated = RegistrationValidationSchema.safeParse(req.body);
    if (!fieldsValidated.success) {
        return res.status(400).json({
            error: "Invalid input fields",
            details: fieldsValidated.error.format(),
        });
    }

    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/users/register",
            fieldsValidated.data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || "Registration failed";
            res.status(status).json({ error: message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
}
