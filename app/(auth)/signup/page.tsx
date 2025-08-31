// app/signup/page.jsx (Next.js 13+ App Router)
"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("Signup attempt:", { name, email, password });
    // Add your signup logic here
    // registerAction({ name, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-black bg-white font-tajawal">
      <div className="w-full max-w-sm">
        {/* Title */}
        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-right">
          إنشاء حساب جديد
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              الاسم الكامل
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full px-3 py-2 text-right border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-3 py-2 text-right border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-right border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-colors bg-black rounded-none hover:bg-neutral-800"
          >
            إنشاء الحساب
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 space-y-2 text-sm text-right">
          <p>
            لديك حساب بالفعل؟{" "}
            <a href="/login" className="underline hover:no-underline">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
