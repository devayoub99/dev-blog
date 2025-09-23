"use client";

import Link from "next/link";
import { useState } from "react";
import OAuthButton from "@/components/o-auth-button";
import { login } from "@/actions/auth-actions";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login("credentials", { email, password });
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 px-4 text-black bg-white">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">
          أهلاً بعودتك
        </h1>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full py-2 text-white transition-colors bg-black rounded-none hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="inline-block w-4 h-4 mr-2 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                جاري تسجيل الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
          {/* Login WIth GitHub */}
          {/* <OAuthButton /> */}
        </form>

        {/* Extra Links */}
        <div className="mt-6 space-y-2 text-sm">
          <p>
            <a href="#" className="underline hover:no-underline">
              هل نسيت كلمة المرور؟
            </a>
          </p>
          <p>
            ليس لديك حساب؟{" "}
            <Link href="/register" className="underline hover:no-underline">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
