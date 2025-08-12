"use client";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { createPost } from "@/actions/post-actions";

const mdParser = new MarkdownIt();

export default function MarkdownEditor() {
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }: { text: string }) => {
    console.log("Markdown content:", text);
    setContent(text);
  };

  const handleSave = async () => {
    await createPost("POST 2 STATIC TITLE", content);
  };

  return (
    <>
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <button
        className="border rounded-md py-2 px-4 mt-2 cursor-pointer"
        onClick={handleSave}
      >
        حفظ المقالة
      </button>
    </>
  );
}
