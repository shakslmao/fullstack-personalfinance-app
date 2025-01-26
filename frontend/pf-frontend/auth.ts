import NextAuth from "next-auth";
import { UserRoles, AccountStatus } from "types/auth";
import authConfig from "auth.config";
import { login } from "pages/api/api";

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
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "credentials") {
                try {
                    const response = await login({
                        email: user.email!,
                        password: user.password!,
                    });
                    if (response.token) {
                        user.token = response.token;
                        user.id = String(response.userId);
                        return true;
                    }
                } catch (error) {
                    console.error("SignIn Error:", error);
                    return false;
                }
            }
            return false;
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
    ...authConfig,
});
