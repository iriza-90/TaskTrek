import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    axios.get('http://localhost:8000/api/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  };

  const handleEditProfile = () => {
    axios.put('http://localhost:8000/api/profile', profile)
      .then(response => {
        setProfile(response.data);
        setEditMode(false);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <section id="profile">
    <div  className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-8 font-sans">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {editMode ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>
            <button
              onClick={handleEditProfile}
              className="bg-green-600 text-white px-4 py-2 rounded-full"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl">Name: {profile.name}</p>
            <p className="text-xl">Email: {profile.email}</p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default Profile;
