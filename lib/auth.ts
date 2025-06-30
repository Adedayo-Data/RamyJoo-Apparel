// lib/auth.ts
import { API_URL } from "@/config/api";

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/user/profile`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
  },
});

  if (!res.ok) return null;
  return await res.json();
};
    