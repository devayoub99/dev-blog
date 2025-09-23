"use client";

import { useSession } from "next-auth/react";

export default function DashboardButton() {
  const { status } = useSession();

  console.log("status", status);
  return <button>hi</button>;
}
