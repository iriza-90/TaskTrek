import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import loginImage from './image.png';
//import ToDoDashboard from '../components/TodoDashboard';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      const url = "http://localhost:8000/api/auth"; 
      const { data } = await axios.post(url, { email, password }); 

      // Store token in localStorage
      localStorage.setItem("token", data.token); 

      // Navigate to the dashboard
      navigate('/ToDoDashboard'); 

    } catch (error) {
      // Log more details to see what's wrong
      if (error.response) {
        console.log("Server responded with an error:", error.response);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
      setError("Something went wrong. Please try again."); // Generic error message
    }

    setLoading(false); 
  };

  return (
    <section className="flex min-h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 flex justify-center items-center bg-white p-8">
        <img 
          src={loginImage} 
          alt="Login" 
          className="max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded-md " 
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff]">
        <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 font-sofadi">Login</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}
          
          <form onSubmit={handleSubmit}>
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
            <div className="mb-6">
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
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors font-sofadi"
              disabled={loading} // Disable button during loading
            >
              {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
