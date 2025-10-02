"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setLoading(false); // User is logged in
    }
  }, [router]);

  return loading;
}
