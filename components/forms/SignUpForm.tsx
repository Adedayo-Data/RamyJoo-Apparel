'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";

// Define Zod schema for form validation
const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(6, "Phone number is required"),
    gender: z.enum(["MALE", "FEMALE"], {required_error: "Gender is required",}),
    deliveryAddress: z.object({
      street: z.string().min(2),
      city: z.string().min(2),
      state: z.string().min(2),
      country: z.string().min(2),
      zip: z.string().min(3),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
  try {
    const res = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: data.gender,
        deliveryAddress: data.deliveryAddress,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`Signup failed: ${err.message || "Unknown error"}`);
      return;
    }

    // Maybe redirect to login?
    alert("Signup successful! Please sign in.");
    window.location.href = "/sign-in";
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again later.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-2">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Create an Account
        </h2>
        {/* <div>
          <Button className="w-full p-6 flex items-center justify-center gap-2 text-lg rounded-lg focus:outline-none mt-6">
            <FaGoogle size={25} /> Sign Up With Google
          </Button>
          <p className="text-lg font-bold my-2 text-center">OR</p>
        </div> */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="e.g. Dayo Johnson"
              {...register("fullName")}
              className={`w-full border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              placeholder="e.g. dayo@example.com"
              {...register("email")}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              placeholder="e.g. 08012345678"
              {...register("phone")}
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              {...register("gender")}
              className={`w-full border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="******"
              {...register("password")}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="******"
              {...register("confirmPassword")}
              className={`w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* --- Address Fields (Nested) --- */}
          <div>
            <Label htmlFor="street">Street</Label>
            <Input
              type="text"
              id="street"
              placeholder="e.g. 3 Ade Road"
              {...register("deliveryAddress.street")}
              className={`w-full border ${
                errors.deliveryAddress?.street ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.deliveryAddress?.street && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.street.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              placeholder="e.g. Ikeja"
              {...register("deliveryAddress.city")}
              className={`w-full border ${
                errors.deliveryAddress?.city ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.deliveryAddress?.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.city.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              type="text"
              id="state"
              placeholder="e.g. Lagos"
              {...register("deliveryAddress.state")}
              className={`w-full border ${
                errors.deliveryAddress?.state ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.deliveryAddress?.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.state.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              id="country"
              placeholder="e.g. Nigeria"
              {...register("deliveryAddress.country")}
              className={`w-full border ${
                errors.deliveryAddress?.country ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.deliveryAddress?.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.country.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              type="text"
              id="zip"
              placeholder="e.g. 100001"
              {...register("deliveryAddress.zip")}
              className={`w-full border ${
                errors.deliveryAddress?.zip ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            />
            {errors.deliveryAddress?.zip && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.zip.message}
              </p>
            )}
          </div>
          {/* --- End Address --- */}

  <Button
    type="submit"
    className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
  >
    Sign Up
  </Button>
</form>
    <p className="text-center mt-4">
          Already have an account?{" "}
          <Link className="underline" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
