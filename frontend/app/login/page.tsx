"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "../utils/api";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetchAPI("/token", "POST", {
        username: email,
        password: password,
      });

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/recommendations"); // Redirect after login
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
