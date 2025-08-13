import prisma from "@/lib/prisma";
import slugify from "slugify";
import BlogEditor from "../blog-editor";
import MarkdownEditor from "../md-editor";

export default function NewArticleForm() {
  return <MarkdownEditor />;
}
