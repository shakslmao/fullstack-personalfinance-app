import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { LoginValidationSchema } from "schemas";
import bcrpyt from "bcryptjs";
import { authenticateUser } from "data/user";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const fieldsValidated = LoginValidationSchema.safeParse(credentials);
                if (!fieldsValidated.success) {
                    throw new Error("Invalid login fields");
                }
                const { email, password } = fieldsValidated.data;
                const user = await authenticateUser(email, password);
                if (user) return user;
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
