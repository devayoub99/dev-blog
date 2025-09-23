import Link from "next/link";
import Container from "./container";
import SearchInput from "./searchInput";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header>
      <Container>
        <nav className="flex items-center gap-4 py-4">
          <Link href="/">
            <Image
              src="/new-logo.png"
              width={60}
              height={60}
              className="rounded-full md:w-[120] md:h-[37]"
              alt="Logo"
            />
          </Link>
          <SearchInput />

          {session?.user && (
            <Link
              href="/dashboard"
              className="p-2 border-gray-400 rounded-md cursor-pointer border-1"
            >
              <Image
                src="/dashboard.svg"
                alt="Dashboard"
                width={20}
                height={20}
              />
            </Link>
          )}
        </nav>
      </Container>
    </header>
  );
}
