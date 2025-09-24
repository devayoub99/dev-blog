import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header>
      <Container>
        <nav className="flex gap-4 py-4">
          <Link href="/">
            <Image
              src="/new-logo.png"
              width={60}
              height={60}
              className="rounded-full md:w-[120] md:h-[37]"
              alt="Logo"
            />
          </Link>
          <div className="flex justify-end flex-1 gap-2">
            <input
              type="search"
              className="p-2 border-gray-400 rounded-md border-1 md:min-w-60 lg:min-w-80"
              placeholder="بحث عن مقالة..."
            />
            <button className="p-2 border-gray-400 rounded-md cursor-pointer border-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            {session?.user && (
              <Link
                href="/dashboard"
                className="flex items-center h-full gap-2 p-2 border-gray-400 rounded-md cursor-pointer border-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
