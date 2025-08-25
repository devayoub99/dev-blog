"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({ children, className, inline }) {
  const [copiedStates, setCopiedStates] = useState({});

  // Copy function
  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [codeId]: true }));

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const isInline = inline || !className?.startsWith("language-");

  if (isInline) {
    return (
      <code
        className="px-2 py-1 font-mono text-sm text-gray-800 bg-gray-100 border rounded"
        style={{
          direction: "ltr",
          display: "inline-block",
          unicodeBidi: "embed",
        }}
      >
        {children}
      </code>
    );
  }

  const language = className?.replace("language-", "") || "text";
  const codeString = String(children).replace(/\n$/, "");
  const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className="relative mb-6 group"
      style={{
        direction: "ltr",
        textAlign: "left",
      }}
    >
      {/* Copy Button */}
      <button
        onClick={() => copyToClipboard(codeString, codeId)}
        className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all duration-200 ${
          copiedStates[codeId]
            ? "bg-green-500 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100"
        }`}
        title={copiedStates[codeId] ? "تم النسخ!" : "نسخ الكود"}
      >
        {copiedStates[codeId] ? (
          // Checkmark icon
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          // Copy icon
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>

      {/* Language Badge */}
      <div className="absolute z-10 px-2 py-1 text-xs font-medium text-gray-400 transition-opacity duration-200 bg-gray-800 rounded opacity-0 top-3 left-3 group-hover:opacity-100">
        {language}
      </div>

      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        className="rounded-lg"
        customStyle={{
          padding: "1rem",
          paddingTop: "3rem", // Extra padding for button
          fontSize: "0.875rem",
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          direction: "ltr",
          textAlign: "left",
          unicodeBidi: "embed",
          margin: 0,
        }}
        codeTagProps={{
          style: {
            direction: "ltr",
            textAlign: "left",
          },
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
