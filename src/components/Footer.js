import React from 'react';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="py-8 bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff] text-center">
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Content */}
        <p className="text-gray-700 mb-4" style={{ fontFamily: "'Kanit', sans-serif" }}>
          &copy; 2024 TaskTrek. All rights reserved. | Designed with love.
        </p>
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
            <FiFacebook className="text-3xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
            <FiTwitter className="text-3xl" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors">
            <FiLinkedin className="text-3xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors">
            <FiInstagram className="text-3xl" />
          </a>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="fixed bottom-8 right-8 flex gap-4 z-50">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
          <FiFacebook className="text-3xl" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
          <FiTwitter className="text-3xl" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors">
          <FiLinkedin className="text-3xl" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors">
          <FiInstagram className="text-3xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
