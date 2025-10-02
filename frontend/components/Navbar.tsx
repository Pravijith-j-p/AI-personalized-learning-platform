"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">AI Learning Platform</div>
      <div className="space-x-4">
        <Link href="/recommendations" className="hover:underline">
          Recommendations
        </Link>
        <Link href="/progress" className="hover:underline">
          Progress
        </Link>
        <Link
          href="/login"
          className="hover:underline"
          onClick={() => localStorage.removeItem("token")}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}
