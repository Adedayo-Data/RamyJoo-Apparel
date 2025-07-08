// app/admin/dashboard/page.tsx

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchAdminStats } from "@/lib/api-adapter";
import { useDebugValue, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {

  const router = useRouter();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalSales: "₦0",
  });

  const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//   fetchAdminStats().then(data => {
//     setStats({
//       totalProducts: data.totalProducts,
//       totalBlogs: data.totalBlogs,
//       totalUsers: data.totalUsers,
//       totalSales: `₦${data.totalSales?.toLocaleString() || 0}`,
//     });
//   });

//   fetchProductsPerMonth().then(data => {
//     setChartData(data);
//   });
// }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const role = localStorage.getItem("admin_role");

    if (!token || role !== "ROLE_ADMIN") {
      router.replace("/admin/login");
    }
  }, []);

  useEffect(() => {
    fetchAdminStats()
    .then((data) =>{
      setStats({
        totalProducts: data.totalProducts,
        totalUsers: data.totalUsers,
        totalOrders: data.totalOrders,
        totalSales: `₦${data.totalSales?.toLocaleString() || 0}`,
      });
    })
    .finally(() => setLoading(false));
  }, []);

  const metrics = [
    { label: "Total Products", value: stats.totalProducts },
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Total Users", value: stats.totalUsers },
    { label: "Total Sales", value: stats.totalSales },
  ];

  const chartData = [
    { month: "Jan", products: 5 },
    { month: "Feb", products: 10 },
    { month: "Mar", products: 8 },
    { month: "Apr", products: 12 },
    { month: "May", products: 15 },
    { month: "Jun", products: 9 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Products Added Monthly</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Bar dataKey="products" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
