"use server";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export async function refreshTokenAction() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    return { success: false, error: "No refresh token" };
  }

  try {
    const JWT_REFRESH_SECRET = new TextEncoder().encode(
      process.env.JWT_REFRESH_SECRET
    );

    const { payload } = await jwtVerify(refreshToken, JWT_REFRESH_SECRET);

    // Generate new access token
    const newAccessToken = await new SignJWT({ userId: payload.userId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // Set new access token cookie
    cookies().set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    return { success: true };
  } catch (error) {
    // Refresh token invalid, clear cookies
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return { success: false, error: "Invalid refresh token" };
  }
}

// Helper function to validate and refresh tokens
async function validateToken() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token");
  }

  try {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);
    return payload; // Token is valid
  } catch (error) {
    // Access token invalid, try refresh
    const refreshResult = await refreshTokenAction();
    if (refreshResult.success) {
      // Get the new access token and validate it
      const newAccessToken = (await cookies()).get("accessToken")?.value;
      const { payload } = await jwtVerify(newAccessToken, JWT_SECRET);
      return payload;
    } else {
      throw new Error("Authentication failed");
    }
  }
}

// Use in your protected Server Actions
export async function someProtectedAction() {
  try {
    const user = await validateToken();
    // Your action logic here
    return { success: true, data: "some data" };
  } catch (error) {
    return { success: false, error: "Unauthorized" };
  }
}
