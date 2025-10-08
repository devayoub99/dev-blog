import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/dashboard"];

export default async function middleware(request: NextRequest) {
  try {
    const session = await auth();

    // request pathname
    const { pathname } = request.nextUrl;

    // Redirect authenticated users away from login page
    if (
      (session && pathname === "/login") ||
      (session && pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Check if protected
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // Prevent access to protected routes for not authenticated users
    if (isProtected && !session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Continue to route if (user authenticated || the route is not protected)
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error, redirect to login for protected routes
    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    return NextResponse.next();
  }
}
