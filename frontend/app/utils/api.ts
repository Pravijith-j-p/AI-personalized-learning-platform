// utils/api.ts

export type Progress = {
  user_id: number;
  content_id: number;
  score: number;
  completed: boolean;
};

const API_BASE = "http://127.0.0.1:8000"; // Backend URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export async function fetchAPI(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  token?: string
) {
  const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function submitProgress(progress: Progress, token?: string) {
  const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!authToken) {
    throw new Error("No token provided for progress submission");
  }

  const res = await fetch(`${API_BASE}/progress/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(progress),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to submit progress: ${res.status} ${errorText}`);
  }

  return res.json();
}
