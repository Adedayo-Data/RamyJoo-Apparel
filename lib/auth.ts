// lib/auth.ts
export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
  },
});

  if (!res.ok) return null;
  return await res.json();
};
    