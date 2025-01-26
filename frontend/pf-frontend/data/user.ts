import axios from "axios";
import { AuthenticationRequest, User } from "types/auth";

export const authenticateUser = async (
    email: string,
    password: string
): Promise<AuthenticationRequest | null> => {
    try {
        const loginResponse = await fetch("http://localhost:8090/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!loginResponse.ok) {
            throw new Error("Failed to authenticate user. Please check the email and password.");
        }

        const { userId } = await loginResponse.json();
        return userId;
    } catch (error) {
        console.error("Error authenticating user:", error);
        return null;
    }
};

export const fetchUserDetails = async (userId: string): Promise<User | null> => {
    try {
        const userDetailsResponse = await fetch(`http://localhost:8090/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
