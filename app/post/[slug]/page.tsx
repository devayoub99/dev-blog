import { getPost } from "@/actions/post-actions";
import PostContent from "@/components/md-viewer";
import { notFound } from "next/navigation";

export default async function Post({ params, searchParams }) {
  const { slug } = await params;
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const data = await getPost(parseInt(id));

  if (!data) {
    notFound();
  }

  const { title, content, published, author } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PostContent post={data} />
    </div>
  );
}
