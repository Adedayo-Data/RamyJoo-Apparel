// app/components/ProductsCollectionOneClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleProductCartView from "../product/SingleProductCartView";
import { Product } from "@/types";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   images: string[];
//   // Add any other fields you need (like rating, createdAt, etc.)
// }

interface Props {
  productsData: Product[];
}

const ProductsCollectionOneClient: React.FC<Props> = ({ productsData }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
      <Tabs defaultValue="top-rated" className="w-full space-y-8 mx-0">
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap w-full">
          <h2 className="text-3xl md:text-5xl font-semibold border-l-4 border-l-rose-500 p-2">
            Featured Products
          </h2>
          <TabsList className="font-semibold bg-transparent text-center">
            <TabsTrigger value="top-rated" className="md:text-xl">
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="most-popular" className="md:text-xl">
              Most Popular
            </TabsTrigger>
            <TabsTrigger value="new-items" className="md:text-xl">
              New Items
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="top-rated" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {productsData.slice(0, 8).map((product) => (
              <SingleProductCartView key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="most-popular">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData.slice(8, 16).map((product) => (
              <SingleProductCartView key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new-items">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData.slice(16, 24).map((product) => (
              <SingleProductCartView key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductsCollectionOneClient;
