"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { CartItem } from "@/types";

interface Props {
  product: CartItem; // or your specific product type
}

const AddToCartBtn = ({ product }: Props) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleClick = async () => {
    const success = await addToCart(product);

    if (!success) {
      setTimeout(() => {
        router.push("/sign-in");
      }, 500); // Wait a bit after toast before redirecting
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;


