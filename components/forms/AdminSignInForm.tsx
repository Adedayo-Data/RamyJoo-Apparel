'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import { API_URL } from "@/config/api";
import { toast } from "sonner";

// Define Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type SignInFormData = z.infer<typeof signInSchema>;


const SignInForm = () => {

  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
  try {
    const res = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok || result.role !== "ROLE_ADMIN") {
      toast.warning("E-mail or Password details may be wrong. Try Again");
      window.location.href = "/admin/login";
      return;
    }

    // Save token to localStorage
    localStorage.setItem("admin_token", result.jwt);
    localStorage.setItem("admin_role", result.role);


    // Force redirect
    window.location.href = "/admin/dashboard"; // ✅ This works 100%

  } catch (error) {
    console.error("Login error:", error);
    toast.warning("An unexpected error occurred. Try again later.");
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Sign In
        </h2>
        {/* Add Oauth2 Here */}
        {/* <div>
          <Button className="w-full p-6 flex items-center justify-center gap-2 text-lg mt-6">
            <FaGoogle size={25} /> Sign In With Google
          </Button>
          <p className="text-lg font-bold my-2 text-center">OR</p>
        </div> */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="********"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          >
            Sign In
          </Button>
        </form>
        {/* <p className="text-center m-1">
          Don&apos;t have an account{" "}
          <Link className="underline" href={"/sign-up"}>
            Sign Up
          </Link>
        </p> */}
        {/* <div className=" font-medium">
          Forgot Password
          <Link className="underline p-2" href={"/forgot-password"}>
            here
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SignInForm;
