'use client';

import { AdminAuthProvider } from "@/context/AdminAuthContext";
import AdminLayoutUI from "./_components/AdminLayoutUI";
import { usePathname } from "next/navigation";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  return (
    <AdminAuthProvider>
      {isLoginPage ? children : <AdminLayoutUI>{children}</AdminLayoutUI>}
    </AdminAuthProvider>
  );
}
