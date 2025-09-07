"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

interface PostContent {
  content: {
    version: string;
    time: number;
    blocks: [{ data: { text: string }; id: string; type: string }];
  };
}

export async function createPost(title: string, content: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const author = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!author) {
    throw new Error("Author not found");
  }

  const slug = slugify(title);
  try {
    const response = await prisma.post.create({
      data: { title, slug, content, authorId: author.id },
    });

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getPost(id: number) {
  try {
    const response = await prisma.post.findUnique({
      where: { id },
      select: {
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
