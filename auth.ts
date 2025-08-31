import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Make sure credentials exist
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email);
        const password = String(credentials.password);

        try {
          const { default: prisma } = await import("./lib/prisma");
          const { verifyPassword } = await import("./lib/password");

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) return null;

          return {
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
});
