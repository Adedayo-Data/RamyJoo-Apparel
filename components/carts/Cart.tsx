"use client";

import { ShoppingBag, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import Image from "next/image";
import ViewCart from "../buttons/ViewCart";
import CheckoutBtn from "../buttons/CheckoutBtn";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";
import { showToast } from "@/lib/showToast";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/formatPrice";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const fetchCartFromServer = useCartStore((state) => state.fetchCartFromServer);

  const [showSheet, setShowSheet] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ match the backend token
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    fetchCartFromServer();
    setIsMounted(true);
  }, [fetchCartFromServer]);

  const handleRemoveItemFromCart = async (item: CartItem) => {
  await removeFromCart(item.product.id);
  showToast(
    "Item Removed from Cart",
    item.product.images?.[0] ?? "/placeholder.png",
    item.product.productName
  );
};


  if (!isMounted) {
    return (
      <div className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 rounded-md">
        <ShoppingBag size={25} />
        <Badge className="absolute -top-2 -right-3" variant="destructive">
          0
        </Badge>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetTrigger>
          <div className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 rounded-md mt-2">
            <ShoppingBag size={25} />
            <Badge className="absolute -top-0 -right-2" variant="destructive">
              {getTotalItems()}
            </Badge>
          </div>
        </SheetTrigger>

        <SheetContent className="w-[90%] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <Separator />
            <SheetDescription className="flex flex-col justify-between gap-4 h-[90vh]">
              {/* Cart Items */}
              <div className="overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted-foreground mt-4">Your cart is empty.</p>
                ) : (
                  Array.isArray(cartItems) &&
                    cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-start gap-2 p-2 mt-2 border-b-2 border-t-gray-500"
                    >
                      <Image
                        className="rounded-full object-contain"
                        src={item.product.images?.[0] || "/placeholder.png"}
                        alt="product image"
                        width={70}
                        height={70}
                      />
                      <div className="space-y-2">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                          <h2>{item.product.productName?.slice(0, 50) ?? "Unnamed Product"}...</h2>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <p className="text-lg border border-green-500 px-2 rounded-md text-green-500">
                            ₦{formatPrice(item.product.price)}
                          </p>

                          <div className="flex items-center gap-2">
                            <Button
                              className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            >
                              <span className="text-xl font-bold">−</span>
                            </Button>
                            <span className="text-lg">{item.quantity}</span>
                            <Button
                              className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <span className="text-xl font-bold">+</span>
                            </Button>
                          </div>

                          <Button
                            onClick={() => handleRemoveItemFromCart(item)}
                            variant="destructive"
                            size="sm"
                            className="rounded-full"
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Totals & Actions */}
              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">Your Subtotal :</h3>
                  <p className="text-xl font-bold text-green-500">
                    ₦{formatPrice(getTotalPrice())}
                  </p>
                </div>
                <Separator className="!my-2" />
                <div className="flex flex-col items-center gap-2 mt-2" onClick={() => setShowSheet(false)}>
                  <ViewCart />
                  <CheckoutBtn />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
