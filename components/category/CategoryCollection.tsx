import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { API_URL } from "@/config/api";


const CategoriesCollection = async () => {
  const res = await fetch(`${API_URL}/api/products/`, {
    cache: "no-store", // disables caching, ensures fresh data
  });
  const productsData = await res.json();

  console.log("Product Data: ", productsData);
  const watches = productsData.filter(
  (item: any) =>
    typeof item.category === "string" &&
    item.category.toLowerCase() === "dresses"
);
  const perfumery = productsData.filter(
  (item: any) =>
    typeof item.category === "string" &&
    item.category.toLowerCase() === "perfumery"
);
  const assessories = productsData.filter(
  (item: any) =>
    typeof item.category === "string" &&
    item.category.toLowerCase() === "assessories"
);

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800 ">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {[{ label: "Watches", items: watches }, { label: "Headphones", items: perfumery }, { label: "Computers", items: assessories }].map(
          (group) => (
            <div
              key={group.label}
              onClick={() => {
                const params = new URLSearchParams();
                params.set("category", group.items[0].category);
                window.location.href = `/shop?${params.toString()}`;
              }}
              className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
            >
              <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
                Best Deals For You On{" "}
                <span className="text-2xl font-bold">
                  {group.items[0].category}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-4 place-content-center w-full">
                {group.items.slice(0, 4).map((item: { id: Key | null | undefined; images: (string | StaticImport)[]; name: string | any[]; discount: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-center text-center gap-2"
                  >
                    <Image
                      src={item.images[0]}
                      alt={Array.isArray(item.name) ? item.name.join(", ") : item.name}
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
                        className=" font-semibold hover:text-green-500"
                      >
                        {item.name.slice(0, 15)}...
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
          )
        )}
      </div>
    </section>
  );
};

export default CategoriesCollection;
