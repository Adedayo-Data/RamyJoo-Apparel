import ContactForm from '@/components/forms/ContactForm';
import React from 'react';

const HelpPage = () => {
  return (
    <div className="px-4 py-8 lg:px-16 lg:py-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Help Center
        </h1>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* FAQ Item */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">What kind of clothing does RamyJoo specialize in?</h3>
              <p className="text-gray-700 dark:text-gray-300">RamyJoo Apparel specializes in high-fashion, hand-made, and custom-tailored African-inspired pieces. From bougie gowns and agbada sets to modern blouses, skirts, and accessories — every item is crafted to celebrate elegance, culture, and individuality.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Can I customize my outfit?</h3>
              <p className="text-gray-700 dark:text-gray-300">Absolutely! At RamyJoo, we offer full customization services to suit your taste, body type, and occasion. Whether it’s a wedding, photoshoot, or cultural celebration, we bring your vision to life.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Do you make clothes for both men and women?</h3>
              <p className="text-gray-700 dark:text-gray-300">Yes, we create elegant, custom pieces for both men and women, and even for kids. Whether you want a traditional agbada, senator wear, or a sophisticated female gown, we&apos;ve got you covered.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">What sizes are available?</h3>
              <p className="text-gray-700 dark:text-gray-300">We offer made-to-measure clothing to ensure a perfect fit. You can provide your measurements during the ordering process or choose from our ready-made size options ranging from XS to 3XL.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">How long does it take to receive my order?</h3>
              <p className="text-gray-700 dark:text-gray-300">Standard production for custom pieces takes 7–14 working days, depending on complexity. For ready-made outfits, we ship within 2–3 business days. Express options are available at checkout.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Do you offer delivery across Nigeria and internationally?</h3>
              <p className="text-gray-700 dark:text-gray-300">Yes, we deliver nationwide across Nigeria and offer international shipping as well. Delivery fees and timelines may vary based on your location.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Do you offer styling or photo shoot services?</h3>
              <p className="text-gray-700 dark:text-gray-300">Yes! We offer personalized styling consultations and professional photo shoot sessions to help you look and feel your best in your RamyJoo outfit.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                How do I contact the RamyJoo team?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">You can reach us via:</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>
                  <span className="font-medium">Instagram:</span> @ramyjooapparel
                </li>
                <li>
                  <span className="font-medium">WhatsApp/Phone:</span> +234 XXX XXX XXXX
                </li>
                <li>
                  <span className="font-medium">Email:</span> ramyjooapparel@gmail.com
                </li>
                <li>
                  Or visit our <span className="underline cursor-pointer text-blue-600 dark:text-blue-400">Contact Us</span> page to send us a direct message.
                </li>
              </ul>
            </div>
            {/* Repeat above structure for more FAQ items */}
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default HelpPage;
