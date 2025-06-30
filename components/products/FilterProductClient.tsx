// FilterProductsClient.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { brandsData } from "@/data/brands/brandsdata";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { colors } from "@/data/products/productColor";
import { dummyCategories } from "@/data/category/categoryData";

const FilterProductsClient = () => {
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPrice = searchParams.get("max") || "1000000";
  const initialCategory = searchParams.get("category");
  const initialColor = searchParams.get("color");
  const initialBrand = searchParams.get("brand");

  useEffect(() => {
    setMaxValue(Number(initialPrice));
    setSelectedCategory(initialCategory as string);
    setSelectedColor(initialColor as string);
    setSelectedBrand(initialBrand as string);
  }, [initialPrice, initialCategory, initialColor, initialBrand]);

  const handleCategorySelection = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === selectedCategory) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category);
    }
    setSelectedCategory(category);
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(event.target.value);
    setMinValue(newMinValue);
    setMinAndMaxPrice(newMinValue, maxValue);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(event.target.value);
    setMaxValue(newMaxValue);
    setMinAndMaxPrice(minValue, newMaxValue);
  };

  const setMinAndMaxPrice = (minPrice: number, maxPrice: number) => {
    const min = Math.min(minPrice, maxPrice);
    const max = Math.max(minPrice, maxPrice);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("min", `${min}`);
    newSearchParams.set("max", `${max}`);
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleColorSelection = (color: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (color === selectedColor) {
      newSearchParams.delete("color");
    } else {
      newSearchParams.set("color", color.split("-")[0]);
    }
    setSelectedColor(color);
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleBrandSelection = (brand: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (brand === selectedBrand) {
      newSearchParams.delete("brand");
    } else {
      newSearchParams.set("brand", brand);
    }
    setSelectedBrand(brand);
    router.push(`${pathname}?${newSearchParams}`);
  };

  const clearFilter = () => {
    router.push(`${pathname}?page=1`);
  };

  return (
    <aside className="w-72 p-2 space-y-4 ">
      <h2 className="text-xl font-bold capitalize my-2">Filter Products</h2>
      <Separator />
      <div>
        <h3 className="text-lg font-medium my-2">By Price</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="min">Min :</Label>
            <Input
              id="min"
              placeholder="$10"
              value={minValue}
              min={2}
              type="number"
              onChange={handleMinPriceChange}
            />
          </div>
          <div>
            <Label htmlFor="max">Max :</Label>
            <Input
              id="max"
              placeholder="$2000"
              min={2}
              value={maxValue}
              type="number"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          <Input
            onChange={handleMaxPriceChange}
            type="range"
            min={5}
            max={5000}
            value={maxValue}
          />
          <p className="text-center text-green-500 text-2xl">${maxValue}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium my-2">By Categories</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {dummyCategories.map((category) => (
            <p
              onClick={() => handleCategorySelection(category.name)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                category.name === selectedCategory &&
                  "bg-blue-400 dark:bg-blue-700"
              )}
              key={category.id}
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium my-2">By Colors</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {colors.map((color) => (
            <p
              onClick={() => handleColorSelection(color)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700  flex items-center justify-start gap-3 cursor-pointer",
                color === selectedColor && "bg-blue-400 dark:bg-blue-700"
              )}
              key={color}
            >
              <span
                className={`w-6 h-6 rounded-full border opacity-80`}
                style={{ backgroundColor: color }}
              />
              {color.split("-")[0]}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium my-2">By Brands</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {brandsData.map((brand) => (
            <p
              onClick={() => handleBrandSelection(brand)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                selectedBrand === brand && "bg-blue-400 dark:bg-blue-700"
              )}
              key={brand}
            >
              {brand}
            </p>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={clearFilter} variant={"outline"} className="w-full">
          Clear Filter
        </Button>
      </div>
    </aside>
  );
};

export default FilterProductsClient;











// "use client";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { cn } from "@/lib/utils";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";

// interface Props {
//   subCategory: string[];
//   brands: string[];
//   colors: string[];
// }

// export default function FilterProductsClient({
//   subCategory = [],
//   brands = [],
//   colors = [],
// }: Props) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
//   const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [minValue, setMinValue] = useState<number>(0);
//   const [maxValue, setMaxValue] = useState<number>(0);

//   const handleSubCategorySelection = (subCategory: string) => {
//     const newSearchParams = new URLSearchParams(searchParams.toString());
//     if (subCategory === selectedSubCategory) {
//       newSearchParams.delete("category");
//       setSelectedSubCategory(null);
//     } else {
//       newSearchParams.set("subCategory", subCategory);
//       setSelectedSubCategory(subCategory);
//     }
//     router.push(`${pathname}?${newSearchParams.toString()}`);
//   };

//   const handleBrandSelection = (brand: string) => {
//     const newSearchParams = new URLSearchParams(searchParams.toString());
//     if (brand === selectedBrand) {
//       newSearchParams.delete("brand");
//       setSelectedBrand(null);
//     } else {
//       newSearchParams.set("brand", brand);
//       setSelectedBrand(brand);
//     }
//     router.push(`${pathname}?${newSearchParams.toString()}`);
//   };

//   const handleColorSelection = (color: string) => {
//     const newSearchParams = new URLSearchParams(searchParams.toString());
//     if (color === selectedColor) {
//       newSearchParams.delete("color");
//       setSelectedColor(null);
//     } else {
//       newSearchParams.set("color", color.split("-")[0]);
//       setSelectedColor(color);
//     }
//     router.push(`${pathname}?${newSearchParams.toString()}`);
//   };

//   const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newMin = Number(event.target.value);
//     setMinValue(newMin);
//     setPriceRange(newMin, maxValue);
//   };

//   const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newMax = Number(event.target.value);
//     setMaxValue(newMax);
//     setPriceRange(minValue, newMax);
//   };

//   const setPriceRange = (min: number, max: number) => {
//     const newSearchParams = new URLSearchParams(searchParams.toString());
//     newSearchParams.set("min", String(min));
//     newSearchParams.set("max", String(max));
//     router.push(`${pathname}?${newSearchParams.toString()}`);
//   };

//   const clearFilter = () => {
//     const cleared = new URLSearchParams();
//     router.push(`${pathname}?${cleared.toString()}`);
//     setSelectedSubCategory(null);
//     setSelectedBrand(null);
//     setSelectedColor(null);
//     setMinValue(0);
//     setMaxValue(0);
//   };

//   return (
//     <aside className="w-72 p-2 space-y-4">
//       {/* Price Filter */}
//       <div>
//         <h3 className="text-lg font-medium my-2">Price Range</h3>
//         <div className="flex gap-2 items-center">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minValue}
//             onChange={handleMinPriceChange}
//             className="border px-2 py-1 rounded-md w-full"
//           />
//           <span>-</span>
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxValue}
//             onChange={handleMaxPriceChange}
//             className="border px-2 py-1 rounded-md w-full"
//           />
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div>
//         <h3 className="text-lg font-medium my-2">By Categories</h3>
// <div className="flex items-center flex-wrap gap-2">
//   {subCategory.map((subCat) => (
//     <p
//       key={subCat}
//       onClick={() => handleSubCategorySelection(subCat)}
//       className={cn(
//         "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
//         subCat === selectedSubCategory && "bg-blue-400 dark:bg-blue-700"
//       )}
//     >
//       {subCat}
//     </p>
//   ))}
// </div>

//       </div>

//       {/* Brand Filter */}
//       <div>
//         <h3 className="text-lg font-medium my-2">By Brands</h3>
//         <div className="flex items-center flex-wrap gap-2">
//           {brands.map((br) => (
//             <p
//               key={br}
//               onClick={() => handleBrandSelection(br)}
//               className={cn(
//                 "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
//                 br === selectedBrand && "bg-blue-400 dark:bg-blue-700"
//               )}
//             >
//               {br}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Color Filter */}
//       <div>
//         <h3 className="text-lg font-medium my-2">By Colors</h3>
//         <div className="flex items-center flex-wrap gap-2">
//           {colors.map((clr) => (
//             <p
//               key={clr}
//               onClick={() => handleColorSelection(clr)}
//               className={cn(
//                 "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer flex items-center gap-2",
//                 clr === selectedColor && "bg-blue-400 dark:bg-blue-700"
//               )}
//             >
//               <span
//                 className="w-4 h-4 rounded-full border"
//                 style={{ backgroundColor: clr }}
//               />
//               {clr}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Clear Filter Button */}
//       <Button onClick={clearFilter} variant="outline" className="w-full">
//         Clear Filter
//       </Button>
//     </aside>
//   );
// }
