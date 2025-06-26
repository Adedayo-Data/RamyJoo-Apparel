"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface Product {
    id: number;
    productName: string;
    category: string;
    description: string;
    aboutItem: string[];
    price: number;
    discount: number;
    rating: number;
    reviews: Review[];
    brand?: string;
    color?: string[];
    stockItems: number;
    images: string[];
}

interface Review{
    author: string;
    image: string;
    content: string;
    rating:number
    date: Date;
}

interface Props {
  productsData: Product[];
}

const CategoriesCollectionClient: React.FC<Props> = ({ productsData }) => {
  const router = useRouter();

  const handleCollectionClick = (category: string) => {
    const params = new URLSearchParams();
    params.set("category", category);
    router.push(`/shop?${params.toString()}`);
  };

  const getCategoryItems = (cat: string) =>
    productsData.filter(
      (item) =>
        typeof item.category === "string" &&
        item.category.toLowerCase() === cat.toLowerCase()
    );

  const sections = [
    { label: "Dresses", items: getCategoryItems("dresses") },
    { label: "Perfumery", items: getCategoryItems("perfumery") },
    { label: "Accessories", items: getCategoryItems("accessories") },
  ];

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {sections.map(({ label, items }) =>
          items.length ? (
            <div
              key={label}
              onClick={() => handleCollectionClick(items[0].category)}
              className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
            >
              <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
                Best Deals For You On{" "}
                <span className="text-2xl font-bold">
                  {items[0].category}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-4 place-content-center w-full">
                {items.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-center text-center gap-2"
                  >
                    <Image
                      src={item.images[0]}
                      alt={typeof item.productName === "string" ? item.productName : "Product"}
                      width={100}
                      height={100}
                      className="object-contain rounded-md"
                    />
                    <div className="flex items-center flex-col">
                      <p className="bg-rose-600 p-1 text-sm text-white whitespace-nowrap w-fit">
                        {item.discount}% off
                      </p>
                      <Link
                        href={`/shop/${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold hover:text-green-500"
                      >
                        {item.productName.slice(0, 15)}...
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="mt-4 flex items-center gap-4 text-lg font-semibold w-full"
                variant={"outline"}
                size={"lg"}
              >
                <ArrowRight /> Collections
              </Button>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default CategoriesCollectionClient;
