// lib/api-adapter.ts
import { API_URL } from "@/config/api";
import { Product } from "@/types";

// Define what the backend returns
interface PaginatedProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number; // current page (zero-based)
  size: number;
  empty: boolean;
}

export interface AdminStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalSales: number;
}

export const getProductsFromBackend = async (
  query: string
): Promise<PaginatedProductResponse | null> => {
  try {
    const res = await fetch(`${API_URL}/api/products/?${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};


export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch product:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data as Product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }

  
}

// lib/api.ts
export async function getFilterOptions() {
  const res = await fetch(`${API_URL}/api/products/filter`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch filter options");
  }
  return res.json() as Promise<{
    categories: string[];
    brands: string[];
    colors: string[];
  }>;
}


export async function fetchAdminStats(): Promise<AdminStats> {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: {
      Authorization:`Bearer ${token}`,
    },
  });

  if(!res.ok) throw new Error("Failed to fetch stats data");

  return res.json();
}

export async function fetchProductsPerMonth() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_URL}/admin/stats/products-per-month`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch chart data");

  return res.json(); 
}

