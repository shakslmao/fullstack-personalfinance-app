/**
 *  Routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/auth/register", "/auth/new-verification", "/auth/new-password"];

// Hide Routes that are used for authentication, they will be redirected to the home page if the user is already authenticated
export const authenticatedRoutes = ["/auth/login", "/auth/error", "/auth/reset"];

/**
 *  Routes that are for API authentication purposes,
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *  Default redirect for login
 * @type {string[]}
 */
export const LOGIN_REDIRECT = "/dashboard";
