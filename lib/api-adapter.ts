// lib/api-adapter.ts
import { Product } from "@/types";

export async function getProductsFromBackend() {
  const res = await fetch("http://localhost:8080/api/products/", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("🔥 Raw backend data:", data);

  if (!Array.isArray(data)) {
    throw new Error("Expected array from backend, but got: " + JSON.stringify(data));
  }

  return data as Product[];


  // Now reshape it to what the frontend expects
  console.log("Fetched data from backend:", data);
  return data.map((item: any) => ({
    id: item.id,
    name: item.productName,
    price: item.price,
    image: item.images,
    description: item.description,
    aboutItem: [
      "WHY APPLE WATCH SERIES 9 — Your essential companion for a healthy life is now even more powerful. The S9 chip enables a super-bright display and a magical new way to quickly and easily interact with your Apple Watch without touching the screen. Advanced health, safety and activity features provide powerful insights and help when you need it. And redesigned apps in watchOS give you more information at a glance.",
      "CARBON NEUTRAL — An aluminium Apple Watch Series 9 paired with the latest Sport Loop is carbon neutral.",
      "ADVANCED HEALTH FEATURES—Keep an eye on your blood oxygen. Take an ECG anytime. Get notifications if you have an irregular heart rhythm. See how much time you spent in REM, Core, or Deep sleep with sleep stages. Temperature sensing provides insights into overall well-being and cycle tracking. And take note of your state of mind to help build emotional awareness and resilience."
    ],
    brand: item.brand,
    category: item.subCategory?.subCategoryName || "Uncategorized",
    discount: 10,
    rating: 4.5,
    stockItems: 5,
    reviews: [
      {
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio voluptatem aliquam reprehenderit debitis quidem accusantium",
        rating:4,
        author: "Shohag miah",
        image: "/images/people/person.jpg",
        date: new Date(),
      },
    ],
    color: item.colorList
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
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

