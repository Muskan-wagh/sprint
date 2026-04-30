"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          Structify
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            How it Works
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4">
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn-primary py-2.5 px-6 text-sm">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
}
