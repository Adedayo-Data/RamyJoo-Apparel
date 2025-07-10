import React from "react";

interface ProductSizeSelectionProps {
  size: string;
  setSize: (value: string) => void;
  allSizes: string[];
}

const ProductSizeSelection = ({
  size: selectedSize,
  setSize,
  allSizes,
}: ProductSizeSelectionProps) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Available Sizes:</h3>
      <div className="flex gap-2 flex-wrap">
        {allSizes?.map((size, index) => (
          <span
            key={index}
            onClick={() => setSize(size)}
            className={`px-3 py-1 border rounded-full text-sm cursor-pointer transition
              ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelection;
