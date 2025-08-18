import Link from "next/link";
import Container from "./container";
import SearchInput from "./searchInput";
import Image from "next/image";
import { getUser } from "@/lib/auth";
import ProfileLink from "./profile-link";

export default async function Header() {
  const user = await getUser();

  console.log("user", user);

  return (
    <header>
      <Container>
        <nav className="flex items-center">
          <Link href="/">
            <Image
              src="/logo-transparent.png"
              width={80}
              height={80}
              alt="Logo"
            />
          </Link>
          <SearchInput />

          <div className="flex gap-4">
            <Link
              href="/dashboard/new-article"
              className="px-4 py-2 border rounded-md font-tajawal"
            >
              إضافة مقالة
            </Link>
            <ProfileLink
              href={user?.id ? "/dashboard" : "/login"}
              className="px-4 py-2 border rounded-md font-tajawal"
            >
              {user?.id ? "لوحة التحكم" : "تسجيل الدخول"}
            </ProfileLink>
          </div>
        </nav>
      </Container>
    </header>
  );
}
