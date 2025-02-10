import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../utils/api-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    function getCookie(cookieHeader: string | undefined, name: string): string | null {
        if (!cookieHeader) return null;

        const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
        for (const cookie of cookies) {
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    try {
        const jwt = getCookie(req.headers.cookie, "jwt");

        if (!jwt) {
            return res.status(401).json({ error: "No JWT found in cookies" });
        }

        console.log("Incoming Cookies:", req.headers.cookie);
        const response = await api.get("/api/v1/users/me", {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie || "",
                Authorization: `Bearer ${jwt}`,
            },
        });
        return res.status(200).json(response.data);
    } catch (error: any) {
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Failed to fetch user details",
        });
    }
}
