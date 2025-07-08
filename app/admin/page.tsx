'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const role = localStorage.getItem("admin_role");

    if (token && role === "ROLE_ADMIN") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, []);

  return null; // or a spinner if you want
}
