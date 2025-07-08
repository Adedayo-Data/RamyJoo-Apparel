'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSignInForm from "@/components/forms/AdminSignInForm";


export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const role = localStorage.getItem("admin_role");

    if (token && role === "ROLE_ADMIN") {
      router.replace("/admin/dashboard");
    }
  }, []);

  return <AdminSignInForm />;
}
