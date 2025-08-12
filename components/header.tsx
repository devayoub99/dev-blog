import Link from "next/link";
import Container from "./container";
import SearchInput from "./searchInput";
import Image from "next/image";

export default function Header() {
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
              className="border rounded-md py-2 px-4 font-tajawal"
            >
              إضافة مقالة
            </Link>
            <Link
              href="/login"
              className="border rounded-md py-2 px-4 font-tajawal"
            >
              تسجيل الدخول
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
