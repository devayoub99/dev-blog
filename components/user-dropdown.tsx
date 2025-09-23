"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface UserDropdownProps {
  user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full">
              <span className="text-sm font-medium text-gray-600">
                {user.name?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase() ||
                  "U"}
              </span>
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border rounded-md shadow-lg">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>

          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>

          <hr className="my-1" />

          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
