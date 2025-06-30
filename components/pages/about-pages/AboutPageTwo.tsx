import Image from "next/image";
import React from "react";

const AboutPageTwo = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Column: Introduction */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Ramyjoo Apparel specializes in high fashion and hand-made creations customized to empower
            females and males of all ages through skillful, classic, elegant, and well-made pieces that
            celebrate individuality and confidence. As a registered business, our vision is to create a
            culturally rich range of Nigerian designs and maximize their beauty by embracing the
            country&apos;s textile industry.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We bring a unique approach, blending sophistication and strength into our designs. Our
            high-quality and bespoke pieces are designed for the fearless, the bold, and the beautiful —
            offering individuals across generations the freedom to express themselves authentically.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            In addition to our hand-made creations, we provide customized styling and photoshoot
            services, ensuring every aspect of the Ramyjoo Apparel experience is styled to the client&apos;s
            distinctive vision. Contact us and elevate your style with Ramyjoo Apparel.
          </p>
        </div>

        {/* Right Column: Team */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Me!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-[16rem]">
                <Image
                  src="/images/people/Ramy1.jpeg"
                  alt="RamyJoo"
                  className="w-full h-64 object-cover"
                  fill
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Akindele Mary Tosin
                </h3>
                <p className="text-gray-700 dark:text-gray-300">CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Values, Vision */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
              At RamyJoo Apparel, we are committed to creating bespoke, hand-made fashion pieces that
              blend sophistication with cultural pride. Our designs empower both women and men by
              celebrating individuality, confidence, and strength through every stitch. We proudly support
              and promote Nigeria&apos;s rich textile heritage by sourcing and crafting our pieces locally.
              Beyond fashion, we offer personalized styling and photography experiences, turning each
              client&apos;s journey with RamyJoo into a powerful, stylish story worth telling.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><b>Authenticity –</b> Every piece tells a unique story; we honor the voice of individuality.</li>
              <li><b>Elegance –</b> From cut to detail, we design for grace, class, and timeless beauty.</li>
              <li><b>Empowerment –</b> We create fashion that fuels confidence and self-expression for every generation.</li>
              <li><b>Craftsmanship –</b> Rooted in detail, passion, and skill — every stitch is intentional.</li>
              <li><b>Cultural Pride –</b> We embrace Nigerian heritage and textiles in modern, globally-relevant styles.</li>
              <li><b>Customer-Centricity –</b> Our clients are collaborators; every experience is tailored, not just the clothes.</li>
            </ul>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To become a globally recognized fashion house that celebrates Nigerian craftsmanship
              through high-quality, culturally inspired designs — empowering individuals of all ages to
              express boldness, elegance, and authenticity through timeless fashion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageTwo;
