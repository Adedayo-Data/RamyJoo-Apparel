// 'use client';

// import Link from 'next/link';

// export default function AdminHomePage() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, Admin! 🎉</h1>
//       <p className="text-lg text-gray-600 mb-6">What would you like to manage today?</p>

//       <div className="flex gap-4">
//         <Link
//           href="/admin/products"
//           className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200"
//         >
//           Manage Products
//         </Link>

//         <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all duration-200" disabled>
//           Orders (Coming Soon)
//         </button>
//       </div>
//     </div>
//   );
// }

import SignInForm from "@/components/forms/SignInForm";

const SigninPage = () => {
  return (
    <SignInForm />
  );
};

export default SigninPage;
