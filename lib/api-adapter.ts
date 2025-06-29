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

export const getProductsFromBackend = async (
  page: number = 0,
  size: number = 24
): Promise<PaginatedProductResponse | null> => {
  try {
    const res = await fetch(`${API_URL}/api/products/?page=${page}&size=${size}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("🔥 Raw backend data:", data);
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


