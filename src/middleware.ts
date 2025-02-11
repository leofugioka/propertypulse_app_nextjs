import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { privateRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");

  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${nextUrl}`);
  }

  if (!isLoggedIn && isPrivateRoute) {
    const errorUrl = new URL("/error", nextUrl.origin);
    errorUrl.searchParams.set("message", "You must be signed in");
    errorUrl.searchParams.set("status", "401");
    return Response.redirect(errorUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
