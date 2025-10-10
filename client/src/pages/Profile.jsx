

import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { Package, BookOpen, Star, MapPin, Edit2, Camera } from 'lucide-react';

function Profile({ user }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          // Try to get user profile from backend
          const idToken = await user.getIdToken();
          const response = await fetch('http://localhost:5000/api/get-profile', {
            headers: {
              'Authorization': `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            const profileData = await response.json();
            setUserProfile({
              name: profileData.username || user.email,
              email: user.email,
              uid: user.uid,
              location: "University Main Campus",
              itemsShared: profileData.itemsShared || 0,
              itemsBorrowed: profileData.itemsBorrowed || 0,
              rating: profileData.rating || 5.0,
              profileImage: user.photoURL || "",
              joinedDate: user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Recently"
            });
          } else {
            // Fallback to basic user info
            setUserProfile({
              name: user.displayName || user.email,
              email: user.email,
              uid: user.uid,
              location: "University Main Campus",
              itemsShared: 0,
              itemsBorrowed: 0,
              rating: 5.0,
              profileImage: user.photoURL || "",
              joinedDate: user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Recently"
            });
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
      setLoading(false);
    };

    loadUserProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile</p>
        </div>
      </div>
    );
  }

  const initials = userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold overflow-hidden">
                {userProfile.profileImage ? (
                  <img
                    src={userProfile.profileImage}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/128x128/3a75c4/FFFFFF?text=${initials}`;
                    }}
                  />
                ) : (
                  initials
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{userProfile.name}</h1>
                <button className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
              
              <p className="text-gray-600 mb-2">{userProfile.email}</p>
              <p className="text-gray-500 flex items-center justify-center md:justify-start mb-2">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                {userProfile.location}
              </p>
              <p className="text-sm text-gray-500">Member since {userProfile.joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Package className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{userProfile.itemsShared}</h3>
            <p className="text-gray-600">Items Shared</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{userProfile.itemsBorrowed}</h3>
            <p className="text-gray-600">Items Borrowed</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4 fill-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{userProfile.rating}</h3>
            <p className="text-gray-600">User Rating</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="text-center text-gray-500 py-8">
            <p>No recent activity to show</p>
            <p className="text-sm mt-2">Start sharing or borrowing items to see your activity here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
