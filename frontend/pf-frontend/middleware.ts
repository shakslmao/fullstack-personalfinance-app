import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./utils/jwt";
import { LOGIN_REDIRECT, publicRoutes } from "./routes";

export function middleware(req: NextRequest) {
    console.log("Checking authentication in middleware...");
    console.log("Cookies:", req.cookies.getAll());
    const { nextUrl } = req;
    const token =
        req.cookies.get("jwt")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");

    console.log("Token found in cookies:", token);

    const decodedToken = token ? verifyJwt(token) : null;

    if (publicRoutes.includes(nextUrl.pathname)) {
        console.log("Public route, skipping auth check...");
        return NextResponse.next();
    }

    if (!decodedToken) {
        console.log("No valid token, redirecting to /auth/login...");
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (["/auth/login", "/auth/register"].includes(nextUrl.pathname)) {
        console.log("Already authenticated, redirecting to dashboard...");
        return NextResponse.redirect(new URL(LOGIN_REDIRECT, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
