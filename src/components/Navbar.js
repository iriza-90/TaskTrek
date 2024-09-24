import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-md font-sofadi">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">TaskTrek</div>

      {/* Links */}
      <ul className="flex space-x-6 items-center mt-2 font-sofadi">
        <li>
          <a href="#service" className="text-gray-700 hover:text-blue-600 transition-colors">
            Service
          </a>
        </li>
        <li>
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
            Features
          </a>
        </li>
        <li>
          <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
            About Us
          </a>
        </li>
        
      </ul>

      {/* Login and Sign Up Buttons */}
      <div className="flex space-x-4">
        {/* Login Button */}
        <Link to="/login">
          <button className="bg-white text-blue-600 border border-blue-600 py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-all font-sofadi">
            Login
          </button>
        </Link>

        {/* Sign Up Button */}
        <Link to="/signup">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all font-sofadi">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
