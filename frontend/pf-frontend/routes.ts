/**
 * Public routes that do not require authentication
 */
export const publicRoutes = [
    "/",
    "/auth/register",
    "/auth/activate",
    "/auth/new-password",
    "/auth/login",
];

/**
 * Default redirect after login
 */
export const LOGIN_REDIRECT = "/dashboard";

export const REGISTER_REDIRECT = "/auth/activate";
