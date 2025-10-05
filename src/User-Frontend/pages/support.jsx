import { useState } from "react";

const faqs = [
  {
    category: "Menu & Orders",
    icon: "🍴",
    questions: [
      "How do I modify my order after placing it?",
      "Do you have vegetarian and vegan options?",
      "Can I customize the spice level of my dishes?",
    ],
  },
  {
    category: "Delivery & Pickup",
    icon: "📦",
    questions: [
      "What are your delivery hours?",
      "How much is delivery?",
      "How long does delivery take?",
    ],
  },
  {
    category: "Payment & Loyalty",
    icon: "💳",
    questions: [
      "What payment methods do you accept?",
      "How do loyalty points work?",
      "Can I get a refund if I'm not satisfied?",
    ],
  },
];

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-orange-500 text-white px-6 py-10">
      {/* Support Center Header */}
      <div className="bg-[#4B0F1A] p-10 text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Support Center</h1>
        <p className="text-lg">
          We're here to help! Get answers to your questions or reach out to our
          friendly support team.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="flex-1 space-y-10">
          {/* Get in Touch */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#3B2A20] p-6 rounded-md shadow-md">
                <h3 className="font-bold mb-1 flex items-center gap-2">
                  <span>📞</span> Phone Support
                </h3>
                <p className="text-sm mb-1">Speak with our friendly team</p>
                <p className="text-xs text-[#B36B6B]">+1 (555) 123-4567</p>
                <p className="text-xs">Mon-Sun: 9AM - 11PM</p>
              </div>
              <div className="bg-[#3B2A20] p-6 rounded-md shadow-md">
                <h3 className="font-bold mb-1 flex items-center gap-2">
                  <span>✉️</span> Email Support
                </h3>
                <p className="text-sm mb-1">We'll respond within 24 hours</p>
                <p className="text-xs text-[#B36B6B]">support@savory.com</p>
                <p className="text-xs">24/7 Response</p>
              </div>
              <div className="bg-[#3B2A20] p-6 rounded-md shadow-md">
                <h3 className="font-bold mb-1 flex items-center gap-2">
                  <span>💬</span> Live Chat
                </h3>
                <p className="text-sm mb-1">Chat with us in real-time</p>
                <a href="#" className="text-xs text-[#B36B6B] underline">
                  Start Chat
                </a>
                <p className="text-xs">Mon-Sun: 10AM - 10PM</p>
              </div>
              <div className="bg-[#3B2A20] p-6 rounded-md shadow-md">
                <h3 className="font-bold mb-1 flex items-center gap-2">
                  <span>📍</span> Visit Us
                </h3>
                <p className="text-sm mb-1">Come see us in person</p>
                <p className="text-xs text-[#B36B6B]">123 Culinary Street, Food District</p>
                <p className="text-xs">Mon-Sun: 11AM - 11PM</p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#3B2A20] p-4 rounded-md shadow-md"
                >
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span>{faq.icon}</span> {faq.category}
                  </h3>
                  <div className="space-y-2">
                    {faq.questions.map((q, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleFaq(index * 10 + i)}
                      >
                        <p>{q}</p>
                        <button className="text-white text-lg font-bold">
                          {expandedFaq === index * 10 + i ? "−" : "+"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Contact Form */}
        <div className="w-full max-w-md bg-[#3B2A20] p-6 rounded-md shadow-md">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <span>✉️</span> Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label htmlFor="fullName" className="block mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded bg-[#2A1F16] p-2 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded bg-[#2A1F16] p-2 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded bg-[#2A1F16] p-2 text-white"
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded bg-[#FF7F00] p-2 text-black"
                required
              >
                <option value="">Select a category</option>
                <option value="Menu & Orders">Menu & Orders</option>
                <option value="Delivery & Pickup">Delivery & Pickup</option>
                <option value="Payment & Loyalty">Payment & Loyalty</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded bg-[#2A1F16] p-2 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your question or concern in detail..."
                className="w-full rounded bg-[#FF7F00] p-2 text-black resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4B0F1A] py-2 rounded text-white font-semibold flex items-center justify-center gap-2"
            >
              <span>✈️</span> Send Message
            </button>
          </form>
          <p className="text-xs mt-2 text-center text-gray-400">
            We typically respond within 24 hours during business days.
          </p>
        </div>
      </div>
    </div>
  );
}
