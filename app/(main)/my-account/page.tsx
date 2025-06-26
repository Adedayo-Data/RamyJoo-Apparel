"use client";

import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/lib/auth';
import { User } from '@/types';
import { API_URL } from '@/config/api';

const MyAccountPage = () => {

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("👀 Checking token:", token);

  if (!token) {
    setTimeout(() => {
      router.push("/sign-in");
    }, 5000); // ⏱ Add delay to see logs
  };

  const getUser = async () => {
    console.log("📡 Fetching user...");
    const user = await fetchUser();
    console.log("✅ User received:", user);
    if (!user) {
      localStorage.removeItem("token");
      router.push("/sign-in");
    } else {
      setUser(user);
    }
  };

  getUser();
}, []);


const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ramyjoo_uploads");

  const res = await fetch("https://api.cloudinary.com/v1_1/drzcrx4he/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  const imageUrl = data.secure_url;

  // Then send imageUrl to your backend
  await fetch(`${API_URL}/api/user/profile/photo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ profileImage: imageUrl }),
  });

  // Refetch user or update locally
  fetchUser(); // or setUser(updatedUser);
};
  if (!user) return <p>Loading your account...</p>;
  return (
    <div className="px-4 py-8 lg:px-16 lg:py-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-8">
          My Account
        </h1>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Picture</label>
              <input type="file" onChange={handleProfileImageUpload} />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <p className="text-gray-800 dark:text-white">{user.fullName}</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <p className="text-gray-800 dark:text-white">{user.email}</p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <p className="text-gray-800 dark:text-white">{user.phoneNumber}</p>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <p className="text-gray-800 dark:text-white">{user.gender}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <div className='flex items-center justify-between'>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Address</h2>
          </div>
          
          <div>
            <p className="text-gray-800 dark:text-white">{user.address?.street}</p>
            <p className="text-gray-800 dark:text-white">{user.address?.city}</p>
            <p className="text-gray-800 dark:text-white">{user.address?.state}</p>
            <p className="text-gray-800 dark:text-white">{user.address?.zipcode}</p>
            <p className="text-gray-800 dark:text-white">{user.address?.country}</p>
          </div>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order History</h2>
          <div>
            {/* Display order history */}
            {/* You can map over user's orders and display them here */}
            {/* <div className="border-t border-gray-200 dark:border-gray-700 py-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 dark:text-white">Order #12345</p>
                <p className="text-gray-800 dark:text-white">$XX.XX</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Date: MM/DD/YYYY</p>
              <p className="text-gray-500 dark:text-gray-400">Status: Shipped</p>
            </div> */}
          </div>
          <Link href={'/my-account/edit'} className='p-2 rounded-md border'>Edit Profile</Link> 
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
