import React from 'react';

const ProductSizes = ({ sizes }: { sizes: string[] }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Available Sizes:</h3>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size, index) => (
          <span
            key={index}
            className="px-3 py-1 border rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductSizes;
