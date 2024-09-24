import React, { useEffect, useState } from 'react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Delay for the fade-in effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="service" className="py-20 bg-gradient-to-r from-[#edf6ff] via-white to-[#f6f3ff] min-h-[600px]">
      <div className={`max-w-6xl mx-auto px-6 text-center ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ fontFamily: "'Kanit', sans-serif" }}>
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-blue-600 mb-8">Our Services</h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          Explore the diverse range of services we offer to elevate your productivity and teamwork.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Task Management Card */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Task Management</h3>
            <p className="text-lg text-gray-600 mb-8">
              Efficiently manage your tasks with a clean, organized interface designed for productivity.
            </p>
            
          </div>

          {/* Collaboration Card */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Collaboration</h3>
            <p className="text-lg text-gray-600 mb-8">
              Work together with your team, assign tasks, and track progress effortlessly.
            </p>
            
          </div>

          {/* Reminders Card */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Reminders</h3>
            <p className="text-lg text-gray-600 mb-8">
              Set reminders for important deadlines and milestones. Never miss a task with our reliable reminders system.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
