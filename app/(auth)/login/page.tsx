"use client";

import Link from "next/link";
import { useState } from "react";
import OAuthButton from "@/components/o-auth-button";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight font-tajawal">
          أهلاً بعودتك
        </h1>

        {/* Login Form */}
        <form className="space-y-4">
          <OAuthButton />
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
