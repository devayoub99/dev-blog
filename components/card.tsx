import Image from "next/image";
import Link from "next/link";
import { cloneElement, ReactElement, ReactNode } from "react";

interface CardProps {
  id?: number;
  href: string;
  title: string;
  content?: string;
  CardImage?: ReactElement | null;
  alt?: string;
  publishedAt?: string;
  readTime?: string;
  type: "Article" | "Transparent";
}

export default function Card({
  href,
  title,
  content,
  alt = title,
  publishedAt,
  readTime,
  type,
  CardImage = null,
}: CardProps) {
  const cardBg =
    type === "Transparent" ? "" : "bg-gradient-to-br from-gray-100 to-gray-200";

  const cardPadding = type === "Transparent" ? "p-4" : "p-6";

  return (
    <Link href={href} className="block group">
      <article className="overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
        {/* Image Container */}
        <div className={`relative aspect-[4/3] overflow-hidden ${cardBg}`}>
          {CardImage ? (
            <div className="relative w-full h-full">{CardImage}</div>
          ) : (
            // Fallback placeholder when no image provided
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100" />

          {/* Reading time badge */}
          {readTime && (
            <div className="absolute px-2 py-1 text-xs font-medium text-gray-700 rounded-full top-3 right-3 bg-white/90 backdrop-blur-sm">
              {readTime}
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className={cardPadding}>
          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 line-clamp-2">
            {title}
          </h3>

          {/* Content/Excerpt */}
          {content && (
            <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {content}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {publishedAt && (
              <time className="flex items-center gap-1">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {publishedAt}
              </time>
            )}

            {type === "Article" ? (
              <span className="font-medium text-blue-600 transition-colors duration-200 group-hover:text-blue-700">
                اقرأ المزيد ←
              </span>
            ) : null}
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className="h-1 transition-transform duration-300 origin-left transform scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:scale-x-100" />
      </article>
    </Link>
  );
}
