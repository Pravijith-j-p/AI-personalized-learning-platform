import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Learning Platform",
  description: "Personalized AI-powered learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-4 hidden md:flex flex-col">
          <h1 className="text-2xl font-bold mb-6">AI Learning</h1>
          <nav className="flex flex-col gap-4">
            <a href="/" className="hover:text-blue-600">🏠 Dashboard</a>
            <a href="/recommendations" className="hover:text-blue-600">📚 Recommendations</a>
            <a href="/progress" className="hover:text-blue-600">📈 My Progress</a>
            <a href="/profile" className="hover:text-blue-600">👤 Profile</a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="h-14 bg-white shadow flex items-center px-6 justify-between">
            <span className="font-semibold">AI-Powered Personalized Learning</span>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Logout</button>
          </header>

          {/* Page Content */}
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
