"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      if (!reference || !token) {
        setStatus("failed");
        return;
      }

      try {
        const res = await fetch(`https://ramyjoo-apparel-backend.onrender.com/api/paystack/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("🧾 Verification Response:", data);

        if (data.status === true) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("❌ Error verifying payment:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [reference]);

  const handleRedirect = () => {
    router.push("/"); // 👈🏽 or "/shop" if you want to send them to the shop page
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center p-6">
      {status === "verifying" && <p>Verifying your payment...</p>}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
          <p className="text-sm text-gray-600">Thank you for shopping with RamyJoo</p>
          <button
            onClick={handleRedirect}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </button>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">❌ Payment Failed</h1>
          <p className="text-sm text-gray-600">Something went wrong. Please try again.</p>
          <button
            onClick={handleRedirect}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Return to Homepage
          </button>
        </>
      )}
    </div>
  );
}
