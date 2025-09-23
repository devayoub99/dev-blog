import ReactMarkdown from "react-markdown";

import Container from "./container";
import CodeBlock from "./code-block";

export default function PostContent({ post }) {
  return (
    <Container>
      <article className="my-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        {/* Header Section */}
        <header className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-center text-gray-900 ">
            {post.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-600 sm:flex-row">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <span className="font-medium text-blue-600">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span>بواسطة: {post.author.name}</span>
              </div>
            )}

            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString("ar-SA")}
                </time>
              </div>
            )}
          </div>
        </header>

        {/* Content Section */}
        <div className="p-8">
          <div
            className="prose prose-lg text-right markdown-content max-w-none "
            dir="rtl"
          >
            <ReactMarkdown
              components={{
                // Headings
                h1: ({ children }) => (
                  <h1 className="pb-3 mt-8 mb-6 text-3xl font-bold text-gray-900 border-b-2 border-blue-100 ">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-8 mb-5 text-2xl font-bold text-gray-800 ">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800 ">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="mt-5 mb-3 text-lg font-semibold text-gray-700 ">
                    {children}
                  </h4>
                ),
                h5: ({ children }) => (
                  <h5 className="mt-4 mb-3 text-base font-semibold text-gray-700">
                    {children}
                  </h5>
                ),
                h6: ({ children }) => (
                  <h6 className="mt-3 mb-2 text-sm font-semibold tracking-wide text-gray-600 uppercase">
                    {children}
                  </h6>
                ),

                // Paragraphs
                p: ({ children }) => (
                  <p className="mb-6 text-base leading-relaxed text-gray-700">
                    {children}
                  </p>
                ),

                // Lists
                ul: ({ children }) => (
                  <ul className="mb-6 mr-4 space-y-2 text-gray-700 list-disc list-inside">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-6 mr-4 space-y-2 text-gray-700 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed text-gray-700">{children}</li>
                ),

                // Links
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="font-medium text-blue-600 underline transition-colors duration-200 hover:text-blue-800 decoration-blue-200 hover:decoration-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),

                // Emphasis
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-800">{children}</em>
                ),

                // Code
                code: ({ children, className }) => {
                  return (
                    <CodeBlock className={className} inline={""}>
                      {children}
                    </CodeBlock>
                  );
                },

                // Pre (code blocks)
                pre: ({ children }) => <div className="mb-6">{children}</div>,

                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="py-4 pr-6 mb-6 italic text-gray-700 border-r-4 border-blue-200 rounded-r-lg bg-blue-50">
                    {children}
                  </blockquote>
                ),

                // Horizontal rules
                hr: () => <hr className="my-8 border-t-2 border-gray-200" />,

                // Tables
                table: ({ children }) => (
                  <div className="mb-6 overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-gray-50">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </article>
    </Container>
  );
}
