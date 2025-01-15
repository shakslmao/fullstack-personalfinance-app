"use client";

import { useState, createContext, useContext, useEffect, ReactNode } from "react";
import Keycloak from "keycloak-js";

const KeycloakContext = createContext<Keycloak | null>(null);

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);

    useEffect(() => {
        const kc = new Keycloak({
            url: "http://localhost:9098",
            realm: "personal-finance",
            clientId: "personal-finance",
        });
        kc.init({ onLoad: "login-required" }).then((authenticated) => {
            if (!authenticated) kc.login()
            setKeycloak(kc);
        });
    }, []);

    return (
        <KeycloakContext.Provider value={keycloak}>{keycloak && children}</KeycloakContext.Provider>
    );;
};

export const useKeycloak = () => {
    const context = useContext(KeycloakContext);
    if (!context) throw new Error("Error Keycloak Context");
    return context;
};
