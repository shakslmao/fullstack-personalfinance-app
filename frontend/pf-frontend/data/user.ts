import { gatewayApi } from "pages/api/utils/api-client";
import { User } from "types/auth";

export const fetchUserDetails = async (): Promise<User | null> => {
    try {
        const response = await fetch("/api/users/me", {
            method: "GET",
            credentials: "include",
        });

        if (!response) throw new Error("Failed ot Fetch User Details");

        const user = await response.json();
        return user;
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return null;
    }
};
