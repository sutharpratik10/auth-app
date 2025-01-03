/**
 * An Array of routes that are accessible to the public and do not requires authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/mail-verification"
];

/**
 * An Array of routes that are requires authentication
 * these routes will redirects loggedIn users to /settings
 * @type {string[]}
 */
export const authRoutes=[
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/**
 * The prefix for API authentication routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after loggings in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"