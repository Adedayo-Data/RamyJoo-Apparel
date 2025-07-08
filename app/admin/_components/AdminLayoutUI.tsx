// app/admin/_components/AdminLayout.tsx

"use client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, FileText, Settings, LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Products", href: "/admin/products", icon: <ShoppingBag size={20} /> },
  { name: "Blogs", href: "/admin/blogs", icon: <FileText size={20} /> },
  { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAdminAuth();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-6">
        <h2 className="text-2xl font-bold">RamyJoo Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-all ${
                pathname === item.href ? "bg-gray-800" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          className="text-red-400 hover:text-white flex gap-2 mt-auto"
          onClick={logout}
        >
          <LogOut size={20} /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-950 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
