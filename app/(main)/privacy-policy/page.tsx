// app/(main)/privacy-policy/page.tsx
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-6">
        This Privacy Policy describes how RamyJoo Apparel (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses your personal information when you visit or make a purchase from our website (https://www.ramyjooapparel.com).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Contact details like name, email, phone number, address</li>
        <li>Order and account information</li>
        <li>Shopping behavior (cart, wishlist, purchase history)</li>
        <li>Device and usage data via cookies</li>
        <li>Payment and transaction details (processed securely)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We use your data to:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Process orders and deliver products</li>
        <li>Improve our website and customer experience</li>
        <li>Send promotional emails and updates (only if you opt-in)</li>
        <li>Protect against fraud or unauthorized transactions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Cookies</h2>
      <p className="mb-4">
        We use cookies to analyze website traffic, remember preferences, and personalize content. You can adjust your browser settings to block cookies, but it may affect some functionality.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Third-Party Sharing</h2>
      <p className="mb-4">
        We only share your information with trusted service providers (e.g., payment processors, delivery partners) to fulfill our services. We never sell your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Data Security</h2>
      <p className="mb-4">
        Your personal information is stored securely. We use industry-standard practices to safeguard your data, but no system is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="mb-4">
        You may request to access, correct, or delete your personal data by contacting us.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p>
        If you have questions or concerns about this policy, please contact us at:
      </p>
      <p className="mt-2 font-medium">📧 support@ramyjooapparel.com</p>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Last updated: June 30, 2025
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
