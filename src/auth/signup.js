import React, { useState } from 'react';
import signUpImage from './image.png';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');  // Initialize error as an empty string
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = { name, email, password, confirmPassword }; 
      const url = "http://localhost:8000/api/users";
      const { data: res } = await axios.post(url, data); 
      
      if (res && res.message) { // Check if response is valid before navigation
        console.log(res.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && 
          error.response.status >= 400 &&
          error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <section className="flex min-h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 flex justify-center items-center bg-white p-8">
        <img
          src={signUpImage}
          alt="Sign Up"
          className="max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded-md "
        />
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="w-1/2 flex justify-center items-center bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff]">
        <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 font-sofadi">Sign Up</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors font-sofadi">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
