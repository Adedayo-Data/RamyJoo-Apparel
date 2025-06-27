// lib/auth.ts
import { API_URL } from "@/config/api";

export const fetchUser = async () => {
  console.log("I'm here!")
  const token = localStorage.getItem("token");
  console.log("The token: ", token);
  if (!token) return null;

  console.log("Sending fetch with token:", token);
  console.log("Full URL:", `${API_URL}/user/profile`);
  const res = await fetch(`${API_URL}/api/user/profile`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
  },
});

  if (!res.ok) return null;
  return await res.json();
};
    