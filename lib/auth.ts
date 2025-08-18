import { cookies } from "next/headers";
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "./jwt";
import prisma from "./prisma";
import { hashPassword } from "./password";

export class User {
  static async findByEmail(email) {
    console.log("Finding user by email...");
    return await prisma.user.findUnique({ where: { email } });
  }

  static async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async create(userData) {
    const hashedPassword = await hashPassword(userData.password);

    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
  }
}

export async function getUser() {
  const cookiesStore = cookies();
  const accessToken = (await cookiesStore).get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const decoded = verifyAccessToken(accessToken);

    const user = await User.findById(decoded.userId);

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };
  } catch (error) {
    // Try to refresh token
    const refreshToken = (await cookiesStore).get("refreshToken")?.value;

    if (!refreshToken) {
      return null;
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (user) {
        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          generateTokens({ userId: user.id, email: user.email });

        // Set new Cookies
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

        return user;
      }
    } catch (refreshTokenError) {
      return null;
    }
  }

  return null;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error("Authentication required!");
  }

  return user;
}
