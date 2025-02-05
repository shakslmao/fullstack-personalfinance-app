"use server";

import api from "pages/api/api";
import { User } from "types/auth";

export const fetchUserDetails = async (userId: string | undefined): Promise<User | null> => {
    if (!userId) {
        console.error("User ID is undefined.");
        return null;
    }

    try {
        const { data } = await api.get<User>("/api/v1/users");

        if (!data) {
            throw new Error("Failed to fetch user details.");
        }

        return data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
