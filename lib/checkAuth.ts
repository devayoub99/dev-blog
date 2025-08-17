"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const validateTokenAndRedirect = async () => {
  const validation = await validateToken();

  if (validation.success) {
    redirect("/");
  }

  return validation;
};

export const validateToken = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return { success: false, error: "No token found", user: null };
    }

    if (!process.env.JWT_SECRET) {
      return { success: false, error: "JWT_SECRET not configured", user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, error: null, user: decoded };
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return { success: false, error: "Invalid token", user: null };
    }

    return { success: false, error: "Unexpected error", user: null };
  }
};
