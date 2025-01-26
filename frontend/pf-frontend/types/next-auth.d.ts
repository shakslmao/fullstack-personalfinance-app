// types/next-auth.d.ts
import "next-auth";
import { UserRoles, AccountStatus } from "./types/auth";

declare module "next-auth" {
    interface User {
        id: string;
        email?: string;
        token?: string;
        password?: string;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            token?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email?: string;
        token?: string;
    }
}
