"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthWrapper({ children, authError }) {
  const router = useRouter();

  useEffect(() => {
    if (authError) {
      router.push("/login");
    }
  }, [authError, router]);

  if (authError) {
    return <div>Redirecting to login...</div>;
  }

  return children;
}
