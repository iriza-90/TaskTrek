import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff] min-h-[700px] flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center px-6">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-600 mb-8" style={{ fontFamily: "'Kanit', sans-serif" }}>Our Mission</h2>
        <p className="text-lg text-gray-600 mb-16" style={{ fontFamily: "'Kanit', sans-serif" }}>
          Our mission is to empower individuals and teams to achieve their goals with innovative solutions and exceptional support. We are committed to making a positive impact through our tools and services.
        </p>

        {/* Mission Highlight */}
        <div className="relative bg-white rounded-xl shadow-2xl p-8 mx-4">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
            <FiBriefcase className="text-5xl text-white" />
          </div>
          <div className="pt-12">
            <h3 className="text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "'Kanit', sans-serif" }}>Empowering Success</h3>
            <p className="text-gray-700">
              We aim to provide top-notch tools and support that help our users achieve greater productivity and collaboration. Our solutions are designed to be intuitive, effective, and accessible for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
