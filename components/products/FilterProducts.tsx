// FilterProductsClient.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
// import { brandsData, newData } from "@/data/brands/brandsdata";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
// import { colors } from "@/data/products/productColor";
// import { dummyCategories } from "@/data/category/categoryData";
import { API_URL } from "@/config/api";

const FilterProducts = () => {
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(5000);
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");
  // const [selectedBrand, setSelectedBrand] = useState("");\
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColorsList] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");


  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPrice = searchParams.get("max") || "10000000";
  const initialCategory = searchParams.get("category");
  const initialColor = searchParams.get("color");
  const initialBrand = searchParams.get("brand");

  useEffect(() => {
  const fetchFilterOptions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/filter-option`);
      const data = await res.json();

      setBrands(data.brands);
      setColorsList(data.colors);
      setCategories(data.categories);

      // Keep selected values as user-selected filters
      setMaxValue(Number(initialPrice));
      setSelectedCategory(initialCategory || "");
      setSelectedColor(initialColor || "");
      setSelectedBrand(initialBrand || "");
    } catch (error) {
      console.error("Failed to fetch filter options", error);
    }
  };

  fetchFilterOptions();
}, [initialPrice, initialCategory, initialColor, initialBrand]);


  // useEffect(() => {
  //   setMaxValue(Number(initialPrice));
  //   setSelectedCategory(initialCategory as string);
  //   setSelectedColor(initialColor as string);
  //   setSelectedBrand(initialBrand as string);
  // }, [initialPrice, initialCategory, initialColor, initialBrand]);

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
          {categories.map((category) => (
            <p
              onClick={() => handleCategorySelection(category)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                category === selectedCategory &&
                  "bg-blue-400 dark:bg-blue-700"
              )}
              key={category}
            >
              {category}
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
          {brands.map((brand) => (
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

export default FilterProducts;
