"use client";

import ReactMarkdown from "react-markdown";

export default function PostContent({ post }) {
  console.log("post", post.content);
  return (
    <div className="prose max-w-none prose-neutral dark:prose-invert rtl text-right">
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <p className="mt-4 text-sm text-gray-500">By: {post.author.name}</p>
    </div>
  );
}
