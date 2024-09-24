import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Features from './components/Features';
import AboutUs from './components/About';
import Footer from './components/Footer';
import LoginPage from './auth/login';
import SignUpPage from './auth/signup';
import ToDoDashboard from './components/TodoDashboard'; 

// Landing Page Component
function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <Services />

      {/* Features Section */}
      <Features />

      {/* About Us Section */}
      <AboutUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Main App Component
function App() {
  const user = localStorage.getItem('token'); // Check if the user is logged in (using token)

  return (
    <Router>
      <div className="bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff] min-h-screen">
        {/* Navbar visible on all pages */}
        <Navbar />

        {/* Define Routes */}
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Sign Up Page */}
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/TodoDashboard" element={user ? <ToDoDashboard /> : <LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
