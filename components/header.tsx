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
            <Image src="/logo-transparent.png" width={80} height={80} />
          </Link>
          <SearchInput />
        </nav>
      </Container>
    </header>
  );
}
