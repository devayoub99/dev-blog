import { getPost } from "@/actions/post-actions";
import PostContent from "@/components/md-viewer";

export default async function Post({ params, searchParams }) {
  const { slug } = await params;
  const { id } = await searchParams;

  const data = await getPost(parseInt(id));

  console.log("data", data);
  const { title, content, published, author } = data;

  return <PostContent post={data} />;
}
