// app/product/[productId]/page.tsx or wherever this file is located

import ProductGallery from "@/components/product/ProductGallery";
import React from "react";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import { API_URL } from "@/config/api";

// interface for the dynamic route
interface ProductIdPageProps {
  params: { productId: string };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  console.log(`${API_URL}/api/products/${params.productId}`);
  const res = await fetch(`${API_URL}/api/products/${params.productId}`, {
    cache: "no-store", // you can remove this in production
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();
  console.log("product output: ", product);

  const relatedRes = await fetch(`${API_URL}/api/products/`); // You can filter related in frontend or implement filtering on backend
  const allProducts = await relatedRes.json();



  const relatedProducts = allProducts.content.filter(
    (prod: any) => prod.category === product.category && prod.id !== product.id
  );

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      {/* Breadcrumb */}
      <div className="my-2">
        <BreadcrumbComponent links={["/shop"]} pageText={product.name} />
      </div>

      {/* Product Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <ProductGallery isInModal={false} images={product.images ?? []} />
        <ProductDetails product={product} />
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductIdPage;























