import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./utils/jwt";
import { LOGIN_REDIRECT, publicRoutes } from "./routes";

export function middleware(req: NextRequest) {
    const { nextUrl } = req;

    const token =
        req.cookies.get("jwt")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");

    const decodedToken = token ? verifyJwt(token) : null;

    if (publicRoutes.includes(nextUrl.pathname)) {
        return NextResponse.next();
    }

    if (!decodedToken) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (["/auth/login", "auth/regiser"].includes(nextUrl.pathname)) {
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
