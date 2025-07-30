"use client";
import { useRouter } from 'next/navigation';
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { API_URL } from "@/config/api";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email").min(10, "Email is required"),
  message: z.string().min(5, "Message is required"),
});

type FormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch("https://ramyjoo-apparel-backend.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/contact/success"); // ✅ Redirect on success
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8 md:px-10">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                type="text"
                id="name"
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={10}
                cols={30}
                className="mt-1 bg-white dark:bg-slate-950 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md border"
                {...register("message")}
              ></textarea>
              {errors.message && (
                <span className="text-red-500">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <div className="mt-4 flex items-center justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-fit py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-base font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
