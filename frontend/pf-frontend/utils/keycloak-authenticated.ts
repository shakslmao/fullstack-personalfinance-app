"use client";

import { useKeycloak } from "@/context/keycloak-provider";
import axios from "axios";

const fetchAuthenticatedData = async () => {
    const keycloak = useKeycloak();
    if (keycloak && keycloak.authenticated) {
        const token = keycloak.token;

        try {
            const response = await axios.get("http://localhost:8222/api/v1/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data); // Use the fetched data
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    } else {
        console.error("User is not authenticated");
    }
};

export default fetchAuthenticatedData;
