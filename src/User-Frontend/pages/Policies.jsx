import React, { useState, useEffect } from 'react';

const Policies = () => {
  const [policies, setPolicies] = useState({
    privacyPolicy: {
      title: "Privacy Policy",
      content: "We are committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services..."
    },
    termsOfService: {
      title: "Terms of Service",
      content: "By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement..."
    },
    refundPolicy: {
      title: "Refund Policy",
      content: "We want you to be completely satisfied with your dining experience. If you are not satisfied with your order, please contact us within 24 hours..."
    }
  });

  useEffect(() => {
    const savedPolicies = localStorage.getItem('policyContent');
    if (savedPolicies) {
      setPolicies(JSON.parse(savedPolicies));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <section className="py-16 bg-[#4B0B0B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Policies</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Our policies ensure a safe and enjoyable experience for all our customers.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{policies.privacyPolicy.title}</h2>
            <p className="text-gray-300 leading-relaxed">{policies.privacyPolicy.content}</p>
          </div>
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{policies.termsOfService.title}</h2>
            <p className="text-gray-300 leading-relaxed">{policies.termsOfService.content}</p>
          </div>
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{policies.refundPolicy.title}</h2>
            <p className="text-gray-300 leading-relaxed">{policies.refundPolicy.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
