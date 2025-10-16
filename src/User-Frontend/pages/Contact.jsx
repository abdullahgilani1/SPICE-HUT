import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [contactContent, setContactContent] = useState({
    title: "Contact Us",
    address: "123 Restaurant Street, Food City, FC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@restaurant.com",
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "12:00 PM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    },
    socialMedia: {
      facebook: "https://facebook.com/restaurant",
      instagram: "https://instagram.com/restaurant",
      twitter: "https://twitter.com/restaurant"
    }
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('contactContent');
    if (savedContent) {
      setContactContent(JSON.parse(savedContent));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <section className="py-16 bg-[#4B0B0B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{contactContent.title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get in touch with us! We're here to serve you the best culinary experience.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <div className="space-y-4 text-white">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="opacity-90">{contactContent.address}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="opacity-90">{contactContent.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="opacity-90">{contactContent.email}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Business Hours</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(contactContent.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}:</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF6A00] text-white py-3 rounded-lg hover:bg-[#e55a00] transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
