"use server";

import prisma from "@/lib/prisma";

export async function getUserProfile(email: string) {
  const data = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,

      // Profile info
      title: true,
      bio: true,
      location: true,
      website: true,
      avatar: true,
      coverImage: true,

      // Social Links
      githubUsername: true,
      twitterUsername: true,
      linkedinUsername: true,

      // Statistics
      postsCount: true,
      followersCount: true,
      followingCount: true,

      activities: {
        take: 10,
        orderBy: { createdAt: "desc" }, // Most recent first
      },
    },
  });

  return data;
}
