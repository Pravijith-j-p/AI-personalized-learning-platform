"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "../app/utils/api";
import {jwtDecode} from "jwt-decode";

type ProgressItem = {
  content_id: number;
  title: string;
  topic: string;
  score: number;
  completed: boolean;
};

type JwtPayload = { sub: string; exp: number };

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        console.warn("No token found, please login first.");
        return;
      }

      const decoded = jwtDecode<JwtPayload>(token);
      const email = decoded.sub;

      try {
        const userRes = await fetchAPI(`/users/email/${email}`, "GET", undefined, token);
        const userId = userRes.id;

        const progressRes = await fetchAPI(`/progress/${userId}`, "GET", undefined, token);
        setProgress(progressRes);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  if (loading) return <p className="p-4">Loading progress...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Learning Progress</h1>
      {progress.length === 0 ? (
        <p>No progress found yet.</p>
      ) : (
        <ul className="space-y-3">
          {progress.map((item) => (
            <li key={item.content_id} className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">Topic: {item.topic}</p>
              <p className="text-sm text-gray-500">Score: {item.score}</p>
              <p className="text-sm text-gray-500">
                Status: {item.completed ? "Completed ✅" : "Incomplete ❌"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
