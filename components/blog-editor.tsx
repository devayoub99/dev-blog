"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import { createPost } from "@/actions/post-actions";

export default function BlogEditor() {
  const editorRef = useRef<EditorJS | null>(null);

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editor",
      tools: {
        paragraph: Paragraph,
        header: Header,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/upload",
              byUrl: "/api/fetchUrl",
            },
          },
        },
      },
      onReady: () => {
        editorRef.current = editor;
      },
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  const handleSave = async () => {
    const content = await editorRef.current?.save();

    await createPost(title, content);
  };

  return (
    <div dir="rtl">
      <input
        name="title"
        placeholder="Article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div id="editor" className="border p-2 rounded-md" />
      <button
        className="border rounded-md py-2 px-4 mt-2 cursor-pointer"
        onClick={handleSave}
      >
        حفظ المقالة
      </button>
    </div>
  );
}
