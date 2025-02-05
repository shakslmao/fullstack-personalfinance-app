"use server";

import { User } from "types/auth";

export const fetchUserDetails = async (userId: string | undefined): Promise<User | null> => {
    if (!userId) {
        console.error("User ID is undefined.");
        return null;
    }

    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

    if (!token) {
        console.error("No authentication token found.");
        return null;
    }

    try {
        const userDetailsResponse = await fetch(`http://localhost:8090/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ✅ Include JWT token
            },
        });

        if (!userDetailsResponse.ok) {
            throw new Error("Failed to fetch user details.");
        }

        const userDetails = await userDetailsResponse.json();
        return userDetails;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
