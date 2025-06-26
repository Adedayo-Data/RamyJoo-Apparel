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





// 'use client'
// import React from "react";
// import { Button } from "../ui/button";
// import { ShoppingBag } from "lucide-react";

// import useCartStore from "@/store/cartStore";
// import { showToast } from "@/lib/showToast";
// import { Product, CartItem } from "@/types";


// const AddToCartBtn = ({product}:{product:CartItem}) => {
//   const {addToCart} = useCartStore()


//   const handleAddToCart = () => {
//     addToCart(product)
//     showToast('Item Added To The Cart', product.product.images[0] as string,product.product.productName)

//   }

//   return (
//     <Button onClick={handleAddToCart} className="w-full p-8 rounded-full text-xl hover:ring-2 ring-slate-500 flex items-center gap-4">
//       {" "}
//      <ShoppingBag /> Add To Cart
//     </Button>
//   );
// };

// export default AddToCartBtn;
