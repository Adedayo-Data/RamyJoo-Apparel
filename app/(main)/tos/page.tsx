// app/(main)/terms/page.tsx

import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>

      <section className="mb-8">
        <p>Welcome to <strong>RamyJoo Apparel</strong>! These Terms and Conditions outline the rules and regulations for using our website, located at <a href="https://www.ramyjooapparel.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://www.ramyjooapparel.com</a>. By accessing or using our site, you accept these terms in full. If you disagree with any part of these terms, please do not continue to use the site.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Intellectual Property Rights</h2>
        <p>Unless otherwise stated, all content on this website — including text, graphics, logos, images, and designs — is the property of <strong>RamyJoo Apparel</strong> or its licensors. All rights are reserved.</p>
        <ul className="list-disc list-inside mt-2">
          <li>Republish or reuse material without permission</li>
          <li>Sell, rent, or sub-license any website content</li>
          <li>Copy or duplicate material for commercial use</li>
          <li>Redistribute content without written approval</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Our Website</h2>
        <ul className="list-disc list-inside">
          <li>Do not cause harm to the website or impair its accessibility</li>
          <li>Do not engage in unlawful, fraudulent, or harmful behavior</li>
          <li>Do not introduce malicious software or harmful code</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Products & Services</h2>
        <p>All items displayed are subject to availability. We reserve the right to update, change, or discontinue any product or service at any time without notice. We strive for accuracy in all descriptions, images, and pricing. However, errors may occur, and we reserve the right to correct them.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Payment & Billing</h2>
        <p>All payments made via our site are securely processed. By submitting payment information, you confirm that you are authorized to use the payment method provided. We reserve the right to cancel or refuse any order at our discretion.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p><strong>RamyJoo Apparel</strong> shall not be liable for any damages — direct, indirect, incidental, or consequential — arising from your use of our website, services, or products, even if we’ve been advised of such risks.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
        <p>Our website may include links to external websites not managed by us. We are not responsible for the content, policies, or security practices of such third-party websites.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Updates to These Terms</h2>
        <p>We may update these Terms & Conditions periodically. Continued use of the website following any changes signifies your acceptance of the revised terms.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p>If you have any questions about our Terms & Conditions, please reach out to us:</p>
        <ul className="list-none mt-2">
          <li>📧 <strong>Email:</strong>ramyjooapparel@gmail.com</li>
          <li>🌐 <strong>Website:</strong> <a href="https://www.ramyjooapparel.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">www.ramyjooapparel.com</a></li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
