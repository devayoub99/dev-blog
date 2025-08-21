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

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};
