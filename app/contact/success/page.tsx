import Link from "next/link";

const ContactSuccess = () => {
  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Message Sent!</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Thank you for reaching out. We&apos;ll get back to you soon.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
            Go to Home
          </button>
        </Link>

        <Link href="/contact">
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-xl hover:bg-blue-50 transition">
            Send Another Message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactSuccess;
