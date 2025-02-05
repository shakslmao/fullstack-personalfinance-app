import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginValidationSchema } from "schemas";
import { authenticateUser, fetchUserDetails } from "data/user";
import { login } from "pages/api/api";
import authConfig from "auth.config";
import { AccountStatus } from "types/auth";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },

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

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            }

            if (!user.id) {
                console.error("User ID is undefined.");
                return false;
            }

            const userExists = await fetchUserDetails(user.id);
            if (userExists?.status === AccountStatus.ACTIVE_NON_AUTH) {
                return false;
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.token = user.token;
            }
            return token;
        },

        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    session: { strategy: "jwt" },
});
