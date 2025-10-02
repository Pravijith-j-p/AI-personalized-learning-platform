"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";
import {jwtDecode} from "jwt-decode";
import Navbar from "../../components/Navbar";

type Content = {
  id: number;
  title: string;
  topic: string;
  difficulty: number;
};

type JwtPayload = { sub: string; exp: number };

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
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

        const recs = await fetchAPI(`/recommendations/${userId}`, "GET", undefined, token);
        setRecommendations(recs);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  const handleMarkComplete = async (contentId: number, score: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    const email = decoded.sub;

    try {
      const userRes = await fetchAPI(`/users/email/${email}`, "GET", undefined, token);
      const userId = userRes.id;

      // Submit progress
      await fetchAPI(
        `/progress/`,
        "POST",
        {
          user_id: userId,
          content_id: contentId,
          score,
          completed: true,
        },
        token
      );

      alert("Progress updated!");
    } catch (err) {
      console.error("Failed to update progress:", err);
      alert("Error updating progress. Check console.");
    }
  };

  if (loading) return <p className="p-4">Loading recommendations...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Recommended Content</h1>
        {recommendations.length === 0 ? (
          <p>No recommendations found.</p>
        ) : (
          <ul className="space-y-3">
            {recommendations.map((item) => (
              <li key={item.id} className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">Topic: {item.topic}</p>
                <p className="text-sm text-gray-500">Difficulty: {item.difficulty}</p>
                <button
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleMarkComplete(item.id, 100)} // default score 100
                >
                  Mark Complete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
