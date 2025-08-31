import { getPost } from "@/actions/post-actions";
import PostContent from "@/components/md-viewer";
import { notFound } from "next/navigation";

export default async function Post({ params, searchParams }) {
  const { slug } = params;
  const { id } = searchParams;

  if (!id) {
    notFound();
  }

  const data = await getPost(parseInt(id));

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PostContent post={data} />
    </div>
  );
}
