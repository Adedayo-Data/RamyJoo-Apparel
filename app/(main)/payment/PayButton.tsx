"use client"; // only if you're using Next.js App Router

import React from "react";

const PayButton = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("https://ramyjoo-apparel-backend.onrender.com/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "customer@example.com",   // Hardcoded for now
          amount: 500000,                  // ₦5000 in kobo
        }),
      });

      const result = await response.json();

      if (result?.data?.authorization_url) {
        window.location.href = result.data.authorization_url;
      } else {
        alert("Failed to initialize payment");
        console.error(result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
    >
      Pay ₦5,000
    </button>
  );
};

export default PayButton;
