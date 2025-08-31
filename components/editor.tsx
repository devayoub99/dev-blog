"use client";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import { useState, useEffect } from "react";
import { createPost } from "@/actions/post-actions";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";

// Enhanced markdown parser with plugins
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
// Add syntax highlighting support if you have the plugin
// .use(require('markdown-it-highlightjs'))
// Add other useful plugins as needed
export default function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [wordCount, setWordCount] = useState(0);

  // Auto-save draft to localStorage
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (title || content) {
        localStorage.setItem(
          "draft",
          JSON.stringify({ title, content, excerpt, tags })
        );
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [title, content, excerpt, tags]);

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft) {
      try {
        const {
          title: draftTitle,
          content: draftContent,
          excerpt: draftExcerpt,
          tags: draftTags,
        } = JSON.parse(draft);
        if (draftTitle) setTitle(draftTitle);
        if (draftContent) setContent(draftContent);
        if (draftExcerpt) setExcerpt(draftExcerpt);
        if (draftTags) setTags(draftTags);
      } catch (e) {
        console.warn("Failed to load draft:", e);
      }
    }
  }, []);

  // Calculate word count
  useEffect(() => {
    const words = content
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setSaveStatus("error");
      return;
    }

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      // Process tags
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await createPost(title, content);
      setSaveStatus("saved");

      // Clear draft after successful save
      localStorage.removeItem("draft");

      // Reset form
      setTimeout(() => {
        setTitle("");
        setContent("");
        setExcerpt("");
        setTags("");
        setSaveStatus("idle");
      }, 1500);
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearDraft = () => {
    if (confirm("هل أنت متأكد من حذف المسودة؟")) {
      setTitle("");
      setContent("");
      setExcerpt("");
      setTags("");
      localStorage.removeItem("draft");
      setSaveStatus("idle");
    }
  };

  // Editor configuration
  const editorConfig = {
    view: {
      menu: true,
      md: true,
      html: true,
    },
    canView: {
      menu: true,
      md: true,
      html: true,
      both: true,
      fullScreen: true,
      hideMenu: true,
    },
    plugins: [
      "header",
      "font-bold",
      "font-italic",
      "font-underline",
      "font-strikethrough",
      "list-unordered",
      "list-ordered",
      "block-quote",
      "block-wrap",
      "block-code-inline",
      "block-code-block",
      "table",
      "image",
      "link",
      "clear",
      "logger",
      "mode-toggle",
      "full-screen",
    ],
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case "saving":
        return "جاري الحفظ...";
      case "saved":
        return "✓ تم الحفظ";
      case "error":
        return "⚠ فشل الحفظ";
      default:
        return "حفظ المقالة";
    }
  };

  const getSaveButtonStyle = () => {
    switch (saveStatus) {
      case "saving":
        return "bg-yellow-500 text-white";
      case "saved":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  return (
    <div className="max-w-6xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 font-tajawal">
          محرر المقالات
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>عدد الكلمات: {wordCount}</span>
          <span>•</span>
          <span>وقت القراءة المتوقع: {Math.ceil(wordCount / 200)} دقيقة</span>
          {saveStatus === "saved" && (
            <>
              <span>•</span>
              <span className="text-green-600">تم الحفظ تلقائياً</span>
            </>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        {/* Title */}
        <div className="lg:col-span-2">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700 font-tajawal"
          >
            عنوان المقالة *
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="اكتب عنوان جذاب لمقالتك..."
            className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg font-tajawal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-700 font-tajawal"
          >
            العلامات (اختياري)
          </label>
          <input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="JavaScript, React, تطوير..."
            className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg font-tajawal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">افصل بين العلامات بفاصلة</p>
        </div>
      </div>

      {/* Excerpt */}
      <div className="mb-6">
        <label
          htmlFor="excerpt"
          className="block mb-2 text-sm font-medium text-gray-700 font-tajawal"
        >
          نبذة مختصرة (اختياري)
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="اكتب نبذة مختصرة تظهر في بطاقة المقالة..."
          rows={3}
          className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg font-tajawal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
        />
      </div>

      {/* Content Editor */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700 font-tajawal">
          محتوى المقالة *
        </label>
        <div className="overflow-hidden border border-gray-300 rounded-lg">
          <MdEditor
            style={{ height: "600px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={content}
            config={editorConfig}
            plugins={[
              "header",
              "font-bold",
              "font-italic",
              "font-underline",
              "font-strikethrough",
              "list-unordered",
              "list-ordered",
              "block-quote",
              "block-wrap",
              "block-code-inline",
              "block-code-block",
              "table",
              "image",
              "link",
              "clear",
              "logger",
              "mode-toggle",
              "full-screen",
            ]}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>يدعم المحرر تنسيق Markdown الكامل</span>
          <span>Ctrl+S للحفظ السريع</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center justify-between gap-3 pt-6 border-t border-gray-200 sm:flex-row">
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim() || !content.trim()}
            className={`px-6 py-3 rounded-lg font-medium font-tajawal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getSaveButtonStyle()}`}
          >
            {getSaveButtonText()}
          </button>

          <button
            onClick={handleClearDraft}
            className="px-4 py-3 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50 font-tajawal"
          >
            مسح المسودة
          </button>
        </div>

        {/* Preview Link (if needed) */}
        <div className="text-sm text-gray-500">
          <span>المسودة محفوظة تلقائياً</span>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-4 mt-6 border border-blue-100 rounded-lg bg-blue-50">
        <h3 className="mb-2 font-medium text-blue-900 font-tajawal">
          💡 نصائح سريعة:
        </h3>
        <ul className="space-y-1 text-sm text-blue-800 font-tajawal">
          <li>• استخدم # للعناوين (# عنوان رئيسي، ## عنوان فرعي)</li>
          <li>• **نص عريض** أو *نص مائل*</li>
          <li>• استخدم ` للكود المضمن أو ``` لكتل الكود</li>
          <li>• &gt; للاقتباسات</li>
          <li>• يتم حفظ المسودة تلقائياً كل ثانيتين</li>
        </ul>
      </div>
    </div>
  );
}
