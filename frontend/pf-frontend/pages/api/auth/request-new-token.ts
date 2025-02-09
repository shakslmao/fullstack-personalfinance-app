import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../utils/api-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const { email } = req.body;
        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Missing or Invalid Email " });
        }

        const response = await api.post(`/api/v1/auth/request-new-token`, { email });
        return res.status(200).json({ success: true, message: response.data.message });
    } catch (error: any) {
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Failed to request new activation token.",
        });
    }
}
