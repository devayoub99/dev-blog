"use client";

import Link from "next/link";

export default function ProfileLink({ children, ...props }) {
  return <Link {...props}>{children}</Link>;
}
