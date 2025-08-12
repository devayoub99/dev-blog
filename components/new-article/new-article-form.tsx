import prisma from "@/lib/prisma";
import slugify from "slugify";
import BlogEditor from "../blog-editor";
import MarkdownEditor from "../md-editor";

export default function NewArticleForm() {
  const formAction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const slug = slugify(title);

    try {
      const response = await prisma.post.create({
        data: { title, slug, authorId: 1 },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // return <BlogEditor />;
  return <MarkdownEditor />;
}
