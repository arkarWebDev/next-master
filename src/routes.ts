/**
 * Routes accessible to the public
 * Doesn't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/faq", "/about"];

/**
 * Routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Routes will redirect users to /auth/login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/auth/login";

/**
 * Routes will redirect users to /
 * @type {string}
 */
export const DEFAULT_HOME_REDIRECT = "/";
