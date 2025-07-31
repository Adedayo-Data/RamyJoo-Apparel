'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/config/api";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    setLoading(true);
    setMessage("");

    try {
      const res =await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            token, 
            newPassword 
        }),
    });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password has been reset successfully.");
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        setMessage(data?.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <Label htmlFor="newPassword" className="text-sm text-gray-700 dark:text-gray-300">
              New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-300">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {message && (
            <p className="text-center text-sm text-red-600 dark:text-red-400 mt-2">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
