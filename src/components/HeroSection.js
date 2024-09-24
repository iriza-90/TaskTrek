import React from 'react';
import { FiCheckCircle } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-12 py-16 bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff] min-h-screen font-sofadi">
      {/* Left Side: Centered Text */}
      <div className="lg:w-1/2 flex flex-col justify-center items-start text-left">
        <h1 className="text-5xl font-bold text-gray-900">
          Simply Efficient
        </h1>
        <p className="text-gray-600 mt-6 max-w-lg text-lg">
          An easy-to-use task management tool to help you plan, organize, and increase your productivity.
        </p>
        <Link to="/signup">
        <button className="mt-8 bg-purple-600 text-white py-3 px-8 rounded-full text-lg shadow-lg hover:bg-purple-700 transition-colors">
          Start Planning
        </button>
        </Link>
      </div>

      {/* Right Side: Stylish To-do List Preview */}
      <div className="lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-96">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Today's Tasks
          </h2>
          
          {/* Task Items */}
          <ul className="space-y-5">
            <li className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiCheckCircle className="text-blue-500 mr-3 text-xl" />
                <span className="text-gray-700 font-medium">Design Landing Page</span>
              </div>
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded-full" />
            </li>
            <li className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiCheckCircle className="text-blue-500 mr-3 text-xl" />
                <span className="text-gray-700 font-medium">Team Meeting at 10 AM</span>
              </div>
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded-full" />
            </li>
            <li className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiCheckCircle className="text-blue-500 mr-3 text-xl" />
                <span className="text-gray-700 font-medium">Complete App Integration</span>
              </div>
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded-full" />
            </li>
            <li className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiCheckCircle className="text-blue-500 mr-3 text-xl" />
                <span className="text-gray-700 font-medium">Send Updates to Team</span>
              </div>
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded-full" />
            </li>
          </ul>
          <Link to= "/login">
          <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg w-full shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-700 transition-all">
            View Full List
          </button> 
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
