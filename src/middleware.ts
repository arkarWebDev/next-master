import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
const { auth: middleware } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_HOME_REDIRECT,
  publicRoutes,
  authRoutes,
  publicRoutePatterns,
} from "@/routes";

export default middleware((req: any): Response | undefined => {
  console.log("ROUTE => ", req.nextUrl.pathname);
  console.log("AUTH INFO => ", req.auth);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    publicRoutePatterns.some((pattern) => pattern.test(nextUrl.pathname));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_HOME_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
