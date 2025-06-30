'use client';
import { CartItem } from "@/types";
import { create } from "zustand";
import { CART_API } from "./CartConfig";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Console } from "console";

interface CartState {
  cartItems: CartItem[];
  couponCode: string | null;
  addToCart: (newItem: CartItem) => Promise<boolean>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCartFromServer: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTax: () => number;
  getShippingFee: () => number;
  getTotalAmount: () => number;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

const STORAGE_KEY = "cart-items";

const useCartStore = create<CartState>((set, get) => {
  const isClient = typeof window !== "undefined";

  const loadFromLocalStorage = (): CartItem[] => {
    try {
      const local = isClient ? localStorage.getItem(STORAGE_KEY) : null;
      if (!local) return [];

      const parsed = JSON.parse(local);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.cartItems)) return parsed.cartItems;

      console.warn("⚠️ cart-items is not in expected format:", parsed);
      return [];
    } catch (e) {
      console.error("❌ Failed to parse cart from localStorage:", e);
      return [];
    }
  };

  return {
    cartItems: loadFromLocalStorage(),
    couponCode: null,

    fetchCartFromServer: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(CART_API.FETCH, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        const cart = Array.isArray(data) ? data : data.cartItems || [];

        set({ cartItems: cart });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (err) {
        console.error("❌ Fetch cart error:", err);
      }
    },

    addToCart: async (newItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to add items to cart");
      return false; // 🔁 return a signal to redirect
    }

    try {
      const res = await fetch(CART_API.ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId: newItem.id, quantity: 1 }),
      });

    if (!res.ok) throw new Error("Failed to add item to cart");

    const rawData = await res.json();

    const cartItems: CartItem[] = rawData.cartItems.map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase,
      totalPrice: item.totalPrice,
      product: {
        id: item.product.id,
        productName: item.product.productName,
        description: item.product.description,
        price: item.product.price,
        discount: item.product.discount || 0,
        rating: item.product.rating || 0,
        reviews: item.product.reviews || [],
        brand: item.product.brand,
        color: item.product.colorList || [],
        stockItems: item.product.stockItems || 0,
        images: item.product.images || [],
        aboutItem: item.product.aboutItem || [],
        category: item.product.subCategory?.subCategoryName || "Uncategorized",
      },
    }));

    set({ cartItems });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    return true; // ✅ all good
  } catch (err) {
    console.error("Add to cart error:", err);
    return false;
  }
},



    removeFromCart: async (id) => {
      try {
        await fetch(CART_API.REMOVE(id), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });

        await get().fetchCartFromServer();
      } catch (err) {
        console.error("❌ Remove from cart error:", err);
      }
    },

    updateQuantity: async (id, qty) => {
      try {
        const res = await fetch(CART_API.UPDATE, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify({ productId: id, quantity: qty }),
        });

        if (!res.ok) throw new Error("❌ Update qty failed");
        await get().fetchCartFromServer();
      } catch (err) {
        console.error("❌ Update qty error:", err);
      }
    },

    clearCart: async () => {
      try {
        await fetch(CART_API.CLEAR, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });

        set({ cartItems: [] });
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      } catch (err) {
        console.error("❌ Clear cart error:", err);
      }
    },

    getTotalItems: () => {
      const items = get().cartItems;
      return Array.isArray(items)
        ? items.reduce((acc, item) => acc + item.quantity, 0)
        : 0;
    },

    getTotalPrice: () => {
      const items = get().cartItems;
      if (!Array.isArray(items)) return 0;

      const total = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      return get().couponCode === "YOUR_COUPON_CODE" ? total * 0.9 : total;
    },

    getTax: () => get().getTotalPrice() * 0.1,
    getShippingFee: () => 10000,
    getTotalAmount: () => {
      return get().getTotalPrice() + get().getTax() + get().getShippingFee();
    },

    applyCoupon: (code) => set({ couponCode: code }),
    removeCoupon: () => set({ couponCode: null }),
  };
});

export default useCartStore;
