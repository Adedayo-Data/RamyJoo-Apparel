import Image from "next/image";
import React from "react";

const AboutMe = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          About Me
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          <span className="font-bold">RamyJoo</span> is the visionary force behind <span className="font-bold">RamyJoo Apparel</span> &mdash; a fashion brand
          known for its fusion of elegance, cultural depth, and bold individuality.
          With a passion for storytelling through style, she has carved out a space
          in the fashion world where tradition meets modern sophistication.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
          &ldquo;I don&rsquo;t just make clothes &mdash; I help people wear their power.&rdquo;
          <span className="not-italic font-semibold"> &mdash; RamyJoo</span>
        </p>

        <div className="flex items-center">
          <Image
            src="/images/people/Ramy1.jpeg"
            alt="RamyJoo"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              RamyJoo
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              CEO, RamyJoo Apparel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
