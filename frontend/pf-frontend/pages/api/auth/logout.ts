import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../utils/api-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const response = await api.post(
            "/api/v1/auth/logout",
            {},
            {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            }
        );
        
        res.setHeader("Set-Cookie", "jwt=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None");
        return res.status(response.status).json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.error("Logout error:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Logout Failed",
        });
    }
}
