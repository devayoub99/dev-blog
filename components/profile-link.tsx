"use client";

import Link from "next/link";

export default function ProfileLink({ children, href, ...props }) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
