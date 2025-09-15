import Link from "next/link";
import Container from "./container";
import SearchInput from "./searchInput";
import Image from "next/image";

export default async function Header() {
  return (
    <header>
      <Container>
        <nav className="flex items-center gap-4 py-4">
          <Link href="/">
            <Image
              src="/new-logo.png"
              width={60}
              height={60}
              className="rounded-full md:w-20 md:h-20"
              alt="Logo"
            />
          </Link>
          <SearchInput />
        </nav>
      </Container>
    </header>
  );
}
