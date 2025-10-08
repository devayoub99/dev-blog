"use server";

import { signIn, signOut } from "@/auth";

export const login = async (provider: string, data?: any) => {
  if (provider === "credentials") {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard", // this works if NEXTAUTH_URL is set
    });
  } else {
    await signIn(provider, { redirectTo: "/dashboard" });
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    const { hashPassword } = await import("@/lib/password");

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash the password
    const hashedPassword = await hashPassword(data.password);

    // Create the user and welcome activity in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // 1. Create the user
      const newUser = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          // Initialize stats
          postsCount: 0,
          followersCount: 0,
          followingCount: 0,
        },
      });

      // 2. Create welcome activity
      await tx.activity.create({
        data: {
          userId: newUser.id,
          type: "COMMUNITY_JOINED",
          title: "Joined the community",
          metadata: {
            registrationDate: new Date().toISOString(),
            source: "registration",
          },
        },
      });

      return newUser;
    });

    // Automatically sign in the user after registration
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard",
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const logout = async () => {
  await signOut({ 
    redirectTo: process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/login` : "/login" 
  });
};
