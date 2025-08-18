import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define the route patterns

  const protectedRoutes = ["/dashboard"];
  const authRoutes = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get token from Cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isAuthenticated = false;

  // Check access token
  if (accessToken) {
    console.log("MW accessToken", accessToken);
    try {
      await jwtVerify(accessToken, JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      // Access token is invalid, check the refresh token
      if (refreshToken) {
        console.log("MW refreshToken", refreshToken);

        try {
          const JWT_REFRESH_SECRET = new TextEncoder().encode(
            process.env.JWT_REFRESH_SECRET
          );
          await jwtVerify(refreshToken, JWT_REFRESH_SECRET);
          isAuthenticated = true;
        } catch (refreshError) {
          // Both tokens invalid
          console.log("Both tokens invalid!");
          isAuthenticated = false;
        }
      }
    }
  }

  // Redirect logic
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
