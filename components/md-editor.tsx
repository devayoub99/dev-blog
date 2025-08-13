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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }: { text: string }) => {
    console.log("Markdown content:", text);
    setContent(text);
  };

  const handleSave = async () => {
    await createPost(title, content);
  };

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-1 text-sm font-medium font-tajawal"
        >
          عنوان المقالة
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مقالة 1"
          className="w-full px-3 py-2 border border-black rounded-none font-tajawal focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-1 text-sm font-medium font-tajawal"
        >
          محتوى المقالة
        </label>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>

      <button
        className="px-4 py-2 mb-4 border rounded-md cursor-pointer"
        onClick={handleSave}
      >
        حفظ المقالة
      </button>
    </>
  );
}
