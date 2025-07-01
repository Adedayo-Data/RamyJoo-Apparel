"use client";
import React, { useEffect, useState } from "react";
import CartItemsDetails from "./CartItemsDetails";
import { Separator } from "../ui/separator";
import useCartStore from "@/store/cartStore";
import { Button } from "../ui/button";
import Loader from "../others/Loader";
import { formatPrice } from "@/lib/formatPrice";
import { jwtDecode } from "jwt-decode";

const OrderSummaryForCheckout = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { getTotalPrice, getTax, getShippingFee, getTotalAmount } =
    useCartStore();

  if (!isMounted) {
    return <Loader />;
  }

  const token = localStorage.getItem("token");
  let email = "customer@example.com";

  if(token){
    try{
      const decoded: any = jwtDecode(token);
      email = decoded.sub;
    }catch(err){
      console.error("Token decode error", err);
    }
  }


  const handlePayment = async () => {
  try {
    const amountInKobo = getTotalAmount() * 100; // Convert to Kobo
    const response = await fetch("https://ramyjoo-apparel-backend.onrender.com/api/paystack/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        amount: amountInKobo,
      }),
    });

    const data = await response.json();
    console.log("🚀 API Response:", data); 

    if (data?.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    } else {
      alert("Failed to initialize payment.");
      console.error(data);
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong.");
  }
};

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      {/* ordered items details */}
      <div>
        <h2 className="text-lg font-semibold my-2 lg:p-4">Order Items</h2>
        <CartItemsDetails />
        <Separator className="dark:bg-white/50 mb-2" />
      </div>

      {/* order summary for order place */}
      <div className="lg:px-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="text-gray-900 dark:text-white">
            ₦{formatPrice(getTotalPrice())}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Shipping:</span>
          <span className="text-gray-900 dark:text-white">
            ₦{formatPrice(getShippingFee())}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tax:</span>
          <span className="text-gray-900 dark:text-white">
            ₦{formatPrice(getTax())}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            ₦{formatPrice(getTotalAmount())}
          </span>
        </div>
        <Button className="text-xl mt-6 bg-blue-500 dark:bg-blue-600 text-white py-6 
        px-12 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none rounded-full 
        hover:ring-2" onClick={handlePayment}>
          Pay ₦{formatPrice(getTotalAmount())}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryForCheckout;
