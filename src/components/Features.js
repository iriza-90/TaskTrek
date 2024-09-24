import React from 'react';
import { FiStar, FiSettings, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff] min-h-[600px] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-600 mb-8" style={{ fontFamily: "'Kanit', sans-serif" }}>Key Features</h2>
        <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Kanit', sans-serif" }}>
          Discover the standout features designed to enhance your productivity and streamline your tasks.
        </p>

        {/* Feature Layout */}
        <div className="relative flex flex-col lg:flex-row justify-center items-center gap-12">
          {/* Background Circles */}
          <div className="absolute top-0 left-0 z-0 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full -translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 z-0 w-72 h-72 bg-gradient-to-r from-green-100 to-yellow-100 rounded-full translate-x-1/4 translate-y-1/4" />

          {/* Feature 1 */}
          <motion.div
            className="relative z-10 max-w-xs mx-auto p-6 bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full -translate-x-6 -translate-y-6 flex items-center justify-center">
              <FiStar className="text-5xl text-blue-500" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 relative z-10" style={{ fontFamily: "'Kanit', sans-serif" }}>High Productivity</h3>
            <p className="text-lg text-gray-700 relative z-10" style={{ fontFamily: "'Kanit', sans-serif" }}>
              Boost your efficiency with our intuitive tools and streamlined processes.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="relative z-10 max-w-xs mx-auto p-6 bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full -translate-x-6 -translate-y-6 flex items-center justify-center">
              <FiSettings className="text-5xl text-blue-500" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 relative z-10" style={{ fontFamily: "'Kanit', sans-serif" }}>Customizable</h3>
            <p className="text-lg text-gray-700 relative z-10" style={{ fontFamily: "'Kanit', sans-serif" }}>
              Tailor the tool to fit your specific needs with extensive customization options.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="relative z-10 max-w-xs mx-auto p-6 bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full -translate-x-6 -translate-y-6 flex items-center justify-center">
              <FiUsers className="text-5xl text-blue-500" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 relative z-10" style={{ fontFamily: "'Kanit', sans-serif" }}>Team Collaboration</h3>
            <p className="text-lg text-gray-700 relative z-10" style={{ fontFamily: "'Kanit', sans-serif" }}>
              Collaborate seamlessly with your team and keep everyone aligned with shared goals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
