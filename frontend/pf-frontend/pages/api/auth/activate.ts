import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../utils/api-client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ success: boolean; message: string } | { error: string }>
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            return res.status(400).json({ error: "Missing or invalid activation token" });
        }

        const response = await api.get(`/api/v1/auth/activate`, {
            params: { token },
        });

        return res.status(200).json({ success: true, message: response.data.message });
    } catch (error: any) {
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Internal Server Error",
        });
    }
}
