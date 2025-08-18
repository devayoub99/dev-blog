"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { loginAction } from "../../../lib/auth-actions";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Use useActionState for proper server action handling
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Handle form submission with loading state
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await formAction(formData);
    } catch (error) {
      // Handle redirect errors (expected when login succeeds)
      if (error?.digest?.includes("NEXT_REDIRECT")) {
        console.log("Login successful, redirecting...");
        return;
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitting = isPending || isLoading;

  if (isSubmitting && !state?.success === false) {
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

        {/* Error Message */}
        {state && !state.success && (
          <div className="p-3 mb-4 text-sm text-red-700 border border-red-400 rounded-none bg-red-50 font-tajawal">
            {state.message}
          </div>
        )}

        {/* Login Form */}
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium font-tajawal"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-black rounded-none font-tajawal focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={isSubmitting}
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
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full py-2 text-white transition-colors bg-black rounded-none font-tajawal hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
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
