import ReactMarkdown from "react-markdown";
import Container from "./container";

export default function PostContent({ post }) {
  console.log("post", post.content);
  return (
    <Container>
      <div className="prose text-right max-w-none prose-neutral dark:prose-invert rtl">
        <h1 className="my-4 text-2xl font-medium text-center font-tajawal">
          {post.title}
        </h1>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <p className="mt-4 text-sm text-gray-500">By: {post.author.name}</p>
      </div>
    </Container>
  );
}
