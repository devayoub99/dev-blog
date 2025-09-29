"use server";

import prisma from "@/lib/prisma";

export async function getUserProfile(email: string) {
  const data = await prisma.user.findUnique({
    where: { email },
    select: {
      // ... specific fields only
      coverImage: true,
      bio: true,
      // stats
      postsCount: true,
      followersCount: true,
      followingCount: true,
      email: true,
      website: true,
      // Social
      githubUsername: true,
      twitterUsername: true,
      linkedinUsername: true,
      // activities: {
      //   take: 10,
      //   orderBy: { createdAt: "desc" }, // Most recent first
      //   select: {
      //   },
      // },
    },
  });

  return data;
}
