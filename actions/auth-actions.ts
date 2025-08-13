"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const loginAction = async function (data) {
  try {
    // * [1] Input validation
    if (!data?.email || !data?.password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    // const token = jwt.sign(tokenPayload, );

    return {
      message: `Login successful. Welcome ${user.name}`,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
};

export const registerAction = async function (data) {
  try {
    // * [1] Input validation
    if (!data.name || !data?.email || !data?.password) {
      return {
        success: false,
        message: "All fields are required!",
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      return {
        success: false,
        message: "You already have an account!",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    if (newUser) {
      return {
        success: true,
        message: `User created successfully. Welcome ${newUser.name}`,
      };
    }
  } catch (error) {
    console.error("Register error:", error.message);
    return {
      success: false,
      message: "An error occurred during register",
    };
  }
};
