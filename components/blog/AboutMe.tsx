import Image from "next/image";
import React from "react";

const AboutMe = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          About Me
        </h2>
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 ">
            RamyJoo is the visionary force behind RamyJoo Apparel — a fashion brand known for its 
            fusion of elegance, cultural depth, and bold individuality. With a passion for storytelling 
            through style, she has carved out a space in the fashion world where tradition meets 
            modern sophistication.<b>✨ "I don’t just make clothes — I help people wear their power." – RamyJoo</b>
          </p>
          <div className="flex items-center mb-4">
            <Image
              src= '/images/people/Ramy1.jpeg'
              alt="User"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
               Shohag Miah
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                CEO, RamyJoo Apparel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
