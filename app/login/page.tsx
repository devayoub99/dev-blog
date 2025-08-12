// app/login/page.jsx (Next.js 13+ App Router)
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Add your authentication logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight font-tajawal">
          أهلاً بعودتك
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium font-tajawal"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-black rounded-none font-tajawal focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium font-tajawal"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition-colors bg-black rounded-none cursor-pointer curs cur font-tajawal hover:bg-neutral-800"
          >
            تسجيل الدخول
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 space-y-2 text-sm">
          <p>
            <a href="#" className="underline font-tajawal hover:no-underline">
              هل نسيت كلمة المرور؟
            </a>
          </p>
          <p className="font-tajawal">
            ليس لديك حساب؟
            <Link href="/signup" className="underlinehover:no-underline">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
