"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "./password";
import { generateTokens, verifyRefreshToken } from "./jwt";
import { User } from "./auth";
import { z } from "zod";

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function registerAction(prevState, formData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validate inputs
    const validatedData = registerSchema.parse(rawData);

    // Check if user already exist
    const existingUser = await User.findByEmail(validatedData.email);

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    // Hash password and create user
    const hashedPassword = hashPassword(validatedData.password);
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });

    // Generate tokens

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    // Set cookies
    const cookiesStore = cookies();

    (await cookiesStore).set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });
    (await cookiesStore).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    redirect("/");
  } catch (error) {
    if (error.name === "ZodError") {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    console.error("Registration error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function loginAction(prevState, formData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validate Inputs
    const validatedData = loginSchema.parse(rawData);

    const user = await User.findByEmail(validatedData.email);

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const isValidPassword = await verifyPassword(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);

    // Set cookies
    const cookiesStore = cookies();

    (await cookiesStore).set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });
    (await cookiesStore).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
  redirect("/");
}

export async function logoutAction() {
  const cookiesStore = cookies();

  (await cookiesStore).delete("accessToken");
  (await cookiesStore).delete("refreshToken");

  redirect("/");
}

export async function refreshTokenAction() {
  const cookiesStore = cookies();
  const refreshToken = (await cookiesStore).get("refreshToken")?.value;

  if (!refreshToken) {
    redirect("/login");
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user) {
      redirect("/login");
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens({
        userId: user.id,
        email: user.email,
      });

    // Set new cookies
    (await cookiesStore).set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });
    (await cookiesStore).set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Token refresh error:", error);
    redirect("/login");
  }
}
