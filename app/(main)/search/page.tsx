// TO FIX

import BreadcrumbComponent from "@/components/others/Breadcrumb";
import SingleProductCartView from "@/components/product/SingleProductCartView";
import SingleProductListView from "@/components/product/SingleProductListView";
import { Product } from "@/types";
import Link from "next/link";
import { API_URL } from "@/config/api";

const getProductsFromBackend = async () => {
  const res = await fetch(`${API_URL}/api/products/`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };

}) {
  const rawProducts = await getProductsFromBackend();
  // ✅ Normalize and assert each product is complete
  const products: Product[] = rawProducts.content.map((product: any) => ({
    id: product.id,
    productName: product.productName ?? "", // make sure it's always string
    category: product.category ?? "",
    description: product.description ?? "",
    aboutItem: product.aboutItem ?? [],
    price: product.price ?? 0,
    discount: product.discount ?? 0,
    rating: product.rating ?? 0,
    stockItems: product.stockItems ?? 0,
    reviews: product.reviews ?? [],
    brand: product.brand ?? "",
    color: product.color ?? [],
    images: product.images ?? [],
  }));

  const query = (searchParams.query || "").toLowerCase();

  const foundProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  if (foundProducts.length === 0) {
    return (
      <div className="text-xl font-medium flex flex-col items-center justify-center h-screen w-full">
        <p className="p-4 text-center">
          Sorry, no search result found for your query!
        </p>
        <Link className="p-2 underline text-muted-foreground" href={"/"}>
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <BreadcrumbComponent links={["/shop"]} pageText={searchParams.query} />
        <p className="capitalize">
          {foundProducts.length} results found for your search{" "}
          <span className="text-lg font-medium">{searchParams.query}</span>
        </p>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:grid grid-cols-1 gap-6">
        {foundProducts.map((product) => (
          <SingleProductListView key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile view */}
      <div className="grid lg:hidden grid-cols-1 md:grid-cols-3 gap-6">
        {foundProducts.map((product) => (
          <SingleProductCartView key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
