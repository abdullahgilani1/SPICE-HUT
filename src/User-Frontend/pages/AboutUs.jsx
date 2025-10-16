import React, { useState, useEffect } from 'react';

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState({
    title: "About Our Restaurant",
    content: "Welcome to our restaurant! We have been serving delicious food since 2010. Our mission is to provide exceptional dining experiences with fresh ingredients and outstanding service. We pride ourselves on our diverse menu that caters to all tastes and dietary preferences.",
    mission: "To create memorable dining experiences through exceptional food and service.",
    vision: "To be the premier restaurant destination in the community.",
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('aboutContent');
    if (savedContent) {
      setAboutContent(JSON.parse(savedContent));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <section className="py-16 bg-[#4B0B0B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{aboutContent.title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {aboutContent.content}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white opacity-90">{aboutContent.mission}</p>
          </div>
          <div className="bg-[#3B2410] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white opacity-90">{aboutContent.vision}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
