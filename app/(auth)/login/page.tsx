"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoggingIn(true);
      console.log("Login attempt:", { email, password });
      // const response = await loginAction({ email, password });
      const response = {};
      console.log("res", response);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isLoggingIn) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-black bg-white">
        <div className="text-center">
          {/* Loading Spinner */}
          <div className="inline-block w-8 h-8 mb-4 border-2 border-black border-solid rounded-full border-t-transparent animate-spin"></div>
          <p className="text-lg font-tajawal">جاري التحقق من تسجيل الدخول...</p>
        </div>
      </div>
    );
  }

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
              disabled={isLoggingIn}
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
              disabled={isLoggingIn}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="flex items-center justify-center w-full py-2 text-white transition-colors bg-black rounded-none font-tajawal hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <>
                <div className="inline-block w-4 h-4 mr-2 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                جاري تسجيل الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
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
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="underline hover:no-underline">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
